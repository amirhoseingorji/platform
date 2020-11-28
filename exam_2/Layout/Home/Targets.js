import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Image } from '@sencha/ext-modern';
import { RendererCell } from '@sencha/ext-modern';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
export default class Targets extends Component {
  componentWillMount(){
    window.MainMenu.setState({micro:false});
  }
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });  
    return query;
  }
  qimage = (v,a) =>{
    return <img src={v}  height="50" margin="0" />
    }
  

  render = () =>{
    this.config = {
      cols: {
        "project_target.`id`":{text:"شناسه",dataIndex:"id"},
        "count(*) as items":{text:" ویرایش افزودنی ها",dataIndex:"items",btn:"linkkey",exp:"key",options:{value:"items",path:"/Factors",col:"_project="+this.query()._project+"&_project_target",icon:"x-fa fa-pen",dataIndex:"id"},width:110},
 

       
//"`photo`":{dataIndex: "photo",text:"تصویر",renderer:this.qimage.bind(this),width:150},
photo:{text:"بارگزاری",btn:"imgbtn",options:{text:"آپلود",path:"target/"},width:250},
                name:{text:"نام" ,editable:true,flex:1,renderer:(val)=>val?val:<span style={{color:"#999999"}}>نام نشان</span>},

        "concat(project_target.height,' * ',project_target.width) as dimansion":{text:"ابعاد",dataIndex:"dimansion"},
             "project_target.rating":{text:"کیفیت",dataIndex:"rating",btn:"ratebtn",width:90},
        //    "project_target.id as  targetr":{text:"تنظیمات",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Factors",col:"_project="+this.query()._project+"&_project_target",icon:"x-fa fa-cogs"},width:70},
       
       "project_target.status" :{text:"وضعیت",dataIndex:"status",type:"select",btn:"selector",options:{0:"غیر فعال",1:"منتشرنشده",2:"منتشرشده"},width:120},
       "project_target.date" :{text:"تاریخ انتشار",dataIndex:"date",btn:"date",width:120},
       "project_target.view":{text:"بازدید" ,dataIndex:"view"},
       "project_target.sumtimes":{text:"زمان" ,dataIndex:"sumtimes"},
        "project_target.id":{text:"حذف",btn:"delbtn",dataIndex:"id" ,width:50},
        "1 as com":{text:""}

      },
      joinMode : "left",
      join : "project_target_item",
      from : "project_target",
      title: "نشان ها",
      group : "project_target.id",
      icon: "codepen x-fab",
      filter:{hidden:false},
      num:1000,
      new:{hidden:false,_project:this.query()._project||0,name:"",doafter:()=>{
         Storer("project_target_item", this, {_project_target: "{(select max(id) from project_target)}",  _project:this.query()._project,type:0,x:0,y:0,z:140 }, "insert");
      }},
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}