import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
export default class Series extends Component {
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
        type :{text:"حالت",type:"select",btn:"selector",options:{0:"نقاط",1:"خط"},width:120},

        "id as target":{text:"نقطه ها",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Data"+window.location.search,col:"_chart_sound_series",icon:"x-fa fa-braille"},width:60},

        id:{text:"حذف",btn:"delbtn" ,width:60}
      },
      from : "chart_sound_series",
      join : false,
      title: "لیست ها",
      icon: "list",
      filter:{hidden:true},
      num:1000,
      new:{hidden:false,name:"لیست جدید",...this.query()},
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}