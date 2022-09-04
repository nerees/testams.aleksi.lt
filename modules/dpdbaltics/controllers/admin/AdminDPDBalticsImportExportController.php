<?php

use Invertus\dpdBaltics\Builder\Template\Admin\InfoBlockBuilder;
use Invertus\dpdBaltics\Builder\Template\Admin\WarningBlockBuilder;
use Invertus\dpdBaltics\Config\Config;
use Invertus\dpdBaltics\Controller\AbstractAdminController;
use Invertus\dpdBaltics\Exception\ImportException;
use Invertus\dpdBaltics\Provider\ImportExportOptionsProvider;
use Invertus\dpdBaltics\Service\DPDFlashMessageService;
use Invertus\dpdBaltics\Service\Export\ExportProvider;
use Invertus\dpdBaltics\Service\Import\AddressTemplatesImport;
use Invertus\dpdBaltics\Service\Import\ImportableInterface;
use Invertus\dpdBaltics\Service\Import\ImportProvider;
use Invertus\dpdBaltics\Service\Import\PriceRulesImport;
use Invertus\dpdBaltics\Service\Import\ProductImport;
use Invertus\dpdBaltics\Service\Import\SettingsImport;
use Invertus\dpdBaltics\Service\Import\ZipImport;
use Invertus\dpdBaltics\Service\Import\ZoneImport;
use Invertus\dpdBaltics\Templating\InfoBlockRender;

require_once dirname(__DIR__).'/../vendor/autoload.php';

class AdminDPDBalticsImportExportController extends AbstractAdminController
{
    public function init()
    {
        $this->updateImportOption();
        $this->initOptions();
        $this->bootstrap = true;

        parent::init();
    }

    public function postProcess()
    {
        parent::postProcess();

        if (Tools::isSubmit('submitProcessImportZones')) {
            Media::addJsDef([
                'dpdAjaxUrl' =>
                    $this->context->link->getAdminLink(DPDBaltics::ADMIN_AJAX_CONTROLLER),
                'successMessage' => $this->module->l('Zones successfully imported'),
                'failMessage' => $this->module->l('Zones import failed')
            ]);

            $this->addJS($this->getModuleJSUri() . 'import/import_main_zones.js');
        }

        if (Tools::isSubmit('submitProcessImportParcels')) {
            Media::addJsDef([
                'dpdAjaxUrl' =>
                    $this->context->link->getAdminLink(DPDBaltics::ADMIN_AJAX_CONTROLLER),
                'successMessage' => $this->module->l('Parcels successfully updated'),
                'failMessage' => $this->module->l('Parcels update failed'),
                'countryId' => Tools::getValue('DPD_PARCEL_IMPORT_COUNTRY_SELECTOR')
            ]);

            $this->addJS($this->getModuleJSUri() . 'import/import_parcels.js');
        }

        if (Tools::isSubmit('submitProcessExport')) {
            $this->postProcessExport();
        } elseif (Tools::isSubmit('submitProcessImport')) {
            $importOption = Tools::getValue(Config::IMPORT_OPTION);
            $deleteOnImport = Tools::getValue(Config::IMPORT_DELETE_OLD_DATA);
            $this->postProcessImport($importOption, $deleteOnImport);
        }
    }

    public function initContent()
    {
        $this->context->smarty->assign([
            'loading_gif' => $this->module->getPathUri() . 'views/img/load.gif',
            'selectedCountry' => Configuration::get(Config::WEB_SERVICE_COUNTRY),
        ]);

        $this->content .=
            $this->context->smarty->fetch(
                $this->module->getLocalPath() . 'views/templates/admin/importing-zones-popup.tpl'
            );

        $this->content .=
            $this->context->smarty->fetch(
                $this->module->getLocalPath() . 'views/templates/admin/import/importing-parcels-popup.tpl'
            );

        parent::initContent();
    }

    protected function initOptions()
    {
        /** @var ImportExportOptionsProvider $importExportProvider */
        $importExportProvider = $this->module->getModuleContainer()->get(ImportExportOptionsProvider::class);
        /** @var InfoBlockRender $infoBlockRender */
        $infoBlockRender = $this->module->getModuleContainer()->get(InfoBlockRender::class);
        $shopContext = Shop::getContext();
        $info = '';

        $importInfoBlockText =
            $this->l('ZIP file must contain only import files. No folders or images are allowed.');

        $importZonesInfoBlockText =
            $this->l('We have prepared standard zones for Latvia and Lithuania. You can import them whenever you want.');

        $importParcelsInfoBlockText =
            $this->l('You can import or update list of pick-up points by clicking Import button. We would recommend to update pick-up points at least once a year, as DPD Pick-up network is expanding regularly');

        $importParcelsWarningBlockText =
            $this->l('Pick-up point import might might take up to 10 minutes depending on how many parcels selected country has. Please be patient and don\'t close this page.');

        $break = $this->context->smarty->fetch(
            $this->module->getLocalPath() . 'views/templates/admin/partials/break.tpl'
        );

        $href = $this->context->link->getModuleLink(
            $this->module->name,
            'CronJob',
            [
                'action' => 'updateParcelShops',
                'token' => Configuration::get(Config::DPDBALTICS_HASH_TOKEN)
            ]
        );
        $cronJobText =
            $this->l('You can setup cronjob with: ' . $href);

        if (Shop::CONTEXT_GROUP == $shopContext) {
            $info = $this->l('Data will be imported to all group shops');
        } elseif (Shop::CONTEXT_ALL == $shopContext) {
            $info = $this->l('Data will be imported to all shops');
        }

        $this->fields_options = [
            'import_configuration' => [
                'description' => $info,
                'title' => $this->l('Import'),
                'icon' => 'dpd-icon-settings',
                'image' => '../img/admin/tab-tools.gif',
                'fields' => [
                    Config::IMPORT_INFO_BLOCK_FIELD => [
                        'type' => '',
                        'desc' => $infoBlockRender->getInfoBlockTemplate($importInfoBlockText),
                        'class' => 'hidden',
                        'validation' => 'isCleanHtml',
                        'form_group_class' => 'dpd-info-block'
                    ],
                    Config::IMPORT_FILE => [
                        'title' => $this->l('File'),
                        'type' => 'file',
                        'name' => Config::IMPORT_FILE,
                    ],
                    Config::IMPORT_OPTION => [
                        'title' => $this->l('Import'),
                        'type' => 'select',
                        'list' => $importExportProvider->getImportExportOptions(),
                        'identifier' => 'id',
                    ],
                    Config::IMPORT_FIELD_SEPARATOR => [
                        'title' => $this->l('Field separator'),
                        'validation' => 'isCleanHtml',
                        'type' => 'text',
                        'class' => 'fixed-width-xxl',
                        'required' => true,
                    ],
                    Config::IMPORT_FIELD_MULTIPLE_SEPARATOR => [
                        'title' => $this->l('Multiple value separator'),
                        'validation' => 'isCleanHtml',
                        'type' => 'text',
                        'class' => 'fixed-width-xxl',
                        'required' => true,
                    ],
                    Config::IMPORT_LINES_SKIP => [
                        'title' => $this->l('Line to skip from the top'),
                        'validation' => 'isUnsignedInt',
                        'type' => 'text',
                        'class' => 'fixed-width-xxl',
                        'required' => true,
                    ],
                    Config::IMPORT_DELETE_OLD_DATA => [
                        'title' => $this->l('Delete old data before importing new'),
                        'validation' => 'isBool',
                        'type' => 'bool',
                        'class' => 'fixed-width-xxl',
                        'required' => true,
                    ],
                ],
                'buttons' => [
                    'export' => [
                        'title' => $this->l('Import'),
                        'icon' => 'process-icon-import',
                        'class' => 'btn btn-default pull-right',
                        'name' => 'submitProcessImport',
                        'type' => 'submit',
                    ],
                ],
            ],
            'export_configuration' => [
                'title' => $this->l('Export'),
                'icon' => 'dpd-icon-settings',
                'image' => '../img/admin/tab-tools.gif',
                'fields' => [
                    Config::EXPORT_OPTION => [
                        'title' => $this->l('Export'),
                        'type' => 'select',
                        'list' => $importExportProvider->getImportExportOptions(),
                        'identifier' => 'id',
                    ],
                    Config::EXPORT_FIELD_SEPARATOR => [
                        'title' => $this->l('Field separator'),
                        'validation' => 'isCleanHtml',
                        'type' => 'text',
                        'class' => 'fixed-width-xxl',
                        'required' => true,
                    ],
                    Config::EXPORT_FIELD_MULTIPLE_SEPARATOR => [
                        'title' => $this->l('Multiple value separator'),
                        'validation' => 'isCleanHtml',
                        'type' => 'text',
                        'class' => 'fixed-width-xxl',
                        'required' => true,
                    ]
                ],
                'buttons' => [
                    'export' => [
                        'title' => $this->l('Export'),
                        'icon' => 'process-icon-export',
                        'class' => 'btn btn-default pull-right',
                        'name' => 'submitProcessExport',
                        'type' => 'submit',
                    ],
                ],
            ],
            'import_zones' => [
                'title' => $this->l('Import Zones'),
                'icon' => 'dpd-icon-settings',
                'fields' => [
                    Config::IMPORT_ZONE_INFO_BLOCK_FIELD => [
                        'type' => '',
                        'desc' => $infoBlockRender->getInfoBlockTemplate($importZonesInfoBlockText),
                        'class' => 'hidden',
                        'validation' => 'isCleanHtml',
                        'form_group_class' => 'dpd-info-block'
                    ],
                ],
                'buttons' => [
                    'export' => [
                        'title' => $this->l('Import'),
                        'icon' => 'process-icon-export',
                        'class' => 'btn btn-default pull-right',
                        'name' => 'submitProcessImportZones',
                        'id' => 'import-zones-button',
                        'type' => 'submit',
                    ],
                ],
            ],
            'import_parcels' => [
                'title' => $this->l('Import pick-up points'),
                'icon' => 'dpd-icon-settings',
                'fields' => [
                    Config::IMPORT_PARCEL_INFO_BLOCK_FIELD => [
                        'type' => '',
                        'desc' =>
                            $infoBlockRender->getInfoBlockTemplate($importParcelsInfoBlockText) .
                            $break .
                            $infoBlockRender->getInfoBlockTemplate($cronJobText) .
                            $break .
                            $this->getWarningBlockTemplate($importParcelsWarningBlockText),
                        'class' => 'hidden',
                        'validation' => 'isCleanHtml',
                        'form_group_class' => 'dpd-info-block'
                    ],
                    Config::DPD_PARCEL_IMPORT_COUNTRY_SELECTOR => [
                        'title' => $this->l('Country'),
                        'type' => 'select',
                        'list' => Country::getCountries($this->context->language->id, true),
                        'identifier' => 'id_country',
                    ],
                ],
                'buttons' => [
                    'export' => [
                        'title' => $this->l('Update'),
                        'icon' => 'process-icon-export',
                        'class' => 'btn btn-default pull-right',
                        'name' => 'submitProcessImportParcels',
                        'id' => 'import-Parcels-button',
                        'type' => 'submit',
                    ],
                ],
            ],
        ];
    }

    private function getWarningBlockTemplate($warningBlockText)
    {
        /** @var InfoBlockBuilder $warningBlockTemplate */
        $warningBlockTemplate = $this->module->getModuleContainer()->get(WarningBlockBuilder::class);
        $warningBlockTemplate->setSmarty($this->context->smarty);
        $warningBlockTemplate->setInfoBlockText($warningBlockText);

        return $warningBlockTemplate->render();
    }

    private function updateImportOption()
    {
        $OnBoard = false;

        if (
            Configuration::get(Config::ON_BOARD_TURNED_ON) &&
            Configuration::get(Config::ON_BOARD_STEP) === Config::STEP_IMPORT_2
        ) {
            $OnBoard = true;
        }

        if (!$OnBoard && Tools::getIsset('importContr')) {
            Configuration::updateValue(Config::IMPORT_OPTION, Tools::getValue('importContr'));
        }
    }

    /**
     * Process export
     */
    private function postProcessExport()
    {
        $exportOption = Tools::getValue(Config::EXPORT_OPTION);
        if ($exportOption == Config::IMPORT_EXPORT_OPTION_ALL_ZIP) {
            $this->exportAllToZip();
            return;
        };
        /** @var ExportProvider $exportProvider */
        $exportProvider = $this->module->getModuleContainer(ExportProvider::class);

        $exportable = $exportProvider->returnExportable($exportOption);
        if (!$exportable) {
            return;
        }

        $result = $exportProvider->export($exportable);

        if (true === $result) {
            die;
        }

        $this->errors = $result;
    }

    private function postProcessImport($importOption, $deleteOnImport, $importFile = null, $useTransaction = true)
    {
        if (!$importOption) {
            $importOption = Configuration::get(Config::IMPORT_OPTION);
        }

        if ($importOption == Config::IMPORT_EXPORT_OPTION_ALL_ZIP) {
            /* @var ZipImport $zipImport */
            $zipImport = $this->module->getModuleContainer(ZipImport::class);

            if (!$zipImport->importAllFromZip()) {
                $this->errors = array_merge($this->errors, $zipImport->errors);
            }

            $this->warnings = array_merge($this->warnings, $zipImport->warnings);
            $this->confirmations = array_merge($this->confirmations, $zipImport->confirmations);

            if (!empty($this->errors)) {
                return;
            }

            if (Configuration::get(Config::ON_BOARD_TURNED_ON) &&
                Configuration::get(Config::ON_BOARD_STEP) === Config::STEP_IMPORT_2
            ) {
                $this->setImportedTypesToCookie($zipImport->importedTypes);

                /** @var DPDFlashMessageService $flashMessageService */
                $flashMessageService = $this->module->getModuleContainer(DPDFlashMessageService::class);
                $flashMessageService->addFlash('success', $this->confirmations);

                Tools::redirectAdmin($this->context->link->getAdminLink(DPDBaltics::ADMIN_IMPORT_EXPORT_CONTROLLER));
            }

            return;
        }

        if ($importOption !== Config::IMPORT_EXPORT_OPTION_ALL_ZIP) {
            /** @var ImportableInterface $importable */
            $importable = $this->returnImportable($importOption);
            $name = $this->returnName($importOption);
        }
        if (!empty($this->errors)) {
            return;
        }

        try {
            /** @var ImportProvider $importProvider */
            $importProvider = $this->module->getModuleContainer(ImportProvider::class);
            if ($deleteOnImport) {
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

        $break = $this->context->smarty->fetch(
            $this->module->getLocalPath() . 'views/templates/admin/partials/break.tpl'
        );

        $this->confirmations[] = sprintf(
                $this->l('Successfully imported %s with %d row(s)'),
                $name,
                $importable->getImportedRowsCount()
            ) . $break;

        $this->confirmations = array_merge($this->confirmations, $importable->getConfirmations());
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
                    /** @var ZoneImport */
                    return $this->module->getModuleContainer(ZoneImport::class);
                    break;
                case Config::IMPORT_EXPORT_OPTION_SETTINGS:
                    /** @var ZoneImport */
                    return $this->module->getModuleContainer(SettingsImport::class);
                    break;
                case Config::IMPORT_EXPORT_OPTION_PRICE_RULES:
                    /** @var PriceRulesImport */
                    return $this->module->getModuleContainer(PriceRulesImport::class);
                    break;
                case Config::IMPORT_EXPORT_OPTION_ADDRESS_TEMPLATES:
                    /** @var AddressTemplatesImport */
                    return $this->module->getModuleContainer(AddressTemplatesImport::class);
                    break;
                case Config::IMPORT_EXPORT_OPTION_PRODUCTS:
                    /** @var ProductImport */
                    return $this->module->getModuleContainer(ProductImport::class);
                    break;
                default:
                    $this->errors[] = $this->l('Invalid export option selected');
                    return;
            }
        } catch (Exception $e) {
            $this->errors[] = $e->getMessage();
            return;
        }
    }

    private function returnName($importOption)
    {
        try {
            switch ($importOption) {
                case Config::IMPORT_EXPORT_OPTION_ZONES:
                    return $this->l('Zones');
                case Config::IMPORT_EXPORT_OPTION_SETTINGS:
                    return $this->l('Settings');
                case Config::IMPORT_EXPORT_OPTION_PRODUCTS:
                    return $this->l('Products');
                case Config::IMPORT_EXPORT_OPTION_PRICE_RULES:
                    return $this->l('Price rules');
                case Config::IMPORT_EXPORT_OPTION_ADDRESS_TEMPLATES:
                    return $this->l('Addresses');
                default:
                    $this->errors[] = $this->l('Invalid export option selected');
            }
        } catch (Exception $e) {
            $this->errors[] = $e->getMessage();
        }
    }

    /**
     * Export all configuration to zip
     */
    private function exportAllToZip()
    {
        $types = $this->getImportMapping();
        /** @var ExportProvider $exportProvider */
        $exportProvider = $this->module->getModuleContainer(ExportProvider::class);

        $this->clearTmpDir('export');
        foreach ($types as $type) {
            $exportable = $exportProvider->returnExportable($type);
            if ($exportable) {
                $exportProvider->saveToTemp($exportable);
            }
        }
        $this->putFilesToZip();
        $this->clearTmpDir('export');
    }

    /**
     *
     */
    private function putFilesToZip()
    {
        $files = glob($this->module->getLocalPath() . 'tmp/export/*.csv');
        $zipname = 'export.zip';
        $zip = new ZipArchive();
        $zip->open($zipname, ZipArchive::CREATE);
        foreach ($files as $file) {
            $zip->addFile($file, str_replace($this->module->getLocalPath() . 'tmp/export/', '', $file));
        }
        $zip->close();
        header('Content-Type: application/zip');
        header('Content-disposition: attachment; filename=' . $zipname);
        header('Content-Length: ' . filesize($zipname));
        readfile($zipname);
        unlink($zipname);
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

    private function setImportedTypesToCookie($importedTypes)
    {
        $result = [];

        $onBoardImportTypes = Config::getOnBoardImportTypes();

        foreach ($importedTypes as $importedType) {
            if (in_array($importedType, $onBoardImportTypes)) {
                $result[] = $importedType;
            }
        }

        $this->context->cookie->{Config::ON_BOARD_COOKIE_KEY} = json_encode($result);
    }
}
