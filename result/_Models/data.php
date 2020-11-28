<?php
namespace _Models;
class data{
	private $dbUser = 'root';//'porfroos';
	private $dbPass = '';//'89201059';
	private $dbname = 'taskmanager';
    public function __construct(){
		$db = $this->db = new \_Helpers\Db($this->dbname,$this->dbUser,$this->dbPass);  
		//$this->creator();
    }
	public function creator(){
		$db = $this->db;
		$int = "int(11) null";
		$vch = "varchar(60) null";
		$txt = "text null";
		$dat = "datetime null";
		$tim = "timestamp TIMESTAMP";
//		group
		$par = [];
		$par["name"]       = $vch;
		$db->create("group",$par);
//		users
		$par = [];
		$par["name"]       = $vch;
		$par["user"]       = $vch;
		$par["price"]      = $int;
		$par["minhour"]    = $int;
		$par["maxhour"]    = $int;
		$db->group->create("users",$par);
//		models
		$par=[];
		$par["name"]       = $vch;
		$db->group->users->create("model",$par);
//		priod
		$par=[];
		$par["name"]       = $vch;
		$db->group->users->create("period",$par);
//		targets
		$par=[];
		$par["name"] 	   = $vch;
		$par["important"]  = $int;
		
		$par["_group"]     = $int;
		
		$par["start"]      = $dat;
		
		$par["end"]        = $dat;
		$par["minpreend"]  = $dat;
		$par["maxpreend"]  = $dat;
		$par["realEnd"]    = $dat;
		
		$par["minprecost"] = $int;
		$par["maxprecost"] = $int;
		$par["realcost"]   = $int;
		
		$par["workper"]    = $int;
		$par["successper"] = $int;
		$par["value"]      = $int;
		
		$db->create("targets",$par);
//		tasks
		$par=[];
		$par["name"]       = $vch;
		$par["important"]  = $int;
		$par["link"]       = $txt;
		$par["condition"]  = $txt;
		$par["value"]      = $int;
		$par["_user"]      = $int;
		
		$par["start"]        = $dat;
		$par["minprestart"]  = $dat;
		$par["maxprestart"]  = $dat;
		$par["realstart"]    = $dat;
		
		$par["end"]          = $dat;
		$par["minpreend"]    = $dat;
		$par["maxpreend"]    = $dat;
		$par["realEnd"]      = $dat;
		
		
		$par["dorepeat"]     = $int;
		$par["repeat"]       = $int;
		
		$par["dotime"]       = $int;
		$par["time"]         = $int;
		
		$par["dovalue"]      = $int;
		$par["value"]        = $int;

				
		$par["workper"]      = $int;
		$par["successper"]   = $int;
		$par["succtonext"]   = $int;
		
		$db->targets->create("tasks",$par);
//		neccery
		$par=[];
		$par["name"]       = $vch;
		$db->targets->tasks->create("neccery",$par);
//		successmod
		$par=[];
		$par["name"]       = $vch;
		$db->targets->tasks->create("neccery",$par);
//		wrokmod
		$par=[];
		$par["name"]       = $vch;
		$db->targets->tasks->create("wrokmodel",$par);
//		priod
		$par=[];
		$par["name"]       = $vch;
		$db->targets->tasks->create("period",$par);	
//		works
		$par=[];
		$par["start"]      = $dat;
		$par["end"]        = $dat;
		$par["time"]       = $dat;
		$par["success"]    = $int;
		$par["value"]      = $int;
		$par["comment"]    = $txt;
		$db->targets->tasks->create("works",$par);	
		
	}
}
?>
