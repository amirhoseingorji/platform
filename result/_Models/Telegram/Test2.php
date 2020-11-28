<?php
namespace _Models\Telegram;
class Test2{

	protected $server = 'localhost';
	protected $dbname = 'exam';
	protected $dbUser = 'root';
	protected $dbPass = 'it@ndishmand';

    public function __construct(){
     //  $db = $this->db = new \_Helpers\Db($this->dbname,$this->dbUser,$this->dbPass,$this->server);
    }

    public function saveFile($name , $answer , $date , $file , $listOfConvert){
        $answerExp = explode('-', $answer);
    	$contentLast = $this->db->content->insert([
    		'name' 	   => $name ,
    		'_user'    => 1 , 
    		'add_time' => date('Y/m/d'),
    		'mod_time' => $date
    	]);
        $userFile = $this->saveUserfile($file , $listOfConvert);
        $contetItem = $this->db->content->item->insert([
            'pid' => 0 ,
            '_content' => $contentLast ,
            '_user_file' => $userFile[0] ,
            'answer' => $answer
        ]);
        foreach ($listOfConvert as $key => $value) {
            $this->db->content->item->insert([
                'pid' => $contetItem ,
                '_content' => $contentLast ,
                '_user_file' => $userFile[$key+1] ,
                'answer' => $answerExp[$key]
            ]);
        }
    	return 'با موفقیت انجام شد';
    }

    public function saveUserfile($filename , $listOfConvert , $user = 1){
        $fileEx = explode('.', $filename);
        $listId = [];
        $ext = end($fileEx);
        $fileType = $this->db->user->file->type->select([
            ['name' => $ext]
        ]);
        if(count($fileType) > 0){
            $userFile = $this->db->user->file->insert([
                'name' => $filename ,
                'prewiew' => $filename ,
                'telegramFile' => $filename ,
                '_user' => $user ,
                '_user_file_type' => $fileType[0]['id']
            ]);
            array_push($listId, $userFile);
            foreach ($listOfConvert as $key => $value) {
                $fileType2 = $this->db->user->file->type->select([
                    ['name' => $ext]
                ]);
                $userFileId = $this->db->user->file->insert([
                    'pid' => $userFile ,
                    'name' => $value ,
                    'prewiew' => $value ,
                    'telegramFile' => $value ,
                    '_user' => $user ,
                    '_user_file_type' => $fileType2[0]['id']
                ]);
                array_push($listId, $userFileId);
            }
            return $listId;
        }
        
    }

    public function createExam(){

    }

    public function model_1($user_id){
        $user = $this->db->user->select([
            ['id' => $user_id]
        ]);
        return count($user);
    }

    public function model_2($fname , $lname , $telegramId , $chatId , $phone){
        $this->db->user->insert([
            'id'   => $chatId ,
            'name' => $fname.' '.$lname
        ]);

        $user = $this->db->user->info->insert([
            '_user'       => $chatId ,
            'first_name'  => $fname ,
            'last_name'   => $lname ,
            'full_name'   => $fname.' '.$lname ,
            'telegram_id' => $telegramId ,
            'mobile'      => $phone
        ]);
        $this->model_3($chatId);
        return is_numeric($user)? true : false;
    }

    public function model_3($user){
        $par = [[]];
        $par[0]['end_time'] = '> now()';
        $par[0][0]['pid'] = '0';
        $examItem = $this->db->exam->item->select($par);
        foreach ($examItem as $examItemes) {
            $examUserLast = $this->db->exam->user->insert([
                'pid' => 0 ,
                '_user' => $user ,
                '_exam_item' => $examItemes['id']
            ]);

            $parm = [[]];
            $parm[0]['pid'] = $examItemes['id'];
            $examItemchild = $this->db->exam->item->select($parm);
            foreach ($examItemchild as  $examItemchilder) {
                $this->db->exam->user->insert([
                    'pid' => $examUserLast ,
                    '_user' => $user ,
                    '_exam_item' => $examItemchilder['id']
                ]);
            }
        }
    }



    public function model_4($user){
        $par = [[]];
        $par[0]['_user'] = $user;
        $par[0][0]['status'] = '< 2';
        $par[1]['end_time'] = '> now()';
        $par['num'] = 1;
        $par['order'] = 'start_time';
        $par['asc'] = true;
        $par['cols'] = "start_time , showcount , name , _exam_item";
        return $this->db->exam->user->join($this->db->exam->item,["_exam_item" , "id"])->select($par);
    }

    public function model_4_1($exam_item){
        $par = [[]];
        $par[0]['pid'] = $exam_item;
        $par['cols'] = "SUM(duration) AS duration, SUM(count) AS count, GROUP_CONCAT(`name`) AS parts";
        return $this->db->exam->item->select($par);
    }
    
    public function model_5($user_id , $_exam_item){

        $par=[[]];
        $par[0]['_user']= $user_id;
        $par[0][0]['_exam_item']= $_exam_item;
        $par['cols'] = "status , id";
        $res = $this->db->exam->user->select($par);
        $status =$res[0]["status"];
        $examUser = $res[0]["id"];
        
        if($status == 0){
            $where = [];
            $where['_user'] = $user_id;
            $where[0]['_exam_item'] = $_exam_item;
            $this->db->exam->user->update(
                ['status' => 1],
                $where
            );

            $par =[[]];
            $par[0]['pid'] = $_exam_item;
            $par[1]['pid'] = '> 0';
            $par['cols'] = 'content_item.id as _content_item , answer';
            $par['order'] = 'exam_item.id';
            $listExam = $this->db->exam->item->join($this->db->content->item,["_content","_content"])->select($par);
            $i = 1;
            foreach ($listExam as $listExamer) {
                $this->db->exam->user->answer->insert([
                    'number' => $i,
                    '_user' => $user_id ,
                    '_exam_item' => $_exam_item ,
                    '_exam_user' => $examUser ,
                    '_content_item' => $listExamer['_content_item'] ,
                    'real_answer' => $listExamer['answer']
                ]);
                $i++;
            }
        }
        
        return $examUser; 
        
    }

    public function model_6($_exam_user , $question , $msgId){
        $par =[];
        $par['_exam_user'] = $_exam_user;
        $par[0]['number'] = $question;
        $this->db->exam->user->answer->update(
            ['add_time' => '`id`-`id`+now()' , 'msgId' => $msgId] ,
            $par
        );
        $this->db->exam->user->update(
            ['showcount' => '`showcount`+1'],
            ['id' => $_exam_user]
        );
    }

    public function model_7($_exam_user , $question){
        $par =[[]];
        $par[0]['_exam_user'] = $_exam_user;
        $par[0][0]['number'] = $question;
        $par['cols'] = 'telegramFile , exam_user_answer.add_time AS add_time, exam_user_answer.id';
        $listExam = $this->db->exam->user->answer->join($this->db->content->item,["_content_item","id"])->join($this->db->user->file,["","_user_file","id"])->select($par);
        if($listExam[0]['add_time'] == NULL){
            return 'http://forushy.com/'.$listExam[0]['telegramFile'];
        }else{
            return false;
        }
        
    }

    public function model_8($_exam_user , $question , $answer){
        $par =[];
        $par['_exam_user'] = $_exam_user;
        $par[0]['number'] = $question;
        $this->db->exam->user->answer->update([
            'changes' => '`changes`+1',
            'user_answer' => $answer ,
            'first_time' => '`id`-`id`+if(`changes`=1,now(),`first_time`)'
            ] ,
            $par
        );
    }

    public function model_9($exam , $user){
         $this->model_4($exam , $user);
    }

    public function model_10($user_id , $exam_id){ // show next question
        $examUser = $this->db->exam->user->select([
            ['_user' => $user_id]
        ]);
        $showcount = $examUser[0]['showcount'];
        $contentItem = $this->db->content->item->select([
            ['id' => $examUser[$showcount]['_content_item']]
        ]);
        $userFile = $this->db->user->file->select([
            ['id' => $contentItem[0]['_user_file']]
        ]);
        return json_encode($userFile);
    }

    public function model_11($exam_id , $user_id){
        $list = [];
        $exam = $this->db->exam->select([
            ['id' => $exam_id]
        ]);
        $examItem = $this->db->exam->item->select([
            ['_exam' => $exam_id]
        ]);
        $contentItem = $this->db->content->item->select([
            [ 'id' => $examItem[0]['_content_item'] ]
        ]);
        $examUser = $this->db->exam->user->select([
            ['_content_item' => $examItem[0]['_content_item'] ]
        ]);
        $list = [
            'examStartTime' => $exam[0]['mod_time'] ,
            'userExamStartTime' => $examItem[0]['start_time'] ,
            'userExamEndTime' => $examItem[0]['end_time'] ,
            'allcount' => count($contentItem) ,
            'showCount' => $examUser[0]['showcount']
        ];
        return json_encode($list);
    }

    public function model_12($exam_id){
        $date = date('Y-m-d H:i:s');
        $examItem = $this->db->exam->item->select([
            'where' => '_exam = ' . $exam_id . ' AND start_time > '. $date .' AND end_time < '.$date
        ]);
        if(count($examItem) > 0){
            $examUser = $this->db->exam->user->select([
                'where' => '_exam_item = '.$examItem[0]['id'].' AND start_exam < '.$date.' AND end_exam > '.$date
            ]);
            if(count($examUser) > 0){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public function model_13($user_id , $exam_id){ // update and return realdueration
        $examItem = $this->db->exam->item->select([
            ['_exam' => $exam_id]
        ]);
        $realdate = date('Y-m-d h:i:s') - $examItem[0]['start_time'];
        $examUser = $this->db->exam->user->update(
            ['realduration' => $realdate ] ,
            [
                '_user'         => $user_id ,
                '_exam_item'    => $examItem[0]['id'] ,
                '_content_item' => $examItem[0]['_content_item'] 
            ]
        );
        return $realdate;
    }

    public function model_14($user_id , $exam_id){
        $conditions = '';
        $conditions .= '_user = '.$user_id;

        $examItem = $this->db->exam->item->select([
            ['_exam' => $exam_id]
        ]);
        $conditions .= 'AND _exam_item = '.$examItem[0]['id'];
        
        $examUser = $this->db->exam->user->select([
            'where' => '_user = '.$user_id.' AND _exam_item ='.$examItem[0]['id']
        ]);
        $conditions .= 'AND _exam_user = '.$examUser[0]['id'];
        $examUserAnswer = $this->db->exam->user->answer->select([
            'where' => $conditions
        ]);
        $corect = 0 ; $incorect = 0 ; $nazade = 0;
        foreach ($examUserAnswer as $key => $value) {
            if($value['user_answer'] == $value['real_answer']){
                $corect++;
            }elseif($value['user_answer'] == 0){
                $nazade++;
            }else{
                $incorect++;
            }
        }
        $percent = (($corect)/($corect+$incorect))*100;
        $this->db->exam->user->update(
            [
                'correct' => $corect ,
                'incorrect' => $incorrect ,
                'percent' => $percent
            ],
            ['id' => $examUser[0]['id']]
        );
/*
        $examUserLast = $examUser = $this->db->exam->user->select([
            'where' => '_user = '.$user_id.' AND _exam_item ='.$examItem[0]['id']
        ]);*/
        $result = [
            'dars' => $examItem[0]['name'] ,
            'corect' => $corect , 
            'incorect' => $incorect ,
            'nazade' => $nazade ,
            'percent' => $percent
        ];

        return $result;
    }

    public function model_14_1($exam_id){
        $examItem = $this->db->exam->item->select([
            ['_exam' => $exam_id]
        ]);
        $examUser = $this->db->exam->user->select([
            ['_exam_item' => $examItem[0]['id']]
        ]);
        $sum = 0 ; $sum2 = 0;
        foreach ($examUser as $key => $value) {
            $sum += $examUser[0]['percent'];
            $sum2 += ($examUser[0]['percent']*$examUser[0]['percent']);
        }

        $this->db->exam->item->update(
            [
                'sum'  => $sum , 
                'sum2' => $sum2
            ] ,
            ['id' => $examItem[0]['id']]
        );

        $examItemLast = $this->db->exam->item->select([
            ['_exam' => $exam_id]
        ]);

        return json_encode($examItemLast);
    }

    public function model_15($user_answer , $user_id){
        $examUser = $this->db->exam->user->select([
            ['_user' => $user_id]
        ]);

        $examItem = $this->db->exam->item->select([
            ['id' => $examUser[0]['_exam_item']]
        ]);

        $contentItem = $this->db->content->item->select([
            ['id' => $examUser[0]['_content_item']] 
        ]);
        $this->db->exam->user->answer->update([
            ['user_answer' => $user_answer] ,
            [
                '_user' => $user_id , 
                '_exam_item' => $examItem[0]['id'] ,
                '_exam_user' => $examUser[0]['id'] ,
                '_content_item' => $contentItem[0]['id']
            ]
        ]);
    }

    public function model_16($user_id , $exam_id){
        $conditions = '';
        $conditions .= '_user = '.$user_id;

        $examItem = $this->db->exam->item->select([
            ['_exam' => $exam_id]
        ]);
        $conditions .= 'AND _exam_item = '.$examItem[0]['id'];
        
        $examUser = $this->db->exam->user->select([
            'where' => '_user = '.$user_id.' AND _exam_item ='.$examItem[0]['id']
        ]);
        $conditions .= 'AND _exam_user = '.$examUser[0]['id'];
        $examUserAnswer = $this->db->exam->user->answer->select([
            'where' => $conditions
        ]);
        return $examUserAnswer;
    }

    public function model_17($exam){
        $examItem = $this->db->exam->item->select([
            ['_exam' => $exam]
        ]);
        $blanceT = 0; $c = 0;
        foreach ($examItem as $examItemes) {
            $rank = [];
            $examUserCount = $this->db->exam->user->select([
                ['_exam_item' => $examItemes['id']]
            ]);
            $dev = sqrt( ( $examItemes['sum2'] / $examUserCount ) - ( pow( ($examItemes['sum'] / $examUserCount), 2) ) );
            $this->db->exam->item->update(
                ['deviation' => $dev] ,
                ['id' => $examItemes['id']]
            );
            $examUser = $this->db->exam->user->select([
                ['_exam_item' => $examItemes['id']]
            ]);
            $xBar = ($examItemes['sum'])/($examUserCount*$dev);
            foreach ($examUser as $examUseres) {
                $z = ( ($examUseres['percent']/100) / $dev) - $xBar;
                $blance = ( 1000 * $z ) + 5000;
                $this->db->exam->user->update(
                    ['balance' => $blance] ,
                    ['id' => $examUseres['id']]
                );
                $c++;
                $blanceT += $blance;
            }// end foreach

            $examUserLast = $this->db->exam->user->select([
                ['_exam_item' => $examItemes['id']]
            ]);
            foreach ($examUserLast as $examUserLaster) {
                array_push($rank, [ $examUserLaster['id'] => $examUserLaster['balance'] ]);
            }// end foreach
            $merged = call_user_func_array('array_merge', $rank);
            arsort($merged);
            $rnking = 0;
            foreach ($merged as $keyM => $mergeder) {
                $rnking++;
                $this->db->exam->user->update(
                    ['rank' => $rnking] ,
                    ['id' => $keyM]
                );
            }// end foreach
        }
    }

    public function model_18($user_id , $exam_id){
        
    }

    public function model_19($user_id , $comment , $to){
        $last = $this->db->user->comment->insert([
            '_user@from' => $user_id ,
            '_user@to' => $to ,
            '_product_item' => 1 ,
            'comment' => $comment ,
        ]);
        return is_numeric($last) ? true : false;
    }

    public function model_20($user , $exam){
        $examItem = $this->db->exam->item->select([
            ['_exam' => $exam]
        ]);
        $examUser = $this->db->exam->user->select([
            'where' => '_user = '.$user.' AND _exam_item = '.$examItem[0]['id']
        ]);
        $examUserAnswer = $this->db->exam->user->answer->select([
            'where' => '_user = '.$user.' AND _exam_item = '.$examItem[0]['id'].' AND _exam_user =' .$examUser
        ]);
        return count($examUserAnswer) > 0 ? $examUserAnswer[$examUser[0]['showcount']-1]['user_answer'] : false;
    }


    public function validFile($file , $valid = array()){
    	$fileEx = explode('.', $file);
    	$ext = end($fileEx);
    	if(in_array($ext, $valid))
    		return true;
    }

}
?>
