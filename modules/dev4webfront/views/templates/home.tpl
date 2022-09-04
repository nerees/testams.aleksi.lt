<div class="container home-categories-block">
    <div class="row row-row">
        <div class="col-md-3 col-sm-12">
            <a href="/3-vaikams"><img src="{$urls.img_url}category_vaikams.jpeg"></a>
            <p class="cat-name"><a href="/3-vaikams">Vaikams</a></p>
            <p class="product-count">{$count_kids} produktai</p>
        </div>
        <div class="col-md-3 col-sm-12">
            <a href="/4-moterims"><img src="{$urls.img_url}category_moterims.png"></a>
            <p class="cat-name"><a href="/4-moterims">Moterims</a></p>
            <p class="product-count">{$count_women} produktai</p>
        </div>
        <div class="col-md-3 col-sm-12">
            <a href="/5-vyrams"><img src="{$urls.img_url}category-vyrams.jpeg"></a>
            <p class="cat-name"><a href="/5-vyrams">Vyrams</a></p>
            <p class="product-count">{$count_men} produktai</p>
        </div>
        <div class="col-md-3 col-sm-12">
            <a href="/6-namams"><img src="{$urls.img_url}category_namams.jpeg"></a>
            <p class="cat-name"><a href="/6-namams">Namams</a></p>
            <p class="product-count">{$count_home} produktai</p>
        </div>
    </div>
</div>

<!--home.tpl dev4webfront -->
{*Homepe tabs categories*}
<div class="container home-categories-tabs hidden-sm-down">
    <div class="categories-nav" id="categories-nav">
        <div class="nav-left">
            <span class="cat-nav-item active" id="akcijos">AKCIJOS</span>
            <span class="cat-nav-item" id="vaikams">VAIKAMS</span>
            <span class="cat-nav-item" id="moterims">MOTERIMS</span>
            <span class="cat-nav-item" id="vyrams">VYRAMS</span>
            <span class="cat-nav-item" id="namams">NAMAMS</span>
        </div>
        <div class="nav-right">
            <span class="cat-nav-item-r mr-1 nn-prev" id="prev">ATGAL</span>
            <span class="cat-nav-item-r nn-next" id="next">PIRMYN</span>
        </div>
    </div>
    <div class="cat-slick-akcijos" id="cat-akcijos">
        {foreach from=$products_akcija item="product"}
            {include file="catalog/_partials/miniatures/product.tpl" product=$product}
        {/foreach}
    </div>
    <div class="cat-slick-vaikams" id="cat-vaikams">
        {foreach from=$products_kids_akcija item="product"}
            {include file="catalog/_partials/miniatures/product.tpl" product=$product}
        {/foreach}
    </div>
    <div class="cat-slick-moterims" id="cat-moterims">
        {foreach from=$products_women_akcija item="product"}
            {include file="catalog/_partials/miniatures/product.tpl" product=$product}
        {/foreach}
    </div>
    <div class="cat-slick-vyrams" id="cat-vyrams">
        {foreach from=$products_men_akcija item="product"}
            {include file="catalog/_partials/miniatures/product.tpl" product=$product}
        {/foreach}
    </div>
    <div class="cat-slick-namams" id="cat-namams">
        {foreach from=$products_home_akcija item="product"}
            {include file="catalog/_partials/miniatures/product.tpl" product=$product}
        {/foreach}
    </div>
</div>

<div class="container go-to-shop-button">
    <div class="separator">
        <div class="line"></div>
        <h2><a href="/sumazinta-kaina"><span class="vbtn">EITI Į PARDUOTUVĘ</span></a></h2>
        <div class="line"></div>
    </div>
</div>

{*<div class="container little-banner">
    <div class="little-banner-inner">
        <p>Pasiruoškite Kalėdoms ramiai <br> su Aleksi!</p>
        <a href="/86-dovanoms">EITI Į PARDUOTUVĘ</a>
        <img src="{$urls.img_url}/baneris_bendras.webp" alt="reklaminis baneris">
    </div>
</div>*}
{*<div class="container little-banner-mobile">
   {* <div class="row text-center">
        <div class="col-sm-12">
            <p>Pasiruoškite <strong>Kalėdoms </strong> ramiai!<br>  Su <strong> Aleksi!</strong></p>
        </div>
    </div>*}
    {*<div class="row">
        <div class="col-sm-12">
            <a href="/86-dovanoms">
            <img src="{$urls.img_url}/baneris_bendras_mobile.webp" alt="reklaminis baneris" style="max-width: 100%; height:auto;">
            </a>
        </div>
    </div>*}
    {*<div class="row">
        <div class="col-sm-12">
            <br>
            <a href="/86-dovanoms">EITI Į PARDUOTUVĘ</a>
        </div>
    </div>*}
{*</div>*}

<div class="container cat3">
    <div class="row">
        <div class="col-md-3 col-sm-12 nn-cat-head">

                <h2>Moterims</h2>
                <p>Puoselėk savo grožį <br> su kruopščiai atrinktais <br>aukščiausios kokybės produktais</p>
                <h4><a href="/4-moterims">EITI Į PARDUOTUVĘ</a></h4>

        </div>
        <div class="col-md-9 col-sm-12 nn-cat-items">
            <div class="cat-slick-moterims3" id="cat-moterims3">
                {foreach from=$products_women item="product"}
                    {include file="catalog/_partials/miniatures/product.tpl" product=$product}
                {/foreach}
            </div>
            <img src="{$urls.img_url}/cat_left_prev.png" alt="slysti kairiau" class="nav-w-prev">
            <img src="{$urls.img_url}/cat_right_next.png" alt="slysti dešiniau" class="nav-w-next">
        </div>
    </div>
</div>
<div class="container cat3">
    <div class="row">
        <div class="col-md-3 col-sm-12 nn-cat-head">

            <h2>Vyrams</h2>
            <p>Platus aukščiausios kokybės <br> kosmetikos pasirinkimas <br>tikriems džentelmenams</p>
            <h4><a href="/5-vyrams">EITI Į PARDUOTUVĘ</a></h4>

        </div>
        <div class="col-md-9 col-sm-12 nn-cat-items">
            <div class="cat-slick-vyrams3" id="cat-vyrams3">
                {foreach from=$products_men item="product"}
                    {include file="catalog/_partials/miniatures/product.tpl" product=$product}
                {/foreach}
            </div>
            <img src="{$urls.img_url}/cat_left_prev.png" alt="slysti kairiau" class="nav-m-prev">
            <img src="{$urls.img_url}/cat_right_next.png" alt="slysti dešiniau" class="nav-m-next">
        </div>
    </div>
</div>
<div class="container cat3">
    <div class="row">
        <div class="col-md-3 col-sm-12 nn-cat-head">

            <h2>Vaikams</h2>
            <p>Viskas ko reikia mūsų mažiesiems.<br> Atrinkta atsakingai ir su meile</p>
            <h4><a href="/6-vaikams">EITI Į PARDUOTUVĘ</a></h4>

        </div>
        <div class="col-md-9 col-sm-12 nn-cat-items">
            <div class="cat-slick-vaikams3" id="cat-vaikams3">
                {foreach from=$products_kids item="product"}
                    {include file="catalog/_partials/miniatures/product.tpl" product=$product}
                {/foreach}
            </div>
            <img src="{$urls.img_url}/cat_left_prev.png" alt="slysti kairiau" class="nav-k-prev">
            <img src="{$urls.img_url}/cat_right_next.png" alt="slysti dešiniau" class="nav-k-next">
        </div>
    </div>
</div>
<div class="container cat3">
    <div class="row">
        <div class="col-md-3 col-sm-12 nn-cat-head">

            <h2>Namams</h2>
            <p>Tavo namų jaukumui.<br>Viskas skirta ypatingai kasdienybei</p>
            <h4><a href="/6-namams">EITI Į PARDUOTUVĘ</a></h4>

        </div>
        <div class="col-md-9 col-sm-12 nn-cat-items">
            <div class="cat-slick-namams3" id="cat-namams3">
                {foreach from=$products_home item="product"}
                    {include file="catalog/_partials/miniatures/product.tpl" product=$product}
                {/foreach}
            </div>
            <img src="{$urls.img_url}/cat_left_prev.png" alt="slysti kairiau" class="nav-h-prev">
            <img src="{$urls.img_url}/cat_right_next.png" alt="slysti dešiniau" class="nav-h-next">
        </div>
    </div>
</div>

{*<div class="container instagram">
    <h2>Instagram</h2>
    <div class="row instagram-inner">
        <div class="col-md-3 col-sm-6">
            <img src="https://dummyimage.com/280x280/cccccc/000000" alt="fff" class="instagram-img">
        </div>
        <div class="col-md-3 col-sm-6">
            <img src="https://dummyimage.com/280x280/cccccc/000000" alt="fff" class="instagram-img">
        </div>
        <div class="col-md-3 col-sm-6">
            <img src="https://dummyimage.com/280x280/cccccc/000000" alt="fff" class="instagram-img">
        </div>
        <div class="col-md-3 col-sm-6">
            <img src="https://dummyimage.com/280x280/cccccc/000000" alt="fff" class="instagram-img">
        </div>
        <div class="col-md-3 col-sm-6">
            <img src="https://dummyimage.com/280x280/cccccc/000000" alt="fff" class="instagram-img">
        </div>
        <div class="col-md-3 col-sm-6">
            <img src="https://dummyimage.com/280x280/cccccc/000000" alt="fff" class="instagram-img">
        </div>
        <div class="col-md-3 col-sm-6">
            <img src="https://dummyimage.com/280x280/cccccc/000000" alt="fff" class="instagram-img">
        </div>
        <div class="col-md-3 col-sm-6">
            <img src="https://dummyimage.com/280x280/cccccc/000000" alt="fff" class="instagram-img">
        </div>
    </div>
</div>

<div class="container instagram">
    <h2>Partneriai</h2>
    <div class="row instagram-inner">
        <div class="col-md-3 col-sm-6">
            <img src="https://dummyimage.com/280x280/f7f7f7/000000" alt="fff" class="instagram-img">
        </div>
        <div class="col-md-3 col-sm-6">
            <img src="https://dummyimage.com/280x280/f7f7f7/000000" alt="fff" class="instagram-img">
        </div>
        <div class="col-md-3 col-sm-6">
            <img src="https://dummyimage.com/280x280/f7f7f7/000000" alt="fff" class="instagram-img">
        </div>
        <div class="col-md-3 col-sm-6">
            <img src="https://dummyimage.com/280x280/f7f7f7/000000" alt="fff" class="instagram-img">
        </div>
        <div class="col-md-3 col-sm-6">
            <img src="https://dummyimage.com/280x280/f7f7f7/000000" alt="fff" class="instagram-img">
        </div>
        <div class="col-md-3 col-sm-6">
            <img src="https://dummyimage.com/280x280/f7f7f7/000000" alt="fff" class="instagram-img">
        </div>
        <div class="col-md-3 col-sm-6">
            <img src="https://dummyimage.com/280x280/f7f7f7/000000" alt="fff" class="instagram-img">
        </div>
        <div class="col-md-3 col-sm-6">
            <img src="https://dummyimage.com/280x280/f7f7f7/000000" alt="fff" class="instagram-img">
        </div>
    </div>
</div>*}

{*<div class="cat-slick">
    {foreach from=$products_kids item="product"}
        {include file="catalog/_partials/miniatures/product.tpl" product=$product}
    {/foreach}
</div>*}


{*include file="catalog/_partials/productlist.tpl" products=$products_kids cssClass="row"*}
{*$products_kids|var_dump*}