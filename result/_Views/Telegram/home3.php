<?php
namespace _Views\Telegram;
class home3
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
		return "راه افتاده!";
	}
}

?>
