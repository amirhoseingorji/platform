import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
export default class Exams extends Component {
   render = () =>{
    this.config = {
      cols: {
        //id:{text:""},
        name:{text:"نام" ,editable:true,flex:1},
        status:{text:"وضغیت",btn:"selector",options:{1:"فعال",0:"غیرفعال",2:"خاتمه"},type:"select",flex:1},
        start_time:{text:"شروع",btn:"date",flex:1,type:"date"},
        end_time:{text:"پایان",btn:"date",flex:1,type:"date"},
        duration:{text:"مدت پاسخگویی",type:"number",flex:1},
        passing:{text:"درصد حدنصاب",type:"number",flex:1},
        " id":{text:"افراد",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Examusers",col:"_exam",icon:"x-fa fa-user"},width:40},
        users:{text:"کاربران" ,flex:1},
        done:{text:"اتمام" ,flex:1},
        passed:{text:"قبولی" ,flex:1},
        wined:{text:"برنده" ,flex:1},
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
      new:{hidden:false,pid:"0"},
      back:{hidden:true},
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}