{extends file='page.tpl'}
{block name="page_content"}
    <script type="text/javascript">
        var shopcomments_controller_url = '{$shopcomments_controller_url nofilter}';
        var secure_key = '{$secure_key}';
        var shopcomments_url_rewrite = '{$shopcomments_url_rewriting_activated}';
        var ShopComment_added = '{l s='Your comment has been added!' mod='shopcomments' js=1}';
        var ShopComment_added_moderation = '{l s='Your comment has been submitted and will be available once approved by a moderator.' mod='shopcomments' js=1}';
        var ShopComment_title = '{l s='New comment' mod='shopcomments' js=1}';
        var ShopComment_ok = '{l s='OK' mod='shopcomments' js=1}';
        var moderation_active = {$moderation_active|intval};
    </script>
    <div id="shopcommentsBlock">
        <div id="product_comments_block_tab" class="product_comment_feedback">
            {if $comments}
                {foreach from=$comments item=comment}
                    {if $comment.content}
                        <div class="comment clearfix">
                            <div class="comment_author">
                                <div class="comment_product">
                                    <div class="star_content clearfix">
                                        {section name="i" start=0 loop=5 step=1}
                                            {if $comment.grade le $smarty.section.i.index}
                                                <div class="star"></div>
                                            {else}
                                                <div class="star star_on"></div>
                                            {/if}
                                        {/section}
                                    </div>
                                </div>
                                <div class="comment_author_infos">
                                    <strong>{$comment.customer_name|escape:'html':'UTF-8'}</strong><br/>
                                    <em>{dateFormat date=$comment.date_add|escape:'html':'UTF-8' full=0}</em>
                                </div>
                            </div>
                            <div class="comment_details">
                                <h4 class="title_block">{$comment.title}</h4>
                                <p>{$comment.content|escape:'html':'UTF-8'|nl2br nofilter}</p>
                                {hook::exec('displayShopComment', $comment) nofilter}
                            </div>
                        </div>
                    {/if}
                {/foreach}
            {else}
                <div class="alert alert-info">
                    {l s='No comments currently available' mod='shopcomments'}
                </div>
            {/if}
        </div>
    </div>
    <div class="shopcomments_pagination">
    {block name='pagination'}
        {include file='_partials/pagination.tpl' pagination=$pagination}
    {/block}
    </div>
{/block}
