<?php

if (!defined('_PS_VERSION_')) {
    exit;
}
require_once _PS_MODULE_DIR_ . '/shopcomments/ShopComment.php';

class shopComments extends Module
{
    const INSTALL_SQL_FILE = 'install.sql';

    private $_html = '';
    private $_postErrors = array();
    private $_filters = array();
    private $_baseUrl;

    public function __construct()
    {
        $this->name = 'shopcomments';
        $this->tab = 'front_office_features';
        $this->version = '1.0.1';
        $this->author = 'dev4web.eu';
        $this->need_instance = 0;
        $this->bootstrap = true;
        $this->_setFilters();
        parent::__construct();

        $this->secure_key = Tools::encrypt($this->name);
        $this->displayName = $this->l('Shop Comments');
        $this->description = $this->l('Allows users to post reviews and rate shop.');

        $this->ps_versions_compliancy = array(
            'min' => '1.7.0.0',
            'max' => '1.7.99.99'
        );
    }

    public function install($keep = true)
    {
        if ($keep) {
            if (!file_exists(dirname(__FILE__) . '/' . self::INSTALL_SQL_FILE)) {
                return false;
            } elseif (!$sql = file_get_contents(dirname(__FILE__) . '/' . self::INSTALL_SQL_FILE)) {
                return false;
            }
            $sql = str_replace(array(
                'PREFIX_',
                'ENGINE_TYPE'
            ), array(
                _DB_PREFIX_,
                _MYSQL_ENGINE_
            ), $sql);
            $sql = preg_split("/;\s*[\r\n]+/", trim($sql));

            foreach ($sql as $query) {
                if (!Db::getInstance()->execute(trim($query))) {
                    return false;
                }
            }
        }

        if (parent::install() == false ||
            !$this->registerHook('displayShopCommentsFields') ||
            !$this->registerHook('ActionAdminControllerSetMedia') ||
            !$this->registerHook('displayHome') ||
            !$this->registerHook('header') ||
            !Configuration::updateValue('SHOP_COMMENTS_MINIMAL_TIME', 30) ||
            !Configuration::updateValue('SHOP_COMMENTS_ALLOW_GUESTS', 0) ||
            !Configuration::updateValue('SHOP_COMMENTS_MODERATE', 1)) {
            return false;
        }

        return true;
    }

    public function hookdisplayShopCommentsFields()
    {
        return $this->renderCommentsForm();
    }

    public function hookDisplayHome($params)
    {
        return $this->renderCommentsForm();
    }

    public function uninstall($keep = true)
    {
        if (!parent::uninstall() || !Configuration::deleteByName('SHOP_COMMENTS_MODERATE') || !Configuration::deleteByName('SHOP_COMMENTS_ALLOW_GUESTS') || !Configuration::deleteByName('SHOP_COMMENTS_MINIMAL_TIME') || !$this->unregisterHook('header') || !$this->unregisterHook('displayHome') || !$this->unregisterHook('displayShopCommentsFields')) {
            return false;
        }

        return true;
    }

    public function reset()
    {
        if (!$this->uninstall(false)) {
            return false;
        }
        if (!$this->install(false)) {
            return false;
        }

        return true;
    }

    protected function _postProcess()
    {
        $this->_setFilters();

        if (Tools::isSubmit('submitModerate')) {
            Configuration::updateValue('SHOP_COMMENTS_GDPRCMS', (int)Tools::getValue('SHOP_COMMENTS_GDPRCMS'));
            Configuration::updateValue('SHOP_COMMENTS_MODERATE', (int)Tools::getValue('SHOP_COMMENTS_MODERATE'));
            Configuration::updateValue('SHOP_COMMENTS_GDPR', (int)Tools::getValue('SHOP_COMMENTS_GDPR'));
            Configuration::updateValue('SHOP_COMMENTS_ALLOW_GUESTS', (int)Tools::getValue('SHOP_COMMENTS_ALLOW_GUESTS'));
            Configuration::updateValue('SHOP_COMMENTS_MINIMAL_TIME', (int)Tools::getValue('SHOP_COMMENTS_MINIMAL_TIME'));
            Configuration::updateValue('SHOP_COMMENTS_MIN_TITLE', (int)Tools::getValue('SHOP_COMMENTS_MIN_TITLE', 20));
            Configuration::updateValue('SHOP_COMMENTS_MIN_BODY', (int)Tools::getValue('SHOP_COMMENTS_MIN_BODY', 50));
            Configuration::updateValue('SHOP_COMMENT_DATE', (int)Tools::getValue('SHOP_COMMENT_DATE', 1));
            Configuration::updateValue('SHOP_COMMENT_TITLE', (int)Tools::getValue('SHOP_COMMENT_TITLE', 1));
            Configuration::updateValue('SHOP_COMMENT_BODY', (int)Tools::getValue('SHOP_COMMENT_BODY', 1));
            Configuration::updateValue('SHOP_COMMENT_AUTHOR', (int)Tools::getValue('PRODUCT_COMMENT_AUTHOR', 1));
            Configuration::updateValue('SHOP_COMMENTS_STARS', Tools::getValue('SHOP_COMMENTS_STARS', '32'));
            Configuration::updateValue('SHOP_COMMENTS_NB_SHOW', Tools::getValue('SHOP_COMMENTS_NB_SHOW', '0'));


            $this->_html .= '<div class="conf confirm alert alert-success">' . $this->l('Settings updated') . '</div>';
        } elseif (Tools::isSubmit('shopcomments')) {
            $id_shop_comment = (int)Tools::getValue('id_shop_comment');
            $comment = new ShopComment($id_shop_comment);
            $comment->validate();
        } elseif (Tools::isSubmit('deleteshopcomments')) {
            $id_shop_comment = (int)Tools::getValue('id_shop_comment');
            $comment = new ShopComment($id_shop_comment);
            $comment->delete();
        } elseif ($id_shop_comment = (int)Tools::getValue('approveComment')) {
            $comment = new ShopComment($id_shop_comment);
            $comment->validate();
        }
        $this->_clearcache('shop_reviews_list.tpl');
    }

    public function getContent()
    {
        include_once __DIR__ . '/ShopComment.php';

        $this->_html = '';

        $this->_postProcess();
        $this->_html .= $this->renderConfigForm();
        $this->_html .= $this->renderCommentsList();


        $this->_setBaseUrl();

        $this->context->controller->addJs($this->_path . 'js/moderate.js');

        return $this->_html;
    }

    private function _setBaseUrl()
    {
        $this->_baseUrl = 'index.php?';
        foreach ($_GET as $k => $value) {
            $this->_baseUrl .= $k . '=' . $value . '&';
        }
        $this->_baseUrl = rtrim($this->_baseUrl, '&');
    }

    public function renderConfigForm()
    {
        $fields_form_1 = array(
            'form' => array(
                'legend' => array(
                    'title' => $this->l('Configuration'),
                    'icon' => 'icon-cogs',
                ),
                'input' => array(
                    array(
                        'type' => 'switch',
                        'is_bool' => true,
                        //retro compat 1.5
                        'label' => $this->l('All reviews must be validated by an employee'),
                        'name' => 'SHOP_COMMENTS_MODERATE',
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => 1,
                                'label' => $this->l('Enabled'),
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => 0,
                                'label' => $this->l('Disabled'),
                            ),
                        ),
                    ),
                    array(
                        'type' => 'switch',
                        'is_bool' => true,
                        //retro compat 1.5
                        'label' => $this->l('Allow guest reviews'),
                        'name' => 'SHOP_COMMENTS_ALLOW_GUESTS',
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => 1,
                                'label' => $this->l('Enabled'),
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => 0,
                                'label' => $this->l('Disabled'),
                            ),
                        ),
                    ),
                    array(
                        'type' => 'text',
                        'label' => $this->l('The minimum number of characters in the title'),
                        'name' => 'SHOP_COMMENTS_MIN_TITLE',
                        'class' => 'fixed-width-xs',
                        'suffix' => 'characters',
                    ),
                    array(
                        'type' => 'text',
                        'label' => $this->l('The minimum number of characters in comment'),
                        'name' => 'SHOP_COMMENTS_MIN_BODY',
                        'class' => 'fixed-width-xs',
                        'suffix' => 'characters',
                    ),
                    array(
                        'type' => 'text',
                        'label' => $this->l('Minimum time between 2 reviews from the same user'),
                        'name' => 'SHOP_COMMENTS_MINIMAL_TIME',
                        'class' => 'fixed-width-xs',
                        'suffix' => 'seconds',
                    ),
                    array(
                        'type' => 'select',
                        'label' => $this->l('Stars size'),
                        'name' => 'SHOP_COMMENTS_STARS',
                        'options' => array(
                            'query' => array(array('id_position' => '32', 'name' => $this->l('32px')), array('id_position' => '24', 'name' => $this->l('24px')), array('id_position' => '16', 'name' => $this->l('16px'))),
                            'id' => 'id_position',
                            'name' => 'name'
                        ),
                    ),
                    array(
                        'type' => 'switch',
                        'is_bool' => true,
                        'label' => $this->l('Show number of comments'),
                        'name' => 'SHOP_COMMENTS_NB_SHOW',
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => 1,
                                'label' => $this->l('Enabled'),
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => 0,
                                'label' => $this->l('Disabled'),
                            ),
                        ),
                    ),
                    array(
                        'type' => 'switch',
                        'is_bool' => true,
                        'label' => $this->l('GDPR Compliant'),
                        'name' => 'SHOP_COMMENTS_GDPR',
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => 1,
                                'label' => $this->l('Enabled'),
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => 0,
                                'label' => $this->l('Disabled'),
                            ),
                        ),
                    ),
                    array(
                        'type' => 'select',
                        'label' => $this->l('Privacy policy page'),
                        'desc' => $this->l('Choose a CMS page with privacy policy details for GDPR purposes'),
                        'name' => 'SHOP_COMMENTS_GDPRCMS',
                        'class' => 't',
                        'options' => array(
                            'query' => CMS::getCmsPages($this->context->language->id, null, false),
                            'id' => 'id_cms',
                            'name' => 'meta_title'
                        ),
                    ),
                    array(
                        'type' => 'switch',
                        'is_bool' => true,
                        'label' => $this->l('Show comment date'),
                        'name' => 'SHOP_COMMENT_DATE',
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => 1,
                                'label' => $this->l('Enabled'),
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => 0,
                                'label' => $this->l('Disabled'),
                            ),
                        ),
                    ),
                    array(
                        'type' => 'switch',
                        'is_bool' => true,
                        'label' => $this->l('Show comment title'),
                        'name' => 'SHOP_COMMENT_TITLE',
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => 1,
                                'label' => $this->l('Enabled'),
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => 0,
                                'label' => $this->l('Disabled'),
                            ),
                        ),
                    ),
                    array(
                        'type' => 'switch',
                        'is_bool' => true,
                        'label' => $this->l('Show comment contents'),
                        'name' => 'SHOP_COMMENT_BODY',
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => 1,
                                'label' => $this->l('Enabled'),
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => 0,
                                'label' => $this->l('Disabled'),
                            ),
                        ),
                    ),
                    array(
                        'type' => 'switch',
                        'is_bool' => true,
                        'label' => $this->l('Show comment auhtor name'),
                        'name' => 'SHOP_COMMENT_AUTHOR',
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => 1,
                                'label' => $this->l('Enabled'),
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => 0,
                                'label' => $this->l('Disabled'),
                            ),
                        ),
                    ),
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                    'class' => 'btn btn-default pull-right',
                    'name' => 'submitModerate',
                ),
            ),
        );

        $helper = new HelperForm();
        $helper->show_toolbar = false;
        $helper->table = $this->name;
        $lang = new Language((int)Configuration::get('PS_LANG_DEFAULT'));
        $helper->default_form_language = $lang->id;
        $helper->module = $this;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') ? Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') : 0;
        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitShopCommentsConfiguration';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false) . '&configure=' . $this->name . '&tab_module=' . $this->tab . '&module_name=' . $this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFieldsValues(),
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        );
        $this->context->controller->informations[] = $this->l('Do you know that module has page with all added comments? ') . '<strong><a href="' . $this->context->link->getModuleLink('shopcomments', 'feedback') . '">' . $this->l('Check it here') . '</a></strong>';
        return $helper->generateForm(array($fields_form_1));
    }

    public function renderCommentsList()
    {
        $comments = ShopComment::getByValidate(1, false);
        $moderate = Configuration::get('SHOP_COMMENTS_MODERATE');
        if (empty($moderate)) {
            $comments = array_merge($comments, ShopComment::getByValidate(0, false));
        }

        $fields_list = $this->getStandardFieldList();

        $helper = new HelperList();
        $helper->shopLinkType = '';
        $helper->simple_header = true;
        $helper->actions = array('delete');
        $helper->show_toolbar = false;
        $helper->module = $this;
        $helper->no_link = true;
        $helper->listTotal = count($comments);
        $helper->identifier = 'id_shop_comment';
        $helper->title = $this->l('Approved Reviews');
        $helper->table = $this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->currentIndex = AdminController::$currentIndex . '&configure=' . $this->name;
        //$helper->tpl_vars = array('priority' => array($this->l('High'), $this->l('Medium'), $this->l('Low')));

        return $helper->generateList($comments, $fields_list);
    }

    public function getConfigFieldsValues()
    {
        return array(
            'SHOP_COMMENTS_GDPRCMS' => Tools::getValue('SHOP_COMMENTS_GDPRCMS', Configuration::get('SHOP_COMMENTS_GDPRCMS')),
            'SHOP_COMMENTS_GDPR' => Tools::getValue('SHOP_COMMENTS_GDPR', Configuration::get('SHOP_COMMENTS_GDPR')),
            'SHOP_COMMENTS_MODERATE' => Tools::getValue('SHOP_COMMENTS_MODERATE', Configuration::get('SHOP_COMMENTS_MODERATE')),
            'SHOP_COMMENTS_ALLOW_GUESTS' => Tools::getValue('SHOP_COMMENTS_ALLOW_GUESTS', Configuration::get('SHOP_COMMENTS_ALLOW_GUESTS')),
            'SHOP_COMMENTS_MINIMAL_TIME' => Tools::getValue('SHOP_COMMENTS_MINIMAL_TIME', Configuration::get('SHOP_COMMENTS_MINIMAL_TIME')),
            'SHOP_COMMENTS_MIN_BODY' => Tools::getValue('SHOP_COMMENTS_MIN_BODY', Configuration::get('SHOP_COMMENTS_MIN_BODY')),
            'SHOP_COMMENTS_MIN_TITLE' => Tools::getValue('SHOP_COMMENTS_MIN_TITLE', Configuration::get('SHOP_COMMENTS_MIN_TITLE')),
            'SHOP_COMMENT_BODY' => Tools::getValue('SHOP_COMMENT_BODY', Configuration::get('SHOP_COMMENT_BODY')),
            'SHOP_COMMENT_TITLE' => Tools::getValue('SHOP_COMMENT_TITLE', Configuration::get('SHOP_COMMENT_TITLE')),
            'SHOP_COMMENT_DATE' => Tools::getValue('SHOP_COMMENT_DATE', Configuration::get('SHOP_COMMENT_DATE')),
            'SHOP_COMMENT_AUTHOR' => Tools::getValue('SHOP_COMMENT_AUTHOR', Configuration::get('SHOP_COMMENT_AUTHOR')),
            'SHOP_COMMENTS_STARS' => Tools::getValue('SHOP_COMMENTS_STARS', Configuration::get('SHOP_COMMENTS_STARS')),
            'SHOP_COMMENTS_NB_SHOW' => Tools::getValue('SHOP_COMMENTS_NB_SHOW', Configuration::get('SHOP_COMMENTS_NB_SHOW')),
        );
    }

    public function getStandardFieldList()
    {
        $fields = array(
            'id_product_comment' => array(
                'title' => $this->l('ID'),
                'type' => 'text',
            ),
            'title' => array(
                'title' => $this->l('Review title'),
                'type' => 'text',
            ),
            'content' => array(
                'title' => $this->l('Review'),
                'type' => 'text',
            ),
            'grade' => array(
                'title' => $this->l('Rating'),
                'type' => 'text',
                'suffix' => '/5',
            ),
            'customer_name' => array(
                'title' => $this->l('Author'),
                'type' => 'text',
            ),
            'date_add' => array(
                'title' => $this->l('Time of publication'),
                'type' => 'date',
            )
        );
        $custom_fields = Hook::exec('actionShopCommentsFieldBo', array(), null, true);
        if (is_array($custom_fields)) {
            foreach ($custom_fields AS $module => $key) {
                $fields = array_merge($fields, $key);
            }
        }
        return $fields;
    }

    private function _checkDeleteComment()
    {
        $action = Tools::getValue('delete_action');
        if (empty($action) === false) {
            $shop_comments = Tools::getValue('delete_id_shop_comment');

            if (count($shop_comments)) {
                if ($action == 'delete') {
                    foreach ($shop_comments as $id_shop_comment) {
                        if (!$id_shop_comment) {
                            continue;
                        }
                        $comment = new ShopComment((int)$id_shop_comment);
                        $comment->delete();
                        ShopComment::deleteGrades((int)$id_shop_comment);
                    }
                }
            }
        }
    }

    private function _setFilters()
    {
        $this->_filters = array(
            'page' => (string)Tools::getValue('submitFilter' . $this->name),
            'pagination' => (string)Tools::getValue($this->name . '_pagination'),
            'filter_id' => (string)Tools::getValue($this->name . 'Filter_id_product_comment'),
            'filter_content' => (string)Tools::getValue($this->name . 'Filter_content'),
            'filter_customer_name' => (string)Tools::getValue($this->name . 'Filter_customer_name'),
            'filter_grade' => (string)Tools::getValue($this->name . 'Filter_grade'),
            'filter_name' => (string)Tools::getValue($this->name . 'Filter_name'),
            'filter_date_add' => (string)Tools::getValue($this->name . 'Filter_date_add'),
        );
    }

    public function displayApproveLink($token, $id, $name = null)
    {
        $this->smarty->assign(array(
            'href' => $this->context->link->getAdminLink('AdminModules') . '&configure=' . $this->name . '&module_name=' . $this->name . '&approveComment=' . $id,
            'action' => $this->l('Approve'),
        ));

        return $this->display(__FILE__, 'views/templates/admin/list_action_approve.tpl');
    }

    public function hookDisplayShoptListReviews()
    {
        $average = ShopComment::getAverageGrade();
        $this->smarty->assign(array(
            'widget_type' => 'list',
            'averageTotal' => round($average['grade']),
            'ratings' => ShopComment::getRatings(),
            'nbComments' => (int)ShopComment::getCommentNumber(),
        ));


        return $this->fetch('module:shopcomments/shopcomments_reviews_list.tpl');
    }

    public function renderCommentsForm()
    {
        if (Tools::getValue('action') == 'quickview') {
            return false;
        }
        if (Configuration::get('SHOP_COMMENTS_ONLY_CUSTOMERS') == 1) {
            $this->context->smarty->assign('reviewsForCustomers', 1);
            $this->context->smarty->assign('reviewsForCustomersPurchased', 1);
            $this->context->smarty->assign('reviewsForCustomersPurchased', 0);
        } else {
            $this->context->smarty->assign('reviewsForCustomers', 1);
            $this->context->smarty->assign('reviewsForCustomersPurchased', 0);
        }

        $id_guest = (!$id_customer = (int)$this->context->cookie->id_customer) ? (int)$this->context->cookie->id_guest : false;
        $customerComment = ShopComment::getByCustomer((int)$this->context->customer->id, true, (int)$id_guest);

        $averages = ShopComment::getAverageGrade();
        $averageTotal = 0;
        foreach ($averages as $average) {
            $averageTotal += (float)($average);
        }
        $averageTotal = count($averages) ? ($averageTotal / count($averages)) : 0;

        $this->context->smarty->assign(array(
            'logged' => $this->context->customer->isLogged(true),
            'action_url' => '',
            'link' => $this->context->link,
            'comments' => ShopComment::getAllActive(),
            'averages' => $averages,
            'product_comment_path' => $this->_path,
            'averageTotal' => $averageTotal,
            'allow_guests' => (int)Configuration::get('SHOP_COMMENTS_ALLOW_GUESTS'),
            'SHOP_COMMENTS_GDPR' => (int)Configuration::get('SHOP_COMMENTS_GDPR'),
            'SHOP_COMMENTS_GDPRCMS' => (int)Configuration::get('SHOP_COMMENTS_GDPRCMS'),
            'too_early' => ($customerComment && (strtotime($customerComment['date_add']) + Configuration::get('SHOP_COMMENTS_MINIMAL_TIME')) > time()),
            'delay' => Configuration::get('SHOP_COMMENTS_MINIMAL_TIME'),
            'secure_key' => $this->secure_key,
            'nbComments' => (int)ShopComment::getCommentNumber(),
            'shopcomments_controller_url' => $this->context->link->getModuleLink('shopcomments'),
            'shopcomments_url_rewriting_activated' => (int)Configuration::get('PS_REWRITING_SETTINGS'),
            'moderation_active' => (int)Configuration::get('SHOP_COMMENTS_MODERATE'),
            'SHOP_COMMENT_DATE' => Configuration::get('SHOP_COMMENT_DATE'),
            'SHOP_COMMENT_TITLE' => Configuration::get('SHOP_COMMENT_TITLE'),
            'SHOP_COMMENT_BODY' => Configuration::get('SHOP_COMMENT_BODY'),
            'SHOP_COMMENT_AUTHOR' => Configuration::get('SHOP_COMMENT_AUTHOR'),
        ));

        //$this->context->controller->pagination((int) MyprestaComment::getCommentNumber((int) Tools::getValue('id_product')));

        return $this->display(__FILE__, '/shopcomments.tpl');
    }

    public function hookHeader()
    {
        $this->context->controller->addJS($this->_path . 'js/jquery.rating.pack.js');
        $this->context->controller->addJS($this->_path . 'js/jquery.textareaCounter.plugin.js');
        $this->context->controller->addJS($this->_path . 'js/shopcomments.js');
        $this->context->controller->addCSS($this->_path . 'shopcomments.css', 'all');
        if (Configuration::get('SHOP_COMMENTS_STARS') == 32) {
            $this->context->controller->addCSS($this->_path . 'shopcomments32.css', 'all');
        } else if (Configuration::get('SHOP_COMMENTS_STARS') == 24) {
            $this->context->controller->addCSS($this->_path . 'shopcomments24.css', 'all');
        } else if (Configuration::get('SHOP_COMMENTS_STARS') == 16) {
            $this->context->controller->addCSS($this->_path . 'shopcomments16.css', 'all');
        } else {
            $this->context->controller->addCSS($this->_path . 'shopcomments32.css', 'all');
        }

        $this->context->controller->addjqueryPlugin('fancybox');
        $this->page_name = Dispatcher::getInstance()->getController();
    }

    public function hookActionAdminControllerSetMedia($params)
    {
        // for update purposes only
    }

}
