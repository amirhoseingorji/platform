import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import Storer from "../../Store/Storer"
export default class Databasee extends Component {
    componentWillMount(){
        Storer({
            data_type:{},
          }, this);
    }
    toOption(data){
        let obj={};
        data.map(e=>obj[e.id]=e.name)
        return obj;
      }
  render = () =>{
    if(!this.state.data_type.length) return null;
    this.config = {
        cols: {
          id: { text: "شناسه" },
          pid: { text: "" },
          ord: { text: "" },
          name: { text: "نام", editable: true, flex: 1 },
          type: { text: "نوع", btn: "selector", options: this.toOption(this.state.data_type), type: "select" },
          length: { text: "طول",type:"number" },
          deny : {text:""},
          options:{text:"ویژگی ها",type:"text", flex: 1},
          "`id`": { text: "حذف", btn: "delbtn" ,dataIndex:"id"},
          //"iconCls"
  
        },
        from: "data",
        order: "ord",
        tree:"name",
        title: "دیتابیس",
        icon: "database",
        new: { hidden: false, name: ""},
        filter: { hidden: true },
        excel: { hidden: true },
        print: { hidden: true },
        btn4:{ hidden: false,width:"100",text:"دریافت",handler:()=>{
            window.socket.emit("syncdata")
        }},
        num: 1000,
        history: this.props.history,
      }
      return <Table {...this.config} />
  }
}