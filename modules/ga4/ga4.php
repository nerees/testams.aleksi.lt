<?php
/**
 * 2012-2022 INNERCODE
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the EULA (End User License Agreement)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://www.innercode.lt/ps-module-eula.txt
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to info@innercode.lt so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future.
 *
 * @author    Innercode
 * @copyright Copyright (c) 2012 - 2022 INNERCODE, UAB. (https://www.innercode.lt)
 * @license   https://www.innercode.lt/ps-module-eula.txt
 * @package   icga4
 * @site      https://www.innercode.lt
 */

if (!defined('_PS_VERSION_')) {
    exit;
}

class Ga4 extends Module
{
    protected $config_form = false;

    public function __construct()
    {
        $this->name = 'ga4';
        $this->tab = 'advertising_marketing';
        $this->version = '1.0.0';
        $this->author = 'Dev4Web';
        $this->need_instance = 0;
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('GA4 Analytics');
        $this->description = $this->l('GA4 Analytics push events.');
        $this->ps_versions_compliancy = array('min' => '1.6', 'max' => '1.7.9');
        $this->html = '';
    }

    /**
     * @return bool
     */
    public function install()
    {
        return parent::install() &&
            Configuration::updateValue('GA4_ENABLED', 0) &&
            $this->registerHook('displayHeader');
    }

    /**
     * @return mixed
     */
    public function uninstall()
    {
        return parent::uninstall();
    }

    /**
     * @return string
     */
    public function getContent()
    {
        $this->html = '';

        if ((bool)Tools::isSubmit('submitSettings')) {
            $this->postProcess();
        }

        $this->html .= $this->renderTabForm();

        return $this->html;
    }

    /**
     * @return array
     */
    protected function getFormValues()
    {
        return array(
            'GA4_ID' => Configuration::get('GA4_ID'),
            'GA4_ENABLED' => Configuration::get('GA4_ENABLED'),
        );
    }

    public function getConfigFieldsValues()
    {
        $fields = array();
        $configurations = $this->getFormValues();

        foreach (array_keys($configurations) as $config) {
            $fields[$config] = Configuration::get($config);
        }

        return $fields;
    }

    protected function postProcess()
    {
        $formValues = $this->getFormValues();

        foreach (array_keys($formValues) as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }

        $this->html .= $this->displayConfirmation($this->l('Successfully updated.'));
    }

    public function hookDisplayHeader()
    {
        // Don't output if no GA4 tag ID is added
        if (! Configuration::get('GA4_ID')) {
            return;
        }
        $this->context->controller->addJS($this->local_path.'views/js/gtagInitialize.js');
        $idLang = $this->context->language->id;
        $controller = $this->context->controller->php_self;

        if ($controller == 'order-confirmation' && Tools::getValue('id_order')) {

            $this->context->controller->addJS($this->local_path.'views/js/front.js');

            $order = new Order(Tools::getValue('id_order'));
            $products = $order->getProducts();

            foreach ($products as &$product) {
                $product['brand'] = Manufacturer::getNameById((int)$product['id_manufacturer']) ?: 'NO_BRAND';
                $categories = Product::getProductCategoriesFull((int)$product['id_product']);
                $product['category'] = implode('/', array_column($categories, 'name'));
            }

            Media::addJsDef(array(
                'ga4OrderId' => $order->id,
                'ga4OrderProducts' => $products,
                'ga4OrderProductsTotal' => $order->total_products_wt,
                'ga4ShippingTotal' => $order->total_shipping_tax_incl,
                'ga4OrderTotal' => $order->total_paid_tax_incl,
                'ga4OrderTaxAmount' => $order->total_paid_tax_incl - $order->total_paid_tax_excl,
                'ga4Id' => trim(Configuration::get('GA4_ID'))
            ));
        }else {
            Media::addJsDef(array(
                'ga4Id' => trim(Configuration::get('GA4_ID'))
            ));
        }

        $this->context->controller->addJS($this->local_path.'views/js/gtagInit.js');

        $this->context->smarty->assign(array(
            'ga4Enabled' => (int) Configuration::get('GA4_ENABLED') == 1 ? true : false,
            'ga4Id' => trim(Configuration::get('GA4_ID')),
        ));

        return $this->display(__FILE__, 'views/templates/front/header.tpl');
    }

    protected function renderTabForm()
    {
        $fields_form = array(
            'form' => array(
                'legend' => array(
                    'title' => $this->l('Settings'),
                    'icon' => 'icon-cogs',
                ),
                'input' => array(
                    array(
                        'type' => 'text',
                        'label' => $this->l('Add Google Tag to pages:'),
                        'name' => 'GA4_ID',
                        'col' => 2,
                    ),
                    array (
                        'type' => 'switch',
                        'name' => 'GA4_ENABLED',
                        'label' => $this->l('Add Google Tag to pages:'),
                        'is_bool' => true,
                        'values' => array(
                            array(
                                'id' => 'label_on',
                                'value' => 1,
                                'label' => $this->l('Enabled')
                            ),
                            array(
                                'id' => 'label_off',
                                'value' => 0,
                                'label' => $this->l('Disabled')
                            )
                        )
                    ),
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                )
            ),
        );

        $helper = new HelperForm();
        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);
        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitSettings';
        $helper->currentIndex = AdminController::$currentIndex.'&configure='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFieldsValues(),
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        );

        return $helper->generateForm(array($fields_form));
    }
}
