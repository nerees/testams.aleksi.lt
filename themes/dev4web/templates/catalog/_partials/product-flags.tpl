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
{block name='product_flags'}
    {foreach from=$product.flags item=flag}
        {if $flag.type == "on-sale"}
        <span class="{$flag.type}">Akcija</span>
        {/if}
    {/foreach}
    <ul class="product-flags js-product-flags">
        {foreach from=$product.flags item=flag}
            {if $flag.type == "new"}

                {elseif $flag.type == "on-sale"}
                    {*<li class="{$flag.type}">Akcija</li>*}
                {else}
                    <li class="product-flag {$flag.type}">{$flag.label}</li>
            {/if}
            {*nauji flag*}
            {*if in_array(4,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}
            {if in_array(5,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}
            {if in_array(6,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}
            {if in_array(7,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}
            {if in_array(8,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}
            {if in_array(9,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}
            {if in_array(10,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}
            {if in_array(11,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}
            {if in_array(12,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}
            {if in_array(13,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}
            {if in_array(14,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}
            {if in_array(15,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}
            {if in_array(17,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}
            {if in_array(18,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}
            {if in_array(19,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}
            {if in_array(22,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}
            {if in_array(30,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink spalvą</li>
            {/if}


            {if in_array(20,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink tūrį ir spalvą</li>
            {/if}
            {if in_array(21,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink tūrį ir spalvą</li>
            {/if}

            {if in_array(16,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink temą</li>
            {/if}

            {if in_array(23,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink kvapą</li>
            {/if}
            {if in_array(24,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink kvapą</li>
            {/if}
            {if in_array(25,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink kvapą</li>
            {/if}
            {if in_array(26,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink kvapą</li>
            {/if}
            {if in_array(32,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink kvapą</li>
            {/if}

            {if in_array(33,Product::getProductCategories($product->id|intval))}
                <li class="product-flag custom-flag"> Pasirink tūrį</li>
            {/if*}

            {*end nauji flag*}
        {/foreach}

        {*{assign var=attids value=','|explode:'1,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,22,30'}
        {foreach from=$attids item=att}
            {if $product.id_product_attribute == $att}
                <li class="product-flag custom-flag"> {$product.id_product_attribute}Pasirink spalvą </li>
            {/if}
        {/foreach}

        {assign var=attids2 value=','|explode:'23,24,25,26,32'}
        {foreach from=$attids2 item=att2}
            {if $product.id_product_attribute == $att2}
                <li class="product-flag custom-flag"> {$product.id_product_attribute} Pasirink kvapą </li>
            {/if}
        {/foreach}

        {if $product.id_product_attribute == 33}
            <li class="product-flag custom-flag"> {$product.id_product_attribute} Pasirink tūrį </li>
        {/if}

        {if $product.id_product_attribute == 21}
            <li class="product-flag custom-flag">{$product.id_product_attribute} Pasirink tūrį </li>
        {/if}

        {if $product.id_product_attribute == 16}
            <li class="product-flag custom-flag"> Pasirink temą </li>
        {/if}
*}
        {*foreach from=$product.flags item=flag}
        {*if $flag.type == "on-sale"}
        <span class="{$flag.type}">Akcija</span>
        {/if*}
        {*/foreach*}

        {*$product.id_customization*}
        {if $product.mpn}
            <li class="product-flag custom-flag"> {$product.mpn} </li>
        {/if}

    </ul>
{/block}
