import React,{ Component } from 'react';
import Table from '../../Componnet/Table';

import moment from 'moment-jalaali'
export default class TaskTimes extends Component {
    query(){
        let query={};
        let searchVal  = decodeURIComponent(window.location.search)
        searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
        
        return query;
      }
  render = () =>{
      console.log('loaded')
    this.config = {

      cols: { 
        id:{text:"", width:50},
        ord:{text:""},
        type: { text: "نوع", btn: "selector", options: {
          0: "تاریخ"
          ,1: "روزانه"
          ,2: "هفتگی"
          ,3: "ماهانه"
         }, type: "select" , width:70},
         "if(type>0,1,0) datedeny":{text:""},
         value:{text:"روز",type:"number",editable:true, renderer:(v,r)=>{
            let wdays = "شنبه_یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه".split("_")
             if(r.data.type==0 || r.data.type==1) return "";
             else if(r.data.type==2) return wdays[v]; else return v*1;
         }},
         date:{text:"تاریخ",btn:"editdate" },
         start:{text:"شروع",editable:true,flex:1,renderer:v =>{
           
          return String(v).split(":").slice(0,2).join(":")
        }},
         end:{text:"پایان",editable:true,flex:1,renderer:v =>{
           
           return String(v).split(":").slice(0,2).join(":")
         }},
        status: { text: "وضعیت",btn:'statuskey',width:60},
        "`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50},

      },
     // tree:"title",
      from : "task_times",
      title: "زمانبندی",
      icon: "clock",
      order:"ord",
      filter:{hidden:true},
      new:{
        type : 1,
        value:1,
        status : 1,
        start:"00:00",
        end:"23:59",
        _task:this.query()._task
      },
      num:1000,
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}