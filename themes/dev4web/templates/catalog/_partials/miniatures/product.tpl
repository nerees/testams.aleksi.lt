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
{block name='product_miniature_item'}

<div class="product">
  <article class="product-miniature js-product-miniature" data-id-product="{$product.id_product}" data-id-product-attribute="{$product.id_product_attribute}">
    <div class="thumbnail-container">
      {block name='product_thumbnail'}
        {if $product.cover}
          <a href="{$product.url}" class="thumbnail product-thumbnail">
            <img
              src="{$product.cover.bySize.alexi_pidea.url}"
              alt="{if !empty($product.cover.legend)}{$product.cover.legend}{else}{$product.name|truncate:30:'...'}{/if}"
              loading="lazy"
              data-full-size-image-url="{$product.cover.large.url}"
              width="auto"
              height="100%"
            />
          </a>
        {else}
          <a href="{$product.url}" class="thumbnail product-thumbnail">
            <img
              src="{$urls.no_picture_image.bySize.alexi_pidea.url}"
              loading="lazy"
              width="auto"
              height="100%"
            />
          </a>
        {/if}
      {/block}

      <div class="product-description">
        {block name='product_name'}
          {if $page.page_name == 'index'}
            <h3 class="h3 product-title"><a href="{$product.url}" content="{$product.url}">{$product.name|truncate:50:'...'}</a></h3>
          {else}
            <h2 class="h3 product-title"><a href="{$product.url}" content="{$product.url}">{$product.name|truncate:50:'...'}</a></h2>
          {/if}
        {/block}

        {block name='product_price_and_shipping'}
          {if $product.show_price}
            <div class="product-price-and-shipping">
              {if $product.has_discount}
                {hook h='displayProductPriceBlock' product=$product type="old_price"}

                <span class="regular-price" aria-label="{l s='Regular price' d='Shop.Theme.Catalog'}">{$product.regular_price}</span>
                {if $product.discount_type === 'percentage'}
                  <span class="discount-percentage discount-product">{$product.discount_percentage}</span>
                {elseif $product.discount_type === 'amount'}
                  <span class="discount-amount discount-product">{$product.discount_amount_to_display}</span>
                {/if}
              {/if}

              {hook h='displayProductPriceBlock' product=$product type="before_price"}

            {if $product.has_discount}
              <span class="price" aria-label="{l s='Price' d='Shop.Theme.Catalog'}" style="color:#E27470;">
                {capture name='custom_price'}{hook h='displayProductPriceBlock' product=$product type='custom_price' hook_origin='products_list'}{/capture}
                {if '' !== $smarty.capture.custom_price}
                  {$smarty.capture.custom_price nofilter}
                {else}
                  {$product.price}
                {/if}
              </span>
            {else}
                <span class="price" aria-label="{l s='Price' d='Shop.Theme.Catalog'}">
                {capture name='custom_price'}{hook h='displayProductPriceBlock' product=$product type='custom_price' hook_origin='products_list'}{/capture}
                    {if '' !== $smarty.capture.custom_price}
                        {$smarty.capture.custom_price nofilter}
                    {else}
                        {$product.price}
                    {/if}
              </span>
            {/if}

              {hook h='displayProductPriceBlock' product=$product type='unit_price'}

              {hook h='displayProductPriceBlock' product=$product type='weight'}
            </div>
          {/if}
        {/block}

        {*block name='product_reviews'}
          {hook h='displayProductListReviews' product=$product}
        {/block*}
      </div>

      {include file='catalog/_partials/product-flags.tpl'}

{*      <div class="highlighted-informations{if !$product.main_variants} no-variants{/if} hidden-sm-down">
        {block name='quick_view'}
          <a class="quick-view js-quick-view" href="#" data-link-action="quickview">
            <i class="material-icons search">&#xE8B6;</i> {l s='Quick view' d='Shop.Theme.Actions'}
          </a>
        {/block}

        {block name='product_variants'}
          {if $product.main_variants}
            {include file='catalog/_partials/variant-links.tpl' variants=$product.main_variants}
          {/if}
        {/block}
      </div>*}
{*new version oh quick view :) *}
        <div class="highlighted-informations no-variants hidden-sm-down">
            {block name='quick_view'}
            <span style="line-height: 44px;">
                <div style="width:47px; min-width: 47px; height:auto; text-align: center; display: inline-block;">
                    <a class="quick-view js-quick-view" href="#" data-link-action="quickview">
                        <img src="{$urls.img_url}eye.svg">
                    </a>
                </div>
                <div style="height: auto; width:147px; display: inline-block;" class="vertical-separator">
                    <form action="{$urls.pages.cart}" method="post" class="add-to-cart-or-refresh">
                        <input type="hidden" name="token" value="{$static_token}">
                        <input type="hidden" name="id_product" value="{$product.id}" class="product_page_product_id">
                        <input type="hidden" name="qty" value="1">
                        <button class="add-to-cart nn-add-to-cart" data-button-action="add-to-cart" type="submit" {if $product.quantity < 1 }disabled{/if} style="background: transparent; border-radius: 0; border-left:0; border-bottom: 0; border-top: 0; border-right: 0; color:#999999; cursor: pointer;">
                        <img src="{$urls.img_url}cart.svg" style="margin-right: 10px;">
                        {l s='Į KREPŠELĮ' d='Shop.Theme.Actions'}
                        </button>
                    </form>
                    {*<form action="{$urls.pages.cart}" method="post" id="add-to-cart-or-refresh">
                        <input type="hidden" name="token" value="{$static_token}">
                        <input type="hidden" name="id_product" value="{$product.id}" id="product_page_product_id">*}
                        {*<a href="{$urls.pages.cart}?token={$static_token}&id_product={$product.id}&id_customization=0&qty=1&add=1&action=update" type="submit" class="product-add-to-cart" style="color:#999999; background: transparent;" data-button-action="add-to-cart">
                            <span style="font-size: 18px; font-weight:400;"><img src="{$urls.img_url}cart.svg" style="margin-right: 10px;">Į KREPŠELĮ</span>
                        </a>*}
                        {*<button class="add-to-cart" data-button-action="add-to-cart" type="submit" style="background: transparent; border-radius: 0; border-left:0; border-bottom: 0; border-top: 0; border-right: 0; color:#999999; cursor: pointer;"><span style="font-size: 18px; font-weight:400;"><img src="{$urls.img_url}cart.svg" style="margin-right: 10px;">Į KREPŠELĮ</button>*}
                   {* </form>*}
                </div>

                {*hidden product forma for post*}
                {*<form action="{$urls.pages.cart}" method="post" id="add-to-cart-or-refresh">
                    <input type="hidden" name="token" value="{$static_token}">
                    <input type="hidden" name="id_product" value="{$product.id}" id="product_page_product_id">*}{*
                    <button class="add-to-cart" data-button-action="add-to-cart" type="submit" style="background: transparent; border-radius: 0; border-left:0; border-bottom: 0; border-top: 0; border-right: 0; color:#999999; cursor: pointer;"><span style="font-size: 18px; font-weight:400;"><img src="{$urls.img_url}cart.svg" style="margin-right: 10px;">Į KREPŠELĮ</button>
                </form>*}
                {**}
                <div style="height: auto; width:47px; display: inline-block;" class="vertical-separator">
                <div
                            class="wishlist-button"
                            data-url="{*$url*}"
                            data-product-id="{$product.id}"
                            data-product-attribute-id="{$product.id_product_attribute}"
                            data-is-logged="{if isset($customer) && $customer}{$customer.is_logged}{/if}"
                            data-list-id="1"
                            data-checked="true"
                            data-is-product="true"
                >
                </div>
                </div>

            </span>
            {/block}
        </div>
        <!-- kur wishlists? -->
    </div>
  </article>
</div>
{/block}
