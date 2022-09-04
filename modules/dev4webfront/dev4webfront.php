<?php
/**
* 2007-2021 PrestaShop
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
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2021 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

if (!defined('_PS_VERSION_')) {
    exit;
}

use PrestaShop\PrestaShop\Adapter\Category\CategoryProductSearchProvider;
use PrestaShop\PrestaShop\Adapter\Image\ImageRetriever;
use PrestaShop\PrestaShop\Adapter\Product\PriceFormatter;
use PrestaShop\PrestaShop\Core\Product\ProductListingPresenter;
use PrestaShop\PrestaShop\Adapter\Product\ProductColorsRetriever;
use PrestaShop\PrestaShop\Core\Product\Search\ProductSearchContext;
use PrestaShop\PrestaShop\Core\Product\Search\ProductSearchQuery;
use PrestaShop\PrestaShop\Core\Product\Search\SortOrder;

class Dev4webfront extends Module
{
    protected $config_form = false;
    private $templateFile;

    public function __construct()
    {
        $this->name = 'dev4webfront';
        $this->tab = 'front_office_features';
        $this->version = '1.0.0';
        $this->author = 'Dev4Web hi@dev4web.eu';
        $this->need_instance = 0;

        /**
         * Set $this->bootstrap to true if your module is compliant with bootstrap (PrestaShop 1.6)
         */
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('Dev4Web Front');
        $this->description = $this->l('Front Office features');

        $this->confirmUninstall = $this->l('If You uninstall this module Shop features may stop working');

        $this->ps_versions_compliancy = array('min' => '1.7', 'max' => _PS_VERSION_);
        $this->templateFile = 'module:dev4webfront/views/templates/home.tpl';
    }

    /**
     * Don't forget to create update methods if needed:
     * http://doc.prestashop.com/display/PS16/Enabling+the+Auto-Update
     */
    public function install()
    {
        Configuration::updateValue('DEV4WEBFRONT_LIVE_MODE', false);

        include(dirname(__FILE__).'/sql/install.php');

        return parent::install() &&
            $this->registerHook('header') &&
            $this->registerHook('backOfficeHeader') &&
            $this->registerHook('actionProductAdd') &&
            $this->registerHook('actionProductDelete') &&
            $this->registerHook('actionProductListOverride') &&
            $this->registerHook('actionProductUpdate') &&
            $this->registerHook('displayFooterProduct') &&
            $this->registerHook('displayHome') &&
            $this->registerHook('displayProductListFunctionalButtons');
    }

    public function uninstall()
    {
        Configuration::deleteByName('DEV4WEBFRONT_LIVE_MODE');

        include(dirname(__FILE__).'/sql/uninstall.php');

        return parent::uninstall();
    }

    /**
     * Load the configuration form
     */
    public function getContent()
    {
        /**
         * If values have been submitted in the form, process.
         */
        if (((bool)Tools::isSubmit('submitDev4webfrontModule')) === true) {
            $this->postProcess();
        }

        $this->context->smarty->assign('module_dir', $this->_path);

        $output = $this->context->smarty->fetch($this->local_path.'views/templates/admin/configure.tpl');

        return $output.$this->renderForm();
    }

    /**
     * Create the form that will be displayed in the configuration of your module.
     */
    protected function renderForm()
    {
        $helper = new HelperForm();

        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitDev4webfrontModule';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
            .'&configure='.$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFormValues(), /* Add values for your inputs */
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        );

        return $helper->generateForm(array($this->getConfigForm()));
    }

    /**
     * Create the structure of your form.
     */
    protected function getConfigForm()
    {
        return array(
            'form' => array(
                'legend' => array(
                'title' => $this->l('Settings'),
                'icon' => 'icon-cogs',
                ),
                'input' => array(
                    array(
                        'type' => 'switch',
                        'label' => $this->l('Live mode'),
                        'name' => 'DEV4WEBFRONT_LIVE_MODE',
                        'is_bool' => true,
                        'desc' => $this->l('Use this module in live mode'),
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => true,
                                'label' => $this->l('Enabled')
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => false,
                                'label' => $this->l('Disabled')
                            )
                        ),
                    ),
                    /*array(
                        'col' => 3,
                        'type' => 'text',
                        'prefix' => '<i class="icon icon-envelope"></i>',
                        'desc' => $this->l('Enter a valid email address'),
                        'name' => 'DEV4WEBFRONT_ACCOUNT_EMAIL',
                        'label' => $this->l('Email'),
                    ),
                    array(
                        'type' => 'password',
                        'name' => 'DEV4WEBFRONT_ACCOUNT_PASSWORD',
                        'label' => $this->l('Password'),
                    ),*/
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                ),
            ),
        );
    }

    /**
     * Set values for the inputs.
     */
    protected function getConfigFormValues()
    {
        return array(
            'DEV4WEBFRONT_LIVE_MODE' => Configuration::get('DEV4WEBFRONT_LIVE_MODE', true),
            'DEV4WEBFRONT_ACCOUNT_EMAIL' => Configuration::get('DEV4WEBFRONT_ACCOUNT_EMAIL', 'contact@prestashop.com'),
            'DEV4WEBFRONT_ACCOUNT_PASSWORD' => Configuration::get('DEV4WEBFRONT_ACCOUNT_PASSWORD', null),
        );
    }

    /**
     * Save form data.
     */
    protected function postProcess()
    {
        $form_values = $this->getConfigFormValues();

        foreach (array_keys($form_values) as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
    }

    /**
    * Add the CSS & JavaScript files you want to be loaded in the BO.
    */
    public function hookBackOfficeHeader()
    {
        if (Tools::getValue('module_name') == $this->name) {
            $this->context->controller->addJS($this->_path.'views/js/back.js');
            $this->context->controller->addCSS($this->_path.'views/css/back.css');
        }
    }

    /**
     * Add the CSS & JavaScript files you want to be added on the FO.
     */
    public function hookHeader()
    {
        $this->context->controller->addJS($this->_path.'/views/js/front.js');
        //$this->context->controller->addJS($this->_path.'/views/js/slick.js');
        $this->context->controller->addCSS($this->_path.'/views/css/front.css');
        //$this->context->controller->addCSS($this->_path.'/views/css/slick.css');
    }
	
	public function hookDisplayHome()
    {

            $products_kids = $this->getProducts(3);
            $products_women = $this->getProducts(4);
            $products_men = $this->getProducts(5);
            $products_home = $this->getProducts(6);
            $products_kids_akcija = $this->getProducts(88);
            $products_women_akcija = $this->getProducts(89);
            $products_men_akcija = $this->getProducts(90);
            $products_home_akcija = $this->getProducts(91);
            $products_discounts = array_merge($products_men_akcija,$products_home_akcija,$products_kids_akcija,$products_women_akcija);
            $products_akcija_show = shuffle($products_discounts);

            if (empty($products_kids)) {
                return false;
            }

            $this->context->smarty->assign(
                array(
                    'products_kids' => $products_kids,
                    'products_women' => $products_women,
                    'products_men' => $products_men,
                    'products_home' => $products_home,
                    'products_kids_akcija' => $products_kids_akcija,
                    'products_women_akcija' => $products_women_akcija,
                    'products_men_akcija' => $products_men_akcija,
                    'products_home_akcija' => $products_home_akcija,
                    'count_kids' => $this->countProducts(3),
                    'count_women' => $this->countProducts(4),
                    'count_men' => $this->countProducts(5),
                    'count_home' => $this->countProducts(6),
                    'products_akcija' => $products_discounts,
                )
            );


        //$this->fetch($this->templateFile, $this->getCacheId('dev4web_front'));

        return $this->context->smarty->fetch('module:dev4webfront/views/templates/home.tpl');
    }

    public function hookActionProductAdd()
    {
       // $this->_clearCache('*');
    }

    public function hookActionProductDelete()
    {
        //$this->_clearCache('*');
    }

    public function hookActionProductListOverride()
    {

    }

    public function hookActionProductUpdate()
    {
        //$this->_clearCache('*');
    }

    public function hookDisplayFooterProduct()
    {
        /* Place your code here. */
    }

    public function hookDisplayProductExtraContent()
    {
        /* Place your code here. */
    }

    public function hookDisplayProductListFunctionalButtons()
    {
        /* Place your code here. */
    }

    public function renderWidget($category, $hookName = null, array $configuration = [])
    {
        if (!$this->isCached($this->templateFile, $this->getCacheId('dev4web_front'))) {

            $variables = $this->getWidgetVariables($category, $hookName, $configuration);

            if (empty($variables)) {
                return false;
            }

            $this->smarty->assign($variables);
        }

        return $this->fetch($this->templateFile, $this->getCacheId('dev4web_front'));
    }

    public function getWidgetVariables($category, $hookName = null, array $configuration = [])
    {
        $products = $this->getProducts($category);

        if (!empty($products)) {
            return array(
                'products' => $products,
                //'allProductsLink' => Context::getContext()->link->getCategoryLink($this->getConfigFieldsValues()['HOME_FEATURED_CAT']),
            );
        }
        return false;
    }

    protected function getProducts($category)
    {
        //$category = new Category((int) Configuration::get('HOME_FEATURED_CAT'));
        $cat_instance = new Category((int)$category);

        $searchProvider = new CategoryProductSearchProvider(
            $this->context->getTranslator(),
            $cat_instance
        );

        $context = new ProductSearchContext($this->context);

        $query = new ProductSearchQuery();

        //$nProducts = Configuration::get('HOME_FEATURED_NBR');
        $nProducts = 16;
        /*if ($nProducts < 0) {
            $nProducts = 24;
        }*/

        $query
            ->setResultsPerPage($nProducts)
            ->setPage(1)
        ;

        /*if (Configuration::get('HOME_FEATURED_RANDOMIZE')) {
            $query->setSortOrder(SortOrder::random());
        } else {
            $query->setSortOrder(new SortOrder('product', 'position', 'asc'));
        }*/
        $query->setSortOrder(SortOrder::random());
        //$query->setSortOrder(new SortOrder('product', 'quantity', 'desc'));

        $result = $searchProvider->runQuery(
            $context,
            $query
        );

        $assembler = new ProductAssembler($this->context);

        $presenterFactory = new ProductPresenterFactory($this->context);
        $presentationSettings = $presenterFactory->getPresentationSettings();
        $presenter = $presenterFactory->getPresenter();

        $products_for_template = [];

        foreach ($result->getProducts() as $rawProduct) {
            $products_for_template[] = $presenter->present(
                $presentationSettings,
                $assembler->assembleProduct($rawProduct),
                $this->context->language
            );
        }

        return $products_for_template;
    }

    public function _clearCache($template, $cache_id = null, $compile_id = null)
    {
        parent::_clearCache($this->templateFile);
    }

    public function countProducts($category) {
        $result = Db::getInstance()->ExecuteS('SELECT COUNT(`id_product`) as total FROM `'._DB_PREFIX_.'category_product` WHERE `id_category` = '.$category.' ');
        //die(var_dump($result[0]['total']));
        return $result[0]['total'];
    }
}
