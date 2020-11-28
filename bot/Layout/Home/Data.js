import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
export default class Data extends Component {
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
        x :{text:"فاصله-x",type:"text" ,flex:1},
        y :{text:"زمان-y",type:"text" ,flex:1},
        z :{text:"عمق-z",type:"text" ,flex:1}, 
                name :{text:"عنوان",type:"text" ,flex:1},

        ord:{text:""},
        // "id as target":{text:"لیست ها",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Data",col:"_chart",icon:"x-fa fa-list"},width:60},
        id:{text:"حذف",btn:"delbtn" ,width:60}
      },
      unsortable : true,
      order:"ord",
      from : "chart_sound_series_data",
      join : false,
      title: "نقطه ها",
      icon: "braille",
      filter:{hidden:true},
      num:1000,
      new:{hidden:false,name:"",...this.query()},
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}