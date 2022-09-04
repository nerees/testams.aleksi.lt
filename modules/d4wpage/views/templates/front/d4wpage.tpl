
{*  {extends file='page.tpl'}*}
{*  *}
{*  {block name='page_title'}*}
{*    <span class="sitemap-title">{l s='d4w page' d='Shop.Theme'}</span>*}
{*  {/block}*}
{*  *}
{*  {block name='page_content'}*}
{*      <h2>{$h2name}</h2>*}
{*      <span>{$variable1}</span><br />*}
{*      *}{*      <span>{$variable2|var_dump}</span><br />*}
{*      <div class="cat-slick-vyrams" id="cat-vyrams">*}
{*          {foreach from=$variable2 item="product"}*}
{*              {include file="catalog/_partials/miniatures/product.tpl" product=$product}*}
{*          {/foreach}*}
{*      </div>*}
{*  {/block}*}

{extends file=$layout}

{block name='content'}
{literal}
    <style>
        #d4wpage #products #js-product-list .products {
            display: flex;
            justify-content: space-between;
        }
        #d4wpage #products #js-product-list .products .product{
            max-width: 300px;
        }
        .aleksi-akcijos {
            margin: 30px 0;
        }
        @media only screen and (max-width: 480px) {
            #d4wpage #products #js-product-list .products {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            #d4wpage #products #js-product-list .products .product{
                max-width: unset;
                margin-left: auto;
                margin-right: auto;
            }
        }
    </style>
{/literal}

    <section id="main">
        <div class="aleksi-akcijos">
            <h2>{l s='Aleksi akcijos' d='Shop.Theme'}</h2>
        </div>

        <section id="products">
            {if $products|count}

                <div id="js-product-list">
                    {*block name='pagination'}
                        {include file='_partials/pagination.tpl' pagination=$listing.pagination}
                    {/block*}

                    <div class="products row">
                        {foreach from=$products item="product" key="position"}
                            {include file="catalog/_partials/miniatures/product.tpl" product=$product position=$position}
                        {/foreach}
                    </div>

                    {*block name='pagination'}
                        {include file='_partials/pagination.tpl' pagination=$listing.pagination}
                    {/block*}

                    <div class="hidden-md-up text-xs-right up">
                        <a href="#header" class="btn btn-secondary">
                            {l s='Back to top' d='Shop.Theme.Actions'}
                            <i class="material-icons">&#xE316;</i>
                        </a>
                    </div>
                </div>

            {else}
                <div id="js-product-list-top"></div>

                <div id="js-product-list">
                    {capture assign="errorContent"}
                        <h4>{l s='No products available yet' d='Shop.Theme.Catalog'}</h4>
                        <p>{l s='Stay tuned! More products will be shown here as they are added.' d='Shop.Theme.Catalog'}</p>
                    {/capture}

                    {include file='errors/not-found.tpl' errorContent=$errorContent}
                </div>

                <div id="js-product-list-bottom"></div>
            {/if}
        </section>

        {hook h="displayFooterCategory"}

    </section>

{/block}