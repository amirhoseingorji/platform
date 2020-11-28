<?php

namespace _Helpers;

use _Helpers;

use PDO;

class Tables extends Db{

	 public function __construct($address,$tb2="",$on=[],$mod="inner"){

		 if($tb2=="" and gettype($address)=="array"){

			//for regular tables

		 	$this->address = $address;

			$this->parts = [$this];

		 	$this->name = implode("_",$address);

			$this->tableclass();

		 }else if($tb2=="") {

			//for structures tables

			$this->name =  $address;

			$this->parts = [$this];

		 }else {

			 //for joined tables

			$tb1 = $address;

			$in1 = $tb1->name;

			$in2 = $tb2->name;

			$p1 = $tb1->parts;

			$p2 = $tb2->parts;

			$this->parts = array_merge($p1,$p2);

			for($i=0		 ;$i<count($p1);$i++) if(@ $on[$i]!="") $ip1=$i;

			for($i=count($p1);$i<count($on);$i++) if(@ $on[$i]!="") $ip2=$i;	

			$on1 = $on[$ip1];

			$on2 = $on[$ip2];

			$tbn1 = implode("_",$this->parts[$ip1]->address);

			$tbn2 = implode("_",$this->parts[$ip2]->address);

			$this->name = "($in1 $mod JOIN $in2 ON $tbn1.$on1 = $tbn2.$on2)";

		 }

	 }

	//$par=[[]];

	//$par['cols']   = "id,pid,..."; //default "*"

	//$par['where']  = "any where"; //string

	//$par[0]["id"]  = "%like%" or number or "> number";//array conditions for regular table

	//$par['colgroup']  = "col";//for grouping results

	//$par[1]["id"]  = "conditions";//conditions for having regular table

	//$par[#i]["id"] = "conditions"//for #i joined table;

	//$par['order']  = "col";//for order columns

	//$par['asc']    = true;//default false;

	//$par['page']   = 1;//page number by default 10 row each page;

	//$par['num']    = 4;//if @ page each pages row number else result limit;

	//$par['distinct']= true //default false;

	//$fetch = pdo::? // "":no return ; "query": return query without run;

	//$table->select($par,$fetch);

	public function select($par=[[]],$fetch=PDO::FETCH_ASSOC){

		$cols="*";$iwhere=[];$having=[];$num = 10;extract($par);

		$nt = count($this->parts);

		//where

		for($i=0;$i<$nt;$i++){

			if(gettype(@ $par[$i])== "array") $iwhere[$i] = $this->filter($par[$i],$this->parts[$i]);

		}

		if(gettype(@ $where)=="string") array_unshift($iwhere,$where);

		if(gettype(@ $where)=="array" ) array_unshift($iwhere,$this->filter($where,$this->parts[0]));

		$where =  count($iwhere)>0 ? " where ".implode(" and ",$iwhere):"";

		//group havving

		$group = (@ $group) ? " Group by $group ":"";

		if((@ $group) && $having==[] and gettype(@ $par[$nt])== "array")$having = $par[1];

		$having = $having!=[] ? " having {$this->filter($having)} ":"";

		//order

		$ascs = ["DESC","ASC"];

		$order = (@ $order) ? " Order by $order {$ascs[(int)(@ $asc)]}":"";

		//limit

		$limit = (@ $page)?" limit ".($page-1)*$num.",".$num:((@ $par['num'])?" limit $num":"" );

		//DISTINCT

		$distinct = (@ $distinct)  ? " DISTINCT ":"";

		//into permision req*/

		$into = (@ $into)  ? " INTO $into":""; 

		$query = "select $distinct $cols $into from {$this->name} $where $group $having $order $limit;";

		if(@ $fetch=="query") return $query;
		//echo $query."<br/>";
		return $this->query($query,$fetch);

	}

	//$where = [];

	//$where["id"]  = "%like%" or number or "> number";//array conditions for regular table

	//$table->delete($where);

	public function delete($where=[]){

		$where = $where!=[] ? " where {$this->filter($where)} ":"";

		return $this->query("DELETE from `{$this->name}` $where","");

	}

	

	//$table->truncate();//empty all data in table

	public function truncate(){

		return $this->query("TRUNCATE `{$this->name}`","");

	}

	//$par=[];

	//$par['col']   = "value"; 

	//$table->insert($par);

	public function insert($par=[]){

		$keys = '`'.implode('`,`',  array_keys($par)).'`';

		$vals = array_values($par);

		foreach($vals as $k=>$v) $vals[$k] = $this->q($v);

		$vals = implode(',',$vals);

		//echo "INSERT INTO `{$this->name}` ($keys) VALUES ($vals);";

		return $this->query("INSERT INTO `{$this->name}` ($keys) VALUES ($vals);","insert");

	}

	//$par=[];

	//$par['col']   = "updatedValue"; //updated value can be use "`col`+1" for relative

	//$where = [];

	//$where["id"]  = "%like%" or number or "> number";//array conditions for regular table

	//$table->update($par,$where);

	public function update($par=[],$where=[]){

		$update = [];

		$where = $where!=[] ? " where {$this->filter($where)} ":"";

		foreach($par as $key=>$item) array_push($update,"`$key`={$this->q($item)}");

		$update = implode(",",$update);

		return $this->query("UPDATE `{$this->name}` SET $update $where;","");

	}

	//************************************************ helpers functions

	//helper for in join

	public function inselect($par=[]){

		return"{IN (".$this->select($par,"query").")}";

	}

	// helper for conditions

	private function filter($ar=[],$alias=""){

		if(count($this->parts)==1) $alias="";

		$str = [];

		$al=$alias==""?"":"`".implode("_",$alias->address)."`.";

		foreach($ar as $key=>$item){

			if(gettype($item)== "array") {

				array_push($str,"And (".$this->filter($item,$alias).")");

			}else{

				array_push($str,"$al`$key` {$this->s($item)}");

			}

		}

		return str_replace("(And","(",str_replace("or And","And",implode(" or ",$str)));

	}

	//helpers for qotations conditions

	private function q($v){

		$s = substr($v,0,1);

		if($s=="{") $v =substr($v,1,-1);

		return ($s!="`" and $s!="'"  and (int)$v!==$v) ? "'$v'" : $v; 

	}

	//helpers for sql and qotations conditions

	private function s($v){

		$s = substr($v,0,1);

		if($s=="{") $s =substr($v,1,-1);

		if($s === ">" or $s ==="<") $s = $v; elseif($s !="`" and $s!="'" and (int)$v!==$v and $s!="{") $s = " like '$v'"; else $s="=".$v;

		return $s;

	}

	///**************************************************** structures function

	//$par=[[]];

	//$par[0]['column_name] = 'colName';

	//$table->col_info($par) or $db->col_info($par);

	public function col_info($par=[[]]){

		$par["cols"] = "column_name,column_type,column_default,extra";

		$par[0]['TABLE_SCHEMA']= $this::$dbn;

		if($this!=$this::$columns) $par[0]['table_name'] = $this->name;

			else $par["cols"] = "table_name";

		return $this::$columns->select($par);//[[]]

	}

	//$par=[[]];

	//$par[0]['column_name'] = 'colName';

	//$table->col_get($par)

	public function col_get($par=[[]]){

		$columns = $this->col_info($par);

		$cols = [];$ords=[];

		foreach($columns as $o=>$c){

			extract($c);

			if(@ $table_name) {

				if(!isset($cols[$table_name]))  $cols[$table_name] = [];

			}else{

				$ords[$o] = $column_name;

				$column_default = $column_default==""? "NULL" : "default $column_default"; 

				$cols[$column_name] = "$column_type $column_default $extra";

			}	

		}

		$this->columns = $cols;

		$this->columns_order = $ords;

		return $cols;//['colname'=>'colStructure'] OR //['table names',..]

	}

	//$par=[];

	//$par['name'] = 'int(11) NULL';

	//$this->col_add($par);

	public function col_add($par){

		$columns = @ $this->columns? $this->columns : $this->col_get();

		$cols = [];

		unset($par["id"]);unset($par["pid"]);

		foreach($par as $k=>$v) {

			if(!in_array($k,array_keys($columns))) {

				array_push($cols,"add `$k` $v");

				if(in_array(substr($k,1), $this::$tables) and substr($v,0,3) == "int") array_push($cols,"add key(`$k`)");

				array_push($this->columns,$v);

				array_push($this->columns_order,$k);

			}

		}

		$cols = implode(" , ",$cols);

		return $cols==""?0:$this->query("ALTER TABLE `{$this->name}` $cols;","");//bool

	}

	//$par=['colname1',...];

	//$this->col_drop($par);

	public function col_drop($par){

		$columns = @ $this->columns? $this->columns : $this->col_get();

		$cols = [];

		foreach($par as $v) {

			if(in_array($v,array_keys($columns))){

			array_push($cols,"drop $v");

			unset($this->columns[$v]);

			array_splice($this->columns_order,array_search($v,$this->columns_order),1);

			}

		}

		$cols = implode(" , ",$cols);

		return $cols==""?0:$this->query("ALTER TABLE `{$this->name}` $cols;","");//bool

	}

	//$par=[];

	//$par['name'] = 'newName';

	//$this->col_rename($par);

	public function col_rename($par){

		$columns = @ $this->columns? $this->columns : $this->col_get();

		$cols = [];

		foreach($par as $k=>$v) {

			if(in_array($k,array_keys($columns)) and !in_array($v,array_keys($columns))) {

				array_push($cols,"change `$k` $v ".$columns[$k]);

				if(in_array(substr($v,1), $this::$tables) and substr($columns[$k],0,3) == "int")

					array_push($cols,"add key(`$v`)");

				$this->columns[$v] = $this->columns[$k];

				unset($this->columns[$k]);

				$this->columns_order[array_search($k,$this->columns_order)]=$v;

			}

		}

		$cols = implode(" , ",$cols);

		return $cols==""?0:$this->query("ALTER TABLE `{$this->name}` $cols;","");//bool

	}

	//$par=[];

	//$par['name'] = 'int(11) NULL';//new type & ...

	//$this->col_modify($par);

	public function col_modify($par){

		$columns = @ $this->columns? $this->columns : $this->col_get();

		$cols = [];

		foreach($par as $k=>$v) {

			if(in_array($k,array_keys($columns))) {

				array_push($cols,"modify `$k` $v");

				$this->columns[$k]= $v;

			}

		}

		$cols = implode(" , ",$cols);

		return $cols==""?0:$this->query("ALTER TABLE `{$this->name}` $cols;","");//bool

	}

	//$par=[];

	//$par['name'] = 3;//0:first after pid and prefferd to one key given each time

	//$this->col_order($par);

	public function col_order($par){

		$columns = @ $this->columns? $this->columns : $this->col_get();

		$cols = [];

		foreach($par as $k=>$v) {

			if(in_array($k,array_keys($columns))) {

				$after = $this->columns_order[(int)$v+1];

				array_push($cols,"modify `$k` ".$columns[$k]." after $after");

				$this->columns_order[array_search($k,$this->columns_order)]="*";

				$this->columns_order = array_merge(array_slice($this->columns_order,0,(int)$v+1),[$k],array_slice($this->columns_order,(int)$v+2));

				array_splice($this->columns_order,array_search("*",$this->columns_order),1);

			}

		}

		$cols = implode(" , ",$cols);

		return $cols==""?0:$this->query("ALTER TABLE `{$this->name}` $cols;","");//bool

	}

	//$par1=['colname1',...] //column to be move;

	//$par2=$destTable//dest_table;

	//$par3=3;//order 0:first after pid ,default end of $destTable

	public function col_copy($par1,$par2,$par3=""){

		$columns      = @ $this->columns? $this->columns : $this->col_get();

		$dest_columns = @ $par2->columns? $par2->columns : $par2->col_get();

		$cols = [];$j = 1;

		foreach($par1 as $v) {

			if(in_array($v,array_keys($columns)) and !in_array($v,array_keys($dest_columns))) {

				$after = $par3!="" ? "after ".$par2->columns_order[(int)$par3+$j] :"";

				array_push($cols,"add ".$columns[$v]." ".$this->columns[$v]. " $after");

				$par2->columns[$v] = $this->columns[$v];

				$par2->columns_order = array_merge(array_slice($par2->columns_order,0,(int)$par3+$j),[$v],array_slice($par2->columns_order,(int)$par3+$j+1));$j++;

			}

		}

		return $cols==""?0:$this->query("ALTER TABLE `{$par2->name}` $cols;","");//bool

	}

	//$par1=['colname1',...] //column to be move;

	//$par2=$destTable//dest_table;

	//$par3=3;//order 0:first after pid ,default end of $destTable

	public function col_move($par1,$par2,$par3=""){

		return ($this->col_copy($par1,$par2,$par3=""))? $this->col_drop($par1):false; //bool

	}

	/////////////

}



?>