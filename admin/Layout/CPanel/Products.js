import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
export default class Products extends Component {
  record = {data:{id:"{null}"}}
  getrecord= ()=> this.record;
  render = () =>{
    this.config = {
      cols: { 
        id:{text:"شناسه", width:50},
        pid:{text:""},
        name:{text:"نام" ,editable:true,flex:1},
        text:{text:"توضیحات",flex:2,btn:"html",type:"text"},
        photo:{text:"تصویر",btn:"imgbtn", width: 50,options:{path:""}},
        days:{text:"مدت اعتبار" , type:"number"},
        "if(pid,id,0) icid":{text:"کولونی ها",dataIndex:"icid",btn:"linkkey",exp:"key",options:{path:"/Colony",col:"_products",icon:"x-fa fa-users-class"},width:70},
        "if(pid,0,id) ipid":{text:"روند",dataIndex:"ipid",btn:"linkkey",exp:"key",options:{path:"/ProductsProcess",col:"_products",icon:"x-fa fa-layer-group"},width:70},
        status:{text:"حالت",btn:'statuskey', width: 50},
        rate :{text:"نمره", width: 50},
        date:{text:"ویرایش",btn:"date"},
        "`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50}, 
        expand:{text:""}
      },
      tree :"name",
      from : "products",
      title: "محصولات",
      icon: "shopping-bag",
      
      filter:{hidden:false},
      num:1000,
      new:{
        name:'محصول جدید',
        text:"توضیحات محصول"
      },
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}