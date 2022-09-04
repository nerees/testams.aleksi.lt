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
{*<div class="modal fade js-checkout-modal" id="modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <button type="button" class="close" data-dismiss="modal" aria-label="{l s='Close' d='Shop.Theme.Global'}">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="js-modal-content"></div>
    </div>
  </div>
</div>

<div class="text-sm-center">
  {if $tos_cms != false}
    <span class="d-block js-terms">{$tos_cms nofilter}</span>
  {/if}
  {l s='%copyright% %year% - Ecommerce software by %prestashop%' sprintf=['%prestashop%' => 'PrestaShop™', '%year%' => 'Y'|date, '%copyright%' => '©'] d='Shop.Theme.Global'}
</div>*}
<div class="container">
  <div class="row">
    {block name='hook_footer_before'}
      {hook h='displayFooterBefore'}
    {/block}
  </div>
</div>
<div class="footer-container">
  <div class="container">
    <div class="row nn-hr">
      {*block name='hook_footer'}
        {hook h='displayFooter'}
      {/block*}
      <div class="col-md-3 col-sm-12">
        <img src="{$urls.img_url}Logotipas_balas.png" alt="aleksi logotipas" style="max-width: 175px;">
      </div>
      <div class="col-md-2 col-sm-12 nn-mt-1">
        <p class="hidden-sm-down">Aleksi</p>
        <ul>
          <li><a href="/">Pradžia</a></li>
          <li><a href="/content/4-apie-mus">Apie mus</a></li>
          <li><a href="/susisiekite-su-mumis">Kontaktai</a></li>
        </ul>
      </div>
      <div class="col-md-2 col-sm-12 nn-mt-1">
        <p>Informacija</p>
        <ul>
          <li><a href="/content/2-prekiu-pirkimo-taisykles">Prekių pirkimo taisyklės</a></li>
          <li><a href="/content/1-prekiu-grazinimo-taisykles">Prekių grąžinimo taisyklės</a></li>
          {*          <li><a href="/content/3-privatumo-politika">Privatumo politika</a></li>*}
        </ul>
      </div>
      <div class="col-md-2 col-sm-12 nn-mt-1">
        <p>Sekite mus</p>
        <ul>
          <li><a href="https://www.facebook.com/aleksistore" target="_blank">Facebook</a></li>
          <li><a href="https://www.instagram.com/aleksistore/" target="_blank">Instagram</a></li>
        </ul>
      </div>
      <div class="col-md-3 col-sm-12 nn-mt-1">
        <p>Kontaktai</p>
        <ul>
          <li><a href="tel:+37062490225">Tel: +370 624 90225</a></li>
          <li><a href="mailto:info@aleksi.lt">El. paštas: info@aleksi.lt</a></li>
        </ul>
      </div>
      <div class="col-sm-12 text-center">
        <span class="hidden-md-up"><a href="/content/3-privatumo-politika" style="font-size:12px; color:#fff; margin-left: auto;">Privatumo politika</a></span>
        <span class="hidden-md-up"><a href="/content/6-slapuku-valdymas" style="font-size:12px; color:#fff; margin-left:15px;">Slapukų nustatymai</a></span>
      </div>

{*      <a href="/content/3-privatumo-politika">Privatumo politika</a>*}
{*      <a href="/content/6-slapuku-valdymas">Slapukų nustatymai</a>*}

    </div>
    <div class="row">
      {block name='hook_footer_after'}
        {hook h='displayFooterAfter'}
      {/block}
    </div>
    {*    <div class="row">
          <div class="col-md-12">
            <p class="text-sm-center">
              {block name='copyright_link'}
                <a href="https://www.prestashop.com" target="_blank" rel="noopener noreferrer nofollow">
                  {l s='%copyright% %year% - Ecommerce software by %prestashop%' sprintf=['%prestashop%' => 'PrestaShop™', '%year%' => 'Y'|date, '%copyright%' => '©'] d='Shop.Theme.Global'}
                </a>
              {/block}
            </p>
          </div>
        </div>*}
    <div class="row nn-footer-bottom">
      <div class="col-md-8 col-sm-12">
        {l s='Autorinės teisės %copyright% %year% %prestashop%' sprintf=['%prestashop%' => 'Aleksi', '%year%' => 'Y'|date, '%copyright%' => '©'] d='Shop.Theme.Global'}
      </div>
      {*      <div class="col-md-2 col-sm-12 hidden-sm-down">*}
      {*        <a href="/taisykles">Taisyklės ir salygos</a>*}
      {*      </div>*}
      <div class="col-md-2 col-sm-12 hidden-sm-down">
        <a href="/content/3-privatumo-politika">Privatumo politika</a>
      </div>
      <div class="col-md-2 col-sm-12 hidden-sm-down">
        <a href="/content/6-slapuku-valdymas">Slapukų nustatymai</a>
      </div>
    </div>
  </div>
</div>
