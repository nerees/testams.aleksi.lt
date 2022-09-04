{*
 * 2007-2020 PrestaShop.
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
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
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}

{if $homeslider.slides}
  <div class="homeslider-container" data-interval="{$homeslider.speed}" data-wrap="{$homeslider.wrap}" data-pause="{$homeslider.pause}">
    <ul class="rslides">
      {foreach from=$homeslider.slides item=slide}
        <li class="slide">
          <a href="{$slide.url}">
            <img src="{$slide.image_url}" alt="{$slide.legend|escape}" />
            {if $slide.title || $slide.description }
              <span class="caption">
                <h2>{$slide.title}</h2>
                <div>{$slide.description nofilter}</div>
              </span>
            {/if}
          </a>
        </li>
      {/foreach}
    </ul>
  </div>
{/if}
{*
<div class="container top-block">
  <div class="row">
    <div class="col-md-6 col-sm-12 top-block-left">
      <h1>Kuopščiai atrinkti aukščiausios kokybės<br>produktai Jūsų šeimai ir namams.</h1>
      <p>Produktai skirti vaikams, kosmetika vyrams bei moterims, bei viskas ko reikia Jūsų jaukiems namams.</p>
      <a class="top-block-button" href="/sumazinta-kaina">
        Užsisakyti
      </a>
    </div>
    <div class="col-md-6 col-sm-12 top-block-right">
      <img src="{$urls.img_url}top_block_right.png">
    </div>
  </div>
</div>*}

