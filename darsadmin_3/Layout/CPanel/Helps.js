import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import Storer from "../../Store/Storer";
export default class Exams extends Component {
//   state = {province:[]}
//   componentWillMount(){
//       Storer({
//       province:{} 
//     },this);
//   }
  render = () =>{
   // if(!this.state.province.length) return null;
    //let provinces = {"*":"کشور"}
  //  this.state.province.map(e=>provinces[e.id]=e.name)
    this.config = {
      cols: {
        id:{text:""},
        title:{text:"عنوان" ,editable:true,flex:2},
        description:{text:"مختصر" ,editable:true,flex:3},
        text:{text:"متن" ,editable:true,flex:8},
      //  _province:{text:"استان",btn:"selector",options:provinces,type:"select",flex:1},
        date:{text:"انتشار",btn:"date",flex:1},
        status:{text:"وضغیت",btn:"selector",options:{1:"فعال",0:"غیرفعال"},type:"select",flex:1},
        "`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50,flex:1},
      },
      from : "help",
      title: "راهنما و اطلاعیه ها",
      icon: "user",
      filter:{hidden:false},
      0:{_province:window.userData._province||"*"},
      num:1000,
      new:{hidden:false,_province:window.userData._province||"*"},
      back:{hidden:true},
      history : this.props.history
    }
   // if(window.userData._user==1) delete this.config[0];
    return <Table {...this.config} />
  }
}