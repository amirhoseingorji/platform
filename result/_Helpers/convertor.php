<?php
namespace _Helpers;
use XMLReader;
use DOMDocument;
use DomXPath;
use DOMText;
session_start();
class convertor{

	public $dirList = [];
	public static $input;
	public static $tSelf;
	protected $output;
	public static $fileExt;
	protected $outExt;
	private static $htmFormat = ['html' , 'htm' , 'php' , 'asp' , 'aspx' , 'jsp'];
	private static $docFormat = ['docx' , 'doc' , 'docm' , 'rtf' , 'txt'];
	private static $pdfFormat = ['pdf'];
	private static $xlsFormat = ['xlsx' , 'xls', 'xlt' , 'xml' , 'xlsm'];
	private static $pptFormat = ['pptx' , 'ppt' , 'pptm'];
	private static $sndFormat = ['mp3' , 'wav' ,'ogg' , 'audio' , 'webm' , 'mp4'];
	private static $vidFormat = ['mp4' , 'avi' , 'mkv' , 'webm' , 'mov'];
	private static $jpgFormat = ['jpg' , 'bmp' , 'png' , 'gif' , 'pdf'];
	private static $gifFormat = ['gif' , 'psd' , 'tif' , 'webm' , 'mp4'];
	private static $pngFormat = ['png' , 'gif' , 'jpeg'];
	public function __construct($input="" , $extension = []){
		if($input) self::setInput($input, $extension);
	}
	protected static function setInput($input){
		self::$input = $input;
		self::$fileExt = pathinfo($input, PATHINFO_EXTENSION);
		if(empty(self::$fileExt)) self::$fileExt = 'html';
	}

	public static function video($input , $output , $format){
		self::setInput($input);
		$valid = self:: $vidFormat;
		$format = in_array($format,$valid) ? $format:$valid[0];
		if(!in_array(self::$fileExt,$valid)) die(self::$fileExt.' format is not valid for convert to ' .$format); 
		$fileName = pathinfo(basename($input), PATHINFO_FILENAME);
		$convert = new \_Helpers\convertor\media();
		$convert->convertMedia($input , $output.$fileName.'.'.$format);
		/*
			jpeg to mp4 => ffmpeg -i D:\c\2_%00d.png D:\c\test.avi => etc: "D:\c\2_%00d.png => %00d : all image"
		*/
	}

	public static function audio($input , $output , $format){
		self::setInput($input);
		$valid = self:: $sndFormat;
		$format = in_array($format,$valid) ? $format:$valid[0];
		if(!in_array(self::$fileExt,$valid)) die(self::$fileExt.' format is not valid for convert to ' .$format); 
		$fileName = pathinfo(basename($input), PATHINFO_FILENAME);
		$convert = new \_Helpers\convertor\media();
		$convert->convertMedia($input , $output.$fileName.'.'.$format);
	}

	public static function gif($input , $output , $format){
		self::setInput($input);
		$valid = self:: $gifFormat;
		$format = in_array($format,$valid) ? $format:$valid[0];
		if(!in_array(self::$fileExt,$valid)) die(self::$fileExt.' format is not valid for convert to ' .$format); 
		$fileName = pathinfo(basename($input), PATHINFO_FILENAME);
		$convert = new \_Helpers\convertor\media();
		$convert->convertMedia($input , $output.$fileName.'.'.$format);
	}

	public static function doc($input , $output , $format){
		self::setInput($input);
		$valid = self:: $docFormat;
		$format = in_array($format,$valid) ? $format:$valid[0];
		if(!in_array(self::$fileExt,$valid)) die(self::$fileExt.' format is not valid for convert to ' .$format);
		$office = new \_helpers\office();
		$office->convert($format , $output , $input);
	}

	public static function ppt(){
		
	}

	public static function xls(){
		
	}

	public static function image($exportFormat){
		$jpg = new \_helpers\htmltoimage();
		if(self::$fileExt == 'docx'){
			$pageUrl = 'http://localhost/bn2/word';
			$images = []; $page = 0;
			$fileName = time().$exportFormat;
			$filePath = '_Temp/convert/'.$fileName;
			$jpg->createImg($pageUrl,$filePath);
			$images[0] = $filePath;
			$this->image = $jpg->viewImage($images[0],$exportFormat);
		}
	}

	public static function pdf($input,$output="",$format){
		self::setInput($input);
		$valid = self:: $pdfFormat;
		$format = in_array($format,$valid) ? $format:$valid[0];
		if(self::$fileExt == 'html'){
			$htmltopdf = new \_Helpers\convertor\html();
			$htmltopdf->createPdf(self::$input,$output);
		}else{
			$office = new \_Helpers\convertor\office();
			$office->convert($format.':"writer_pdf_Export"' , $output , $input);
		}
	}

	public static function img($input, $output , $format = 'jpg'){
		self::setInput($input);
		$valid = self:: $jpgFormat;
		$format = in_array($format,$valid) ? $format:$valid[0];
		//if(!in_array(self::$fileExt,$valid)) die(self::$fileExt.' format is not valid for convert to ' .$format); 
		if(self::$fileExt == 'pdf' or self::$fileExt == 'png'){
			$pdftoimg = new \_Helpers\convertor\image($input);
			$pdftoimg->setOutputFormat($format);
			$result = $pdftoimg->saveAsImage($output);
			$_SESSION['listOfConvert'] = $result[count($result)-1];
		}
		if(self::$fileExt == 'docx' or self::$fileExt == 'xlsx' or self::$fileExt == 'pptx'){
			self::pdf($input, $output,'');
			$pdfPut = self::nameConv($input , 'pdf');
			self::img($output.$pdfPut , $output , '');
			unlink($output.$pdfPut);
		}
	}

	private static function fodt($input, $output){
		self::setInput($input);
		if(self::$fileExt == 'docx'){
			$office = new \_Helpers\convertor\office();
			$office->convert('fodt' , $output , $input);
		}
	}

	public static function html($input, $output , $format){
		self::setInput($input);
		$valid = self:: $htmFormat;
		$format = in_array($format,$valid) ? $format:$valid[0];
		if(in_array(self::$fileExt , self::$docFormat)){
			self::fodt($input, $output);
			$filename = pathinfo(basename($input), PATHINFO_FILENAME);
			$odt = file_get_contents($output.$filename.'.fodt');
			$odt = str_replace('<text:soft-page-break/>','page-break', $odt);

			$dom = new DomDocument();
		    $dom->loadXML($odt);
		    $xpath = new DomXPath($dom);
		    $math = $dom->getElementsByTagName("math");
		    foreach ($math as $key => $value) {
		    	$mather = $dom->saveXML($value);
		    	$frame = $value->parentNode->parentNode;
		    	$parent = $frame->parentNode;
		    	$parent->removeChild($frame);

		    	$after = new DOMText($mather);
		    	$elementS = $dom->createElement('text:span',$mather);
		    	$attr = $dom->createAttribute('text:style-name');
		    	$attr->value = 'Math';
		    	$elementS->appendChild($attr);
		    	$parent->appendChild($elementS);
		    }
			file_put_contents($output.$filename.'.fodt' ,$dom->saveXML($dom) );
			$office = new \_Helpers\convertor\office();
			$office->convert('html:HTML:EmbedImages' , $output , $output.$filename.'.fodt');
			unlink($output.$filename.'.fodt');
			$html = file_get_contents($output.$filename.'.'.$format);
			$html = htmlspecialchars_decode($html);
			$pageBreak = explode('page-break', $html);
			foreach ($pageBreak as $i => $page) {
				$fileHtml = fopen($output.$filename.'_'.$i.'.'.$format, 'w');
				fwrite($fileHtml, $page);
				fclose($fileHtml);
			}
			unlink($output.$filename.'.'.$format);
		}
		elseif(in_array(self::$fileExt , self::$xlsFormat)){
			$office = new \_Helpers\convertor\office();
			$office->convert($format , $output , $input);
		}
		elseif(in_array(self::$fileExt , self::$pptFormat)){
			self::pdf($input,$output,'');
			$pdfPut = self::nameConv($input , 'pdf');
			self::img($output.$pdfPut,$output,'');
			unlink($output.$pdfPut);
			$htmlFile = fopen($output.$pdfPut.'.'.$format, 'w');
			$i = 1;
			while (is_file($output.$pdfPut.$i.'.jpg')) {
				$im = file_get_contents($output.$pdfPut.$i.'.jpg');
        		$imdata = base64_encode($im);    
				$img = '<img src="data:image/jpeg-icon;base64,'.$imdata.'" /><br/>';
				fwrite($htmlFile, $img);
				unlink($output.$pdfPut.$i.'.jpg');
				$i++;
			}
			fclose($htmlFile);
		}elseif(in_array(self::$fileExt , self::$jpgFormat)){
			$imgPut = basename($input);
			$htmlFile = fopen($output.$imgPut.'.'.$format, 'w');
			$im = file_get_contents($input);
    		$imdata = base64_encode($im);    
			$img = '<img src="data:image/jpeg-icon;base64,'.$imdata.'" /><br/>';
			fwrite($htmlFile, $img);
		}elseif(in_array(self::$fileExt , self::$vidFormat)){
			self::video($input,$output,'');
			$basePut = self::nameConv($input , 'mp4');
			$htmlFile = fopen($output.$basePut.'.'.$format, 'w');
			$base = file_get_contents($output.$basePut);
			$basedata = base64_encode($base);    
			$video = '<video controls><source type="video/mp4" src="data:video/mp4;base64,'.$basedata.'"></source></video>';
			fwrite($htmlFile, $video);
		}
		elseif(in_array(self::$fileExt , self::$sndFormat)){
			self::audio($input,$output,'');
			$basePut = self::nameConv($input , 'mp3');
			$htmlFile = fopen($output.$basePut.'.'.$format, 'w');
			$base = file_get_contents($output.$basePut);
			$basedata = base64_encode($base);    
			$video = '<audio controls><source type="audio/mp3" src="data:audio/mp3;base64,'.$basedata.'"></source></audio>';
			fwrite($htmlFile, $video);
		}
	}

	public static function nameConv($dir , $format){
		return pathinfo(basename($dir), PATHINFO_FILENAME).'.'.$format;
	}

	
}
?>