import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import Storer from "../../Store/Storer";
export default class Robots extends Component {
  componentWillMount(){
  //  Storer({ products: {cols:"id,name"} }, this);
  }
  render = () => {
    // if(this.state.products.count == undefined) return null
    // let products = {}
    // this.state.products.map(e=>products[e.id]=e.name)
    this.config = {
      cols: {
        id: { text: "شناسه", width: 50 },
        type: { text: "نوع", btn: "selector", options: {
             0: "تلگرام",
             1: "ایمیل" ,
             2: "پیامک" , 
             3: "درگاه"  ,
             4: "گپ"  ,
             5: "بله"    
        }, type: "select" },
        name: { text: "نام"  ,editable:true,flex:"2"},
        username: { text: "شناسه"  ,editable:true,flex:"2"},
        pass: { text: "رمز"  ,editable:true,flex:"2"},
        api: { text: "api"  ,editable:true ,flex:"4"},
        start_process: { text: "شروع"  ,editable:true,flex:"1"},
        text_process: { text: "متن"  ,editable:true,flex:"1"},
        access: { text: "وضعیت", btn: "selector", options: { 0: "عموم", 1: "مدیر" }, type: "select" },
        status: { text: "وضعیت" ,btn:'statuskey' },
        "`id`": { text: "حذف", dataIndex: "id", btn: "delbtn", width: 50 },
      },
      from : "robots",
      title: "ربات ها",
      icon: "robots",
      filter:{hidden:false},
      new:{name:"ربات جدید"},
      num:1000,
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}