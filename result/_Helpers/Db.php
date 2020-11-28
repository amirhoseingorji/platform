<?php

namespace _Helpers;

use PDO;

class Db{

	 static $con,$tables,$columns,$map,$root,$dbn,$tclass = "\\_Helpers\\Tables";

	 public function __construct($db="",$usr="",$pas="",$ser="localhost"){	

		$this->connect($db,$usr,$pas,$ser);

		$this::$tables  = $this->query("SHOW TABLES",PDO::FETCH_COLUMN);

		$this::$columns = new $this::$tclass("information_schema.COLUMNS"); 

		$this::$root=$this;

		$this::$tables;

		$this->reset();

	 }

	//**************************************************************** general Helpers

	//start and reset oop structure for tables in current database 

	private   function reset(){

		foreach($this as $k=>$v) unset($this->$k);

		$this::$map  = $this->maper();

		$this->name = "";

		$this->address = [];

		$this->tableclass();

	}

	//detect relations between tables

	private   function maper(){

		$map = [];

		foreach($this::$tables as $table ){

			$tmp = explode("_",$table);

			for($i=0;$i<count($tmp);$i++){

				$tmp2 = array_slice($tmp,0,$i+1);

				eval ('if(@ $map["'.implode('"]["',$tmp2).'"]) true; else $map["'.implode('"]["',$tmp2).'"]=[];');

			}

		}

		return $map;

	}

	//add child tables as table classes

	protected function tableclass(){

		foreach($this->mapChild($this) as $key => $table ){

			$myadrs = $this->address;

			if(!in_array($table,$myadrs)){

				array_push($myadrs,$table);

				eval('$this->'.$table.' = new $this::$tclass($myadrs);');

			}

			//print($key . ':' .$table. p);

		}

	}

	// connect pdo data base

	private   function connect($db,$usr,$pas,$ser){

		 try{

			$base = "mysql:host=$ser;dbname=$db;charset=utf8";	

			$this::$con = new PDO($base,$usr,$pas);	

			$this::$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		}catch(PDOException $e){
		   

			$this->debug($e->getMessage());

    	}

	}

	// run query and return results 

	public    function query($sql,$fetch=""){

		if($sql) try{

        	$query = $this::$con->query($sql);

			return $fetch? ($fetch=="insert"? $this::$con->lastInsertId() :$query->fetchAll($fetch)) : [];

		}catch(PDOException $e){

   			$this->debug($e->getMessage());

    	}

    }

	// print debug errors and logs;

	private   function debug($str){

		echo $str.p;

	}

	// get object of table

	protected function Obj($table){

		if(gettype($table) == "array" ) $table = implode('->',$table);

		$table = str_replace("_","->",$table);

		$obj= $table ? '$this::$root->'.$table : '$this::$root';

		eval('$obj = '.$obj.';');

		return $obj;	

	}

	//get map of childs array from table 

	protected function mapChild($dest=[]){

		switch(gettype($dest)){

			case "array":

				if (count($dest)==0) $mymap = $this::$map;else   

					eval('$mymap = $this::$map["'.implode('"]["',$dest).'"];');	

				break;

			case "string":

				if ($dest=="") $mymap = $this::$map;else   

					eval('$mymap = $this::$map["'.str_replace('_','"]["',$dest).'"];');	

				break;

			default :

				if ($dest==$this::$root) $mymap = $this::$map;else  

					eval('$mymap = $this::$map["'.implode('"]["',$dest->address).'"];');

		}	

		return array_keys($mymap);

	}

	//******************************************************* functions of table and database

	

	//$on = ["table1_COl","table2_COl"];// nth join $on[nth] required for optionla $on[n<nth];  

	//$table1->join("table2",$on) // inner join can repeat nth or select similar regular tables

	//$db->join("table1","table2",$on);

	public    function join($tb1,$tb2,$on=[],$mod="inner"){

		if($this->name!=""){
			$mod=$on;$on = $tb2;$tb2= $tb1;$tb1 = $this;
		}

		if(gettype($on)=="string") $on = [$on ,$on];
		if(gettype($mod)!="string") $mod= "inner";
		return new $this::$tclass($tb1,$tb2,$on,$mod);

	}

	//****************************************************** functions for structure tables

	//$par = [];

	//$par['newcol'] = 'int(11) NULL';

	//$parent->create("newTable",$par);

	/*ok*/public    function create($tb,$par=[]){

		$def = [];

		$def["id"]  = "int(11) NOT NULL AUTO_INCREMENT,PRIMARY KEY (`id`)";

		$def["pid"] = "int(11),key (`pid`)";

		$def["ord"] = "int(11)";

		foreach($this->address as $level=>$parent) 	{

			$parent = implode("_",array_slice($this->address,0,$level+1));

			$def["_$parent"] = "int(11) NULL,key (`_$parent`)";	}

		$dest = array_merge($this->address,[$tb]);

		$name = end($dest);$tb = implode("_",$dest);

		if(!in_array($tb,$this::$tables ) ){

			$cols = [];

			foreach($def as $k=>$v) array_push($cols,"`$k` $v");

			$cols = implode(",",$cols);

			$res = $this->query("CREATE TABLE `$tb` ($cols) ENGINE=MyISAM DEFAULT CHARSET=utf8;");

			array_push($this::$tables,$tb);

			$this::$root->reset();

			//if($par!=[]) eval($this->Obj($dest).'->col_add($par);');

			if($par!=[]) $this->Obj($dest)->col_add($par);

		}else $res= false;

		return $res;//bool

	}

	//$table->rename("tablename"); //or $parent->rename("table","tablename");

	public    function rename($table,$rename=0,$plevel=0){

	//manage parametric or objective

		$dest   = $this->address;

		if(gettype($rename)=="integer"){

			$plevel = $rename;

			$rename = $table;

		}else array_push($dest,$table);

		$tb  = implode("_",$dest);

	//new name and table address

		$new = [];$new[count($dest)-1-$plevel] = $rename;

		$ndest = array_replace($dest,$new);

		$ntb = implode("_",$ndest);	

	//rename child tables

		foreach($this->mapChild($dest) as $child ){

			$child = array_merge($dest,[$child]);

			$this->Obj($child)->rename($rename,$plevel+1);

		}

	//rename linked colmns

		$par=[['column_name'=>"_$tb"]];

		$cols = $this::$columns->col_info($par);//get all tables contain links

		foreach($cols as $itb=>$v){

			$par=["_$tb"=>"_.$ntb"];

			$this->Obj($v)->col_rename($par);

		}

	//rename current table

		$res = $this->query("ALTER TABLE `$tb` RENAME `$ntb`");

		array_push($this::$tables,$ntb);

		$this::$tables = array_diff($this::$tables,[$tb]);

		$this::$root->reset();

		return $res;

	}

	//$parent->drop("Table");      //or $table->drop();

	public    function drop($tb=""){

		$dest = ($tb!="")? array_merge($this->address,[$tb]):$this->address;

		$tb = implode("_",$dest);

		if(in_array($tb,$this::$tables) ){

		//remove childs

			foreach($this->mapChild($dest) as $table ) eval($this->Obj($dest).'->drop($table);');

		//remove links

			$par=[['column_name'=>"_$tb"]];

			$cols = $this::$columns->col_info($par);//get all tables contain links

			foreach($cols as $itb=>$v) 	eval($this->Obj($itb).'->col_drop(["_'.$tb.'"]);');

		//remove self

			$res = $this->query("DROP TABLE `$tb`","");

			$this::$tables = array_diff($this::$tables,[$tb]);

			$this::$root->reset();

			return $res;

		}

	}

	//$table->copy($dest); //or $parent->copy("table",$dest);

	public    function copy($tb,$to=""){

		$dest = $this->address;

		if($to!="") array_push($dest,$tb) ; else $to = $tb;

	//this prop

		$pos = $this->Obj($dest);

		$tb   = implode("_",$dest);

		$name = end($dest);

	//new prop

		$ndest = $to->address;array_push($ndest,$name);

		$ntb  = implode("_",$ndest);

	//check duplicate

		while(in_array($ntb,$this::$tables)) {

			$ndest[count($ndest)-1].="copy";

			$ntb  = implode("_",$ndest);

		}

		$nname = end($ndest);

	//copy self

		eval('$qselect = '.$pos.'->select([],"query");');

		$res = $this->query("create TABLE `$ntb` ".$qselect);

		array_push($this::$tables,$ntb);

		$this::$root->reset();

		eval('$npos = '.$this->Obj($ndest).';');

	//update self links 

		$par=[];

		$columns = @ $npos->columns? $npos->columns : $npos->col_get();

		foreach($columns as $col)

			if(strpos($col,$tb)>-1) $par[$col] = str_replace($tb,$ntb,$col);

		$npos->col_rename($par);

	//update parents`s links

		$par=[];

		for($i=1;$i<min(count($dest),count($ndest));$i++){

			$destp = array_slice($dest,0,$i);

			$tbp   = implode("_",$destp);	

			$destp = array_slice($ndest,0,$i);

			$ntbp  = implode("_",$ndestp);

			foreach($columns as $col)

				if(strpos($col,$tbp)>-1) $par[$col] = str_replace($tbp,$ntbp,$col);

		}

		$npos->col_rename($par);

	//insert missing parents for new table

		$par=[];

		for($i=1;$i<count($ndest);$i++){

			$destp = array_slice($ndest,0,$i);

			$ntbp  = implode("_",$ndestp);

			$par[$col] = "int(11) NULL";

		}

		$npos->col_rename($par);

	//copy childs

		foreach($this->mapChild($dest) as $child ){

			$child = array_push($dest,$child);

			eval($this->Obj($child).'->copy($npos);');

		}

		return $res;

	}

	//$table->move($dest);

	public    function move($tb,$to=""){

		$res = $this->copy($tb,$to="") ? $this->drop($tb): false;

		return $res;

	}

}



?>