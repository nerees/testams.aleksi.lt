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

class BoninstagramslickInstagramModuleFrontController extends ModuleFrontController
{
    public function initContent()
    {
        parent::initContent();
        $this->context = Context::getContext();

        if (Configuration::get('BONINSTAGRAMSLICK_DISPLAY')) {
            $this->context->smarty->assign('limit', Configuration::get('BONINSTAGRAMSLICK_LIMIT'));
            $this->context->smarty->assign('instagram_type', Configuration::get('BONINSTAGRAMSLICK_TYPE'));
            $this->context->smarty->assign('display_caroucel', Configuration::get('BONINSTAGRAMSLICK_DISPLAY_CAROUSEL'));
            $this->context->smarty->assign('user_tag', Configuration::get('BONINSTAGRAMSLICK_TAG'));
            $this->context->smarty->assign('user_id', Configuration::get('BONINSTAGRAMSLICK_USERID'));
        }

        if (_PS_VERSION_ >= 1.7) {
            $this->setTemplate('module:boninstagramslick/views/templates/front/instagram_1_7.tpl');
        } else {
            $this->setTemplate('instagram.tpl');
        }
    }
}
