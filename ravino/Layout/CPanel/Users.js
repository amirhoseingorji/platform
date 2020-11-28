import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
export default class Users extends Component {
  render = () =>{
    this.config = {
      cols: {
        "`user`.`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50},
        _user:{text:"شناسه"},
        "user.name":{text:"نام" ,dataIndex:"name",editable:true,flex:1},
        // "user.mode":{text:"نوع کاربر",dataIndex:"mode",btn:"selector",options:{0:"دانش آموز",1:"معلم",2:"مدارس",3:"کارشناس",4:"والدین"},type:"select"},
        user:{text:"تلفن همراه" , type:"number",flex:1,renderer:v=>(v+"").slice(-10)},
        credit:{text:"اعتبار",type:"number"},
        // user:{text:"تلفن همراه",editable:true,type:"number"},
        // nid:{text:"شماره ملی",editable:true,type:"number"},
        // ecoid:{text:"شماره اقتصادی",editable:true,type:"number"},
        // tel:{text:"تلفن ثابت",editable:true,type:"number"},
        // fax:{text:"فکس",editable:true,type:"number"},
        // email:{text:"ایمیل",editable:true,type:"number",btn:"email",exp:"key"},
        //regid:{text:"شماره ثبت",editable:true,type:"number"},
        "user.last":{text:"آخرین بازدید",dataIndex:"last",btn:"date"},
        "user.type":{text:"وضعیت",dataIndex:"type",btn:"selector",options:{0:"غیرفعال",1:"فعال"},type:"select"}
      },
      from : "user",
      join : "user_info",
      title: "  کاربران",
      icon: "user",
      filter:{hidden:false},
      num:1000,
      new:{hidden:false,user:"09000000000",doafter:()=>{
        Storer("user_info", this, { _user:"{(select max(id) from user)}",name:"کاربر جدید" }, "insert");
      }},
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}