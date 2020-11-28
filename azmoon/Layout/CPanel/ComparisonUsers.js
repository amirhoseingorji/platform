import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
export default class ComparisonUsers extends Component {
  state={statuscheck:false}
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
    
    return query;
  }
  componentWillMount(){

    Storer({
      statuscheck:{from:"comparison",cols:"if(end<now(),2,status) status",0:{id:this.query()._Comparison}},
    },this);
   
  }

  render = () =>{
    if(!this.state.statuscheck || this.state.statuscheck.length==0  ) return null; 
    this.config = {
      cols: {
      "done":{text:" ",type:"check",dataIndex:"done",headerCheckbox:true,disabled:this.state.statuscheck[0].status>1},
        name :{text:"نام",type:"text" },
       "user.id _user":{text:""},
      date:{text:"تاریخ",btn:"date"},
      "comparison_user.status": {text:"وضعیت",options:{0:"انجام نشده",1:"اتمام ارزیابی",2:"درحال انجام"},btn:"selector",dataIndex:"status"},
      comment:{text:"نظر کاربر",flex:1},
      "comparison_user.id id":{text:"",dataIndex:"id"},
        "comparison_user.status deny" :{text:""}
      },
      from : "comparison_user",
      join : "user",
      title: "کاربران ارزیابی",
      icon: "chart-bar",
      filter:{hidden:true},
      num:1000,
      
      history : this.props.history
    }
    
    return <Table {...this.config} />
  }
}