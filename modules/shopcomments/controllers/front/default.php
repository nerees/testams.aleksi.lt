<?php

// Include Module
include_once(__DIR__ .'/../../shopcomments.php');
// Include Models
include_once(__DIR__ .'/../../ShopComment.php');

class shopcommentsDefaultModuleFrontController extends ModuleFrontController
{
	public function __construct()
	{
		parent::__construct();

		$this->context = Context::getContext();
	}

	public function initContent()
	{
		parent::initContent();

		if (Tools::isSubmit('action'))
		{
            if (Tools::getValue('action') == 'add_comment') {
                $this->ajaxProcessAddComment();
            }
		}
	}

	protected function ajaxProcessAddComment()
	{
		$module_instance = new shopcomments();

		$result = true;
		$id_guest = 0;
		$id_customer = $this->context->customer->id;
		if (!$id_customer)
			$id_guest = $this->context->cookie->id_guest;

		$errors = array();
		// Validation
//		if (!Tools::getValue('title') || !Validate::isGenericName(Tools::getValue('title')))
//			$errors[] = $module_instance->l('Title is incorrect', 'default');
//        if (strlen(Tools::getValue('title')) < Configuration::get('SHOP_COMMENTS_MIN_TITLE'))
//            $errors[] = $module_instance->l('Title is incorrect. The minimal required number of characters in title is: ', 'default').Configuration::get('SHOP_COMMENTS_MIN_TITLE');
        if (strlen(Tools::getValue('content')) < Configuration::get('SHOP_COMMENTS_MIN_BODY'))
            $errors[] = $module_instance->l('Comment is incorrect. The minimal required number of characters in comment is: ', 'default').Configuration::get('SHOP_COMMENTS_MIN_BODY');
		if (!Tools::getValue('content') || !Validate::isMessage(Tools::getValue('content')))
            $errors[] = $module_instance->l('Comment is incorrect', 'default');
		if (!$id_customer && (!Tools::isSubmit('customer_name') || !Tools::getValue('customer_name') || !Validate::isGenericName(Tools::getValue('customer_name'))))
			$errors[] = $module_instance->l('Customer name is incorrect', 'default');
		if (!$id_customer && (!Tools::isSubmit('customer_email') || !Tools::getValue('customer_email') || !Validate::isEmail(Tools::getValue('customer_email'))))
			$errors[] = $module_instance->l('Customer email is incorrect', 'default');
		if (!$this->context->customer->id && !Configuration::get('SHOP_COMMENTS_ALLOW_GUESTS'))
			$errors[] = $module_instance->l('Turite prisijungti kad galėtumėte rašyti atsiliepimus', 'default');
        if ((int)Tools::getValue('grade') <= 0)
            $errors[] = $module_instance->l('Pažymėkite įvertinimą', 'default');
//		if (!count(Tools::getValue('criterion')))
//			$errors[] = $module_instance->l('You must give a rating', 'default');

		if (!count($errors))
		{
			$customer_comment = ShopComment::getByCustomer(Tools::getValue('id_product'), $id_customer, true, $id_guest);
			if (!$customer_comment || ($customer_comment && (strtotime($customer_comment['date_add']) + (int)Configuration::get('SHOP_COMMENTS_MINIMAL_TIME')) < time()))
			{
				$comment = new ShopComment();
				$comment->content = strip_tags(Tools::getValue('content'));
				$comment->id_customer = (int)$id_customer;
				$comment->id_guest = $id_guest;
				$comment->customer_email = Tools::getValue('customer_email');
				$comment->customer_name = Tools::getValue('customer_name');
				if (!$comment->customer_name)
					$comment->customer_name = pSQL($this->context->customer->firstname.' '.$this->context->customer->lastname);
				$comment->title = Tools::getValue('title') ?: 'Atsiliepimas';
				$comment->grade = (int)Tools::getValue('grade');
				$comment->validate = 0;
				$comment->save();

				$grade_sum = 0;
				$result = true;
                Hook::exec('actionSpawnActionShopComment', array('post' => $_POST, 'comment' => $comment, 'files' => $_FILES));
				Tools::clearCache(Context::getContext()->smarty, $this->getTemplatePath('shopcomments-reviews.tpl'));
			}
			else
			{
				$result = false;
				$errors[] = $module_instance->l('Pašome palaukti kol galėsite rašyti kitą atsiliepimą', 'default').' '.Configuration::get('SHOP_COMMENTS_MINIMAL_TIME').' '.$module_instance->l('seconds before posting a new comment', 'default');
			}
		}
		else
			$result = false;

		die(Tools::jsonEncode(array(
			'result' => $result,
			'errors' => $errors
		)));
	}
}
