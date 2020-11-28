<?php
namespace _Views;
use \aa\vendor\spatie\browsershot\Browsershot\src;
class home
{
    private $model;
    private $controller;

    public function __construct($controller,$model) {
        $this->controller = $controller;
        $this->model = $model;
		echo 1;
		//Browsershot::url('https://google.com')->save("1.jpg");
		echo 2;
    }

    public function output() {
		



        return '<p><a href="index.php?action=clicked">' . $this->model->string . "click</a></p>".'<p><a href="index.php?action=checked">' . $this->model->string . "check</a></p>";
		
    }
}

?>
