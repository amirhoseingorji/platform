import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import Storer from "../../Store/Storer";
export default class Colony extends Component {
  componentWillMount(){
   // Storer({ products: {cols:"id,name"} }, this);
  }
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
    
    return query;
  }
  render = () => {
    // if(this.state.products.count == undefined) return null
    // let products = {}
    // this.state.products.map(e=>products[e.id]=e.name)
    this.config = {
      cols: {
        id: { text: "شناسه", width: 50 },
        name: { text: "نام",editable:true,flex:2},
       // _products: { text: "",btn: "selector", options:products , type: "select" },
        cavity: { text: "ظرفیت" ,type:"number" },
        start: { text: "شروع", btn: "editdate",flex:1 },
        end: { text: "خاتمه", btn: "editdate",flex:1 },
        count: { text: "خریدار" ,type:"number" },
        price: { text: "قیمت",type:"number" },
        status: { text: "وضعیت",btn:'statuskey' , width: 60},
        
        "id tran":{text:"کاربران",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/UserProductsColony",col:"_products_colony",icon:"x-fa fa-users"},width:70},
        rate: { text: "نمره", width: 50 },
        date: { text: "ویرایش", btn: "date" },
        "`id`": { text: "حذف", dataIndex: "id", btn: "delbtn", width: 50 },
      },
      from : "products_colony",
      title: "کولونی ها",
      icon: "users-class",
      filter:{hidden:false},
      num:1000,
      history : this.props.history ,
      new:{
        _products : this.query()._products,
        name:"کولونی جدید"
      },
    }
    return <Table {...this.config} />
  }
}