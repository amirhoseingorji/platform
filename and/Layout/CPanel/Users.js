import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
export default class Users extends Component {
  render = () =>{
    this.config = {
      cols: {
       
        id:{text:"شناسه"},
        "user.name":{text:"نام" ,dataIndex:"name",editable:true,flex:1},
       
        user:{text:"تلفن همراه(نام کاربری)" , type:"number",flex:1,renderer:v=>(v+"").slice(-10)},
        pass:{text:"رمز",type:"number"},
        weight:{text:"ضریب",editable:true,type:"number"},
       // code:{text:"لینک ورود"},
        "user.last":{text:"آخرین بازدید",dataIndex:"last",btn:"date"},
        "user.type":{text:"وضعیت",dataIndex:"type",btn:"selector",options:{0:"غیرفعال",1:"فعال"},type:"select"},
        'id as mid' :{text:"ارزیابی ها",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/ComparisonUser",col:"_user",icon:"x-fa fa-list"},width:80},
        "`user`.`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50},
        "if(id=1,true,false) as deny":{text:""}
      },
      from : "user",
      title: "کاربران",
      icon: "user",
      filter:{hidden:true},
      num:1000,
      newtext:"کاربر جدید",
      new:{hidden:false,user:"09000000000",name:"کاربر جدید"},
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}