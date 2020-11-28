import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import Storer from "../../Store/Storer";
export default class NewExam extends Component {
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
    return query;
  }
  tpl = data => (
    <div>
        <div>آزمون شامل {data.count} سوال با مجموع زمان پاسخگویی {data.duration} دقیقه و {data.neg_mod?" با ": " بدون "}
         در نظر گرفتن نمره منفی می باشد
        </div>     </div>
);
navigate = (path) => {
  window.Header.setState({hidbar:false})
  this.props.history.push(path);
}
componentWillMount(){
  window.socket.on("paylink", link => { window.location.href = link });

}
regi(){
  window.socket.emit("register",this.val)
  window.socket.on("register",v=>{
    window.socket.off("register");
  if(v) {
    Storer({
      reged : {from:"exam_user",cols: '_exam_item as id',0:{pid: 0}},
    }, this);
    Ext.toast(v)
    window.socket.emit("refresh")                    
  }else{
    Ext.toast("روند ثبت نام شما با خطا مواجه شده است ")
  }
})
}
onclick=()=>{ 
if(this.price>0)  {
  window.socket.emit("getprepay",this.val)
  window.socket.on("getprepay",ppst=>{
    if(ppst=="pay"){
      let price  = this.price>0 ? `با  پرداخت هزینه ` + this.price +" تومان" :""
      let msg = `آیا در این آزمون ${price} ثبت نام می کنید؟`
      Ext.Msg.confirm("توجه!",msg,(st)=>{if(st=="yes") {
        Ext.toast("درحال انتقال به درگاه بانکی لطفا صبر کنید ...",100000)
        window.socket.emit("paylink", this.price, window.location.hostname, window.userData._user+":"+this.val);
      }})
    }else{
      let msg = `هزینه آزمون شما قبلا پرداخت شده و می توانید در آین آزمون به طور رایگان ثبت نام کنید`
      Ext.Msg.confirm("توجه!",msg,(st)=>{if(st=="yes") {
        this.regi()
      }})
    }
  })
}else{
  this.regi()
}
}
  render = () =>{
    let reged = window.userData.reged
    reged.unshift(-1)
    let cell={
      listeners: {
          click: {
              element: 'element', 
              fn: ()=>{setTimeout(this.onclick.bind(this),100)}
          }
      }
    }
    this.config = {
      cols: {
         "exam_item.`id`":{text:"",dataIndex:"id"},
         //paye :{text:"پایه تحصیلی",dataIndex:"paye"},
         "exam.name" :{text:"عنوان" ,flex:1,dataIndex:"name",minWidth:"100",cell},
         "exam_item.start_time" :{text:"شروع",btn:"date",dataIndex:"start_time" ,width:60,cell},
         "exam_item.count" :{text:""},
         "exam_item.duration" :{text:""},
         "exam_item.neg_mod" :{text:""},
         price :{text:"هزینه" ,renderer:v=>v?v:"رایگان",width:60,cell},
        // "exam_item.id as reg":{text:"ثبت نام",dataIndex:"reg",btn:"defkey",exp:"key",options:{handler:(val)=>{ 

      //  },icon:"x-fa fa-user-plus"},width:60},
         //id:{text:"حذف",btn:"delbtn" ,width:60}
      },
      from : "exam",
      join : "exam.item",
      0 : {pid:window.userData._exampid},
      1 : {end_time: '> now()', pid: 0, id:"{not in ("+reged.join(',')+")}"},
      ignore:true,
      onSelect : (a,record)=>{
       // this.selrec = record
    
        this.val = record.data.id
        this.price = record.data.price
        console.log(this.price)
        
      },
      title: "ثبت نام آزمون "+ window.userData.payename,
     // icon: "user-plus",
      filter:{hidden:true},
      num:1000,
      //rowNumbers:{text:"ردیف", align:"center"},
     // new:{hidden:true},
      excel:{hidden:true},
      print:{hidden:true},
     // refresh:{hidden:true},
      history : this.props.history,
      itemConfig:{text:"asdf",body: {tpl: this.tpl}},
      noitem:()=>{
        Ext.Msg.alert(" ","شما در همه آزمون های موجود ثبت نام کرده اید",(st)=> {
this.navigate("/")
        })
      }
    }
    return <Table ref='Table' {...this.config} />
  }
}