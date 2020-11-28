<?php
function trace($r){
	$t = file_get_contents("tmp.txt");
	$t .= "\r\n".$r;
	file_put_contents("tmp.txt",$t);
	return $t;
}
function renum($r){
	return $r;
	}
function fit($r,$l){
	$space = "                                        ";
	return $r.substr($space,0,$l-strlen($r));
}
function http_post($vars,$url){
    $urlencoded = "";
    while (list($key, $value) = each($vars))
      {
      $urlencoded.= urlencode($key)."=".$value."&";
      }
    $urlencoded = substr($urlencoded, 0, -1);
    $ch = curl_init();    // initialize curl handle
    curl_setopt($ch, CURLOPT_URL,$url); // set url to post to
    curl_setopt($ch, CURLOPT_FAILONERROR, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1); // return into a variable
    curl_setopt($ch, CURLOPT_TIMEOUT, 5); // times out after 5s
    curl_setopt($ch, CURLOPT_POST, 1); // set POST method
    curl_setopt($ch, CURLOPT_POSTFIELDS, $urlencoded); // add POST fields
    $result = curl_exec($ch); // run the whole process
    curl_close($ch); 
    return $result;
    
}
function f0($chatid,$phone,$id){
	$List = array("chatid" => $chatid, "phone" => $phone, "user" => $id);
	return http_post($List , 'http://sms.andishmand.ir/telgram0.php');
}
function f1($text , $User , $id){
	$List = array("from" => $User, "body" => $text, "id" => $id);
	return http_post($List , 'http://sms.andishmand.ir/telgram.php');
	/*$ch = curl_init();
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL, 
		'http://sms.andishmand.ir/telgram.php?from='.$User.'&body='.$text.'&id='.$id
	);
	curl_setopt($ch, CURLOPT_FAILONERROR, 1);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5); // times out after 5s
	$content = curl_exec($ch);
	return $content;*/
	}
function f2($text , $User){
	$List = array("from" => $User, "body" => $text, "id" => $id);
	return http_post($List , 'http://sms.andishmand.ir/telgram2.php');
	}
	include("telegram.php");
	$bot_id = '488759408:AAEoCBlXjxWMhAav8mw-oUO5F1AWDhDRCL8';
	$telegram = new Telegram($bot_id);
	$chat_id = $telegram->ChatID();
	$chat_id = $chat_id?$chat_id:$telegram->Callback_ChatID();
	$MessageID = $telegram->MessageID();
	$Text = $telegram->Text();
	$FirstName = $telegram->FirstName();
	$LastName = $telegram->LastName();
	$Username =  $telegram->Username();
	$phone =  $telegram->message()["contact"]["phone_number"];
	$Location = $telegram->Location();
	$Callback_Data = $telegram->Callback_Data();
	$hres= $Text!=""?$Text:$Callback_Data;
	if(substr($hres,0,6) == "/start"){
		$hres = substr($hres,7,strlen($hres)-7);
	}
	//trace('hres'.$hres);
    $Callback_Query = $telegram->Callback_Query();
	$Callback_ID = $telegram->Callback_ID();	
	$User = $FirstName.' '.$LastName.'@'.$Username;
	if ( !isset( $LastName )and isset( $Username ) ) {
		$User = $FirstName . '@' . $Username;
	} elseif ( isset( $LastName )and!isset( $Username ) ) {
		$User = $FirstName . ' ' . $LastName;
	} elseif ( !isset( $LastName )and!isset( $Username ) ) {
		$User = $FirstName;
	}
//=================
//فعالسازی کاربری
	$reply_mar0 = $telegram->buildInlineKeyboardButton('ارسال مجدد');
  	$reply_mar0['callback_data'] = $hres;
	$keyboard0 = array(array($reply_mar0));
	$reply_markup0 = $telegram->buildInlineKeyBoard($keyboard0);
//ورودی اشتباه
	$reply_mar_comm = $telegram->buildInlineKeyboardButton('ثبت به عنوان نظرات');
	$reply_mar_comm['callback_data'] =  "comment:".$hres;
	$keyboard_comm = array(array($reply_mar_comm));
	$reply_markup_comm = $telegram->buildInlineKeyBoard($keyboard_comm);
// انتخاب پایه تحصیلی
	$p1 = $telegram->buildInlineKeyboardButton('اول ابتدایی');
	$p2 = $telegram->buildInlineKeyboardButton('دوم ابتدایی');
	$p3 = $telegram->buildInlineKeyboardButton('سوم ابتدایی');
	$p4 = $telegram->buildInlineKeyboardButton('چهارم ابتدایی');
	$p5 = $telegram->buildInlineKeyboardButton('پنجم ابتدایی');
	$p6 = $telegram->buildInlineKeyboardButton('ششم ابتدایی');
	$p1[ 'callback_data' ] = "paye:01";
	$p2[ 'callback_data' ] = "paye:02";
	$p3[ 'callback_data' ] = "paye:03";
	$p4[ 'callback_data' ] = "paye:04";
	$p5[ 'callback_data' ] = "paye:05";
	$p6[ 'callback_data' ] = "paye:06";
	$keyboard_paye = array(array($p2,$p1),array($p4,$p3),array($p6,$p5));
	$reply_markup_paye = $telegram->buildInlineKeyBoard($keyboard_paye);
//ثبت حساب کاربری
	$reply_mar1 = $telegram->buildKeyboardButton('ثبت مشخصات',true,false);
	$keyboard1 = array(array($reply_mar1));
	$reply_markup1 = $telegram->buildKeyBoard($keyboard1, true , true , true);
//کلید های اصلی
	$keyboard = array(
		array('مشاهده کارنامه','شروع آزمون','ثبت نام در آزمون جدید')
	);
	$reply_markup = $telegram->buildKeyBoard($keyboard, true , true , true);
//===================
	
	

//trace(f0($chat_id));
$xphone = $phone;
$phone = $phone!=""?$phone:f0($chat_id);
	$reply_markup = ($phone!="") ? $reply_markup: $reply_markup1;
	if($Text == '/start')	{
		if($reply_markup == $reply_markup1){
			$reply = "به سیستم هوشمند آزمون های اندیشمند خوش آمدید \n"
				." جهت استفاده از آزمون ها می بایست اطلاعات خود را توسط کلید پایین صفحه ثبت بفرمایید" ;
		}else{
			$reply = "با سلام و خوش آمد گویی مجدد شما به سیستم هوشمند آزمون های اندیشمند \n"
			."می توانید از کلید های پایین جهت ثبت نام و شرکت در آزمون استفاده کنید";
		}
		$content = array('chat_id' => $chat_id, 'text' => $reply , 'reply_markup' => $reply_markup);
		$telegram->sendMessage($content);
		
	}elseif($Text == $keyboard[0][2])	{
		if($reply_markup == $reply_markup1){
			$reply =" جهت استفاده از آزمون ها می بایست اطلاعات خود را توسط کلید پایین صفحه ثبت بفرمایید";
			$content = array('chat_id' => $chat_id, 'text' => $reply , 'reply_markup' => $reply_markup);
		}else{
			$reply = $hres.": \n لطفا ابتدا پایه تحصیلی را انتخاب فرمایید";
			$content = array('chat_id' => $chat_id, 'text' => $reply , 'reply_markup' => $reply_markup_paye);
		}

		$telegram->sendMessage($content);
 	}elseif($Text == $keyboard[0][1])	{
		if($reply_markup == $reply_markup1){
			$reply =" جهت استفاده از آزمون ها می بایست اطلاعات خود را توسط کلید پایین صفحه ثبت بفرمایید";
			$content = array('chat_id' => $chat_id, 'text' => $reply , 'reply_markup' => $reply_markup);
		$telegram->sendMessage($content);
		}else{
			//بررسی تعداد آزمون های ثبت نامی
			if(false){
			$reply = "شما در هیچ آزمونی ثبت نام نکرده اید. لطف ابتدا از طریق کلید ثبت نام اقدام فرمایید";
			$content = array('chat_id' => $chat_id, 'text' => $reply , 'reply_markup' => $reply_markup);
			}else{
				// دریافت و نمایش آزمون های ثبت نام شده
				$testlist = array(
				array("134"," ریاضی مقدماتی...",0,1),
				array("123","ریاضی تاصفحه40","9صبح12-9-96",1)
				);
				$keyboard_tests = array();
				for($i=0;$i<count($testlist);$i++){
				$btn =  $telegram->buildInlineKeyboardButton(fit($testlist[$i][1],40)."پایه ".$testlist[$i][3]."     ".($testlist[$i][2]?$testlist[$i][2]:"✅"));
				$btn[ 'callback_data' ] = $testlist[$i][2]?"cancle":"pre:".$testlist[$i][0];	
				array_push($keyboard_tests,array($btn))	;
				}
				$btn1 =  $telegram->buildInlineKeyboardButton("انصراف❌");
				$btn1[ 'callback_data' ] = "cancle";		
				array_push($keyboard_tests,array($btn1));	
				$reply_markup_tests = $telegram->buildInlineKeyBoard($keyboard_tests);
				
			$reply = "شما در آزمون های زیر ثبت نام کرده اید";
			$content = array('chat_id' => $chat_id, 'text' => $reply , 'reply_markup' => $reply_markup_tests);
			}
		$telegram->sendMessage($content);
		}
		
	}elseif($Text == $keyboard[0][0])	{
		if($reply_markup == $reply_markup1){
			$reply =" جهت استفاده از آزمون ها می بایست اطلاعات خود را توسط کلید پایین صفحه ثبت بفرمایید";
		}else{
		$reply = "شروع کارنامه";
		}
		$content = array('chat_id' => $chat_id, 'text' => $reply , 'reply_markup' => $reply_markup);
		$telegram->sendMessage($content);
	}else{
		//اتصال از طریق آدرس 
		if(substr($Text,0,6) == "/start"){
			//$reply = "";
			//$content = array('chat_id' => $chat_id, 'text' => $reply , 'reply_markup' => $reply_markup);
			//$telegram->sendMessage($content);
			$Text = substr($Text,7,strlen($Text)-7);
		}
	if($Callback_Data!=""){
		$Text = $hres;
		if($reply_markup == $reply_markup1){
			$reply = " جهت استفاده از آزمون ها می بایست اطلاعات خود را توسط کلید پایین صفحه ثبت بفرمایید";
			$reply .= ($reply==$Callback_Query["message"]["text"])?"!":"";
			$content = array('chat_id' => $chat_id,'message_id'=>$Callback_Query["message"]["message_id"], 'text' => $reply, 'reply_markup' => $reply_markup0);
			$telegram->editMessageText($content);
		}else{
			//trace($Text);
			if(substr($Text,0,8) == "comment:"){
			$reply = "نظر شما ثبت گردید";
				//ثبت نظرات
			$content = array('chat_id' => $chat_id,'message_id'=>$Callback_Query["message"]["message_id"], 'text' => $reply);
				$telegram->editMessageText($content);
			}elseif($Text== "paye"){
			$reply ="ثبت نام در آزمون جدید".": \n لطفا ابتدا پایه تحصیلی را انتخاب فرمایید";
			$content = array('chat_id' => $chat_id,'message_id'=>$Callback_Query["message"]["message_id"], 'text' => $reply, 'reply_markup' => $reply_markup_paye);
				$telegram->editMessageText($content);
			}elseif(substr($Text,0,5) == "paye:"){
				$paye = (int)substr($Text,5,2);
				$reply = "ثبت نام در آزمون جدید".": \n  لطفا آزمون مورد نظر خود را برای پایه ".$paye ." انتخاب فرمایید";
				// دریافت لیست آزمون های فعال
				$testlist = array(
				array("134"," ریاضی مقدماتی...","زمان آزمون آزاد","بدون هزینه"),
				array("123","ریاضی تاصفحه40","9صبح12-9-96","5000 تومان")
				);
				$keyboard_tests = array();
				for($i=0;$i<count($testlist);$i++){
				$btn =  $telegram->buildInlineKeyboardButton(fit($testlist[$i][1],40).fit($testlist[$i][2],40).fit($testlist[$i][3],15));
				$btn[ 'callback_data' ] = "reg:".$testlist[$i][0];	
				array_push($keyboard_tests,array($btn))	;
				}
				$btn1 =  $telegram->buildInlineKeyboardButton("انصراف❌");
				$btn1[ 'callback_data' ] = "cancle";	
				$btn2 =  $telegram->buildInlineKeyboardButton("بازگشت➡️");
				$btn2[ 'callback_data' ] = "paye";	
				array_push($keyboard_tests,array($btn1,$btn2));	
				$reply_markup_tests = $telegram->buildInlineKeyBoard($keyboard_tests);
				$content = array('chat_id' => $chat_id,'message_id'=>$Callback_Query["message"]["message_id"], 'text' => $reply, 'reply_markup' => $reply_markup_tests);
				$telegram->editMessageText($content);
			}elseif($Text == "cancle"){
				$content = array('chat_id' => $chat_id,'message_id'=>$Callback_Query["message"]["message_id"]);
				$telegram->deleteMessage($content);
				$content = array('chat_id' => $chat_id, 'text' => 'می توانید از کلید های پایین جهت ثبت نام و شرکت در آزمون استفاده کنید', 'reply_markup' => $reply_markup);
				$telegram->sendMessage($content);
			}elseif(substr($Text,0,4) == "reg:"){
				
				//$id = substr($Text,4);
				$reply = "✅ثبت نام شما در آزمون با موفقیت انجام شد";
				$content = array('chat_id' => $chat_id,'message_id'=>$Callback_Query["message"]["message_id"], 'text' => $reply);
				$telegram->editMessageText($content);
				$content = array('chat_id' => $chat_id, 'text' => 'می توانید از کلید های پایین جهت ثبت نام و شرکت در آزمون استفاده کنید', 'reply_markup' => $reply_markup);
				$telegram->sendMessage($content);
			}elseif(substr($Text,0,4) == "pre:"){
				
				$id = substr($Text,6);
				// محاسبه زمان و ارسال سوال شماره1
				$reply = "آزمون شماره $id برای شما آماده است \n شما در این آزمون باید به 10 سوال در مدت زمان 20 دقیقه پاسخ بدهید ";
				$btn1 =  $telegram->buildInlineKeyboardButton("شروع آزمون");
				$btn1[ 'callback_data' ] = "start:$id:1:0:0";
				$btn2 =  $telegram->buildInlineKeyboardButton("انصراف");
				$btn2[ 'callback_data' ] = "cancle";
				$keyboard_tests = array();
				array_push($keyboard_tests,array($btn1));
				array_push($keyboard_tests,array($btn2));
				$reply_markup_tests = $telegram->buildInlineKeyBoard($keyboard_tests);
				$content = array('chat_id' => $chat_id,'message_id'=>$Callback_Query["message"]["message_id"], 'text' => $reply, 'reply_markup' => $reply_markup_tests);
				
				$telegram->editMessageText($content);
			}elseif(substr($Text,0,6) == "start:"){
				$back = explode(":",$Text);
				$tid = (int)$back[1];
				$sid = (int)$back[2];
				$ans = (int)$back[3];
				$msg = (int)$back[4];
				if($sid!=1){//حذف کلیدسوال بعد در  سوال قبلی
					$pid = $sid-1;
					$nxt = 0;
				$btn1 =  $telegram->buildInlineKeyboardButton(($ans==1?"✅":"")."گزینه 1");
				$btn1[ 'callback_data' ] = "ans:$tid:$pid:1:$nxt";	
				$btn2 =  $telegram->buildInlineKeyboardButton(($ans==2?"✅":"")."گزینه 2");
				$btn2[ 'callback_data' ] = "ans:$tid:$pid:2:$nxt";
				$btn3 =  $telegram->buildInlineKeyboardButton(($ans==3?"✅":"")."گزینه 3");
				$btn3[ 'callback_data' ] = "ans:$tid:$pid:3:$nxt";	
				$btn4 =  $telegram->buildInlineKeyboardButton(($ans==4?"✅":"")."گزینه 4");
				$btn4[ 'callback_data' ] = "ans:$tid:$pid:4:$nxt";	
				$keyboard_tests = array();
				array_push($keyboard_tests,array($btn2,$btn1));
				array_push($keyboard_tests,array($btn4,$btn3));
				$reply_markup_tests = $telegram->buildInlineKeyBoard($keyboard_tests);
				$content = array('chat_id' => $chat_id,'message_id'=>$Callback_Query["message"]["message_id"], 'reply_markup' => $reply_markup_tests);
				$telegram->editMessageReplyMarkup($content);	
				}else{
					
				$content = array('callback_query_id'=>$Callback_Query["id"], 'text' => 'آزمون شما آغاز شد');
				$telegram->answerCallbackQuery($content);	
				$reply_markup_tests = $telegram->buildInlineKeyBoard(array(array()));
				$content = array('chat_id' => $chat_id,'message_id'=>$Callback_Query["message"]["message_id"], 'reply_markup' => $reply_markup_tests);
				$telegram->editMessageReplyMarkup($content);	
				}
				$nxt = 1;
				$ans = 0;
				$btn1 =  $telegram->buildInlineKeyboardButton(($ans==1?"✅":"")."گزینه 1");
				$btn1[ 'callback_data' ] = "ans:$tid:$sid:1:$nxt";	
				$btn2 =  $telegram->buildInlineKeyboardButton(($ans==2?"✅":"")."گزینه 2");
				$btn2[ 'callback_data' ] = "ans:$tid:$sid:2:$nxt";
				$btn3 =  $telegram->buildInlineKeyboardButton(($ans==3?"✅":"")."گزینه 3");
				$btn3[ 'callback_data' ] = "ans:$tid:$sid:3:$nxt";	
				$btn4 =  $telegram->buildInlineKeyboardButton(($ans==4?"✅":"")."گزینه 4");
				$btn4[ 'callback_data' ] = "ans:$tid:$sid:4:$nxt";	
				$keyboard_tests = array();
				array_push($keyboard_tests,array($btn2,$btn1));
				array_push($keyboard_tests,array($btn4,$btn3));
				//تعداد سوالات 
				$sidtot = 10;
				if($sid<$sidtot){
				$btn5 =  $telegram->buildInlineKeyboardButton("سوال بعد");
				$btn5[ 'callback_data' ] = "start:$tid:".($sid+1).":$ans:$msg,".$Callback_Query["message"]["message_id"];	
				//	trace($btn5[ 'callback_data' ] .$phone);
				array_push($keyboard_tests,array($btn5));
				}else{
				$btn5 =  $telegram->buildInlineKeyboardButton("پایان آزمون و تصحیح پاسخها");
				$btn5[ 'callback_data' ] = "end:$tid";	
				//	trace($btn5[ 'callback_data' ] .$phone);
				array_push($keyboard_tests,array($btn5));
				}
				$reply_markup_tests = $telegram->buildInlineKeyBoard($keyboard_tests);
				$content = array('chat_id' => $chat_id, 'photo'=>"AgADBAADwqwxG6hfGVGrtlVk5rgZBl0rIBoABDFtaeA1f7HMmb4BAAEC",'caption' =>'سوال شماره  '.$sid, 'reply_markup' => $reply_markup_tests);
				//trace("http://demo.andishmand.ir/pure/questions/final-jpg/r5-505200$sid.jpg-$chat_id");
				//$telegram->sendPhoto($content);
				$bot_id = '488759408:AAEoCBlXjxWMhAav8mw-oUO5F1AWDhDRCL8';
				$bot_url    = "https://api.telegram.org/bot$bot_id/";
				$url = $bot_url . "sendPhoto?chat_id=" . $chat_id ;
				//echo realpath("final-jpg/r5-5052001.jpg").p;
				$post_fields = array('chat_id'   => $chat_id,'photo' => new CURLFile(realpath("final-jpg/r5-505200$sid.jpg"),'image/jpeg'),'caption' =>'سوال شماره  '.$sid, 'reply_markup' => $reply_markup_tests);
				$ch = curl_init(); 
				curl_setopt($ch, CURLOPT_HTTPHEADER, array(
					"Content-Type:multipart/form-data"
				));
				curl_setopt($ch, CURLOPT_URL, $url); 
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
				curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields); 
				$output = curl_exec($ch);
			}elseif(substr($Text,0,4) == "ans:"){
				//بررسی وضعیت آزمون
				$ok = true;
				if(!$ok){
					$reply = "این آزمون برای شما به پایان رسیده و قابل تغییر نمی باشد";
				$content = array('callback_query_id'=>$Callback_Query["id"], 'text' => $reply);
				$telegram->answerCallbackQuery($content);	
				}else{
					$reply =  'پاسخ شما ثبت شد'.$Callback_Query["message"]["message_id"];
				$content = array('callback_query_id'=>$Callback_Query["id"], 'text' =>$reply);
				$telegram->answerCallbackQuery($content);	
				//trace($Text);
				$back = explode(":",$Text);
				//ثبت جواب
				$tid = (int)$back[1];
				$sid = (int)$back[2];
				$ans = (int)$back[3];
				$nxt = (int)$back[4];
				//trace("$Text--$tid--$sid--$ans--$nxt");
				$keyboard_tests = array();
				$btn1 =  $telegram->buildInlineKeyboardButton(($ans==1?"✅":"")."گزینه 1");
				$btn1[ 'callback_data' ] = "ans:$tid:$sid:1:$nxt";	
				$btn2 =  $telegram->buildInlineKeyboardButton(($ans==2?"✅":"")."گزینه 2");
				$btn2[ 'callback_data' ] = "ans:$tid:$sid:2:$nxt";
				$btn3 =  $telegram->buildInlineKeyboardButton(($ans==3?"✅":"")."گزینه 3");
				$btn3[ 'callback_data' ] = "ans:$tid:$sid:3:$nxt";	
				$btn4 =  $telegram->buildInlineKeyboardButton(($ans==4?"✅":"")."گزینه 4");
				$btn4[ 'callback_data' ] = "ans:$tid:$sid:4:$nxt";	
				array_push($keyboard_tests,array($btn2,$btn1));
				array_push($keyboard_tests,array($btn4,$btn3));
				if($nxt==1){
				$btn5 =  $telegram->buildInlineKeyboardButton("سوال بعد");
				$btn5[ 'callback_data' ] = "start:$tid:".($sid+1).":$ans";	
					//trace($btn5[ 'callback_data' ] .$phone);
				array_push($keyboard_tests,array($btn5));
				}
				
				$reply_markup_tests = $telegram->buildInlineKeyBoard($keyboard_tests);
				$content = array('chat_id' => $chat_id,'message_id'=>$Callback_Query["message"]["message_id"], 'reply_markup' => $reply_markup_tests);
				$telegram->editMessageReplyMarkup($content);	
			}
			}
			
		}
	}elseif($xphone!=""){
		f0($chat_id,$phone,$User);
		$content = array('chat_id' => $chat_id, 'text' =>'ضمن تشکر حساب کاربری شما فعال شد'."\n"."می توانید از کلید های پایین جهت ثبت نام و شرکت در آزمون استفاده کنید", 'reply_markup' => $reply_markup);
		$telegram->sendMessage($content);
	}else{
		$content = array('chat_id' => $chat_id, 'text' => 'اطلاعات وارد شده شما معتبر نیست ، درصورتی که نظر ، انتقاد یا پیشنهادی دارید می توانید از طریق کلید ثبت ، این اطلاعات را به اطلاع همکاران ما برسانید', 'reply_markup' => $reply_markup_comm);
		$telegram->sendMessage($content);
	}
}
?>