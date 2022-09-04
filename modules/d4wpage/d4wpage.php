<?php


class d4wpage extends Module {

    private $_html = '';

    public function __construct()
    {
        $this->author = 'Dev4Web';
        $this->author_email = 'hi@dev4web.eu';
        $this->author_website = 'https://dev4web.eu';
        $this->name = 'd4wpage';
        $this->module_key = 'abcdefgh12345678';
        $this->version = '1.0.0';
        $this->need_instance = 1;
        $this->tab = 'other';
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('Dev4Web page');
        $this->description = $this->l('Module create custom page');

        $this->confirmUninstall = $this->l('Are you sure you want to uninstall this module?');
        $this->ps_versions_compliancy = array('min' => '1.7.0.0', 'max' => '1.7.9.9');
        $this->default_lang = (int)Configuration::get('PS_LANG_DEFAULT');
    }



    public function install()
    {

        if (Shop::isFeatureActive())
        {
            Shop::setContext(Shop::CONTEXT_ALL);
        }

        if (!parent::install())
        {
            return false;
        }

        $languages = Language::getLanguages(false, $this->context->shop->id);
        $get_meta_id = Db::getInstance()->getValue('SELECT id_meta FROM '._DB_PREFIX_.'meta_lang ORDER BY id_meta DESC;') + 1;

        foreach ($languages as $lang) {
            Db::getInstance()->Execute(
                "INSERT INTO `"._DB_PREFIX_."meta_lang` (`id_meta`, `id_shop`, `id_lang`, `title`, `description`, `keywords`, `url_rewrite`) 
                    VALUES (".$get_meta_id.", 1, ".$lang['id_lang'].", 'aleksi akcijų puslapis', 'specialus akcijų puslapis', 'aleksi,akcijos', 'aleksi-akcijos')"
            );
        }

        Db::getInstance()->Execute("INSERT INTO "._DB_PREFIX_."meta (`id_meta`, `page`, `configurable`) VALUES (".$get_meta_id.", 'd4wpage', 1)");

        $my_controller = file_get_contents(_PS_MODULE_DIR_.$this->name.'/controllers/front/D4wPageController.php');
        file_put_contents(_PS_ROOT_DIR_.'/controllers/front/D4wPageController.php',$my_controller);

        $my_template = file_get_contents(_PS_MODULE_DIR_.$this->name.'/views/templates/front/d4wpage.tpl');
        file_put_contents(_PS_THEME_DIR_.'templates/d4wpage.tpl', $my_template);


        return true;
    }

    public function uninstall()
    {

        if (Shop::isFeatureActive())
        {
            Shop::setContext(Shop::CONTEXT_ALL);
        }

        if (!parent::uninstall())
        {
            return false;
        }

        Db::getInstance()->Execute("DELETE FROM "._DB_PREFIX_."meta_lang WHERE url_rewrite = 'aleksi-akcijos'");
        Db::getInstance()->Execute("DELETE FROM "._DB_PREFIX_."meta WHERE page = 'd4wpage'");

        unlink(_PS_ROOT_DIR_.'/controllers/front/D4wPageController.php');
        unlink(_PS_THEME_DIR_.'templates/d4wpage.tpl');


        return true;
    }



}
