import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import Storer from "../../Store/Storer";
import { Container,Button ,Dialog,Image} from '@sencha/ext-modern';
export default class NewExam extends Component {
  state={
res:"",
    exam_pid:[],
    reged : []
  }
  componentWillUnmount(){
   let el = window.document.querySelector(".x-mask")
    if(el) el.remove()
  }
  navigate = (path) => {
    window.Header.setState({hidbar:false})
    this.props.history.push(path);
  }
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
    
    return query;
  }
  tpl = data => (
    <div>
        <div>آزمون شامل {data.count} سوال با مجموع زمان پاسخگویی {data.duration} دقیقه و {data.neg_mod?"با":"بدون"}
        در نظر گرفتن نمره منفی می باشد
        </div>     </div>
);
  render = () =>{
    let reged = window.userData.reged
    reged.unshift(-1)
    let cell = {
      listeners: {
        click: {
          element: 'element',
          fn: () => setTimeout(()=>{
            console.log(this.val)
            window.socket.emit("personal", this.val)
            window.socket.on("personal", (res) => {
              window.socket.off("personal")
              this.setState({ showDialog: true, res :res})
            })
            //  this.refs.table.navigate(this.dblpath) 
          },100)
        }
      }
    }
    this.config = {
      cols: {
         "exam_item.`id`":{text:"",dataIndex:"id"},
         //paye :{text:"پایه تحصیلی",dataIndex:"paye"},
         "exam.name" :{text:"عنوان" ,flex:1,dataIndex:"name",minWidth:"100",cell},
         "exam_item.end_time" :{text:"پایان",btn:"date",dataIndex:"end_time" ,cell},
         "exam_item.count" :{text:""},
         "exam_item.duration" :{text:""},
         "exam_item.neg_mod" :{text:""},
        //  price :{text:"هزینه" ,renderer:v=>v?v:"رایگان"},
        //  "exam_item.id as reg":{text:"کارنامه",dataIndex:"reg",btn:"defkey",exp:"key",options:{handler:(val)=>{ 
        //   window.socket.emit("personal",val)
        //   window.socket.on("personal", (res)=>{
        //     window.socket.off("personal")
        //      this.setState({showDialog:true,res})
        //   })
        //  },icon:"x-fa fa-poll"},width:60},
         //id:{text:"حذف",btn:"delbtn" ,width:60}
      },
      from : "exam",
      join : "exam.item",
      0 : {pid:window.userData._exampid},
      1 : {pid: 0, id:"{ in ("+reged.join(',')+")}"},
      ignore:true,
    
      title: "دریافت کارنامه",
     // icon: "user-plus",
      filter:{hidden:true},
      num:1000,
      //rowNumbers:{text:"ردیف", align:"center"},
     // new:{hidden:true},
      excel:{hidden:true},
      print:{hidden:true},
      history : this.props.history,
      itemConfig:{text:"asdf",body: {tpl: this.tpl}},
     // refresh:{hidden:true},
      onSelect : (a,record)=>{
        this.val = record.data.id
      },
      noitem:()=>{
        Ext.Msg.alert(" ", "درحال حاضر کارنامه ای برای شما وجود ندارد",(st)=> {
          this.navigate("/")
                  })
      }
    }
    return <Container layout='fit'><Table ref='Table' {...this.config} /> <Dialog  centered maxWidth="1000"  minWidth="1000" scrollable minHeight="500"  maskTapHandler={()=>{
      this.setState({showDialog:false})
      }} maxHeight="95%"  style={{backgroundColor:"#ffffff",fontSize:"18px"}}    displayed={this.state.showDialog} title="کارنامه" modal bodyPadding="10"
    >
      

      <Image hidden = {this.state.res.indexOf("ttp")==-1} src={this.state.res+"?"+Math.random()}   width="100%" mode='img' onTap={()=>{
        window.open(this.state.res,"_blank")
      }}/> 
      <Container  hidden = {this.state.res.indexOf("ttp")>0} html={ this.state.res } style={{fontSize:"16px"}} minWidth="280" />
  

<Button text="بازگشت"  ui="action round" cls="greenback" height="35"  margin="5" maxWidth="450"  handler={()=>{
this.setState({showDialog:false})
}}/>
    </Dialog></Container>
  }
}