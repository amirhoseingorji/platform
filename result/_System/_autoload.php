<?php
function __autoload($class_name){
	$drs = DIRECTORY_SEPARATOR;
	$className = ltrim($class_name, '\\');
    $fileName  = '';
    $namespace = '';
    if ($lastNsPos = strrpos($className, '\\')) {
        $namespace = substr($className, 0, $lastNsPos);
        $className = substr($className, $lastNsPos + 1);
        $fileName  = str_replace('\\', $drs, $namespace) . $drs;
    }
    $fileName .= str_replace('_', $drs, $className) . '.php';
	$file = dirname(__DIR__).$drs.$fileName;
	 if (file_exists($file))  require_once $file; else  {
		 echo "error loading:$file";
		 require_once "home";
	 }
	 
	
}
const p = "<br>";
function _autoload($url){
	
	$drs = DIRECTORY_SEPARATOR;
	$url = str_replace('/', $drs, $url);
	$ext = pathinfo($url, PATHINFO_EXTENSION);
	
	$par = dirname(__DIR__).$drs;
	$murl = $par."_Models$drs$url";
	$curl = $par."_Controllers$drs$url";
	$vurl = $par."_Views$drs$url";
	
	//echo $murl;
	if($ext!="php" and $ext!="" and file_exists($vurl)){
		switch($ext){
			case "js":$mime ="text/javascript" ;
				break;
			case "css":$mime = "text/css";
				break;
			default:
				$finfo = finfo_open(FILEINFO_MIME_TYPE);
				$mime = finfo_file($finfo, $vurl);
		}
		header("Content-type: $mime");
		if($ext=="js"){
		echo "//automatic render by sitenevis@Barnamenegar.com";
		if(file_exists($murl)) echo "\r\n".file_get_contents(str_replace("_Views","_Models",$vurl));
		if(file_exists($curl)) echo "\r\n".file_get_contents(str_replace("_Views","_Controllers",$vurl));
		echo "\r\n".file_get_contents($vurl);
		}else{
			echo file_get_contents($vurl);
		}
		
	}elseif($ext=="php" and file_exists($vurl)){
		$url = substr($url,0,strpos($url,".php"));
		return _phpmvc(str_replace('/', "\\", $url));
	}elseif($ext!="php" and $ext!=""){
		return "";
	}else{
		$url = (file_exists("$vurl.php"))?$url:"home";
		
		return _phpmvc(str_replace('/', "\\", $url));
	}
}
function _phpmvc($url){
	$mc = "\\_Models\\$url";
	$vc = "\\_Views\\$url";
	$cc = "\\_Controllers\\$url";
	$model= new $mc();
	$controller = new $cc($model);
	$view = new $vc($controller, $model);
	return $view->output();
}
?>