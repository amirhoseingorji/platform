import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Image, Button } from '@sencha/ext-modern';
export default class Reports extends Component {
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });  
    return query;
  }
  qimage = (v,a) =>{
    return <Image src={v}  height="120"  />
    }
  

  render = () =>{
    this.config = {
      cols: {
        "`id`": { text: "شناسه", dataIndex: "id" ,width:60},
        //pid:{text:"مافوق",editable:true},
        status:{text:"وضعیت",btn:"selector",options:{0:"غیرفعال",1:"فعال"},type:"select"},
        title:{text:"نام",editable:true,flex:1},
        text:{text:"توضیحات",editable:true,flex:1,type:"text"},
        photo: { text: "تصویر",btn:"imgbtn" },
        // href:{text:"آدرس",editable:true,flex:1,btn:"link"},
        //expire:{text:"تاریخ انقضا",type:"date",btn:"date"},
     //   _contents_type:{text:"نوع",btn:"selector",options:{1:"اخبار کشوری",2:"اخبار استانی"},type:"select"},
        // view:{text:"تعدد بازدید"},
        // "`like`":{text:"پسند",dataIndex:"like"},
        // dislike:{text:"ناپسند"},
        "`id` ": { text: " ضمیمه " ,renderer:()=><Button text="ضمایم" ui="action round"/>,dataIndex:"id" },
        id: { text: "حذف" ,btn:"delbtn" },
      },

      from : "contents",
      title: "گزارشات",
      where : {_contents_type:3},
      icon: "dot-circle-o",
      filter:{hidden:true},
      num:1000,
      new:{hidden:false,title:"گزارش جدید",_contents_type:3,_user_type:"*"},
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}