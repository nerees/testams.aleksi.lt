<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once('../../config/config.inc.php');

$ip = $_SERVER['REMOTE_ADDR'];
if ($ip == '78.57.173.185') {
    var_dump($ip);
}
var_dump($ip);