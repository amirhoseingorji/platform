import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
// import { Button } from '@sencha/ext-modern';
// import Storer from "../../Store/Storer";
export default class Values extends Component {
  state={loading:false}
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
    return query;
  }
  render = () =>{
    if(this.state.loading && this.state.chart && this.state.chart.length){
      
      this.opener()
     this.state.loading=true;
    }
    this.config = {
      cols: {
id:{text:"شناسه",width:60},
pid:{text:""},
ord:{text:""},
name :{text:"عنوان",editable:true,flex:2},

//description:{text:"توضیحات",type:"text" ,btn:"htmlbtn"},
weight:{text:"ضریب",editable:true,type:"number"},
date:{text:" تاریخ ثبت",btn:"date"},
status :{text:"وضعیت",btn:"selector",options:{0:"غیرفعال",1:"فعال"},type:"select",dataIndex:"status"},
"`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50},

      },
      unsortable:true,
      order:"ord",
      from : "value",
      join : false,
      tree:"name",
      title: "سنجه ها",
      icon: "chart-bar",
      filter:{hidden:true},
      num:1000,
      newtext:"افزودن سنجه",
      new:{hidden:false,name:"سنجه جدید",doafter:()=>{
     //   Storer("comparison_value", this, {_value: "{(select max(id) from value)}",  _comparison:"{(select id from comparison where end>now()  )}" }, "insert");
      }},

   //   new:{hidden:false,name:"نمودار جدید"},
      history : this.props.history
    }
    
    return <Table {...this.config} />
  }
}