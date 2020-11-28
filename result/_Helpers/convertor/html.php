<?php

	namespace _Helpers\convertor;

	class html

	{

		

		public $exe  = 'xvfb-run /usr/local/bin/wkhtmltopdf';//__dir__.'/html/wkhtmltopdf/bin/wkhtmltopdf';

		public $exei = 'xvfb-run /usr/local/bin/wkhtmltoimage';//__dir__.'/html/wkhtmltopdf/bin/wkhtmltoimage';



		// $input : Url to convert => string

		public function createImg($input , $output , $option = '--post page 0 --window-status done --width 500 --enable-smart-width --minimum-font-size 14  2>&1'){

			$res = exec($this->exei.' '.$option.' '.$input.' '.$output);
			
		}// $output : export file name and directory => string



		public function createPdf($input , $output , $option = ''/*'--margin-left 5mm --margin-right 5mm'*/){

			//$name = rand(1000 , 10000);

			

			$valueEx = explode('/', $output);

			$value = end($valueEx);

			$data = explode('-', $value);

			$user = $data[0];

			$exam = $data[1];

			echo $this->exei.' --post user '.$user.' --post exam '.$exam.' '.$option.' "'.$input.'" '.$output.'.jpg   2>&1';

			$cmd =exec($this->exei.' --post user '.$user.' --post exam '.$exam.' '.$option.' "'.$input.'" '.$output.'.jpg  2>&1');
			

			echo "<pre>$cmd</pre>";

		}// end function



		public function viewImage($filePath , $format='jpg'){

			if($format == 'jpg'){

				$img = imagecreatefromjpeg($filePath);

				header('Content-type: image/jpeg');

				imagepng($img);

			}elseif($format == 'png'){

				$img = imagecreatefrompng($filePath);

				header('Content-type: image/png');

				imagepng($img);

			}

	    	

	    }

	    public function PageCount_DOCX($file) {

		    $pageCount = 0;

		    $zip = new ZipArchive();

		    if($zip->open($file) === true) {

		        if(($index = $zip->locateName('docProps/app.xml')) !== false)  {

		            $data = $zip->getFromIndex($index);

		            $zip->close();

		            $xml = new SimpleXMLElement($data);

		            $pageCount = $xml->Pages;

		        }

		    }

		    return $pageCount;

		}

		

	    public function download($filePath , $fileName){

	    	$buffer = file_get_contents($filePath);

		    header("Content-Type: application/force-download");

		    header("Cache-Control: public");

		    header("Content-Transfer-Encoding: binary");

		    header("Content-Disposition: attachment; filename=$fileName");

		    echo $buffer;

	    } 

	}	

	

?>