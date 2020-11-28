import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
export default class Users extends Component {
  config = {
    cols: {
      id: { text: "خذف" ,btn:"delbtn" },
      pid:{text:"مافوق",editable:true},
      status:{text:"وضعیت",btn:"selector",options:{0:"غیرفعال",1:"فعال"},type:"select"},
      title:{text:"نام",editable:true,flex:1},
      src: { text: "تصویر",btn:"imgbtn" },
      href:{text:"آدرس",editable:true,flex:1,btn:"link"},
      expire:{text:"تاریخ انقضا",type:"date",btn:"date"},
      view:{text:"تعدد بازدید"},
      click:{text:"تعدد ارجاع"},
      text:{text:"توضیحات",editable:true,flex:1,type:"text"},
    },
    from: "advertise",
    order : "ord",
  //  join : "user_info",
    title: "   تبلیغ ها",
    icon: "flag",
    new:{hidden:false,title:"مورد جدید"},
    filter:{hidden:false},
    num:1000,
    history : this.props.history,
    tree :"title",
  }
  render = () => <Table {...this.config} />
}