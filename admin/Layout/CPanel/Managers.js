import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
export default class Users extends Component {
  render = () =>{
    this.config = {
      cols: { 
        id:{text:"شناسه", width:50},
        name:{text:"نام" ,editable:true,flex:1},
        user:{text:"همراه" , type:"number",flex:1},
        email:{text:"ایمیل",editable:true,exp:"key",flex:1},
        tel_id:{text:"شناسه تلگرام ", type:"text",flex:1},
        chatid:{text:"شناسه گفتگو ",flex:1,editable:true},
        regdate:{text:"ثبت",btn:"date"},
        last:{text:"فعالیت",btn:"date"},
        "`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50},
        
      },
      from : "user",
      title: "لیست کاربران",
      0:{type:1,_user_access:"1"},
      icon: "user",
      filter:{hidden:false},
      num:1000,
      new:{hidden:true,user:"09000000000",type:1},
      history : this.props.history
    }
    //if (window.userData._user_access == 100) delete this.config[0]._school
    return <Table {...this.config} />
  }
}