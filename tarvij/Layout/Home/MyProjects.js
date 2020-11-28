import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
export default class Project extends Component {

  render = () =>{
    this.config = {
      cols: {
        
        "`id`":{text:"شناسه",dataIndex:"id"},
        "id as data":{text:"بروز رسانی ",dataIndex:"id",btn:"socketkey",exp:"key",options:{path:"dataupdate",col:"_project",icon:"x-fa fa-refresh"},width:80},
       name:{text:"نام" ,editable:true,flex:1},
       "id as target":{text:"نشان ها",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Targets",col:"_project",icon:"x-fa fa-codepen"},width:70},
       "id as page":{text:"صفحات",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Pages",col:"_project",icon:"x-fa fa-file-text"},width:70},
       "id as qrcode":{text:"لینک",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Links",col:"_project",icon:"x-fa fa-qrcode"},width:70},

       cmode :{text:"نوع ارتباط",type:"select",btn:"selector",options:{0:"اینترنت",1:"داخلی"}},
       IP:{text:"سرور" ,editable:true ,width:150},
       users:{text:"کاربر"  ,width:60},
       "id as statics":{text:"آمار",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Statics",col:"_project",icon:"x-fa fa-bar-chart"},width:70},
       "id as info":{text:"مشخصات",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Info",col:"_project",icon:"x-fa fa-gear"},width:70},
       
       status :{text:"وضعیت",type:"select",btn:"selector",options:{0:"غیر فعال",1:"فعال"}},
       "id as android":{text:"اندروید",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/android",col:"_project",icon:"x-fa fa-android"},width:70},
       "id as ios":{text:"ios",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/android",col:"_project",icon:"x-fa fa-apple"},width:70},

        id:{text:"حذف",btn:"delbtn" ,width:50}
      },
      from : "project",
      join : false,
      title: "پروژه ها",
      icon: "first-order",
      filter:{hidden:false},
      num:1000,
      new:{hidden:false,name:"پروژه جدید"},
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}