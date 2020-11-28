<?php
namespace _Models\Telegram;
class home{
	protected $server = 'localhost';
	protected $dbname = 'exam';
	protected $dbUser = 'root';
	protected $dbPass = 'it@ndishmand';

    public function __construct(){
       $db = $this->db = new \_Helpers\Db($this->dbname,$this->dbUser,$this->dbPass,$this->server);
		
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
                    '_exam_item' => $examItemchilder['id'],
                    'workbook' => 'http://forushy.com/_Temp/examFile/user_exam/0.pdf'
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
        $par['cols'] = "start_time , end_time , showcount , name , _exam_item";
        return $this->db->exam->user->join($this->db->exam->item,["_exam_item" , "id"])->select($par);
    }

    public function model_4_1($exam_item){
        $par = [[]];
        $par[0]['pid'] = $exam_item;
        $par['cols'] = "SUM(duration) AS duration, SUM(count) AS count, GROUP_CONCAT(`name`) AS parts";
        return $this->db->exam->item->select($par);
    }
    public function model_4_2($exam_item){
        $par = [[]];
        $par[0]['_exam_item'] = $exam_item;
        $par['cols'] = "count(*) AS users";
        return $this->db->exam->user->select($par)[0]["users"];
    }
    public function model_5($user_id , $_exam_item){

        $par=[[]];
        $par[0]['_user']= $user_id;
        $par[0][0]['_exam_item']= $_exam_item;
        $par['cols'] = "status , id";
        $res = $this->db->exam->user->select($par);
        $status =$res[0]["status"];
        $examUser = $res[0]["id"];
		
        $where = [];
        $where['_user'] = $user_id;
        $where[0]['_exam_item'] = $_exam_item;
		
        if($status == 0){
			$spent = 0;     
            $this->db->exam->user->update(
                ['status' => 1,
				'begin_time' => '`id`-`id`+now()'
				],
                $where
            );

            $par =[[]];
            $par[0]['pid'] = $_exam_item;
            $par[1]['pid'] = '> 0';
            $par['cols'] = 'content_item.id AS _content_item , answer , exam_item.id AS _exam_item';
            $par['order'] = 'exam_item.id';
            $listExam = $this->db->exam->item->join($this->db->content->item,["_content","_content"])->select($par);
            $i = 1;
            foreach ($listExam as $listExamer) {
                $this->db->exam->user->answer->insert([
                    'number' => $i,
                    '_user' => $user_id ,
                    '_exam_item_pid' => $_exam_item,
                    '_exam_item' => $listExamer['_exam_item'] ,
                    '_exam_user' => $examUser ,
                    '_content_item' => $listExamer['_content_item'] ,
                    'real_answer' => $listExamer['answer']
                ]);
                $i++;
            }
        }else{
			$par=[$where];
			$par['cols'] = '`begin_time`-now() as spent';
			$spent = $this->db->exam->user->select($par)[0]['spent'];
		}  
		
        return [$examUser,-1*(int) ($spent/60)]; 
        
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
		$status = $this->db->exam->user->select(['cols'=>'status',0=>['id'=>$_exam_user]])[0][status];
        if($listExam[0]['add_time'] == NULL and $status<2){
            return $listExam[0]['telegramFile'];
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

    public function model_9($_exam_user){
		$status = $this->db->exam->user->select(['cols'=>'status',0=>['id'=>$_exam_user]])[0][status];
		if($status == 1){
			$par =[[]];
			$par[0]['_exam_user'] = $_exam_user;
			$par['group'] = 'exam_user_answer._exam_item';
			$par['cols'] = 'exam_user_answer._exam_item AS _exam_item , SUM(if(`user_answer`=`real_answer`,1,0)) AS corect , (SUM(if(`user_answer` = 0 , 1 , 0))) AS x , COUNT(1) AS count';
			$examUserAnswer = $this->db->exam->user->answer->join($this->db->exam->user , ['_exam_user' , 'id'])->select($par);

			foreach ($examUserAnswer as $key => $examUserAnsweres) {
				$neg = $this->db->exam->item->select([
					'cols' => 'neg_mod' ,
					['id' => $examUserAnsweres['_exam_item']]
				])[0]['neg_mod'];
				$where = [];
				$where['pid'] = $_exam_user; 
				$where[0]['_exam_item'] = $examUserAnsweres['_exam_item'];
				$c = $examUserAnsweres['corect'];
				$x = $examUserAnsweres['x'];
				$n = $examUserAnsweres['count'];
				$i = $n-$x-$c;
				$p = (int) $neg == 1 ? ($c-0.25*$i)/$n*100 : $c/$n*100 ;
				$this->db->exam->user->update([
					'correct' => $c,
					'incorrect' => $i,
					'percent' => $p,
					'total' => $n
					],$where
				);
				$this->db->exam->item->update(
					['sum' => '`sum`+'.$p , 'sum2' => '`sum2`+'.$p*$p] ,
					['id' => $examUserAnsweres['_exam_item']]
				);
			}
			//update total correct - incorrct - total- percent
			$par=[[]];
			$par[0]['pid'] = ">0";
			$par['group'] = 'pid';
			$par['cols'] = "pid,sum(correct) as c, sum(incorrect) as i,sum(total) as t,(sum(correct)-sum(incorrect)/4)/sum(total) as p";
			$sub = substr($this->db->exam->user->select($par,"query"),0,-1);
			$this->db->query("UPDATE exam_user inner JOIN ($sub)AS sorted on exam_user.id=sorted.pid SET exam_user.correct = sorted.c , exam_user.incorrect = sorted.i, exam_user.percent = sorted.p*100, exam_user.total = sorted.t","");

			$this->db->exam->user->update(
				['status' => 2 , 'finish_time' => '`id`-`id`+now()'] ,
				['id' => $_exam_user]
			);
		}
    }
    public function model_10($_exam_user){ // show next question
        $par = [[]];
        $par[0]['_exam_user'] = $_exam_user;
        $par['cols'] = "user_answer , real_answer , msgId";
        return $this->db->exam->user->answer->select($par);
    }

    public function model_11($_exam_user){
        $par = [[]];
        $par[0]['pid'] = $_exam_user;
        $par['cols'] = "name , correct , incorrect , percent , (`count` - `correct` - `incorrect`)  AS x";
        return $this->db->exam->user->join($this->db->exam->item , ['_exam_item' , 'id'])->select($par);
    }

    public function model_12($_user){
        $par = [[]];
        $par[0]['_user'] = $_user;
        $par[0][0]['status'] = '>1';
        $par['cols'] = 'exam_user.id AS exam_user , name , start_time , status';
        return $this->db->exam->user->join($this->db->exam->item , ['_exam_item' , 'id'])->select($par); 
    }


    public function model_13($_exam_user){ 
        $par = [[]];
        $par[0]['id'] = $_exam_user;
        $par['cols'] = "workbook";
        return $this->db->exam->user->select($par)[0]['workbook'];
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
        $par = [[]];
        $par[0]['_exam'] = $exam;
        $par[0][0]['pid'] = '0';
        $masterExamItem = $this->db->exam->item->select($par)[0]['id'];

		
//calc each subject for each user balanace an rankes
        $par = [[]];
        $par[0]['_exam'] = $exam;
        $par[0][0]['pid'] = '> 0';
        $examItem = $this->db->exam->item->select($par);
        $blanceT = 0; $c = 0; $list =[];
        foreach ($examItem as $examItemes) {
            $rank = [];
            $n = $this->db->exam->user->select([
                'cols' => 'COUNT(*) AS count' ,
                ['_exam_item' => $examItemes['id']]
            ])[0]['count'];
            $xBar = ($examItemes['sum'])/($n);
			//echo $xBar.'--'.$examItemes['sum2'].'--n:';
            $dev = sqrt(max(0, ( $examItemes['sum2'] / $n ) - pow( $xBar, 2 ) ));
			//echo $dev.p;
            $this->db->exam->item->update(
                ['deviation' => $dev] ,
                ['id' => $examItemes['id']]
            );
            $examUser = $this->db->exam->user->select([
                ['_exam_item' => $examItemes['id']]
            ]);
            foreach ($examUser as $examUseres) {
                $x = $examUseres['percent'];
                $z = ($x-$xBar) / $dev;
                $blance = ( 1000 * $z ) + 5000;
                $this->db->exam->user->update(
                    ['balance' => $blance] ,
                    ['id' => $examUseres['id']]
                );
                $list[$examUseres['_user']] =  @ $list[$examUseres['_user']] ? $list[$examUseres['_user']]:0;
                $list[$examUseres['_user']] += $blance/ count($examItem);
                $c++;
                $blanceT += $blance;
            }// end foreach
            $this->db->query("SET  @r = 0;UPDATE exam_user JOIN (SELECT @r := @r + 1 AS rank, id FROM exam_user  WHERE _exam_item = ".$examItemes['id']." ORDER BY balance DESC )
AS sorted USING(id) SET exam_user.rank = sorted.rank" , "");
        }
		
//calc total balance for each user and rankes
        $examUser = $this->db->exam->user->select([
            'cols' => '_user' ,
            ['_exam_item' => $masterExamItem]
        ]);
        foreach ($examUser as $examUseres) {
            $user = $examUseres['_user'];
            $this->db->exam->user->update(
                ['balance' => $list[$user] , 'status' => 3],
                ['_user'   => $user , ['_exam_item' => $masterExamItem]] 
            );
        }// end foreach
        $this->db->query("SET  @r = 0;UPDATE exam_user JOIN (SELECT @r := @r + 1 AS rank, id FROM exam_user  WHERE _exam_item = ".$masterExamItem." ORDER BY balance DESC ) AS sorted USING(id) SET exam_user.rank = sorted.rank" , "");
//calc TAD for percents and balances for exam
		$this->db->query("UPDATE exam_item inner join(select exam_user._exam_item, max(exam_user.percent) as tp , min(exam_user.percent) as dp, avg(exam_user.percent) as ap, max(exam_user.balance) as tb , min(exam_user.balance) as db, avg(exam_user.balance) as ab from exam_item inner join exam on exam_item._exam = exam.id INNER join exam_user on exam_user._exam_item = exam_item.id where exam.id=$exam GROUP by exam_user._exam_item) as res on exam_item.id = res._exam_item set exam_item.T_percent=res.tp , exam_item.D_percent=res.dp,exam_item.A_percent=res.ap ,exam_item.T_balance=res.tb,exam_item.D_balance=res.db,exam_item.A_balance=res.ab", "");
//calc avg for each question
		$this->db->query("UPDATE exam_user_answer inner JOIN (SELECT _content_item ,sum(if(user_answer=real_answer,1,0))/count(*) as avg FROM exam_user_answer Group BY _content_item ) AS sorted on exam_user_answer._content_item = sorted._content_item SET exam_user_answer.avg = sorted.avg*100 WHERE _exam_item_pid =".$masterExamItem , "");

    }

    public function model_17_1($_exam,$status){
		$par=[[]];
		$par[0]['_exam'] = $_exam;
		$par[0][0]['pid'] = 0;
		$par[1]['status'] = $status;
		$par['cols'] = '_user,name,start_time,workbook';
        return $this->db->exam->item->join($this->db->exam->user,["id","_exam_item"])->select($par);
    }
    public function model_17_2($_exam,$user,$file){
		$par=[[]];
		$par[0]['_exam'] = $_exam;
		$par[0][0]['pid'] = 0;
		$par['cols'] = 'id';
		$exam_item  = $this->db->exam->item->select($par)[0]['id'];
        $this->db->exam->user->update(['workbook'=>$file],['exam_item'=>$exam_item]);
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
