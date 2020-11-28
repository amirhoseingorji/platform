import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Image ,Button} from '@sencha/ext-modern';

export default class Message extends Component {
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
        id:{text:"شناسه"},
        _user_from :{text:"فرستنده",btn:"selector",options:{2:"مجری",3:"مربی",4:"استاد",5:"هییت علمی",6:"شورا",7:"مدیران فرعی"}},
        title:{text:"عنوان",flex:1 },
        text	:{text:"متن" ,flex:3},
        status:{text:"وضعیت",options:{0:"خوانده نشده",1:"خوانده شده"},type:"select"},
         "`id`": { text: "مشاهده متن " ,renderer:()=><Button text="مشاهده" ui="action round"/>,dataIndex:"id" },
         "id": { text: "حذف" ,btn:"delbtn",dataIndex:"id" },
       
      },

      from : "messages",
      title: "پیام ها",
      where : {_user_type:"{in('*',"+window.userData._user_type+")}"},
      icon: "check-square-o",
      filter:{hidden:true},
      num:1000,
      
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}