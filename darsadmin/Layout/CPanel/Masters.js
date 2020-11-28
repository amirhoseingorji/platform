import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import Storer from "../../Store/Storer";
export default class Masters extends Component {
  state = {province:[]}
  componentWillMount(){
      Storer({
      province:{} 
    },this);
  }
  render = () =>{
    if(!this.state.province.length) return null;
    let provinces = {0:"کشور"}
    this.state.province.map(e=>provinces[e.id]=e.name)
    this.config = {
      cols: {
        id:{text:""},
        name:{text:"نام" ,editable:true,flex:1},
        user:{text:"تلفن همراه" , type:"number",flex:1},
        pass:{text:"رمز",type:"text" ,flex:1},
        nid:{text:"کدملی" , type:"number",flex:1},
        _province:{text:"استان",btn:"selector",options:provinces,type:"select",flex:1},
        last:{text:"آخرین ورود",dataIndex:"last",btn:"date",flex:1},
        "`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50,flex:1},
        "if(access=100,1,0) deny" : {text:""}
      },
      from : "user",
      title: "مدیران استانی",
      icon: "user",
      filter:{hidden:false},
      0:{access:">0"},
      num:1000,
      new:{hidden:false,user:"09000000000",access:1},
      back:{hidden:true},
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}