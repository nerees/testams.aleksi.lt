{*
* 2020 kevin.
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
*  @author 2020 kevin. <info@getkevin.eu>
*  @copyright kevin.
*  @license http://opensource.org/licenses/afl-3.0.php Academic Free License (AFL 3.0)
*}
{if $group == 'failed'}
    <p class="alert alert-danger">
        {l s='Užsakymo apmokėjimas nutraukas' mod='kevin'}
    </p>
{else}
    <p class="alert alert-warning">
        {l s='Užsakymą pradėsime vykdyti tik gavus apmokėjimą' mod='kevin'}
    </p>
{/if}