<?php
namespace _Views\Telegram;
class atest
{
    private $model;
    private $controller;
	///////////////
    public function __construct($controller,$model) {
        $this->controller = $controller;
        $this->model = $model;
    }
	public function output(){
		//nothing views in webhook
		return "its private!";
	}
}

?>
