{*
* 2007-2022 ETS-Soft
*
* NOTICE OF LICENSE
*
* This file is not open source! Each license that you purchased is only available for 1 wesite only.
* If you want to use this file on more websites (or projects), you need to purchase additional licenses. 
* You are not allowed to redistribute, resell, lease, license, sub-license or offer our resources to any third party.
* 
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs, please contact us for extra customization service at an affordable price
*
*  @author ETS-Soft <etssoft.jsc@gmail.com>
*  @copyright  2007-2022 ETS-Soft
*  @license    Valid for 1 website (or project) for each purchase of license
*  International Registered Trademark & Property of ETS-Soft
*}
{if $years}
    <div class="block ets_block_archive {$ETS_BLOG_RTL_CLASS|escape:'html':'UTF-8'}">
        <h4 class="title_blog title_block">
            {l s='Įrašų archyvas' mod='ets_blog'}
        </h4>
        <div class="content_block block_content">
            <ul class="list-year row">
                {foreach from=$years item='year'}
                    <li class="year-item">
                        <a href="{$year.link|escape:'html':'UTF-8'}">{l s='Paskelbta' mod='ets_blog'}&nbsp;{$year.year_add|escape:'html':'UTF-8'} ({$year.total_post|intval})</a>
                        {*<span class="ets_axpand_button close closed"></span>*}
                        {if $year.months}
                            <ul class="list-months">{*hidden*}
                                {foreach from=$year.months item='month'}
                                    <li class="month-item"><a href="{$month.link|escape:'html':'UTF-8'}">{$month.month_add|escape:'html':'UTF-8'} ({$month.total_post|intval})</a></li>
                                {/foreach}
                            </ul>
                        {/if}
                    </li>
                {/foreach}
            </ul>
        </div>
    </div> 
{/if}