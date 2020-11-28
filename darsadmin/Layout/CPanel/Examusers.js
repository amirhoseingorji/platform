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
        "user.nid":{dataIndex:"nid",text:"کدملی" ,flex:2},
        "user.sex":{dataIndex:"sex",text:"جنسیت",btn:"selector",options:{1:"پسر",0:"دختر"},flex:1},
        "exam_user._province_city":{dataIndex:"_province_city",text:"منطقه",btn:"selector",options:provinces,flex:2},
        "exam_user.begin_time":{dataIndex:"begin_time",text:"شروع",btn:"date",flex:1},
        "exam_user.finish_time":{dataIndex:"finish_time",text:"پایان",btn:"date",flex:1},
        "exam_user.status":{dataIndex:"status",text:"وضعیت",btn:"selector",options:{1:"فعال",0:"غیرفعال",2:"خاتمه"},flex:1},
        "exam_user.correct":{dataIndex:"correct",text:"صحیح"},
        "exam_user.percent":{dataIndex:"percent",text:"درصد",flex:1},
        "exam_user.passed":{dataIndex:"passed",text:"قبولی",flex:1,btn:"selector",options:{1:"بله",0:"خیر",2:"خاتمه"}},
       // "exam_user.rank":{dataIndex:"rank",text:"رتبه"},
        "exam_user.win":{dataIndex:"win",text:"برنده",flex:1,btn:"selector",options:{1:"بله",0:"خیر",2:"خاتمه"}},

      },
      from : "exam_user",
      join : "user",
      title: "نتایج",
      icon: "user",
      ignore:true,
      filter:{hidden:false},
      0:{_province:window.userData._province },
      num:1000,
      //new:{hidden:true,user:"09000000000",_province:window.userData._province },
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}