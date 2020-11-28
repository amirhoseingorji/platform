<?php
namespace _Views;
class data
{
    private $model;
    private $controller;

    public function __construct($controller,$model) {
        $this->controller = $controller;
        $this->model = $model;
		include "data.html";
    }

    public function output() {
		return "";
    }
}

?>
