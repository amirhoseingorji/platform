<?php

namespace _Controllers;



class workbook2 
{
	public function __construct($model){

		
        $this->model 		= $model;
        $workbookH 			= new \_Helpers\workbook();
        $this->jdate 		= new \_Helpers\jdatetime(true, true, 'Asia/Tehran');
        date_default_timezone_set("Asia/Tehran");
        $this->userId 		= @ $_GET['user-id'] ? $_GET['user-id'] : 222724899; 
        $this->azmonId 		= @ $_GET['azmon-id'] ? $_GET['azmon-id'] : 1;

		$getExam 			= $this->model->azmonTit($this->azmonId);
		
        $this->azmonTit     = $getExam['name'].' : '.$this->jdate->date("y/m/d",strtotime($getExam['start_time'])/*- 24*60*60*/);
		$this->statistics   = $this->model->statistics($this->azmonId);
		$this->head         = $this->model->header($this->userId);

		$this->workResult   = $this->model->workResult($this->userId , $this->azmonId);

		$this->SumerizeWork = $this->model->SumerizeWork($this->userId , $this->azmonId);
		$this->point 		= $this->model->point($this->userId);//[410,0,0,0];
		$list = [];
		$chartDate = $this->model->chartdate($this->userId, $this->azmonId);
		foreach ($chartDate as $chartDater) {
			array_push($list , $chartDater['name']);//.' : '.$this->jdate->date("y/m/d",strtotime($chartDater['start_time'])));
		}
		$this->date 		= $list;
		$this->answer 		= $this->model->examAnswer($this->userId , $this->azmonId);
		$this->maxNumber    = $this->model->maxNumber($this->userId , $this->azmonId);
		$this->gaugeBlance  = $this->model->gaugeBlance($this->userId , $this->azmonId);
		//$this->SortTest 	= $taraz;
		$this->taraz 		= $this->model->taraz($this->userId , $this->azmonId);
		//$this->workResult = workResult($workResult);
    }

}

?>

