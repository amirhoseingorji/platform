<?php
namespace _Controllers\Telegram;
class home3
{
   private $model;
	
	private $bot_id = '488759408:AAEPIJOnt_UwCB_WSX7pkP_9Yn_KIUSKx_U';
	public $debug = "";
	public $telegram;
	public $chat_id; 
	public $Callback_id;
	
	private $cron;
	///////////////
		// usr:
	public $usr_st1 = "!به سامانه آزمون انديشمند خوش آمديد";
	public $usr_st2 = "ورود مجدد شما را به سامانه آزمون انديشمند خوش مي گوييم!";
	public $usr_st3 = "جهت استفاده از خدمات سيستم مي بايست توسط کليد پايين ثبت نام کنيد!";
	public $usr_st4 = "ثبت نام شما در سامانه با موفقيت انجام شد";
	public $usr_st5 = "ورود شما همراه با لينک ثبت نام آزمون است. آيا مايل به ثبت نام هستيد؟";
	public $usr_st6 = "ورود شما همراه با لينک شروع آزمون است. آيا مايل به شروع آزمون هستيد؟";
	public $usr_st7 = "ورود شما همراه با لينک دريافت کارنامه است. آيا مايل به دريافت کارنامه هستيد؟";
	public $usr_st8 = "شما در زمان آزمون از سامانه خارج شديد آيا مايل به ادامه آزمون هستيد؟";
	public $usr_st9 = "ورودي شما معبتر نيست، آيا مي خواهيد براي مديريت سامانه ارسال بفرماييد؟";
	public $usr_st10 = "براي استفاده از خدمات سامانه يکي از کليد هاي زير را انتخاب فرماييد";
		// reg;
	public $reg_st1 = "لطفا پايه تحصيلي را انتخاب فرماييد";
	public $reg_st2 = "لطفا شيوه آزمون مورد نظر خود را انتخاب فرماييد";
	public $reg_st3 = "لطفا فصل مورد نظر خودر انتخاب فرماييد";
	public $reg_st4 = "لطفا درس مورد نظر خود را انتخاب فرماييد";
	public $reg_st5 = "لطفا سطح طبقه بندي سوالات را انتخاب فرماييد";
	public $reg_st6 = "اطلاعات آزمون درخواستي به اين شرح است:"."\r\n"."عنوان: #1#"."\r\n"."شيوه برگزاري: #2#"."\r\n"."تعداد سوالات: #3#"."\r\n"."مدت پاسخگويي: #4#"."\r\n". "هزينه آزمون: #5#";
	public $reg_st7 = "آيا مايل به ثبت نام در اين آزمون هستيد؟";
	
	public $reg_st9 = "درحال حاضر اين آزمون غير فعال مي باشد";
	
		// pay:
	public $pay_st1 = "شارژ کيف پول شما برابر است با: "."\r\n"."شارژ هديه: #1# تومان"."\r\n"."شارژ واريزي: #2# تومان"."\r\n"."مبلغ آزمون انتخابي :#3# تومان";
	public $pay_st2 = "لطفا مبلغ واريزي را انتخاب و يا وارد فرماييد";
	public $pay_st3 = "لطفا کد شارژ هديه يا کد تخفيف خود را وارد فرماييد";
	public $pay_st4 = "هديه سامانه آزمون انديشمند با عنوان #1# و مبلغ #2# به کيف پول شما افزوده شد";
	public $pay_st5 = "هديه تخفيف سامانه آزمون انديشمند با عنوان #1# براي شما منظور گرديد";
	public $pay_st6 = "براي پرداخت مبلغ #1# تومان از درگاه بانکي اطمينان داريد؟";
	public $pay_st7 = "شارژ کيف پول شما انجام شد\r\n";
	public $pay_st8 = "آزمون انتخابي براي شما ثبت گرديد";
	
		// tst
	public $tst_st1 = "لطفا آزمون مورد نظر خود را انتخاب فرماييد"."\r\n" . "تنها آزمون هاي آزاد و يا آزمون هايي که زمان برگزاري آنها فرا رسيده است قابل شروع مي باشند";
	public $tst_st2 = "شما در هيچ آزموني ثبت نام نکرده ايد";
	public $tst_st3 = "زمان برگزاري آزمون شما با اطلاعات زير فرا رسيده است";
	public $tst_st4 = "آزمون #1#"."\r\n"."موارد آزمون: #2#"."\r\n"."تعداد سوالات: #3#"."\r\n"."مدت پاسخگويي: #4#";
	public $tst_st5 = "براي شروع آزمون آماده ايد?";
	public $tst_st6 = "زمان برگزاري آزمون فرا نرسيده است";
	public $tst_st7 = "زمان برگزاري اين آزمون گذشته است";
	public $tst_st8 = "سوال شماره #1# :";
	public $tst_st9 = "مدت آزمون شما به پايان رسيد براي تصحيح و مشاهده نتايج کليد اتمام آزمون را بزنيد";
	public $tst_st10 = "سوالات شما به پايان رسيده است. درصورت اطمينان از انتخاب گزينه هاي صحيح کليد اتمام آزمون را بزنيد";
	public $tst_st11 = "زمان باقيمانده:#1#"."\r\n"."سوالات باقيمانده :#2#";
	public $tst_st12 = "سوالات آزمون شما تصحيح شد ";
	
	
		//res
	public $res_st1 = "لطفا آزمون مورد نظر خود را انتخاب فرماييد";
	public $res_st2 = "شما تا کنون در هيچ آزموني شرکت نکرده ايد";
	public $res_st3 = "نتايج کلي آزمون #1# به اين شرح است:"."\r\n"."شيوه برگزاري: #2#"."\r\n"."مدت پاسخگويي شما: #3# از #4#"."\r\n"."تعداد سوالات صحيح: #5#"."\r\n"."تعداد سوالات بي جواب: #6#"."\r\n"."تعداد سوالات اشتباه: #7#"."\r\n"."تعداد کل سوالات: #8#"."\r\n"."درصد کلي پاسخگويي: #9#";
	public $res_st4 = "از طريق کليد هاي زير مي توانيد کارنامه و اطلاعات تکميلي را دريافت فرماييد";
	public $res_st5 = "لينک مشاهده و دريافت کارنامه"."\r\n" . "#1#";
	public $res_st6 = "لينک مشاهده و دريافت پاسخ تشريحي آزمون"."\r\n" . "#1#";
	public $res_st7 = "پاسخ تشريحي براي اين آزمون ثبت نشده است";
	//keyboards
		//usr
	public $usr_kb1 = "ثبت نام";
		//reg
	public $reg_kb1 = "ثبت نام آزمون";
	public $reg_kb2 = "شروع آزمون";
	public $reg_kb3 = "دريافت کارنامه";
		
		//tst
	public $tst_kb1 = "سوال بعد";
	public $tst_kb2 = "اتمام و تصحيح آزمون ";
	public $tst_kb3 = "وضعيت آزمون";
		//res
	public $res_kb1 = "پاسخ هاي تشريحي";
	public $res_kb2 = "کارنامه فردي";
	public $res_kb3 = "کارنامه جمعي";
	public $res_kb4 = "بازگشت";
	//inline 
		//usr
	public $usr_in1 = "انصراف|تاييد";
	public $usr_im1 = [[0,1]];
	public $usr_in2 = "ثبت به عنوان نظرات";
	public $usr_im2 = [[]];
		//reg
	public $reg_in1 = "دوم|اول||چهارم|سوم||ششم|پنجم"."||"."انصراف";
	public $reg_im1 = [[2,1],[4,3],[6,5],["cancle"]];
	public $reg_in2 = "آزمون فردي آزاد|آزمون هماهنگ"."||"."انصراف"."|مرحله قبل";
	public $reg_im2 = [[1,2],["cancle","return"]];
	public $reg_in3 = "دوم|اول||چهارم|سوم||ششم|پنجم||هشتم|هفتم"."||"."انصراف"."|مرحله قبل";
	public $reg_im3 = [[2,1],[4,3],[6,5],[8,7],["cancle","return"]];
	public $reg_in4 = "رياضي|علوم"."||"."انصراف"."|مرحله قبل";
	public $reg_im4 = [[1,2],["cancle","return"]];
	public $reg_in5 = "ساده|متوسط|پيشرفته"."||"."انصراف"."|مرحله قبل";
	public $reg_im5 = [[1,2,3],["cancle","return"]];
	public $reg_in6 = "انصراف|تاييد";
	public $reg_im6 = [["cancle","ok"]];
	
		//pay
			//pay
	public $pay_in0 = "پرداخت بانکي"."|"
	 				  ."پرداخت با کيف پول"."||"
	 				  ."شارژ کيف پول"."|"
	 				  ."انصراف";
	public $pay_im0 = [["bank","wallet"],["charge","cancle"]];
	public $pay_in1 = "بازگشت|تاييد";
	public $pay_im1 = [["return","ok"]];
	public $pay_in2 = "1000تومان|2000تومان||5000تومان|10000تومان"."||"
					// ."ساير مبالغ"."|"." ورود کد شارژ هديه"."||"
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
	public $usr_al1 = "شما هنوز در سامانه ثبت نام نکرده ايد!";
	public $usr_al2 = "نظر شما با موفقيت ثبت شد!";
	public $usr_al3 = "تغییر گزینه پس از آزمون امکان پذیر نیست";
		//reg
	public $reg_al1 = "هيچ آزمون هماهنگي در حال حاضر تعريف نشده است";
	public $reg_al2 = "جهت تکميل ثبت نام مي بايست هزينه آزمون پرداخت گردد.";
		//pay
	public $pay_al0 = "انصراف از پرداخت و ثبت نام";
	public $pay_al1 = "مبلغ آژمون از کيف پول شما کسر گرديد";
	public $pay_al2 = "شارژ کيف پول شما کافي نيست";
		//tst 
	public $tst_al1 = "آزمون شما آغاز شد. موفق باشيد!";
	public $tst_al2 = "پاسخ شما ثبت شد";
	public $tst_al3 = "اين آزمون به اتمام رسيده است";
	public $tst_al4 = "اين آزمون در حال حاضر فعال نيست";
		//res
	public $res_al1 = "دريافت کارنامه کلي در آزمون هاي هماهنگ بعد از تصحيح همه شرکت کنندگان امکان پذير مي باشد";
	
	
	
    public  function __construct    ($model){
		$this->model = $model;
		
		//$this->cron = new \_Helpers\Cron(__FILE__);
		//$cron->setTimeout("hello",1,12345);
		$this->jdate = new \_Helpers\jdatetime(true, true, 'Asia/Tehran');
		//echo $this->jdate->date('y/m/d');
		$telegram  = new \_Helpers\Telegram($this->bot_id);
		$this->telegram = $telegram;
//		echo 'pre';
// 		ignore_user_abort(true);
// 		header("Content-Length: 0");
// 		header("Connection: Close");
// 		flush();
// 		session_write_close();
		$chat_id = $this->chat_id = $telegram->ChatID();
		echo $chat_id."--<";
		$isCallback = $chat_id?false:true;
		if(@ $_GET['exam_user']){
			$this->chat_id = $_GET['user'];
			$this->sendMessage("زمان آزمون شما به پایان رسید");
			$this->tst_end(0,[0,0,$_GET['exam_user']]);
		}
		if(@ $_GET['calc_exam']){
			if($_GET['alert_exam_start']==true){
				$res = $this->model->model_17_1($_GET['calc_exam'],0);
				for($i=0;$i<count($res);$i++){	
					$info = "بازه برگزاری آزمون شما بزودی آغاز خواهد شد";
					$this->usr_home();
					$this->chat_id = $res[$i]["_user"];
					$this->sendMessage($info,"");
				}
			}else if($_GET['force']==true){
				echo 1;
				$res = $this->model->model_17_1($_GET['calc_exam'],1);
				for($i=0;$i<count($res);$i++){
					print_r($res[$i]);
					$this->chat_id = $res[$i]["_user"];
					$examitem = $res[$i]["exam"];
					$this->model->model_9($examitem);
					//$this->sendMessage("آزمون شما به پایان رسیده است");
				}
			}else{
				$this->model->model_17($_GET['calc_exam']);
				$res = $this->model->model_17_1($_GET['calc_exam'],3);
				for($i=0;$i<count($res);$i++){	
					$info = "کارنامه آزمون ";
					$info .= $res[$i]["name"]."\n";
					$info .= "تاريخ ".$this->jdate->date("y/m/d",strtotime($res[$i]["start_time"]) );
					$this->chat_id = $res[$i]["_user"];
					$this->sendMessage($info,"");
					$this->sendMessage("http://andishmand.net/workbook?user-id=".$res[$i]["_user"]."&azmon-id=".$_GET['calc_exam']);
				}
				for($i=0;$i<count($res);$i++){
					$this->chat_id = $res[$i]["_user"];
					echo p.$this->chat_id .p;
					$this->res_pdf($_GET['calc_exam'],$res[$i]["_user"]);
				}
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
					if($Text) $this->answerCallback($this->usr_al3);//.":".implode(":",$Text));
			}
		}else{
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
					$res = $model->model_2($FirstName, $LastName, $Username, $chat_id, $phone);//ok
					if($res){
						$this->sendMessage("ثبت نام شما با موفقيت انجام گرديد",'{"hide_keyboard":true}');
						$this->usr_home($MessageID,$Text);
					}else{
						$this->sendMessage("روند ثبت نام شما با خطا مواجه شده است، لطفا مجددا اقدام فرماید");
					}
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
				for($i=0;$i<count($list);$i++){
					$names[$i] = [$list[$i]["name"]." تاريخ ".$this->jdate->date("y/m/d",strtotime($list[$i]["start_time"]) )];
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
		$rest = "نتايج اوليه آزمون  شما به اين شرح است"."\n";
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
		$this->answerCallback("کارنامه نهايي شما به زودي براي شما ارسال مي گردد.");	
		$this->sendMessage("","",$res);
		$this->usr_home();
	}
	public function res_pdf         ($_exam,$_user){
		$input = ['http://andishmand.com/workbook?user-id='.$_user.'&azmon-id='.$_exam];
        $dir = '_Temp/exam_user/'.$_user.'-'.$_exam;
        $options = '';
		//$glob = new \_Helpers\glob($input);
		//$glob->batch('convertor::pdf',$glob->files,$dir,$glob->dirs);
		$pdf = 'http://andishmand.net/_Temp/exam_user/'.$_user.'-'.$_exam.'.jpg';
		$cmd = exec('phantomjs rasterize.js "http://andishmand.net/workbook?user-id='.$_user.'&azmon-id='.$_exam.'" /home/admin/public_html/_Temp/exam_user/'.$_user.'-'.$_exam.'.jpg 2>&1');
		//echo "<pre>$cmd</pre>";
		$this->sendMessage("","",$pdf."?i=".rand());
		$this->model->model_17_2($_exam,$_user,$pdf);
	}
	public  function tst_home       ($MessageID,$Text){
		date_default_timezone_set("Asia/Tehran");
		//echo date_default_timezone_get();
		switch($Text[1]){
			case "":
				$exam = $this->model->model_4($this->chat_id);//ok
				if (count($exam)==0){
					$info = "درحال حاضر آزمون فعالي تعريف نشده است";
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
							."مدت پاسخگويي:$dur"."\r\n"	
							."تعداد ثبت نام کنندگان: $users"."\r\n.\r\n";
					$this->editMessage($MessageID,$info,$this->inline($names,$ids,"tst:"));
				}else{
					$info = "زمان شروع آزمون بعدي : "
						.$this->jdate->date("y/m/d H:i",strtotime($exam[0]["start_time"]) )."";
					$info .="تا " . $this->jdate->date(" H:i",strtotime($exam[0]["end_time"]) ) ;
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
				$this->tst_start($MessageID,$Text,(int)$Text[3]+1);
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
		$exam  = (int)$Text[2];
		$num   = (int)$Text[3];
		$key   = (int)$Text[4];
		$control=(int)$Text[5];
		$total = (int)$Text[6];
		$dur   = (int)$Text[7];
		$start = (int)$Text[8];
		$question = $this->model->model_7($exam,$next);
		$cap = "سوال شماره ".$next;
		if($first){
				$this->answerCallback("آزمون شما آغاز گرديد، موفق باشيد!");
				$this->editMessage($MessageID,"","");
		}else{
			if($next>$total){
				$this->answerCallback("سوالات شما به اتمام رسيده است!");
				return false;
			}else if(($this->now()-$start) > $dur){
				$this->answerCallback("زمان آزمون به پايان رسيده است!");
				$this->tst_end($MessageID,$Text);
				return false;
			}else if($question==false) {
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
			$this->answerCallback("جواب شما ثبت گرديد");
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
			$status  = "زمان باقيمانده:".($dur-(int)($this->now()-(int)($start)))."دقيقه - "; 
			$status .= "سوالات باقيمانده:".($total-$num);	
			$this->answerCallback($status,true);
	}
	public  function tst_end        ($MessageID,$Text){
		$exam  = $Text[2];//!
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
		$this->answerCallback("آزمون شما به اتمام رسيد، خسته نباشيد!");
		$this->res_personal($MessageID,$Text);
	}
	private function tst_keys       ($exam,$num,$key,$control,$total,$dur,$start){
		$ins = [$this->tst_in0,$this->tst_in1,$this->tst_in2,$this->tst_in3,$this->tst_in4];
		$in = $ins[$key];
		$im = [["opt:$exam:$num:4:$control:$total:$dur:$start","opt:$exam:$num:3:$control:$total:$dur:$start","opt:$exam:$num:2:$control:$total:$dur:$start","opt:$exam:$num:1:$control:$total:$dur:$start"]];
		if($control){
			$in .="||";
			if($total==$num){
				$in	.="⏹ اتمام آزمون"."|";
				$nkey = "finish";
			}else{
				$in	.="⏪ سوال بعد"."|";
				$nkey = "next";
			}		
			$in	.="📶 "."وضعیت آزمون"."|";
			array_push($im,["$nkey:$exam:$num:$key:1:$total:$dur:$start","status:$exam:$num:$key:1:$total:$dur:$start"]);
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
