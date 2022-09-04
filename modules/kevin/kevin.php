<?php

/*
 * 2020 kevin.
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 *  @author 2020 kevin. <info@getkevin.eu>
 *  @copyright kevin.
 *  @license http://opensource.org/licenses/afl-3.0.php Academic Free License (AFL 3.0)
 */

use PrestaShop\PrestaShop\Core\Payment\PaymentOption;

if (!defined('_PS_VERSION_')) {
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';

/**
 * Class Kevin
 */
class Kevin extends PaymentModule {

    protected $_html = '';
    protected $_postErrors = array();
    protected $_warning;
    public $clientId;
    public $clientSecret;
    public $creditorName;
    public $creditorAccount;

    /**
     * Kevin constructor.
     * @throws PrestaShopException
     */
    public function __construct() {
        $this->name = 'kevin';
        $this->tab = 'payments_gateways';
        $this->version = '1.8.8';
        $this->ps_versions_compliancy = array('min' => '1.6', 'max' => '1.7');
        $this->author = 'kevin.';
        $this->controllers = array('redirect', 'confirm', 'webhook');
        $this->need_instance = 0;

        $this->bootstrap = true;
        parent::__construct();

        $this->displayName = $this->l('kevin.');
        $this->description = $this->l('kevin. is a payment infrastructure company which offers payment initiation service in EU&EEA.');

        $this->confirmUninstall = $this->l('Are you sure you would like to uninstall?');

        $this->limited_countries = array('LT', 'LV', 'EE', 'FI', 'SE', 'RU', 'PL', 'EN');
        $this->limited_currencies = array('EUR');

        $config = Configuration::getMultiple(array('KEVIN_CLIENT_ID', 'KEVIN_CLIENT_SECRET'));
        if (!empty($config['KEVIN_CLIENT_ID'])) {
            $this->clientId = $config['KEVIN_CLIENT_ID'];
        }
        if (!empty($config['KEVIN_CLIENT_SECRET'])) {
            $this->clientSecret = $config['KEVIN_CLIENT_SECRET'];
        }
        if (!$this->_warning && (!isset($this->clientId) || !isset($this->clientSecret))) {
            $this->_warning = $this->l('Client ID and Client Secret must be configured before using this module.');
        }

        $config = Configuration::getMultiple(array('KEVIN_CREDITOR_NAME', 'KEVIN_CREDITOR_ACCOUNT'));
        if (!empty($config['KEVIN_CREDITOR_NAME'])) {
            $this->creditorName = $config['KEVIN_CREDITOR_NAME'];
        }
        if (!empty($config['KEVIN_CREDITOR_ACCOUNT'])) {
            $this->creditorAccount = $config['KEVIN_CREDITOR_ACCOUNT'];
        }
        if (!$this->_warning && (!isset($this->creditorName) || !isset($this->creditorAccount))) {
            $this->_warning = $this->l('Company Name and Company Bank Account must be configured before using this module.');
        }
    }

    /**
     * Process module installation.
     *
     * @return bool
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function install() {
        $iso_code = Country::getIsoById(Configuration::get('PS_COUNTRY_DEFAULT'));

        if (in_array($iso_code, $this->limited_countries) == false) {
            $this->_errors[] = $this->l('This module is not available in your country');

            return false;
        }

        include(dirname(__FILE__) . '/sql/install.php');

        $order_statuses = $this->getDefaultOrderStatuses();
        foreach ($order_statuses as $status_key => $status_config) {
            $this->addOrderStatus($status_key, $status_config);
        }

        return parent::install() &&
                $this->registerHook('header') &&
                $this->registerHook('backOfficeHeader') &&
                $this->registerHook('payment') &&
                $this->registerHook('orderConfirmation') &&
                $this->registerHook('paymentOptions') &&
                $this->registerHook('displayAdminOrderContentShip') &&
                $this->registerHook('displayBackOfficeHeader') &&
                $this->registerHook('displayAdminOrderTabShip') &&
                $this->registerHook('displayAdminOrderTabLink') &&
                $this->registerHook('displayAdminOrderTabContent') &&
                $this->registerHook('displayOrderConfirmation');
    }

    /**
     * Process module uninstall.
     *
     * @return bool
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function uninstall() {
        $config_form_values = $this->getConfigFormValues();
        foreach (array_keys($config_form_values) as $config_key) {
            Configuration::deleteByName($config_key);
        }

        $order_statuses = $this->getDefaultOrderStatuses();
        foreach ($order_statuses as $status_key => $status_config) {
            $this->removeOrderStatus($status_key);
            Configuration::deleteByName($status_key);
        }

        include(dirname(__FILE__) . '/sql/uninstall.php');

        return parent::uninstall() &&
                $this->unregisterHook('header') &&
                $this->unregisterHook('backOfficeHeader') &&
                $this->unregisterHook('payment') &&
                $this->unregisterHook('orderConfirmation') &&
                $this->unregisterHook('paymentOptions') &&
                $this->unregisterHook('displayOrderConfirmation');
    }

    public function reset() {
        if (!$this->uninstall(false)) {
            return false;
        }
        if (!$this->install(false)) {
            return false;
        }

        return true;
    }

    /**
     * Load the configuration form.
     *
     * @return string
     * @throws SmartyException
     */
    public function getContent() {
        $is_submit = false;
        $buttons = ['submitKevinModule1', 'submitKevinModule2', 'submitKevinModule3'];
        foreach ($buttons as $button) {
            if ((boolval(Tools::isSubmit($button))) === true) {
                $is_submit = true;
                break;
            }
        }

        if ($is_submit === true) {
            $this->postValidation();
            if (!count($this->_postErrors)) {
                $this->postProcess();
            } else {
                foreach ($this->_postErrors as $err) {
                    $this->_html .= $this->displayError($err);
                }
            }
        } else {
            $this->_html .= '<br>';
        }

        if (isset($this->_warning) && !count($this->_postErrors) && $is_submit === false) {
            $this->_html .= $this->displayError($this->_warning);
        }

        $this->context->controller->addCSS($this->_path . '/views/css/back.css');

        $this->context->smarty->assign('module_dir', $this->_path);

        $this->_html .= $this->context->smarty->fetch($this->local_path . 'views/templates/admin/configure.tpl');
        $this->_html .= $this->renderForm();

        return $this->_html;
    }

    /**
     * Create the form that will be displayed in the configuration of your module.
     *
     * @return string
     */
    protected function renderForm() {
        $client_form = array(
            'form' => array(
                'legend' => array(
                    'title' => $this->l('Client Details'),
                    'icon' => 'icon-key',
                ),
                'input' => array(
                    array(
                        'col' => 6,
                        'type' => 'text',
                        'label' => $this->l('Client ID'),
                        'name' => 'KEVIN_CLIENT_ID',
                        'required' => true,
                    ),
                    array(
                        'col' => 6,
                        'type' => 'text',
                        'label' => $this->l('Client Secret'),
                        'name' => 'KEVIN_CLIENT_SECRET',
                        'required' => true,
                    ),
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                    'name' => 'submitKevinModule1',
                ),
            ),
        );

        $creditor_form = array(
            'form' => array(
                'legend' => array(
                    'title' => $this->l('Company Details'),
                    'icon' => 'icon-user',
                ),
                'input' => array(
                    array(
                        'col' => 6,
                        'type' => 'text',
                        'label' => $this->l('Company Name'),
                        'name' => 'KEVIN_CREDITOR_NAME',
                        'required' => true,
                    ),
                    array(
                        'col' => 6,
                        'type' => 'text',
                        'label' => $this->l('Company Bank Account'),
                        'name' => 'KEVIN_CREDITOR_ACCOUNT',
                        'required' => true,
                    ),
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                    'name' => 'submitKevinModule2',
                ),
            ),
        );

        $settings_form = array(
            'form' => array(
                'legend' => array(
                    'title' => $this->l('Settings'),
                    'icon' => 'icon-cogs',
                ),
                'input' => array(
                    array(
                        'col' => 6,
                        'type' => 'switch',
                        'label' => $this->l('Redirect Preferred'),
                        'name' => 'KEVIN_REDIRECT_PREFERRED',
                        'desc' => $this->l('Redirect user directly to bank.'),
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => 1,
                                'label' => $this->l('Enabled')
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => 0,
                                'label' => $this->l('Disabled')
                            )
                        ),
                    ),
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                    'name' => 'submitKevinModule3',
                ),
            ),
        );

        $helper = new HelperForm();

        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitKevinModule';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
                . '&configure=' . $this->name . '&tab_module=' . $this->tab . '&module_name=' . $this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFormValues(),
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        );

        return $helper->generateForm(array($client_form, $creditor_form, $settings_form));
    }

    /**
     * Set values for the inputs.
     *
     * @return array
     */
    protected function getConfigFormValues() {
        $redirectPreferred = Tools::getValue('KEVIN_REDIRECT_PREFERRED', Configuration::get('KEVIN_REDIRECT_PREFERRED'));
        if ($redirectPreferred === false) {
            $redirectPreferred = 1;
        }

        return array(
            'KEVIN_CLIENT_ID' => Tools::getValue('KEVIN_CLIENT_ID', Configuration::get('KEVIN_CLIENT_ID')),
            'KEVIN_CLIENT_SECRET' => Tools::getValue('KEVIN_CLIENT_SECRET', Configuration::get('KEVIN_CLIENT_SECRET')),
            'KEVIN_CREDITOR_NAME' => Tools::getValue('KEVIN_CREDITOR_NAME', Configuration::get('KEVIN_CREDITOR_NAME')),
            'KEVIN_CREDITOR_ACCOUNT' => Tools::getValue('KEVIN_CREDITOR_ACCOUNT', Configuration::get('KEVIN_CREDITOR_ACCOUNT')),
            'KEVIN_REDIRECT_PREFERRED' => $redirectPreferred,
        );
    }

    /**
     * Validate form data.
     */
    protected function postValidation() {
        if (((bool) Tools::isSubmit('submitKevinModule1')) === true) {
            if (!Tools::getValue('KEVIN_CLIENT_ID')) {
                $this->_postErrors[] = $this->l('Client ID is required.');
            } elseif (!Tools::getValue('KEVIN_CLIENT_SECRET')) {
                $this->_postErrors[] = $this->l('Client Secret is required.');
            }
        }
        if (((bool) Tools::isSubmit('submitKevinModule2')) === true) {
            if (!Tools::getValue('KEVIN_CREDITOR_NAME')) {
                $this->_postErrors[] = $this->l('Company Name is required.');
            } elseif (!Tools::getValue('KEVIN_CREDITOR_ACCOUNT')) {
                $this->_postErrors[] = $this->l('Company Bank Account is required.');
            }
        }
    }

    /**
     * Save form data.
     */
    protected function postProcess() {
        $config_form_values = $this->getConfigFormValues();
        foreach (array_keys($config_form_values) as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
    }

    /**
     * Hook files for frontend.
     */
    public function hookHeader() {
        $this->context->controller->addCSS($this->_path . 'views/css/front.css');
    }

    /**
     * Hook files for frontend.
     */
    public function hookBackOfficeHeader() {
        if (Tools::getValue('module_name') == $this->name) {
            $this->context->controller->addCSS($this->_path . 'views/css/back.css');
        }
        if (Tools::getValue('id_order')) {
            $this->context->controller->addJquery();
            Media::addJsDefL('kevin_text', $this->l('Grąžinti pinigus per kevin sistemą'));
            $this->context->controller->addJs($this->_path . 'views/js/back.js');
        }
        $order = new Order(Tools::getValue('id_order'));
        if (Tools::isSubmit('partialRefund') && isset($order) && Tools::getValue('refundwithkevin')) {
            if (Tools::isSubmit('partialRefundProduct') && ($refunds = Tools::getValue('partialRefundProduct')) && is_array($refunds)) {
                $amount = 0;
                $order_detail_list = array();
                $full_quantity_list = array();
                foreach ($refunds as $id_order_detail => $amount_detail) {
                    $quantity = Tools::getValue('partialRefundProductQuantity');
                    if (!$quantity[$id_order_detail]) {
                        continue;
                    }

                    $full_quantity_list[$id_order_detail] = (int) $quantity[$id_order_detail];

                    $order_detail_list[$id_order_detail] = array(
                        'quantity' => (int) $quantity[$id_order_detail],
                        'id_order_detail' => (int) $id_order_detail,
                    );

                    $order_detail = new OrderDetail((int) $id_order_detail);
                    if (empty($amount_detail)) {
                        $order_detail_list[$id_order_detail]['unit_price'] = (!Tools::getValue('TaxMethod') ? $order_detail->unit_price_tax_excl : $order_detail->unit_price_tax_incl);
                        $order_detail_list[$id_order_detail]['amount'] = $order_detail->unit_price_tax_incl * $order_detail_list[$id_order_detail]['quantity'];
                    } else {
                        $order_detail_list[$id_order_detail]['amount'] = (float) str_replace(',', '.', $amount_detail);
                        $order_detail_list[$id_order_detail]['unit_price'] = $order_detail_list[$id_order_detail]['amount'] / $order_detail_list[$id_order_detail]['quantity'];
                    }
                    $amount += $order_detail_list[$id_order_detail]['amount'];
                }

                $shipping_cost_amount = (float) str_replace(',', '.', Tools::getValue('partialRefundShippingCost')) ? (float) str_replace(',', '.', Tools::getValue('partialRefundShippingCost')) : false;

                if ($amount == 0 && $shipping_cost_amount == 0) {
                    if (!empty($refunds)) {
                        $this->errors[] = $this->l('Please enter a quantity to proceed with your refund.', array(), 'Admin.Orderscustomers.Notification');
                    } else {
                        $this->errors[] = $this->l('Please enter an amount to proceed with your refund.', array(), 'Admin.Orderscustomers.Notification');
                    }

                    return false;
                }

                $choosen = false;
                $voucher = 0;

                if ((int) Tools::getValue('refund_voucher_off') == 1) {
                    $amount -= $voucher = (float) Tools::getValue('order_discount_price');
                } elseif ((int) Tools::getValue('refund_voucher_off') == 2) {
                    $choosen = true;
                    $amount = $voucher = (float) Tools::getValue('refund_voucher_choose');
                }

                if ($shipping_cost_amount > 0) {
                    if (!Tools::getValue('TaxMethod')) {
                        $tax = new Tax();
                        $tax->rate = $order->carrier_tax_rate;
                        $tax_calculator = new TaxCalculator(array($tax));
                        $amount += $tax_calculator->addTaxes($shipping_cost_amount);
                    } else {
                        $amount += $shipping_cost_amount;
                    }
                }
            }
            $id_order = Tools::getValue('id_order');
            $sql = 'SELECT * FROM ' . _DB_PREFIX_ . 'kevin WHERE id_order = \'' . pSQL($id_order) . '\'';
            $order = new Order($id_order);
            if ($row = Db::getInstance()->getRow($sql)) {
                try {
                    $paymentId = $row['payment_id'];
                    $amount = number_format($amount, 2);
                    if (!$paymentId) {
                        exit();
                    }
                    $kevinPayment = $this->getClient()->payment();
                    $webhook_url = $this->context->link->getModuleLink('kevin', 'webhook', array(), true);
                    $attr = [
                        'amount' => $amount,
                        'Webhook-URL' => $webhook_url,
                    ];

                    try {
                        $response = $kevinPayment->initiatePaymentRefund($paymentId, $attr);
                    } catch (\Kevin\KevinException $e) {
                        $customer_thread = new CustomerThread();
                        $customer_thread->id_contact = 0;
                        $customer_thread->id_customer = (int) $order->id_customer;
                        $customer_thread->id_shop = (int) $order->id_shop;
                        $customer_thread->id_order = (int) $order->id;
                        $customer_thread->id_lang = (int) $order->id_lang;
                        $customer_thread->email = $customer->email;
                        $customer_thread->status = 'closed';
                        $customer_thread->token = Tools::passwdGen(12);
                        $customer_thread->add();
                        $customer_message = new CustomerMessage();
                        $customer_message->id_customer_thread = $customer_thread->id;
                        $customer_message->id_employee = 0;
                        $customer_message->message = $e->getMessage();
                        $customer_message->private = 1;
                        $customer_message->add();
                        return true;
                    }

                    if ($response) {
                        $customer_thread = new CustomerThread();
                        $customer_thread->id_contact = 0;
                        $customer_thread->id_customer = (int) $order->id_customer;
                        $customer_thread->id_shop = (int) $order->id_shop;
                        $customer_thread->id_order = (int) $order->id;
                        $customer_thread->id_lang = (int) $order->id_lang;
                        $customer_thread->email = $customer->email;
                        $customer_thread->status = 'closed';
                        $customer_thread->token = Tools::passwdGen(12);
                        $customer_thread->add();
                        $customer_message = new CustomerMessage();
                        $customer_message->id_customer_thread = $customer_thread->id;
                        $customer_message->id_employee = 0;
                        $customer_message->message = $this->l('Refund process started. Amount ') . Tools::displayPrice($response['amount']);
                        $customer_message->private = 1;
                        $customer_message->add();
                        return true;
                    } else {
                        return $this->displayError($this->l('Refund failed.'));
                    }
                } catch (\Kevin\KevinException $e) {
                    $customer_thread = new CustomerThread();
                    $customer_thread->id_contact = 0;
                    $customer_thread->id_customer = (int) $order->id_customer;
                    $customer_thread->id_shop = (int) $order->id_shop;
                    $customer_thread->id_order = (int) $order->id;
                    $customer_thread->id_lang = (int) $order->id_lang;
                    $customer_thread->email = $customer->email;
                    $customer_thread->status = 'closed';
                    $customer_thread->token = Tools::passwdGen(12);
                    $customer_thread->add();
                    $customer_message = new CustomerMessage();
                    $customer_message->id_customer_thread = $customer_thread->id;
                    $customer_message->id_employee = 0;
                    $customer_message->message = $e->getMessage();
                    $customer_message->private = 1;
                    $customer_message->add();
                    return true;
                }
            }
        }
    }

    /**
     * Display payment buttons.
     *
     * @param $params
     * @return bool|string
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookPayment($params) {
        $currency_id = $params['cart']->id_currency;
        $currency = new Currency((int) $currency_id);

        if (in_array($currency->iso_code, $this->limited_currencies) == false) {

            return false;
        }

        if (!$this->validateClientCredentials()) {

            return false;
        }

        $banks = [];
        $bank_data = $this->getBanks();
            $kevinAuth = $this->getClient()->auth();
        $paymentMethods = $kevinAuth->getPaymentMethods();
        if (in_array("bank", $paymentMethods['data'])) {
            foreach ($bank_data as $bank_datum) {
                $banks[] = [
                    'id' => $bank_datum['id'],
                    'title' => $bank_datum['name'],
                    'logo' => $bank_datum['imageUri'],
                    'action' => $this->context->link->getModuleLink($this->name, 'redirect', array('id' => $bank_datum['id']), true),
                ];
            }
            if (in_array("card", $paymentMethods['data'])) {
                $banks[] = [
                    'id' => 'card',
                    'title' => 'Credit/Debit card',
                    'logo' => Context::getContext()->shop->getBaseURL(true) . 'modules/kevin/views/img/card.png',
                    'action' => $this->context->link->getModuleLink($this->name, 'redirect', array('id' => 'card'), true),
                ];
            }
        }

        $this->smarty->assign(array(
            'banks' => $banks,
            'module_dir' => $this->_path,
        ));

        return $this->display(__FILE__, 'views/templates/hook/payment.tpl');
    }

    /**
     * Display confirmation page.
     *
     * @param $params
     * @return string
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookOrderConfirmation($params) {
        $order = $params['objOrder'];
        return $this->orderconfirm($order->id);
    }

    /**
     * Return payment options.
     *
     * @param array
     * @return array|null
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookPaymentOptions($params) {
        if (!$this->active) {

            return null;
        }

        if (!$this->validateCurrency($params['cart'])) {

            return null;
        }

        if (!$this->validateClientCredentials()) {

            return null;
        }

        $options = [];
        $bank_data = $this->getBanks();
        $kevinAuth = $this->getClient()->auth();
        $paymentMethods = $kevinAuth->getPaymentMethods();

        if (in_array("bank", $paymentMethods['data'])) {
            foreach ($bank_data as $bank_datum) {
                $option = new PaymentOption();
                $option->setModuleName($this->name);
                $option->setCallToActionText($bank_datum['name']);
                $option->setLogo($bank_datum['imageUri']);
                $option->setAction($this->context->link->getModuleLink($this->name, 'redirect', array('id' => $bank_datum['id']), true));
                $options[] = $option;
            }
        }
        if (in_array("card", $paymentMethods['data'])) {
            $option = new PaymentOption();
            $option->setModuleName($this->name);
            $option->setCallToActionText('Credit/Debit card');
            $option->setLogo(Context::getContext()->shop->getBaseURL(true) . 'modules/kevin/views/img/card.png');
            $option->setAction($this->context->link->getModuleLink($this->name, 'redirect', array('id' => 'card'), true));
            $options[] = $option;
        }
        return $options;
    }

    /**
     * Return Kevin PHP Client instance.
     *
     * @return \Kevin\Client
     * @throws \Kevin\KevinException
     */
    public function getClient() {
        $options = array(
            'error' => 'exception',
            'version' => '0.3',
        );
        $options = array_merge($options, $this->getSystemData());
        return new \Kevin\Client($this->clientId, $this->clientSecret, $options);
    }

    public function getSystemData() {
        return array(
            'pluginVersion' => $this->version,
            'pluginPlatform' => 'PrestaShop',
            'pluginPlatformVersion' => _PS_VERSION_
        );
    }

    /**
     * Return list of supported banks.
     *
     * @return array
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    protected function getBanks() {
        try {
            $cart = $this->context->cart;
            $address = new Address($cart->id_address_invoice);
            $country = new Country($address->id_country);

            $kevinAuth = $this->getClient()->auth();
            $banks = $kevinAuth->getBanks(['countryCode' => $country->iso_code]);
        } catch (\Kevin\KevinException $exception) {

            return [];
        }

        return $banks['data'];
    }

    /**
     * Return list of default order statuses.
     *
     * @return array[]
     */
    protected function getDefaultOrderStatuses() {
        return array(
            'KEVIN_ORDER_STATUS_STARTED' => array(
                'send_email' => false,
                'name' => $this->l('Payment Started'),
                'color' => 'Lavender',
                'paid' => false,
            ),
            'KEVIN_ORDER_STATUS_PENDING' => array(
                'name' => $this->l('Payment Pending'),
                'color' => 'Orchid',
                'paid' => false,
            ),
        );
    }

    /**
     * Register module related order statuses.
     *
     * @param $statusKey
     * @param $statusConfig
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function addOrderStatus($statusKey, $statusConfig) {
        $orderState = new OrderState();
        $orderState->module_name = $this->name;
        $orderState->color = $statusConfig['color'];
        $orderState->send_email = false;
        $orderState->paid = $statusConfig['paid'];
        $orderState->name = array();
        $orderState->delivery = false;
        $orderState->logable = true;
        $orderState->hidden = false;
        foreach (Language::getLanguages() as $language) {
            if ($statusKey == 'KEVIN_ORDER_STATUS_COMPLETED') {
                $orderState->template[$language['id_lang']] = 'payment';
            }
            $orderState->name[$language['id_lang']] = $statusConfig['name'];
        }
        $orderState->add();

        Configuration::updateValue($statusKey, $orderState->id);
    }

    /**
     * Unregister module related order statuses.
     *
     * @param $statusKey
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function removeOrderStatus($statusKey) {
        $order_state_id = Configuration::get($statusKey);
        if ($order_state_id) {
            $orderState = new OrderState($order_state_id);
            if (Validate::isLoadedObject($orderState)) {
                try {
                    $orderState->delete();
                } catch (\Exception $e) {
                    
                }
            }
        }
    }

    /**
     * Validate client credentials.
     *
     * @return bool
     */
    public function validateClientCredentials() {
        if (empty($this->clientId) || empty($this->clientSecret) || empty($this->creditorName) || empty($this->creditorAccount)) {

            return false;
        }

        return true;
    }

    /**
     * Validate cart currency.
     *
     * @param $cart
     * @return bool
     */
    public function validateCurrency($cart) {
        $currency_id = $cart->id_currency;
        $currency = new Currency((int) $currency_id);

        if (in_array($currency->iso_code, $this->limited_currencies) == false) {

            return false;
        }

        return true;
    }

    public function hookdisplayOrderConfirmation($params) {
        if (version_compare(_PS_VERSION_, '1.7.0') < 0) {
            $order = $params['objOrder'];
        } else {
            $order = $params['order'];
        }
        $orderid = $order->id;
        if (!$this->active) {
            return null;
        }
        return $this->orderconfirm($orderid);
    }

    public function orderconfirm($orderid) {

        $sql = 'SELECT * FROM ' . _DB_PREFIX_ . 'kevin WHERE id_order = \'' . pSQL($orderid) . '\'';
        if ($row = Db::getInstance()->getRow($sql)) {
            try {
                $order = new Order($row['id_order']);
                if (!Validate::isLoadedObject($order)) {
                    Tools::redirect($this->context->link->getPageLink('order'));
                }

                $customer = new Customer($order->id_customer);
                if (!Validate::isLoadedObject($customer)) {
                    Tools::redirect($this->context->link->getPageLink('order'));
                }

                $kevinPayment = $this->getClient()->payment();
                $response = $kevinPayment->getPaymentStatus($row['payment_id'], array('PSU-IP-Address' => $row['ip_address']));
                if ($response['group'] != 'completed') {
                    $status = '';
                    if (isset($response['bankStatus'])) {
                        $status = $response['bankStatus'];
                    }
                    if (isset($response['cardStatus'])) {
                        $status = $response['cardStatus'];
                    }
                    if (isset($response['hybridStatus'])) {
                        $status = $response['hybridStatus'];
                    }

                    $this->smarty->assign(
                            array(
                                'status' => $status,
                                'group' => $response['group']
                            )
                    );
                    if (version_compare(_PS_VERSION_, '1.7.0') < 0) {
                        return $this->display(__FILE__, '/views/templates/hook/payment_return.tpl');
                    } else {
                        return $this->fetch('module:kevin/views/templates/hook/payment_return.tpl');
                    }
                } else {

                    if (version_compare(_PS_VERSION_, '1.7.0') < 0) {
                        $customer = new Customer($order->id_customer);
                        $paymentinfo = $kevinPayment->getPayment($row['payment_id'], array('PSU-IP-Address' => $row['ip_address']));
                        $kevinAuth = $this->getClient()->auth();
                        $bank = $kevinAuth->getBank($paymentinfo['bankPaymentMethod']['bankId']);
                        if (!empty($bank['officialName'])) {
                            $paymentmethod = 'Kevin (' . $bank['officialName'] . ')';
                        }

                        $this->smarty->assign(array(
                            'id_order_formatted' => sprintf('#%06d', $order->id),
                            'email' => $customer->email,
                            'paymentmethod' => $paymentmethod
                        ));
                        return $this->display(__FILE__, '/views/templates/hook/order-confirmation.tpl');
                    } else {
                        
                    }
                }
            } catch (\Kevin\KevinException $e) {

                return $this->displayError($this->l('An error occurred. Please contact the merchant for more information.'));
            }
        }
    }

    public function hookDisplayAdminOrderTabShip() {
        return $this->displayadminordertab();
    }

    public function hookDisplayAdminOrderTabLink() {
        return $this->displayadminordertab();
    }

    public function hookDisplayAdminOrderContentShip() {
        return $this->displayadmintabcontent();
    }

    public function hookDisplayAdminOrderTabContent() {
        return $this->displayadmintabcontent();
    }

    public function displayadminordertab() {
        $id_order = Tools::getValue('id_order');
        $order = new Order($id_order);

        if ($order->module == $this->name) {
            return $this->display(__FILE__, 'views/templates/hook/admin_order_tab_ship.tpl');
        }
    }

    public function displayadmintabcontent() {
        $id_order = Tools::getValue('id_order');
        $order = new Order($id_order);
        if ($order->module == $this->name) {
            $params = array('id_order' => $id_order);
            $sql = 'SELECT * FROM ' . _DB_PREFIX_ . 'kevin WHERE id_order = \'' . pSQL($id_order) . '\'';
            if ($row = Db::getInstance()->getRow($sql)) {
                $kevinPayment = $this->getClient()->payment();
                $attr = array(
                    'PSU-IP-Address' => $row['ip_address'],
                );
                try {
                    $response = $kevinPayment->getPaymentStatus($row['payment_id'], $attr);
                    $paymentinfo = $kevinPayment->getPayment($row['payment_id'], array('PSU-IP-Address' => $row['ip_address']));
                    $response['payment_id'] = $row['payment_id'];
                    $status = '';
                    if (isset($response['bankStatus'])) {
                        $status = $response['bankStatus'];
                    }
                    if (isset($response['cardStatus'])) {
                        $status = $response['cardStatus'];
                    }
                    if (isset($response['hybridStatus'])) {
                        $status = $response['hybridStatus'];
                    }
                    $this->context->smarty->assign(array(
                        'status' => $status,
                        'group' => $response['group'],
                        'payment_id' => $response['payment_id'],
                    ));
                    return $this->display(__FILE__, 'views/templates/hook/admin_order_content_ship.tpl');
                } catch (Exception $e) {
//                    exit($e->getMessage());
                }
            }
        }
    }

}
