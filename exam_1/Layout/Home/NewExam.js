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
  render = () =>{
    let reged = window.userData.reged
    reged.unshift(-1)
    let cell={
      listeners: {
          click: {
              element: 'element', 
              fn: ()=>{ 

                Ext.Msg.confirm("توجه!","آیا در این آزمون ثبت نام می کنید؟",(st)=>{if(st=="yes") {
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
                } });
                //this.refs.table.navigate(this.dblpath) 
              }
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