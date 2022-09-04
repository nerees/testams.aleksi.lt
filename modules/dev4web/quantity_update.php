<?php
echo "start";
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ini_set('max_execution_time', 900);
if (isset($_GET['token']) && $_GET['token'] === 'brooklyn99') {

    include_once('../../config/config.inc.php');
    include_once('QuantityUpdaterClass.php');
    $update_module = new QuantityUpdaterClass();
    $update_module->compareReferenceAndId();
    echo "fin";
}