<?php


use Invertus\dpdBaltics\Builder\Template\Admin\PhoneInputBuilder;
use Invertus\dpdBaltics\Controller\AbstractAdminController;
use Invertus\dpdBaltics\Converter\FormDataConverter;
use Invertus\dpdBaltics\DTO\CollectionRequestData;
use Invertus\dpdBaltics\Repository\AddressRepository;
use Invertus\dpdBaltics\Repository\CollectionRequestRepository;
use Invertus\dpdBaltics\Repository\PhonePrefixRepository;
use Invertus\dpdBaltics\Service\API\CollectionRequestService;
use Invertus\dpdBaltics\Service\Exception\ExceptionService;
use Invertus\dpdBalticsApi\Exception\DPDBalticsAPIException;

require_once dirname(__DIR__).'/../vendor/autoload.php';

class AdminDPDBalticsCollectionRequestController extends AbstractAdminController
{
    public function __construct()
    {
        $this->className = 'DPDCollectionRequest';
        $this->table = DPDCollectionRequest::$definition['table'];
        $this->identifier = DPDCollectionRequest::$definition['primary'];

        parent::__construct();

        $this->loadObject(true);
    }

    public function init()
    {
        $this->content .= $this->context->smarty->fetch($this->getTemplatePath() . 'admin-error-message.tpl');

        if (!$this->isXmlHttpRequest()) {
            $this->initList();
            $this->initForm();
        }

        parent::init();
    }

    private function initForm()
    {
        $this->loadObject(true);
        $dpdCountries = Country::getCountries($this->context->language->id, false);

        $dpdPickupCountryId = null;
        $dpdReceiverCountryId = null;

        $this->multiple_fieldsets = true;

        $date = new DateTime($this->fields_value['shipment_date']);
        $this->fields_value['shipment_date'] = $date->format('Y-m-d');
        $this->fields_form = [
            [
                'form' => [
                    'legend' => [
                        'title' => $this->l('Pick-up address'),
                    ],
                    'input' => [
                        [
                            'label' => $this->l('Prefill with selected address'),
                            'name' => 'pickup_address_prefill_placeholder',
                            'type' => 'free',
                        ],
                        [
                            'label' => $this->l('Full name/Company name'),
                            'name' => 'pickup_address_full_name',
                            'type' => 'text',
                            'class' => 'fixed-width-xxl',
                            'required' => true,
                        ],
                        [
                            'label' => $this->l('Mobile phone'),
                            'name' => 'pickup_address_mobile_phone',
                            'type' => 'free',
                            'class' => 'fixed-width-xxl',
                            'required' => true,
                        ],
                        [
                            'label' => $this->l('Email address'),
                            'name' => 'pickup_address_email',
                            'type' => 'text',
                            'class' => 'fixed-width-xxl',
                            'required' => true,
                        ],
                        [
                            'label' => $this->l('Country'),
                            'name' => 'pickup_address_id_ws_country',
                            'type' => 'select',
                            'class' => 'fixed-width-xxl chosen',
                            'required' => true,
                            'options' => [
                                'id' => 'id_country',
                                'name' => 'name',
                                'query' => $dpdCountries,
                            ],
                        ],
                        [
                            'label' => $this->l('Zip code'),
                            'name' => 'pickup_address_zip_code',
                            'type' => 'text',
                            'class' => 'fixed-width-xxl',
                            'required' => true,
                        ],
                        [
                            'label' => $this->l('City/Region'),
                            'name' => 'pickup_address_city',
                            'type' => 'text',
                            'class' => 'fixed-width-xxl',
                            'required' => true,
                        ],
                        [
                            'label' => $this->l('Address'),
                            'name' => 'pickup_address_address',
                            'type' => 'text',
                            'class' => 'fixed-width-xxl',
                            'required' => true,
                        ],
                    ],
                ],
            ],
            [
                'form' => [
                    'legend' => [
                        'title' => $this->l('Receiver'),
                    ],
                    'input' => [
                        [
                            'label' => $this->l('Prefill with selected address'),
                            'name' => 'receiver_address_prefill_placeholder',
                            'type' => 'free',
                        ],
                        [
                            'label' => $this->l('Full name/Company name'),
                            'name' => 'receiver_address_full_name',
                            'type' => 'text',
                            'class' => 'fixed-width-xxl',
                            'required' => true,
                        ],
                        [
                            'label' => $this->l('Mobile phone'),
                            'name' => 'receiver_address_mobile_phone',
                            'type' => 'free',
                            'class' => 'fixed-width-xxl',
                            'required' => true,
                        ],
                        [
                            'label' => $this->l('Email address'),
                            'name' => 'receiver_address_email',
                            'type' => 'text',
                            'class' => 'fixed-width-xxl',
                            'required' => true,
                        ],
                        [
                            'label' => $this->l('Country'),
                            'name' => 'receiver_address_id_ws_country',
                            'type' => 'select',
                            'class' => 'fixed-width-xxl chosen',
                            'required' => true,
                            'options' => [
                                'id' => 'id_country',
                                'name' => 'name',
                                'query' => $dpdCountries,
                            ],
                        ],
                        [
                            'label' => $this->l('Zip code'),
                            'name' => 'receiver_address_zip_code',
                            'type' => 'text',
                            'class' => 'fixed-width-xxl',
                            'required' => true,
                        ],
                        [
                            'label' => $this->l('City/Region'),
                            'name' => 'receiver_address_city',
                            'type' => 'text',
                            'class' => 'fixed-width-xxl',
                            'required' => true,
                        ],
                        [
                            'label' => $this->l('Address'),
                            'name' => 'receiver_address_address',
                            'type' => 'text',
                            'class' => 'fixed-width-xxl',
                            'required' => true,
                        ],
                    ],
                ],
            ],
            [
                'form' => [
                    'legend' => [
                        'title' => $this->l('Shipment information'),
                    ],
                    'input' => [
                        [
                            'label' => $this->l('Enter the amount of parcels/pallets'),
                            'name' => 'info1',
                            'type' => 'text',
                            'class' => 'fixed-width-xxl',
                            'required' => true,
                            'desc' => $this->l('e.g. #1cll, 2pll (always starts with # and then the amount of parcels and/or pallets)')
                        ],
                        [
                            'label' => $this->l('Additional information (order number)'),
                            'name' => 'info2',
                            'type' => 'text',
                            'class' => 'fixed-width-xxl',
                        ],
                    ],
                ],
            ],
        ];
        /** @var PhonePrefixRepository $phonePrefixRepository */
        $phonePrefixRepository = $this->module->getModuleContainer(PhonePrefixRepository::class);

        /** @var PhoneInputBuilder $phoneInputBuilder */
        $phoneInputBuilder = $this->module->getModuleContainer(PhoneInputBuilder::class);

        $saveBtnClasses = 'btn btn-default pull-right js-col-request-save';

        if (!$this->object->id) {
            $this->fields_form[2]['form']['submit'] = [
                'title' => $this->l('Save'),
                'class' => $saveBtnClasses,
            ];
        }

        $this->fields_value['pickup_address_prefill_placeholder'] = $this->renderPrefillSelect('pickup_address_');
        $this->fields_value['receiver_address_prefill_placeholder'] = $this->renderPrefillSelect('receiver_address_');

        if (Tools::getIsset('submitAdddpd_collection_request')) {
            $phoneData['pickup_address_mobile_phone_code'] = Tools::getValue('pickup_address_mobile_phone_code');
            $phoneData['pickup_address_mobile_phone'] = Tools::getValue('pickup_address_mobile_phone');

            $phoneData['receiver_address_mobile_phone_code'] = Tools::getValue('receiver_address_mobile_phone_code');
            $phoneData['receiver_address_mobile_phone'] = Tools::getValue('receiver_address_mobile_phone');
        } elseif (Tools::getIsset('id_dpd_collection_request')) {

            /** @var CollectionRequestRepository $collectionRequestRepository */
            $collectionRequestRepository = $this->module->getModuleContainer(CollectionRequestRepository::class);
            $phoneData = $collectionRequestRepository->getPhonesAndCodes(
                Tools::getValue('id_dpd_collection_request')
            );
        }

        if (!isset($phoneData) || !$phoneData) {
            $countryCalliungCode = null;

            $phoneData['pickup_address_mobile_phone_code'] = $countryCalliungCode;
            $phoneData['pickup_address_mobile_phone'] = null;
            $phoneData['receiver_address_mobile_phone_code'] = $countryCalliungCode;
            $phoneData['receiver_address_mobile_phone'] = null;
        }
        $phoneData['mobile_phone_code_list'] = $phonePrefixRepository->getCallPrefixes();
        $this->fields_value['pickup_address_mobile_phone'] = $phoneInputBuilder->renderPhoneInput(
            'pickup_address_mobile_phone',
            $phoneData['mobile_phone_code_list'],
            $phoneData['pickup_address_mobile_phone_code'],
            $phoneData['pickup_address_mobile_phone']
        );
        $this->fields_value['pickup_address_fix_phone'] = $phoneInputBuilder->renderPhoneInput(
            'pickup_address_fix_phone',
            $phoneData['mobile_phone_code_list']
        );

        $this->fields_value['receiver_address_mobile_phone'] = $phoneInputBuilder->renderPhoneInput(
            'receiver_address_mobile_phone',
            $phoneData['mobile_phone_code_list'],
            $phoneData['receiver_address_mobile_phone_code'],
            $phoneData['receiver_address_mobile_phone']
        );
        $this->fields_value['receiver_address_fix_phone'] = $phoneInputBuilder->renderPhoneInput(
            'receiver_address_fix_phone',
            $phoneData['mobile_phone_code_list']
        );
    }

    private function initList()
    {
        $this->addRowAction('viewCollectionRequest');

        $this->fields_list['id_dpd_collection_request'] = [
            'title' => $this->l('ID'),
            'type' => 'text',
        ];

        $this->fields_list['date_add'] = [
            'title' => $this->l('Shipment date'),
            'type' => 'date',
        ];

        $this->fields_list['pickup_address_contact_name'] = [
            'title' => $this->l('Pickup address contact name'),
            'type' => 'text',
        ];

        $this->fields_list['pickup_address_email'] = [
            'title' => $this->l('Pickup address email'),
            'type' => 'text',
        ];

        $this->fields_list['receiver_address_contact_name'] = [
            'title' => $this->l('Receiver address contact name'),
            'type' => 'text',
        ];

        $this->fields_list['receiver_address_email'] = [
            'title' => $this->l('Receiver address email'),
            'type' => 'text',
        ];
    }

    public function setMedia($isNewTheme = false)
    {
        parent::setMedia($isNewTheme);

        //checks if its add or update or submit
        if (Tools::isSubmit('adddpd_collection_request')
            || Tools::isSubmit('updatedpd_collection_request')
            || Tools::isSubmit('submitAdddpd_collection_request')) {
            $this->addJS($this->module->getLocalPath() . 'views/js/admin/zip_code_hint.js');
            $this->addJS($this->module->getLocalPath() . 'views/js/admin/collection_request.js');

            Media::addJsDef([
                'dpdAjaxUrl' =>
                    $this->context->link->getAdminLink(DPDBaltics::ADMIN_AJAX_CONTROLLER),
            ]);
        }

        $this->addCSS($this->module->getPathUri() . 'views/css/admin/collection_request.css');
    }

    private function renderPrefillSelect($prefix)
    {
        /** @var AddressRepository $addressRepository */
        $addressRepository = $this->module->getModuleContainer(AddressRepository::class);
        $addresses = $addressRepository->findAllByShop();

        $this->context->smarty->assign('address_templates', $addresses);
        $this->context->smarty->assign('prefix', $prefix);

        return $this->context->smarty->fetch(
            $this->module->getLocalPath() . 'views/templates/admin/partials/address-select.tpl'
        );
    }

    //todo:: if Exception is caught it returns to list.
    public function postProcess()
    {
        if (Tools::isSubmit('submitAdddpd_collection_request')) {
            /** @var FormDataConverter $formDataConverter */
            $formDataConverter = $this->module->getModuleContainer(FormDataConverter::class);
            $data = Tools::getAllValues();

            /** @var CollectionRequestData $collectionRequestObj */
            $collectionRequestObj = $formDataConverter->convertCollectionRequestFormDataToCollectionRequestObj($data);

            /** @var CollectionRequestService $collectionRequestService */
            $collectionRequestService = $this->module->getModuleContainer(CollectionRequestService::class);
            try {
                $response = $collectionRequestService->createCollectionRequest($collectionRequestObj);
            } catch (DPDBalticsAPIException $e) {
                /** @var ExceptionService $exceptionService */
                $exceptionService = $this->module->getModuleContainer(ExceptionService::class);
                $this->errors[] = $exceptionService->getErrorMessageForException(
                    $e,
                    $exceptionService->getAPIErrorMessages()
                );
                return;
            } catch (Exception $e) {
                $this->errors[] = $e->getMessage();
                return;
            }
            if ($response['status']) {
                $this->confirmations[] = $response['message'];
            } else {
                $this->errors[] = $response['message'];
            }
        }

        parent::postProcess();
    }

    public function displayViewCollectionRequestLink($token, $idCollectionRequest)
    {
        $collectionRequestUrl =
            $this->context->link->getAdminLink(DPDBaltics::ADMIN_COLLECTION_REQUEST_CONTROLLER, false);
        $collectionRequestUrl .=
            '&id_dpd_collection_request=' . $idCollectionRequest . '&updatedpd_collection_request&token=' . $token;

        $params = [
            'href' => $collectionRequestUrl,
            'action' => $this->l('View'),
            'icon' => 'icon-search-plus'
        ];

        return $this->renderListAction($params);
    }

    protected function renderListAction(array $params)
    {
        $this->context->smarty->assign($params);

        return $this->context->smarty->fetch($this->module->getLocalPath() . 'views/templates/admin/list-action.tpl');
    }
}
