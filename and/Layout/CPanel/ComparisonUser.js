import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
export default class ComparisonUser extends Component {

    state={user:false}
    query(){
      let query={};
      let searchVal  = decodeURIComponent(window.location.search)
      searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
      
      return query;
    }
    componentWillMount(){
  
      Storer({
        user:{cols:"name",0:{id:this.query()._user}},
      },this);
     
    }

  render = () =>{
    if(!this.state.user || this.state.user.length==0  ) return null; 
    this.config = {
      cols: {
     // "done":{text:" ",type:"check",dataIndex:"done",headerCheckbox:true,disabled:this.state.statuscheck[0].status>1},
     "comparison.id _comparison":{text:"شناسه",dataIndex:"_comparison"},  
     name :{text:"نام",type:"text" },
       
       "comparison_user.date":{text:"تاریخ",dataIndex:"date",btn:"date"},
      "comparison_user.status": {text:"وضعیت",options:{0:"انجام نشده",1:"اتمام ارزیابی",2:"درحال انجام"},btn:"selector",dataIndex:"status"},
      comment:{text:"نظر کاربر",flex:1},
      "comparison_user.id id":{text:"",dataIndex:"id"},
        "comparison_user.status deny" :{text:""}
      },
      from : "comparison_user",
      join : "comparison",
      title: "ارزیابی کاربر",
      icon: "chart-bar",
      filter:{hidden:true},
      num:1000,
      
      history : this.props.history
    }
    
    return <Table {...this.config} />
  }
}