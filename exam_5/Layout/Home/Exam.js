import React, { Component } from 'react';
import { Container, Image,SegmentedButton,Button ,RadioField, FormPanel,Dialog, Menu, MenuItem} from '@sencha/ext-modern';
import { MapField, Advertise, Title, CommentsForm } from '../../Componnet/*';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Storer from "../../Store/Storer"
//statics
import logo from '../../Statics/Images/abouus2.png';
export default class Exam extends Component {
state={
  darsha:[],
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
       this.setState({showDialog:true,res})
    })
    //window.Header.setState({hidbar:true})
    clearInterval(this.int)
    let {id} = this.query();
    Storer({
      description:{from:"exam",join:"exam.item",ignore:true,cols:"description as text",0:{id:">1"},1:{id}}
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
    return String(m).padStart(2, '0')+ ":"+String(s).padStart(2, '0')
  }
  render() {
    let {id} = this.query();
  let gopt=[1,2,3,4,5,6,7,8]
    return <Container padding="10" cls="rtl" layout='fit'cls={Ext.platformTags.phone?"":'examback'}  >
      {/* <Container docked="top" hidden={!Ext.platformTags.phone} cls=" backphone3 ltr" height="60" >
        <Button  text="راهنما"   handler={()=>this.setState({helpdialog:true,content:""})}  textAlign="center" width="70px" style={{top:"20px" ,left:"20px"}} />
          <Container style={{borderRadius:"10px" ,top:"30px",height:"20px", width:"100%", backgroundColor:"#ffffff"}} ></Container>
        </Container> */}
      <Container  scrollable  hidden={!this.state.giude}>
      <Title text="اطلاعات و راهنمای آزمون " style={{fontSize:"16px"}}  parent={this}/>

        <div  style={{padding:"20px 10px",fontSize:"18px",lineHeight:"38px",textAlign:"justify" , maxWidth:"900px",width:"100%", backgroundColor:"#ffffff" , minHeight:"400px" ,borderRadius:"3px" ,margin:"auto"}} dangerouslySetInnerHTML={{
          __html:this.state.description[0]?this.state.description[0].text.split("\n").join("<br/>"):""
        }}>
        {/* <p>1- بازده زمانی آزمون 12 الی 14 می باشد</p>
        <p>2- لازم به ذکر است آزمون صرفا در زمان ذکر شده فعال می باشد و زودتر یا دیرتر از آن امکان شرکت در آزمون وجود نخواهد داشت.</p>
        <p>3- مدت زمان پاسخگویی شما برای آزمون ، از زمانی که وارد آزمون می شوید 45 دقیقه می باشد.</p>
        <p>4- این آزمون بدون نمره منفی محاسبه خواهد شد.</p>
        <p>5- پس از انتخاب گزینه ها می توانید با کلیک بر روی گزینه های دیگر مجدد آن را تغییر دهید.</p>
        <p>6- از زمان ورود به آزمون تایم شما بالای سوالات نمایش داده می شود.</p>
        <p>7- در صورت خروج از آزمون به هر علتی دوباره می توانید وارد آزمون شوید ولی به هر مدتی که خارج شدید جز زمان آزمون شما در نظر گرفته می شود و زمان آزمون شما متوقف نخواهد شد.</p>
        <p>8- پس از اتمام آزمون نتایج اولیه قابل مشاهده خواهد بود و از ساعت 15به بعد میتوانید کارنامه خود را از همان سامانه دریافت نمایید.</p> */}
        </div>
        <Container layout={{type:"vbox",align:"center"}}  >
                  <Button text="شروع "  ui="action round" cls="greenback" height="35" margin="5" maxWidth="450" width="100%" handler={()=>{
                    window.socket.emit("start",id)
                    window.socket.on("start",async (data)=>{
                      let darsha= []
                      let {status,_exam_user,spent,duration,questions,exam_items} = data;
                      
                      exam_items.map(e=>darsha[e.id]=e.name)
                      console.log({darsha})
                      if(status)    window.socket.off("start")
                      this._exam_user = _exam_user
                      switch(status){
                        case 0 :
                          Ext.toast("آزمون شما شروع شد ");
                          break;
                        case 1 :
                          Ext.toast("می توانید به آزمون خود ادامه دهید"); 
                          break;
                        case 2 :
                          return Ext.toast("شما قبلا به این آزمون پاسخ داده و آزمون شما به اتمام رسیده است");
                          //
                           break;
                        case 3:
                          return   Ext.toast("آزمون شما به طور کامل به اتمام رسیده و اکنون می توانید کارنامه خود را دریافت نمایید");
                          break;
                        case 4:
                          return Ext.toast("زمان مجاز برای شرکت در آزمون به اتمام رسیده است ");
                        //  this.navigate("/")
                          break;
                          case 5:
                         return   Ext.toast("شما در این آزمون ثبت نام نکرده اید");
                          //  this.navigate("/")
                            break;
                      }
                     
                     
                      this.setState({giude:false,questions,duration:(duration-spent)*60,darsha})
                      clearInterval(this.int)
                      this.int = setInterval(()=>{
                        if(this.state.duration>0) {
                          this.state.duration --;
                          this.refs.header.cmp.setHtml('زمان باقیمانده :'+ this.timer(this.state.duration))
                          if(this.state.duration<600) this.setState({endtime:true})
                        }else {
                          clearInterval(this.int)
                          window.socket.emit("end",this._exam_user)
                        }
                      },1000)
                    })
     
}} />
      <Button text="بازگشت"  ui="action round" cls="greenback" height="35"  margin="5" maxWidth="450"  handler={()=>{
this.navigate("/")
}} />
        </Container>

      </Container>
      <Container  docked="top" cls='backphone3 ltr'   hidden = {this.state.giude}   style={{backgroundColor:this.state.endtime?'#F06292':"#4993ed"}}>
        <Container  layout={{type:'hbox',pack:Ext.platformTags.phone?"end":"center",align:"center"}} style={{color:"#ffffff", textAlign:"center"}} >
          <Container cls="rtl" html={'زمان باقیمانده :'+ this.timer(this.state.duration) } ref='header' style={{color:"#ffffff",backgroundColor:this.state.endtime?'#F06292':"#4993ed"}} margin="12 0 0"  padding="8"/>
      <Button  text='درس ها' ui='alt' cls='rtl' shadow={false}  style={{top:"15px" ,left:"15px", position:"absolute", zindex:20}} docked="left"><Menu indented={false}>
            {this.state.darsha.map((e,i)=><MenuItem key={"d"+i} text={e} handler={()=>{
              window.location.hash="dars"+i
              setTimeout(()=>window.location.hash='',100)
            }
            }/>)} 
      </Menu></Button></Container>
      {/* <Container  style={{borderRadius:"10px" ,top:"15px",height:"20px", width:"100%", backgroundColor:"#ffffff"}} hidden={!Ext.platformTags.phone}></Container> */}
      </Container>
      <Container scrollable margin="0" layout={{type:"vbox",align:"center"}} cls='ltr' hidden = {this.state.giude}                >
        
{this.state.questions.map((e,i)=><Container  maxWidth="450" cls='rtl' key={i}  style={{backgroundColor:"#5674b9",borderRadius:"10px"}} margin="5 0" padding="5"><span id={"num"+e.number} style={{    overflow: "hidden",
width: "fit-content",float:"left",margin:"0 0 2px 5px ", padding:"1px",borderRadius:"10px",backgroundColor:"#00aeef",color:"#fff"}}><span style={{    padding:"10px",fontSize:"18px",position: "relative",top:"3px"}}>{e.number}</span> <span style={{float:"left",margin:"0 auto", padding:"5px 5px",backgroundColor:"#fff",color:"#00aeef",height:"100%"}} id={'dars'+e._exam_item}>{this.state.darsha[e._exam_item]}</span></span>
<div style={{borderRadius:"10px",backgroundColor:"#ffffff",width:"99%", margin:"5px 2px 5px 0",minHeight:"500px",overflow: "hidden"}} >
  <LazyLoadImage src={"https://azmoon.madrese.net"+e.file}     style={{ margin:"5px",padding:"0px",minHeight:"32px",minWidth:"54px" ,maxWidth:"100%"}} effect="blur" alt={"درحال بارگزاری"} wrapperClassName="place" delayTime={800} placeholderSrc={"https://azmoon.madrese.net/loading.gif"}/> 
</div>

  <SegmentedButton value={e.user_answer ? e.user_answer:null} onChange={(button, value,oldvalue) => {
    
     window.socket.emit("change",{_exam_user: this._exam_user ,number:e.number,user_answer:value||0})
        window.socket.on("change",(p)=>{window.socket.off("change");
        if(value) button.innerItems[value-1].setIconCls("x-far  fa-dot-circle  x-small")
      })
    if(oldvalue) button.innerItems[oldvalue-1].setIconCls("x-far fa-circle x-small")
    if(value) button.innerItems[value-1].setIconCls("x-fas fa-spinner fa-spin x-small")

  }}  cls='ltr' maxWidth="450" width="99%"  >
    {gopt.slice(0, e.options).map((c, ii) => <Button key={i+"_"+ii} style={{backgroundColor:"#fefefe",borderRadius:"8px"}} value={c} ui="confirm" text={c} iconCls={c==e.user_answer?'x-far  fa-dot-circle x-small':"x-far fa-circle x-small"} iconAlign="left" textAlign="left" margin="0 5" padding="0" handler={(th)=>{
      if(this.state.questions[i].user_answer == th._value){
        this.state.questions[i].user_answer = 0
        th.setPressed(false)
      } else this.state.questions[i].user_answer = th._value
    }}/>)}
  </SegmentedButton>
     </Container>)}
      <Button text="ثبت و اتمام آزمون"  ui="action round" cls="greenback" height="35"  margin="5" maxWidth="450" style={{    overflow: "hidden"}}  handler={()=>{
          Ext.Msg.confirm("تایید","بعد از ثبت اطلاعات اجازه تغییر جواب نخواهید داشت . آیا مایل به اتمام آزمون هستید؟",(st)=>{if(st=="yes") {
            window.socket.emit("end",this._exam_user)
          } });
}} />
      </Container>
      <Dialog maxWidth="450"  minWidth="280" minHeight="250"  style={{backgroundColor:"#ffffff"}}     displayed={this.state.showDialog} title="نتایج اولیه" modal bodyPadding="10"
                >
<div dangerouslySetInnerHTML={{ __html: this.state.res }}></div>
<Button text="بازگشت"  ui="action round" cls="greenback" height="35"  margin="5" maxWidth="450"  handler={()=>{
  this.setState({showDialog:false})
  setTimeout(()=>this.navigate("/"),1000)
  }}/>
                </Dialog>
                <Dialog title="خطای ارتباط سرور"  displayed={this.state.connectionerror} modal bodyPadding="10" >
                    <div>اتصال شما با سرور قطع شده است لطفا چند لحظه صبر کنید</div>
                </Dialog>
    </Container>
  }
}
//class="x-no-min-content  x-radiofield x-checkboxfield x-field x-component x-label-align-left x-label-align-horizontal x-body-align-end x-label-text-align-left x-no-label-wrap x-box-labeled x-error-target-qtip x-layout-box-item x-layout-hbox-item x-flexed"