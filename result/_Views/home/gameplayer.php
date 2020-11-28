<?php
namespace _Views\home;
class gameplayer
{
    private $model;
    private $controller;

    public function __construct($controller,$model) {
        $this->controller = $controller;
        $this->model = $model;
			if (isset($_GET['action']) && !empty($_GET['action'])) {
    		$this->controller->{$_GET['action']}();
			}
    }

    public function output() {
		return file_get_contents(__DIR__.'//gameplayer.html');
        //return 'gameplayer<p><a href="?action=clicked">' . $this->model->string . "</a></p>".'<p><a href="?action=checked">' . $this->model->string . "</a></p>".@ $_GET['a']."<script src='gameplayer.js'></script>";
    }
}
?>
