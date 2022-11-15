

<script type="text/javascript">
    var shopcomments_controller_url = '{$shopcomments_controller_url nofilter}';
    var secure_key = '{$secure_key}';
    var shopcomments_url_rewrite = '{$shopcomments_url_rewriting_activated}';
    var ShopComment_added = '{l s='Jūsų atsiliepimas sėkmingai pridėtas!' mod='shopcomments' js=1}';
    var ShopComment_added_moderation = '{l s='Dėkojame, Jūsų atsiliepimas sėkmingai pateiktas.' mod='shopcomments' js=1}';
    var ShopComment_title = '{l s='Atsiliepomas' mod='shopcomments' js=1}';
    var ShopComment_ok = '{l s='Gerai' mod='shopcomments' js=1}';
    var moderation_active = {$moderation_active};
</script>

<div id="shopcommentsBlock">
{*    {if isset($shopcomments_product) && $myprestacomments_product}*}
        <!-- Fancybox -->
        <div style="">
            <div id="new_comment_form">
                {if $reviewsForCustomers == 1 AND $reviewsForCustomersPurchased == 0}
                <form id="id_new_comment_form" action="" enctype="multipart/form-data">
                    <h2 class="title">{l s='Mums svarbi Jūsų nuomonė !' mod='shopcomments'}</h2>
                    <div class="new_comment_form_content">
                        <h2>{l s='Palikite atsiliepimą' mod='myprestacomments'}</h2>
                        <div id="new_comment_form_error" class="error" style="display:none;padding:15px 25px">
                            <ul></ul>
                        </div>
{*                        <label for="comment_title">{l s='Atsiliepimo antraštė' mod='shopcomments'}<sup class="required">*</sup></label>*}
{*                        <input id="comment_title" name="title" type="text" value=""/>*}

                        <div class="star_content clearfix">
                            <div class="star" id="st1" onclick="st1(1)" data-star="1"></div>
                            <div class="star" id="st2" onclick="st1(2)" data-star="2"></div>
                            <div class="star" id="st3" onclick="st1(3)" data-star="3"></div>
                            <div class="star" id="st4" onclick="st1(4)" data-star="4"></div>
                            <div class="star" id="st5" onclick="st1(5)" data-star="5"></div>
                        </div>

                            <input type="hidden" value="0" name="grade" id="grade">

                        {if $allow_guests == true && !$logged}
                            <label>{l s='Jūsų vardas' mod='shopcomments'}<sup class="required">*</sup></label>
                            <input id="commentCustomerName" name="customer_name" type="text" value=""/>
                            <label>{l s='Jūsų el. paštas' mod='shopcomments'}<sup class="required">*</sup></label>
                            <input id="commentCustomerEmail" name="customer_email" type="text" value=""/>
                        {/if}

                        <label for="content">{l s='Atsiliepimas' mod='shopcomments'}<sup class="required">*</sup></label>
                        <textarea id="content" name="content"></textarea>

                        {*hook h='displayShopCommentsFields'*}

                        <div id="new_comment_form_footer">
{*                            <p class="row required"><sup>*</sup> {l s='Required fields' mod='shopcomments'}</p>*}
                            <p class="fr">
                                {*if $SHOP_COMMENTS_GDPR == 1*}
                                {*literal}
                                    <input onchange="if($(this).is(':checked')){$('#submitNewMessage').removeClass('gdpr_disabled'); $('#submitNewMessage').removeAttr('disabled'); rebindClickButton();}else{$('#submitNewMessage').addClass('gdpr_disabled'); $('#submitNewMessage').off('click'); $('#submitNewMessage').attr('disabled', 1); }" id="gdpr_checkbox" type="checkbox">
                                {/literal*}
{*                                    {l s='I accept ' mod='shopcomments'}*}
{*                                    <a target="_blank" href="{$link->getCmsLink($PRODUCT_COMMENTS_GDPRCMS)}">{l s='privacy policy' mod='shopcomments'}</a>*}
{*                                    {l s='rules' mod='shopcomments'}*}
                                {*/if*}

                                <button {*if $PRODUCT_COMMENTS_GDPR == 1}disabled{/if*} class="btn btn-primary {*if $PRODUCT_COMMENTS_GDPR == 1*}{*gdpr_disabled*}{*/if*}" id="submitNewMessage" name="submitMessage" type="submit">{l s='Siųsti atsiliepimą' mod='shopcomments'}</button>&nbsp;
{*                                {l s='or' mod='shopcomments'}&nbsp;<a href="#" onclick="$.fancybox.close();">{l s='Cancel' mod='shopcomments'}</a>*}
                            </p>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </form><!-- /end new_comment_form_content -->
                {else}
                    <p class="alert alert-warning">{l s='Atsiliepimus gali rašyti tik prekes įsigiję klientai' mod='shopcomments'}</p>
                {/if}
            </div>
        </div>
        <!-- End comments form -->
    <h1 class="h1 products-section-title text-uppercase ">{l s='Atsiliepimai' mod='shopcomments'}</h1>
    <div class="tabs">
        {*        <div class="clearfix pull-right">*}
        {*            {if ($too_early == false AND ($logged OR $allow_guests))}*}
        {*                <a class="open-comment-form btn btn-primary" href="#new_comment_form">{l s='Parašykite savo atsiliepimą' mod='shopcomments'}</a>*}
        {*            {/if}*}
        {*        </div>*}
        <div id="new_comment_form_ok" class="alert alert-success" style="display:none;padding:15px 25px"></div>
        <div id="product_comments_block_tab">
            {if $comments}
                {foreach from=$comments item=comment}
                    {if $comment.content}
                        <div class="comment clearfix">
{*                            <div class="comment_author">*}
{*                                <span>{l s='Įvertinimas' mod='shopcomments'}&nbsp</span>*}
{*                                <span>{$comment.date_add|date_format:"%Y-%m-%d"}</span>*}
{*                                <div class="star_content clearfix">*}
{*                                    {section name="i" start=0 loop=5 step=1}*}
{*                                        {if $comment.grade le $smarty.section.i.index}*}
{*                                            <div class="star"></div>*}
{*                                        {else}*}
{*                                            <div class="star star_on"></div>*}
{*                                        {/if}*}
{*                                    {/section}*}
{*                                </div>*}
{*                                <div class="comment_author_infos">*}
{*                                    {if $SHOP_COMMENT_AUTHOR == 1}*}
{*                                        <span>*}
{*                                        <strong>{$comment.customer_name|escape:'html':'UTF-8'}</strong><br/>*}
{*                                        </span>*}
{*                                    {/if}*}
{*                                    {if $SHOP_COMMENT_DATE == 1}*}
{*                                        <em>{dateFormat date=$comment.date_add|escape:'html':'UTF-8' full=0}</em>*}
{*                                    {/if}*}
{*                                </div>*}
{*                            </div>*}
                            <div class="comment_details">
                                {if $SHOP_COMMENT_TITLE == 1}
{*                                    <h4 class="title_block">{$comment.title}</h4>*}
                                    <h4 class="title_block" style="margin-bottom: 0">{$comment.customer_name|escape:'html':'UTF-8'}</h4>
                                {/if}
                                <div class="star_content clearfix">
                                    {section name="i" start=0 loop=5 step=1}
                                        {if $comment.grade le $smarty.section.i.index}
                                            <div class="star"></div>
                                        {else}
                                            <div class="star star_on"></div>
                                        {/if}
                                    {/section}
                                </div>
                                <span>{$comment.date_add|date_format:"%Y-%m-%d"}</span>
                                {if $SHOP_COMMENT_BODY == 1}
                                    <p>{$comment.content|escape:'html':'UTF-8'|nl2br nofilter}</p>
                                {/if}
                                {hook::exec('displayShopComment', $comment) nofilter}
                            </div>
                        </div>
                    {/if}
                {/foreach}
                {*else}
                    {if (!$too_early AND ($logged OR $allow_guests))}
                        <p class="align_center alert alert-info">
                            <a id="new_comment_tab_btn" class="open-comment-form" href="#new_comment_form">{l s='Be the first to write your review' mod='shopcomments'} !</a>
                        </p>
                    {else}
                        <p class="align_center">{l s='No customer reviews for the moment.' mod='shopcomments'}</p>
                    {/if*}
            {/if}
        </div>
        <img src="{$urls.img_url}/cat_left_prev.png" alt="slysti kairiau" class="nav-w-prev">
        <img src="{$urls.img_url}/cat_right_next.png" alt="slysti dešiniau" class="nav-w-next">
    </div>

{*    {/if}*}
</div>
{literal}
    <script>
    function st1(stars) {

		$(".star").removeClass("star_on");
		$("#grade").attr('value', stars);

		switch(stars) {
			case 1:
				$("#st1").addClass("star_on");
				break;
			case 2:
				$("#st1, #st2").addClass("star_on");
				break;
			case 3:
				$("#st1, #st2, #st3").addClass("star_on");
				break;
			case 4:
				$("#st1, #st2, #st3, #st4").addClass("star_on");
				break;
			case 5:
				$("#st1, #st2, #st3, #st4, #st5").addClass("star_on");
				break;
		}
	}
    </script>
{/literal}