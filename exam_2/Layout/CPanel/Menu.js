import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
export default class Users extends Component {
  render = () =>{
    this.config = {
      cols: { 
        id:{text:"شناسه", width:50},
        ord :{text:""},
        view: { text: "منو", btn: "toggle", options: { 0: "eye-slash deactive", 1: "eye blugray" } ,width:30,minWidth:30},
        pid:{text:""},
        title:{text:"نام" ,editable:true,flex:1},
        _user_access :{text:"سطح دسترسی",btn:"selector",options:{
               0:"عموم",
               "*":"کاربران",
               1 :"مدیر",
            //    2 :"سطح 2",
            //    3 :"سطح 3",
            //    4 :"سطح 4",
               100 : "فقط ادمین"
              },type:"select"},
              target :{text:"فایل" ,editable:true},
              $id :{text:"مسیر" ,editable:true},
        iconCls:{text:"ایکون",editable:true},
        "`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50},
      },
      order:"ord",
      from : "menu",
      title: "تنظیمات منو",
      tree :"title",
      //0:{type:1,_user_access:"<1"},
      icon: "user",
      filter:{hidden:false},
      excel:{hidden:true},
      print:{hidden:true},
      num:1000,
      new:{hidden:true},
      history : this.props.history
    }
    //if (window.userData._user_access == 100) delete this.config[0]._school
    return <Table {...this.config} />
  }
}