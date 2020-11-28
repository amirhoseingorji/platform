<?php
namespace _Controllers\home;
class gameplayer
{
    private $model;

    public function __construct($model){
        $this->model = $model;
    }

    public function clicked() {
        $this->model->string = "Updated Data, thanks to MVC and PHP!";
    }
	public function checked() {
        $this->model->string = "Updated Data2, thanks to MVC and PHP!";
    }
}