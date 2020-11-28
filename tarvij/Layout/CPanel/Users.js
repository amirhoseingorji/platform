import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
export default class Users extends Component {
  render = () =>{
    this.config = {
      cols: {
        "`user`.`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50},
        id:{text:"شناسه"},
        sex:{text:"جنسیت",btn:"selector",options:{0:"آقا",1:"خانم"},type:"select"},
        name:{text:"نام" ,dataIndex:"name",editable:true,flex:1},
        _user_type:{text:"نوع کاربر",dataIndex:"_user_type",btn:"selector",options:{2:"مجری",3:"مربی",4:"استاد",5:"هییت علمی",6:"شورا",7:"مدیران فرعی"},type:"select"},
        user:{text:"تلفن همراه" , type:"number",flex:1,renderer:v=>(v+"").slice(-10)},

        "user.last":{text:"آخرین بازدید",dataIndex:"last",btn:"date"},
        "user.type":{text:"وضعیت",dataIndex:"type",btn:"selector",options:{0:"غیرفعال",1:"فعال"},type:"select"}
      },
      from : "user",
      where :{_user_type:">1"},
      //join : "user_info",
      title: "  کاربران",
      icon: "user",
      filter:{hidden:false},
      num:1000,
      new:{hidden:false,user:"09000000000",doafter:()=>{
        Storer("user_info", this, { _user:"{(select max(id) from user)}" ,_user_type:3,name:"کاربر جدید"}, "insert");
      }},
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}