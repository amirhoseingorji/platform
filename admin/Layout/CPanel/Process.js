import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { number } from 'prop-types';
export default class Process extends Component {
  render = () =>{
    this.config = {

      cols: { 
        id:{text:"شناسه", width:50},
        pid:{text:""},
        ord:{text:""},
        keytype: { text: "نوع کلید", flex: 1, btn: "selector", options: {
          0: "عادی"
          , 1: "درخط"
          , 2: "لینک"
          ,3:"ورودی" 
          ,4:"زماندار" }, type: "select" },
       funkey:{text:"عملگرکلید",editable:true,flex:2},
        title:{text:"عنوان کلید",editable:true,flex:5},
              file:{text:"فایل",btn:"multy",flex:1},
               funtext:{text:"عملگرمتن",editable:true,flex:2},
 text:{text:"متن",editable:true,flex:3,btn:"html"},
        
        
      //  keylist:{text:"کلیدها",editable:true,flex:2},
      //  ok:{text:"تایید",type:"number",width:50},
       link:{text:"لینک",editable:true,flex:1,btn:"linkbox"},
        back:{text:"بازگشت",btn:'statuskey',width:60},
        home:{text:"خانه",btn:'statuskey',width:60}, 
        keysize:{text:"سایزکلید",btn:'statuskey',width:60},
        last:{text:"ویرایش",btn:"date"},
        status: { text: "وضعیت",btn:'statuskey',width:60},
     //   mode:{text:"حالت",},
        "`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50},
        expand:{text:""}
      },
      tree:"title",
      from : "process",
      title: "روند ها",
      icon: "layer-group",
      order:"ord",
      filter:{hidden:false},
      0:{_products:0},
      new:{
        title:'روند جدید',
        text:"متن روند جدید"
      },
      num:1000,
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}