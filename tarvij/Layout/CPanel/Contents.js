import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
export default class Contents extends Component {
  config = {
    cols: {
      "`id`": { text: "شناسه", dataIndex: "id" ,width:60},
      //pid:{text:"مافوق",editable:true},
      status:{text:"وضعیت",btn:"selector",options:{0:"غیرفعال",1:"فعال"},type:"select"},
      title:{text:"نام",editable:true,flex:1},
      text:{text:"توضیحات",editable:true,flex:1,type:"text"},
      photo: { text: "تصویر",btn:"imgbtn" },
      // href:{text:"آدرس",editable:true,flex:1,btn:"link"},
      //expire:{text:"تاریخ انقضا",type:"date",btn:"date"},
      _contents_type:{text:"نوع",btn:"selector",options:{1:"اخبار کشوری",2:"اخبار استانی"},type:"select"},
      view:{text:"تعدد بازدید"},
      "`like`":{text:"پسند",dataIndex:"like"},
      dislike:{text:"ناپسند"},
      id: { text: "خذف" ,btn:"delbtn" },
    },
    from: "contents",
   // order : "ord",
  //  join : "user_info",
    title: "   محتوا ها",
    icon: "book",
    new:{hidden:false,title:"مورد جدید"},
    filter:{hidden:false},
    num:1000,
    history : this.props.history,
    tree :"title",
  }
  render = () => <Table {...this.config} />
}