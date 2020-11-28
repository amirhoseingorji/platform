<?php
namespace _Views;

class workbook2
{
    private $model;
    private $controller;

    public function __construct($controller,$model) {
        $this->controller = $controller;
        $this->model = $model;
    }
    public function CreateWorkBook(){
		$validAnswer = $this->controller->answer;
		$start = 0; $str ='';
		$Qcount = count($validAnswer);
		if($Qcount > 100){
			$tdClass = 'test-td-m';
			$fontS = '10px';
		}else{
			$tdClass = 'test-td';
			$fontS = '14px';
		} 
		if($Qcount <= 10){
			$slice = 1;
			$end = round($Qcount/$slice);
		}else if($Qcount > 10 and $Qcount <= 20){
			$slice = 2;
			$end = round($Qcount/$slice);
		}else if($Qcount > 20 and $Qcount <= 30){
			$slice = 3;
			$end = round($Qcount/$slice);
		}else if($Qcount > 30 and $Qcount <= 40){
			$slice = 4;
			$end = round($Qcount/$slice);
		}elseif($Qcount > 40){
			$slice = 4;
			$end = ceil($Qcount/$slice);
		}
		//echo $end;
		$endS = $end;
		$maxOpt = 3;
		for($k = 0 ; $k < $Qcount ; $k++) $maxOpt= max($maxOpt,$validAnswer[$k]['options']);
		for($k = 1 ; $k <= $slice ; $k++){
			$str.= '<table class="table table-condensed" style="float: right; width:'.(100/$slice).'%; font-size:'.$fontS.'">
			<tr>
				<td>شماره سوال</td>
				<td>مبحث</td>
				<td>امتیاز</td>';
			for($i=1;$i<=$maxOpt;$i++) $str.= "<td>$i</td>";
			$str.= '<td>درصد کل صحیح</td>
			</tr>';
			for ($j = $start ; $j < $endS ; $j++) {
			//foreach ($validAnswer as $key1 => $validAnswer1) {
			if(isset($validAnswer[$j]['number'])){
					$str.= '<tr>
									<td>'.$validAnswer[$j]['number'].'</td>
									<td>'.$validAnswer[$j]['name'].'</td>
									<td>'.$validAnswer[$j]['score'].'</td>';
					}else{
						$str.= '<tr>
									<td>-</td>
									<td>-</td>';
					}
				
				if(isset($validAnswer[$j]['real_answer'])){
					$opt = $validAnswer[$j]['options'];
					$real = $validAnswer[$j]['real_answer'];
					$ans = $validAnswer[$j]['user_answer'];
					if($validAnswer[$j]['real_answer'] == $ans){
						$clas = $tdClass.' true';
						for($i=1 ; $i<= $opt; $i++) $str.= "<td><div class='$tdClass ".($real==$i?"true":"")."'></div></td>";
						for(;$i<=$maxOpt;$i++) $str.= "<td>-</td>";
						
						
					}else{
						$clas = $tdClass.' false';$clasB = $tdClass.' blank';
						for($i=1 ; $i<=$opt ; $i++)
							if($ans == $i) $str.="<td><div class='$clas'></div></td>";
							elseif($real == $i) $str.="<td><div class='$clasB'></div></td>";
							elseif($real!= $i and $ans != $i) $str.= "<td><div class='$tdClass'></div></td>";
						for(;$i<=$maxOpt;$i++) $str.= "<td>-</td>";
					}
					$str.= '<td>'.$validAnswer[$j]['avg'].'%</td>';
				}else{
					for($i=1 ; $i<=$maxOpt ; $i++) 	$str.= "<td><div class='$tdClass'></div></td>";
					$str.='<td>0%</td>';
				}
				$str.= '</tr>';
			}
			
			$start = $endS ; $endS = $endS + $end;
			$str.= '</table>';
		}// end for
		return $str;
	}


	/****************** header **************/

	private function title($topic , $text){
		return '<td dir="rtl">:'.$topic.'  </td>
			<td dir="rtl">'. $text.' </td>
		';
	}

	/*******************************  workResult ******************/

	public function workResult($result = []){
			
			$totaler = [];$totalArr = ['','کل'];$str='';
			foreach ($result as $keyR => $valueR) {
				$str .= '<tr>';
				foreach ($valueR as $keyR1 => $valueR1) {
					if(!is_array($valueR1[1])){
						if($keyR1 > 1){
							if(isset($totaler[$keyR1])){
								$totaler[$keyR1] += $valueR1[1];
							}else{
								$totaler[$keyR1] = $valueR1[1];
							}
						}
						/*if($keyR1 == 4){
							switch ($valueR1[1]) {
								case 1: $re = 'ضعیف';break;
								case 2: $re = 'متوسط';break;
								case 3: $re = 'خوب';break;
								case 4: $re = 'عالی';break;
							}
						}else{
							$re = $valueR1[1] ;
						}*/
						$re = $valueR1[1] ;
						$str .= '<td>'.$re.'</td>';
					}else{
						foreach ($valueR1[1] as $keyR2 => $valueR2) {
							if(isset($totaler[$keyR1][$keyR2])){
								$totaler[$keyR1][$keyR2] += $valueR2[1];
							}else{
								$totaler[$keyR1][$keyR2] = $valueR2[1];
							}
							$str .= '<td>'.($valueR2[1]).'</td>';
						}
					}
				}
				$str .= '</tr>';
			}
			return $str;
	}// end function

	public function createSumerizeWork(){
		$list = $this->controller->SumerizeWork;
	    $str='';
			foreach ($list as $value) {
				$str.= '<tr>';
				$i=0;
				foreach($value as $value1) if($i++<5) $str.= '<td>'.$value1.'</td>';
				$str.='</tr>';
			}
		return $str;
	}

    public function output() {
    	$exp = file_get_contents('_Views/workbook2.html');
    	$t = $this->controller;
    	$str1='';$str2='';$str3='';$str4='';
    	foreach ($t->head as $key => $value) {
    		$str1 .= $this->title($value[0], $value[1]);
    	}
    	foreach ($t->statistics as $key => $value) {
    		if($value['value'] > 0){
    			if($value['name'] == ''){
					$str2 .= $value['value'];
    			}else{
    				$str2 .= $value['name'].' : '.$value['value'];
    			}
    		}
		}

		foreach ($t->workResult[0] as $key => $value) {
			if(!is_array($value[1])){
				$str3 .= '<td rowspan="2">'.$value[0].'</td>';
			}else{
				$str3 .='<td colspan="'.count($value[1]).'">'.$value[0].'</td>';
			}
		}

		foreach ($t->workResult[0] as $key => $value) {
			if(is_array($value[1]) and count($value[1]) > 1){
				foreach ($value[1] as $key1 => $value1) {
					$str4.='<td>'.$value1[0].'</td>';
				}
			}
		}
		//echo 'http://forushy.com/workbook?user-id='.$t->userId.'&azmon-id='.$t->azmonId ;
		$exp = str_replace('{qrLink}', "http://barnamenegar.com/telegram/workbook2?user-id=$t->userId&azmon-id=$t->azmonId" , $exp);
    	$exp = str_replace('{azmonTit}', $t->azmonTit , $exp);
    	$exp = str_replace('{fortitle}', $str1 , $exp);
    	$exp = str_replace('{for-statics}', $str2 , $exp);
    	$exp = str_replace('{userId}', $t->userId , $exp);
    	$exp = str_replace('{azmonId}', $t->azmonId , $exp);
    	$exp = str_replace('{for-workResult-t}', $str3 , $exp);
    	$exp = str_replace('{for-workResult-b}', $str4 , $exp);
		$exp = str_replace('{workResult}',$this->workResult($t->workResult), $exp);
		
    	$exp = str_replace('{createSumerizeWork}',$this->createSumerizeWork(), $exp);
    	$exp = str_replace('{CreateWorkBook}',$this->CreateWorkBook(), $exp);
    	$exp = str_replace('{date}',json_encode($t->date), $exp);
    	$exp = str_replace('{taraz}',json_encode($t->taraz), $exp);
    	$exp = str_replace('{point}',json_encode($t->point), $exp);
    	$exp = str_replace('{maxnumber}',$t->maxNumber, $exp);
    	$exp = str_replace('{to1}',ceil($t->maxNumber/3), $exp);
    	$exp = str_replace('{to2}',ceil($t->maxNumber/3)*2, $exp);
    	$exp = str_replace('{gaugeBlance}', json_encode($t->gaugeBlance) , $exp);
    	$exp = str_replace('{title}','نمایش کارنامه', $exp);
        return $exp;
    }
}

?>
