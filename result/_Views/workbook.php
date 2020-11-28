<?php
namespace _Views;

class workbook
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
				<td style="font-size:11px;vertical-align:middle;" width="30">شماره سوال</td>
				<td style="font-size:14px;vertical-align:middle;">مبحث</td>';
				//<td>ضریب</td>';
			for($i=1;$i<=$maxOpt;$i++) $str.= "<td style='font-size:14px;vertical-align:middle;'>$i</td>";
			$str.= '<td width="30" style="font-size:11px;vertical-align:middle;">درصد&zwnj;کل صحیح</td></tr>';//<td>ضریب</td>
			for ($j = $start ; $j < $endS ; $j++) {
			//foreach ($validAnswer as $key1 => $validAnswer1) {
			      if(isset($validAnswer[$j]['number'])){
					$str.= '<tr>
									<td style="font-size:14px;vertical-align:middle;padding:3px">'.$validAnswer[$j]['number'].'</td>
									<td style="font-size:12px;vertical-align:middle;padding:3px"> '.str_replace(" ","&zwnj;",$validAnswer[$j]['name']).'</td>';
									//<td>'.$validAnswer[$j]['score'].'</td>';
					}else{
						$str.= '<tr>
									<td>-</td><td>-</td>';
									//<td>-</td>';
					}
				
				if(isset($validAnswer[$j]['real_answer'])){
					$opt = $validAnswer[$j]['options'];
					$real = $validAnswer[$j]['real_answer'];
					$ans = $validAnswer[$j]['user_answer'];
					if($validAnswer[$j]['real_answer'] == $ans){
						$clas = $tdClass.' true';
						for($i=1 ; $i<= $opt; $i++) $str.= "<td><div class='$tdClass ".($real==$i?"true":"")."'>".($real==$i?"✔️":"")."</div></td>";
						for(;$i<=$maxOpt;$i++) $str.= "<td>-</td>";
						
						
					}else{
						$clas = $tdClass.' false';$clasB = $tdClass.' blank';
						for($i=1 ; $i<=$opt ; $i++)
							if($ans == $i) $str.="<td><div class='$clas'>❌</div></td>";
							elseif($real == $i) $str.="<td><div class='$clasB'>✅</div></td>";
							elseif($real!= $i and $ans != $i) $str.= "<td><div class='$tdClass'></div></td>";
						for(;$i<=$maxOpt;$i++) $str.= "<td>-</td>";
					}
					$str.= '<td style="font-size:12px;vertical-align:middle">'.$validAnswer[$j]['avg'].'%</td>';
				//	$str.= '<td>'.$validAnswer[$j]['score'] .'</td></tr>';
				}else{
					for($i=1 ; $i<=$maxOpt ; $i++) 	$str.= "<td><div class='$tdClass'></div></td>";
					$str.='<td>0%</td>';
					$str.= '</tr>';
				}
				
			}
			
			$start = $endS ; $endS = $endS + $end;
			$str.= '</table>';
		}// end for
		return $str;
	}



	/****************** header **************/

	private function title($topic , $text){
		return '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 box-tit">
			<span>'.$topic.' : </span>
			<span>'. $text.' </span>
		</div>';
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

	public function createSumerizeWork($list = []){
		$true = 0 ; $false = 0 ; $blank = 0; $total = 0; $tArr = ['یکل'];$str='';
		$str.= '<table class="table table-condensed" dir="rtl">
			<tr>
				<td>نام درس</td>
				<td>درست</td>
				<td>نا درست</td>
				<td>نزده</td>
				<td>تعداد</td>
			</tr>';
			foreach ($list as $key => $value) {
				
				$str.= '<tr>';
				foreach ($value as $key1 => $value1) {
					switch ($key1) {
						case 1 : $true += $value1;break;
						case 2 : $false += $value1;break;
						case 3 : $blank += $value1;break;
						case 4 : $total += $value1;break;
					}
					$str.= '<td>'.$value1.'</td>';
				}
				$str.='</tr>';
			}
			
		$str.= '</table>';
		return $str;
	}

    public function output() {
    	$exp = file_get_contents('_Views/workbook.html');
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
		$exp = str_replace('{qrLink}', "https://result.madrese.net/workbook?user-id=$t->userId&azmon-id=$t->azmonId" , $exp);
    	$exp = str_replace('{azmonTit}', $t->azmonTit , $exp);
    	$exp = str_replace('{fortitle}', $str1 , $exp);
    	$exp = str_replace('{for-statics}', $str2 , $exp);
    	$exp = str_replace('{userId}', $t->userId , $exp);
    	$exp = str_replace('{azmonId}', $t->azmonId , $exp);
    	$exp = str_replace('{for-workResult-t}', $str3 , $exp);
    	$exp = str_replace('{for-workResult-b}', $str4 , $exp);
    	$exp = str_replace('{workResult}',$this->workResult($t->workResult), $exp);
    	$exp = str_replace('{createSumerizeWork}',$this->createSumerizeWork($t->SumerizeWork), $exp);
    	$exp = str_replace('{CreateWorkBook}',$this->CreateWorkBook($t->answer), $exp);
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
