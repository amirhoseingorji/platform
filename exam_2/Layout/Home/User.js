import React, { Component } from 'react';
import { Container ,Button,Image ,ToolTip} from '@sencha/ext-modern';
import Procces from './Procces';
import PerfectScrollbar from 'perfect-scrollbar';
import Storer from "../../Store/Storer";
import FooterTab from './User/FooterTab';
import  {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import moment from 'moment-jalaali'
moment.loadPersian({usePersianDigits: false})
export default class User extends Component {
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
    return query;
  }
  state={
    reged:[]
  }
  navigate = path => this.props.history.push (path);
  componentWillMount(){
    Storer({
     // carousel:{0:{pid:1}},
       reged : {from:"exam_user",cols: 'exam_item.id , exam_item.name,start_time ,if(start_time>now(),true,false) as disabled,count,duration,neg_mod',join:"exam_item",0:{pid: 0,status:"<2",begin_time:"> now() - 60000*exam_item.duration"},1:{end_time: '> now()'},order:"start_time",asc:true},
       newexam :{cols:"exam.id,exam_item.id _exam_item",from : "exam",join : "exam.item",0:{pid:window.userData._exampid},1 : {end_time: '> now()', pid: 0}},
       dashboard : { from: "menu", cols: "$id as id,title as text,iconCls,text as perm,target", 0: { $pid: "{is null}",menu:1,$id:"{!='/'}"} ,order:"ord" ,asc:true} ,
    //  advertise:{},
    },this);
}

  componentDidMount() {
    // if(!window._user){
    // new PerfectScrollbar(this.refs.mainPage.el.dom.firstChild);
    // new PerfectScrollbar(this.refs.advertise.refs.Advertise.el.dom);
    // }
  }
  render = () =>{
    var {reged} = this.state
    let {status} = this.query()
    console.log(status)
       return     <Container layout="vbox" scrollable>
   
      {window.userData._user?
      <Container className="rtl" >
         <br/>
         <Image src='https://andishmand.ir/wp-content/uploads/2019/07/logo.png' mode='img' width="180" style={{margin:"auto"}} />
    <center > سامانه آزمون آنلاین اندیشمند  
    <br/>
  
    <br/>
    <a href="https://andishmand.ir/%d8%a2%d8%b2%d9%85%d9%88%d9%86-%d8%a2%d9%86%d9%84%d8%a7%db%8c%d9%86/" target="_blank" style={{textDecoration:"none",backgroundColor:"#B39DDB",padding:"4px",borderRadius:"5px",color:"#212121"}}>اطلاعات و برنامه آزمون های اندیشند</a>
    <br/>
    <br/>
    <br/>
    {status=="error"?<Container style={{color:"red"}} cls="x-round"> <b>تراکنش شما با خطا مواجه شده است ، لطفا دوباره اقدام نمایید</b></Container>:null}
    {status=="ok"?<Container style={{color:"green"}} cls="x-round"> <b>پرداخت و ثبت نام شما با موفقیت انجام شد</b></Container>:null}
    
    {/* <div style={{padding:"0", maxWidth:"500px",direction:"ltr"}}  > <br/>
        <Carousel ref="Carousel" infiniteLoop arrows cls="ltr " margin={0} height={Ext.platformTags.phone?'180px':'300px'}  padding="0" activeItem={this.state.carousel.length-1}  showThumbs={false} showStatus={false}>
         {this.state.carousel.map((e, i) =>    <img  src={e.src} {...this.props}  key={i} id={e.href} style={{ height:Ext.platformTags.phone?'180px':'300px'}} />    )} 
      </Carousel> 
      </div> */}
    {/* {Ext.platformTags.phone?<br/>:} */}
    </center>
  {/* hidden={!e.count}  */}
        <Container cls="rtl"  style={{textAlign:"center"}}> 
        {this.state.dashboard.map((e, i) => <Button hidden={!window.userData[e.target]}  badgeText={window.userData[e.target]>0?window.userData[e.target]+" آزمون":""}  key={i} cls={"dashboard"} iconAlign="top" iconCls={e.iconCls+" dashboardIcon"+(e.perm.indexOf(window.userData.mode)<0?" disableddashboardIcon":"")} text={e.text} ui="action" margin={Ext.platformTags.phone?5:7} width={Ext.platformTags.phone?120:140} height={Ext.platformTags.phone?120:140} handler={() => {
          if (e.id.slice(0,4)=='http') window.location.href=e.id;else     this.props.history.push(e.id);
          }}/>)}
          <br/>
          {this.state.reged.length>0 ?<Container>
          <div>
             آزمون های پیش روی شما:
          </div>
         <Container layout={{type:"vbox"}}>
           {reged.map((e,i)=><Button key={i}   text={e.name +"   "+(e.disabled?moment(e.start_time).format(
             " - jD jMMMM" + " ساعت "+ "HH:mm" 
             ):"شروع کنید")+" "} ui="action"  maxWidth="450px"  cls={e.disabled?"disabled":""}   minWidth= "300px" margin="auto" style={{borderRadius:"8px",margin:"5px auto"}} handler={()=>{
            e.disabled ? Ext.toast('آزمون شما راس ساعت '+moment(e.start_time).format(
              "HH:mm تاریخ jD jMMMM"       )+' آغاز خواهد شد این '
            +`آزمون شامل ${e.count} سوال با مجموع زمان پاسخگویی ${e.duration} دقیقه و ${e.neg_mod?" با ": " بدون "}
            در نظر گرفتن نمره منفی می باشد`,3000):   this.navigate("/Exam?id="+e.id)
           }}>
           </Button>)}
          </Container>
          <br/>
          </Container> :<div> در حال حاضر آزمون فعالی برای شما تعریف نشده است</div>}
          
        </Container>
        
        
        </Container>
        :
        <Container cls="rtl" layout={{ type: "vbox", align: Ext.platformTags.phone ? "strech" : "center", pack: "start" }}  layout="center" margin="5" scrollable ref="mainPage"  >
         
          
        <Procces parent={this} route={"Login"} />
      </Container>}
      {/* <Advertise ref={"advertise"} /> */}
    </Container>
}
}
