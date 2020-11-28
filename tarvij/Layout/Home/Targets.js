import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Image } from '@sencha/ext-modern';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
export default class Targets extends Component {
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });  
    return query;
  }
  qimage = (v,a) =>{
    return <Image src={v}  height="120"  />
    }
  

  render = () =>{
    this.config = {
      cols: {
        "project_target.`id`":{text:"شناسه",dataIndex:"id"},
        name:{text:"نام" ,editable:true,flex:1},
       
        "concat(project_target.height,' * ',project_target.width) as dimansion":{text:"ابعاد",dataIndex:"dimansion"},


       "count(*) as items":{text:"افزودنی ها",dataIndex:"id",btn:"linkkey",exp:"key",options:{value:"items",path:"/Factors",col:"_project="+this.query()._project+"&_project_target",icon:"x-fa fa-list"},width:100},
        //    "project_target.id as  targetr":{text:"تنظیمات",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Factors",col:"_project="+this.query()._project+"&_project_target",icon:"x-fa fa-cogs"},width:70},
       photo:{text:"آپلود ",btn:"imgbtn",width:110,options:{text:"آپلود",path:"target/",width:100}},
       "`photo`":{dataIndex: "photo",text:"تصویر",renderer:this.qimage.bind(this),flex:2},
       
       "project_target.rating":{text:"کیفیت",dataIndex:"rating",btn:"ratebtn",width:100},
       "project_target.status" :{text:"وضعیت",dataIndex:"status",type:"select",btn:"selector",options:{0:"غیر فعال",1:"آماده",2:"فعال"}},
        "project_target.id":{text:"حذف",btn:"delbtn",dataIndex:"id" ,width:50}

      },
      joinMode : "left",
      join : "project_target_item",
      from : "project_target",
      title: "نشان ها",
      group : "project_target.id",
      icon: "codepen",
      filter:{hidden:false},
      num:1000,
      new:{hidden:false,_project:this.query()._project||0,name:"new_target"},
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}