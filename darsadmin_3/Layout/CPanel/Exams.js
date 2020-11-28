import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
export default class Exams extends Component {
   render = () =>{
    this.config = {
      cols: {
        id:{text:""},
        name:{text:"نام" ,editable:true,flex:1},
        users:{text:"کاربران" ,flex:1},
        done:{text:"اتمام" ,flex:1},
        passed:{text:"قبولی" ,flex:1},
        wined:{text:"برنده" ,flex:1},
        description:{text:"توضیحات" ,type:"text",flex:10},
        status:{text:"وضغیت",btn:"selector",options:{1:"فعال",0:"غیرفعال",2:"خاتمه"},type:"select",flex:1},
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
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}

