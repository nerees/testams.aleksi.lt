<?php

use Invertus\dpdBaltics\Builder\Template\Admin\InfoBlockBuilder;
use Invertus\dpdBaltics\Collection\DPDProductInstallCollection;
use Invertus\dpdBaltics\Config\Config;
use Invertus\dpdBaltics\Controller\AbstractAdminController;
use Invertus\dpdBaltics\DTO\DPDProductInstall;
use Invertus\dpdBaltics\Repository\ProductRepository;
use Invertus\dpdBaltics\Service\Carrier\CreateCarrierService;
use Invertus\dpdBaltics\Service\Carrier\CarrierUpdateHandler;
use Invertus\dpdBaltics\Service\Carrier\UpdateCarrierService;
use Invertus\dpdBaltics\Service\LogsService;
use Invertus\dpdBaltics\Service\Product\ProductService;
use Invertus\dpdBaltics\Templating\InfoBlockRender;

require_once dirname(__DIR__).'/../vendor/autoload.php';

class AdminDPDBalticsSettingsController extends AbstractAdminController
{
    public function init()
    {
        $parentReturn = parent::init();
        $this->initOptions();
        $this->bootstrap = true;

        if (!Tools::isSubmit('submitOptionsconfiguration')) {
            return $parentReturn;
        }
        parent::init();
    }

    protected function initOptions()
    {
        /** @var InfoBlockRender $infoBlockRender */
        $infoBlockRender = $this->module->getModuleContainer()->get(InfoBlockRender::class);
        $infoBlockText = $this->module->l('Here you can restart DPD on-board feature.');

        $this->context->smarty->assign('googleMapsApiKeyLink', Config::GOOGLE_MAPS_API_KEY_LINK);

        $this->fields_options = [
            'web_service_configuration' => [
                'title' => $this->l('Web service configuration'),
                'icon' => 'dpd-icon-settings',
                'fields' => [
                    Config::SHIPMENT_TEST_MODE => [
                        'title' => $this->l('Shipment test mode'),
                        'validation' => 'isBool',
                        'cast' => 'intval',
                        'type' => 'bool',
                    ],
                    Config::WEB_SERVICE_USERNAME => [
                        'title' => $this->l('Username'),
                        'type' => 'text',
                        'validation' => 'isGenericName',
                        'class' => 'fixed-width-xl',
                    ],
                    Config::WEB_SERVICE_PASSWORD => [
                        'title' => $this->l('Password'),
                        'type' => 'text',
                        'class' => 'fixed-width-xl',
                        'auto_value' => false,
                    ],
                    Config::WEB_SERVICE_COUNTRY => [
                        'title' => $this->l('Country'),
                        'type' => 'radio',
                        'required' => true,
                        'choices' => [
                            Config::ESTONIA_ISO_CODE => $this->l('Estonia'),
                            Config::LATVIA_ISO_CODE => $this->l('Latvia'),
                            Config::LITHUANIA_ISO_CODE => $this->l('Lithuania'),
                        ],
                    ],
                ],
                'submit' => [
                    'title' => $this->l('Save'),
                    'id' => 'submitDpdConnection'
                ],
            ],
            'product_page_configuration' => [
                'title' => $this->l('Product page configuration'),
                'icon' => 'dpd-icon-settings',
                'fields' => [
                    Config::SHOW_CARRIERS_IN_PRODUCT_PAGE => [
                        'title' => $this->l('Show carrier options in product page'),
                        'type' => 'bool',
                        'validation' => 'isBool',
                        'cast' => 'intval'
                    ],
                ],
                'submit' => [
                    'title' => $this->l('Save'),
                ],
            ],
            'log_configuration' => [
                'title' => $this->l('Log configuration'),
                'icon' => 'dpd-icon-settings',
                'fields' => [
                    Config::TRACK_LOGS => [
                        'title' => $this->l('Track logs'),
                        'type' => 'bool',
                        'validation' => 'isBool',
                        'cast' => 'intval'
                    ],
                ],
                'buttons' => [
                    'dpd_delete_logs' => [
                        'title' => $this->l('Delete logs'),
                        'icon' => 'process-icon-delete',
                        'class' => 'btn btn-default pull-left',
                        'name' => 'submitDpdDeleteLogs',
                        'type' => 'submit',
                    ],
                    'dpd_download_logs' => [
                        'title' => $this->l('Download logs'),
                        'icon' => 'process-icon-download',
                        'class' => 'btn btn-default pull-right',
                        'name' => 'submitDpdDownloadLogs',
                        'type' => 'submit',
                    ],
                ],
                'submit' => [
                    'title' => $this->l('Save'),
                ],
            ],
            'dpd_on_board' => [
                'title' => $this->l('DPD on-board'),
                'icon' => 'dpd-icon-settings',
                'fields' => [
                    Config::ON_BOARD_INFO => [
                        'type' => 'free',
                        'desc' => $infoBlockRender->getInfoBlockTemplate($infoBlockText),
                        'class' => 'hidden',
                        'form_group_class' => 'dpd-info-block',
                    ],
                ],
                'buttons' => [
                    'dpd_restart_on_board' => [
                        'title' => $this->l('Restart DPD on-board'),
                        'icon' => 'process-icon-refresh',
                        'class' => 'btn btn-default pull-right',
                        'name' => 'submitRestartOnBoard',
                        'type' => 'submit',
                    ],
                ],
            ],
        ];
    }

    public function postProcess()
    {
        if (Tools::isSubmit('submitOptionsconfiguration')) {
            /** @var ProductService $productService */
            $productService = $this->module->getModuleContainer()->get(ProductService::class);
            /** @var CarrierUpdateHandler $carrierService */
            $carrierService = $this->module->getModuleContainer()->get(CarrierUpdateHandler::class);

            $newCountry = Tools::getValue(Config::WEB_SERVICE_COUNTRY);
            Configuration::updateValue(Config::DPD_PARCEL_IMPORT_COUNTRY_SELECTOR, Country::getByIso($newCountry));
            $productService->updateCarriersOnCountryChange($newCountry);
            $carrierService->updateCarrierName($newCountry);
        }

        $parentReturn = parent::postProcess();
        if (Tools::isSubmit('submitDpdDownloadLogs')) {
            $this->downloadLogs();
        }

        if (Tools::isSubmit('submitRestartOnBoard')) {
            $this->restartOnBoard();
        }

        if (Tools::strlen(Configuration::get(Config::WEB_SERVICE_PASSWORD)) > 0) {
            $passwordPlaceholder = $this->getPasswordPlaceholder();
        } else {
            $passwordPlaceholder = '';
        }

        $this->fields_options['web_service_configuration']['fields'][Config::WEB_SERVICE_PASSWORD]['value'] =
            $passwordPlaceholder;

        return $parentReturn;
    }

    public function setMedia($isNewTheme = false)
    {
        parent::setMedia($isNewTheme);

        $this->addJS($this->getModuleJSUri() . 'settings_password.js');
    }

    private function downloadLogs()
    {
        /**
         * @var LogsService $logService
         */
        $logService = $this->module->getModuleContainer(LogsService::class);
        if (!$logService->downloadLogsCsv()) {
            $this->errors[] = $this->l('No logs to download.');
        }
    }

    private function restartOnBoard()
    {
        Configuration::updateValue(Config::ON_BOARD_TURNED_ON, 1);
        Configuration::updateValue(Config::ON_BOARD_PAUSE, 0);
        Configuration::updateValue(Config::ON_BOARD_STEP, Config::STEP_MAIN_1);
        Configuration::updateValue(Config::ON_BOARD_MANUAL_CONFIG_CURRENT_PART, 1);

        Tools::redirectAdmin($this->context->link->getAdminLink(DPDBaltics::ADMIN_SETTINGS_CONTROLLER));
    }

    private function getPasswordPlaceholder()
    {
        return html_entity_decode(Config::WEB_SERVICE_PASSWORD_PLACEHOLDER);
    }

    /**
     * Encrypt password if it is submited & save
     *
     * @param string $plainPassword
     */
    public function updateOptionDpdWebServicePassword($plainPassword)
    {
        $passwordPlaceholder = $this->getPasswordPlaceholder();

        if (empty($plainPassword) || $passwordPlaceholder === $plainPassword) {
            return;
        }

        $encodedPassword = str_rot13($plainPassword);

        Configuration::updateValue(Config::WEB_SERVICE_PASSWORD, $encodedPassword, false, 0, 0);
    }
}
