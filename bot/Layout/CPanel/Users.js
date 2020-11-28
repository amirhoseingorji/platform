import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
export default class Users extends Component {
  render = () =>{
    this.config = {
      cols: { 
        id:{text:"شناسه", width:50},
        name:{text:"نام" ,editable:true,flex:1},
        user:{text:"همراه" , type:"number",flex:1},
        chatid:{text:"شناسه گفتگو ",flex:1},
        tel_id:{text:"شناسه تلگرام ", type:"text",flex:1},
         email:{text:"ایمیل",editable:true,btn:"email",exp:"key",flex:1},
        regdate:{text:"ثبت",btn:"date"},
        last:{text:"فعالیت",btn:"date"},
        // mode:{text:"نوع کاربر",btn:"selector",options:{
        //   0:"مشتریان"
        //  },type:"select"},
        total:{text:"پرداختی"},
        credit:{text:"موجودی"},
        "id pro":{text:"خرید ها",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/User_products_colony",col:"id",icon:"x-fa fa-print"},width:60},
        "id tran":{text:"تراکنش ها",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/User_Transactions",col:"id",icon:"x-fa fa-print"},width:60},
        "`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50},
      },
      from : "user",
      title: "لیست کاربران",
      0:{type:1,_user_access:"<1"},
      icon: "user",
      filter:{hidden:false},
      num:1000,
      // new:{hidden:true,user:"09000000000",doafter:()=>{
      //   Storer("user_info", this, { _user:"{(select max(id) from user)}",name:"کاربر جدید" }, "insert");
      // }},
      history : this.props.history
    }
    //if (window.userData._user_access == 100) delete this.config[0]._school
    return <Table {...this.config} />
  }
}