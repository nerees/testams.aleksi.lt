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
<div class="bootstrap">
    <div class="module_confirmation conf confirm alert alert-success">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {$ets_blog_string|escape:'html':'UTF-8'}
        {if isset($link_view) && $link_view}
            <a href="{$link_view|escape:'html':'UTF-8'}" target="_blank">{$view_text|escape:'html':'UTF-8'}</a>
        {/if}
    </div>
</div>