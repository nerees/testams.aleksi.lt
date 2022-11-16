<?php
/**
*  @author    Amazzing <mail@amazzing.ru>
*  @copyright Amazzing
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/

function upgrade_module_3_1_7($module_obj)
{
    if (!defined('_PS_VERSION_')) {
        exit;
    }
    Media::clearCache(); // make sure front.js/css are updated in Smart cache
    $i_settings_rows = $module_obj->db->executeS('
        SELECT * FROM '._DB_PREFIX_.'af_settings WHERE type = \'indexation\'
    ');
    $upd_rows = array();
    foreach ($i_settings_rows as $row) {
        $v = Tools::jsonDecode($row['value'], true);
        $row['value'] = pSQL(Tools::jsonEncode($v + array('c_active' => 0, 'p_comb' => 0)));
        $upd_rows[] = '(\''.implode('\', \'', $row).'\')';
    }
    if ($upd_rows) {
        $module_obj->db->execute('
            REPLACE INTO '._DB_PREFIX_.'af_settings VALUES '.implode(', ', $upd_rows).'
        ');
    }
    return true;
}
