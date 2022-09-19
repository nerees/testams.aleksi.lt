<?php

namespace Invertus\dpdBaltics\Service\Import;

use Configuration;
use Db;
use DPDBaltics;
use Exception;
use Invertus\dpdBaltics\Config\Config;
use Invertus\dpdBaltics\Exception\ImportException;
use Invertus\dpdBaltics\File\UploadedFile;
use Invertus\dpdBaltics\Repository\ZoneRepository;
use Invertus\dpdBaltics\Validate\Zone\ZoneDeleteValidate;
use RuntimeException;
use Shop;
use Smarty;
use Tools;

class ZipImport
{
    /**
     * @var DPDBaltics
     */
    private $module;

    /**
     * @var array
     */
    public $errors = [];

    /**
     * @var array
     */
    public $warnings = [];

    /**
     * @var array
     */
    public $confirmations = [];

    /**
     * @var array
     */
    public $importedTypes = [];
    /**
     * @var Smarty
     */
    private $smarty;

    /**
     * DPDZoneRangeValidate constructor.
     * @param DPDBaltics $module
     */
    public function __construct(DPDBaltics $module, Smarty $smarty)
    {
        $this->module = $module;
        $this->smarty = $smarty;
    }

    public function importAllFromZip()
    {
        try {
            $uploadedFile = new UploadedFile(
                'DPD_IMPORT_FILE',
                'zip',
                ['application/zip']
            );
        } catch (RuntimeException $e) {
            $this->errors[] = $e->getMessage();
            return;
        }

        $file = $uploadedFile->getTmpName();

        if (null === $file) {
            $this->errors[] = $this->module->l(
                'Error occured while importing file. Please check file and try again.'
            );
            return;
        }

        $this->clearTmpDir('import');
        Tools::ZipExtract($file, $this->module->getLocalPath() . 'tmp/import');

        $db = Db::getInstance();
        // wrap import in transaction
        $db->execute('START TRANSACTION');

        // we dont want to use transactions in import services
        // since we are wrapping whole inport in single transaction
        $dontUseTransaction = false;
        $commit = true;
        if (Tools::getValue(Config::IMPORT_DELETE_OLD_DATA)) {
            $this->deleteOldDataZip();
        }

        $types = $this->returnImportedTypes();

        if (!$types) {
            $this->errors[] = $this->module->l(
                'Import ZIP was not extracted correctly. Check ZIP file structure.'
            );
            return;
        }

        foreach ($types as $type) {
            $this->postProcessImport($type, $this->getTempImportFile($type), $dontUseTransaction);

            if (!empty($this->errors)) {
                // Clear success messages since we are rolling back everything
                $this->confirmations = [];

                $commit = false;
                $db->execute('ROLLBACK');

                // break loop & skip remainging imports
                break;
            }
        }

        if ($commit) {
            $db->execute('COMMIT');
        }

        $this->clearTmpDir('import');

        return $commit;
    }

    /**
     * @param string    Import file type. Can be price_rules, contracts, settings, zones
     *
     * @return string|false
     */
    private function getTempImportFile($fileType)
    {
        $csvFiles = glob($this->module->getLocalPath() . 'tmp/import/*.csv');
        if (!$csvFiles) {
            return false;
        }

        foreach ($csvFiles as $csvFile) {
            $parts = explode('/', $csvFile);
            $fileName = end($parts);
            if (preg_match('/^' . $fileType . '/', $fileName)) {
                return $csvFile;
            }
        }

        return false;
    }

    /**
     *Produces errors for entities that need to be deleted
     *
     * @param $entitiesToDelete array
     */
    private function errorEntitiesToDelete(array $entitiesToDelete)
    {
        foreach ($entitiesToDelete as $entityToDelete) {
            if ($entityToDelete === Config::IMPORT_EXPORT_OPTION_PRODUCTS) {
                $this->errors[] =
                    $this->module->l('Some products need to be deleted before you can delete zones');
            }
            if ($entityToDelete == Config::IMPORT_EXPORT_OPTION_PRICE_RULES) {
                $this->errors[] =
                    $this->module->l('Some price rules need to be deleted before you can delete zones');
            }
        }
    }

    /**
     * Clear temporary import file dir
     * @param $folder
     */
    private function clearTmpDir($folder)
    {
        $files = glob($this->module->getLocalPath() . 'tmp/' . $folder . '/*.csv');
        if (!$files) {
            return;
        }

        array_map('unlink', $files);
    }

    private function deleteOldDataZip()
    {
        $types = $this->returnImportedTypesForDelete();
        foreach ($types as $type) {
            /** @var ImportableInterface $importable */
            $importable = $this->returnImportable($type);
            $importable->deleteOldData();
        }
    }

    /**
     * Returns all the imported types
     * @return array
     */
    private function returnImportedTypes()
    {
        $mapping = $this->getImportMapping();
        $importedFiles = [];
        foreach ($mapping as $type) {
            $file = $this->getTempImportFile($type);
            if ($file) {
                $importedFiles[] = $type;
            }
        };
        return $importedFiles;
    }

    private function returnImportedTypesForDelete()
    {
        $mapping = $this->getImportDeletionMapping();
        $importedFiles = [];
        foreach ($mapping as $type) {
            $file = $this->getTempImportFile($type);
            if ($file) {
                $importedFiles[] = $type;
            }
        };
        return $importedFiles;
    }


    /**
     * Get import option and files name mappings.
     *
     * @return array
     */
    private function getImportMapping()
    {
        // mapping is in specific import order
        // key is import option & value is beginning of import file name (e.g. zones_20180218_1518.csv)

        $types = [
            Config::IMPORT_EXPORT_OPTION_SETTINGS,
            Config::IMPORT_EXPORT_OPTION_ZONES,
            Config::IMPORT_EXPORT_OPTION_PRODUCTS,
            Config::IMPORT_EXPORT_OPTION_PRICE_RULES,
            Config::IMPORT_EXPORT_OPTION_ADDRESS_TEMPLATES,
        ];

        return $types;
    }

    private function getImportDeletionMapping()
    {
        // mapping is in specific import order
        // key is import option & value is beginning of import file name (e.g. zones_20180218_1518.csv)

        $types = [
            Config::IMPORT_EXPORT_OPTION_SETTINGS,
            Config::IMPORT_EXPORT_OPTION_PRICE_RULES,
            Config::IMPORT_EXPORT_OPTION_PRODUCTS,
            Config::IMPORT_EXPORT_OPTION_ZONES,
            Config::IMPORT_EXPORT_OPTION_ADDRESS_TEMPLATES,
        ];

        return $types;
    }

    private function returnName($importOption)
    {
        try {
            switch ($importOption) {
                case Config::IMPORT_EXPORT_OPTION_ZONES:
                    return $this->module->l('Zones');
                case Config::IMPORT_EXPORT_OPTION_PRODUCTS:
                    return $this->module->l('Products');
                case Config::IMPORT_EXPORT_OPTION_SETTINGS:
                    return $this->module->l('Settings');
                case Config::IMPORT_EXPORT_OPTION_PRICE_RULES:
                    return $this->module->l('Price rules');
                case Config::IMPORT_EXPORT_OPTION_ADDRESS_TEMPLATES:
                    return $this->module->l('Addresses');
                default:
                    $this->errors[] = $this->module->l('Invalid export option selected');
            }
        } catch (Exception $e) {
            $this->errors[] = $e->getMessage();
        }
    }

    /**
     * Process import
     *
     * @param string|null $importOption
     * @param string|null $importFile
     * @param bool $useTransaction
     */
    private function postProcessImport($importOption = null, $importFile = null, $useTransaction = true)
    {
        if (!$importOption) {
            $importOption = Configuration::get(Config::IMPORT_OPTION);
        }
        if ($importOption === Config::IMPORT_EXPORT_OPTION_ALL_ZIP) {
            $this->importAllFromZip();
            return;
        }
        if ($importOption !== Config::IMPORT_EXPORT_OPTION_ALL_ZIP) {
            $importable = $this->returnImportable($importOption);
            $name = $this->returnName($importOption);
        }
        if (!empty($this->errors)) {
            return;
        }

        try {
            /** @var ImportProvider $importProvider */
            $importProvider = $this->module->getModuleContainer('invertus.dpdbaltics.service.import.import_provider');
            if (Configuration::get(Config::IMPORT_DELETE_OLD_DATA)) {
                $importProvider->deleteBeforeImport();
            }
            $result = $importProvider->import($importable, $importFile, $useTransaction);

            foreach ($importable->getWarnings() as $warning) {
                $this->warnings[] = $warning;
            }

            if (true !== $result) {
                $this->errors = $result;
                return;
            }
        } catch (ImportException $e) {
            $this->errors[] = $e->getMessage();
            return;
        }

        $break = $this->smarty->fetch(
            $this->module->getLocalPath() . 'views/templates/admin/partials/break.tpl'
        );


        $this->confirmations[] = sprintf(
                $this->module->l('Successfully imported %s with %d row(s)'),
                $name,
                $importable->getImportedRowsCount()
            ) . $break;
        $this->confirmations = array_merge($this->confirmations, $importable->getConfirmations());
        $this->importedTypes[] = $importOption;
    }

    /**
     * @param $importOption
     * @return object/void
     */
    private function returnImportable($importOption = false)
    {
        if (!$importOption) {
            $importOption = Configuration::get(Config::IMPORT_OPTION);
        }

        try {
            switch ($importOption) {
                case Config::IMPORT_EXPORT_OPTION_ZONES:
                    /** @var ZoneImport $importable */
                    return $this->module->getModuleContainer('invertus.dpdbaltics.service.import.zone_import');
                case Config::IMPORT_EXPORT_OPTION_SETTINGS:
                    /** @var SettingsImport $importable */
                    return $this->module->getModuleContainer('invertus.dpdbaltics.service.import.settings_import');
                case Config::IMPORT_EXPORT_OPTION_PRICE_RULES:
                    /** @var PriceRulesImport $importable */
                    return $this->module->getModuleContainer('invertus.dpdbaltics.service.import.price_rules_import');
                case Config::IMPORT_EXPORT_OPTION_ADDRESS_TEMPLATES:
                    /** @var AddressTemplatesImport $importable */
                    return $this->module->getModuleContainer('invertus.dpdbaltics.service.import.address_templates_import');
                case Config::IMPORT_EXPORT_OPTION_PRODUCTS:
                    /** @var ProductImport $importable */
                    return $this->module->getModuleContainer('invertus.dpdbaltics.service.import.product_import');
                default:
                    $this->errors[] = $this->module->l('Invalid export option selected');
            }
        } catch (Exception $e) {
            $this->errors[] = $e->getMessage();
        }
    }
}
