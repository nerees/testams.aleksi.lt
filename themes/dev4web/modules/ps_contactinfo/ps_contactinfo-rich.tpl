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

{*<div class="contact-rich">
*}{*  <h4>{l s='Store information' d='Shop.Theme.Global'}</h4>*}{*
  <div class="block">
    <div class="icon"><i class="material-icons">&#xE55F;</i></div>
    <div class="data">{$contact_infos.address.formatted nofilter}</div>
  </div>
  {if $contact_infos.phone}
    <hr/>
    <div class="block">
      <div class="icon"><i class="material-icons">&#xE0CD;</i></div>
      <div class="data">
        {l s='Call us:' d='Shop.Theme.Global'}<br/>
        <a href="tel:{$contact_infos.phone}">{$contact_infos.phone}</a>
       </div>
    </div>
  {/if}
  {if $contact_infos.fax}
    <hr/>
    <div class="block">
      <div class="icon"><i class="material-icons">&#xE0DF;</i></div>
      <div class="data">
        {l s='Fax:' d='Shop.Theme.Global'}<br/>
        {$contact_infos.fax}
      </div>
    </div>
  {/if}
  {if $contact_infos.email && $display_email}
    <hr/>
    <div class="block">
      <div class="icon"><i class="material-icons">&#xE158;</i></div>
      <div class="data email">
        {l s='Email us:' d='Shop.Theme.Global'}<br/>
      </div>
      {mailto address=$contact_infos.email encode="javascript"}
    </div>
  {/if}
</div>*}
<div class="contact-rich" style="margin-top: 33px; min-width: 320px;">
  <div class="block">
    <h1 style="font-size: 18px; color: #262020;">KONTAKTAI</h1>
    <p style="color: #262020;">
      Aleksi Family Store<br>

      info@aleksi.lt<br>

      +370 624 90225<br>

      Facebook: <a href="https://www.facebook.com/aleksifamilystore" target="_blank">Aleksifamilystore</a></br>

      Instagram: <a href="https://www.instagram.com/aleksistore/" target="_blank">Aleksistore</a>
    </p>
  </div>
  <div class="block">
    <h1 style="font-size: 18px; color: #262020;">REKVIZITAI</h1>
    <p style="color: #262020;">
      ??mon??s kodas: 305914134<br>

      PVM mok??tojo kodas: LT100014426715<br>

      Adresas: Kalno g. 12, Luok??, LT-88236 Tel??i?? r.<br>

      A/S Nr.: LT107300010169615919<br>
      AB ???Swedbank???<br>
      Banko kodas: 73000, SWIFT kodas: HABALT22
    </p>
  </div>
</div>