import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { number } from 'prop-types';
export default class Tasks extends Component {
  render = () =>{
    this.config = {

      cols: { 
        id:{text:"شناسه", width:50},
        pid:{text:""},
        ord:{text:""},
        after:{text:"پیش", editable:true, width:50},
        // type: { text: "نوع", btn: "selector", options: {
        //   0: "شخصی"
        //   , 1: "پروژه"
        //  }, type: "select" , width:70},
         title:{text:"عنوان",editable:true,width:300},
         ratio:{text:"اهمیت",type:"number", width:60},
         start:{text:"آغاز",btn: "editdate",flex:1},
         end:{text:"تحویل",btn: "editdate",flex:1},
        duration:{text:"مدت",type:"number", width:70},
        "id iid":{text:"زمانبندی",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/TaskTimes",col:"_task",icon:"x-fa fa-clock"},width:70},

         real_start:{text:"شروع",flex:1,btn:"date"},
         real_end:{text:"پایان",flex:1,btn:"date"},
         real_duration:{text:"اجرا", width:50}, 

         
      // relate_ratio
       // text:{text:"متن",editable:true,flex:3,btn:"html"},
        
        
        percent:{text:"درصد",editable:true, width:80},
//       //  ok:{text:"تایید",type:"number",width:50},
//        link:{text:"لینک",editable:true,flex:1,btn:"linkbox"},
//         back:{text:"بازگشت",btn:'statuskey',width:60},
//         home:{text:"خانه",btn:'statuskey',width:60}, 
//         keysize:{text:"سایزکلید",btn:'statuskey',width:60},
     //   date:{text:"ایجاد",btn:"date"},
        
        status: { text: "وضعیت",btn:'statuskey',width:60},
    //    last:{text:"ویرایش",btn:"date"},
     //   mode:{text:"حالت",},
        "`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50},
        expand:{text:""}
      },
      tree:"title",
      from : "task",
      title: "وظایف",
      icon: "tasks",
      order:"ord",
      filter:{hidden:false},
      new:{
        ratio : 1,
        title:'وظیفه ',
        start : "{now()}",

      },
      num:1000,
      history : this.props.history,
      btn2 : {hidden:false, width:100,text:"اصلاح زمان",handler:()=>{
        window.socket.emit("timefix");
        setTimeout(this.refs.Table._refresh,200)
      }}
    }
    return <Table {...this.config} ref="Table"/>
  }
}