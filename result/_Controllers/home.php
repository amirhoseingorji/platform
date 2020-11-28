<?php
namespace _Controllers;
class home
{
    private $model;

    public function __construct($model){
        $this->model = $model;
    }

    public function clicked() {
        $this->model->string = "Updated clicked, thanks to MVC and PHP!";
    }
	public function checked() {
        $this->model->string = "Updated checked, thanks to MVC and PHP!";
    }
}