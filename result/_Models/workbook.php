<?php
namespace _Models;
class workbook{

	protected $server = 'exam.madrese.net';
	protected $dbname = 'madrese_azmoon';
	protected $dbUser = 'admin';
	protected $dbPass = 'it@ndishmand';

    public function __construct(){
       $db = $this->db = new \_Helpers\Db($this->dbname.(@$_GET['sub']?$_GET['sub']:""),$this->dbUser,$this->dbPass,$this->server);
    }

    public function statistics($exam){
        $par = [[]];
        $par[0]['_exam'] = $exam;
        $par[0][0]['pid'] = 0;
        $par['cols'] = 'id';
    	$examItem = $this->db->exam->item->select($par);

		$examUser = $this->db->exam->user->select([
    		['_exam_item' => $examItem[0]['id']]
    	]);
    	return [['name'=>'کلاس','value'=>0],['name'=>'مدرسه','value'=>0],['name'=>'شهر','value' => 0],['name' => '' , 'value' => count($examUser)]];
    }

    public function header($user){
    	$users = $this->db->user->select([
    		['id' => $user]
    	]);
    	$userInfo = $this->db->user->info->select([
    		['_user' => $users[0]['id']] 
    	]);

    	return [['شماره داوطلبی', $user],['نام و نام خانوادگی ' , $userInfo[0]['name'] ]];///*,['نام کلاس' , '']*/,['نام مدرسه' , 'اندیشمند'],/*['نام شهر' , ''],['پایه ' , '']*/];
    }

    public function workResult($user , $exam){
    	$list = [];
        
        $par = [[]];
        $par[0]['_exam'] = $exam;
        $par['order'] = 'id';
        $par['asc'] = false;
    	$examItem = $this->db->exam->item->select($par);
    	$d = 0;
    	foreach ($examItem as $key => $examItemes) {
    		$percent = 0;
    		$par = [[]];
    		$par [0]['_user'] = $user;
    		$par [0][0]["_exam_item"] = $examItemes['id'];
    		$examUser = $this->db->exam->user->select($par);

	    	$examUserP = $this->db->exam->user->select([
    			['_exam_item' => $examItemes['id']]
	    	]);
	    	foreach ($examUserP  as $keyP => $examUseresP) {
	    		$percent += $examUseresP['percent'];
	    	}

            if($examUser[0]['pid'] == 0){
                $examItemes['name'] = 'کل' ;
                if($d>1){
                    $get = [
                        ['نام درس',$examItemes['name']] , ['درصد' ,(int) $examUser[0]['percent']] , ['تراز' ,(int) $examUser[0]['balance']],['میانگین درصد',$examItemes['A_percent'] ], ['بالاترین درصد',$examItemes['T_percent'] ],['پایین ترین درصد',$examItemes['D_percent']],['بالاترین تراز',$examItemes['T_balance']],['پایین ترین تراز', $examItemes['D_balance'] ],['رتبه ',[['کلاس',$examUser[0]['rank'] ]]]
                    ];
                    array_push($list, $get); 
                }
            }else{
                $d++;
                $examItemes['name'] = $examItemes['name'];
                $get = [
                    ['نام درس',$examItemes['name']] , ['درصد' ,(int) $examUser[0]['percent']] , ['تراز' ,(int) $examUser[0]['balance']],['میانگین درصد',$examItemes['A_percent'] ], ['بالاترین درصد',$examItemes['T_percent'] ],['پایین ترین درصد',$examItemes['D_percent']],['بالاترین تراز',$examItemes['T_balance']],['پایین ترین تراز', $examItemes['D_balance'] ],['رتبه ',[['کلاس',$examUser[0]['rank'] ]]]
                ];
                array_push($list, $get); 
            }


    	}
    	//print_r($get);
    	return $list;
    }

    public function SumerizeWork($user , $exam){
    	$list = [];

    	$par = [[]];
        $par[0]['_exam'] = $exam;
        $par['order'] = 'id';
        $par['asc'] = false;
        $examItem = $this->db->exam->item->select($par);
        $d = 0;
    	foreach ($examItem as $key => $examItemes) {
            $par = [[]];
            $par[0]['_user'] = $user;
            $par[0][0]['_exam_item'] = $examItemes['id'];
    		$examUser = $this->db->exam->user->select($par);
	    	$nazade = $examUser[0]['total'] - ($examUser[0]['correct']+$examUser[0]['incorrect']);
            if($examItemes['pid'] == 0){
                if($d > 1){
                    $examItemes['name'] = 'کل';
                    $get = [$examItemes['name'],$examUser[0]['correct'],$examUser[0]['incorrect'],$nazade,$examUser[0]['total']];
                    array_push($list, $get); 
                }
                
            }else{
                $d ++;
        
                $get = [$examItemes['name'],$examUser[0]['correct'],$examUser[0]['incorrect'],$nazade,$examUser[0]['total']];
                array_push($list, $get); 
            }
	  
    	}
    	return $list;
    }

    public function validAnswer($user , $exam){
    	$this->db->exam->user->answer->select([
    		'where' => '_user = '.$user.' ANd '
    	]);

        [ 
            /*['dars' => 'ریاضی' , 'answer' => [1,3,2,4,2,4,1,3,2] , 'userAnswer' => [1,3,'',4,4,4,1,3,2] ] ,*/
            ['dars' => 'علوم' , 'answer' => [1,3,2,4,2,4,1,3,2,1,3,2,4,2,4,1,3,2] , 'userAnswer' => [1,3,'',4,4,4,1,3,2,1,3,'',4,4,4,1,3,2] ] 
        ];
    }

    public function azmonTit($exam){
        $par = [[]];
        $par[0]['_exam'] = $exam ;
        $par[0][0]['pid'] = 0;
        $par['cols'] = 'name , start_time';
        return $this->db->exam->item->select($par)[0];
    }

    public function taraz($user, $exam){
        $par1 = [[]];
        $par1[0]['id'] = $exam;
        $pid = $this->db->exam->select($par1);

        $list = [];
        $par = [[]];
        $par[0]['_user'] = $user;
        $par[0][0]['pid'] = 0;
        $par[2]['pid'] = $pid[0]['pid'];
        $par[2][0]['mode'] = 0;

        $par['cols'] = 'balance';
        $exam = $this->db->exam->user->join($this->db->exam->item , ['_exam_item' , 'id'])->join($this->db->exam , ['' ,'_exam', 'id'])->select($par);
        foreach ($exam as $key => $examer) {
            array_push($list , (int) $examer['balance']);
        }
        if($key < 4){
            for($i = $key+1 ; $i < 4 ; $i++){
                $list[$i] = 0;
            }
        }
        return $list;
    }

    public function chartdate($user,$exam){
        $par1 = [[]];
        $par1[0]['id'] = $exam;
        $pid = $this->db->exam->select($par1);
        
        $par = [[]];
        $par[0]['_user'] = $user;
        $par[0][0]['pid'] = 0;
        $par[2]['pid'] = $pid[0]['pid'];
        $par[2][0]['mode'] = 0;
        $par['cols'] = 'start_time , exam.name';
        // $par['cols'] = 'start_time , name';
        return $this->db->exam->user->join($this->db->exam->item , ['_exam_item' , 'id'])->join($this->db->exam , ['' ,'_exam', 'id'])->select($par);
       // return $this->db->exam->user->join($this->db->exam->item , ['_exam_item' , 'id'])->select($par);
    }

    public function point($user,$exam){
        $par1 = [[]];
        $par1[0]['id'] = $exam;
        $pid = $this->db->exam->select($par1);

        $list = [];
        $par = [[]];
        $par[0]['_user'] = $user;
        $par[0][0]['pid'] = 0;
        $par[2]['pid'] = $pid[0]['pid'];
        $par[2][0]['mode'] = 0;

        $par['cols'] = 'percent';
        $exam = $this->db->exam->user->join($this->db->exam->item , ['_exam_item' , 'id'])->join($this->db->exam , ['' ,'_exam', 'id'])->select($par);
        foreach ($exam as $key => $examer) {
            array_push($list , (int) $examer['percent']);
        }
        if($key < 4){
            for($i = $key+1 ; $i < 4 ; $i++){
                $list[$i] = 0;       
            }
        }
        return $list;
        /*$list = [];
        $par = [[]];
        $par[0]['_user'] = $user;
        $par[0][0]['pid'] = '> 0';
        $par['cols'] = 'name , percent';
        $exam = $this->db->exam->user->join($this->db->exam->item , ['_exam_item' , 'id'])->select($par);
        foreach ($exam as $key => $examer) {
            $get = [
                'name' => $examer['name'] ,
                'type' => 'spline' ,
                'yAxis' =>  1,
                'animation': false,
                'data': ,
                marker: {enabled: false},
                dashStyle: 'shortdot',
            ];
            array_push($list , (int) $examer['percent']);
        }
        //print_r($list);
        if($key < 4){
            for($i = $key+1 ; $i < 4 ; $i++){
                $list[$i] = 0;
            }
        }
        return $list;*/
    }

    public function gaugeBlance($user , $exam){
        $list = [];
        $par = [[]];
        $par[0]['_user'] = $user;
        $par[1]['_exam'] = $exam;
        $par[1][0]['pid'] = 0;
        $par['cols'] = 'balance';
        $gauge = $this->db->exam->user->join($this->db->exam->item , ['_exam_item' , 'id'])->select($par);
        array_push($list , (int) $gauge[0]['balance']);
        return $list;
    }


    public function examAnswer($user , $exam){
        
        $list = [];
        $par = [[]];
        $par[0]['_exam'] = $exam;
        $par[0][0]['pid'] = '> 0';
        $par['cols'] = 'id , name';
        $par['order'] = 'id';
        $par['asc'] = false;
        $examItem = $this->db->exam->item->select($par);

        foreach ($examItem as $key => $examItemer) {
            //$list[$key]['dars'] = $examItemer['name'];
            $realAnswer = []; $userAnswer = []; $avgAnswer = []; $numAnswer = [];
            $par = [[]];
            $par[0]['_user'] = $user ;
            $par[0][0]['_exam_item'] = $examItemer['id'];
            $par['order'] = 'number';
            $par['asc'] = true;
            //$par['cols'] = 'number , user_answer , real_answer , avg';
            $examUserAns = $this->db->exam->user->answer->select($par);

            foreach ($examUserAns as $examUserAnswer) {
                $data = [
                    'name' =>$examItemer['name'] ,
                    'user_answer' => $examUserAnswer['ratio'] ==0? 0:$examUserAnswer['user_answer'],
                    'real_answer' => $examUserAnswer['real_answer'] ,
                    'score' => $examUserAnswer['ratio'],
                    'options' => $examUserAnswer['options'],
                    'avg' => $examUserAnswer['avg'],
                    'number' => $examUserAnswer['number']
                    
                ];
                array_push($list,$data);
            }
        }
        return $list;
    }

    

}
?>
