<?php
/**
*  @author    Amazzing <mail@amazzing.ru>
*  @copyright Amazzing
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/

function upgrade_module_3_1_5($module_obj)
{
    if (!defined('_PS_VERSION_')) {
        exit;
    }
    Media::clearCache(); // make sure front.js/css are updated in Smart cache
    $settings_rows = $module_obj->db->executeS('
        SELECT * FROM '._DB_PREFIX_.'af_settings WHERE type = \'general\'
    ');
    $oos_behaviour_replacements = array(1 => 2, 2 => 3, 3 => 4);
    $upd_rows = array();
    foreach ($settings_rows as $row) {
        $v = Tools::jsonDecode($row['value'], true);
        if (isset($oos_behaviour_replacements[$v['oos_behaviour']])) {
            $v['oos_behaviour'] = $oos_behaviour_replacements[$v['oos_behaviour']];
        }
        $v['oos_behaviour_'] = $v['oos_behaviour'];
        if (!empty($v['combinations_existence'])) {
            $v['combinations_stock'] = 1;
            if (empty($v['oos_behaviour'])) {
                $v['oos_behaviour'] = 4; // exclude non-available
            }
        }
        $row['value'] = pSQL(Tools::jsonEncode($v));
        $upd_rows[] = '(\''.implode('\', \'', $row).'\')';
    }
    if ($upd_rows) {
        $module_obj->db->execute('
            REPLACE INTO '._DB_PREFIX_.'af_settings VALUES '.implode(', ', $upd_rows).'
        ');
    }
    return true;
}
