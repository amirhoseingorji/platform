<?php
echo "cron class loaded";
    class Cron{
		private $folder;
		function __construct(){//ok
			$this->folder = __DIR__."/".str_replace(".php","",basename(__FILE__))."_Cron";
			if(!file_exists($this->folder)) {
				$res =  mkdir($this->folder);
				if(!$res) {echo "cannaot create _Cron folder!";}
			};
		}
        public function setInterval($func="",$time = 0,$par=""){
			if(function_exists($func) && $time>0){
			$args = func_get_args();array_shift($args);array_shift($args);
			$par = substr(json_encode($args),1,-1);
			$php  = "<?php\r\n"
					."chdir('../');\r\n"
					."include('".basename(__FILE__)."');\r\n"
					."$func($par);\r\n"
					."?>";	
			$par = str_replace('"',"'",$par);
			$file = $this->folder."/$func"."_$par.php";
			file_put_contents($file,$php);
			$this->setCron($file,$time);
			}
        }
		public function setTimeout($func="",$time = 0,$par=""){
			if(function_exists($func) && $time>0){
			$args = func_get_args();array_shift($args);array_shift($args);
			$par = substr(json_encode($args),1,-1);
			$php  = "<?php\r\n"
					."unlink(__FILE__);\r\n"
					."exec(\"crontab -l | grep -v '\".basename(__FILE__).\"'  | crontab -\");\r\n"
					."chdir('../');\r\n"
					."include('".basename(__FILE__)."');\r\n"
					."$func($par);\r\n"
					."?>";	
			$par = str_replace('"',"'",$par);
			$file = $this->folder."/$func"."_$par.php";
			file_put_contents($file,$php);
			$this->setCron($file,$time);
			}
        }
		public function clear($func="",$par){
			$args = func_get_args();array_shift($args);
			$par = substr(json_encode($args),1,-1);
			$par = str_replace('"',"'",$par);
			$file = $this->folder."/$func"."_$par.php";
			unlink($file);
			exec("crontab -l | grep -v '".basename($file)."'  | crontab -");
        }
		public function clearAll(){
			// remove all cron jobs;
            exec( 'crontab -r' );
			//remove all files in cron
			$files = glob($this->folder."/*"); 
			foreach($files as $file) {
				if(is_file($file)) {
					unlink($file); 
				}
			}
        }
		public function called(){
			return substr(dirname($_SERVER['PHP_SELF']),-5) == "_Cron" ? true : false;
		}
		private function setCron($file,$time){
			$time = $this->convertTime($time);
			$tmp = str_replace(".php",".txt",$file);
			$file = "http://".$_SERVER[SERVER_NAME].substr($_SERVER['PHP_SELF'],0,-4)."_Cron/".basename($file);
			$str = "$time /usr/bin/curl -s \"$file\"".PHP_EOL;
			//$str = "$time /usr/local/bin/php -q \"$file\"".PHP_EOL;
			file_put_contents($tmp,$str);
            exec("crontab \"$tmp\"" );
           	unlink($tmp);
		}
        private function convertTime($time){
            if((string)intval($time) == $time){
               // $time = $time*60;
                $min = "*/$time";// gmdate("i", $time);
                $hours = "*";//$time < 3600 ? "*" : intval(gmdate("H", $time));
                $month = '*';
                $day = '*';
                return $min.' '.$hours.' '.$day.' '.$month.' *';
            }else{
                $mTime = strtotime($time);
                $min = date("i", $mTime);
                $hours =  date("h", $mTime);
                $day = date("d", $mTime);
                $month = date("m", $mTime);
                return intval($min).' '.intval($hours).' '.intval($day).' '.intval($month).' *';
            }
        }

    }
//logs

//$cron = new Cron();
//if(!$cron->called()){
//	$cron->setTimeout("fun",1,1332,34235);
//};
//function fun($id=1,$tid=2){
//	$tm = file_get_contents('ali.txt');
//	file_put_contents('ali.txt',$tm."\r\nid:$id\r\ntid:$tid\r\n");
//}
//$cron->clearAll();
?>