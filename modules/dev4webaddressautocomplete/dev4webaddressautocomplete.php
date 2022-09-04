<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

class Dev4WebAddressAutocomplete extends Module
{
    protected $config_form = false;

    public function __construct()
    {
        $this->name = 'dev4webaddressautocomplete';
        $this->tab = 'administration';
        $this->version = '1.0.0';
        $this->author = 'Dev4Web';
        $this->need_instance = 0;

        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('Google Address Autocomplete');
        $this->description = $this->l('Address autocomplete Google maps API');
        $this->ps_versions_compliancy = array('min' => '1.6', 'max' => _PS_VERSION_);

    }

    public function install()
    {
        Configuration::updateValue('D4W_GOOGLE_API_KEY', '');

        return parent::install() &&
            $this->registerHook('header');
    }

    public function uninstall()
    {
        Configuration::deleteByName('D4W_GOOGLE_API_KEY');

        return parent::uninstall();
    }

    public function getContent()
    {
        $html = "";
        if (((bool)Tools::isSubmit('submit_settings')) === true) {
            $this->postProcess();
            $html .= $this->displayConfirmation('Settings saved');
            return $html.$this->renderForm();
        }

        $this->context->smarty->assign('module_dir', $this->_path);

        return $html.$this->renderForm();
    }

    protected function renderForm()
    {
        $helper = new HelperForm();

        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submit_settings';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
            .'&configure='.$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFormValues(),
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        );

        return $helper->generateForm(array($this->getConfigForm()));
    }

    protected function getConfigForm()
    {
        return array(
            'form' => array(
                'legend' => array(
                    'title' => $this->l('AUTOMATIC ADDRESS SUGGESTION'),
                ),
                'input' => array(
                    array(
                        'col' => 6,
                        'type' => 'text',
                        'prefix' => '<i class="icon icon-link"></i>',
                        'desc' => $this->l('Google Maps API KEY'),
                        'name' => 'D4W_GOOGLE_API_KEY',
                        'label' => $this->l('Google Maps API KEY'),
                    ),
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                ),
            ),
        );
    }

    protected function getConfigFormValues()
    {
        return array(
            'D4W_GOOGLE_API_KEY' => Configuration::get('D4W_GOOGLE_API_KEY'),
        );
    }

    protected function postProcess()
    {
        $form_values = $this->getConfigFormValues();

        foreach (array_keys($form_values) as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
    }

    public function hookHeader()
    {
        if (!Module::isEnabled('dev4webaddressautocomplete')) {
            return;
        }

        if ($this->context->controller->php_self != 'order') {
            return;
        }

        //var_dump(Tools::getValue('step'));

        if (!$this->context) {
            $this->context = new Context();
        }

        Media::addJsDef(array(
            'google_api_key' => Configuration::get('D4W_GOOGLE_API_KEY'),
            'lang_iso' => $this->context->language->iso_code,
            'country_iso' => $this->context->language->iso_code,
        ));

        $this->context->controller->addJS($this->_path.'/views/js/front.js');
        $this->context->controller->addJS($this->_path.'/views/js/api.js');
        $this->context->controller->addCSS($this->_path.'/views/css/front.css');
    }
}
