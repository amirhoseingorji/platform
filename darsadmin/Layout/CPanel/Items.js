import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
export default class Exams extends Component {
    query(){
        let query={};
        let searchVal  = decodeURIComponent(window.location.search)
        searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
        
        return query;
      }
   render = () =>{
    this.config = {
        cols: {
            id: { text: "" },
            ord: { text: "ترتیب", type: "number", flex: 1 },
            text: { text: "سوال", editable: true, flex: 6 ,btn:"html"},
            op1: { text: "الف", editable: true, flex: 2,btn:"html" },
            op2: { text: "ب", editable: true, flex: 2,btn:"html" },
            op3: { text: "ج", editable: true, flex: 2 ,btn:"html"},
            op4: { text: "د", editable: true, flex: 2,btn:"html" },
            answer: {
                text: "پاسخ", btn: "selector", options: {
                    1: "الف",
                    2: "ب",
                    3: "ج",
                    4: "د"
                }, type: "select", width:70 },
            "`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50},
        },
      order:"ord",
      from : "exam_item",
      title: "سوالات",
      icon: "user",
      filter:{hidden:false},
      0:{_exam:this.query()._exam},
      num:1000,
      new:{hidden:false,_exam:this.query()._exam},
      print:{hidden:false},
      back:{hidden:false},
      history : this.props.history
    }
    return <Table  ref="Table" {...this.config} />
  }
}