import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import Exams from './Subexams';
export default class Win extends Component {
  componentWillMount(){
    window.socket.on("win",res=> Ext.Msg.confirm("قرعه کشی",res,(st)=>{}) )
    window.socket.on("win_province",res=> Ext.Msg.confirm("قرعه کشی",res,(st)=>{}) )
  }
    query(){
        let query={};
        let searchVal  = decodeURIComponent(window.location.search)
        searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
        return query;
      }
   render = () =>{
    this.config = {
        cols: {
            //id: { text: "" },
            "exam_province_city.id": {dataIndex:"id", text: "قرعه ", width:40,btn:"socketkey",options:{path:"win",icon:"x-fa fa-play"} },
            name: { text: "نام منطقه", width:180 },
            "count(*) users": {dataIndex:"users", text: "شرکت کننده", type: "number", width:120 },
            "sum(if(exam_user.passed,1,0)) passed": {dataIndex:"passed", text: "قبولی", type: "number", width:120 },
            wins: { text: "ظرفیت قرعه کشی", type: "number", width:120 },
           "exam_province_city._province_city" : {dataIndex:"_province_city",text:"افراد",btn:"linkkey",exp:"key",options:{path:"/Examwins",col:"_province_city",icon:"x-fa fa-user"},width:40},
        },
      group : "exam_user._province_city",
      from : "exam_province_city",
      join : "exam_user",
      title: "قرعه کشی",
      icon: "user",
      filter:{hidden:true},
      0:{_exam:window.userData.pid,_province:window.userData._province},
      num:1000,
      btn3:{hidden:false,text:"قرعه کشی ",width:"100", iconCls:"x-fa fa-play", handler:()=>
      Ext.Msg.confirm("قرعه کشی",
      "برای قرعه کشی کل استان ظرفیت ها تطابق دارند؟"
      ,(st)=>{if(st=="yes") window.socket.emit("win_province",window.userData._province)})
    },
      btn4:{hidden:false,text:"برنده های استان",width:"140", handler:()=>this.refs.Table.navigate("/Examwins")},
      //new:{hidden:true},
      back:{hidden:true},
      history : this.props.history
    }
    return <Table  ref="Table" {...this.config} />
  }
}