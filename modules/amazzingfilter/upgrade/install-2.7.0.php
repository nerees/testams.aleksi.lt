<?php
/**
*  @author    Amazzing <mail@amazzing.ru>
*  @copyright Amazzing
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/

function upgrade_module_2_7_0($module_obj)
{
    if (!defined('_PS_VERSION_')) {
        exit;
    }
    $module_obj->relatedOverrides()->process('removeOverride', 'classes/Product.php');
    $module_obj->relatedOverrides()->process('addOverride', 'classes/Product.php');
    if (!$module_obj->is_17) {
        $module_obj->relatedOverrides()->process('removeOverride', 'controllers/front/ProductController.php');
    }
    return true;
}
