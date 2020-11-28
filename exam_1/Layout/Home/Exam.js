import React, { Component } from 'react';
import { Container, Image,SegmentedButton,Button ,RadioField, FormPanel,Dialog} from '@sencha/ext-modern';
import { MapField, Advertise, Title, CommentsForm } from '../../Componnet/*';
import Storer from "../../Store/Storer"
//statics
import logo from '../../Statics/Images/abouus2.png';
export default class Exam extends Component {
state={
  giude:true,
  questions:[],
  showDialog:false
}
  navigate = (path) => {
    window.socket.off("end")
    window.Header.setState({hidbar:false})
    this.props.history.push(path);
}

  componentWillMount() {
    window.socket.on("end", (res)=>{
      window.socket.off("end")
       this.setState({showDialog:true,res})
    })
    window.Header.setState({hidbar:true})
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
    return <Container padding="10" cls="rtl" layout='fit' >
      <Container  scrollable  hidden={!this.state.giude}>
      <Title text="اطلاعات و راهنمای آزمون " style={{fontSize:"16px"}}  parent={this}/>

        <div  style={{padding:"0 10px",fontSize:"18px",lineHeight:"24px",textAlign:"justify" ,backgroundColor:"#ffffff" , borderRadius:"3px"}} dangerouslySetInnerHTML={{
          __html:this.state.description[0]?this.state.description[0].text:""
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
                      
                      let {status,_exam_user,spent,duration,questions} = data;
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
                     
                     
                      this.setState({giude:false,questions,duration:(duration-spent)*60})
                      this.int = setInterval(()=>{
                        if(this.state.duration>0) {
                          this.state.duration --;
                          this.refs.header.cmp.setHtml('زمان باقیمانده :'+ this.timer(this.state.duration))
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
      <Container docked="top"  hidden = {this.state.giude} ref='header' html={'زمان باقیمانده :'+ this.timer(this.state.duration)} style={{backgroundColor:"#4993ed",color:"#ffffff", textAlign:"center" , padding:"3px"}}></Container>
      <Container scrollable layout={{type:"vbox",align:"center"}} cls='ltr' hidden = {this.state.giude}                >
        
{this.state.questions.map((e,i)=><Container  maxWidth="450" cls='rtl' key={i} ><div id={"qu"+e.number}>سوال شماره {e.number}:</div><Image src={"https://azmoon.madrese.net"+e.file} mode='img' width="98%" padding="0" margin="auto" minHeight="500"/> 
<FormPanel maxWidth="450" cls="rtl" layout={{type: 'hbox', align:"stretch"}} width="97%" padding="0" margin="0" style={{backgroundColor:"transparent !important"}}>
{gopt.slice(0,e.options).map((c,ii)=><RadioField cls="x-center"  flex={1} name= {'radio'+e} key={i*1+ii} boxLabel={c} checked={c==e.user_answer?true:false}  Width="100%" ripple={false} margin="0 5px" style={{fontSize:"18px" ,backgroundColor:"#ffffff" ,borderRadius:"5px"}} onFocus={(th)=>{th.blur();if(th.getChecked()) setTimeout(()=>{
  th.setChecked(false)
  window.socket.emit("change",{_exam_user: this._exam_user ,number:e.number,user_answer:0})
  Ext.toast("جواب شما ثبت شد")
},100)}}      onCheck={(th)=>{
  window.socket.emit("change",{_exam_user: this._exam_user ,number:e.number,user_answer:c})
  Ext.toast("جواب شما ثبت شد")
}}/>)}

        </FormPanel>
      
   <hr/>  </Container>)}
      <Button text="ثبت و اتمام آزمون"  ui="action round" cls="greenback" height="35"  margin="5" maxWidth="450"  handler={()=>{
          Ext.Msg.confirm("تایید","بعد از ثبت اطلاعات اجازه تغییر جواب نخواهید داشت . آیا مایل به اتمام آزمون هستید؟",(st)=>{if(st=="yes") {
            window.socket.emit("end",this._exam_user)
          } });
        

//this.navigate("/")
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
    </Container>
  }
}
//class="x-no-min-content  x-radiofield x-checkboxfield x-field x-component x-label-align-left x-label-align-horizontal x-body-align-end x-label-text-align-left x-no-label-wrap x-box-labeled x-error-target-qtip x-layout-box-item x-layout-hbox-item x-flexed"