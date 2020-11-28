import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
export default class Exams extends Component {
  componentWillMount(){
    window.socket.emit("update_exam_users",window.userData.pid)
}
   render = () =>{
    this.config = {
      cols: {
        //id:{text:""},
        name:{text:"نام" ,editable:true,flex:1,summaryRenderer:()=>"کل آزمونها"},
        status:{text:"وضغیت",btn:"selector",btn:"statuskey"},
        start_time:{text:"شروع",btn:"editdate",flex:2,summary:"",summaryRenderer:()=>""},
        end_time:{text:"پایان",btn:"editdate",flex:2,summary:"",summaryRenderer:()=>""},
        duration:{text:"مدت",type:"number",flex:1,summary:"average"},
        passing:{text:"درصد حدنصاب",type:"number",flex:1,summary:"average"},
        " id":{text:"افراد",dataIndex:"id",btn:"linkkey",exp:"key",options:{value:"id",path:"/Examusers",col:"_exam",icon:"x-fa fa-user",dataIndex:"id"},width:40,summary:"max",
        summaryRenderer:()=><sapn style={{cursor:"pointer",width:"60px",color:"#555555"}} className={"x-fa fa-user"} onClick={()=>this.refs.Table.navigate("/Examusers")}/>
      },
        users:{text:"کاربران" ,flex:1 ,summary:"sum"},
        done:{text:"اتمام" ,flex:1 ,summary:"sum"},
        passed:{text:"قبولی" ,flex:1 ,summary:"sum"},
        wined:{text:"برنده" ,flex:1 ,summary:"sum"},
        id:{text:"سوال",btn:"linkkey",exp:"key",options:{path:"/Items",col:"_exam",icon:"x-fa fa-question-circle"},width:40},
        "`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50},
        "users deny" : {text:""}
      },
      from : "exam",
      title: "آزمون های استانی",
      icon: "user",
      filter:{hidden:false},
      0:{pid:window.userData.pid,_province:window.userData._province},
      num:1000,
      new:{hidden:false,pid:window.userData.pid,_province:window.userData._province},
      back:{hidden:true},
      gridsummaryrow:true,

      history : this.props.history
    }
    return <Table ref="Table" {...this.config} />
  }
}