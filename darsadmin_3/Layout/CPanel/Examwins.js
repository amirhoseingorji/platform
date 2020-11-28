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
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
    return query;
  }
  render = () =>{
    if(!this.state.province_city.length || !this.state.banks.length) return null;
    let provinces = {}
    let banks = {}
    this.state.province_city.map(e=>provinces[e.id]=e.name)
    this.state.banks.map(e=>banks[e.id]=e.name)
    this.config = {
      cols: {
        "exam_user.id":{dataIndex:"id",text:""},
        "user.name":{dataIndex:"name",text:"نام",flex:3},
        "user.user":{dataIndex:"user",text:"تلفن همراه" ,flex:2},
        "exam_user._province_city":{dataIndex:"_province_city",text:"منطقه",btn:"selector",options:provinces,flex:2},
      //  "exam_user.percent":{dataIndex:"percent",text:"درصد",flex:1},
        "user.nid":{dataIndex:"nid",text:"کدملی" ,flex:2},
        "user.father":{dataIndex:"father",text:"نام پدر",flex:2 },
        "user.sex":{dataIndex:"sex",text:"جنسیت",btn:"selector",options:{1:"پسر",0:"دختر"},flex:1},
        "user._bank":{dataIndex:"_bank",text:"بانک",btn:"selector",options:banks,flex:2},
        "user.shaba":{dataIndex:"shaba",text:"شماره شبا",flex:3 },
        "user.bank_name":{dataIndex:"bank_name",text:"حساب",flex:2 },
       // "exam_user."id"":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50},
      },
      from : "exam_user",
      join : "user",
      title: "برنده ها",
      icon: "user",
      ignore:true,
      filter:{hidden:false},
      0:{_province:window.userData._province,pid:window.userData.pid,win:1 },
      num:1000,
     // new:{hidden:true,user:"09000000000",_province:window.userData._province },
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}