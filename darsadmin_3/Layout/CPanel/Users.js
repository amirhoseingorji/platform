import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
export default class Users extends Component {
  state = {province_city:[]}
  componentWillMount(){
      Storer({
        banks:{},
        province_city:{0:{_province:window.userData._province}} ,
        
    },this);
  }
  render = () =>{
    if(!this.state.province_city.length || !this.state.banks.length) return null;
    let provinces = {}
    let banks = {}
    this.state.province_city.map(e=>provinces[e.id]=e.name)
    this.state.banks.map(e=>banks[e.id]=e.name)
    this.config = {
      cols: {
        id:{text:""},
        name:{text:"نام" ,editable:true,flex:3},
        user:{text:"تلفن همراه" , type:"number",flex:2},
        pass:{text:"رمز",type:"text" ,flex:2},
        nid:{text:"کدملی" , type:"number",flex:2},
        birthdate:{text:"سال تولد", type:"number",flex:1},
        father:{text:"نام پدر",type:"text",flex:2 },
        _province_city:{text:"منطقه",btn:"selector",options:provinces,type:"select",flex:2},
        school_name:{text:"مدرسه",type:"text",flex:2 },
        paye:{text:"پایه",type:"number",flex:1 },
        sex:{text:"جنسیت",btn:"selector",options:{1:"پسر",0:"دختر"},type:"select",flex:1},
        _bank:{text:"بانک",btn:"selector",options:banks,type:"select",flex:2},
        shaba:{text:"شماره شبا",type:"text",flex:3 },
        bank_name:{text:"حساب",type:"text",flex:2 },
        "`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50},
      },
      from : "user",
      title: "کاربران",
      icon: "user",
      ignore:true,
      filter:{hidden:false},
      0:{access:"0",_province:window.userData._province },
      num:1000,
      new:{hidden:false,user:"09000000000",_province:window.userData._province },
      back:{hidden:true},
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}