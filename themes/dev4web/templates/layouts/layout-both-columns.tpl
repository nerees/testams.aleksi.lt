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
<!doctype html>
<html lang="{$language.locale}">

  <head>
    {block name='head'}
      {include file='_partials/head.tpl'}
    {/block}
  </head>

  <body id="{$page.page_name}" class="{$page.body_classes|classnames}">

    {block name='hook_after_body_opening_tag'}
      {hook h='displayAfterBodyOpeningTag'}
    {/block}

    <main>
      {block name='product_activation'}
        {include file='catalog/_partials/product-activation.tpl'}
      {/block}

        <header-mobile>
            <div class="mobile-header">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6" style="text-align: left; float: left;">
                        <span><a href="https://www.facebook.com/aleksistore/" target="_blank" style="color:#262020;"><i class='fab fa-facebook-f' style="font-size: 21px; color: #262020;"></i></a></span>
                        <span style="margin-left: 5px;"><a href="https://www.instagram.com/aleksistore/" target="_blank" style="color:#262020;"><i class='fab fa-instagram' style="font-size: 21px; color: #262020;"></i></a></span>
{*                        <span style="margin-left: 5px;"><img src="https://img.icons8.com/material/24/000000/filled-message--v1.png"/>&nbsp;<a href="tel:+37062490225" style="color:#262020;"></a></span>*}
{*                        <span style="margin-left: 5px;"><img src="https://img.icons8.com/material/24/000000/phone--v1.png"/> <a href="mailto:info@aleksi.lt" style="color:#262020;"></a></span>*}
                    </div>
                    <div class="col-sm-6" style="text-align: right; float: right; margin-right: 0;">
{*                        <span><a href="https://www.facebook.com/aleksistore/" target="_blank" style="color:#262020;"><img src="https://img.icons8.com/material/24/000000/facebook-f.png"/></a></span>*}
{*                        <span style="margin-left: 5px;"><a href="https://www.instagram.com/aleksistore/" target="_blank" style="color:#262020;"><img src="https://img.icons8.com/material/24/000000/instagram-new--v1.png"/></a></span>*}
                        <span><i class='fa fa-phone' style="font-size: 21px; color: #262020;"></i><a href="tel:+37062490225" style="color:#262020;"></a></span>
                        <span style="margin-left: 5px;"><i class='fa fa-envelope' style="font-size: 21px; color: #262020;"></i><a href="mailto:info@aleksi.lt" style="color:#262020;"></a></span>
                    </div>
                </div>
            </div>
            </div>
        </header-mobile>

      <header id="header">
        {block name='header'}
          {include file='_partials/header.tpl'}
        {/block}
      </header>

      <section id="wrapper">
          {block name='notifications'}
          {include file='_partials/notifications.tpl'}
        {/block}
          {*<div class="row mt-2 mb-2">
              <div class="nn-mobile-logo col-sm-12">
                  <a href="{$urls.pages.index}">
                      <img class="" src="{$urls.img_url}logo_juodas_bigger.svg" alt="{$shop.name}" style="max-width: 150px;">
                  </a>
              </div>
          </div>*}
        {if $page.page_name == "index"}

         {*mobile slider*}
            <section class="mobile-slider-section">
                <div class="nn-slider-mobile">
                    <div class="nn-slider-mobile-item">
                        <a href="https://aleksi.lt/pagrindinis/2751-bloommies-vitaminai-plaukams-6-men-kursas.html">
                            <img class="img-item" src="{$urls.img_url}mobile-guminukai.webp" alt="guminukai">
                        </a>
                    </div>
{*                    <div class="nn-slider-mobile-item">*}
{*                        <a href="https://aleksi.lt/137-vasaros-ispardavimas">*}
{*                            <img class="img-item" src="{$urls.img_url}bendras-mobile.webp" alt="VASAROS IŠPARDAVIMAS nuolaidos">*}
{*                        </a>*}
{*                    </div>*}
{*                    <div class="nn-slider-mobile-item">*}
{*                        <a href="https://aleksi.lt/brand/40-casmara">*}
{*                            <img class="img-item" src="{$urls.img_url}Casmara-mobile.webp" alt="CASMARA nuolaidos">*}
{*                        </a>*}
{*                    </div>*}
{*                    <div class="nn-slider-mobile-item">*}
{*                        <a href="https://aleksi.lt/brand/46-osom-professional">*}
{*                            <img class="img-item" src="{$urls.img_url}Osam-mobile.webp" alt="OSOM nuolaidos">*}
{*                        </a>*}
{*                    </div>*}
{*                    <div class="nn-slider-mobile-item">*}
{*                        <a href="https://aleksi.lt/paieska?controller=search&s=Linea">*}
{*                            <img class="img-item" src="{$urls.img_url}mobile-1.webp" alt="Linea mamma baby">*}
{*                            <div class="nn-slider-mobile-inner" style="top:2%;">*}
{*                                <h1 style="font-size: 7vw; font-weight: 300; line-height: 1; letter-spacing: -1px;">ŠVAROS MĖNUO</h1>*}
{*                                <h2 style="font-size: 3.5vw; font-weight: 400; line-height: 0.7">15% nuolaida visai buitinei chemijai su kodu: </h2>*}
{*                                  <p style="font-size: 6vw; color: #0bb5e8; line-height: 0.8;">PAVASARIS</p>*}
{*                                <br class="hidden-sm-down"><br>*}
{*                                <a href="/brand/30-equa" class="banner-btn"> Užsisakyti </a>*}
{*                            </div>*}
{*                        </a>*}
{*                    </div>*}
{*                    <div class="nn-slider-mobile-item">*}
{*                        <a href="https://aleksi.lt/paieska?controller=search&s=Cocosilis">*}
{*                            <img class="img-item" src="{$urls.img_url}mobile-2.webp" alt="Cosolis">*}
{*                            <div class="nn-slider-mobile-inner">*}
{*                                <h1 style="font-size: 10vw; font-weight: 500; line-height: 2; letter-spacing: -3px;">EQUA gertuvės</h1>*}
{*                                <h2 style="font-size: 5.5vw; font-weight: 400; line-height: 1.2">Elegantiškas dizainas <br>ir aukščiausios klasės kokybė</h2>*}
{*                                <br class="hidden-sm-down"><br>*}
{*                                <a href="/brand/30-equa" class="banner-btn"> Užsisakyti </a>*}
{*                            </div>*}
{*                        </a>*}
{*                    </div>*}
{*                    <div class="nn-slider-mobile-item">*}
{*                        <a href="https://aleksi.lt/paieska?controller=search&s=Antoine">*}
{*                            <img class="img-item" src="{$urls.img_url}mobile-3.webp" alt="Antoine">*}
{*                            <div class="nn-slider-mobile-inner">*}
{*                                <h1 style="font-size: 10vw; font-weight: 500; line-height: 2; letter-spacing: -3px;">EQUA gertuvės</h1>*}
{*                                <h2 style="font-size: 5.5vw; font-weight: 400; line-height: 1.2">Elegantiškas dizainas <br>ir aukščiausios klasės kokybė</h2>*}
{*                                <br class="hidden-sm-down"><br>*}
{*                                <a href="/brand/30-equa" class="banner-btn"> Užsisakyti </a>*}
{*                            </div>*}
{*                        </a>*}
{*                    </div>*}
{*                    <div class="nn-slider-mobile-item">*}
{*                        <a href="/brand/30-equa">*}
{*                        <img class="img-item" src="{$urls.img_url}moteriski_mob.webp" alt="slide1">*}
{*                        *}{*<div class="nn-slider-mobile-inner">*}
{*                            <h1 style="font-size: 10vw; font-weight: 500; line-height: 2; letter-spacing: -3px;">EQUA gertuvės</h1>*}
{*                            <h2 style="font-size: 5.5vw; font-weight: 400; line-height: 1.2">Elegantiškas dizainas <br>ir aukščiausios klasės kokybė</h2>*}
{*                            <br class="hidden-sm-down"><br>*}
{*                            <a href="/brand/30-equa" class="banner-btn"> Užsisakyti </a>*}
{*                        </div>*}
{*                        </a>*}
{*                    </div>*}
{*                    <div class="nn-slider-mobile-item">*}
{*                        <a href="/brand/2-eco-rascals">*}
{*                        <img class="img-item" src="{$urls.img_url}vaikiski_mob.webp" alt="slide2">*}
{*                        *}{*<div class="nn-slider-mobile-inner">*}
{*                            <h1 style="font-size: 10vw; font-weight: 500; line-height: 2; letter-spacing: -3px;">Eco rascals</h1>*}
{*                            <h2 style="font-size: 4.5vw; font-weight: 400; line-height: 1.2">Tvarūs ir stilingi produktai, <br>suteikiantys džiaugsmo mažiesiems</h2>*}
{*                            <br class="hidden-sm-down"><br>*}
{*                            <a href="/brand/2-eco-rascals" class="banner-btn"> Užsisakyti </a>*}
{*                        </div>*}
{*                        </a>*}
{*                    </div>*}
{*                    <div class="nn-slider-mobile-item">*}
{*                        <a href="/brand/21-noberu">*}
{*                        <img class="img-item" src="{$urls.img_url}vyriski_mob.webp" alt="slide4">*}
{*                        *}{*<div class="nn-slider-mobile-inner">*}
{*                            <h1 style="font-size: 10vw; font-weight: 500; line-height: 2; letter-spacing: -3px;">Nõberu of Sweden</h1>*}
{*                            <h2 style="font-size: 5.5vw; font-weight: 400; line-height: 1.2">Aukštos kokybės <br>švediška kosmetika vyrams</h2>*}
{*                            <br class="hidden-sm-down">*}
{*                            <br>*}
{*                            <a href="/brand/21-noberu" class="banner-btn"> Užsisakyti </a>*}
{*                        </div>*}
{*                        </a>*}
{*                    </div>*}
                </div>
                <img src="{$urls.img_url}/cat_left_prev.png" alt="slysti kairiau" class="nav-prev-mobile-slider">
                <img src="{$urls.img_url}/cat_right_next.png" alt="slysti dešiniau" class="nav-next-mobile-slider">
            </section>
         {*end mobile slider *}

        <section class="desktop-slider-section">
            <div class="nn-slider-desktop">
                <div class="nn-slider-desktop-item">
                    <a href="https://aleksi.lt/pagrindinis/2751-bloommies-vitaminai-plaukams-6-men-kursas.html">
                        <img class="img-item" src="{$urls.img_url}guminukai.webp" alt="Guminukai">
                        <div class="nn-slider-inner">

                        </div>
                    </a>
                </div>
{*                <div class="nn-slider-desktop-item">*}
{*                    <a href="https://aleksi.lt/137-vasaros-ispardavimas">*}
{*                        <img class="img-item" src="{$urls.img_url}bendras-web.webp" alt="VASAROS IŠPARDAVIMAS nuolaidos">*}
{*                        <div class="nn-slider-inner">*}
{*                            <h1 style="font-size: 2vw; font-weight: 400; line-height: 1.6; letter-spacing: -1px;"> <span style="font-size: 2.4vw; font-weight: 500;">Mylimiausems prekiniams ženklams</span></h1>*}
{*                            <h2 style="font-size: 1.5vw; font-weight: 400; line-height: 1.2">Nuolaidos iki <span style="font-size: 2.5vw; font-weight: 500;">50%!</span></h2>*}
{*                                                        <br class="hidden-sm-down"><br>*}
{*                                                        <a href="/brand/30-equa" class="banner-btn"> Užsisakyti </a>*}
{*                        </div>*}
{*                    </a>*}
{*                </div>*}
{*                <div class="nn-slider-desktop-item">*}
{*                    <a href="https://aleksi.lt/brand/40-casmara">*}
{*                        <img class="img-item" src="{$urls.img_url}Casmara-web.webp" alt="CASMARA">*}
{*                        <div class="nn-slider-inner">*}
{*                            <h1 style="font-size: 2vw; font-weight: 400; line-height: 2; letter-spacing: -1px;"> <span style="font-size: 3vw; font-weight: 500;">25% </span>nuolaida visiems</h1>*}
{*                            <h2 style="font-size: 2vw; font-weight: 400; line-height: 1.2"><span style="font-size: 2.5vw; font-weight: 500;">CASMARA </span> produktams</h2>*}
{*                            *}{*                            <br class="hidden-sm-down"><br>*}
{*                            *}{*                            <a href="/brand/30-equa" class="banner-btn"> Užsisakyti </a>*}
{*                        </div>*}
{*                    </a>*}
{*                </div>*}
{*                <div class="nn-slider-desktop-item">*}
{*                    <a href="https://aleksi.lt/brand/46-osom-professional">*}
{*                        <img class="img-item" src="{$urls.img_url}osam-web.webp" alt="OSAM">*}
{*                        <div class="nn-slider-inner">*}
{*                            <h1 style="font-size: 2vw; font-weight: 400; line-height: 1.3; letter-spacing: -1px;"> <span style="font-size: 3vw; font-weight: 500;">Tavo plaukai <br> verti geriausio!</span></h1>*}
{*                            <br>*}
{*                            <h2 style="font-size: 1.5vw; font-weight: 400; line-height: 1.2">Visiems <span style="font-size: 2vw; font-weight: 500;">OSOM</span> produktams 20% nuolaida</h2>*}
{*                            *}{*                            <br class="hidden-sm-down"><br>*}
{*                            *}{*                            <a href="/brand/30-equa" class="banner-btn"> Užsisakyti </a>*}
{*                        </div>*}
{*                    </a>*}
{*                </div>*}
{*                <div class="nn-slider-desktop-item">*}
{*                    <a href="https://aleksi.lt/paieska?controller=search&s=Linea">*}
{*                        <img class="img-item" src="{$urls.img_url}desk-2.webp" alt="Linea mamma baby">*}
{*                        <div class="nn-slider-inner">*}
{*                            <h1 style="font-size: 2vw; font-weight: 400; line-height: 2; letter-spacing: -1px;"> <span style="font-size: 3.5vw; font-weight: 500;">LINEA MAMMA BABY</span></h1>*}
{*                            <h2 style="font-size: 1.5vw; font-weight: 400; line-height: 1.2">Aukščiausios kokybės produktai šeimai ir<br>draugiški aplinkai <span style="font-size: 2vw; font-weight: 500;"></span></h2>*}
{*                            *}{*                            <br class="hidden-sm-down"><br>*}
{*                            *}{*                            <a href="/brand/30-equa" class="banner-btn"> Užsisakyti </a>*}
{*                        </div>*}
{*                    </a>*}
{*                </div>*}
{*                <div class="nn-slider-desktop-item">*}
{*                    <a href="https://aleksi.lt/paieska?controller=search&s=Cocosilis">*}
{*                        <img class="img-item" src="{$urls.img_url}desk-1.webp" alt="Cocosilis">*}
{*                        <div class="nn-slider-inner">*}
{*                            <h1 style="font-size: 2vw; font-weight: 400; line-height: 2; letter-spacing: -1px;"> <span style="font-size: 3.5vw; font-weight: 500;">COCOSOLIS</span></h1>*}
{*                            <h2 style="font-size: 1.5vw; font-weight: 400; line-height: 1.2">Natūrali ir ekologiška<br>kosmetika <span style="font-size: 2vw; font-weight: 500;"></span></h2>*}
{*                            *}{*                            <br class="hidden-sm-down"><br>*}
{*                            *}{*                            <a href="/brand/30-equa" class="banner-btn"> Užsisakyti </a>*}
{*                        </div>*}
{*                    </a>*}
{*                </div>*}
{*                <div class="nn-slider-desktop-item">*}
{*                    <a href="https://aleksi.lt/paieska?controller=search&s=Antoine">*}
{*                        <img class="img-item" src="{$urls.img_url}desk-3.webp" alt="Antoine">*}
{*                        <div class="nn-slider-inner">*}

{*                            <h1 style="font-size: 2vw; font-weight: 400; line-height: 2; letter-spacing: -1px;"> <span style="font-size: 3.5vw; font-weight: 500;">ANTOINE</span></h1>*}
{*                            <h2 style="font-size: 1.5vw; font-weight: 400; line-height: 1.2">Pigiau nerasi!<br>Išbandyk tik už <span style="font-size: 2vw; font-weight: 500;">24€!</span></h2>*}
{*                            <br class="hidden-sm-down"><br>*}
{*                            <a href="/brand/30-equa" class="banner-btn"> Užsisakyti </a>*}
{*                        </div>*}
{*                    </a>*}
{*                </div>*}
                {*<div class="nn-slider-desktop-item">
                    <a href="/sumazinta-kaina">
                    <img class="img-item" src="{$urls.img_url}slideris_bendras.webp" alt="slide0">
                    {*<div class="nn-slider-inner">

                        <h1 style="font-size: 4vw; font-weight: 500; line-height: 2; letter-spacing: -3px;">EQUA gertuvės</h1>
                        <h2 style="font-size: 1.5vw; font-weight: 400; line-height: 1.2">Elegantiškas dizainas <br>ir aukščiausios klasės kokybė</h2>
                        <br class="hidden-sm-down"><br>
                        <a href="/brand/30-equa" class="banner-btn"> Užsisakyti </a>
                    </div>*}
                {*    </a>
                </div>*}
{*                <div class="nn-slider-desktop-item">*}
{*                    <img class="img-item" src="{$urls.img_url}slide_gertuves.webp" alt="slide1">*}
{*                    <div class="nn-slider-inner">*}
{*                        <img src="{$urls.img_url}ecorascals.png">*}
{*                        <h1 style="font-size: 4vw; font-weight: 500; line-height: 2; letter-spacing: -3px;">EQUA gertuvės</h1>*}
{*                        <h2 style="font-size: 1.5vw; font-weight: 400; line-height: 1.2">Elegantiškas dizainas <br>ir aukščiausios klasės kokybė</h2>*}
{*                        <br class="hidden-sm-down"><br>*}
{*                        <a href="/brand/30-equa" class="banner-btn"> Užsisakyti </a>*}
{*                    </div>*}
{*                </div>*}
{*                <div class="nn-slider-desktop-item">*}
{*                    <img class="img-item" src="{$urls.img_url}slide_vaikai_2.webp" alt="slide2">*}
{*                    <div class="nn-slider-inner">*}
{*                        <img src="{$urls.img_url}ecorascals.png">*}
{*                        <h1 style="font-size: 4vw; font-weight: 500; line-height: 2; letter-spacing: -3px;">Eco rascals</h1>*}
{*                        <h2 style="font-size: 1.5vw; font-weight: 400; line-height: 1.2">Tvarūs ir stilingi produktai, <br>suteikiantys džiaugsmo mažiesiems</h2>*}
{*                        <br class="hidden-sm-down"><br>*}
{*                        <a href="/brand/2-eco-rascals" class="banner-btn"> Užsisakyti </a>*}
{*                    </div>*}
{*                </div>*}
                {*<div class="nn-slider-desktop-item">
                    <img class="img-item" src="{$urls.img_url}slide_vaikai.webp" alt="slide3">
                    <div class="nn-slider-inner">
                        <h1>Slaidas 3</h1>
                        <p>dar ten kas koks buttonas</p>
                    </div>
                </div>*}
{*                <div class="nn-slider-desktop-item">*}
{*                    <img class="img-item" src="{$urls.img_url}slide_vyrams.webp" alt="slide4">*}
{*                    <div class="nn-slider-inner">*}
{*                        <h1 style="font-size: 4vw; font-weight: 500; line-height: 2; letter-spacing: -3px;">Nõberu of Sweden</h1>*}
{*                        <h2 style="font-size: 1.5vw; font-weight: 400; line-height: 1.2">Aukštos kokybės <br>švediška kosmetika vyrams</h2>*}
{*                        <br class="hidden-sm-down">*}
{*                        <br>*}
{*                        <a href="/brand/21-noberu" class="banner-btn"> Užsisakyti </a>*}
{*                    </div>*}
{*                </div>*}
{*                <img src="{$urls.img_url}cat_left_prev.png" alt="slysti kairiau" class="" style="position: absolute; left:0; top:50%; width: 36px; height:56px;">*}
{*                <img src="{$urls.img_url}cat_right_next.png" alt="slysti dešiniau" class="" style="position: absolute; right:0; top:50%; width: 36px; height:56px;">*}
            </div>
            <img src="{$urls.img_url}/cat_left_prev.png" alt="slysti kairiau" class="nav-k-prev-slider">
            <img src="{$urls.img_url}/cat_right_next.png" alt="slysti dešiniau" class="nav-k-next-slider">
        </section>
        {/if}
        {hook h="displayWrapperTop"}
        <div class="container">
          {block name='breadcrumb'}
            {include file='_partials/breadcrumb.tpl'}
          {/block}

          {block name="left_column"}
            <div id="left-column" class="col-xs-12 col-sm-4 col-md-3">
              {if $page.page_name == 'product'}
                {hook h='displayLeftColumnProduct'}
              {else}
                {hook h="displayLeftColumn"}
              {/if}
            </div>
          {/block}

          {block name="content_wrapper"}
            <div id="content-wrapper" class="js-content-wrapper left-column right-column col-sm-4 col-md-6 nn">
              {hook h="displayContentWrapperTop"}
              {block name="content"}
                <p>Hello world! This is HTML5 Boilerplate.</p>
              {/block}
              {hook h="displayContentWrapperBottom"}
            </div>
          {/block}

          {block name="right_column"}
            <div id="right-column" class="col-xs-12 col-sm-4 col-md-3">
              {if $page.page_name == 'product'}
                {hook h='displayRightColumnProduct'}
              {else}
                {hook h="displayRightColumn"}
              {/if}
            </div>
          {/block}
        </div>
        {hook h="displayWrapperBottom"}
      </section>
      <footer id="footer" class="js-footer">
        {block name="footer"}
          {include file="_partials/footer.tpl"}
        {/block}
      </footer>

    </main>

    {block name='javascript_bottom'}
      {include file="_partials/javascript.tpl" javascript=$javascript.bottom}
    {/block}

    {block name='hook_before_body_closing_tag'}
      {hook h='displayBeforeBodyClosingTag'}
    {/block}
  </body>

</html>
