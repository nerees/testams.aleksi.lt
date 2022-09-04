{*
<div class="products{if !empty($cssClass)} {$cssClass}{/if}">
    {foreach from=$products item="product" key="position"}
        {include file="catalog/_partials/miniatures/product.tpl" product=$product position=$position}
    {/foreach}
</div>*}
<div class="products row">
    <div id="owl-nn" class="owl-carousel owl-theme">
        {foreach from=$products item="product"}
            {include file="catalog/_partials/miniatures/product.tpl" product=$product}
        {/foreach}
    </div>
</div>
{* https://kenwheeler.github.io/slick/ *}