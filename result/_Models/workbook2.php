<?php
namespace _Models;
class workbook2{
	protected $server = 'localhost';
	protected $dbname = 'madrese_azmoon';
	protected $dbUser = 'madrese';
	protected $dbPass = 'it@ndishmand';

    public function __construct(){
        $this->jdate 		= new \_Helpers\jdatetime(true, true, 'Asia/Tehran');
       $db = $this->db = new \_Helpers\Db($this->dbname,$this->dbUser,$this->dbPass,$this->server);
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

    	return [['نام و نام خانوادگی ' , $userInfo[0]['name'] ],['شماره داوطلبی', $user]/*,['نام کلاس' , '']*//*['نام شهر' , ''],['پایه ' , '']*/];
    }

    public function workResult($user , $exam){
    	$list = [];
        
        $par = [[]];
        $par[0]['_exam'] = $exam;
        $par['order'] = 'id';
        $par['asc'] = false;
    	$examItem = $this->db->exam->item->select($par);
    	
    	foreach ($examItem as $key => $examItemes) {

    		$par = [[]];
    		$par [0]['_user'] = $user;
    		$par [0][0]["_exam_item"] = $examItemes['id'];
            $examUser = $this->db->exam->user->select($par);
            
            $examItemes['name'] = ($examUser[0]['pid'] == 0) ? "کل" : $examItemes['name'];

	    	$get = [
                ['عنوان',$examItemes['name']] , ['امتیاز' ,(int) $examUser[0]['sumRatio']],['رتبه ',[['کلاس',$examUser[0]['rank'] ]]],['بالاترین امتیاز',$examItemes['T_score']],['متوسط امتیاز', $examItemes['A_score'] ],['پایین ترین امتیاز', $examItemes['D_score'] ],['درست', $examUser[0]['correct'] ],['نادرست', $examUser[0]['incorrect'] ],['نزده', ($examUser[0]['total'] - ($examUser[0]['correct']+$examUser[0]['incorrect'])) ],['تعداد', $examUser[0]['total'] ]
            ];
	    	// $get = [
            //     ['نام درس',$examItemes['name']] , ['درصد' ,(int) $examUser[0]['percent']] , ['تراز' ,(int) $examUser[0]['balance']],['میانگین درصد',$examItemes['A_percent'] ], ['بالاترین درصد',$examItemes['T_percent'] ],['پایین ترین درصد',$examItemes['D_percent']],['بالاترین تراز',$examItemes['T_balance']],['پایین ترین تراز', $examItemes['D_balance'] ],['رتبه ',[['کلاس',$examUser[0]['rank'] ]]]
            // ];
	    	if(count($examItem)==2 && $examUser[0]['pid'] == 0) $a=1; else array_push($list, $get);  
    	}
    	//print_r($get);
    	return $list;
    }

    public function SumerizeWork($user,$exam){
        //get exam.pid
        $par1 = [[]];
        $par1[0]['id'] = $exam;
        $pid = $this->db->exam->select($par1);


        
        $par=[[]];
        $par['cols'] = 'exam.name , start_time ,"-" as rank,"-" as sumRatio,totalRatio as sumTotal,"-" as groupRank,exam_item.id';
        $par[0]['pid'] = $pid[0]['pid'];
        $par[1]['pid'] = 0;
        $par['order'] = 'exam_item.id';
        $par['asc'] = true;
        $lsit = $this->db->exam->join($this->db->exam->item,['id','_exam'])->select($par);
        for($i=0;$i<count($lsit);$i++) {
            $par = [[]];
            $par['cols'] = 'rank,sumRatio,groupRank';//paye
            $par[0]['_user'] = $user;
            $par[0][0]['_exam_item'] = $lsit[$i]["id"];
            $item = $this->db->exam->user->select($par);
            if(count($item)>0){
                $lsit[$i]["rank"] = $item[0]["rank"];
                $lsit[$i]["sumRatio"]=$item[0]["sumRatio"];
                $lsit[$i]["groupRank"]=$item[0]["groupRank"];
                
            }elseif($i>0){
                $lsit[$i]["groupRank"] = $lsit[$i-1]["groupRank"];
            }
        }

        // $par = [[]];
        // $par[0]['_user'] = $user;
        // $par[0][0]['pid'] = 0;
        // $par[2]['pid'] = $pid[0]['pid'];
        // $par[2][0]['mode'] = 1;
        // $par['cols'] = 'exam.name , start_time , rank,sumRatio,totalRatio as sumTotal,groupRank';//paye
        // $lsit =  $this->db->exam->user->join($this->db->exam->item , ['_exam_item' , 'id'],"right")->join($this->db->exam , ['' ,'_exam', 'id'],"right")->select($par);
        $sumratio = 0;
        $sumTotal = 0;
        for($i=0;$i<count($lsit);$i++) {
            $lsit[$i]["start_time"] = $this->jdate->date("m/d",strtotime($lsit[$i]["start_time"]));
            $sumratio += $lsit[$i]["sumRatio"]*1;
            $sumTotal += $lsit[$i]["sumTotal"]*1;
        }
        $last = [];
        $last["name"] = "مجموع";
        $last["start_time"] = "-";
        $last["rank"] = $lsit[$i-1]["groupRank"];
        $last["sumRatio"] = $sumratio;
        $last["sumTotal"] = $sumTotal;
        array_push($lsit , $last);
     
        return $lsit;
    }

    public function azmonTit($exam){
        $par = [[]];
        $par[0]['_exam'] = $exam ;
        $par[0][0]['pid'] = 0;
        $par['cols'] = 'name , start_time';
        return $this->db->exam->item->select($par)[0];
    }
    public function maxNumber($user , $exam){
        $list = [];
        $par = [[]];
        $par[0]['_user'] = $user;
        $par[1]['_exam'] = $exam;
        $par[1][0]['pid'] = 0;
        $par['cols'] = 'exam_user.totalRatio';
        $gauge = $this->db->exam->user->join($this->db->exam->item , ['_exam_item' , 'id'])->select($par);
        array_push($list , (int) $gauge[0]['totalRatio']);
        return $list[0];
    
    }

    public function taraz($user,$exam){
        $par1 = [[]];
        $par1[0]['id'] = $exam;
        $pid = $this->db->exam->select($par1);

        $par = [[]];
        $par[0]['_user'] = $user;
        $par[0][0]['pid'] = 0;
        $par[2]['pid'] = $pid[0]['pid'];
        $par[2][0]['mode'] = 1;
        $par['cols'] = 'sumRatio';//paye
        $exam =  $this->db->exam->user->join($this->db->exam->item , ['_exam_item' , 'id'])->join($this->db->exam , ['' ,'_exam', 'id'])->select($par);
        $list = [];
        foreach ($exam as $key => $examer) {
            array_push($list , (int) $examer['sumRatio']);
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
        $par[2][0]['mode'] = 1;
        $par['cols'] = 'start_time , exam.name';
        return $this->db->exam->user->join($this->db->exam->item , ['_exam_item' , 'id'])->join($this->db->exam , ['' ,'_exam', 'id'])->select($par);
    }

    public function point($user,$exam){
        $list = [];
        $par = [[]];
        $par[0]['_user'] = $user;
        $par[0][0]['pid'] = 0;
        $par['cols'] = 'percent';
        $exam = $this->db->exam->user->join($this->db->exam->item , ['_exam_item' , 'id'])->select($par);
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
        $par['cols'] = 'sumRatio';
        $gauge = $this->db->exam->user->join($this->db->exam->item , ['_exam_item' , 'id'])->select($par);
        array_push($list , (int) $gauge[0]['sumRatio']);
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

            //$par['cols'] = 'number , user_answer , real_answer , avg';
            $examUserAns = $this->db->exam->user->answer->select($par);

            foreach ($examUserAns as $examUserAnswer) {
                $data = [
                    'name' =>$examItemer['name'] ,
                    'user_answer' => $examUserAnswer['user_answer'],
                    'real_answer' => $examUserAnswer['real_answer'],
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
