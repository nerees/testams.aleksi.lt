{*
* 2015-2021 Bonpresta
*
* Bonpresta Instagram Carousel Social Feed Photos
*
* NOTICE OF LICENSE
*
* This source file is subject to the General Public License (GPL 2.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/GPL-2.0
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade the module to newer
* versions in the future.
*
* @author Bonpresta
* @copyright 2015-2021 Bonpresta
* @license http://opensource.org/licenses/GPL-2.0 General Public License (GPL 2.0)
*}
<div class="boninsta module_confirmation conf confirm alert alert-success hidden">
    <button type="button" class="close" data-dismiss="alert">×</button>
    {l s='The information was updated successfully.' mod='boninstagramslick'}
</div>

<div class="boninsta module_confirmation conf confirm alert alert-warning">
    <button type="button" class="close" data-dismiss="alert">×</button>
    {l s='Information update did not occur.' mod='boninstagramslick'}
</div>

<div class="bootstrap panel container-fluid">
    <div class="panel-heading">
        <i class="icon icon-wrench"></i> {l s='Update & support' mod='boninstagramslick'}
    </div>
    <div id="bon-upload" class="list-group pull-left">
        <button class="btn btn-primary upload"><i class="process-icon-refresh"></i> {l s='Upload pictures' mod='boninstagramslick'}</button>
    </div>
    <img class="pull-left hidden" src="{$module_dir|escape:'htmlall':'UTF-8'}views/img/ajax-loader.gif">
</div>