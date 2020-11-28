<?php
namespace _Helpers;

class glob{
	
	public $dirs = [];
	public $files = [];
	protected $baseDir;

	public function __construct($list = [] , $ext = '*'){
		if(is_array($list)){
			foreach ($list as $key => $value) {
				$cdi = explode('/',$value);
				array_shift($cdi);
				$this->baseDir = implode('/',$cdi);
				$this->listFolderFiles($value,$ext);
				//$this->output = $this->list;
			}
		}
	}

	public function listFolderFiles($dir , $extension){
		if(is_dir($dir)){
			$ffs = scandir($dir);
		    unset($ffs[array_search('.', $ffs, true)]);
		    unset($ffs[array_search('..', $ffs, true)]);
		    if (count($ffs) < 1) return false;
		    foreach($ffs as $ff){
		        if(is_dir($dir.'/'.$ff)){
		        	$this->listFolderFiles($dir.'/'.$ff , $extension);
		        }else{
		        	$ext = pathinfo($dir.'/'.$ff, PATHINFO_EXTENSION);
		        	$cDir = explode($this->baseDir, $dir);
		        	if($extension == '*'){
		        		array_push($this->files, $dir.'/'.$ff);
		        		array_push($this->dirs , $this->baseDir.$cDir[1]);
		        	}elseif((strlen($extension) == 3 or strlen($extension) == 4) and $ext == $extension){
		        		array_push($this->files, $dir.'/'.$ff);
		        		array_push($this->dirs , $this->baseDir.$cDir[1]);
		        	}elseif(strlen($extension) != 3 and strlen($extension) != 4 and is_numeric(strpos($ff,$extension))){
		        		array_push($this->files, $dir.'/'.$ff);
		        		array_push($this->dirs , $this->baseDir.$cDir[1]);
		        	}elseif(is_array($extension)){
		        		foreach ($extension as $exten) {
		        			foreach ($exten as $val) {
		        				if(!isset($val[1])){
			        				
			        			}
		        			}// end foreach $val
		        		}// end foreach $exten
		        	}
		        }
		    }
		}else{
			$ext = pathinfo($dir, PATHINFO_EXTENSION);
        	$iDir = null;
        	if($extension == '*'){
        		array_push($this->files, $dir);
        		array_push($this->dirs, '');
        	}elseif((strlen($extension) == 3 or strlen($extension) == 4) and $ext == $extension){
        		array_push($this->files, $dir);
        		array_push($this->dirs, '');
        	}elseif(strlen($extension) != 3 and strlen($extension) != 4 and is_numeric(strpos($ff,$extension))){
        		array_push($this->files, $dir);
        		array_push($this->dirs, '');
        	}
		}
	}

	public function batch($funcName){
		$args = func_get_args();
		$args = array_slice($args, 1);
		foreach ($this->files as $I => $value) {
			$argsi = $args;
			foreach ($args as $K => $arg){
				if(gettype($arg)=='array' and count($arg)== count($this->files)){
					$argsi[$K] =  $arg[$I];
				}
			}
			call_user_func_array(__namespace__."\\".$funcName, $argsi);
		}
	}
}
?>