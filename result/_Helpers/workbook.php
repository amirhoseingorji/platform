<?php
namespace _Helpers;

class workbook{

	public function taraz($res= []){
		$Xp = $this->avgArray($res);
		$sum = 0;
		foreach ($res as $result) {
			$sum += pow(($result-$Xp),2);
		}
		$sumAvg = $sum/count($res);
		$S = sqrt($sumAvg);
		$Z = [];
		foreach ($res as $result1) {
			array_push($Z, ($result1-$Xp)/$S);
		}
		$T = [];

		foreach ($Z as $resZ) {
			$reZ = round($resZ*1000+5000);
			array_push($T, $reZ);
		}
		return $T;
	}// end function

	public function tarazT($taraz = array()){ // first inner array : taraz , secend inner array : zarib dars
		$sum = 0;
		$zarib = 0;
		foreach ($taraz as $key => $value) {
			$sum += $value[0]*$value[1];
			$zarib += $value[1];
		}// end foreach
		return $sum/$zarib;
	}

	public function pointCalc($true , $false , $total){
		$point = ((($true*3)-$false)/($total*3))*100;
		return round($point,2);
	}

	public function SortTest($array , $order) {
	    $total = count($array);
	    for ($i=0;$i<$total;$i++) {
	        if ($array[$i]{0} == '&') {
	            $array[$i] = $array[$i]{1}.$array[$i];
	        } else {
	            $array[$i] = $array[$i]{0}.$array[$i];
	        }
	    }
	    if($order == 'desc') rsort($array);
	    if($order == 'asc') asort($array);
	    return $array;
	}

	public function avgArray($res = []){
		return array_sum($res)/count($res);
	}
	
	public function roundToUp($num){
		return ceil($num/10)*10;
	}

}