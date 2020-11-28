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
	public $usr_st1 = "!»Â ”«„«‰Â ¬“„Ê‰ «‰œÌ‘„‰œ ŒÊ‘ ¬„œÌœ";
	public $usr_st2 = "Ê—Êœ „Ãœœ ‘„« —« »Â ”«„«‰Â ¬“„Ê‰ «‰œÌ‘„‰œ ŒÊ‘ „Ì êÊÌÌ„!";
	public $usr_st3 = "ÃÂ  «” ›«œÂ «“ Œœ„«  ”Ì” „ „Ì »«Ì”   Ê”ÿ ò·Ìœ Å«ÌÌ‰ À»  ‰«„ ò‰Ìœ!";
	public $usr_st4 = "À»  ‰«„ ‘„« œ— ”«„«‰Â »« „Ê›ﬁÌ  «‰Ã«„ ‘œ";
	public $usr_st5 = "Ê—Êœ ‘„« Â„—«Â »« ·Ì‰ò À»  ‰«„ ¬“„Ê‰ «” . ¬Ì« „«Ì· »Â À»  ‰«„ Â” Ìœø";
	public $usr_st6 = "Ê—Êœ ‘„« Â„—«Â »« ·Ì‰ò ‘—Ê⁄ ¬“„Ê‰ «” . ¬Ì« „«Ì· »Â ‘—Ê⁄ ¬“„Ê‰ Â” Ìœø";
	public $usr_st7 = "Ê—Êœ ‘„« Â„—«Â »« ·Ì‰ò œ—Ì«›  ò«—‰«„Â «” . ¬Ì« „«Ì· »Â œ—Ì«›  ò«—‰«„Â Â” Ìœø";
	public $usr_st8 = "‘„« œ— “„«‰ ¬“„Ê‰ «“ ”«„«‰Â Œ«—Ã ‘œÌœ ¬Ì« „«Ì· »Â «œ«„Â ¬“„Ê‰ Â” Ìœø";
	public $usr_st9 = "Ê—ÊœÌ ‘„« „⁄» — ‰Ì” ° ¬Ì« „Ì ŒÊ«ÂÌœ »—«Ì „œÌ—Ì  ”«„«‰Â «—”«· »›—„«ÌÌœø";
	public $usr_st10 = "»—«Ì «” ›«œÂ «“ Œœ„«  ”«„«‰Â ÌòÌ «“ ò·Ìœ Â«Ì “Ì— —« «‰ Œ«» ›—„«ÌÌœ";
		// reg;
	public $reg_st1 = "·ÿ›« Å«ÌÂ  Õ’Ì·Ì —« «‰ Œ«» ›—„«ÌÌœ";
	public $reg_st2 = "·ÿ›« ‘ÌÊÂ ¬“„Ê‰ „Ê—œ ‰Ÿ— ŒÊœ —« «‰ Œ«» ›—„«ÌÌœ";
	public $reg_st3 = "·ÿ›« ›’· „Ê—œ ‰Ÿ— ŒÊœ— «‰ Œ«» ›—„«ÌÌœ";
	public $reg_st4 = "·ÿ›« œ—” „Ê—œ ‰Ÿ— ŒÊœ —« «‰ Œ«» ›—„«ÌÌœ";
	public $reg_st5 = "·ÿ›« ”ÿÕ ÿ»ﬁÂ »‰œÌ ”Ê«·«  —« «‰ Œ«» ›—„«ÌÌœ";
	public $reg_st6 = "«ÿ·«⁄«  ¬“„Ê‰ œ—ŒÊ«” Ì »Â «Ì‰ ‘—Õ «” :"."\r\n"."⁄‰Ê«‰: #1#"."\r\n"."‘ÌÊÂ »—ê“«—Ì: #2#"."\r\n"." ⁄œ«œ ”Ê«·« : #3#"."\r\n"."„œ  Å«”ŒêÊÌÌ: #4#"."\r\n". "Â“Ì‰Â ¬“„Ê‰: #5#";
	public $reg_st7 = "¬Ì« „«Ì· »Â À»  ‰«„ œ— «Ì‰ ¬“„Ê‰ Â” Ìœø";
	
	public $reg_st9 = "œ—Õ«· Õ«÷— «Ì‰ ¬“„Ê‰ €Ì— ›⁄«· „Ì »«‘œ";
	
		// pay:
	public $pay_st1 = "‘«—é òÌ› ÅÊ· ‘„« »—«»— «”  »«: "."\r\n"."‘«—é ÂœÌÂ: #1#  Ê„«‰"."\r\n"."‘«—é Ê«—Ì“Ì: #2#  Ê„«‰"."\r\n"."„»·€ ¬“„Ê‰ «‰ Œ«»Ì :#3#  Ê„«‰";
	public $pay_st2 = "·ÿ›« „»·€ Ê«—Ì“Ì —« «‰ Œ«» Ê Ì« Ê«—œ ›—„«ÌÌœ";
	public $pay_st3 = "·ÿ›« òœ ‘«—é ÂœÌÂ Ì« òœ  Œ›Ì› ŒÊœ —« Ê«—œ ›—„«ÌÌœ";
	public $pay_st4 = "ÂœÌÂ ”«„«‰Â ¬“„Ê‰ «‰œÌ‘„‰œ »« ⁄‰Ê«‰ #1# Ê „»·€ #2# »Â òÌ› ÅÊ· ‘„« «›“ÊœÂ ‘œ";
	public $pay_st5 = "ÂœÌÂ  Œ›Ì› ”«„«‰Â ¬“„Ê‰ «‰œÌ‘„‰œ »« ⁄‰Ê«‰ #1# »—«Ì ‘„« „‰ŸÊ— ê—œÌœ";
	public $pay_st6 = "»—«Ì Å—œ«Œ  „»·€ #1#  Ê„«‰ «“ œ—ê«Â »«‰òÌ «ÿ„Ì‰«‰ œ«—Ìœø";
	public $pay_st7 = "‘«—é òÌ› ÅÊ· ‘„« «‰Ã«„ ‘œ\r\n";
	public $pay_st8 = "¬“„Ê‰ «‰ Œ«»Ì »—«Ì ‘„« À»  ê—œÌœ";
	
		// tst
	public $tst_st1 = "·ÿ›« ¬“„Ê‰ „Ê—œ ‰Ÿ— ŒÊœ —« «‰ Œ«» ›—„«ÌÌœ"."\r\n" . " ‰Â« ¬“„Ê‰ Â«Ì ¬“«œ Ê Ì« ¬“„Ê‰ Â«ÌÌ òÂ “„«‰ »—ê“«—Ì ¬‰Â« ›—« —”ÌœÂ «”  ﬁ«»· ‘—Ê⁄ „Ì »«‘‰œ";
	public $tst_st2 = "‘„« œ— ÂÌç ¬“„Ê‰Ì À»  ‰«„ ‰ò—œÂ «Ìœ";
	public $tst_st3 = "“„«‰ »—ê“«—Ì ¬“„Ê‰ ‘„« »« «ÿ·«⁄«  “Ì— ›—« —”ÌœÂ «” ";
	public $tst_st4 = "¬“„Ê‰ #1#"."\r\n"."„Ê«—œ ¬“„Ê‰: #2#"."\r\n"." ⁄œ«œ ”Ê«·« : #3#"."\r\n"."„œ  Å«”ŒêÊÌÌ: #4#";
	public $tst_st5 = "»—«Ì ‘—Ê⁄ ¬“„Ê‰ ¬„«œÂ «Ìœ?";
	public $tst_st6 = "“„«‰ »—ê“«—Ì ¬“„Ê‰ ›—« ‰—”ÌœÂ «” ";
	public $tst_st7 = "“„«‰ »—ê“«—Ì «Ì‰ ¬“„Ê‰ ê–‘ Â «” ";
	public $tst_st8 = "”Ê«· ‘„«—Â #1# :";
	public $tst_st9 = "„œ  ¬“„Ê‰ ‘„« »Â Å«Ì«‰ —”Ìœ »—«Ì  ’ÕÌÕ Ê „‘«ÂœÂ ‰ «ÌÃ ò·Ìœ « „«„ ¬“„Ê‰ —« »“‰Ìœ";
	public $tst_st10 = "”Ê«·«  ‘„« »Â Å«Ì«‰ —”ÌœÂ «” . œ—’Ê—  «ÿ„Ì‰«‰ «“ «‰ Œ«» ê“Ì‰Â Â«Ì ’ÕÌÕ ò·Ìœ « „«„ ¬“„Ê‰ —« »“‰Ìœ";
	public $tst_st11 = "“„«‰ »«ﬁÌ„«‰œÂ:#1#"."\r\n"."”Ê«·«  »«ﬁÌ„«‰œÂ :#2#";
	public $tst_st12 = "”Ê«·«  ¬“„Ê‰ ‘„«  ’ÕÌÕ ‘œ ";
	
	
		//res
	public $res_st1 = "·ÿ›« ¬“„Ê‰ „Ê—œ ‰Ÿ— ŒÊœ —« «‰ Œ«» ›—„«ÌÌœ";
	public $res_st2 = "‘„«  « ò‰Ê‰ œ— ÂÌç ¬“„Ê‰Ì ‘—ò  ‰ò—œÂ «Ìœ";
	public $res_st3 = "‰ «ÌÃ ò·Ì ¬“„Ê‰ #1# »Â «Ì‰ ‘—Õ «” :"."\r\n"."‘ÌÊÂ »—ê“«—Ì: #2#"."\r\n"."„œ  Å«”ŒêÊÌÌ ‘„«: #3# «“ #4#"."\r\n"." ⁄œ«œ ”Ê«·«  ’ÕÌÕ: #5#"."\r\n"." ⁄œ«œ ”Ê«·«  »Ì ÃÊ«»: #6#"."\r\n"." ⁄œ«œ ”Ê«·«  «‘ »«Â: #7#"."\r\n"." ⁄œ«œ ò· ”Ê«·« : #8#"."\r\n"."œ—’œ ò·Ì Å«”ŒêÊÌÌ: #9#";
	public $res_st4 = "«“ ÿ—Ìﬁ ò·Ìœ Â«Ì “Ì— „Ì  Ê«‰Ìœ ò«—‰«„Â Ê «ÿ·«⁄«   ò„Ì·Ì —« œ—Ì«›  ›—„«ÌÌœ";
	public $res_st5 = "·Ì‰ò „‘«ÂœÂ Ê œ—Ì«›  ò«—‰«„Â"."\r\n" . "#1#";
	public $res_st6 = "·Ì‰ò „‘«ÂœÂ Ê œ—Ì«›  Å«”Œ  ‘—ÌÕÌ ¬“„Ê‰"."\r\n" . "#1#";
	public $res_st7 = "Å«”Œ  ‘—ÌÕÌ »—«Ì «Ì‰ ¬“„Ê‰ À»  ‰‘œÂ «” ";
	//keyboards
		//usr
	public $usr_kb1 = "À»  ‰«„";
		//reg
	public $reg_kb1 = "À»  ‰«„ ¬“„Ê‰";
	public $reg_kb2 = "‘—Ê⁄ ¬“„Ê‰";
	public $reg_kb3 = "œ—Ì«›  ò«—‰«„Â";
		
		//tst
	public $tst_kb1 = "”Ê«· »⁄œ";
	public $tst_kb2 = "« „«„ Ê  ’ÕÌÕ ¬“„Ê‰ ";
	public $tst_kb3 = "Ê÷⁄Ì  ¬“„Ê‰";
		//res
	public $res_kb1 = "Å«”Œ Â«Ì  ‘—ÌÕÌ";
	public $res_kb2 = "ò«—‰«„Â ›—œÌ";
	public $res_kb3 = "ò«—‰«„Â Ã„⁄Ì";
	public $res_kb4 = "»«“ê‘ ";
	//inline 
		//usr
	public $usr_in1 = "«‰’—«›| «ÌÌœ";
	public $usr_im1 = [[0,1]];
	public $usr_in2 = "À»  »Â ⁄‰Ê«‰ ‰Ÿ—« ";
	public $usr_im2 = [[]];
		//reg
	public $reg_in1 = "œÊ„|«Ê·||çÂ«—„|”Ê„||‘‘„|Å‰Ã„"."||"."«‰’—«›";
	public $reg_im1 = [[2,1],[4,3],[6,5],["cancle"]];
	public $reg_in2 = "¬“„Ê‰ ›—œÌ ¬“«œ|¬“„Ê‰ Â„«Â‰ê"."||"."«‰’—«›"."|„—Õ·Â ﬁ»·";
	public $reg_im2 = [[1,2],["cancle","return"]];
	public $reg_in3 = "œÊ„|«Ê·||çÂ«—„|”Ê„||‘‘„|Å‰Ã„||Â‘ „|Â› „"."||"."«‰’—«›"."|„—Õ·Â ﬁ»·";
	public $reg_im3 = [[2,1],[4,3],[6,5],[8,7],["cancle","return"]];
	public $reg_in4 = "—Ì«÷Ì|⁄·Ê„"."||"."«‰’—«›"."|„—Õ·Â ﬁ»·";
	public $reg_im4 = [[1,2],["cancle","return"]];
	public $reg_in5 = "”«œÂ|„ Ê”ÿ|ÅÌ‘—› Â"."||"."«‰’—«›"."|„—Õ·Â ﬁ»·";
	public $reg_im5 = [[1,2,3],["cancle","return"]];
	public $reg_in6 = "«‰’—«›| «ÌÌœ";
	public $reg_im6 = [["cancle","ok"]];
	
		//pay
			//pay
	public $pay_in0 = "Å—œ«Œ  »«‰òÌ"."|"
	 				  ."Å—œ«Œ  »« òÌ› ÅÊ·"."||"
	 				  ."‘«—é òÌ› ÅÊ·"."|"
	 				  ."«‰’—«›";
	public $pay_im0 = [["bank","wallet"],["charge","cancle"]];
	public $pay_in1 = "»«“ê‘ | «ÌÌœ";
	public $pay_im1 = [["return","ok"]];
	public $pay_in2 = "1000 Ê„«‰|2000 Ê„«‰||5000 Ê„«‰|10000 Ê„«‰"."||"
					// ."”«Ì— „»«·€"."|"." Ê—Êœ òœ ‘«—é ÂœÌÂ"."||"
					 ."»«“ê‘ ";
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
	public $tst_in5 = "«‰’—«›| «ÌÌœ";
	public $tst_im5 = [[0,1]];
	//alerts
		//usr
	public $usr_al1 = "‘„« Â‰Ê“ œ— ”«„«‰Â À»  ‰«„ ‰ò—œÂ «Ìœ!";
	public $usr_al2 = "‰Ÿ— ‘„« »« „Ê›ﬁÌ  À»  ‘œ!";
	public $usr_al3 = "«Ì‰ ⁄„·ò—œ À»  ‰‘œÂ «” ";
		//reg
	public $reg_al1 = "ÂÌç ¬“„Ê‰ Â„«Â‰êÌ œ— Õ«· Õ«÷—  ⁄—Ì› ‰‘œÂ «” ";
	public $reg_al2 = "ÃÂ   ò„Ì· À»  ‰«„ „Ì »«Ì”  Â“Ì‰Â ¬“„Ê‰ Å—œ«Œ  ê—œœ.";
		//pay
	public $pay_al0 = "«‰’—«› «“ Å—œ«Œ  Ê À»  ‰«„";
	public $pay_al1 = "„»·€ ¬é„Ê‰ «“ òÌ› ÅÊ· ‘„« ò”— ê—œÌœ";
	public $pay_al2 = "‘«—é òÌ› ÅÊ· ‘„« ò«›Ì ‰Ì” ";
		//tst 
	public $tst_al1 = "¬“„Ê‰ ‘„« ¬€«“ ‘œ. „Ê›ﬁ »«‘Ìœ!";
	public $tst_al2 = "Å«”Œ ‘„« À»  ‘œ";
	public $tst_al3 = "«Ì‰ ¬“„Ê‰ »Â « „«„ —”ÌœÂ «” ";
	public $tst_al4 = "«Ì‰ ¬“„Ê‰ œ— Õ«· Õ«÷— ›⁄«· ‰Ì” ";
		//res
	public $res_al1 = "œ—Ì«›  ò«—‰«„Â ò·Ì œ— ¬“„Ê‰ Â«Ì Â„«Â‰ê »⁄œ «“  ’ÕÌÕ Â„Â ‘—ò  ò‰‰œê«‰ «„ò«‰ Å–Ì— „Ì »«‘œ";
	
	
	
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

				$info = "ò«—‰«„Â ¬“„Ê‰ ";
				$info .= $res[$i]["name"]."\n";
				$info .= " «—ÌŒ ".$this->jdate->date("y/m/d",strtotime($res[$i]["start_time"]) );
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
				$info = "ò«—‰«„Â ¬“„Ê‰";
				$info .= $res[$i]["name"]."\n";
				$info .= " «—ÌŒ ".$this->jdate->date("y/m/d",strtotime($res[$i]["start_time"]) );
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
					$this->sendMessage("À»  ‰«„ ‘„« »« „Ê›ﬁÌ  «‰Ã«„ ê—œÌœ" ,'{"hide_keyboard":true}');
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
					$names[$i] = [$list[$i]["name"]."  «—ÌŒ ".$this->jdate->date("y/m/d",strtotime($list[$i]["start_time"]) )];
					$ids[$i] = [$list[$i]["status"].":".$list[$i]["exam_user"]];
				}
				if(count($list)>0){
					array_push($names,["»«“ê‘ "]);
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
		$rest = "‰ «ÌÃ «Ê·ÌÂ ¬“„Ê‰  ‘„« »Â «Ì‰ ‘—Õ «” "."\n";
		for($i=0;$i<count($res);$i++){
			$dars= substr(($res[$i]["name"]."             "),0,20);
			$c   = substr(((int)$res[$i]["correct"  ]+"  "),0,3);
			$x   = substr(((int)$res[$i]["x"        ]+"  "),0,3);
			$n   = substr(((int)$res[$i]["incorrect"]+"  "),0,3);
			$p   = substr(((int)$res[$i]["percent"  ]+"  "),0,3);
			$rest .= substr($dars,0,20).":$p% ?’ÕÌÕ:$c ??€·ÿ:$n ??‰“œÂ:$x \n";
		}
		$this->sendMessage($rest."\r\n.");
		$this->usr_home($MessageID,$Text);
	}
	public  function res_final      ($MessageID,$Text){
		$exam = $Text[2];
		$res = $this->model->model_13($exam);
		$this->deleteMessage($MessageID);
		$this->answerCallback("ò«—‰«„Â ‰Â«ÌÌ ‘„« »Â “ÊœÌ »—«Ì ‘„« «—”«· „Ì ê—œœ.");
		
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
					$info = "œ—Õ«· Õ«÷— ¬“„Ê‰ ›⁄«·Ì  ⁄—Ì› ‰‘œÂ «” ";
					$this->answerCallback($info);
				}else if(strtotime($exam[0]["start_time"]) < time()){
					$names = [["‘—Ê⁄ ¬“„Ê‰","«‰’—«›"]];
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
					$info  = "¬“„Ê‰ $name"."\n"
							."„Ê«—œ ¬“„Ê‰: $parts"."\r\n"
							." ⁄œ«œ ”Ê«·« : $total"."\r\n"
							."„œ  Å«”ŒêÊÌÌ:$dur"."\r\n"	
							." ⁄œ«œ À»  ‰«„ ò‰‰œê«‰: $users"."\r\n.\r\n";
					$this->editMessage($MessageID,$info,$this->inline($names,$ids,"tst:"));
				}else{
					$info = "“„«‰ ‘—Ê⁄ ¬“„Ê‰ »⁄œÌ : "
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
		$cap = "”Ê«· ‘„«—Â ".$next;
		if($first){
				$this->answerCallback("¬“„Ê‰ ‘„« ¬€«“ ê—œÌœ° „Ê›ﬁ »«‘Ìœ!");
				$this->editMessage($MessageID,"","");
		}else{
			if($next>$total){
				$this->answerCallback("”Ê«·«  ‘„« »Â « „«„ —”ÌœÂ «” !");
				return false;
			}else if(($this->now()-$start) > $dur){
				$this->answerCallback("“„«‰ ¬“„Ê‰ »Â Å«Ì«‰ —”ÌœÂ «” !");
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
			$this->answerCallback("ÃÊ«» ‘„« À»  ê—œÌœ");
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
			$status  = "“„«‰ »«ﬁÌ„«‰œÂ:".($dur-(int)($this->now()-(int)($start)))."œﬁÌﬁÂ - "; 
			$status .= "”Ê«·«  »«ﬁÌ„«‰œÂ:".($total-$num);	
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
		$this->answerCallback("¬“„Ê‰ ‘„« »Â « „«„ —”Ìœ° Œ” Â ‰»«‘Ìœ!");
		$this->res_personal($MessageID,$Text);
	}
	private function tst_keys       ($exam,$num,$key,$control,$total,$dur,$start){
		$ins = [$this->tst_in0,$this->tst_in1,$this->tst_in2,$this->tst_in3,$this->tst_in4];
		$in = $ins[$key];
		$im = [["opt:$exam:$num:4:$control:$total:$dur:$start","opt:$exam:$num:3:$control:$total:$dur:$start","opt:$exam:$num:2:$control:$total:$dur:$start","opt:$exam:$num:1:$control:$total:$dur:$start"]];
		if($control){
			$in .="||";
			$in	.="? ”Ê«· »⁄œ"."|";
			$in	.="? « „«„ ¬“„Ê‰"."|";
			$in	.="?? "."Ê÷⁄Ì  ¬“„Ê‰"."|";
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
