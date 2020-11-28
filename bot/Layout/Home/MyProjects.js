import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
export default class Project extends Component {

  render = () =>{
    this.config = {
      cols: {
        
        "`id`":{text:"شناسه",dataIndex:"id"},
        "id as target":{text:"نشان ها",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Targets",col:"com=1&_project",icon:"x-fab fa-codepen"},width:60},

       name:{text:"نام" ,editable:true,flex:1},
        //"id as page":{text:"صفحات",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Pages",col:"_project",icon:"x-fas fa-file-alt"},width:60},
        //"id as qrcode":{text:"لینک",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Links",col:"_project",icon:"x-fas fa-qrcode"},width:60},

        //cmode :{text:"نوع ارتباط",type:"select",btn:"selector",options:{0:"اینترنت",1:"داخلی"}},
        //IP:{text:"سرور" ,editable:true ,width:150},
        //users:{text:"کاربر"  ,width:60},
       // "id as statics":{text:"آمار",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Statics",col:"_project",icon:"x-fas fa-chart-bar"},width:60},
        //"id as info":{text:"مشخصات",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Info",col:"_project",icon:"x-fas fa-cog"},width:60},
       
        
        "id data":{text:"بروز رسانی ",dataIndex:"id",btn:"socketkey",exp:"key",options:{path:"dataupdate",col:"_project",icon:"x-fas fa-sync-alt"},width:80},
        view:{text:"بازدید" },
        lunch:{text:"اجرا" },
        "id*status  as dat":{text:"dat",dataIndex:"dat",btn:"linker",exp:"key",options:{path:"https://platform.ravinoserver.ir/socket/targets/${val}_download.dat",icon:"x-fa fa-database green"},width:60},
        "id*status  as xml":{text:"xml",dataIndex:"xml",btn:"linker",exp:"key",options:{path:"https://platform.ravinoserver.ir/socket/targets/${val}_download.xml",icon:"x-fa fa-file-excel blue"},width:60},
        status :{text:"وضعیت",type:"select",btn:"selector",options:{0:"غیر فعال",1:"فعال"}},
        id:{text:"حذف",btn:"delbtn" ,width:60}
      },
      from : "project",
      join : false,
      title: "پروژه ها",
      icon: "first-order x-fab",
      filter:{hidden:false},
      num:1000,
      new:{hidden:false,name:"پروژه جدید",doafter:()=>{
        window.socket.emit("newproject");
      }},
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}