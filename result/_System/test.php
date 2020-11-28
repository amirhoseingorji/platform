<?php
file_put_contents('al2.txt',json_encode($_GET)."\r\n".json_encode($_POST)."\r\n".json_encode($argv));
?>