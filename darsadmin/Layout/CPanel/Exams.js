import React,{ Component } from 'react';
import Table from '../../Componnet/Table';

export default class Exams extends Component {
  componentWillMount(){
    window.socket.emit("update_exam_users",0)
}
   render = () =>{
    this.config = {
      cols: {
        id:{text:"",summaryRenderer:()=>"کل دوره ها"},
        name:{text:"نام" ,editable:true,flex:1},
        users:{text:"کاربران" ,flex:1 ,summary:"sum" },
        done:{text:"اتمام" ,flex:1,summary:"sum" },
        passed:{text:"قبولی" ,flex:1 ,summary:"sum" },
        wined:{text:"برنده" ,flex:1 ,summary:"sum" },
        description:{text:"توضیحات",flex:10,btn:"html"},
        status:{text:"وضغیت",btn:"statuskey",flex:1},
        add_time:{text:"ایجاد",btn:"date",flex:1},
        "`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50,flex:1},
        "users deny" : {text:""}
      },
      from : "exam",
      title: "دوره های آزمون",
      icon: "user",
      filter:{hidden:false},
      0:{pid:"0"},
      num:1000,
      new:{hidden:false,pid:"0"},
      back:{hidden:true},
      gridsummaryrow:true,
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}

