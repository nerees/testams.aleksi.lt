<?php
// Include Module
include_once(__DIR__ .'/../../shopcomments.php');
// Include Models
include_once(__DIR__ .'/../../ShopComment.php');

class shopcommentsfeedbackModuleFrontController extends ModuleFrontController
{
	public function __construct()
	{
		parent::__construct();
		$this->context = Context::getContext();
	}

	public function setMedia(){
        parent::setMedia();
    }

	public function initContent()
	{
	    $module = Module::getInstanceByName('shopcomments');
	    $nb = (Configuration::get('PC_NB_FEEDBACK') != false ? Configuration::get('PC_NB_FEEDBACK'):10);
	    $total = ShopComment::getAllActiveCount();
	    $total = $total[0]['count'];
        $p = (Tools::getValue('p', 0) != 0 ? Tools::getValue('p'):1);
        $comments = ShopComment::getAllActivePro(false, $p, $nb);
        $pagination['items_shown_from'] = ($p == 1 ? 1:$p*$nb-$nb);
        $pagination['items_shown_to'] = ($p == 1 ? $nb:$p*$nb);
        $pagination['total_items'] = $total;
        $pagination['should_be_displayed'] = (ceil($pagination['total_items']/$nb) > 1 ? 1:0);

        for ($i=0; $i<ceil($pagination['total_items']/$nb); $i++){
            $pagination['pages'][$i]['page']=$i+1;
            $pagination['pages'][$i]['clickable']=1;
            $pagination['pages'][$i]['js-search-link']=1;
            if ((int)Tools::getValue('p') == $i+1){
                $pagination['pages'][$i]['current']=1;
            }
            $pagination['pages'][$i]['url']=$this->context->link->getModuleLink('shopcomments', 'feedback', array('p'=> $i+1));
        }

	    $this->context->smarty->assign(array(
            'logged' => $this->context->customer->isLogged(true),
	        'comments' => $comments,
            'secure_key' => $module->secure_key,
            'pagination' => $pagination,
            'shopcomments_controller_url' => $this->context->link->getModuleLink('shopcomments'),
            'shopcomments_url_rewriting_activated' => (int)Configuration::get('PS_REWRITING_SETTINGS'),
            'moderation_active' => (int)Configuration::get('SHOP_COMMENTS_MODERATE'),
        ));
		parent::initContent();
        $this->setTemplate('module:shopcomments/views/templates/front/feedback.tpl');

    }

}
