import React, { Component } from 'react';
import { Container, Image,SegmentedButton,Button ,RadioField, FormPanel,Dialog, Menu, MenuItem} from '@sencha/ext-modern';
import { MapField, Advertise, Title, CommentsForm } from '../../Componnet/*';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Storer from "../../Store/Storer"
import colorfooter from  '../../Statics/Images/colorfooter.jpg';
import footer_title from '../../Statics/Images/footer_title.png';
//statics
import logo from '../../Statics/Images/abouus2.png';
export default class Exam extends Component {
state={
  endtime:false,
  giude:true,
  questions:[],
  showDialog:false,
  connectionerror:false
}
  navigate = (path) => {
    window.socket.off("end")
    //window.Header.setState({hidbar:false})
    this.props.history.push(path);
}
componentWillUnmount(){
  clearInterval(this.int)
}
  componentWillMount() {
    window.socket.on("disconnect", ()=>{
      this.setState({connectionerror:true})
   
    });
    window.socket.on("connect", ()=>{
      this.setState({connectionerror:false})
    });
    window.socket.on("end", (res)=>{
      window.socket.off("end")
       this.setState({showDialog:true,result:"پاسخ های شما با موفقیت ذخیره شد، می توانید نتیجه اولیه خود را دریافت نمایید"})
    })
    //window.Header.setState({hidbar:true})
    clearInterval(this.int)
    let {id} = this.query();
    Storer({
      description:{from:"exam",ignore:true,cols:"description as text",0:{pid:0,status:1}}
    }, this);
  }
  pay(){
    
    let {_user} = window.userData; 
    console.log(_user)
    window.socket.emit("pay",2700000,window.location.href,_user);
    window.socket.on("paylink",link=>{window.location.href = link});
  }
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
    
    return query;
  }
  timer = (duration)=> {
    let m = Math.floor(duration/60)
    let s = Math.round(duration%60 )
    return  String(m).padStart(2, '0')+ ":"+String(s).padStart(2, '0')
  }
  helplink(){
    window.open("http://azmoon.tarvijequran.ir/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7.pdf","_blank")
  }
  render() {
    let {id} = this.query();
  let gopt=[4,3,2,1]
  let aopt=["د","ج","ب","الف"]
  if(this.state.description.length==0 && this.state.description.count==0) {
  Ext.toast("تا برگزاری دور بعدی آزمون باید صبر کنید جهت دریافت اطلاعات بیشتر به راهنما و اطلاعیه ها مراجعه کنید",3000)
  this.navigate("/")
  return null
  } 
  return <Container padding="0" cls="rtl" layout='fit' cls={Ext.platformTags.phone?"backphone":'backphone2'}  >
      <Container    hidden={!this.state.giude} style={{padding:"0"}} centered style={{padding:"0px",width:"100%", height:Ext.platformTags.phone?"100%":""}} >
<Container scrollable shadow={!Ext.platformTags.phone}   style={{padding:"20px 0 0",fontSize:"18px",lineHeight:"38px",textAlign:"justify" , maxWidth:"800px",width:"100%", backgroundColor:Ext.platformTags.phone?"":"#ffffff"  ,borderRadius:"7px" ,margin:Ext.platformTags.phone?"0":"5px auto",height:Ext.platformTags.phone?"100%":""}}> 
<Container margin={Ext.platformTags.phone?"0 auto 10 0":"0 15 0 15"} padding="0 0 10 0"   cls="rtl"  style={{color:"#0ec7c0",backgroundColor:Ext.platformTags.phone?"":"#ffffff",borderRadius:Ext.platformTags.phone?"":"10px"}} docked="top"  >
        
           <Container margin={Ext.platformTags.phone?"0 10":"10 0 0"}><h2>{
    
    "شروع آزمون"}</h2></Container>
    

    
    <Button  text="بازگشت" docked="right" cls="resentbtn ltr" handler={()=>this.navigate('/')} iconCls="x-fal fa-arrow-left" textAlign="left" width="90px" iconAlign="left" height="25" style={{margin:"auto"}} />    

    </Container>
        <div  className="rtl" style={{padding:"10px", minHeight:"300px"}} dangerouslySetInnerHTML={{
          __html:this.state.description[0]?this.state.description[0].text.split("\n").join("<br/>"):"متن راهنمای ابتدای شروع آزمون"
        }}>
        </div>
        <Container layout={{type:"vbox"}} docked="bottom" width="100%"  >
                  <Button text="شروع"  ui="round" cls="greenback white" height="35" margin="10" width={Ext.platformTags.phone?"":"100%"} maxWidth="450" style={{margin:Ext.platformTags.phone?"10px":"10px auto"}} handler={()=>{
                    window.socket.emit("start",window.userData._user)
                    window.socket.on("start",async (data)=>{
                     window.socket.off("start")
                     let {error,duration,_exam,_exam_user,spent,questions} = data;
                      if(error) return Ext.toast(error,3000);                 
                      this._exam = _exam,this._exam_user=_exam_user
                      this.setState({giude:false,questions,duration:(duration-spent)})
                      clearInterval(this.int)
                      this.int = setInterval(()=>{
                        if(this.state.duration>0) {
                          this.state.duration --;
                          this.refs.header.cmp.setHtml(this.timer(this.state.duration)+" ")
                          if(this.state.duration<600) this.setState({endtime:true})
                        }else {
                          clearInterval(this.int)
                          window.socket.emit("end",this._exam_user)
                        }
                      },1000)
                    })
     
}} />
<Image width="100%" src={colorfooter}   height="8"  style={{top:"1px",backgroundSize:"cover"}} hidden={Ext.platformTags.phone}/>
        </Container>


                   
        </Container>
        <Container docked="bottom" >
        <Image src={footer_title} mode='img' /><Image width="100%" src={colorfooter} hidden={!Ext.platformTags.phone}  height="8"  style={{top:"1px",backgroundSize:"cover"}} /></Container>

      </Container>

      <Container  scrollable  hidden = {this.state.giude} width="100%" height="100%" maxWidth="800" style={{margin:"auto"}} layout="vbox" padding="10">
      <Container cls="rtl" ><Container cls="mytitle" style={{color:"#ffffff",backgroundColor:"#6dcff6", margin:Ext.platformTags.phone?"10px":"10px 30px",textAlign:"center",width:Ext.platformTags.phone? "calc(100% - 20px)":"300px"}} docked="top"  >{ "آزمون آنلاین مسابقه درسهایی از قرآن"}</Container></Container>
     
      <Container  shadow={!Ext.platformTags.phone}   layout={{type:"vbox"}} cls='ltr'  style={{backgroundColor:Ext.platformTags.phone?"":"#fff",borderRadius:Ext.platformTags.phone?"":"7px"}} >
        
{this.state.questions.map((e,i)=><Container  cls='rtl' key={i}   margin="5 0" padding={Ext.platformTags.phone?"10 5":"5 15"} >
<div className='rtl' style={{width:"99%", margin:"5px 2px 10px 0",overflow: "hidden",fontSize:"16px"}} >
<div><span id={"num"+e.number} style={{overflow: "hidden",width: "fit-content",float:"right",margin:"0 0 2px 5px ", padding:"1px",borderRadius:"5px",backgroundColor:"#0072bc",color:"#fff"}}><span style={{    padding:"10px",fontSize:"18px",position: "relative",top:"3px"}}>{e.number}</span></span>{e.text}</div>
<br/>
<div>الف: {e.op1}</div>
<div>ب  : {e.op2}</div>
<div>ج   : {e.op3}</div>
<div>د   : {e.op4}</div>
</div>

  <SegmentedButton width="100%" style={{flexWrap:"wrap-reverse"}} value={e.user_answer ? e.user_answer:null} onChange={(button, value,oldvalue) => {
    
     window.socket.emit("change",{_exam_user: this._exam_user ,number:e.number,user_answer:value||0})
        window.socket.on("change",(p)=>{window.socket.off("change");
        if(value) button.innerItems[gopt[value-1]-1].setIconCls("x-far  fa-dot-circle  x-small")
      })
    if(oldvalue) button.innerItems[gopt[oldvalue-1]-1].setIconCls("x-far fa-circle x-small")
    if(value) button.innerItems[gopt[value-1]-1].setIconCls("x-fas fa-spinner fa-spin x-small")

  }}  cls='ltr'  width="99%"  >
    {gopt.map((c, ii) => <Button key={i+"_"+ii} style={{backgroundColor:"#fefefe",borderRadius:"8px",margin:Ext.platformTags.phone?"0 2px":"0 10px",}} textAlign="center" value={c} ui="confirm" text={aopt[ii]} iconCls={c==e.user_answer?'x-far  fa-dot-circle x-small':"x-far fa-circle x-small"} iconAlign="right"  padding="5" handler={(th)=>{
      if(this.state.questions[i].user_answer == th._value){
        this.state.questions[i].user_answer = 0
        th.setPressed(false)
      } else this.state.questions[i].user_answer = th._value
    }}/>)}
  </SegmentedButton>
<div style={{width:"100%",height:"2px",backgroundColor:"#bebebe", margin:"5px 0 0"}}></div>
     </Container>)}
     <Container height="35" margin="5" width="100%">
            <Button text="ثبت و اتمام آزمون"  ui="round" cls="greenback white" height="35" maxWidth="450" width="100%" centered margin="5"  style={{    overflow: "hidden"}}  handler={()=>{
          Ext.Msg.confirm("تایید","بعد از ثبت اطلاعات اجازه تغییر جواب نخواهید داشت . آیا مایل به اتمام آزمون هستید؟",(st)=>{if(st=="yes") {
            window.socket.emit("end",this._exam_user)
          } });
}} />
     </Container>
 
      </Container>
      <Image src={footer_title} mode='img' />
      </Container>
      <Container  docked={Ext.platformTags.phone?"bottom":""} cls='ltr'   hidden = {this.state.giude} width={Ext.platformTags.phone?"":"90px"}  style={{top:Ext.platformTags.phone?"": "50%",right:Ext.platformTags.phone?"":"calc(50% - 480px)",position:Ext.platformTags.phone?"":"absolute",backgroundColor:this.state.endtime?"#ffd200":'#fff200' ,width:Ext.platformTags.phone?"":"80px",height:Ext.platformTags.phone?"":"90px",border:Ext.platformTags.phone?"":"1px solid #555c07",borderRadius:Ext.platformTags.phone?"":"5px"}}>
        <Container layout={{type:Ext.platformTags.phone?"hbox":"vbox",align:"center"}} cls="rtl timer" style={{margin:"auto"}}>
        
          <Container cls="rtl" html={this.timer(this.state.duration)} ref='header' style={{color:"#555c07",backgroundColor:this.state.endtime?"#ffd200":'#fff200',fontWeight:"bold",fontSize:"23px",textAlign:"center"}} margin="0 0 0"  padding="8" width="80"/>
          <Container style={{color:"#555c07",backgroundColor:this.state.endtime?"#ffd200":'#fff200',fontWeight:Ext.platformTags.phone?"bold":"100",fontSize:Ext.platformTags.phone?"18px":"12px",padding:Ext.platformTags.phone?"":"5px"}}> تا پایان آزمون زمان باقیست</Container>
          </Container>
       
      </Container>
      <Dialog maxWidth="450"  minWidth="280" minHeight="250"  style={{backgroundColor:"#ffffff"}}     displayed={this.state.showDialog} title="تایید ثبت" modal bodyPadding="10"
                >
<div dangerouslySetInnerHTML={{ __html: this.state.result }} style={{textAlign:"center"}}></div>
<Button text="بازگشت"  ui="action round" cls="greenback" height="35"  margin="5" maxWidth="450"  handler={()=>{
  this.setState({showDialog:false})
  setTimeout(()=>this.navigate("/"),1000)
  }}/>
                </Dialog>
                <Dialog title="بررسی ارتباط"  displayed={this.state.connectionerror} modal bodyPadding="10" >
                    <div>اتصال شما با سرور قطع شده است لطفا چند لحظه صبر کنید</div>
                </Dialog>
    </Container>
  }
}
//class="x-no-min-content  x-radiofield x-checkboxfield x-field x-component x-label-align-left x-label-align-horizontal x-body-align-end x-label-text-align-left x-no-label-wrap x-box-labeled x-error-target-qtip x-layout-box-item x-layout-hbox-item x-flexed"