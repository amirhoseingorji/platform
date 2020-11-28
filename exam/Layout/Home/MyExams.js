import React, { Component } from 'react';
import { Container ,Button,Image ,ToolTip,Video,Dialog} from '@sencha/ext-modern';
import Box from "../../Componnet/Box";
import Procces from './Procces';
import Storer from "../../Store/Storer";
import videoplay from '../../Statics/Images/videoplay.jpg';
import andishmand from '../../Statics/Images/andishmand.png';
import student from '../../Statics/Images/student.jpg';
import exiticon from '../../Statics/Images/exiticon.png';
import resulticon from '../../Statics/Images/resulticon.png';
import myexamicon from '../../Statics/Images/myexamicon.png';
import newsicon from '../../Statics/Images/newsicon.png';
import colorfooter from  '../../Statics/Images/colorfooter.jpg';
import examlogo from  '../../Statics/Images/examlogo.jpg';
import examback from  '../../Statics/Images/examback.png';
import Title from '../../Componnet/Title';
// import moment from 'moment-jalaali'
// moment.loadPersian({usePersianDigits: false})
export default class Myexams extends Component {

  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
    return query;
  }
  state={
    reged:[],helpdialog:false,content:""
  }
  navigate = path => this.props.history.push (path);
  componentWillMount() {
    if (window.userData.user) this.getdata()
    window.socket.on("getdata",this.getdata);
  }
  getdata() {
    Storer({
      user_prepay: { cols: "_exam", ignore: true, 0: { user: window.userData.user } },
      exam_user: { cols: "status,_exam", 0: { pid: 0 } },
      exam: { cols: "exam.id,exam_item.id _exam_item, exam.name as title, description,program,fullanswer,start_time,end_time,price,duration,neg_mod,0 status,if(start_time < now(),1,0) canstart,0 pay,if(end_time > now(),1,0) canreg", ignore: true, join: "exam.item", 0: { pid: window.userData._exampid || 0 }, 1: { pid: 0 }, order: 'start_time' },
    }, this);
  }
  componentDidMount() {
    // if(!window._user){
    // new PerfectScrollbar(this.refs.mainPage.el.dom.firstChild);
    // new PerfectScrollbar(this.refs.advertise.refs.Advertise.el.dom);
    // }
  }
  render = () =>{

    if(this.state.exam && this.state.exam_user && this.state.exam_user.length>0 && this.state.exam.length>0) {
      for(let iexam in this.state.exam) {
        let exam = this.state.exam[iexam]
        for(let exam_user of this.state.exam_user) 
          if(exam_user._exam == exam.id) {
               exam.pay=1
               exam.status =  exam_user.status + 2
               if(exam.status == 2 && !exam.canstart) exam.status=1;
          }
        if(!exam.pay && !exam.canreg) delete this.state.exam[iexam] ;
        else for(let prepay of this.state.user_prepay) if(prepay._exam == exam.id) exam.pay=2
        
      }
        
    } 
    var {content} = this.state
       return     <Container layout="fit" cls={Ext.platformTags.phone?"":'homeback'}  >
   
      {window.userData._user?
      <Container   style={{margin:"auto"}} maxWidth="800px" minHeight="500px" cls={"rtl"}  centered  scrollable height={Ext.platformTags.phone?"100%":""} width="100%" maxHeight="100%">
        <Container docked="top" hidden={!Ext.platformTags.phone} cls=" backphone3 ltr" height="60" >
        <Button  text="راهنما" ui="action round"  handler={()=>this.setState({helpdialog:true,content:""})}  textAlign="center" width="70px" style={{top:"20px" ,left:"20px"}} />
          <Container style={{borderRadius:"10px" ,top:"30px",height:"20px", width:"100%", backgroundColor:"#ffffff"}} ></Container>
        </Container>


          <Container layout="vbox" margin={"5 0"} >
          <Container margin={Ext.platformTags.phone?"0 auto 10 0":"25 15 15 15"} padding="0 0 10 0" shadow={!Ext.platformTags.phone}  cls="mytitle"  style={{color:"#0ec7c0",backgroundColor:Ext.platformTags.phone?"":"#ffffff",borderRadius:Ext.platformTags.phone?"":"10px"}} docked="top" >
          <Container  hidden={Ext.platformTags.phone} docked="left" width="30"  height="100%"></Container>
           <Container margin={Ext.platformTags.phone?"":"10 0 0"}><h2>{
    (Ext.platformTags.phone?"ــ":"")+
    " آزمون های من "}</h2></Container><Container hidden={Ext.platformTags.phone} style={{color:"#898989",fontSize:"10px"}} padding="0 10">{"در این صفحه می توانید از آخرین وضعیت آزمون های خود مطلع شوید"}</Container> 
    

    <Container  hidden={Ext.platformTags.phone} docked="right" layout="vbox" >
    <Image src={examlogo}   docked="right" width={"100px"}  height="80px"/>
       <Button  text="راهنما" cls="editinfobtn"  handler={()=>this.setState({helpdialog:true,content:""})}  textAlign="center" width="70px" style={{left:"0px", margin:"15px 0 0 0"}}   />
          <Button  text="بازگشت" cls="resentbtn ltr" handler={()=>this.navigate('/')} iconCls="x-fal fa-arrow-left" textAlign="left" width="90px" iconAlign="left"  />
    </Container>
    <Button  text="بازگشت" cls="resentbtn ltr" handler={()=>this.navigate('/')} iconCls="x-fal fa-arrow-left" textAlign="left" width="90px" iconAlign="left" docked="right" hidden={!Ext.platformTags.phone} />
    </Container>
    
 
                   
    <Container style={{ minHeight:Ext.platformTags.phone?"240px": "300px" }} margin="0 10" padding="5 0 0 0">
                   
                  {this.state.exam.map((e,i)=> <Box key={i} parent={this} {...e}/>)}
                     {/* <div>  در حال حاضر آزمون فعالی برای شما تعریف نشده است به اطلاعیه ها مراجعه فرمایید</div> */}
                   </Container>
        
          
        </Container>
        <Image width="100%" src={colorfooter} hidden={!Ext.platformTags.phone}  height="8" docked="bottom" style={{top:"1px"}} />
        {/* <Dialog title="راهنما" centered closable displayed={this.state.helpdialog} modal bodyPadding="5"  width="100%" maxWidth="800px" height="100%" maxHeight="500px" closeAction="hide" onHide={() => this.setState({ helpdialog: false })}>
                    <Video  url={["https://azmoon.andishmand.ir/help.mp4"]} flex={1}              posterUrl={videoplay} />
                </Dialog> */}
        </Container>
        :
        <Container   layout='fit' margin="0" scrollable ref="mainPage" cls='rtl' >
        <Procces parent={this} route={"Login"} />
        <Image width="100%" src={colorfooter} hidden={!Ext.platformTags.phone}  height="10px" docked="bottom"/>
      </Container>}
      {/* <Advertise ref={"advertise"} /> */}
      <Dialog title={this.state.dtitle ||"راهنما"} maximizable={!Ext.platformTags.phone} centered closable displayed={this.state.helpdialog} modal bodyPadding="5"  width="100%" maxWidth="800px" height="100%" maxHeight="500px" closeAction="hide" onHide={() => this.setState({ helpdialog: false ,dtitle:""})}>
       
        <Container hidden={!this.state.dtitle} flex={1} width="100%" height={(content.length==0 && content.indexOf("http")==-1)?"0":"100%"} > 
          <Container hidden={this.state.dtitle=="بودجه بندی" || this.state.dtitle=="کارنامه"} flex={1} margin = "10" width="100%" height="100%"><div dangerouslySetInnerHTML={{ __html: content }}></div></Container>
          <Container height="30" hidden={!Ext.platformTags.phone}>برای بزرگنمایی روی تصویر بزنید</Container>
          <Image src={content.slice(0,4)=="http"? content+"?"+Math.random():""} flex={1}  cls='dialogimg' width="100%" height="100%" onTap={()=>window.location.href=content}></Image>
        </Container>
     
        <Video hidden={content} url={["https://azmoon.andishmand.ir/help.mp4"]} flex={1}              posterUrl={videoplay} />
         </Dialog>
    </Container>
}
}
