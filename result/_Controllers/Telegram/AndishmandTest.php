<?php
namespace _Controllers\Telegram;
class AndishmandTest{
    private $model;
	
	private $bot_id = '488759408:AAEoCBlXjxWMhAav8mw-oUO5F1AWDhDRCL8';
	public $debug = "";
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
	public $tst_st4 = "آزمون #1#"."\r\n"."موارد آزمون: #2#"."\r\n"."تعداد سوالات: #3#"."\r\n"."مدت پاسخگویی: #4#";
	public $tst_st5 = "برای شروع آزمون آماده اید?";
	public $tst_st6 = "زمان برگزاری آزمون فرا نرسیده است";
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
	public $tst_in0 = "⚪️ 4️⃣|⚪️ 3️⃣|⚪️ 2️⃣|⚪️ 1️⃣";
	public $tst_im0 = [[4,3,2,1]];
	public $tst_in1 = "⚪️ 4️⃣|⚪️ 3️⃣|⚪️ 2️⃣|⚫️ 1️⃣";
	public $tst_im1 = [[4,3,2,1]];
	public $tst_in2 = "⚪️ 4️⃣|⚪️ 3️⃣|⚫️ 2️⃣|⚪️ 1️⃣";
	public $tst_im2 = [[4,3,2,1]];
	public $tst_in3 = "⚪️ 4️⃣|⚫️ 3️⃣|⚪️ 2️⃣|⚪️ 1️⃣";
	public $tst_im3 = [[4,3,2,1]];
	public $tst_in4 = "⚫️ 4️⃣|⚪️ 3️⃣|⚪️ 2️⃣|⚪️ 1️⃣";
	public $tst_im4 = [[4,3,2,1]];
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
	
	
	
    public  function __construct    ($model){
		$this->model = $model;
		
		//$this->cron = new \_Helpers\Cron(__FILE__);
		//$cron->setTimeout("hello",1,12345);
		$this->jdate = new \_Helpers\jdatetime(true, true, 'Asia/Tehran');
		//echo $this->jdate->date('y/m/d');
		$telegram  = new \_Helpers\Telegram($this->bot_id);
		$this->telegram = $telegram;
//		echo 'pre';
		ignore_user_abort(true);
		header("Content-Length: 0");
		header("Connection: Close");
		flush();
		session_write_close();
		$chat_id = $this->chat_id = $telegram->ChatID();
		$isCallback = $chat_id?false:true;
		if(@ $_GET['calc_exam']){
			echo 1;
			$this->model->model_17($_GET['calc_exam']);
			//echo 2 .p;

			$res = $this->model->model_17_1($_GET['calc_exam']);
			print_r($res);
			for($i=0;$i<count($res);$i++){	
				$info = "کارنامه آزمون ";
				$info .= $res[$i]["name"]."\n";
				$info .= "تاریخ ".$this->jdate->date("y/m/d",strtotime($res[$i]["start_time"]) );
				$this->chat_id = $res[$i]["_user"];
				$this->sendMessage($info,"");
				$this->res_pdf($_GET['calc_exam'],$res[$i]["_user"]);
				$this->sendMessage("http://forushy.com/workbook?user-id=".$res[$i]["_user"]."&azmon-id=".$_GET['calc_exam']);
				//$this->sendMessage($res[$i]["workbook"]);
				/*$this->sendMessage("","",$res[$i]["workbook"],false,true);*/
			}
		}
		if(@ $_GET['resend']){
			$res = $this->model->model_17_1($_GET['resend']);
			for($i=0;$i<count($res);$i++){
				$info = "کارنامه آزمون";
				$info .= $res[$i]["name"]."\n";
				$info .= "تاریخ ".$this->jdate->date("y/m/d",strtotime($res[$i]["start_time"]) );
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
				$this->sendMessage("ثبت نام شما با موفقیت انجام گردید" ,'{"hide_keyboard":true}');
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
	public  function usr_home       ($MessageID,$Text,$return=false) {
		if($return){
			$this->editMessage($MessageID,$this->usr_st10,$this->inline($this->reg_kb3."|".$this->reg_kb2,[["res","tst"]]));
		}else{
			$this->sendMessage($this->usr_st10,$this->inline($this->reg_kb3."|".$this->reg_kb2,[["res","tst"]]));
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
					$names[$i] = [$list[$i]["name"]." تاریخ ".$this->jdate->date("y/m/d",strtotime($list[$i]["start_time"]) )];
					$ids[$i] = [$list[$i]["status"].":".$list[$i]["exam_user"]];
				}
				if(count($list)>0){
					array_push($names,["بازگشت"]);
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
		$rest = "نتایج اولیه آزمون  شما به این شرح است"."\n";
		for($i=0;$i<count($res);$i++){
			$dars= substr(($res[$i]["name"]."             "),0,20);
			$c   = substr(((int)$res[$i]["correct"  ]+"  "),0,3);
			$x   = substr(((int)$res[$i]["x"        ]+"  "),0,3);
			$n   = substr(((int)$res[$i]["incorrect"]+"  "),0,3);
			$p   = substr(((int)$res[$i]["percent"  ]+"  "),0,3);
			$rest .= substr($dars,0,20).":$p% ✅صحیح:$c 🔴غلط:$n ⚪️نزده:$x \n";
		}
		$this->sendMessage($rest."\r\n.");
		$this->usr_home($MessageID,$Text);
	}
	public  function res_final      ($MessageID,$Text){
		$exam = $Text[2];
		$res = $this->model->model_13($exam);
		$this->deleteMessage($MessageID);
		$this->answerCallback("کارنامه نهایی شما به زودی برای شما ارسال می گردد.");
		$this->sendMessage($res,"",$res,false,true);
		$this->usr_home();
	}
	public function res_pdf         ($_exam,$_user){
		$input = ['http://forushy.com/workbook?user-id='.$_user.'&azmon-id='.$_exam];
        $dir = '_Temp/exam_user/'.$_user.'-'.$_exam;
        $options = '';
		$glob = new \_Helpers\glob($input);
		$glob->batch('convertor::pdf',$glob->files,$dir,$glob->dirs);
		$pdf = 'http://andishmand.net/_Temp/exam_user/'.$_user.'-'.$_exam.'.jpg';
		$this->sendMessage($pdf);
		$this->sendMessage("","",$pdf);
		$this->model->model_17_2($_exam,$_user,$pdf);
	}
	public  function tst_home       ($MessageID,$Text){
		switch($Text[1]){
			case "":
				$exam = $this->model->model_4($this->chat_id);//ok
				if (count($exam)==0){
					$info = "درحال حاضر آزمون فعالی تعریف نشده است";
					$this->answerCallback($info);
				}else if(strtotime($exam[0]["start_time"]) < time()){
					$names = [["شروع آزمون","انصراف"]];
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
					$info  = "آزمون $name"."\n"
							."موارد آزمون: $parts"."\r\n"
							."تعداد سوالات: $total"."\r\n"
							."مدت پاسخگویی:$dur"."\r\n"	
							."تعداد ثبت نام کنندگان: $users"."\r\n.\r\n";
					$this->editMessage($MessageID,$info,$this->inline($names,$ids,"tst:"));
				}else{
					$info = "زمان شروع آزمون بعدی : "
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
		$cap = "سوال شماره ".$next;
		if($first){
				$this->answerCallback("آزمون شما آغاز گردید، موفق باشید!");
				$this->editMessage($MessageID,"","");
		}else{
			if($next>$total){
				$this->answerCallback("سوالات شما به اتمام رسیده است!");
				return false;
			}else if(($this->now()-$start) > $dur){
				$this->answerCallback("زمان آزمون به پایان رسیده است!");
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
			$this->answerCallback("جواب شما ثبت گردید");
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
			$status  = "زمان باقیمانده:".($dur-(int)($this->now()-(int)($start)))."دقیقه - "; 
			$status .= "سوالات باقیمانده:".($total-$num);	
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
		$this->answerCallback("آزمون شما به اتمام رسید، خسته نباشید!");
		$this->res_personal($MessageID,$Text);
	}
	private function tst_keys       ($exam,$num,$key,$control,$total,$dur,$start){
		$ins = [$this->tst_in0,$this->tst_in1,$this->tst_in2,$this->tst_in3,$this->tst_in4];
		$in = $ins[$key];
		$im = [["opt:$exam:$num:4:$control:$total:$dur:$start","opt:$exam:$num:3:$control:$total:$dur:$start","opt:$exam:$num:2:$control:$total:$dur:$start","opt:$exam:$num:1:$control:$total:$dur:$start"]];
		if($control){
			$in .="||";
			$in	.="⏪ سوال بعد"."|";
			$in	.="⏹ اتمام آزمون"."|";
			$in	.="📶 "."وضعیت آزمون"."|";
			array_push($im,["next:$exam:$num:$key:1:$total:$dur:$start","finish:$exam:$num:$key:1:$total:$dur:$start","status:$exam:$num:$key:1:$total:$dur:$start"]);
		}
		return $this->inline($in,$im,"tst:");
	}
	private function ans_keys       ($cor,$ans){
		$in = [explode("|",$this->tst_in0)];
		$num = ["4️⃣","3️⃣","2️⃣","1️⃣"];
		if($ans!=0) {
			$in[0][4-$ans] = "🔴 ".$num[4-$ans];
			$in[0][4-$cor] = "✅ ".$num[4-$cor];
		}else{
			$in[0][4-$cor] = "☑️ ".$num[4-$cor];
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
		}else{
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
