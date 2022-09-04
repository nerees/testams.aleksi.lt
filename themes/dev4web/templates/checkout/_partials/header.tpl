{**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 *}
{block name='header_banner'}
  <div class="header-banner">
    {hook h='displayBanner'}
  </div>
{/block}

{block name='header_nav'}
  <nav class="header-nav hidden-sm-down">
    <div class="container">
      <div class="nn-header-flex">
        <div class="hidden-sm-down nn-header-left">

          {*<div class="nn-header-left">
            {hook h='displayNav1'}
          </div>*}
          {*<div class="nn-header-right">
              {hook h='displayNav2'}
          </div>*}

          <span><a href="https://www.facebook.com/aleksistore" target="_blank" style="color:#fff;"><img src="{$urls.img_url}facebook.svg" alt="facebook aleksi link">&nbsp; Aleksi_facebook</a></span>
          <span class="ml-2"><a href="https://www.instagram.com/aleksistore/" target="_blank" style="color:#fff;"><img src="{$urls.img_url}instagram.svg" alt="instagram aleksi link">&nbsp; Aleksi_instagram</a></span>
        </div>
        <div class="hidden-sm-down nn-header-right">
          <span><img src="{$urls.img_url}phone.svg" alt="phone aleksi link">&nbsp;<a href="tel:+37062490225"> +370 624 90225</a></span>
          <span class="ml-2"><img src="{$urls.img_url}mail.svg" alt="email aleksi link">&nbsp; <a href="mailto:info@aleksi.lt">info@aleksi.lt</a></span>
        </div>
        {*lets try mobile*}
        {*<div class="hidden-md-up text-sm-center mobile">
          <div class="float-xs-left" id="menu-icon">
            <i class="material-icons d-inline">&#xE5D2;</i>
          </div>*}
        {*<div class="float-xs-right"></div>*}
        {*<div class="float-xs-right" id="_mobile_user_info"></div>*}
        {*<div class="top-logo" id="_mobile_logo"></div>*}
        {*          <div class="clearfix"></div>
                  <div id="mobile_top_menu_wrapper" class="row hidden-md-up" style="display:none;">
                    <div class="js-top-menu mobile" id="_mobile_top_menu"></div>
                    <div class="js-top-menu-bottom">
                      <div id="_mobile_currency_selector"></div>
                      <div id="_mobile_language_selector"></div>
                      <div id="_mobile_contact_link"></div>
                    </div>
                  </div>
                </div>*}
        {*end lets try mobile*}
      </div>
    </div>
  </nav>
{/block}

{*block name='header_top'}
  <div class="header-top">
    <div class="container">
       <div class="row nn-header-top">
        <div class="col-md-2 hidden-sm-down" id="_desktop_logo">
            {if $page.page_name == 'index'}
              <h1>
                <a href="{$urls.pages.index}">
                  <img class="logo img-responsive" src="{$shop.logo}" alt="{$shop.name}" loading="lazy" width="100" height="28">
                </a>
              </h1>
            {else}
                <a href="{$urls.pages.index}">
                  <img class="logo img-responsive" src="{$shop.logo}" alt="{$shop.name}" loading="lazy" width="100" height="28">
                </a>
            {/if}
        </div>
        <div class="header-top-right col-md-10 col-sm-12 position-static">
          {hook h='displayTop'}
        </div>
      </div>
      <div id="mobile_top_menu_wrapper" class="row hidden-md-up" style="display:none;">
        <div class="js-top-menu mobile" id="_mobile_top_menu"></div>
        <div class="js-top-menu-bottom">
          <div id="_mobile_currency_selector"></div>
          <div id="_mobile_language_selector"></div>
          <div id="_mobile_contact_link"></div>
        </div>
      </div>
    </div>
  </div>
  {hook h='displayNavFullWidth'}
{/block*}
{block name='header_top'}
  <div class="header-top hidden-sm-down">
    <div class="container">
      <div class="nn-header-top">
        <div class="nn-search-block hidden-sm-down">
          {hook h='displayTop'}
          {*          <span><img src="{$urls.img_url}search.svg" alt="search"></span>*}
        </div>
        <div>
          <a href="{$urls.pages.index}">
            <img class="logo" src="{$urls.img_url}logo_juodas_bigger.svg" alt="{$shop.name}">
          </a>
        </div>
        <div class="nn-user-block">
          {*
          {hook h='displayNav1'}
          *}
          {hook h='displayNav2'}
          <span><a href="{$urls.pages.my_account}"><img src="{$urls.img_url}user.svg" alt="user aleksi link"></a>&nbsp; </span>
          <span><a href="/module/blockwishlist/lists"><img src="{$urls.img_url}Vector.svg" alt="wishlist aleksi link"></a>&nbsp; </span>
          <span><a href="{$urls.pages.cart}"> <img src="{$urls.img_url}shopping_cart.svg" alt="cart aleksi link">&nbsp;</a> </span>
        </div>
      </div>
    </div>
  </div>
  <div class="nn-main-menu hidden-sm-down">
    <div class="container">
      {hook h='displayNnMenu'}
    </div>
  </div>
{/block}
{* mobile *}
{block name='header_nav'}
  <nav class="header-nav hidden-md-up">
    <div class="container">
      <div class="hidden-md-up text-sm-center mobile">
        <div class="float-xs-left" id="menu-icon">
          <i class="material-icons d-inline">&#xE5D2;</i>
        </div>
        <span style="position:absolute; top:22px; left:55px; cursor:pointer;" id="mobile-search"><i class="material-icons" aria-hidden="true" style="color: #fff; font-size: 32px;">search</i></span>
        <a href="{$urls.pages.index}">
          <span style="position:absolute; top:15px; left:31%; cursor:pointer;"><img src="{$urls.img_url}logo_baltas_menu.svg" alt="aleksi logotipas mobiliam" class="tas-mobile-logo"></span>
        </a>
        <span style="position: absolute; top:22px; right:45px;">
        <span><a href="{$urls.pages.my_account}"><i class="material-icons" aria-hidden="true" style="color: #fff;">person</i></a>&nbsp; </span>
        <span><a href="/module/blockwishlist/lists"><i class="material-icons" aria-hidden="true" style="color: #fff;">favorite</i></a>&nbsp; </span>
        </span>
        <div class="float-xs-right" id="user-info-cart">
          {hook h='displayNav2'}
        </div>
        <div class="clearfix"></div>
        <div id="mobile_top_menu_wrapper" class="row hidden-md-up" style="display:none;">
          <div class="js-top-menu mobile" id="_mobile_top_menu"></div>
          <div class="js-top-menu-bottom">
            <div class="mobile-header-menu-bottom" style="text-align: center;">
              <a href="{$urls.pages.index}">
                <img class="" src="{$urls.img_url}logo_juodas_bigger.svg" alt="{$shop.name}" style="max-width: 150px;">
              </a>
              <div style="margin-left: 30%; margin-right: auto;">
                <div class="row" style="display:flex; flex-direction: column; margin-top: 20px; text-align: left; justify-content: center; align-items: left; align-content: center;">
                  <div class="col-sm-6">
                    <span style="line-height: 32px;"><a href="https://www.facebook.com/aleksistore" target="_blank" style="color:#262020;"><i class='fab fa-facebook-f' style="font-size: 18px; color: #000;"></i>&nbsp; &nbsp; Aleksi_facebook</a></span>
                  </div>
                  <div class="col-sm-6">
                    <span style="line-height: 32px;"><a href="https://www.instagram.com/aleksistore/" target="_blank" style="color:#262020;"><i class='fab fa-instagram' style="font-size: 18px; color: #000;"></i> &nbsp; Aleksi_instagram</a></span>
                  </div>
                  <div class="col-sm-6">
                    <span style="line-height: 32px;"><i class='fas fa-envelope' style="font-size: 18px; color: #000;"></i>&nbsp;<a href="mailto:info@aleksi.lt" style="color:#262020;"> info@aleksi.lt</a></span>
                  </div>
                  <div class="col-sm-6">
                    <span style="line-height: 32px;"><i class='fas fa-phone' style="font-size: 18px; color: #000;"></i>&nbsp;<a href="tel:+37062490225" style="color:#262020;"> +370 624 90225</a></span>
                  </div>
                </div>
              </div>
              {*<div style="margin-top: 15px; text-align: left; margin-right: auto; margin-left: auto;">
                <span><a href="https://www.facebook.com/aleksistore" target="_blank" style="color:#262020;"><img src="https://img.icons8.com/material/24/000000/facebook-f.png"/>&nbsp; Aleksi_facebook</a></span>
                <span><a href="https://www.instagram.com/aleksistore/" target="_blank" style="color:#262020;"><img src="https://img.icons8.com/material/24/000000/instagram-new--v1.png"/> &nbsp; Aleksi_instagram</a></span>
              </div>
              <div style="margin-top: 15px; text-align: left; margin-left: auto; margin-right: auto;">
                <span><img src="https://img.icons8.com/material/24/000000/filled-message--v1.png"/>&nbsp;<a href="mailto:info@aleksi.lt" style="color:#262020;"> info@aleksi.lt</a></span>
                <span class="ml-2"><img src="https://img.icons8.com/material/24/000000/phone--v1.png"/> <a href="tel:+37062490225" style="color:#262020;"> +370 624 90225</a></span>
              </div>*}
            </div>
            <div id="_mobile_currency_selector"></div>
            <div id="_mobile_language_selector"></div>
            <div id="_mobile_contact_link"></div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div id="mobile-search-block" style="display: none;">
    {hook h='displayTop'}
  </div>
{/block}