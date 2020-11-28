import React, { Component } from 'react';
import { Container, Image, SelectField, Button,NumberField, TextField,PasswordField,SegmentedButton,Dialog,Video} from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
import andishmand from '../../Statics/Images/andishmand.png';
import mobileback from '../../Statics/Images/mobileback.png';
import p1 from '../../Statics/Images/p1.png';
import p2 from '../../Statics/Images/p2.jpg';
import pm1 from '../../Statics/Images/pm1.jpg';
import pm2 from '../../Statics/Images/pm2.jpg';
import pm3 from '../../Statics/Images/pm3.jpg';
import footer_title from '../../Statics/Images/footer_title.png';
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
    if(this.state.sent) return Ext.toast('برای ارسال مجدد باید یک دقیقه صبر نمایید'); 
    let fnum= ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"]
    for(let ij=0;ij<10;ij++) this.phoneNumber = String(this.phoneNumber).split(fnum[ij]).join(ij)
    for(let ij=0;ij<10;ij++) this.nid = String(this.nid).split(fnum[ij]).join(ij)
    if(this.refs.nid) {
      this.nid = this.refs.nid.cmp.getValue(); 
      this.phoneNumber = this.refs.phone.cmp.getValue(); 
    }
  
    if( !this.nid || this.nid < 9999999 || this.nid > 10000000000 ) return Ext.toast('لطفا شناسه یا کدملی  خود را به طور صحیح وارد نمایید');
    if( !this.phoneNumber || this.phoneNumber<9000000000 || this.phoneNumber>10000000000 ) return Ext.toast('لطفا شماره همراه خود را   وارد نمایید');

    this.phoneNumber = ("00000000000"+ String(this.phoneNumber)).slice(-11)
    this.nid = ("00000000000"+ String(this.nid)).slice(-10)
    console.log(this.nid,this.phoneNumber)
   // this.router('Pass')
   window.socket.emit("phone",this.phoneNumber,this.nid ,this.refs.phone?false:true)
    window.socket.on("phone",(params)=>{
      window.socket.off("phone")
      let {register,error,resend}  = params
      console.log({register,error,resend})
      if(error) return Ext.toast(error)
      this.setState({sent:resend,toreg:register})
      
      if(this.refs.resentbtn) this.refs.resentbtn.cmp.setDisabled(true) 
      this.counter = 60//time to allow resend sms
      if(resend) {

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
      }else this.router('Pass')
    })
    
  }
  helplink(){
    window.open("http://azmoon.tarvijequran.ir/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7.pdf","_blank")
  }
  booklink(){
    window.open("http://azmoon.tarvijequran.ir/%DA%A9%D8%AA%D8%A7%D8%A8%20%D8%A2%D8%B2%D9%85%D9%88%D9%86.pdf","_blank")
  }
  
  Login = () => {
    return <Container cls={Ext.platformTags.phone ? "backphone" : ""} padding={Ext.platformTags.phone ? "0 5 10" : "20"} height="100%" width="100%" layout="center" >

<Container height="100%" layout="vbox" maxWidth="800px" maxHeight={!Ext.platformTags.phone ? "500px" : ""} width="100%" padding="5px" > 


      <Container layout="hbox" shadow={!Ext.platformTags.phone}  flex={1} width="100%"  cls="x-round" style={{ backgroundColor: Ext.platformTags.phone ?' transparent' :"#ffffff", padding: "0px" }}   >
     
          <Container layout={{ type: "hbox", pack: "space-between" }} docked="top" margin="10" >
            <Button text="راهنما" style={{ backgroundColor: "#16b83c",height:"25px" }} cls="resentbtn white" handler={() => this.helplink()} textAlign="center" width="50px" />
            <Button text=" دریافت کتاب آزمون" style={{ backgroundColor: "#16b83c",height:"25px"  }} cls="resentbtn white" handler={() => this.booklink()} textAlign="center" width="120px" />
          </Container>

        <Container flex={2} layout={{ type: "vbox", pack: "start", align: "center" }} style={{ margin: Ext.platformTags.phone ? "10px 15px 30px" : "30px 50px" }}  >


          <Image src={pm1} flex={1} width="140" style={{ margin: "0 auto", backgroundSize: "contain" }} />


          <NumberField maxLength={10} labelAlign="top" width="99%" style={{ border: "solid #c4c4c4 1px", borderRadius: "8px", overflow: "visible" ,padding:0 }} textAlign="center" label="شناسه/کد&zwnj;ملی" placeholder="" ref="nid" onAction={this.phone.bind(this)} value={this.nid} cls="logininput" margin="30 0 10" />
          <NumberField labelAlign="top" width="99%" style={{ border: "solid #c4c4c4 1px", borderRadius: "8px", overflow: "visible" ,padding:0}} textAlign="center" label="شماره&zwnj;همراه" maxLength={11}  placeholder="" ref="phone" onAction={this.phone.bind(this)} value={this.phoneNumber} cls="logininput" margin="5 0 10" />

          <Button text="ادامه" handler={this.phone.bind(this)} width="99%" padding="5 0" margin="auto" cls="loginbtn" />
          <Button text="در صورتی که از اتباع خارجی هستید برای دریافت شناسه اینجا را کلیک کنید " handler={()=>this.router("foreign")} style={{color:"#9fa8af",fontSize:"10px",fontWeight:"100"}}/>
        </Container>
        <Image width="400" padding="0" src={p1} className="x-zeropading" hidden={Ext.platformTags.phone} margin="0" mode='img' />
      </Container>
      <Container margin="0" >
        <Image src={footer_title} mode='img' />
      </Container>
      </Container>
    </Container>
  }
  passcheck(){
    let pass  = this.refs.PasswordField.cmp.getValue() || ""
    let fnum= ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"]
    for(let ij=0;ij<10;ij++) pass = String(pass).split(fnum[ij]).join(ij)
    if(pass) window.socket.emit("pass",pass)
  }
  passsave(){
    let pass  = this.refs.PasswordField.cmp.getValue() || ""
    let pass2  = this.refs.PasswordField2.cmp.getValue() || ""
    let fnum= ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"]
    for(let ij=0;ij<10;ij++) pass = String(pass).split(fnum[ij]).join(ij)
    for(let ij=0;ij<10;ij++) pass2 = String(pass).split(fnum[ij]).join(ij)
    if (!pass ) return Ext.toast("رمز وارد نشده است");
    if (pass.length < 8 ) return Ext.toast("طول رمز از حد مجاز کمتر است")
    if (pass != pass2 ) return Ext.toast("رمز و تکرار آن یکسان نیست")
    window.socket.emit("passsave",pass)
  }
  searchuser(){
    let name  = this.refs.name.cmp.getValue() 
    let father  = this.refs.father.cmp.getValue() 
    if(!name || !father) return Ext.toast('لطفا نام و نام خانوادگی و نام پدر را  به طور صحیح وارد کنید')
    window.socket.emit("searchuser",name, father)
    window.socket.on("searchuser",(user)=>{
      window.socket.off("searchuser")
       let msg = user ? ( "شناسه شما " + user + " می باشد جهت ثبت نام و ورود مجدد آن را به یاد داشته باشید ") :" شناسه ای با این مشخصات یافت نشد لطفا با مروج شهرستان یا استان خود تماس بگیرید "
      Ext.Msg.confirm("شناسه",msg,(st)=>{if(st=="yes" && user) {
        this.router('Login')
      }})
    })
  }
  foreign = () =>  {
    return <Container cls={Ext.platformTags.phone?"backphone":""} padding={Ext.platformTags.phone? "0 5 10":"20"}  height="100%" width="100%" layout="center" >
<Container height="100%" layout="vbox" maxWidth="800px" maxHeight={!Ext.platformTags.phone ? "500px" : ""} width="100%" padding="5px" > 


<Container layout="hbox" shadow={!Ext.platformTags.phone}  flex={1} width="100%"  cls="x-round" style={{ backgroundColor: Ext.platformTags.phone ?' transparent' :"#ffffff", padding: "0px" }}   >

          <Container layout={{ type: "hbox", pack: "space-between" }} docked="top" margin="10" >
            <Button text="راهنما" style={{ backgroundColor: "#16b83c",color:"#fff" ,height:"25px"}} cls="resentbtn white" handler={() => this.helplink()} textAlign="center" width="50px" />
            <Button text="بازگشت" style={{ backgroundColor: "#16b83c" ,color:"#fff",height:"25px" }} cls="resentbtn white ltr" handler={() => this.router('Login')} iconCls="x-fal fa-arrow-left white" textAlign="left" width="90px" iconAlign="left" docked="right" />
          </Container>

          <Container flex={2} layout={{ type: "vbox", pack: "start", align: "center" }} style={{ margin: Ext.platformTags.phone ? "10px 15px 30px" : "30px 50px" }}  >


      <Image src={pm3} flex={1} width="140"  style={{ margin: "0 auto", backgroundSize: "contain" }} />
     
     <div className="resentbtn rtl" style={{color:"#9fa8af",textAlign:"center",height:"30px"}} margin="20 0" > { "جهت دریافت شناسه مشخصات خود را وارد نمایید"}</div>
     <TextField labelAlign="top" width="99%" style={{ border: "solid #c4c4c4 1px", borderRadius: "8px", overflow: "visible" ,padding:0 }} textAlign="center" label="نام&zwnj;ونام&zwnj;خانوادگی"  ref="name" onAction={this.phone.bind(this)} value={this.nid} cls="logininput" margin="30 0 10" />
     <TextField labelAlign="top" width="99%" style={{ border: "solid #c4c4c4 1px", borderRadius: "8px", overflow: "visible" ,padding:0}} textAlign="center" label="نام&zwnj;پدر"  ref="father" onAction={this.phone.bind(this)} value={this.phoneNumber} cls="logininput" margin="5 0 10" />

    <Button  text="جستجوی شناسه"  handler={this.searchuser.bind(this)} width="99%" padding="5 0" margin="auto" cls="loginbtn" />



    </Container>
    <Image width="400" padding="0" src={p1} className="x-zeropading" hidden={Ext.platformTags.phone} margin="0" mode='img' />
      </Container>
      <Container margin="0" >
        <Image src={footer_title} mode='img' />
      </Container>
      </Container>
    </Container>

  }

  Pass = () =>  {
    console.log(this.state.sent)
    return <Container cls={Ext.platformTags.phone?"backphone":""} padding={Ext.platformTags.phone? "0 5 10":"20"}  height="100%" width="100%" layout="center" >
<Container height="100%" layout="vbox" maxWidth="800px" maxHeight={!Ext.platformTags.phone ? "500px" : ""} width="100%" padding="5px" > 


<Container layout="hbox" shadow={!Ext.platformTags.phone}  flex={1} width="100%"  cls="x-round" style={{ backgroundColor: Ext.platformTags.phone ?' transparent' :"#ffffff", padding: "0px" }}   >

          <Container layout={{ type: "hbox", pack: "space-between" }} docked="top" margin="10" >
            <Button text="راهنما" style={{ backgroundColor: "#16b83c",color:"#fff" ,height:"25px"}} cls="resentbtn" handler={() => this.helplink()} textAlign="center" width="50px" />
            <Button text="بازگشت" style={{ backgroundColor: "#16b83c",color:"#fff" ,height:"25px" }} cls="resentbtn ltr" handler={() => this.router('Login')} iconCls="x-fal fa-arrow-left white" textAlign="left" width="90px" iconAlign="left" docked="right" />
          </Container>

          <Container flex={2} layout={{ type: "vbox", pack: "start", align: "center" }} style={{ margin: Ext.platformTags.phone ? "10px 15px 30px" : "30px 50px" }}  >


      <Image src={pm2} flex={1} width="140"  style={{ margin: "0 auto", backgroundSize: "contain" }} />
     
     <div className="resentbtn rtl" style={{color:"#9fa8af",textAlign:"center",height:"30px"}} margin="20 0" hidden={this.state.toreg}> {this.state.sent ? "رمز برای شما ارسال شد             جهت ورود مجدد آن را بیاد داشته باشید":""}</div>
     <div className="resentbtn rtl" style={{color:"#9fa8af",textAlign:"center",height:"30px"}} margin="20 0" hidden={!this.state.toreg}>طول رمز می بایست حد اقل ۸ بوده و شامل اعداد و حروف باشد</div>
    <PasswordField labelAlign="top" width="99%"  style={{border:"solid #c4c4c4 1px", borderRadius:"8px",overflow:"visible",padding:0}} cls="rtl logininput" textAlign="center" margin="10 0" label="رمز عبور" ref="PasswordField" onAction={this.passcheck.bind(this)}   />
    <PasswordField hidden={!this.state.toreg} labelAlign="top" width="99%"  style={{border:"solid #c4c4c4 1px", borderRadius:"8px",overflow:"visible",padding:0}} cls="rtl logininput" textAlign="center" margin="10 0 15" label=" تکرار رمز عبور" ref="PasswordField2" onAction={this.passcheck.bind(this)}   />
    {this.state.toreg ?  <Button  text="ثبت نام"  handler={this.passsave.bind(this)} width="99%" padding="5 0" margin="auto" cls="loginbtn" /> :
    <Button  text= "ورود"   handler={this.passcheck.bind(this)} width="99%" padding="5 0" margin="auto" cls="loginbtn" />}
    <Button hidden={this.state.toreg} disabled={this.state.sent} text="رمز عبور خود را فراموش کرده اید؟ اینجا را کلیک کنید" handler={this.phone.bind(this)} style={{color:"#9fa8af",fontSize:"10px",fontWeight:"100"}} ref="resentbtn" />


    </Container>
    <Image width="400" padding="0" src={p1} className="x-zeropading" hidden={Ext.platformTags.phone} margin="0" mode='img' />
      </Container>
      <Container margin="0" >
        <Image src={footer_title} mode='img' />
      </Container>
      </Container>
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
     newd = this.getvals({ paye:"",_province:"", _province_city:"", school_name:"", birthdate:"", _bank:"", shaba:"",bank_name:""})
     if(!newd) {Ext.toast("اطلاعات وارد شده ناقص و یا دچار اشکال است"); return false}
    window.userData.paye = newd.paye
    window.userData._province = newd._province
     data = {...data,...newd,sex:this.state.user_info[0].sex}
     data.from = "user"
    Storer("user_", this, data, "update");
    return true;
  }
  Info = () =>  {
    ////window.Header.setState({hidbar:true})
    if(!this.state.user_info){ 
      this.state.sex=undefined
      Storer({ 
      user_info:{from:"user"},
       province:{order:"ord",asc:true},
       province_city:{},
      banks:{},
    }, this); return null} else{
    let user_info =  this.state.user_info.length ?  this.state.user_info[0] :
     { paye:1,sex:0,
       name:"",father:"",nid:"",user:"",birthdate:"",shaba:"",
       _province:0, _province_city:"", school_name:"",moaref_name:"", class_name:""
    }
    this.state._province = this.state._province  || user_info._province
    let {step} = this.state
    let banks_options = []
    this.state.banks.map(e=>banks_options.push({text:e.name,value:e.id}))
    let province_options = []
     this.state.province.map(e=>province_options.push({text:e.name,value:e.id}))
     let province_city_options = []
    this.state.province_city.map(e=>{
      if(this.state._province==e._province)  province_city_options.push({text:e.name,value:e.id})
    })
    this.maxstep = 1
    
    // this.state.sex = user_info.sex //this.state.sex == undefined ? user_info.sex : this.state.sex
    
    return  <Container><Container cls={Ext.platformTags.phone?"backphone":""} padding={Ext.platformTags.phone? "0 0 0":"20"}  height="100%" width="100%" layout="center" >
<Container layout={"vbox"} maxWidth="800px" style={{margin:"auto"}} padding={Ext.platformTags.phone?"":"5"} height={"100%"} maxHeight={Ext.platformTags.phone?"":"500px"} scrollable={Ext.platformTags.phone}> 
<Container   shadow     width="100%"  cls={Ext.platformTags.phone?"":"x-round"} style={{backgroundColor:"#ffffff",padding:"0"}}>
  <Container cls="mytitle" style={{color:"#ffffff",backgroundColor:"#6dcff6"}} docked="top">{ " تکمیل اطلاعات حساب کاربری سامانه"}</Container>
<Container layout={Ext.platformTags.phone?"vbox":"hbox"} padding="40 30" >
  
  
  <Container flex={1} padding="0 10">
  <TextField  {...this.TProps} label="نام"  disabled value={user_info.name} /> 
  <TextField   {...this.TProps} label="نام پدر" value={user_info.father} disabled />
  <TextField   {...this.TProps} label="کد ملی" value={user_info.nid}  disabled />
  <TextField   {...this.TProps} label="تلفن همراه" value={user_info.user}  disabled />
  <Container cls="sexitem"  >جنسیت</Container><SegmentedButton ref="sex"   {...this.TProps} cls="ltr" value={user_info.sex}  onChange={(a, b, c) => { 
      this.state.user_info[0].sex=b
   // this.setState({ user_info:b})
     }}  padding="2 10" margin="0 0 20">
      
      <Button text="دختر" value={0} margin="5 10" padding="2 0" ui="confirm round"/>
      <Button text="پسر" value={1} margin="5 10" padding="2 0" ui="confirm round"/>
    </SegmentedButton>








  </Container>
  <Container flex={1} padding="0 10" >
  <SelectField ref="_province" label="استان" picker={"floated"} {...this.TProps} value={user_info._province||0} required options={province_options} onChange={(a, b, c) => {   this.setState({ _province:b}) }} />

      <SelectField ref="_province_city" label="شهر/منطقه" picker={"floated"} disabled={!this.state._province} {...this.TProps} value={user_info._province_city||0} required options={province_city_options} onChange={(a, b, c) => { 
    this.setState({ _province_city:b}) }} />
    <TextField ref="school_name" validateOnInit="all" inputMask= 'اااااااااااااااااا' {...this.TProps} label="نام مدرسه"  value={user_info.school_name}   />


     
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
    { text: 'نهم', value: 9 },
    { text: 'دهم', value: 10 },
    { text: 'یازدهم', value: 11 },
    { text: 'دوازدهم', value: 12 }
  ]} onChange={(a, b, c) => { 

    this.setState({ paye:b}) }} />
  


</Container>
<Container flex={1} padding="0 10" >
<NumberField ref="birthdate" validateOnInit="all" {...this.TProps} label="سال تولد"  value={user_info.birthdate} maxValue={1393} minValue={1300} maxLength={4} required />
     
<SelectField ref="_bank" picker={"floated"}{...this.TProps} label="نام بانک"  value={user_info._bank} options={banks_options} onChange={(a, b, c) => { 

  this.setState({ _bank:b}) }}/>
  <TextField  dir="rtl" ref="shaba" validateOnInit="all"  {...this.TProps2} label="شماره شبا" maxLength={26} value={user_info.shaba} textAlign="left"  validateOnInit="all" inputMask= 'IR000000000000000000000000'/>
 
    <TextField ref="bank_name" validateOnInit="all" inputMask= 'اااااااااااااااااا' {...this.TProps} label="نام صاحب حساب"  value={user_info.bank_name} />

     <Button     style={{backgroundColor:"#39b54a",color:"#ffffff", fontWeight:"100", fontSize:"18px", borderRadius:"8px", margin:"5px auto 15px 20px"}} cls="rtl" padding={"10" } 
    text="تایید و ادامه " width="210"  docked="bottom"  handler={()=>{
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
<Container margin="0" >
        <Image src={footer_title} mode='img' />
      </Container></Container>

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
  TProps2 = {
    padding:"0",
    style:{
      border:"solid #c4c4c4 1px",
      borderRadius:"8px",
      overflow:"visible",
      padding:"0 10px"
    },
    cls:"rtl logininput logininput2",
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
