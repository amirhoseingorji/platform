<?php
namespace _Controllers\Telegram;
class AndishmandTest
{
    private $model;
	
	private $bot_id = '488759408:AAEoCBlXjxWMhAav8mw-oUO5F1AWDhDRCL8';
	public $telegram;
	public $chat_id; 
	public $Callback_id;
	
	private $cron;
		///////////////
		// usr:
	public $usr_st1 = "!به سامانه آزمون اندیشمند خوش آمدید";
	public $usr_st2 = "ورود مجدد شما را به سامانه آزمون اندیشمند خوش می گوییم!";
	public $usr_st3 = "جهت استفاده از خدمات سیستم می بایست توسط کلید پایین ثبت نام کنید!";
	public $usr_st4 = "ثبت نام شما در سامانه با موفقیت انجام شد";
	public $usr_st5 = "ورود شما همراه با لینک ثبت نام آزمون است. آیا مایل به ثبت نام هستید؟";
	public $usr_st6 = "ورود شما همراه با لینک شروع آزمون است. آیا مایل به شروع آزمون هستید؟";
	public $usr_st7 = "ورود شما همراه با لینک دریافت کارنامه است. آیا مایل به دریافت کارنامه هستید؟";
	public $usr_st8 = "شما در زمان آزمون از سامانه خارج شدید آیا مایل به ادامه آزمون هستید؟";
	public $usr_st9 = "ورودی شما معبتر نیست، آیا می خواهید برای مدیریت سامانه ارسال بفرمایید؟";
	public $usr_st10 = "برای استفاده از خدمات سامانه یکی از کلید های زیر را انتخاب فرمایید";
		// reg;
	public $reg_st1 = "لطفا پایه تحصیلی را انتخاب فرمایید";
	public $reg_st2 = "لطفا شیوه آزمون مورد نظر خود را انتخاب فرمایید";
	public $reg_st3 = "لطفا فصل مورد نظر خودر انتخاب فرمایید";
	public $reg_st4 = "لطفا درس مورد نظر خود را انتخاب فرمایید";
	public $reg_st5 = "لطفا سطح طبقه بندی سوالات را انتخاب فرمایید";
	public $reg_st6 = "اطلاعات آزمون درخواستی به این شرح است:"."\r\n"."عنوان: #1#"."\r\n"."شیوه برگزاری: #2#"."\r\n"."تعداد سوالات: #3#"."\r\n"."مدت پاسخگویی: #4#"."\r\n". "هزینه آزمون: #5#";
	public $reg_st7 = "آیا مایل به ثبت نام در این آزمون هستید؟";
	
	public $reg_st9 = "درحال حاضر این آزمون غیر فعال می باشد";
	
		// pay:
	public $pay_st1 = "شارژ کیف پول شما برابر است با: "."\r\n"."شارژ هدیه: #1# تومان"."\r\n"."شارژ واریزی: #2# تومان"."\r\n"."مبلغ آزمون انتخابی :#3# تومان";
	public $pay_st2 = "لطفا مبلغ واریزی را انتخاب و یا وارد فرمایید";
	public $pay_st3 = "لطفا کد شارژ هدیه یا کد تخفیف خود را وارد فرمایید";
	public $pay_st4 = "هدیه سامانه آزمون اندیشمند با عنوان #1# و مبلغ #2# به کیف پول شما افزوده شد";
	public $pay_st5 = "هدیه تخفیف سامانه آزمون اندیشمند با عنوان #1# برای شما منظور گردید";
	public $pay_st6 = "برای پرداخت مبلغ #1# تومان از درگاه بانکی اطمینان دارید؟";
	public $pay_st7 = "شارژ کیف پول شما انجام شد\r\n";
	public $pay_st8 = "آزمون انتخابی برای شما ثبت گردید";
	
		// tst
	public $tst_st1 = "لطفا آزمون مورد نظر خود را انتخاب فرمایید"."\r\n" . "تنها آزمون های آزاد و یا آزمون هایی که زمان برگزاری آنها فرا رسیده است قابل شروع می باشند";
	public $tst_st2 = "شما در هیچ آزمونی ثبت نام نکرده اید";
	public $tst_st3 = "زمان برگزاری آزمون شما با اطلاعات زیر فرا رسیده است";
	public $tst_st4 = "آزمون #1#"."\r\n"."شیوه برگزاری: #2#"."\r\n"."تعداد سوالات: #3#"."\r\n"."مدت پاسخگویی: #4#";
	public $tst_st5 = "برای شروع آزمون آماده اید?";
	public $tst_st6 = "زمان برگزاری این آزمون فرا نرسیده است";
	public $tst_st7 = "زمان برگزاری این آزمون گذشته است";
	public $tst_st8 = "سوال شماره #1# :";
	public $tst_st9 = "مدت آزمون شما به پایان رسید برای تصحیح و مشاهده نتایج کلید اتمام آزمون را بزنید";
	public $tst_st10 = "سوالات شما به پایان رسیده است. درصورت اطمینان از انتخاب گزینه های صحیح کلید اتمام آزمون را بزنید";
	public $tst_st11 = "زمان باقیمانده:#1#"."\r\n"."سوالات باقیمانده :#2#";
	public $tst_st12 = "سوالات آزمون شما تصحیح شد ";
	
	
		//res
	public $res_st1 = "لطفا آزمون مورد نظر خود را انتخاب فرمایید";
	public $res_st2 = "شما تا کنون در هیچ آزمونی شرکت نکرده اید";
	public $res_st3 = "نتایج کلی آزمون #1# به این شرح است:"."\r\n"."شیوه برگزاری: #2#"."\r\n"."مدت پاسخگویی شما: #3# از #4#"."\r\n"."تعداد سوالات صحیح: #5#"."\r\n"."تعداد سوالات بی جواب: #6#"."\r\n"."تعداد سوالات اشتباه: #7#"."\r\n"."تعداد کل سوالات: #8#"."\r\n"."درصد کلی پاسخگویی: #9#";
	public $res_st4 = "از طریق کلید های زیر می توانید کارنامه و اطلاعات تکمیلی را دریافت فرمایید";
	public $res_st5 = "لینک مشاهده و دریافت کارنامه"."\r\n" . "#1#";
	public $res_st6 = "لینک مشاهده و دریافت پاسخ تشریحی آزمون"."\r\n" . "#1#";
	public $res_st7 = "پاسخ تشریحی برای این آزمون ثبت نشده است";
	//keyboards
		//usr
	public $usr_kb1 = "ثبت نام";
		//reg
	public $reg_kb1 = "ثبت نام آزمون";
	public $reg_kb2 = "شروع آزمون";
	public $reg_kb3 = "دریافت کارنامه";
		
		//tst
	public $tst_kb1 = "سوال بعد";
	public $tst_kb2 = "اتمام و تصحیح آزمون ";
	public $tst_kb3 = "وضعیت آزمون";
		//res
	public $res_kb1 = "پاسخ های تشریحی";
	public $res_kb2 = "کارنامه فردی";
	public $res_kb3 = "کارنامه جمعی";
	public $res_kb4 = "بازگشت";
	//inline 
		//usr
	public $usr_in1 = "انصراف|تایید";
	public $usr_im1 = [[0,1]];
	public $usr_in2 = "ثبت به عنوان نظرات";
	public $usr_im2 = [[]];
		//reg
	public $reg_in1 = "دوم|اول||چهارم|سوم||ششم|پنجم"."||"."انصراف";
	public $reg_im1 = [[2,1],[4,3],[6,5],["cancle"]];
	public $reg_in2 = "آزمون فردی آزاد|آزمون هماهنگ"."||"."انصراف"."|مرحله قبل";
	public $reg_im2 = [[1,2],["cancle","return"]];
	public $reg_in3 = "دوم|اول||چهارم|سوم||ششم|پنجم||هشتم|هفتم"."||"."انصراف"."|مرحله قبل";
	public $reg_im3 = [[2,1],[4,3],[6,5],[8,7],["cancle","return"]];
	public $reg_in4 = "ریاضی|علوم"."||"."انصراف"."|مرحله قبل";
	public $reg_im4 = [[1,2],["cancle","return"]];
	public $reg_in5 = "ساده|متوسط|پیشرفته"."||"."انصراف"."|مرحله قبل";
	public $reg_im5 = [[1,2,3],["cancle","return"]];
	public $reg_in6 = "انصراف|تایید";
	public $reg_im6 = [["cancle","ok"]];
	
		//pay
			//pay
	public $pay_in0 = "پرداخت بانکی"."|"
	 				  ."پرداخت با کیف پول"."||"
	 				  ."شارژ کیف پول"."|"
	 				  ."انصراف";
	public $pay_im0 = [["bank","wallet"],["charge","cancle"]];
	public $pay_in1 = "بازگشت|تایید";
	public $pay_im1 = [["return","ok"]];
	public $pay_in2 = "1000تومان|2000تومان||5000تومان|10000تومان"."||"
					// ."سایر مبالغ"."|"." ورود کد شارژ هدیه"."||"
					 ."بازگشت";
	public $pay_im2 = [[1000,2000],[5000,10000]/*,[0,"cod"]*/,["return"]];
		//tst
	public $tst_in0 = "گزینه3"."|"."گزینه4"."||"."گزینه1"."|"."گزینه2";
	public $tst_im0 = [[2,1],[4,3]];
	public $tst_in1 = "گزینه3"."|"."گزینه4"."||"."✅گزینه1"."|"."گزینه2";
	public $tst_im1 = [[2,1],[4,3]];
	public $tst_in2 = "گزینه3"."|"."گزینه4"."||"."گزینه1"."|"."✅گزینه2";
	public $tst_im2 = [[2,1],[4,3]];
	public $tst_in3 = "گزینه3"."|"."گزینه4"."||"."گزینه1"."|"."گزینه2✅";
	public $tst_im3 = [[2,1],[4,3]];
	public $tst_in4 = "گزینه3"."|"."✅گزینه4"."||"."گزینه1"."|"."گزینه2";
	public $tst_im4 = [[2,1],[4,3]];
	public $tst_in5 = "انصراف|تایید";
	public $tst_im5 = [[0,1]];
	//alerts
		//usr
	public $usr_al1 = "شما هنوز در سامانه ثبت نام نکرده اید!";
	public $usr_al2 = "نظر شما با موفقیت ثبت شد!";
	public $usr_al3 = "این عملکرد ثبت نشده است";
		//reg
	public $reg_al1 = "هیچ آزمون هماهنگی در حال حاضر تعریف نشده است";
	public $reg_al2 = "جهت تکمیل ثبت نام می بایست هزینه آزمون پرداخت گردد.";
		//pay
	public $pay_al0 = "انصراف از پرداخت و ثبت نام";
	public $pay_al1 = "مبلغ آژمون از کیف پول شما کسر گردید";
	public $pay_al2 = "شارژ کیف پول شما کافی نیست";
		//tst 
	public $tst_al1 = "آزمون شما آغاز شد. موفق باشید!";
	public $tst_al2 = "پاسخ شما ثبت شد";
	public $tst_al3 = "این آزمون به اتمام رسیده است";
	public $tst_al4 = "این آزمون در حال حاضر فعال نیست";
	
		//res
	public $res_al1 = "دریافت کارنامه کلی در آزمون های هماهنگ بعد از تصحیح همه شرکت کنندگان امکان پذیر می باشد";
    public function __construct($model){
		$this->model = $model;
		/////////

		//$this->cron = new \_Helpers\Cron(__FILE__);
		//$cron->setTimeout("hello",1,12345);

		$telegram = new \_Helpers\Telegram($this->bot_id);
		$this->telegram = $telegram;
		//chatid
		$chat_id = $this->chat_id = $telegram->ChatID();
		$isCallback = false;//$chat_id?false:true;
		
		//other
		if(@ $_GET["chat_id"]){
		$_POST = $_GET;	
		}
		if(@ $_POST["chat_id"]){
			
			$chat_id = $this->chat_id = $_POST["chat_id"];
			$fid = $_POST["factor_id"];
			$trid = $_POST["transion_id"];
			$price = (int)$_POST["price"];
			$desc =  explode("-",$_POST["desc"]);
			$MessageID = $desc[0];
			$mod = $desc[1];
			$tid = $desc[2];
			if($price > 0){
				
			$this->model->pay_15($fid,$price,$trid,$chat_id);
				
				if($mod=="charge"){
					echo $mod;
					$this->pay_home($MessageID,"",$tid,$this->pay_st7);
				}elseif($mod=="bank"){
					$this->pay_13($chat_id,$price,$tid);
					//$this->model->reg_3($chat_id,$tid);
					$this->editMessage($MessageID,$pay_st8);
				}
			}else{
				$this->sendMessage("1234");
			}
		}
		if($isCallback){
			///////get info
			$Text        = $telegram->Callback_Data();
			$chat_id     = $this->chat_id = $telegram->Callback_ChatID();
			$isReg = (int)$model->usr_5($chat_id);
			$Callback_Query = $telegram->Callback_Query();
			$Callback_id = $this->Callback_id = $Callback_Query["id"];
			$MessageID   = $Callback_Query["message"]["message_id"];
			$MessageText = $Callback_Query["message"]["text"];
			//////reply

			if(!$isReg){
				$this->answerCallback($this->usr_al1);
			}else{
				switch(substr($Text,0,3)){
					case "com":
						$this->answerCallback($this->usr_al2.$MessageID);
						$this->deleteMessage($MessageID);
					break ;
					case "reg":
						$this->reg_home($MessageID,$Text);
					break ;
					case "pay":
						$this->pay_home($MessageID,$Text);
					break ;
					case "tst":
						$this->tst_home($MessageID,$Text);
					break ;
					default:
						//بازخورد نامشخص
						$this->answerCallback($this->usr_al3.":".$Text);
				}
			}
		}else if(false){
			//getInfo
			$MessageID   = $telegram->MessageID();
			$Text        = $telegram->Text();
			$FirstName   = $telegram->FirstName();
			$LastName    = $telegram->LastName();
			$Username    = $telegram->Username();
			$phone       = $telegram->phone();	
			$isReg = (int)$model->usr_5($chat_id);
			
			

			//$Location = $telegram->Location();
			if(substr($Text,0,6) == "/start"){
				$startmod = true;
				$this->usr_start($isReg);
			 //	$this->usr_link(substr($Text,7),$isReg);	
			}
			if(!$isReg && $phone==""){
				$this->sendMessage($this->usr_st3,$this->keyboard([[$this->usr_kb1]],true));
			}elseif($phone!=""){
				$this->usr_home();
				$model->usr_1($FirstName, $LastName , "$FirstName $LastName", $chat_id, $Username, $phone, "");
				$model->usr_12($chat_id);
			}elseif(!$startmod){
				switch($Text){
					case $this->reg_kb1:
						$in = $this->inline($this->reg_in1,$this->reg_im1,"reg:");
						$this->sendMessage($this->reg_st1,$in);
					break;
					case $this->reg_kb2:
					// if not 
						$result  = [];//$model->reg_4($chat_id);
						if(count($result)>0){
							$in = [];
							$im = [];
							for($i=0;$i<count($result);$i++){
								$icon = (int)$result[$i][3]==1?"✅":"❌";
								$in.push([$icon.$result[$i][1]]);
								$im.push([((int)$result[$i][3]==1?$result[$i][0]:0)]);
							}
							$in.push(["انصراف"]);
							$im.push(["cancle"]);
							$this->sendMessage($this->tst_st1,$this->inline($in,$im,"tst:"));
							
						}else{
							$this->sendMessage($this->tst_st2);
							$this->usr_home();
						}
					break;
					case $this->reg_kb3:
						if(count($result)>0){
							
						}else{
						$this->sendMessage($this->res_st2);
						$this->usr_home();
						}
					break;

					default:
						$in = $this->inline($this->usr_in2,[["com"]]);
						$this->sendMessage($this->usr_st9,$in);
					break;
				}
			}
				
		}
    }

    public function usr_start($isReg=0) {
		if(!$isReg){
			$this->sendMessage($this->usr_st1);
		}else{
			$this->sendMessage($this->usr_st2);
			$this->usr_home();
		}
    } 
	public function tst_home($MessageID,$Text){
		$tst = explode(':',$Text);
			if($tst[1]=="cancle"){
				$this->answerCallback("انصراف از انتخاب آزمون");
				$this->deleteMessage($MessageID);
			}elseif($tst[count($tst)-1]=="return"){
				$result  = $model->tst_11($chat_id);
				$in = [];
				$im = [];
				for($i=0;$i<count($result);$i++){
					$icon = (int)$result[$i][3]==1?"✅":"❌";
					$in.push([$icon.$result[$i][1]]);
					$im.push([((int)$result[$i][3]==1?$result[$i][0]:0)]);
				}
				$in.push(["انصراف"]);
				$im.push(["cancle"]);
				$this->sendMessage($this->tst_st1,$this->inline($in,$im,"tst:"));
			}elseif((int)$tst[1]==0){
				$this->answerCallback($this->tst_al4);
				$st = $this->tst_st4;
				$res = [[]];//;$this->model->tst_12($tstid)
				$st = str_replace("#1#",$res[0][""],$st);
				$st = str_replace("#1#",$res[0][""],$st);
				$st = str_replace("#1#",$res[0][""],$st);
				$st = str_replace("#1#",$res[0][""],$st);
				$this->editMessage($MessageID,$st,$this->inline([["بازگشت"]],[["tst:return"]]));
			}elseif((int)$tst[1]>0 && count($tst==2)){
				$st = $this->tst_st4;
				$res = [[]];//;$this->model->tst_12($tstid)
				$st = str_replace("#1#",$res[0][""],$st);
				$st = str_replace("#1#",$res[0][""],$st);
				$st = str_replace("#1#",$res[0][""],$st);
				$st = str_replace("#1#",$res[0][""],$st);
				$this->editMessage($MessageID,$st);
			}
		
	}
	public function pay_home($MessageID,$Text,$tid,$pre='') {
		if($Text==""){
			$st = $pre.$this->pay_st1;
			$res1 = $this->model->tst_10($tid);
			$res2 = $this->model->pay_11($this->chat_id);
			$res3 = $this->model->pay_12($this->chat_id);
			$st = str_replace("#2#",(int)$res2[0]["charge"],$st);
			$st = str_replace("#1#",(int)$res2[0]["gift_charge"],$st);
			$off = (int)$res3[0]["percent"];
			$price = (int)$res1[0]["exam_price"];
			$final= $off>0 ? "با احتساب تخفیف ".$off."درصد  " : "";
			$final .= $off>0 ? $price*(100-$off)/100 : $price;
			$st = str_replace("#3#",$final,$st);
			//reform pay st;
			$this->editMessage($MessageID,$st,$this->inline($this->pay_in0,$this->pay_im0,"pay:".$tid.":"));
		}else{
			
			$pay = explode(':',$Text);
			$tid = $pay[1];
				switch($pay[2]){
					case "bank":
						if($pay[3] == "return"){
								$this->pay_home($MessageID,"",$tid); 
						}else{
							$st  = $this->pay_st6;
							// refomrm $st
							$res1 = $this->model->tst_10($tid);
							
							$res3 = $this->model->pay_12($this->chat_id);
							
							$off = (int)$res3[0]["percent"];
							$price = (int)$res1[0]["exam_price"];
							$final = $off>0 ? $price*(100-$off)/100 : $price;
							
							$st = str_replace("#1#",$final,$st);
							// get bank url
							
							$url = $this->model->pay_14_1($this->chat_id ,$final, "$MessageID-bank-$tid");
				
							$this->editMessage($MessageID,$st,$this->inline($this->pay_in1,$this->pay_im1,($Text.":"),'',[["",$url]]));
						}
					break;
					case "wallet":
						//if() مجموع شارژ بیشتر بود و کسر مبلغ موفق بود
						$res1 = $this->model->tst_10($tid);
						$res2 = $this->model->pay_11($this->chat_id);
						$wall = (int)$res2[0]["charge"] + (int)$res2[0]["gift_charge"];
						$res3 = $this->model->pay_12($this->chat_id);
						$off = (int)$res3[0]["percent"];
						$price = (int)$res1[0]["exam_price"];
						$final = $off>0 ? $price*(100-$off)/100 : $price;	
						if($wall>$final){
							//$this->pay_13($this->chat_id,$final,$tid);
							//$this->model->reg_3($chat_id,$tid);
							$this->answerCallback($this->pay_al1);
							$this->editMessage($MessageID,$this->pay_st8);
						}else{
							$this->answerCallback($this->pay_al2);
						}
					break;
					case "charge":
						if($pay[count($pay)-1] == "return"){
								$this->answerCallback("انصراف از شارژ");
								$this->pay_home($MessageID,"",$tid); 
						}elseif($pay[3]){
							
							if($pay[3] == "cod"){
								$this->answerCallback($this->buildForceReply());
							$this->editMessage($MessageID,$this->pay_st3);
							}elseif($pay[3] == 0){
							$this->editMessage($MessageID,$this->pay_st2,$this->buildForceReply());
							}elseif($pay[3]>0){
							$st  = $this->pay_st6;
							$st = str_replace("#1#",$pay[3],$st);
							// get bank url
							$url = $this->model->pay_14_1($this->chat_id ,(int)$pay[3], "$MessageID-charge-$tid");
								
							$this->editMessage($MessageID,$st,$this->inline($this->pay_in1,$this->pay_im1,($Text.":"),'',[["",$url]]));
							}
						}else{
						$this->editMessage($MessageID,$this->pay_st2,$this->inline($this->pay_in2,$this->pay_im2,($Text.":")));
						}
						
					break;
					case "cancle":
						$this->answerCallback($this->pay_al0);
						$this->deleteMessage($MessageID);	
					break;
				}
			//}
		}
    }
	public function usr_home() {
		$this->sendMessage($this->usr_st10,$this->keyboard([[$this->reg_kb3,$this->reg_kb2,$this->reg_kb1]]));
    }
	public function reg_home($MessageID,$Text) {
		$reg = explode(':',$Text);
		//detect ok,cancle,return
		if($reg[count($reg)-1]=="ok"){
			$this->answerCallback($this->reg_al2);
			$this->pay_home($MessageID,"",$reg[count($reg)-2]);
		}elseif($reg[count($reg)-1]=="cancle"){
			$this->answerCallback("انصراف ثبت نام");
			$this->deleteMessage($MessageID);
			//$this->usr_home();
		}elseif($reg[count($reg)-1]=="return"){
			array_pop($reg);array_pop($reg);
			$Text = implode(":",$reg);
		}
		// choose menu
		$iin = [$this->reg_in1,$this->reg_in2,$this->reg_in4,$this->reg_in3,$this->reg_in5];
		$iim = [$this->reg_im1,$this->reg_im2,$this->reg_im4,$this->reg_im3,$this->reg_im5];
		$ist = [$this->reg_st1,$this->reg_st2,$this->reg_st4,$this->reg_st3,$this->reg_st5];
		$c = count($reg);
		$this->answerCallback("تایید شد" );
		if($c<6){
			$in = $this->inline($iin[$c-1],$iim[$c-1],$Text.":");
			$this->editMessage($MessageID,$ist[$c-1],$in);
		}elseif($c==6){
			$result = $this->model->tst_7($reg[1],$reg[2],$reg[4],$reg[3],$reg[5]);
			if($result[0]['active']){
				$st = $this->reg_st6;
				$st = str_replace("#1#",$result[0]['title'],$st);
				//convert to persian date!
				$st2 = $result[0]['mode']=="1" ? "آزاد" : "هماهنگ".$result[0]["start_time"];
				$st = str_replace("#2#",$st2,$st);
				$st = str_replace("#3#",$result[0]['count'],$st);
				$st = str_replace("#4#",$result[0]['duration']." دقیقه",$st);
				$st = str_replace("#5#",$result[0]['exam_price']." تومان",$st);
				$this->editMessage($MessageID,$st);
				$this->sendMessage($this->reg_st7,$this->inline($this->reg_in6,$this->reg_im6,($Text.":".$result[0]['id'].":")));
			}else{
				$st	= $this->reg_st9;
				$this->editMessage($MessageID,$st);
			}

		}
    }
	/////primery functions
	private function inline($in,$data=[[]],$pre="",$aft="",$url=[[]]) {
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
	private function keyboard($_kb=array(array()),$usr=false) {
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
	//callback
		private function answerCallback($reply){
			$telegram = $this->telegram;
			$content = array('callback_query_id'=>$this->Callback_id , 'text' => $reply);
			$telegram->answerCallbackQuery($content);	
		}
	//massages
	private function sendMessage($reply,$reply_markup="",$photo=""){
		$telegram = $this->telegram;
		$content = array('chat_id' => $this->chat_id);
		if($reply_markup!="") $content['reply_markup'] = $reply_markup;
		if($photo==""){
			$content['text']=$reply;
			$telegram->sendMessage($content);
		}else{
			$content['caption']=$reply;
			if(strpos($photo,".jpg")>0){
				$content['photo'] = $photo;
			}else{
				$content['hasfile'] = true;
				$content['photo'] = new CURLFile(realpath($photo),'image/jpeg');
				$ret = $telegram->sendPhoto($content);
			}
			return $telegram->sendPhoto($content);
			//["result"]["photo"][2]["file_id"];
		}
	}
	private function editMessage($msgid,$reply="",$reply_markup=""){
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
	private function deleteMessage($msgid){
		$telegram = $this->telegram;
		$content = array('chat_id' => $this->chat_id,'message_id'=>$msgid);
		$telegram->deleteMessage($content);
	}
}
//function hello($str){
//	file_put_contents("a1.txt",time());
//}
