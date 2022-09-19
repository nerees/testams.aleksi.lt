<?php
/**
 * 2015-2021 Bonpresta
 *
 * Bonpresta Instagram Carousel Social Feed Photos
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the General Public License (GPL 2.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/GPL-2.0
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade the module to newer
 * versions in the future.
 *
 *  @author    Bonpresta
 *  @copyright 2015-2021 Bonpresta
 *  @license   http://opensource.org/licenses/GPL-2.0 General Public License (GPL 2.0)
 */

if (!defined('_PS_VERSION_')) {
    exit;
}

class Boninstagramslick extends Module
{
    public function __construct()
    {
        $this->name = 'boninstagramslick';
        $this->tab = 'front_office_features';
        $this->version = '2.0.0';
        $this->bootstrap = true;
        $this->author = 'D4W';
        parent::__construct();
        $this->displayName = $this->l('Instagram Carousel Social Feed Photos');
        $this->description = $this->l('Display instagram carousel feed photos');
        $this->ps_versions_compliancy = array('min' => '1.6', 'max' => _PS_VERSION_);
        $this->controllers = array(
            'instagram'
        );
    }

    protected function getModuleSettings()
    {
        $res = array(
            'BONINSTAGRAMSLICK_DISPLAY' => true,
            'BONINSTAGRAMSLICK_USERID' => '',
            'BONINSTAGRAMSLICK_TYPE' => 'user',
            'BONINSTAGRAMSLICK_TAG' => '',
            'BONINSTAGRAMSLICK_LIMIT' => 8,
            'BONINSTAGRAMSLICK_DISPLAY_CAROUSEL' => false,
            'BONINSTAGRAMSLICK_NB' => 4,
            'BONINSTAGRAMSLICK_SPEED' => 5000,
            'BONINSTAGRAMSLICK_MARGIN' => 20,
            'BONINSTAGRAMSLICK_LOOP' => true,
            'BONINSTAGRAMSLICK_NAV' => true,
            'BONINSTAGRAMSLICK_DOTS' => false,
            'BONINSTAGRAMSLICK_IG_APP_ID' => '',
            'BONINSTAGRAMSLICK_IG_APP_SECRET' => '',
            'BONINSTAGRAMSLICK_IG_APP_CALLBACK' => '',
            'BONINSTAGRAMSLICK_IG_API_URL' => 'https://graph.instagram.com/',
            'BONINSTAGRAMSLICK_IG_OAUTH_URL' => 'https://api.instagram.com/oauth/authorize',
            'BONINSTAGRAMSLICK_IG_OAUTH_GET_TOKEN_URL' => 'https://api.instagram.com/oauth/access_token',
            'BONINSTAGRAMSLICK_IG_OAUTH_EXCHANGE_TOKEN_URL' => 'https://graph.instagram.com/access_token',
            'BONINSTAGRAMSLICK_IG_OAUTH_REFRESH_TOKEN_URL' => 'https://api.instagram.com/refresh_access_token',
            'BONINSTAGRAMSLICK_TOKEN' => ''
        );

        return $res;
    }

    public function install()
    {
        $settings = $this->getModuleSettings();

        foreach ($settings as $name => $value) {
            Configuration::updateValue($name, $value);
        }

        return parent::install() &&
        $this->registerHook('displayHeader') &&
        $this->registerHook('displayBackOfficeHeader') &&
        $this->registerHook('moduleRoutes') &&
            $this->registerHook('displayInstagram') &&
        $this->registerHook('displayHome');
    }

    public function hookModuleRoutes()
    {
        return array(
            'module-boninstagramslick-instagram' => array(
                'controller' => 'instagram',
                'rule'       => 'instagram',
                'keywords'   => array(),
                'params'     => array(
                    'fc'     => 'module',
                    'module' => 'boninstagramslick',
                ),
            ),
        );
    }

    public function uninstall()
    {
        $settings = $this->getModuleSettings();

        foreach (array_keys($settings) as $name) {
            Configuration::deleteByName($name);
        }

        return parent::uninstall();
    }

    public function getContent()
    {
        $output = '';

        if ((bool)Tools::isSubmit('submitSettings')) {
            if (!$errors = $this->checkItemFields()) {
                $this->postProcess();
                $output .= $this->displayConfirmation($this->l('Save all settings.'));
            } else {
                $output .= $errors;
            }
        }

        return $this->display(__FILE__, 'views/templates/admin/upload.tpl') . $output.$this->renderForm();
    }

    protected function postProcess()
    {
        $form_values = $this->getConfigFieldsValues();
        foreach (array_keys($form_values) as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
    }

    protected function checkItemFields()
    {
        $errors = array();

        if (Tools::isEmpty(Tools::getValue('BONINSTAGRAMSLICK_LIMIT'))) {
            $errors[] = $this->l('Limit is required.');
        } else {
            if (!Validate::isUnsignedInt(Tools::getValue('BONINSTAGRAMSLICK_LIMIT'))) {
                $errors[] = $this->l('Bad limit format');
            }
        }

        if (Tools::isEmpty(Tools::getValue('BONINSTAGRAMSLICK_NB'))) {
            $errors[] = $this->l('Item is required.');
        } else {
            if (!Validate::isUnsignedInt(Tools::getValue('BONINSTAGRAMSLICK_NB'))) {
                $errors[] = $this->l('Bad item format');
            }
        }

        if (Tools::isEmpty(Tools::getValue('BONINSTAGRAMSLICK_MARGIN'))) {
            $errors[] = $this->l('Autoplay Speed is required.');
        } else {
            if (!Validate::isUnsignedInt(Tools::getValue('BONINSTAGRAMSLICK_MARGIN'))) {
                $errors[] = $this->l('Bad autoplay speed format');
            }
        }

        if (Tools::isEmpty(Tools::getValue('BONINSTAGRAMSLICK_IG_APP_ID'))) {
            $errors[] = $this->l('APP ID is required.');
        }

        if (Tools::isEmpty(Tools::getValue('BONINSTAGRAMSLICK_IG_APP_SECRET'))) {
            $errors[] = $this->l('APP SECRET is required.');
        }

        if (Tools::isEmpty(Tools::getValue('BONINSTAGRAMSLICK_IG_APP_CALLBACK'))) {
            $errors[] = $this->l('IG_APP_CALLBACK is required.');
        }

        if (count($errors)) {
            return $this->displayError(implode('<br />', $errors));
        }

        return false;
    }

    protected function getConfigInstagram()
    {
        return array(
            'form' => array(
                'legend' => array(
                    'title' => $this->l('Settings Instagram'),
                    'icon' => 'icon-cogs'
                ),
                'input' => array(
                    array(
                        'type' => 'switch',
                        'label' => $this->l('Enable Instagram Feed'),
                        'name' => 'BONINSTAGRAMSLICK_DISPLAY',
                        'is_bool' => true,
                        'values' => array(
                            array(
                                'id' => 'enable',
                                'value' => 1,
                                'label' => $this->l('Yes')),
                            array(
                                'id' => 'disable',
                                'value' => 0,
                                'label' => $this->l('No')),
                        ),
                    ),
                    array(
                        'type' => 'text',
                        'label' => $this->l('Display item'),
                        'name' => 'BONINSTAGRAMSLICK_LIMIT',
                        'col' => 2,
                        'required' => true,
                    ),
                    array(
                        'type' => 'select',
                        'label' => $this->l('Get Feeds by'),
                        'name' => 'BONINSTAGRAMSLICK_TYPE',
                        'options' => array(
                            'query' => array(
                                array(
                                    'id' => 'tagged',
                                    'name' => $this->l('tagged')),
                                array(
                                    'id' => 'user',
                                    'name' => $this->l('user')),
                            ),
                            'id' => 'id',
                            'name' => 'name'
                        )
                    ),
                    array(
                        'type' => 'text',
                        'label' => $this->l('Instagram Tag'),
                        'name' => 'BONINSTAGRAMSLICK_TAG',
                        'col' => 2,
                        'required' => false,
                    ),
                    array(
                        'type' => 'text',
                        'label' => $this->l('Instagram User'),
                        'name' => 'BONINSTAGRAMSLICK_USERID',
                        'col' => 2,
                        'required' => false,
                    ),
                    array(
                        'type' => 'switch',
                        'label' => $this->l('Carousel:'),
                        'name' => 'BONINSTAGRAMSLICK_DISPLAY_CAROUSEL',
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
                    array(
                        'form_group_class' => 'display',
                        'type' => 'text',
                        'required' => true,
                        'label' => $this->l('Number of items in the carousel:'),
                        'name' => 'BONINSTAGRAMSLICK_NB',
                        'col' => 2,
                        'desc' => $this->l('The number of items you want to see on the screen.'),
                    ),
                    array(
                        'form_group_class' => 'display',
                        'type' => 'text',
                        'required' => true,
                        'label' => $this->l('Autoplay Speed:'),
                        'name' => 'BONINSTAGRAMSLICK_SPEED',
                        'col' => 2,
                        'suffix' => 'milliseconds',
                    ),
                    array(
                        'form_group_class' => 'display',
                        'type' => 'text',
                        'label' => $this->l('Indent between pictures:'),
                        'name' => 'BONINSTAGRAMSLICK_MARGIN',
                        'suffix' => 'pixels',
                        'col' => 2,
                    ),
                    array(
                        'form_group_class' => 'display',
                        'type' => 'switch',
                        'label' => $this->l('Infinite:'),
                        'name' => 'BONINSTAGRAMSLICK_LOOP',
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
                    array(
                        'form_group_class' => 'display',
                        'type' => 'switch',
                        'label' => $this->l('Navigation:'),
                        'name' => 'BONINSTAGRAMSLICK_NAV',
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
                    array(
                        'form_group_class' => 'display',
                        'type' => 'switch',
                        'label' => $this->l('Pagination:'),
                        'name' => 'BONINSTAGRAMSLICK_DOTS',
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
                    array(
                        'type' => 'text',
                        'label' => $this->l('Instagram APP ID'),
                        'name' => 'BONINSTAGRAMSLICK_IG_APP_ID',
                        'col' => 8,
                        'required' => true,
                    ),
                    array(
                        'type' => 'text',
                        'label' => $this->l('Instagram APP SECRET'),
                        'name' => 'BONINSTAGRAMSLICK_IG_APP_SECRET',
                        'col' => 8,
                        'required' => true,
                    ),
                    array(
                        'type' => 'text',
                        'label' => $this->l('Instagram APP CALLBACK'),
                        'name' => 'BONINSTAGRAMSLICK_IG_APP_CALLBACK',
                        'col' => 8,
                        'required' => true,
                    )
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                ),
            ),
        );
    }

    public function renderForm()
    {
        $helper = new HelperForm();
        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $lang = new Language((int)Configuration::get('PS_LANG_DEFAULT'));
        $helper->default_form_language = $lang->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') ? Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') : 0;
        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitSettings';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false).
            '&configure='.$this->name.
            '&tab_module='.$this->tab.
            '&module_name='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFieldsValues(),
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id
        );

        return $helper->generateForm(array($this->getConfigInstagram())) . $this->checkAuthorization();
    }


    protected function getConfigFieldsValues()
    {
        $filled_settings = array();
        $settings = $this->getModuleSettings();

        foreach (array_keys($settings) as $name) {
            $filled_settings[$name] = Configuration::get($name);
        }

        return $filled_settings;
    }

    public function hookDisplayBackOfficeHeader()
    {
        if (Tools::getValue('configure') != $this->name) {
            return;
        }
        $this->context->controller->addJquery();
        $this->context->controller->addJS($this->_path.'views/js/boninstagramslick_admin.js');
        $this->context->controller->addCSS($this->_path.'views/css/boninstagram-back.css');
        Media::addJsDefL('base_dir', $this->_path);
        Media::addJsDefL('user_id', Configuration::get('BONINSTAGRAMSLICK_USERID'));
        Media::addJsDefL('BONINSTAGRAMSLICK_TYPE', Configuration::get('BONINSTAGRAMSLICK_TYPE'));
        Media::addJsDefL('BONINSTAGRAMSLICK_LIMIT', Configuration::get('BONINSTAGRAMSLICK_LIMIT'));
        Media::addJsDefL('user_tag', Configuration::get('BONINSTAGRAMSLICK_TAG'));
        Media::addJsDefL('BONINSTAGRAMSLICK_TOKEN', Configuration::get('BONINSTAGRAMSLICK_TOKEN'));
    }

    public function hookDisplayHeader()
    {
        $this->context->controller->addCSS($this->_path.'views/css/boninstagramslick.css', 'all');

        if (Configuration::get('BONINSTAGRAMSLICK_DISPLAY_CAROUSEL')) {
            $this->context->controller->addCSS($this->_path.'views/css/slick.css', 'all');
            $this->context->controller->addCSS($this->_path.'views/css/slick-theme.css', 'all');
            $this->context->controller->addJS($this->_path.'views/js/slick.js');
            $this->context->controller->addJS($this->_path.'/views/js/slick-front.js');
            Media::addJsDefL('BONINSTAGRAMSLICK_DISPLAY_CAROUSEL', Configuration::get('BONINSTAGRAMSLICK_DISPLAY_CAROUSEL'));
            Media::addJsDefL('BONINSTAGRAMSLICK_NB', Configuration::get('BONINSTAGRAMSLICK_NB'));
            Media::addJsDefL('BONINSTAGRAMSLICK_SPEED', Configuration::get('BONINSTAGRAMSLICK_SPEED'));
            Media::addJsDefL('BONINSTAGRAMSLICK_MARGIN', Configuration::get('BONINSTAGRAMSLICK_MARGIN'));
            Media::addJsDefL('BONINSTAGRAMSLICK_LOOP', Configuration::get('BONINSTAGRAMSLICK_LOOP'));
            Media::addJsDefL('BONINSTAGRAMSLICK_NAV', Configuration::get('BONINSTAGRAMSLICK_NAV'));
            Media::addJsDefL('BONINSTAGRAMSLICK_DOTS', Configuration::get('BONINSTAGRAMSLICK_DOTS'));
        }
    }


    protected function getStringValueType($data)
    {
        if (Validate::isInt($data)) {
            return 'int';
        } elseif (Validate::isFloat($data)) {
            return 'float';
        } elseif (Validate::isBool($data)) {
            return 'bool';
        } else {
            return 'string';
        }
    }

    protected function getBlankSettings()
    {
        $settings = $this->getModuleSettings();
        $get_settings = array();

        foreach (array_keys($settings) as $name) {
            $data = Configuration::get($name);
            $get_settings[$name] = array('value' => $data, 'type' => $this->getStringValueType($data));
        }

        return $get_settings;
    }

   
    public function hookDisplayHome()
    {
        if (Configuration::get('BONINSTAGRAMSLICK_DISPLAY')) {
            $this->context->smarty->assign('instagram_type', Configuration::get('BONINSTAGRAMSLICK_TYPE'));
            $this->context->smarty->assign('limit', Configuration::get('BONINSTAGRAMSLICK_LIMIT'));
            $this->context->smarty->assign('user_id', Configuration::get('BONINSTAGRAMSLICK_USERID'));
            $this->context->smarty->assign('user_tag', Configuration::get('BONINSTAGRAMSLICK_TAG'));
            $this->context->smarty->assign('baseurl', $this->_path.'views/');

            $this->context->smarty->assign(
                array(
                    'display_caroucel' => Configuration::get('BONINSTAGRAMSLICK_DISPLAY_CAROUSEL')
                )
            );
            return $this->display(__FILE__, 'boninstagramslick.tpl');
        }
    }

    public function hookdisplayInstagram()
    {
        return $this->hookDisplayHome();
    }

    public function hookdisplayFooterBefore()
    {
        return $this->hookDisplayHome();
    }

    public function appCallback($code)
    {
        $this->getOauthToken($code);
    }

    public function getOauthToken($code) {
        $postData = array();
        $postData["client_id"] = Configuration::get('BONINSTAGRAMSLICK_IG_APP_ID');
        $postData["client_secret"] = Configuration::get('BONINSTAGRAMSLICK_IG_APP_SECRET');
        $postData["code"] = $code;
        $postData["grant_type"] = "authorization_code";
        $postData["redirect_uri"] = Configuration::get('BONINSTAGRAMSLICK_IG_APP_CALLBACK');

        $headers = array("Content-Type: multipart/form-data;");

        $url = Configuration::get('BONINSTAGRAMSLICK_IG_OAUTH_GET_TOKEN_URL');
        $response = $this->postInsta($url, $postData, $headers);
        //var_dump($response);

        if (isset($response["user_id"])) {
            // yay we got a response
            $ig_user_id = $response["user_id"];
            $ig_short_access_token = $response["access_token"];
            $ig_long_access_token = $this->getLongOauthToken($ig_short_access_token);

            // now let's save our "user" to the database
            $fake_user_data_array = array();
            $fake_user_data_array["ig_user_id"] = $ig_user_id;
            $fake_user_data_array["ig_access_token"] = $ig_long_access_token;
            $fake_user_data_array["ig_access_token_last_updated"] = time();
            $fake_user_data_array["posts"] = array();
            Configuration::updateValue('BONINSTAGRAMSLICK_TOKEN', $ig_long_access_token);
            //$this->writeJsonToFile($fake_user_data_array);
        }
    }

    public function getLongOauthToken($short_access_token) {
        $getData = array();
        $getData["client_id"] = Configuration::get('BONINSTAGRAMSLICK_IG_APP_ID');
        $getData["client_secret"] = Configuration::get('BONINSTAGRAMSLICK_IG_APP_SECRET');
        $getData["access_token"] = $short_access_token;
        $getData["grant_type"] = "ig_exchange_token";

        $url = Configuration::get('BONINSTAGRAMSLICK_IG_OAUTH_EXCHANGE_TOKEN_URL');

        $response = $this->getInsta($url, $getData);
        var_dump($response);

        if (isset($response["access_token"])) {
            return $response["access_token"];
        }
    }

    public function getLoginURL() {

        $url = Configuration::get('BONINSTAGRAMSLICK_IG_OAUTH_URL');
        $url .= "?client_id=" . Configuration::get('BONINSTAGRAMSLICK_IG_APP_ID');
        $url .= "&redirect_uri=" . Configuration::get('BONINSTAGRAMSLICK_IG_APP_CALLBACK');
        $url .= "&scope=user_profile,user_media";
        $url .= "&response_type=code";
        return $url;
    }

    public function checkAuthorization()
    {
        if (!Configuration::get('BONINSTAGRAMSLICK_TOKEN')) {
            $url = $this->getLoginURL();
            return '<p><a href="'.$url.'">'.$url.'</a></p>';
        }
    }

    public function getInsta($url, $data, $headers = []) {
        // build the url with the data
        if (!empty($data)) {
            $url .= "?" . http_build_query($data);
        }

        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        if (!empty($headers)) {
            curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        }
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

        $response = curl_exec($curl);

        if (isJson($response)) {
            $response = json_decode($response, true);
        }

        return $response;
    }

    /**
     * Makes a GET request with URL variables
     *
     * @param string $url
     * @param array $data
     * @param array $headers
     * @return string
     */
    public function postInsta($url, $data, $headers = []) {
        try {
            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_HEADER, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_FAILONERROR, false);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($curl, CURLOPT_POST, true);
            if (!empty($data)) {
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            }
            $response = curl_exec($curl);

            $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
            if ($status != 200) {
                die(curl_error($curl));
            }
            curl_close($curl);

            $response = json_decode($response, true);

            return $response;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function isJson($string) {
        json_decode($string);
        return (json_last_error() == JSON_ERROR_NONE);
    }

    public function writeJsonToFile($jsonArray, $filename='fake_database.txt') {
        try {
            $fp = fopen($filename, 'w');
            fwrite($fp, json_encode($jsonArray, JSON_PRETTY_PRINT));
            fclose($fp);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function getMedia($ig_access_token, $existing_data = []) {
        $media_array = $existing_data;  // start with existing data
        $url = Configuration::get('BONINSTAGRAMSLICK_IG_API_URL') . "me/media?fields=id,caption&access_token=" . $ig_access_token;
        $response = $this->getInsta($url, []);
        if (!empty($response) && isset($response["data"])) {
            foreach ($response["data"] as $post_data) {

                $ig_media_id = $post_data["id"];
                if (isset($existing_data[$ig_media_id])) {
                    continue;
                }

                $media = $this->getMediaByID($ig_media_id, $ig_access_token);
                //$media["caption"] = $post_data["caption"];
                $media_array[$ig_media_id] = $media;
            }
        }

        // todo: should probably add a function to order by timestamp, but that can wait

        return $media_array;
    }

    public function getMediaByID($ig_media_id, $ig_access_token) {
        $url = Configuration::get('BONINSTAGRAMSLICK_IG_API_URL') . "$ig_media_id?fields=id,media_type,media_url,username,timestamp,caption&access_token=" . $ig_access_token;
        $response = $this->getInsta($url, []);
        return $response;
    }
}
