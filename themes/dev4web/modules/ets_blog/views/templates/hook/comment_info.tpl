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
{l s='This comment was posted by' mod='ets_blog'} <a href="{$customerLink|escape:'html':'UTF-8'}">{$comment->name|escape:'html':'UTF-8'}</a> {l s='on' mod='ets_blog'} <a href="{$postLink|escape:'html':'UTF-8'}" target="_blank">{$post_title|escape:'html':'UTF-8'}</a> {l s='on' mod='ets_blog'} {dateFormat date=$comment->date_add|escape:'html':'UTF-8'}