import React, { Component } from 'react';
import { Container, Image, SelectField, Button,CheckBoxField, TextField,PasswordField,SegmentedButton,Dialog,Video} from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
import andishmand from '../../Statics/Images/andishmand.png';
import mobileback from '../../Statics/Images/mobileback.png';
import p1 from '../../Statics/Images/p1.jpg';
import p2 from '../../Statics/Images/p2.jpg';
import pm1 from '../../Statics/Images/pm1.jpg';
import pm2 from '../../Statics/Images/pm2.jpg';
import videoplay from '../../Statics/Images/videoplay.jpg';
import colorfooter from  '../../Statics/Images/colorfooter.jpg';
Ext.require([
  'Ext.field.InputMask',
  'Ext.Toast',
]);
export default class Procces extends Component {
componentWillMount() {
  window.socket.on("pass",(_user)=>{
      if(_user) {
        Ext.toast("ثبت نام شما با موفقیت انجام شد، لطفا اطلاعات خود را تکمیل فرمایید");
        this._user = _user;
        this.pather("/")
        setTimeout(window.location.reload(),500)
      }else {
        Ext.toast("رمز عبور صحیح نمی باشد!");
      }
    })  
  }

  state = {...this.props,step:0,helpdialog:false};
  router(route){
    this.setState({ route: "reseter" });
    setTimeout(()=>this.setState({ route }),50)
  }
  reseter=()=> null
  pather=(path)=>this.props.parent.props.history.push(path);
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); query[e[0]] = e[1]; });
    return query;
  }
  phone(){
    if(this.state.sent)  Ext.toast('برای ارسال مجدد باید یک دقیقه صبر نمایید'); else{
      

    if( this.refs.phone ) this.phoneNumber = this.refs.phone.cmp.getValue(); 
    let fnum= ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"]
    for(let ij=0;ij<10;ij++) this.phoneNumber = String(this.phoneNumber).split(fnum[ij]).join(ij)
    this.phoneNumber = this.phoneNumber*1
    window.socket.emit("phone",this.phoneNumber,this.refs.phone?false:true)
    window.socket.on("phone",(sent)=>{
      console.log({sent})
      window.socket.off("phone")
      this.setState({sent})
      if(this.refs.resentbtn) this.refs.resentbtn.cmp.setDisabled(true) 
      this.counter = 60//time to allow resend sms
      if(sent) {
        window.int = setInterval(()=>{
          if(this.refs.resentbtn) 
               this.refs.resentbtn.cmp.setText("جهت ارسال مجدد صبر کنید" +  "   (" + (this.counter--)+")");
               else clearInterval(this.window)
        },1000)
        setTimeout(()=>{
          clearInterval(window.int)
        this.setState({sent:false})
        this.refs.resentbtn.cmp.setText("رمز عبور خود را فراموش کرده اید؟ اینجا را کلیک کنید");
        this.refs.resentbtn.cmp.setDisabled(false) ;
        }, this.counter*1000);
      }
      this.router('Pass')
    })
    }
  }
  Login = () =>  {
    return  <Container><Container cls={Ext.platformTags.phone?"backphone":""} padding={Ext.platformTags.phone? "0 25 60":"20"}  height="100%" width="100%" layout="center" >
      <Container layout="hbox" width="100%" cls="ltr" hidden={!Ext.platformTags.phone}>
      <Button  text="راهنما" docked="left"  handler={()=>this.setState({helpdialog:true})}  textAlign="center" width="70px" />
      </Container>
  
    <Container layout="hbox"  shadow maxWidth="800px"  height="100%" width="100%" maxHeight="500px" cls="x-round" style={{backgroundColor:"#ffffff",padding:"0px"}}  >

      <Container flex={2} layout={{type:"vbox",pack:"start",align:"center"}} style={{margin: Ext.platformTags.phone? "10px 15px 60px":"30px 50px 110px"}}  >
      <Button  text="راهنما"  hidden={Ext.platformTags.phone} cls="resentbtn" handler={()=>this.setState({helpdialog:true})} textAlign="right" width="50px" docked="top"/>

      <Image src={pm1} flex={1}  hidden={!Ext.platformTags.phone} width="140"  style={{margin:"0 auto",backgroundSize:"contain"}} />
       <Image src={andishmand} flex={1}   hidden={Ext.platformTags.phone} width="140"  style={{margin:"0 auto",backgroundSize:"contain"}} />

    <TextField labelAlign="top" width="99%"  style={{border:"solid #c4c4c4 1px", borderRadius:"8px",overflow:"visible"}} textAlign="left" label="لطفاشماره&zwnj;همراه&zwnj;خودرا&zwnj;وارد&zwnj;نمایید"  inputMask="09000000000"  placeholder="09121231212" ref="phone" onAction={this.phone.bind(this)} value={"09"+String(this.phoneNumber).slice(1)||"09*********"} cls="logininput" margin="30 0 15"/>

    <Button  text="ورود به سامانه آزمون آنلاین"  handler={this.phone.bind(this)} width="99%" padding="10 0" margin="auto" cls="loginbtn" />
    {/* <Button {...this.BProps} text="انصراف " iconCls="x-fa fa-ban" handler={()=>this.pather("/")} /> */}
    </Container>
    <Image flex={3} padding="0" src={p1} className="x-zeropading" hidden={Ext.platformTags.phone} margin="0"/>
  </Container>               </Container> <Dialog title="راهنما" closable displayed={this.state.helpdialog} modal bodyPadding="10"  width="100%" centered maxWidth="800px" height="100%" maxHeight="500px" closeAction="hide" onHide={() => this.setState({ helpdialog: false })}>
                    <Video  url={["https://azmoon.andishmand.ir/help.mp4"]} flex={1}              posterUrl={videoplay} />
                </Dialog></Container>
  }
  passcheck(){
    let pass  = this.refs.PasswordField.cmp.getValue() || ""
    let fnum= ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"]
    for(let ij=0;ij<10;ij++) pass = String(pass).split(fnum[ij]).join(ij)
    if(pass) window.socket.emit("pass",pass)
  }

  Pass = () =>  {
   // if(!this.state.user_info) Storer({ user_info: { 0: { _user:1 } } }, this)
    return <Container><Container cls={Ext.platformTags.phone?"backphone":""} padding={Ext.platformTags.phone? "0 25 60":"20"}  height="100%" width="100%" layout="center" >
            <Container layout="hbox" width="100%" cls="ltr" hidden={!Ext.platformTags.phone}>
      <Button  text="راهنما" docked="left"  handler={()=>this.setState({helpdialog:true})}  textAlign="center" width="70px" />
      </Container>
    <Container layout="hbox"  shadow maxWidth="800px"  height="100%" width="100%" maxHeight="500px" cls="x-round" style={{backgroundColor:"#ffffff",padding:"0px"}}>
    <Container flex={2} layout={{type:"vbox",pack:"start",align:"center"}} style={{margin: Ext.platformTags.phone? "10px 15px 40px":"30px 50px 100px"}}  >
      <Container layout="hbox" width="100%">
      <Button  text="راهنما" hidden={Ext.platformTags.phone} cls="resentbtn" handler={()=>this.setState({helpdialog:true})}  textAlign="right" width="50px" docked="left"/>
      <Button  text="بازگشت" cls="resentbtn ltr" handler={()=>this.router('Login')} iconCls="x-fal fa-arrow-left" textAlign="left" width="90px" iconAlign="left" docked="right" />
      </Container>

      <Image src={pm2} flex={1}  hidden={!Ext.platformTags.phone} width="140"  style={{margin:"0 auto",backgroundSize:"cover"}} />
       <Image src={andishmand} flex={1}   hidden={Ext.platformTags.phone} width="140"  style={{margin:"0 auto",backgroundSize:"contain"}} />

     <div className="resentbtn rtl" style={{textAlign:"center",height:"30px"}} margin="20 0" > {this.state.sent ? "رمز برای شما ارسال شد             جهت ورود مجدد آن را بیاد داشته باشید":""}</div>
    <PasswordField labelAlign="top" width="99%"  style={{border:"solid #c4c4c4 1px", borderRadius:"8px",overflow:"visible"}} cls="rtl logininput" textAlign="center" margin="10 0 15" label="رمز عبور" ref="PasswordField" onAction={this.passcheck.bind(this)}   />
    <Button  text="تایید"  handler={this.passcheck.bind(this)} width="99%" padding="10 0" margin="auto" cls="loginbtn" />
    <Button ref="resentbtn" cls="resentbtn" disabled={this.state.sent} text="رمز عبور خود را فراموش کرده اید؟ اینجا را کلیک کنید" handler={this.phone.bind(this)} textAlign="right"/>
    </Container>
    <Image flex={3} padding="0" src={p2} className="x-zeropading" hidden={Ext.platformTags.phone} margin="0"/>
  </Container></Container><Dialog title="راهنما" centered closable displayed={this.state.helpdialog} modal bodyPadding="5"  width="100%" maxWidth="800px" height="100%" maxHeight="500px" closeAction="hide" onHide={() => this.setState({ helpdialog: false })}>
                    <Video  url={["https://azmoon.andishmand.ir/help.mp4"]} flex={1}              posterUrl={videoplay} />
                </Dialog>
</Container>
  }
  getvals(params) {
    let data = {}
      let fnum= ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"]
    for (let i in params) {
      if(params[i]!=true) if(!this.refs[i].cmp.isValid()) {
        return false;
      }
      data[i] =(params[i]==true) ?this.refs[i].cmp.getChecked()==true?1:0 :this.refs[i].cmp.getValue()  
      data[i] = String(data[i]).split("​").join("")

        for(let ij=0;ij<10;ij++) data[i] = String(data[i]).split(fnum[ij]).join(ij)
        if(data[i]=="null") data[i]=''
    }
    return data
  }
  saveinfo() {
     var data = {}
     var newd= {}
     newd = this.getvals({ paye:"",first_name:"",last_name:"",	nationalid:"",_province:"", _province_city:"", school_name:"", moaref_name:"", class_name:""})

     if(!newd) {Ext.toast("اطلاعات وارد شده ناقص و یا دچار اشکال است"); return false}
    Storer("user_", this,{from:"user",paye:newd.paye,name : newd.first_name+" "+newd.last_name} , "update");
    window.userData.name = newd.first_name+" "+newd.last_name
    window.userData.paye = newd.paye
     window.userData.school = newd.school_name
     window.userData._exampid = newd.paye
     data = {...data,...newd,name:newd.first_name+" "+newd.last_name,sex:this.state.user_info[0].sex}
     data.from = "user_info"
    Storer("user_info_", this, data, "update");
    return true;
  }
  Info = () =>  {
    ////window.Header.setState({hidbar:true})
    if(!this.state.user_info){ 
      this.state.sex=undefined
      Storer({ 
      province:{order:"ord",asc:true},
      province_city:{},
      user_info:{}
    }, this); return null} else{
    let user_info =  this.state.user_info.length ?  this.state.user_info[0] :
     { paye:1,sex:0,
       first_name:"",last_name:"",nationalid:"",
       _province:"", _province_city:"", school_name:"",moaref_name:"", class_name:""
    }
    this.state._province = this.state._province  || user_info._province
    let {step} = this.state
    let province_options = []
    this.state.province.map(e=>province_options.push({text:e.name,value:e.id}))
    let province_city_options = []
    this.state.province_city.map(e=>{
      if(this.state._province==e._province)  province_city_options.push({text:e.name,value:e.id})
    })
    this.maxstep = 1
    
    // this.state.sex = user_info.sex //this.state.sex == undefined ? user_info.sex : this.state.sex
    
    return  <Container><Container cls={Ext.platformTags.phone?"backphone":""} padding={Ext.platformTags.phone? "0 0 0":"20"}  height="100%" width="100%" layout="center" >
    <Container layout="hbox" width="100%" cls="ltr" hidden={!Ext.platformTags.phone} height="55px">
<Button  text="راهنما" docked="left"  handler={()=>this.setState({helpdialog:true})}  textAlign="center" width="70px" style={{top:"5px",left:"20px"}}/>
</Container>
<Container   shadow maxWidth="800px" scrollable={Ext.platformTags.phone} height={Ext.platformTags.phone?"calc(100% - 55px)":"100%"} width="100%" maxHeight={Ext.platformTags.phone?"":"500px"} cls="x-round" style={{backgroundColor:"#ffffff",padding:"0px 0px",margin:"auto"}}>
<Container layout={Ext.platformTags.phone?"vbox":"hbox"} >
  
    <Container margin="10 auto 0 0" cls="mytitle" style={{color:"#0ec7c0"}} docked="top"><h2>{
    (Ext.platformTags.phone?"ــ":"ـــــــ")+
    " تکمیل مشخصات فردی"}</h2></Container>
  <Container flex={1} padding="0 20">
      <TextField ref="first_name" validateOnInit="all" {...this.TProps} label="نام"  value={user_info.first_name} required  inputMask= 'اااااااااااااااااا'/>
  <TextField ref="last_name" validateOnInit="all" {...this.TProps} label="نام خانوادگی" value={user_info.last_name} required inputMask= 'اااااااااااااااااا'/>
  <TextField ref="nationalid" validateOnInit="all" {...this.TProps} label="کد ملی" value={user_info.nationalid}  required inputMask= '0000000000'/>
  <SelectField ref="paye" label="پایه تحصیلی" {...this.TProps} value={user_info.paye} picker={"floated"} required options={[
    { text: 'پیش دبستان', value: 0 },
    { text: 'اول', value: 1 },
    { text: 'دوم', value: 2 },
    { text: 'سوم', value: 3 },
    { text: 'چهارم', value: 4 },
    { text: 'پنجم', value: 5 },
    { text: 'ششم', value: 6 },
    { text: 'هفتم', value: 7 },
    { text: 'هشتم', value: 8 },
    { text: 'نهم', value: 9 }
  ]} onChange={(a, b, c) => { 

    this.setState({ paye:b}) }} />
    
    <Container cls="sexitem" >جنسیت</Container><SegmentedButton ref="sex"   {...this.TProps} cls="ltr" value={user_info.sex}  onChange={(a, b, c) => { 
      this.state.user_info[0].sex=b
   // this.setState({ user_info:b})
     }}  padding="5 10" margin="0">
      
      <Button text="دختر" value={0} margin="10" padding="5 0" ui="confirm round"/>
      <Button text="پسر" value={1} margin="10" padding="5 0" ui="confirm round"/>
    </SegmentedButton>

  </Container>
<Container flex={1} padding="0 20" >

   <TextField ref="school_name" validateOnInit="all" {...this.TProps} label="نام مدرسه"  value={user_info.school_name} required  inputMask= 'اااااااااااااااااا'/>
  <TextField ref="class_name" validateOnInit="all" {...this.TProps} label="نام کلاس"  value={user_info.class_name}   inputMask= 'اااااااااااااااااا'/>
     <SelectField ref="_province" label="استان" picker={"floated"} {...this.TProps} value={user_info._province||0} required options={province_options} onChange={(a, b, c) => { 
    this.setState({ _province:b}) }} />
      <SelectField ref="_province_city" label="شهر" picker={"floated"} disabled={!this.state._province} {...this.TProps} value={user_info._province_city||0} required options={province_city_options} onChange={(a, b, c) => { 
    this.setState({ _province_city:b}) }} />
    <TextField ref="moaref_name" validateOnInit="all" {...this.TProps} label="کد معرف"  value={user_info.moaref_name} />
     <Button     style={{backgroundColor:"#39b54a",color:"#ffffff", fontWeight:"100", fontSize:"18px", borderRadius:"8px", margin:"5px auto 15px 20px"}} cls="rtl" padding={"10" } 
    text="تایید و ادامه "   docked="bottom"  handler={()=>{
      if(!this.saveinfo()) return false;
      let msg = " آیا از صحت اطلاعات درج شده اطمینان دارید؟ "
      Ext.Msg.confirm("اخطار",msg,(st)=>{if(st=="yes") {
        Storer("user", this, {mode:2,0:{mode:"<2"}}, "update");
        Ext.toast("اطلاعات شما با موقفیت ثبت شد")
        this.pather('/')
      //  setTimeout(()=>window.socket.emit('refresh'),1000)
      } });
    } }
  />
</Container>
</Container>
<Image width="100%" src={colorfooter}  height="10px" docked="bottom" mode="img"/>
     
          

</Container>     


    </Container><Dialog title="راهنما" closable displayed={this.state.helpdialog} modal bodyPadding="10"  width="100%" centered maxWidth="800px" height="100%" maxHeight="500px" closeAction="hide" onHide={() => this.setState({ helpdialog: false })}>
                    <Video  url={["https://azmoon.andishmand.ir/help.mp4"]} flex={1}              posterUrl={videoplay} />
                </Dialog></Container>
    }
  }

  render = () => {
    return this[this.state.route]();
  }
  MainProps = {
    shadow: true,
    cls: 'rtl x-round',
    scrollable: true,
    padding: Ext.platformTags.phone ? 0 : '5',
    style: {
      width:"100%",
      margin:"auto",
      maxWidth: "600px",
      minWidth: "300px",
      backgroundColor:"#ffffff"
    }
  };
  MainProps2 = {
    cls: 'rtl',
    cls: ' x-round',
    layout: "fit",
    margin: '5',
    scrollable: true,
  };
  TProps = {
    padding:"0",
    style:{
      border:"solid #c4c4c4 1px",
      borderRadius:"8px",
      overflow:"visible",
      padding:"0 10px"
    },
    cls:"rtl logininput",
    textAlign:"center",
    margin:"10 0 15",
    labelAlign:"top",
    labelTextAlign: "right",
  };
  BProps = {
    flex: 1,
    ui: "action round",
    shadow: true,
    margin: '5'
  }
  BProps2 = {
    flex: 1,
    ui: "action round",
    shadow: true,
    margin: 2,
  }
  headstyle={
    color:"#ffffff",
    backgroundColor:"#388E3C",
    fontWeight:"bold",
    fontSize:"16px",
    padding:"10px 0 10px",
    borderRadius:"3px"
  }
}
