<?php
namespace _Controllers\Telegram;
class atest{
    private $model;
	
	private $bot_id = '488759408:AAGzf-GgYBvos7pT9DA1YCtClConPEnm8JE';
	public $debug = "";
	public $telegram;
	public $chat_id; 
	public $Callback_id;
	
	private $cron;
	///////////////
		// usr:
	public $usr_st1 = "!Èå ÓÇãÇäå ÂÒãæä ÇäÏíÔãäÏ ÎæÔ ÂãÏíÏ";
	public $usr_st2 = "æÑæÏ ãÌÏÏ ÔãÇ ÑÇ Èå ÓÇãÇäå ÂÒãæä ÇäÏíÔãäÏ ÎæÔ ãí æííã!";
	public $usr_st3 = "ÌåÊ ÇÓÊÝÇÏå ÇÒ ÎÏãÇÊ ÓíÓÊã ãí ÈÇíÓÊ ÊæÓØ ˜áíÏ Çííä ËÈÊ äÇã ˜äíÏ!";
	public $usr_st4 = "ËÈÊ äÇã ÔãÇ ÏÑ ÓÇãÇäå ÈÇ ãæÝÞíÊ ÇäÌÇã ÔÏ";
	public $usr_st5 = "æÑæÏ ÔãÇ åãÑÇå ÈÇ áíä˜ ËÈÊ äÇã ÂÒãæä ÇÓÊ. ÂíÇ ãÇíá Èå ËÈÊ äÇã åÓÊíÏ¿";
	public $usr_st6 = "æÑæÏ ÔãÇ åãÑÇå ÈÇ áíä˜ ÔÑæÚ ÂÒãæä ÇÓÊ. ÂíÇ ãÇíá Èå ÔÑæÚ ÂÒãæä åÓÊíÏ¿";
	public $usr_st7 = "æÑæÏ ÔãÇ åãÑÇå ÈÇ áíä˜ ÏÑíÇÝÊ ˜ÇÑäÇãå ÇÓÊ. ÂíÇ ãÇíá Èå ÏÑíÇÝÊ ˜ÇÑäÇãå åÓÊíÏ¿";
	public $usr_st8 = "ÔãÇ ÏÑ ÒãÇä ÂÒãæä ÇÒ ÓÇãÇäå ÎÇÑÌ ÔÏíÏ ÂíÇ ãÇíá Èå ÇÏÇãå ÂÒãæä åÓÊíÏ¿";
	public $usr_st9 = "æÑæÏí ÔãÇ ãÚÈÊÑ äíÓÊ¡ ÂíÇ ãí ÎæÇåíÏ ÈÑÇí ãÏíÑíÊ ÓÇãÇäå ÇÑÓÇá ÈÝÑãÇííÏ¿";
	public $usr_st10 = "ÈÑÇí ÇÓÊÝÇÏå ÇÒ ÎÏãÇÊ ÓÇãÇäå í˜í ÇÒ ˜áíÏ åÇí ÒíÑ ÑÇ ÇäÊÎÇÈ ÝÑãÇííÏ";
		// reg;
	public $reg_st1 = "áØÝÇ Çíå ÊÍÕíáí ÑÇ ÇäÊÎÇÈ ÝÑãÇííÏ";
	public $reg_st2 = "áØÝÇ Ôíæå ÂÒãæä ãæÑÏ äÙÑ ÎæÏ ÑÇ ÇäÊÎÇÈ ÝÑãÇííÏ";
	public $reg_st3 = "áØÝÇ ÝÕá ãæÑÏ äÙÑ ÎæÏÑ ÇäÊÎÇÈ ÝÑãÇííÏ";
	public $reg_st4 = "áØÝÇ ÏÑÓ ãæÑÏ äÙÑ ÎæÏ ÑÇ ÇäÊÎÇÈ ÝÑãÇííÏ";
	public $reg_st5 = "áØÝÇ ÓØÍ ØÈÞå ÈäÏí ÓæÇáÇÊ ÑÇ ÇäÊÎÇÈ ÝÑãÇííÏ";
	public $reg_st6 = "ÇØáÇÚÇÊ ÂÒãæä ÏÑÎæÇÓÊí Èå Çíä ÔÑÍ ÇÓÊ:"."\r\n"."ÚäæÇä: #1#"."\r\n"."Ôíæå ÈÑÒÇÑí: #2#"."\r\n"."ÊÚÏÇÏ ÓæÇáÇÊ: #3#"."\r\n"."ãÏÊ ÇÓÎæíí: #4#"."\r\n". "åÒíäå ÂÒãæä: #5#";
	public $reg_st7 = "ÂíÇ ãÇíá Èå ËÈÊ äÇã ÏÑ Çíä ÂÒãæä åÓÊíÏ¿";
	
	public $reg_st9 = "ÏÑÍÇá ÍÇÖÑ Çíä ÂÒãæä ÛíÑ ÝÚÇá ãí ÈÇÔÏ";
	
		// pay:
	public $pay_st1 = "ÔÇÑŽ ˜íÝ æá ÔãÇ ÈÑÇÈÑ ÇÓÊ ÈÇ: "."\r\n"."ÔÇÑŽ åÏíå: #1# ÊæãÇä"."\r\n"."ÔÇÑŽ æÇÑíÒí: #2# ÊæãÇä"."\r\n"."ãÈáÛ ÂÒãæä ÇäÊÎÇÈí :#3# ÊæãÇä";
	public $pay_st2 = "áØÝÇ ãÈáÛ æÇÑíÒí ÑÇ ÇäÊÎÇÈ æ íÇ æÇÑÏ ÝÑãÇííÏ";
	public $pay_st3 = "áØÝÇ ˜Ï ÔÇÑŽ åÏíå íÇ ˜Ï ÊÎÝíÝ ÎæÏ ÑÇ æÇÑÏ ÝÑãÇííÏ";
	public $pay_st4 = "åÏíå ÓÇãÇäå ÂÒãæä ÇäÏíÔãäÏ ÈÇ ÚäæÇä #1# æ ãÈáÛ #2# Èå ˜íÝ æá ÔãÇ ÇÝÒæÏå ÔÏ";
	public $pay_st5 = "åÏíå ÊÎÝíÝ ÓÇãÇäå ÂÒãæä ÇäÏíÔãäÏ ÈÇ ÚäæÇä #1# ÈÑÇí ÔãÇ ãäÙæÑ ÑÏíÏ";
	public $pay_st6 = "ÈÑÇí ÑÏÇÎÊ ãÈáÛ #1# ÊæãÇä ÇÒ ÏÑÇå ÈÇä˜í ÇØãíäÇä ÏÇÑíÏ¿";
	public $pay_st7 = "ÔÇÑŽ ˜íÝ æá ÔãÇ ÇäÌÇã ÔÏ\r\n";
	public $pay_st8 = "ÂÒãæä ÇäÊÎÇÈí ÈÑÇí ÔãÇ ËÈÊ ÑÏíÏ";
	
		// tst
	public $tst_st1 = "áØÝÇ ÂÒãæä ãæÑÏ äÙÑ ÎæÏ ÑÇ ÇäÊÎÇÈ ÝÑãÇííÏ"."\r\n" . "ÊäåÇ ÂÒãæä åÇí ÂÒÇÏ æ íÇ ÂÒãæä åÇíí ˜å ÒãÇä ÈÑÒÇÑí ÂäåÇ ÝÑÇ ÑÓíÏå ÇÓÊ ÞÇÈá ÔÑæÚ ãí ÈÇÔäÏ";
	public $tst_st2 = "ÔãÇ ÏÑ åí ÂÒãæäí ËÈÊ äÇã ä˜ÑÏå ÇíÏ";
	public $tst_st3 = "ÒãÇä ÈÑÒÇÑí ÂÒãæä ÔãÇ ÈÇ ÇØáÇÚÇÊ ÒíÑ ÝÑÇ ÑÓíÏå ÇÓÊ";
	public $tst_st4 = "ÂÒãæä #1#"."\r\n"."ãæÇÑÏ ÂÒãæä: #2#"."\r\n"."ÊÚÏÇÏ ÓæÇáÇÊ: #3#"."\r\n"."ãÏÊ ÇÓÎæíí: #4#";
	public $tst_st5 = "ÈÑÇí ÔÑæÚ ÂÒãæä ÂãÇÏå ÇíÏ?";
	public $tst_st6 = "ÒãÇä ÈÑÒÇÑí ÂÒãæä ÝÑÇ äÑÓíÏå ÇÓÊ";
	public $tst_st7 = "ÒãÇä ÈÑÒÇÑí Çíä ÂÒãæä ÐÔÊå ÇÓÊ";
	public $tst_st8 = "ÓæÇá ÔãÇÑå #1# :";
	public $tst_st9 = "ãÏÊ ÂÒãæä ÔãÇ Èå ÇíÇä ÑÓíÏ ÈÑÇí ÊÕÍíÍ æ ãÔÇåÏå äÊÇíÌ ˜áíÏ ÇÊãÇã ÂÒãæä ÑÇ ÈÒäíÏ";
	public $tst_st10 = "ÓæÇáÇÊ ÔãÇ Èå ÇíÇä ÑÓíÏå ÇÓÊ. ÏÑÕæÑÊ ÇØãíäÇä ÇÒ ÇäÊÎÇÈ Òíäå åÇí ÕÍíÍ ˜áíÏ ÇÊãÇã ÂÒãæä ÑÇ ÈÒäíÏ";
	public $tst_st11 = "ÒãÇä ÈÇÞíãÇäÏå:#1#"."\r\n"."ÓæÇáÇÊ ÈÇÞíãÇäÏå :#2#";
	public $tst_st12 = "ÓæÇáÇÊ ÂÒãæä ÔãÇ ÊÕÍíÍ ÔÏ ";
	
	
		//res
	public $res_st1 = "áØÝÇ ÂÒãæä ãæÑÏ äÙÑ ÎæÏ ÑÇ ÇäÊÎÇÈ ÝÑãÇííÏ";
	public $res_st2 = "ÔãÇ ÊÇ ˜äæä ÏÑ åí ÂÒãæäí ÔÑ˜Ê ä˜ÑÏå ÇíÏ";
	public $res_st3 = "äÊÇíÌ ˜áí ÂÒãæä #1# Èå Çíä ÔÑÍ ÇÓÊ:"."\r\n"."Ôíæå ÈÑÒÇÑí: #2#"."\r\n"."ãÏÊ ÇÓÎæíí ÔãÇ: #3# ÇÒ #4#"."\r\n"."ÊÚÏÇÏ ÓæÇáÇÊ ÕÍíÍ: #5#"."\r\n"."ÊÚÏÇÏ ÓæÇáÇÊ Èí ÌæÇÈ: #6#"."\r\n"."ÊÚÏÇÏ ÓæÇáÇÊ ÇÔÊÈÇå: #7#"."\r\n"."ÊÚÏÇÏ ˜á ÓæÇáÇÊ: #8#"."\r\n"."ÏÑÕÏ ˜áí ÇÓÎæíí: #9#";
	public $res_st4 = "ÇÒ ØÑíÞ ˜áíÏ åÇí ÒíÑ ãí ÊæÇäíÏ ˜ÇÑäÇãå æ ÇØáÇÚÇÊ Ê˜ãíáí ÑÇ ÏÑíÇÝÊ ÝÑãÇííÏ";
	public $res_st5 = "áíä˜ ãÔÇåÏå æ ÏÑíÇÝÊ ˜ÇÑäÇãå"."\r\n" . "#1#";
	public $res_st6 = "áíä˜ ãÔÇåÏå æ ÏÑíÇÝÊ ÇÓÎ ÊÔÑíÍí ÂÒãæä"."\r\n" . "#1#";
	public $res_st7 = "ÇÓÎ ÊÔÑíÍí ÈÑÇí Çíä ÂÒãæä ËÈÊ äÔÏå ÇÓÊ";
	//keyboards
		//usr
	public $usr_kb1 = "ËÈÊ äÇã";
		//reg
	public $reg_kb1 = "ËÈÊ äÇã ÂÒãæä";
	public $reg_kb2 = "ÔÑæÚ ÂÒãæä";
	public $reg_kb3 = "ÏÑíÇÝÊ ˜ÇÑäÇãå";
		
		//tst
	public $tst_kb1 = "ÓæÇá ÈÚÏ";
	public $tst_kb2 = "ÇÊãÇã æ ÊÕÍíÍ ÂÒãæä ";
	public $tst_kb3 = "æÖÚíÊ ÂÒãæä";
		//res
	public $res_kb1 = "ÇÓÎ åÇí ÊÔÑíÍí";
	public $res_kb2 = "˜ÇÑäÇãå ÝÑÏí";
	public $res_kb3 = "˜ÇÑäÇãå ÌãÚí";
	public $res_kb4 = "ÈÇÒÔÊ";
	//inline 
		//usr
	public $usr_in1 = "ÇäÕÑÇÝ|ÊÇííÏ";
	public $usr_im1 = [[0,1]];
	public $usr_in2 = "ËÈÊ Èå ÚäæÇä äÙÑÇÊ";
	public $usr_im2 = [[]];
		//reg
	public $reg_in1 = "Ïæã|Çæá||åÇÑã|Óæã||ÔÔã|äÌã"."||"."ÇäÕÑÇÝ";
	public $reg_im1 = [[2,1],[4,3],[6,5],["cancle"]];
	public $reg_in2 = "ÂÒãæä ÝÑÏí ÂÒÇÏ|ÂÒãæä åãÇåä"."||"."ÇäÕÑÇÝ"."|ãÑÍáå ÞÈá";
	public $reg_im2 = [[1,2],["cancle","return"]];
	public $reg_in3 = "Ïæã|Çæá||åÇÑã|Óæã||ÔÔã|äÌã||åÔÊã|åÝÊã"."||"."ÇäÕÑÇÝ"."|ãÑÍáå ÞÈá";
	public $reg_im3 = [[2,1],[4,3],[6,5],[8,7],["cancle","return"]];
	public $reg_in4 = "ÑíÇÖí|Úáæã"."||"."ÇäÕÑÇÝ"."|ãÑÍáå ÞÈá";
	public $reg_im4 = [[1,2],["cancle","return"]];
	public $reg_in5 = "ÓÇÏå|ãÊæÓØ|íÔÑÝÊå"."||"."ÇäÕÑÇÝ"."|ãÑÍáå ÞÈá";
	public $reg_im5 = [[1,2,3],["cancle","return"]];
	public $reg_in6 = "ÇäÕÑÇÝ|ÊÇííÏ";
	public $reg_im6 = [["cancle","ok"]];
	
		//pay
			//pay
	public $pay_in0 = "ÑÏÇÎÊ ÈÇä˜í"."|"
	 				  ."ÑÏÇÎÊ ÈÇ ˜íÝ æá"."||"
	 				  ."ÔÇÑŽ ˜íÝ æá"."|"
	 				  ."ÇäÕÑÇÝ";
	public $pay_im0 = [["bank","wallet"],["charge","cancle"]];
	public $pay_in1 = "ÈÇÒÔÊ|ÊÇííÏ";
	public $pay_im1 = [["return","ok"]];
	public $pay_in2 = "1000ÊæãÇä|2000ÊæãÇä||5000ÊæãÇä|10000ÊæãÇä"."||"
					// ."ÓÇíÑ ãÈÇáÛ"."|"." æÑæÏ ˜Ï ÔÇÑŽ åÏíå"."||"
					 ."ÈÇÒÔÊ";
	public $pay_im2 = [[1000,2000],[5000,10000]/*,[0,"cod"]*/,["return"]];
		//tst
	public $tst_in0 = "?? 4??|?? 3??|?? 2??|?? 1??";
	public $tst_im0 = [[4,3,2,1]];
	public $tst_in1 = "?? 4??|?? 3??|?? 2??|?? 1??";
	public $tst_im1 = [[4,3,2,1]];
	public $tst_in2 = "?? 4??|?? 3??|?? 2??|?? 1??";
	public $tst_im2 = [[4,3,2,1]];
	public $tst_in3 = "?? 4??|?? 3??|?? 2??|?? 1??";
	public $tst_im3 = [[4,3,2,1]];
	public $tst_in4 = "?? 4??|?? 3??|?? 2??|?? 1??";
	public $tst_im4 = [[4,3,2,1]];
	public $tst_in5 = "ÇäÕÑÇÝ|ÊÇííÏ";
	public $tst_im5 = [[0,1]];
	//alerts
		//usr
	public $usr_al1 = "ÔãÇ åäæÒ ÏÑ ÓÇãÇäå ËÈÊ äÇã ä˜ÑÏå ÇíÏ!";
	public $usr_al2 = "äÙÑ ÔãÇ ÈÇ ãæÝÞíÊ ËÈÊ ÔÏ!";
	public $usr_al3 = "Çíä Úãá˜ÑÏ ËÈÊ äÔÏå ÇÓÊ";
		//reg
	public $reg_al1 = "åí ÂÒãæä åãÇåäí ÏÑ ÍÇá ÍÇÖÑ ÊÚÑíÝ äÔÏå ÇÓÊ";
	public $reg_al2 = "ÌåÊ Ê˜ãíá ËÈÊ äÇã ãí ÈÇíÓÊ åÒíäå ÂÒãæä ÑÏÇÎÊ ÑÏÏ.";
		//pay
	public $pay_al0 = "ÇäÕÑÇÝ ÇÒ ÑÏÇÎÊ æ ËÈÊ äÇã";
	public $pay_al1 = "ãÈáÛ ÂŽãæä ÇÒ ˜íÝ æá ÔãÇ ˜ÓÑ ÑÏíÏ";
	public $pay_al2 = "ÔÇÑŽ ˜íÝ æá ÔãÇ ˜ÇÝí äíÓÊ";
		//tst 
	public $tst_al1 = "ÂÒãæä ÔãÇ ÂÛÇÒ ÔÏ. ãæÝÞ ÈÇÔíÏ!";
	public $tst_al2 = "ÇÓÎ ÔãÇ ËÈÊ ÔÏ";
	public $tst_al3 = "Çíä ÂÒãæä Èå ÇÊãÇã ÑÓíÏå ÇÓÊ";
	public $tst_al4 = "Çíä ÂÒãæä ÏÑ ÍÇá ÍÇÖÑ ÝÚÇá äíÓÊ";
		//res
	public $res_al1 = "ÏÑíÇÝÊ ˜ÇÑäÇãå ˜áí ÏÑ ÂÒãæä åÇí åãÇåä ÈÚÏ ÇÒ ÊÕÍíÍ åãå ÔÑ˜Ê ˜ääÏÇä Çã˜Çä ÐíÑ ãí ÈÇÔÏ";
	
	
	
    public  function __construct    ($model){
		$this->model = $model;
		
		//$this->cron = new \_Helpers\Cron(__FILE__);
		//$cron->setTimeout("hello",1,12345);
		$this->jdate = new \_Helpers\jdatetime(true, true, 'Asia/Tehran');
		//echo $this->jdate->date('y/m/d');
		$telegram  = new \_Helpers\Telegram($this->bot_id);
		$this->telegram = $telegram;
//		echo 'pre';
//		ignore_user_abort(true);
//		header("Content-Length: 0");
//		header("Connection: Close");
//		flush();
//		session_write_close();
		$chat_id = $this->chat_id = $telegram->ChatID();
		$isCallback = $chat_id?false:true;
		if(@ $_GET['calc_exam']){
			echo 1;
			$this->model->model_17($_GET['calc_exam']);
			//echo 2 .p;

			$res = $this->model->model_17_1($_GET['calc_exam']);
			
			for($i=0;$i<count($res);$i++){	

				$info = "˜ÇÑäÇãå ÂÒãæä ";
				$info .= $res[$i]["name"]."\n";
				$info .= "ÊÇÑíÎ ".$this->jdate->date("y/m/d",strtotime($res[$i]["start_time"]) );
				$this->chat_id = $res[$i]["_user"];
				$this->sendMessage($info,"");
				$this->res_pdf($_GET['calc_exam'],$res[$i]["_user"]);
				//$this->sendMessage($res[$i]["workbook"]);
				/*$this->sendMessage("","",$res[$i]["workbook"],false,true);*/
			}
		}
		if(@ $_GET['resend']){
			$res = $this->model->model_17_1($_GET['resend']);
			for($i=0;$i<count($res);$i++){
				$info = "˜ÇÑäÇãå ÂÒãæä";
				$info .= $res[$i]["name"]."\n";
				$info .= "ÊÇÑíÎ ".$this->jdate->date("y/m/d",strtotime($res[$i]["start_time"]) );
				$this->chat_id = $res[$i]["_user"];
				$this->sendMessage($info,"");
				$this->sendMessage("","",$res[$i]["workbook"],false,true);
			}
		}
		if($isCallback){
			$Text        = $telegram->Callback_Data();
			$chat_id     = $this->chat_id = $telegram->Callback_ChatID();
			$Callback_Query = $telegram->Callback_Query();
			$Callback_id = $this->Callback_id = $Callback_Query["id"];
			$MessageID   = $Callback_Query["message"]["message_id"];
			$MessageText = $Callback_Query["message"]["text"];
			$Text = explode(":",$Text.":");
			switch($Text[0]){
				case "com":
					$this->answerCallback($this->usr_al2);
					$this->deleteMessage($MessageID);
					$model->model_19($chat_id,$Text[1],"62823766");
					$ret = $this->forwardMessage($Text[2],"62823766");//ok
					//$this->sendMessage(json_encode($ret));
				break ;
				case "tst":
					$this->tst_home($MessageID,$Text);
				break ;
				case "res":
					$this->res_home($MessageID,$Text);
				break ;
				default:
					if($Text) $this->answerCallback($this->usr_al3.":".implode(":",$Text));
			}
		}
		else{
			$MessageID   = $telegram->MessageID();
			$Text        = $telegram->Text();
			$FirstName   = $telegram->FirstName();
			$LastName    = $telegram->LastName();
			$Username    = $telegram->Username();
			$phone       = $telegram->phone();
			$isReg =  (int)$model->model_1($chat_id);//ok
			if(substr($Text,0,6) == "/start"){
				$startmod = true;
				$this->usr_start($isReg);
			}
				if(!$isReg && $phone==""){
					$this->sendMessage($this->usr_st3,$this->keyboard([[$this->usr_kb1]],true));
				}elseif($phone!=""){
					$this->sendMessage("ËÈÊ äÇã ÔãÇ ÈÇ ãæÝÞíÊ ÇäÌÇã ÑÏíÏ" ,'{"hide_keyboard":true}');
					$this->usr_home($MessageID,$Text);
					$model->model_2($FirstName, $LastName, $Username, $chat_id, $phone);//ok
				}elseif(!$startmod){
					$in = $this->inline($this->usr_in2,[["com:$Text:$MessageID"]]);
					$this->sendMessage($this->usr_st9,$in);
				}
			

				
		}
		
    }

    public  function usr_start      ($isReg=0) {
		if(!$isReg){
			$this->sendMessage($this->usr_st1);
		}else{
			$this->sendMessage($this->usr_st2);
			$this->usr_home();
		}
    } 
	public  function usr_home       ($MessageID="",$Text="",$return=false) {
		$key = $this->inline($this->reg_kb3."|".$this->reg_kb2,[["res","tst"]]);
		if($return){
			$this->editMessage($MessageID,$this->usr_st10,$key);
		}else{
			$this->sendMessage($this->usr_st10,$key);
		}
    }
	public  function res_home       ($MessageID,$Text){
		switch($Text[1]){
			case "":
				$list  =  $this->model->model_12($this->chat_id);
				$names =[];
				$ids = [];
				//$list = [1];
				for($i=0;$i<count($list);$i++){
					$names[$i] = [$list[$i]["name"]." ÊÇÑíÎ ".$this->jdate->date("y/m/d",strtotime($list[$i]["start_time"]) )];
					$ids[$i] = [$list[$i]["status"].":".$list[$i]["exam_user"]];
				}
				if(count($list)>0){
					array_push($names,["ÈÇÒÔÊ"]);
					array_push($ids,["return"]);
					$this->editMessage($MessageID,$this->res_st1,$this->inline($names,$ids,"res:"));
				}else{
					$this->answerCallback($this->res_st2);
				}
			break;
			case "2"://personal
				$this->deleteMessage($MessageID);
				$this->res_personal($MessageID,$Text);
			break;
			case "3"://final
				$this->res_final($MessageID,$Text);
			break;
			case "return":
				$this->usr_home($MessageID,$Text,true);
			break;
			default:
				$this->answerCallback(implode(":",$Text));
		}
		
	
    }
	public  function res_personal   ($MessageID,$Text){
		$exam = $Text[2];
		$res = $this->model->model_11($exam);
		$rest = "äÊÇíÌ Çæáíå ÂÒãæä  ÔãÇ Èå Çíä ÔÑÍ ÇÓÊ"."\n";
		for($i=0;$i<count($res);$i++){
			$dars= substr(($res[$i]["name"]."             "),0,20);
			$c   = substr(((int)$res[$i]["correct"  ]+"  "),0,3);
			$x   = substr(((int)$res[$i]["x"        ]+"  "),0,3);
			$n   = substr(((int)$res[$i]["incorrect"]+"  "),0,3);
			$p   = substr(((int)$res[$i]["percent"  ]+"  "),0,3);
			$rest .= substr($dars,0,20).":$p% ?ÕÍíÍ:$c ??ÛáØ:$n ??äÒÏå:$x \n";
		}
		$this->sendMessage($rest."\r\n.");
		$this->usr_home($MessageID,$Text);
	}
	public  function res_final      ($MessageID,$Text){
		$exam = $Text[2];
		$res = $this->model->model_13($exam);
		$this->deleteMessage($MessageID);
		$this->answerCallback("˜ÇÑäÇãå äåÇíí ÔãÇ Èå ÒæÏí ÈÑÇí ÔãÇ ÇÑÓÇá ãí ÑÏÏ.");
		
		$this->sendMessage($res,"",$res,false,true);
		$this->usr_home();
	}
	public function res_pdf         ($_exam,$_user){
		/*$input = ['http://forushy.com/workbook'];
        $dir = "_Temp/user_exam";
        $options = '';
		$glob = new \_Helpers\glob($input);
		$glob->batch('convertor::pdf',$glob->files,$dir,$glob->dirs);*/
		$pdf = 'http://andishmand.net/workbook?user-id='.$_user.'&azmon-id='.$_exam;
		$this->sendMessage($pdf);
		//$this->model->model_17_2($_exam,$_user,$pdf);
	}
	public  function tst_home       ($MessageID,$Text){
		switch($Text[1]){
			case "":
				$exam = $this->model->model_4($this->chat_id);//ok
				if (count($exam)==0){
					$info = "ÏÑÍÇá ÍÇÖÑ ÂÒãæä ÝÚÇáí ÊÚÑíÝ äÔÏå ÇÓÊ";
					$this->answerCallback($info);
				}else if(strtotime($exam[0]["start_time"]) < time()){
					$names = [["ÔÑæÚ ÂÒãæä","ÇäÕÑÇÝ"]];
					$next =  $exam[0]["showcount"]+1;//info
					$name =  $exam[0]["name"];
					$exam_item = $exam[0]["_exam_item"];
					$items = $this->model->model_4_1($exam_item);//ok
					$dur   = $items[0]["duration"];
					$total = $items[0]["count"];
					$parts = $items[0]["parts"];
					$users = $this->model->model_4_2($exam_item);
					$ids = [["start:$exam_item:$next:0:1:$total:$dur:0","return"]];
					$info  = $this->tst_st3."\n";
					$info  = "ÂÒãæä $name"."\n"
							."ãæÇÑÏ ÂÒãæä: $parts"."\r\n"
							."ÊÚÏÇÏ ÓæÇáÇÊ: $total"."\r\n"
							."ãÏÊ ÇÓÎæíí:$dur"."\r\n"	
							."ÊÚÏÇÏ ËÈÊ äÇã ˜ääÏÇä: $users"."\r\n.\r\n";
					$this->editMessage($MessageID,$info,$this->inline($names,$ids,"tst:"));
				}else{
					$info = "ÒãÇä ÔÑæÚ ÂÒãæä ÈÚÏí : "
						.$this->jdate->date("y/m/d",strtotime($exam[0]["start_time"]) )."\n";
					$this->answerCallback($info,true);
				}
			break;
			case "return":
				$this->usr_home($MessageID,$Text,true);
			break;
			case "start":
				$res = $this->model->model_5($this->chat_id,$Text[2]);
				$Text[2] = $res[0];
				$Text[7] -= $res[1];//update duration from spent time
				$Text[8] = $this->now();
				$this->tst_start($MessageID,$Text,$Text[3],true);
			break;
			case "next":
				$this->tst_start($MessageID,$Text,$Text[3]+1);
			break;
			case "finish":
				$this->tst_end($MessageID,$Text);
			break;
			case "status":
				$this->tst_status($MessageID,$Text);
			break;
			case "opt":
				$this->tst_opt($MessageID,$Text);
			break;
			default:
				$this->answerCallback(implode(":",$Text));
		}
    }
	public  function tst_start      ($MessageID,$Text,$next,$first=false) {
		$exam  = $Text[2];
		$num   = $Text[3];
		$key   = $Text[4];
		$control=$Text[5];
		$total = $Text[6];
		$dur   = $Text[7];
		$start = $Text[8];
		$question = $this->model->model_7($exam,$next);
		if($question==false) return false;
		$cap = "ÓæÇá ÔãÇÑå ".$next;
		if($first){
				$this->answerCallback("ÂÒãæä ÔãÇ ÂÛÇÒ ÑÏíÏ¡ ãæÝÞ ÈÇÔíÏ!");
				$this->editMessage($MessageID,"","");
		}else{
			if($next>$total){
				$this->answerCallback("ÓæÇáÇÊ ÔãÇ Èå ÇÊãÇã ÑÓíÏå ÇÓÊ!");
				return false;
			}else if(($this->now()-$start) > $dur){
				$this->answerCallback("ÒãÇä ÂÒãæä Èå ÇíÇä ÑÓíÏå ÇÓÊ!");
				$this->tst_end($MessageID,$Text);
				return false;
			}else{
				$this->editMessage($MessageID,"",$this->tst_keys($exam,$num,$key,0,$total,$dur,$start));
			}
		}
		
		 $ret = $this->sendMessage($cap,$this->tst_keys($exam,$next,0,1,$total,$dur,$start),$question);
		 $this->model->model_6($exam,$next,$ret['result']['message_id']);
	}
	public  function tst_opt        ($MessageID,$Text){
			$exam  = $Text[2];
			$num   = $Text[3];
			$key   = $Text[4];
			$control=$Text[5];
			$total = $Text[6];
			$dur   = $Text[7];
			$start = $Text[8];
			$this->answerCallback("ÌæÇÈ ÔãÇ ËÈÊ ÑÏíÏ");
			$this->editMessage($MessageID,"",$this->tst_keys($exam,$num,$key,$control,$total,$dur,$start));
			$this->model->model_8($exam,$num,$key);
	}
	public  function tst_status     ($MessageID,$Text){
			$exam  = $Text[2];
			$num   = $Text[3];
			$key   = $Text[4];
			$control=$Text[5];
			$total = $Text[6];
			$dur   = $Text[7];
			$start = $Text[8];
			$status  = "ÒãÇä ÈÇÞíãÇäÏå:".($dur-(int)($this->now()-(int)($start)))."ÏÞíÞå - "; 
			$status .= "ÓæÇáÇÊ ÈÇÞíãÇäÏå:".($total-$num);	
			$this->answerCallback($status,true);
	}
	public  function tst_end        ($MessageID,$Text){
		$exam  = $Text[2];
		$num   = $Text[3];
		$key   = $Text[4];
		$control=$Text[5];
		$total = $Text[6];
		$dur   = $Text[7];
		$start = $Text[8];
		$this->model->model_9($exam);
		$res = $this->model->model_10($exam);
		for($i=0;$i<count($res);$i++){
			$this->editMessage($res[$i]['msgId'],"",$this->ans_keys($res[$i]['real_answer'],$res[$i]['user_answer']));
		}
		$this->answerCallback("ÂÒãæä ÔãÇ Èå ÇÊãÇã ÑÓíÏ¡ ÎÓÊå äÈÇÔíÏ!");
		$this->res_personal($MessageID,$Text);
	}
	private function tst_keys       ($exam,$num,$key,$control,$total,$dur,$start){
		$ins = [$this->tst_in0,$this->tst_in1,$this->tst_in2,$this->tst_in3,$this->tst_in4];
		$in = $ins[$key];
		$im = [["opt:$exam:$num:4:$control:$total:$dur:$start","opt:$exam:$num:3:$control:$total:$dur:$start","opt:$exam:$num:2:$control:$total:$dur:$start","opt:$exam:$num:1:$control:$total:$dur:$start"]];
		if($control){
			$in .="||";
			$in	.="? ÓæÇá ÈÚÏ"."|";
			$in	.="? ÇÊãÇã ÂÒãæä"."|";
			$in	.="?? "."æÖÚíÊ ÂÒãæä"."|";
			array_push($im,["next:$exam:$num:$key:1:$total:$dur:$start","finish:$exam:$num:$key:1:$total:$dur:$start","status:$exam:$num:$key:1:$total:$dur:$start"]);
		}
		return $this->inline($in,$im,"tst:");
	}
	private function ans_keys       ($cor,$ans){
		$in = [explode("|",$this->tst_in0)];
		$num = ["4??","3??","2??","1??"];
		if($ans!=0) {
			$in[0][4-$ans] = "?? ".$num[4-$ans];
			$in[0][4-$cor] = "? ".$num[4-$cor];
		}else{
			$in[0][4-$cor] = "?? ".$num[4-$cor];
		}
		$im = [["4","3","2","1"]];
		return $this->inline($in,$im,"ans:");
	}
	/////primery functions
	private function inline         ($in,$data=[[]],$pre="",$aft="",$url=[[]]) {
		$telegram = $this->telegram;
		if (gettype($in)=="string"){
		$in = explode("||",$in);for($i=0;$i<count($in);$i++) $in[$i] = explode("|",$in[$i]);
		}
		$keyboard = [[]];
		for($i=0;$i<count($in);$i++){
			for($j=0;$j<count($in[$i]);$j++){
				$reply_mar = $telegram->buildInlineKeyboardButton($in[$i][$j]);
				$reply_mar['callback_data'] = $pre.$data[$i][$j].$aft;
				if($url[$i][$j]) $reply_mar['url'] = $url[$i][$j];
				$keyboard[$i][$j] = $reply_mar;
			}
		}
		return $telegram->buildInlineKeyBoard($keyboard);
    }
	private function keyboard       ($_kb=[[]],$usr=false){
		$telegram = $this->telegram;
		$keyboard =  array(array());
		for($i=0;$i<count($_kb);$i++){
			for($j=0;$j<count($_kb[$i]);$j++){
				$reply_mar = $telegram->buildKeyboardButton($_kb[$i][$j],$usr,false);
				$keyboard[$i][$j] = $reply_mar;
			}
		}
		return $telegram->buildKeyBoard($keyboard, false , true , true);
    }
	private function buildForceReply(){
		$telegram = $this->telegram;
		return $telegram->buildForceReply();
	}
	private function answerCallback ($reply,$alert=false){
			$telegram = $this->telegram;
			$content = array('callback_query_id'=>$this->Callback_id , 'text' => $reply);
		if($alert){
			$content['show_alert'] = true;
			
		}
			$telegram->answerCallbackQuery($content);	
		}
	private function sendMessage ($reply,$reply_markup="",$attach="",$hasfile=false,$asddoc=false){
		$telegram = $this->telegram;
		$content = array('chat_id' => $this->chat_id);
		if($reply_markup!="") $content['reply_markup'] = $reply_markup;
		if($attach==""){
			$content['text']=$reply;
			$telegram->sendMessage($content);
		}else if ($asddoc==true){
			if($hasfile){
				$content['hasfile'] = true;
				$content['document'] = new CURLFile(realpath($attach),'pdf/pdf');
			}else{
				$content['document'] = $attach;
			}
			$telegram->sendDocument($content);
		}
		else{
			$content['caption']=$reply;
			if($hasfile){
				$content['hasfile'] = true;
				$content['photo'] = new CURLFile(realpath($attach),'image/jpeg');
			}else{
				$content['photo'] = $attach;
			}
			return $telegram->sendPhoto($content);//["result"]["photo"][2]["file_id"];
		}
	}
	private function editMessage    ($msgid,$reply="",$reply_markup=""){
		$telegram = $this->telegram;
		$content = array('chat_id' => $this->chat_id,'message_id'=>$msgid);
		if($reply !=""){
			$content["text"] = $reply;
			if($reply_markup!="") {$content['reply_markup'] = $reply_markup;}
			$telegram->editMessageText($content);
		}else{
			$content['reply_markup'] = $reply_markup;
			return $telegram->editMessageReplyMarkup($content);
		}
	}
	private function deleteMessage  ($msgid){
		$telegram = $this->telegram;
		$content = array('chat_id' => $this->chat_id,'message_id'=>$msgid);
		$telegram->deleteMessage($content);
	}
	private function forwardMessage ($msgid,$to){
		$telegram = $this->telegram;
		$content = array('from_chat_id' => $this->chat_id,'chat_id' => $to,'message_id'=>$msgid);
		return $telegram->forwardMessage($content);
	}
	private function now            (){
  	  $date = date('h:i');
      $exp = explode(':', $date);
      return $exp[0]*60 + $exp[1];
    }
}
