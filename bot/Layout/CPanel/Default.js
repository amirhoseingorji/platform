import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
export default class Carosel extends Component {
  render = () =>{
    this.config = {
        cols: {
         
          "`id`": { text: "شناسه" ,dataIndex:"id"},
          src: { text: "تصویر", btn: "imgbtn",options:{text:"آپلود",path:"target/",tooltip:"dimansion"} },
         // pid: { text: "مافوق", editable: true },
          title: { text: "نام", editable: true, flex: 3 },
        //  ord :{text:"ترتیب",type:"number",editable:true},
         // phsrc:{ text: "1تصویر", btn: "imgbtn" },
          
          href: {text:"لینک",editable:true, flex: 1},
        //  price: { text: "قیمت", editable: true,type:"number" },
        //  text: { text: "توضیحات", editable: true, flex: 1, type: "text" },
         // status: { text: "وضعیت", btn: "selector", options: { 0: "غیرفعال", 1: "فعال" }, type: "select" },
          id: { text: "خذف", btn: "delbtn" },
  
        },
        from: "carousel",
        order: "ord",
        //  join : "user_info",
        0 :{pid:1},
        title: " بنر ها",
        icon: "flag-o",
        new: { hidden: false, title: "مورد جدید",pid:1,src:"https://andishmand.ir/wp-content/uploads/2019/07/LOGO3.png" },
        filter: { hidden: true },
        excel: { hidden: true },
        print: { hidden: true },
        num: 1000,
        history: this.props.history,
       // tree: "title",
      }
      //if(this.query()._movies) delete this.config.tree;
      return <Table {...this.config} />
  }
}