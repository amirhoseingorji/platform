<?php
error_reporting(E_ALL); ini_set('display_errors', 'On'); 
require_once("_System/_autoload.php");
echo _autoload(@ $_GET["url"]);
?>