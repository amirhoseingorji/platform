import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
export default class Sound extends Component {
    query(){
        let query={};
        let searchVal  = decodeURIComponent(window.location.search)
        searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
        
        return query;
      }
  render = () =>{
    this.config = {
      cols: {
        "`id`":{text:"شناسه",dataIndex:"id"},
         name :{text:"عنوان",type:"text" ,flex:1},
        color :{text:"کد رنگ",type:"text" },
        "id as target":{text:"لیست ها",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Series?_chart="+this.query()._chart,col:"_chart_sound",icon:"x-fa fa-list"},width:60},
        id:{text:"حذف",btn:"delbtn" ,width:60}
      },
      from : "chart_sound",
      join : false,
      title: "صداها ها",
      icon: "waveform-path",
      filter:{hidden:true},
      num:1000,
      new:{hidden:false,name:"صدای جدید",...this.query()},
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}