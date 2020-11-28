import React, {
  Component
} from 'react';
import Table from '../../Componnet/Table';
export default class Contents extends Component {

  query() {
    let query = {};
    let searchVal = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => {
      e = e.split('=');
      if (e[0] != "") query[e[0]] = e[1];
    });
    return query;
  }


  render = () => {
    this.config = {
      cols: {
        id:{text:"شناسه"},
        text:{text:"توضیحات",type:"text" ,btn:"htmlbtn"},
        title:{text:"عنوان",type:"text",editable:true,flex:1 },
        
        
        
        src:{text:"تصویر" ,btn:"imgbtn"},
        link:{text:"لینک" ,btn:"linkbox"},
        "`like`":{text:"پسند" ,dataIndex:"like"},
        dislike:{text:"ناپسند" },
        date:{text:" تاریخ ثبت",btn:"date",dataIndex:"date"},
        status :{text:"وضعیت",btn:"selector",options:{0:"غیرفعال",1:"فعال"},type:"select",dataIndex:"status"},
        "`id`":{text:"حذف",btn:"delbtn" ,width:60,dataIndex:"id"},

      },
      from: "contents",
      title: "مدیریت اخبار",
      icon: "rss",
      filter: {
        hidden: true
      },
      0 :{type:1},
      num: 1000,
      newtext: "افزودن خبر",
      filter:{hidden:true},
      new: {
        hidden: false,
        title: "جدید",
        status: 1,
        type:1
      },
      history: this.props.history
    }
    return <Table {...this.config  }   />
  }
}