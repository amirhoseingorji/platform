import React, { Component } from 'react';
import { Container, Image, SelectField, Button,CheckBoxField, TextField, FileField,PasswordField, NumberField,TextAreaField, Grid, Column,RowNumberer, GridCell, TitleBar ,SegmentedButton,Toolbar,Panel,Indicator} from '@sencha/ext-modern';
import { MapField, Vitrin, Title,Icon,ShopButton} from '../../Componnet/*';
import Storer from "../../Store/Storer";
import imageCompression from 'browser-image-compression';
import moment from 'moment-jalaali'
moment.loadPersian({usePersianDigits: false})
import DatePicker from 'react-datepicker2';
import 'react-datepicker2/src/style.min.css';
Ext.require([
  'Ext.field.InputMask',
  'Ext.Toast',
  'Ext.grid.plugin.PagingToolbar',
  'Ext.grid.plugin.SummaryRow',
  'Ext.data.summary.Average',
  'Ext.data.summary.Max',
  'Ext.data.summary.Sum',
]);
//statics
import logo from '../../Statics/Images/minilogo.png';
// import { Font } from 'three';
export default class Procces extends Component {
  
 // state = {sent:false,print:false,step:0}
 async uploader(th,fileref){
  this.state.fileref = fileref
  var file    = th.el.dom.querySelector('input[type=file]').files[0]
  if (!file || this.cufileupload == file)  return false
  console.log(file)
  this.cufileupload = file;
   const imageFile = this.cufileupload       
   var options = {
     maxSizeMB: 1,
     maxWidthOrHeight: 1920,
     useWebWorker: true,
     onProgress : ()=>{}
   }
  file = await imageCompression(imageFile, options);
  this.reader.readAsDataURL(file);
  
}
componentWillMount() {
  window.toast= (a)=>{
    Ext.toast(a)
  }
  this.imagereader = 0
  this.reader = new FileReader();
  let chunkSize = 1024 * 1024*100
  window.socket.off("uploadchuk");
  window.socket.on("uploadchuk", (part) => {
      var myreader = this.imagereader || this.reader
      let percent = Math.floor(100 * part * chunkSize / myreader.result.length)
      socket.emit('uploadchuk', {
          name: this.cufileupload.name,
          type: this.cufileupload.type,
          size: this.cufileupload.size,
          part,
          percent,
          data: myreader.result.slice(part * chunkSize, (part + 1) * chunkSize)
      });
  })
  window.socket.off("uploadComplete");
  window.socket.on("uploadComplete", (data) => {
    console.log(data)
      this.imagereader = 0
      let user_info = this.state.user_info
      user_info[0][this.state.fileref] = data
      this.setState(user_info)
  })
  this.reader.removeEventListener('load',()=>{},true);
  this.reader.addEventListener("load", () => {
      var part = 0
      let percent = 0
      socket.emit('uploadchuk', {
          name:  this.cufileupload.name,
          type: this.cufileupload.type,
          size: this.cufileupload.size,
          part,
          percent,
          data: this.reader.result.slice(part * chunkSize, (part + 1) * chunkSize)
      });
  }, false);
  window.socket.on("progress", (progress)=>{
         // this.setState({progress,showprogress:progress==100?false:true});
      })
  window.socket.on("pass",(_user)=>{
      if(_user) {
        Ext.toast("ثبت نام شما با موفقیت انجام شد، لطفا اطلاعات خود را تکمیل فرمایید");
        this._user = _user;
        this.pather("/")
        setTimeout(window.location.reload(),500)
        
      }else {
        this.router("Login");
        Ext.toast("رمز عبور صحیح نمی باشد!");
      }
    })  
  }

  state = {...this.props,step:0};
  router(route){
    this.setState({ route: "reseter" });
    setTimeout(()=>this.setState({ route }),50)
  }
  reseter(){return null}
  pather = (path) => {
    this.props.parent.props.history.push(path);
  }
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); query[e[0]] = e[1]; });
    return query;
  }


  Help = () => {
    if(!this.state.user_info) {Storer({ user_info: {} }, this); return null} else
    return <Container {...this.MainProps}>
      <Title icon='ambulance' text="امداد خودرو" />
      <Container layout={{ type: 'hbox', pack: 'space-around' }} width="100%">
         <Image src={logo} mode="img" height="90" docked="right" />
         <Container layout="center" flex="1">
          لطفاابتدا شماره تلفن   همراه خودو توضیحات ضروری را وارد نمایید تا در اولین فرصت با شما تماس بگیریم
      </Container>
       
      </Container>
      <TextField {...this.TProps} placeholder="09123456789" style={{ direction: 'ltr' }} value={this.state.user_info.tel || ""} />
      <TextAreaField {...this.TProps} placeholder="توضیحات ضروری" required height="90" />
      <Button {...this.BProps} text="ثبت آدرس" iconCls="x-fa fa-map-marker" handler={() => this.router('Address')} />
    </Container>
  }
  phone(){
    if(this.state.sent)  Ext.toast('برای ارسال مجدد باید یک دقیقه صبر نمایید'); else{
    if( this.refs.phone ) this.phoneNumber = this.refs.phone.cmp.getValue(); 
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
               this.refs.resentbtn.cmp.setText("ارسال مجدد/فراموشی رمز" +  "   (" + (this.counter--)+")");
               else clearInterval(this.window)
        },1000)
        setTimeout(()=>{
          clearInterval(window.int)
        this.setState({sent:false})
        this.refs.resentbtn.cmp.setText("ارسال مجدد/فراموشی رمز");
        this.refs.resentbtn.cmp.setDisabled(false) ;
        }, this.counter*1000);
      }
      this.router('Pass')
    })
    }
  }
  Login = () =>  {
    return  <Container padding="7"><Image src='https://chamran.sitenevis.com/logo.png' mode='img' width="180" style={{margin:"auto"}} />
    <center > سامانه مدیریت چمرانی ها  </center><br/><Container {...this.MainProps}  >
    <Title icon='sign-in' text="ورود به سیستم مدیریت" home={false}/>
    <Container layout={{ type: 'hbox', pack: 'space-around' }} padding="20">
      {/* <Image src={logo} mode="img" height="30" /> */}
      <Container layout="center" flex="1" padding="0 10">
      لطفا نام کاربری و رمز عبور خود را وارد فرمایید
      </Container>
    </Container>
    <TextField {...this.TProps} label="نام کاربر" placeholder="90123456789" ref="phone" onAction={this.fastlogin.bind(this)} value={this.phoneNumber||""}/>
    <PasswordField {...this.TProps} label="رمز عبور" ref="PasswordField" onAction={this.fastlogin.bind(this)} />
<br/>
    <Button {...this.BProps} text="ورود" iconCls="x-fa fa-key" handler={this.fastlogin.bind(this)} width="99%" margin="auto" />
    <br/>
    {/* <Button {...this.BProps} text="انصراف " iconCls="x-fa fa-ban" handler={()=>this.pather("/")} /> */}
  </Container></Container>
  }
  fastlogin(){

      let username = this.refs.phone.cmp.getValue() || ""
      let password = this.refs.PasswordField.cmp.getValue() || ""
      window.socket.emit("fastlogin",username,password)
      //this.navigate("/");
  }
  passcheck(){
    let pass  = this.refs.PasswordField.cmp.getValue() || ""
    if(pass) window.socket.emit("pass",pass)
  }

  Pass = () =>  {
   // if(!this.state.user_info) Storer({ user_info: { 0: { _user:1 } } }, this)
    return <Container padding="7"><Image src='https://chamran.sitenevis.com/logo.png' mode='img' width="180" style={{margin:"auto"}} />
    <center > سامانه مدیریت چمرانی ها  </center><br/><Container {...this.MainProps}>
    <Title icon='key' text="رمز عبور" home={false}/>
    <Container layout={{ type: 'hbox', pack: 'space-around' }} width="100%">
      {/* <Image src={logo} mode="img" height="30" /> */}
      <Container layout="center" flex="1" key={Math.random()*100}>
      {this.state.sent && <div> {"رمز برای شما ارسال شد ، جهت ورود مجدد آن را بیاد داشته باشید"}</div>}
       <div>{"لطفا رمز عبور خود را وارد فرمایید"}</div>
      </Container>
    </Container>
    <PasswordField {...this.TProps} label="رمز عبور" ref="PasswordField" onAction={this.passcheck.bind(this)} />
    <Button {...this.BProps} text="تایید " iconCls="x-fa fa-check-circle" handler={this.passcheck.bind(this)} width="95%"/>
    <Button ref="resentbtn" {...this.BProps} disabled={this.state.sent} text="ارسال مجدد/فراموشی رمز" iconCls="x-fa fa-refresh" handler={this.phone.bind(this)} width="95%"/>
    <Button {...this.BProps} text="انصراف " iconCls="x-fa fa-ban" handler={()=>this.router('Login')} width="95%"/>
  </Container></Container>
  }
  getvals(params) {
    let data = {}
    for (let i in params) {
      if(params[i]!=true) if(!this.refs[i].cmp.isValid()) {
        console.log(i)
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
    // let data = this.getvals({ paye:"",mode:"",
    //     first_name:"",last_name:"",	nationalid:"",
    //    preSchool:"",preRegion:"",	preCity:"",preType:"",
    //    father_name :"",father_last_name :"",father_ID:"",father_degree:"",father_job:"",father_mobile:"",	father_tel:"",
    //    mother_name :"",mother_last_name :"",mother_ID:"",mother_degree:"",mother_job:"",mother_mobile:"",	mother_tel:"",
    //    family_type:"",family_num:"", home_address:"", home_tel:"", rabet_tel:"",
    //     service:true, afterschool:true, boofeh:true,
    //  })
     
     var data = {}
     data.birthdate=this.state.birthdate
     var {idcart,fatheridcart,motheridcart,shenas,fathershenas,mothershenas,vaksan} = this.state.user_info[0]
     var newd= {}
     console.log(this.state.step)
     switch(this.state.step){
       case 0 :
        newd = this.getvals({ paye:"",mode:""})
        Storer("user_", this,{from:"user",paye:newd.paye,school:newd.mode} , "update");
        break;
       case 1:
        newd = this.getvals({  first_name:"",last_name:"",	nationalid:""})
          if(!newd) {Ext.toast("اطلاعات وارد شده ناقص و یا دچار اشکال است"); return false}
       //  if(!idcart || !shenas ) {Ext.toast("مدارک آپلود نشده است");return false}
     //    if(data.paye*1==0 && !vaksan ) {Ext.toast("مدارک آپلود نشده است");return false}
         break;
         case 2:
          newd = this.getvals({  preSchool:"",preRegion:"",	preCity:"",preType:""})
          if(!newd) {Ext.toast("اطلاعات وارد شده ناقص و یا دچار اشکال است"); return false}
           break;
        case 3:
          newd = this.getvals({         father_name :"",father_last_name :"",father_ID:"",father_degree:"",father_job:"",father_mobile:"",	father_tel:"" })
          if(!newd) {Ext.toast("اطلاعات وارد شده ناقص و یا دچار اشکال است"); return false}
       //   if(!fatheridcart || !fathershenas ) {Ext.toast("مدارک آپلود نشده است");return false}
           break;
           case 4:
            newd = this.getvals({         mother_name :"",mother_last_name :"",mother_ID:"",mother_degree:"",mother_job:"",mother_mobile:"",	mother_tel:""    })
            if(!newd) {Ext.toast("اطلاعات وارد شده ناقص و یا دچار اشکال است"); return false}
          //  if(!motheridcart || !mothershenas ) {Ext.toast("مدارک آپلود نشده است");return false}
             break;
             case 5:
              newd = this.getvals({  family_type:"",family_num:"", home_address:"", home_tel:"", rabet_tel:""})
              if(!newd) {Ext.toast("اطلاعات وارد شده ناقص و یا دچار اشکال است"); return false}
               break;
            case 6:
              newd = this.getvals({  service:true, afterschool:true, boofeh:true})
     }
     data = {...data,...newd}
     data.from = "user_info"
     data = {...data,idcart,fatheridcart,motheridcart,shenas,fathershenas,mothershenas,vaksan}
    // console.log(data)
    Storer("user_info_", this, data, "update");
    return true;
    
  }

  Info = () =>  {
    if(!this.state.user_info){ Storer({ user_info:{}}, this); return null} else{
     // console.log(this.state.user_info[0])
    let user_info =  this.state.user_info.length ?  this.state.user_info[0] :
     { paye:1,mode:0,
       first_name:"",last_name:"",	birthdate:"",nationalid:"",
      preSchool:"",preRegion:"",	preCity:"",preType:0,
      father_name :"",father_last_name :"",father_ID:"",father_degree:3,father_job:"",father_mobile:"",	father_tel:"",
      mother_name :"",mother_last_name :"",mother_ID:"",mother_degree:3,mother_job:"",mother_mobile:"",	mother_tel:"",
      family_type:1,family_num:3, home_address:"", home_tel:"", rabet_tel:"",
       service:1, afterschool:1, boofeh:1,
       idcart:"",fatheridcart:"",motheridcart:"",shenas:"",fathershenas:"",mothershenas:"",vaksan:""
    }

    let {step} = this.state
    this.maxstep = 7
    let paye= this.refs.paye ? this.refs.paye.cmp.getValue() : user_info.paye 
    if(user_info.birthdate == "0000-00-00 00:00:00" || user_info.birthdate == "") user_info.birthdate = new Date().setFullYear(new Date().getFullYear() - paye-4)
let birthdate = this.state.birthdate || moment( user_info.birthdate )
    let unviewmahd = this.state.unviewmahd 
    if(paye>0) unviewmahd = true

    return <Container {...this.MainProps} height="calc(100% - 30px)" layout="vbox">
    <Panel  activeItem={step} layout="card" flex={1} >

        <Container scrollable width="95%">
          <Container layout={{ type: 'hbox', pack: 'space-around'  }} width="100%" style={this.headstyle}>{" پایه تحصیلی و مدرسه "}</Container>
          <SelectField ref="paye" label="پایه تحصیلی" {...this.TProps} value={user_info.paye} options={[
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
            this.refs.mode.cmp.setValue(b>6?3:Math.min(2,this.refs.mode.cmp.getValue()))
            this.setState({ level: b > 6, unviewmahd: b > 0 ,paye:b}) }} />
          <SelectField ref="mode" label="مدرسه" {...this.TProps} value={user_info.mode} options={!this.state.level ? [
            { text: 'دبستان دخترانه مبتکر اندیشمند', value: 1 },
            { text: 'دبستان پسرانه بهشت فردوس', value: 2 },] : [
              { text: 'دبیرستان دخترانه مبتکر اندیشمند', value: 3 }
            ]} />
        </Container>
        <Container scrollable>
          <Container layout={{ type: 'hbox', pack: 'space-around' }} width="100%" style={this.headstyle}>{" مشخصات دانش آموز"}</Container>
          <TextField ref="first_name" validateOnInit="all" {...this.TProps} label="نام"  value={user_info.first_name} required  inputMask= 'اااااااااااااااااا'/>
          <TextField ref="last_name" validateOnInit="all" {...this.TProps} label="نام خانوادگی" value={user_info.last_name} required inputMask= 'اااااااااااااااااا'/>
          {/* <TextField ref="birthdate" {...this.TProps} label="تاریخ تولد" birthdate ? moment(user_info.birthdate).format("jYYYY/jM/jD"):""} /> */}
         
          <TextField ref="nationalid" validateOnInit="all" {...this.TProps} label="کد ملی" value={user_info.nationalid} required inputMask= '0000000000'/>
                 <div>
            <span style={{color:"rgba(17, 17, 17, 0.54)",padding:"10px 15px 0"}}>
            تاریخ تولد
            </span>
         
            <DatePicker ref="birthdate"  timePicker={false} format='jYYYY/jM/jD' 
            
            value={birthdate || moment()}
            onChange={birthdate => {
              if(this.state.user_info.length) this.setState({ birthdate });
            }}
             isGregorian={false}   width="100%" placeholder="تاریخ تولد"/>
            <hr/>
          </div>
          
          <Container layout="hbox">
   
            {user_info.idcart && <Image src={user_info.idcart+"?"+Math.random()} mode='img' docked='left' width="90" height="120"/>}
            <FileField flex={1}  ref="idcart" value={user_info.idcart}  {...this.TProps} label= "عکس پرسنلی" placeholder="انتخاب فایل" onChange={(a)=>this.uploader(a,"idcart")} />
          </Container>
          <Container layout="hbox">
            {user_info.shenas && <Image src={user_info.shenas+"?"+Math.random()} mode='img' docked='left' width="90" height="70"/>}
            <FileField flex={1} ref="shenas" value={user_info.shenas} {...this.TProps} label= "صفحه اول شناسنامه" placeholder="انتخاب فایل" onChange={(a)=>this.uploader(a,"shenas")} />
          </Container>
          <Container layout="hbox">
           {user_info.vaksan && <Image src={user_info.vaksan+"?"+Math.random()} mode='img' docked='left' width="90" height="70"/>}
            <FileField flex={1} ref="vaksan" value={user_info.vaksan}  hidden={unviewmahd} {...this.TProps} label= "کارت واکسیناسیون" placeholder="انتخاب فایل" onChange={(a)=>this.uploader(a,"vaksan")} />
          </Container>
        </Container>
 
        <Container scrollable>
          <Container  layout={{ type: 'hbox', pack: 'space-around' }} width="100%" style={this.headstyle}>{" مشخصات مرکز آموزشی قبلی "}</Container>
          <CheckBoxField {...this.TProps} style={{direction:"ltr"}} height="35" hidden={unviewmahd} boxLabel="آیا دوره مهدکودک را گذرانده است؟" checked onChange={(a,b,c)=>{this.setState({nopre:!b})}}/>

          <TextField validateOnInit={this.state.nopre?"none":"all"} hidden={this.state.nopre} ref="preSchool" {...this.TProps} required label={unviewmahd?"نام مدرسه قبلی":"نام مهدکودک"} inputMask= 'اااااااااااااااااا' value={user_info.preSchool}  />
          <TextField validateOnInit={this.state.nopre?"none":"all"}  hidden={this.state.nopre} ref="preCity" {...this.TProps} required label={"شهر"} value={user_info.preCity} inputMask= 'اااااااااااااااااا' />
          <TextField validateOnInit={this.state.nopre?"none":"all"}  hidden={this.state.nopre} ref="preRegion" {...this.TProps} required label={"منطقه"} value={user_info.preRegion} inputMask= '۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰' />
          <SelectField validateOnInit={this.state.nopre?"none":"all"}  hidden={!unviewmahd || this.state.nopre} ref="preType" label="نوع مرکز" {...this.TProps} value={user_info.preType} options={[
            { text: 'دولتی', value: 0 },
            { text: 'غیر دولتی', value: 1 },
            { text: 'شاهد', value: 2 },
            { text: 'هیات امنایی', value: 3 }
          ]} />
        </Container>
        
        <Container scrollable>
          <Container layout={{ type: 'hbox', pack: 'space-around' }} width="100%" style={this.headstyle}>{"مشخصات پدر دانش آموز"}</Container>
          <TextField ref="father_name" validateOnInit="all" {...this.TProps} label="نام" value={user_info.father_name} required inputMask= 'اااااااااااااااااا'/>
          <TextField validateOnInit="all" ref="father_last_name" {...this.TProps} label="نام خانوادگی" value={user_info.father_last_name} required inputMask= 'اااااااااااااااااا'/>
          <TextField  validateOnInit="all" ref="father_ID"  {...this.TProps} label="کد ملی" required value={user_info.father_ID} inputMask= '0000000000' />
          <SelectField ref="father_degree" label="مدرک تحصیلی" {...this.TProps} value={user_info.father_degree } options={[
            { text: 'زیردیپلم', value: 0 },
            { text: 'دیپلم', value: 1 },
            { text: 'فوق دیپلم', value: 2 },
            { text: 'کارشناسی', value: 3 },
            { text: 'ارشد', value: 4 },
            { text: 'دکتری', value: 5 }
          ]} />
           <TextField ref="father_mobile"  validateOnInit="all"   {...this.TProps} label="تلفن همراه" value={user_info.father_mobile} inputMask= '00000000000' required/>
           <TextField ref="father_job"  validateOnInit="all" {...this.TProps} label="شغل" value={user_info.father_job} required inputMask= 'اااااااااااااااااا'/> 
           <TextField ref="father_tel"  validateOnInit="all"   required {...this.TProps} label="تلفن محل کار(باکد)" value={user_info.father_tel} inputMask= '000-00000000' />
           <Container layout="hbox">
           {user_info.fatheridcart && <Image src={user_info.fatheridcart+"?"+Math.random()} mode='img' docked='left' width="90" height="70"/>}
           <FileField flex={1}ref="fatheridcart" value={user_info.fatheridcart} {...this.TProps} label= " کارت ملی " placeholder="انتخاب فایل" onChange={(a)=>this.uploader(a,"fatheridcart")} />
          </Container>
          <Container layout="hbox">
          {user_info.fathershenas && <Image src={user_info.fathershenas+"?"+Math.random()} mode='img' docked='left' width="90" height="70"/>}<FileField flex={1}ref="fathershenas" value={user_info.fathershenas} {...this.TProps} label= "صفحه اول شناسنامه" placeholder="انتخاب فایل" onChange={(a)=>this.uploader(a,"fathershenas")} />
          </Container>
        </Container>
 
 
        <Container scrollable>
          <Container layout={{ type: 'hbox', pack: 'space-around' }} width="100%" style={this.headstyle}>{"مشخصات مادر دانش آموز"}</Container>
          <TextField ref="mother_name"  validateOnInit="all" {...this.TProps} label="نام" value={user_info.mother_name} required inputMask= 'اااااااااااااااااا'/>
          <TextField ref="mother_last_name"  validateOnInit="all" {...this.TProps} label="نام خانوادگی" value={user_info.mother_last_name} required inputMask= 'اااااااااااااااااا'/>
          <TextField ref="mother_ID"   validateOnInit="all" {...this.TProps} label="کد ملی" required value={user_info.mother_ID} inputMask= '0000000000'/>
          <SelectField ref="mother_degree" label="مدرک تحصیلی" {...this.TProps} value={user_info.mother_degree } options={[
            { text: 'زیردیپلم', value: 0 },
            { text: 'دیپلم', value: 1 },
            { text: 'فوق دیپلم', value: 2 },
            { text: 'کارشناسی', value: 3 },
            { text: 'ارشد', value: 4 },
            { text: 'دکتری', value: 5 }
          ]} />
           <TextField ref="mother_mobile"   validateOnInit="all" {...this.TProps} label="تلفن همراه" value={user_info.mother_mobile}  inputMask= '00000000000' required/>
           <TextField ref="mother_job"  validateOnInit="all" {...this.TProps} label="شغل" value={user_info.mother_job} required inputMask= 'اااااااااااااااااا'/> 
           <TextField ref="mother_tel"    validateOnInit="all" {...this.TProps} label="تلفن محل کار(باکد)" required value={user_info.mother_tel} inputMask= '000-00000000'/>
           <Container layout="hbox">
           {user_info.motheridcart && <Image src={user_info.motheridcart+"?"+Math.random()} mode='img' docked='left' width="90" height="70"/>}
           <FileField flex={1}ref="motheridcart" value={user_info.motheridcart} {...this.TProps} label= " کارت ملی " placeholder="انتخاب فایل" onChange={(a)=>this.uploader(a,"motheridcart")} />
          </Container>
          <Container layout="hbox">
          {user_info.mothershenas && <Image src={user_info.mothershenas+"?"+Math.random()} mode='img' docked='left' width="90" height="70"/>}
          <FileField flex={1}ref="mothershenas" value={user_info.mothershenas} {...this.TProps} label= "صفحه اول شناسنامه" placeholder="انتخاب فایل" onChange={(a)=>this.uploader(a,"mothershenas")} />
          </Container>
        </Container>

        <Container scrollable>
         
          <Container layout={{ type: 'hbox', pack: 'space-around' }} width="100%" style={this.headstyle}>{"مشخصات خانواده"}</Container> 
          <SelectField ref="family_type" label="وضعیت خانواده" {...this.TProps} value={user_info.family_type } options={[
            { text: 'زندگی با والدین', value: 1 },
            { text: ' زندگی با پدر', value: 2 },
            { text: 'زندگی با مادر', value: 3 },
            { text: 'سایر', value: 4 },
          ]} />
          <TextField ref="family_num" maxLength={1} {...this.TProps} label="تعداد اعضای خانواده" value={user_info.family_num} inputMask= '0' required />
          <TextAreaField ref="home_address"  validateOnInit="all"  required {...this.TProps} label="آدرس دقیق منزل" value={user_info.home_address}  inputMask= '۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰'/>
          <TextField ref="home_tel" validateOnInit="all" {...this.TProps} label="تلفن منزل(باکد)" value={user_info.home_tel}   inputMask= '000-00000000' required/>
          <TextField ref="rabet_tel"  validateOnInit="all" {...this.TProps} label="تلفن رابط(باکد)" value={user_info.rabet_tel}  inputMask= '00000000000' required/>


        </Container>
        <Container scrollable>
        
          <Container layout={{ type: 'hbox', pack: 'space-around' }} width="100%" style={this.headstyle}>{"امکانات رفاهی"}</Container>
          <CheckBoxField {...this.TProps} ref='service' style={{ direction: "ltr" }} height="35"  boxLabel="متقاضی سرویس هستید" checked={user_info.service}  />
          <CheckBoxField {...this.TProps} ref='afterschool' style={{ direction: "ltr" }} height="35" boxLabel="متقاضی AFTER SCHOOL  هستید" checked={user_info.afterschool}  />
          <CheckBoxField {...this.TProps} ref='boofeh' style={{ direction: "ltr" }} height="35"  boxLabel="متقاضی نهار بوفه دبستان هستید" checked={user_info.boofeh}  />
        </Container>



        <Toolbar docked="bottom" layout={{ type: 'hbox', align: 'center', pack: 'space-between' }} height="60" padding="0">
          <Button
            disabled={step === 0}
            text="قبلی"
            handler={this.previous.bind(this)}
            iconCls="x-fa fa-chevron-right"
          />
          <Indicator
            
            count={this.maxstep}
            activeIndex={step}
            onNext={this.previous.bind(this)}
            onPrevious={this.next.bind(this)}
            tapMode={"direction"}
            onIndicatorTap={this.onIndicatorTap.bind(this)}
          />
          <Button
            text={step == this.maxstep - 1 ? "تایید" : "بعدی"}
            handler={step == this.maxstep - 1 ? ()=>{
              if(!this.saveinfo()) return false;
              
              let msg = "بعد از تایید دیگر قادر به ویرایش نیستید. آیا از صحت اطلاعات درج شده اطمینان دارید؟ "
              Ext.Msg.confirm("اخطار",msg,(st)=>{if(st=="yes") {
                Storer("user", this, {mode:2,0:{mode:"<2"}}, "update");
                Ext.toast("اطلاعات شما با موقفیت ثبت شد")
                this.pather('/Confirm')
              } });
              
              
            } : this.next.bind(this)}
            iconCls="x-fa fa-chevron-left"
            iconAlign="right"
          />
        </Toolbar>
      </Panel>
    </Container>
    }
  }
  previous = () => {
    this.saveinfo()
    //if(!this.saveinfo()) return false;
    this.setState({ step: Math.max(0,this.state.step - 1) })
}

next = () => {
  if(!this.saveinfo()) return false;
    this.setState({ step: Math.min(this.state.step + 1,this.maxstep-1) })
}

onIndicatorTap = (indicator, dot) => {
  if(!this.saveinfo()) return false;
    this.setState({ step: dot })
}
  saveAddress() {
    console.log(this.refs)
    let state = this.refs.state.getValue(),
      city = this.refs._city.getValue(),
      text = this.refs.text.getValue(),
      position = this.refs.position.getValue();
    Storer("user_addres", this, { state, city, text, position }, "update");
    this.router('Device')
  }
  Address = () =>  {
    if(!this.state.user_addres){ Storer({ user_addres: {},province:{cols:"id as value,name as text"}}, this);  return null} else{
      let user_addres =  this.state.user_addres[1]||{state:"تهران"}
      user_addres.position = user_addres.position || "35.69,51.42"
      this.adressstate = true
    return <Container   {...this.MainProps} layout={{ type: 'vbox', pack: 'center', align: 'stretch' }} >
    <Container layout="hbox" width={!Ext.platformTags.phone ? 600 : '100%'}>
      <Container layout="vbox" flex="1">
        <Title icon='map-marker' text="ثبت آدرس" />
        <Container layout={{ type: 'hbox', pack: 'space-around' }} width="100%" >
          <Image src={logo} mode="img" height="90" />
          <Container layout="center" flex="1">
            لطفا آدرس خود را به طور کامل وارد نمایید
          </Container>
          
        </Container>
        <SelectField ref="state" {...this.TProps} value={user_addres.state} placeholder="انتخاب استان" options={this.state.province} onChange={(f,nv)=> {
         if(this.adressstate==true) this.adressstate = false; else this.refs._city.setValue("");
      Storer({city:{cols:"id as value,name as text",0:{_province:nv}}}, this)}}/>
        <SelectField ref="_city" {...this.TProps} value={user_addres.city} placeholder="انتخاب شهر" options={this.state.city||[]} />
        <TextAreaField ref="text" {...this.TProps} placeholder="آدرس کامل" required height="90" value={user_addres.text}/>
        {Ext.platformTags.phone &&
          <Container layout="fit" height="300" shadow cls="x-round">
            <MapField ref="position" markers={[user_addres.position.split(",")]}/>
          </Container>}
        <Button {...this.BProps} text="تایید " iconCls="x-fa fa-check-circle" handler={this.saveAddress.bind(this)}  />
      </Container>
      {!Ext.platformTags.phone && user_addres.position &&
        <Container layout="fit" flex="1" shadow cls="x-round">
          <MapField ref="position" markers={[user_addres.position.split(",")]} />
        </Container>}
    </Container>
  </Container>
    }
  }
  Partnershiper=()=>{

  }
  copy(i){
    let ta = window.document.querySelector(`.area${i} textarea`);
    ta.focus();
    ta.select();
    window.document.execCommand('copy');
    if (window.getSelection) {window.getSelection().removeAllRanges();}
    else if (document.selection) {document.selection.empty();}
    ta.blur();
  }
  Partnership=()=>{
    let {_user,name,user,email} = window.userData
    if(!this.state.movies_banner){ Storer({ movies_banner: {0:{_movies:1}},}, this);  return null} else{
    return <Container   {...this.MainProps} layout={{ type: 'vbox', pack: 'center', align: 'center' }} shadow={!Ext.platformTags.phone} padding={Ext.platformTags.phone?0:20} >
    {(!name||!user||!email) &&<Container layout="vbox" flex="1" padding="0 7" width="100%">
            <Title icon='user' text=" تکمیل اطلاعات ضروری " />
           <TextField  ref="aduser" {...this.TProps}  placeholder="نام " value={name||""} hidden={name} required/>
           <TextField  ref="adtel" {...this.TProps}  placeholder="تلفن همراه " value={user||""} hidden={user} required/>
           <TextField  ref="admail" {...this.TProps}  placeholder="ایمیل " value={email||""} hidden={email} required/>
           <hr/>
        </Container>}
    <SelectField ref="_movie" {...this.TProps} value={1} placeholder="انتخاب فیلم" options={[]} />
    <Button {...this.BProps} text="ایجاد لینک اختصاصی " iconCls="x-fa fa-link" handler={this.Partnershiper.bind(this)} height="40" width="100%"/>
    <hr/>
    <Container style={{textAlign:"center"}} >
      {this.state.movies_banner.map((e,i)=><Container key={i} style={{textAlign:"center"}}  >
          <img src={e.src} width={e.width} height={e.height} mode="img"/>
          {e.title + " " + e.width+"*"+e.height}
          <TextAreaField cls={"ltr area"+i} readOnly  width={200} 
          value={'<a href="https://one.sitenevis.com/Movie?Movie=1"><img src="'+e.src+'" width="'+e.width+'"height="'+e.height+'"/></a>'} border
          onClick={(target)=>{target.focus();target.select()}}
          />
          <Button text="کپی" iconCls="x-fa fa-copy" ui="action round" handler={()=>this.copy(i)}/>
      </Container>)}
    </Container>
            
   
  </Container>
    }
  }
  Showing = () =>  {
    if(!this.state.user_addres){ Storer({ user_addres: {},province:{cols:"id as value,name as text"}}, this);  return null} else{
      let user_addres =  this.state.user_addres[1]||{state:"تهران"}
      this.adressstate = true
    return <Container   {...this.MainProps} layout={{ type: 'vbox', pack: 'center', align: 'center' }} shadow={!Ext.platformTags.phone} padding={Ext.platformTags.phone?0:20} >
    <SelectField ref="_movie" {...this.TProps} value={user_addres.city} placeholder="انتخاب فیلم" options={this.state.city||[]} />
    <Container layout={Ext.platformTags.phone?"vbox":"hbox"} width={!Ext.platformTags.phone ? 600 : '100%'} style={{textAlign:"right"}} >
      <Container layout="vbox" flex="1" padding="0 10">
        <Title icon='building' text="اکران کننده" />
        <Container layout={{ type: 'hbox', pack: 'space-around' }} width="100%"  >
         
          {/* <Container layout="center" flex="1">
            لطفا اطلاعات نهاد/دانشگاه خود را به طور کامل وارد نمایید
          </Container> */}
          
        </Container>
        <TextField  ref="name" {...this.TProps}  placeholder="نام مرکز" value={""} />
        
        <SelectField ref="state" {...this.TProps} value={user_addres.state} placeholder="انتخاب استان" options={this.state.province} onChange={(f,nv)=> {
         if(this.adressstate==true) this.adressstate = false; else this.refs._city.setValue("");
      Storer({city:{cols:"id as value,name as text",0:{_province:nv}}}, this)}}/>
        <SelectField ref="_city" {...this.TProps} value={user_addres.city} placeholder="انتخاب شهر" options={this.state.city||[]} />
        <TextField  ref="tel" {...this.TProps}  placeholder="تلفن مرکز" value={""}/>
        <TextAreaField ref="text" {...this.TProps} placeholder="توضیحات ضروری" required height="90" value={user_addres.text}/>
      </Container>
     
        <Container layout="vbox" flex="1" padding="0 10">
                      <Title icon='tv' text="سالن نمایش" />
           <TextField  ref="number" {...this.TProps}  placeholder="ظرفیت" value={""}/>
           <TextField  ref="repeat" {...this.TProps}  placeholder="تعداد سانس" value={""}/>
           <Title icon='user' text="اطلاعات رابط" />
           <TextField  ref="aduser" {...this.TProps}  placeholder="نام " value={""}/>
           <TextField  ref="adtel" {...this.TProps}  placeholder="تلفن همراه " value={""}/>
           <TextField  ref="admail" {...this.TProps}  placeholder="ایمیل " value={""}/>
        </Container>
    </Container>
    <ShopButton price={45000} title={"انقلاب جنسی"}  $id={1} before="خرید لینک  دانلود جهت اکران"  margin="5 0" docked="bottom" large  height="50"/>
    {/* <Button {...this.BProps} text="تایید " iconCls="x-fa fa-check-circle" handler={this.saveAddress.bind(this)}  /> */}
  </Container>
    }
  }
  Transactions = () => {
    if(!this.state.user_transaction) {Storer({ user_transaction:{store:true,refresh:true}}, this); return null} else
    return <Container {...this.MainProps2}   >
    <Grid layout="fit" height="95%" rowNumbers store={this.state.user_transactionStore}  shadow cls="x-round"  plugins={{ gridpagingtoolbar: true, gridsummaryrow: true          }} >
        <TitleBar title="تراکنش های من" docked="top" ui="titlebar-search" cls="x-round">
          <Icon name="exchange" align="left" />
          <Button {...this.BProps} disabled={this.state.user_transaction.length == 0} text="چاپ" iconCls="x-fa fa-print" ui="alt round" shadow margin="5" align="right" handler={()=>this.router("printTransactions")}/>
        </TitleBar>
      <Column text="عنوان/ شماره کارت" flex="2" dataIndex="title" align="center" summaryRenderer={()=>"جمع"}/>
      <Column text="پیگیری" flex="1" dataIndex="pid" align="center"/>
      <Column text="تاریخ" flex="2" dataIndex="date"  formatter="date('h:i      Y/m/d')" align="center"/>
      <Column text="فاکتور مرجع" dataIndex="_user_factor" renderer={this.transkey.bind(this)} summaryRenderer={()=>""}/>
      <Column text="مبلغ" flex="1" dataIndex="price"  summary="sum" align="center"/>
    </Grid>
  </Container>
  }
  printTransactions = () => {
    window.Header.setState({print:true})
    setTimeout(() =>{
      window.print()
      this.router("Transactions")
      window.Header.setState({print:false})
    } ,300)
    return <Container {...this.MainProps2} layout="vbox" height="100%" width="700"   >
      <Grid width={"700"} height="95%" rowNumbers store={this.state.user_transactionStore} shadow cls="x-round" plugins={{ gridsummaryrow: true }} >
        <TitleBar title="لیست تراکنش ها" docked="top" ui="titlebar-search" cls="x-round">
          <Icon name="exchange" align="left" />
        </TitleBar>
        <Column text="عنوان/ شماره کارت" flex="2" dataIndex="title" align="center" summaryRenderer={() => "جمع"} />
        <Column text="پیگیری" flex="1" dataIndex="pid" align="center" />
        <Column text="تاریخ" flex="2" dataIndex="date" formatter="date('h:i  Y/m/d')" align="center" />
        <Column text="فاکتور مرجع" dataIndex="_user_factor" summaryRenderer={() => ""} />
        <Column text="مبلغ" flex="1" dataIndex="price" summary="sum" align="center" />
      </Grid>
    </Container>
  }
  transkey = (value) => {
    value = (value+"").split(",")
    return <Container layout="vbox">
      {value.map(e => <Button {...this.BProps2}  text={e} disabled={isNaN(e)} iconCls="x-fa fa-list-alt" handler={() => this.pather("/Factor?id=" + e)} />)}
    </Container >
  }
  Factor = () => {
    let _user_factor = this.query().id;
    if(!this.state.usercart) {
      Storer ({
        offcart :{from:"user_factor",cols:"off,_user_transaction",0:{id:_user_factor}},
        usercart: {from:"user_factor_cart",store:true,refresh:true,cols:"id,_movies,target,price,count,pay",0:{_user_factor}}},this);return null
    } else{
      let _vat = 0
      let {usercart,offcart,usercartStore} = this.state
      let sumprice = 0,sumoff = 0,total=0,sumvat=0,off = offcart[0].off||0
      for(let row of usercart) {
        let p = row.price*row.count
        let offf = Math.floor(p*off/100);
        let vat = Math.floor((p-offf)*_vat/100);
        sumprice += p;
        sumoff += offf;
        sumvat += vat;
        total += p-offf+vat
      }
      console.log(sumprice,sumoff,sumvat,total)
    return <Container {...this.MainProps2} >
    <Grid  rowNumbers store={usercartStore}  shadow cls="x-round" plugins={{gridsummaryrow: true }} style={{minWidth:"700px"}}>
    <TitleBar title={"فاکتور شماره   : "+_user_factor} docked="top" ui="titlebar-search" cls="x-round">
          <Icon name="list" align="left" />
          <Button {...this.BProps}  text="فاکتور ها" width="150" iconCls="x-fa fa-list-alt" ui="alt round" shadow margin="5"
           align="right" handler={()=>this.pather("Factors")} />
          <Button {...this.BProps}  text="چاپ" iconCls="x-fa fa-print" ui="alt round" shadow margin="5"
           align="right" handler={()=>this.router("PrintFactorsId")} />
        </TitleBar>
        {/* <Column text="کدقطعه" dataIndex="id" align="center" /> */}
        <Column text="نام" flex="1" dataIndex="target" align="center" />
        {/* <Column text="شرح فارسی" flex="1" dataIndex="fa-name" align="center" />
        <Column text="تیپ" flex="1" dataIndex="tip" align="center" /> */}
        <Column text="قیمت واحد" flex="1" dataIndex="price" align="center" />
        <Column text="تعداد" flex="1" dataIndex="count" align="center" summary="sum"  />
        <Column text="قیمت " flex="1" dataIndex="price" align="center" renderer={(v,r)=> r.data.price*r.data.count} summaryRenderer={()=>sumprice}/>
        <Column text="تخفیف" flex="1" dataIndex="price"  align="center" renderer={(v,r)=> Math.floor(r.data.price*r.data.count*off/100)} summaryRenderer={()=>sumoff}  />
        {_vat && <Column text="مالیات" flex="1" dataIndex="price"  align="center" renderer={(v,r)=> Math.floor(r.data.price*r.data.count*_vat/100)} summaryRenderer={()=>sumvat} /> }
        <Column text="مبلغ کل(تومان)" flex="1" dataIndex="price"  align="center" renderer={(v,r)=> Math.floor(r.data.price*r.data.count*(100-off)*(100+_vat)/10000)} summaryRenderer={()=>total} />
    </Grid>
      <Button {...this.BProps} disabled={total == 0} text={"پرداخت "+total+" تومان"} iconCls="x-fa fa-credit-card-alt" handler={() => this.pay(_user_factor, total)}   docked="bottom"  ui={"action round"}/>
    </Container>
   }
  }
  MyPartnership(){
    if(!this.state.user_partner) {Storer({ user_partner:{store:true,refresh:true,join:"product"}}, this); return null} else{
     let sum = 0;
     for(let it of this.state.user_partner) sum+=1*it.count*it.price*it.percent/100
    return <Container {...this.MainProps2} >
    <Grid  store={this.state.user_partnerStore}  shadow cls="x-round" plugins={{ gridpagingtoolbar: true          }}>
    <TitleBar title={"مشارکت های من"} docked="top" ui="titlebar-search" cls="x-round">
          <Icon name="handshake-o" align="left" />        
        </TitleBar>
      <Column text="مشارکت" dataIndex="id" renderer={this.myPartnerkey.bind(this)} />
      <Column text="نام" flex="1" dataIndex="product" align="center" />
      <Column text="تاریخ" flex="1" dataIndex="date"  formatter="date('h:i     Y/m/d')" align="center" />
      <Column text="تعداد خرید" width="180" dataIndex="count"  />
      <Column text="درصد مشارکت" width="180" dataIndex="percent"  />
      <Column text="سهم مشارکت" width="180" dataIndex="percent" renderer={this.mypartCalc.bind(this)} />
    </Grid>
    <Container layout={"hbox"} docked="bottom">
      {(sum>0) &&
      <Button {...this.BProps} disabled={sum == 0} text={"درخواست تسویه حساب" + (sum) + "  تومان"} iconCls="x-fa fa-credit-card-alt" handler={() => unpay(facs.join(), sum)}     ui={"action round"}/>
      }
      </Container>
    </Container>
   }
  }
  mypartCalc(v,a){
    let {count,percent,price} = a.data;
    return count*price*percent/100 + "تومان"
  }
  myPartnerkey = (v,a) =>{
    let {id,_movies,type} = a.data;
   return <Button {...this.BProps2}  iconCls="x-fa fa-key"  ui={"action round"} handler={()=>this.pather("/Partnership?Movie="+_movies)}/>
  } 
  MyContents(){
    if(!this.state.mycontents) {Storer({ mycontents:{from :"user_product",store:true,refresh:true,0:{type:"exam"}}}, this); return null} else{
    return <Container {...this.MainProps2} >
    <Grid  store={this.state.mycontentsStore}  shadow cls="x-round" plugins={{ gridpagingtoolbar: true          }}>
    <TitleBar title={"محتواهای های من"} docked="top" ui="titlebar-search" cls="x-round">
          <Icon name="list" align="left" />
        </TitleBar>
      <Column text="وضعیت" dataIndex="id" width="120" renderer={this.MyExamskey.bind(this)} />
      <Column text="نام" flex="1" dataIndex="movies" align="center" />
      <Column text="تاریخ خرید" flex="1" dataIndex="date"  formatter="date('h:i     Y/m/d')" align="center" />
      <Column text="تعداد استفاده" flex="1" dataIndex="download" align="center" />
    </Grid>
    </Container>
   }
  }
   MyGames(){
    if(!this.state.mygames) {Storer({ mygames:{from :"user_product",store:true,refresh:true,0:{type:"exam"}}}, this); return null} else{
    return <Container {...this.MainProps2} >
    <Grid  store={this.state.mygamesStore}  shadow cls="x-round" plugins={{ gridpagingtoolbar: true          }}>
    <TitleBar title={"بازی های من"} docked="top" ui="titlebar-search" cls="x-round">
          <Icon name="list" align="left" />
        </TitleBar>
      <Column text="وضعیت" dataIndex="id" width="120" renderer={this.MyExamskey.bind(this)} />
      <Column text="نام" flex="1" dataIndex="movies" align="center" />
      <Column text="تاریخ خرید" flex="1" dataIndex="date"  formatter="date('h:i     Y/m/d')" align="center" />
      <Column text="رتبه" flex="1" dataIndex="" align="center" />
      <Column text="امتیاز" flex="1" dataIndex="" align="center" />
      <Column text="مهارت" flex="1" dataIndex="" align="center" />
    </Grid>
    </Container>
   }
  }
  MyMatches(){
    if(!this.state.mymatches) {Storer({ mymatches:{from :"user_product",store:true,refresh:true,0:{type:"exam"}}}, this); return null} else{
    return <Container {...this.MainProps2} >
    <Grid  store={this.state.mymatchesStore}  shadow cls="x-round" plugins={{ gridpagingtoolbar: true          }}>
    <TitleBar title={"مسابقه های های من"} docked="top" ui="titlebar-search" cls="x-round">
          <Icon name="list" align="left" />
        </TitleBar>
      <Column text="وضعیت" dataIndex="id" width="120" renderer={this.MyExamskey.bind(this)} />
      <Column text="نام" flex="1" dataIndex="movies" align="center" />
      <Column text="تاریخ شرکت" flex="1" dataIndex="date"  formatter="date('h:i     Y/m/d')" align="center" />
      <Column text="امتیاز" flex="1" dataIndex="" align="center" />
    </Grid>
    </Container>
   }
  }
  MyExams(){
    if(!this.state.myexams) {Storer({ myexams:{from :"user_product",store:true,refresh:true,0:{type:"exam"}}}, this); return null} else{
    return <Container {...this.MainProps2} >
    <Grid  store={this.state.myexamsStore}  shadow cls="x-round" plugins={{ gridpagingtoolbar: true          }}>
    <TitleBar title={"آزمون های من"} docked="top" ui="titlebar-search" cls="x-round">
          <Icon name="list" align="left" />
        </TitleBar>
      <Column text="وضعیت" dataIndex="id" width="120" renderer={this.MyExamskey.bind(this)} />
      <Column text="نام" flex="1" dataIndex="movies" align="center" />
      <Column text="تاریخ خرید" flex="1" dataIndex="date"  formatter="date('h:i     Y/m/d')" align="center" />
      <Column text="نمره" flex="1" dataIndex="" align="center" />
      <Column text="رتبه کل" flex="1" dataIndex="" align="center" />
    </Grid>
    </Container>
   }
  }

  MyExamskey = (v,a) =>{
    let {state,id,_product} = a.data;
   return <Button {...this.BProps2}  disabled={!state}  text={state?"فعال":"غیر فعال"} iconCls="x-fa fa-list"  ui={"action round"} handler={()=>this.pather("/exam?id="+_product)}/>
  }
  MyShowing(){
    if(!this.state.user_showing) {Storer({ user_showing:{store:true,refresh:true}}, this); return null} else{
    return <Container {...this.MainProps2} >
    <Grid  store={this.state.user_showing}  shadow cls="x-round" plugins={{ gridpagingtoolbar: true          }}>
    <TitleBar title={"اکران های من"} docked="top" ui="titlebar-search" cls="x-round">
          <Icon name="tv" align="left" />
        </TitleBar>
      <Column text="وضعیت" dataIndex="id" width="120" renderer={this.mymoviekey.bind(this)} />
      <Column text="نام" flex="1" dataIndex="movies" align="center" />
      <Column text=" تاریخ خرید" flex="1" dataIndex="date"  formatter="date('h:i     Y/m/d')" align="center" />
      <Column text="مرکز اکران" flex="1" dataIndex="center"  align="center" />
      <Column text="نفرات" flex="1" dataIndex="count"  align="center" />
      <Column text="تعداد نمایش آنلاین" flex="1" dataIndex="stream" align="center" />
      <Column text="تعداد دانلود" flex="1" dataIndex="download" align="center" />

    </Grid>
    </Container>
   }
  }

  Factors = () => {
    let mywalet = 11000;
    if(!this.state.user_factor) {Storer({ user_factor:{cols:"user_factor.id,title,date,_user_transaction,sum(price*`count`) sum ",store:true,refresh:true,join:"user_factor_cart",group:"user_factor.id"}}, this); return null} else{
      let sum=0
      let facs = []
      for(let it of this.state.user_factor) if(!it._user_transaction) sum+=1*it.sum||0,facs.push(it.id);
    return <Container {...this.MainProps2} >
    <Grid  store={this.state.user_factorStore}  shadow cls="x-round" plugins={{ gridpagingtoolbar: true          }}>
    <TitleBar title={"حساب من"+ (mywalet?(" ( موجودی  "+mywalet+" تومان )"):"")} docked="top" ui="titlebar-search" cls="x-round">
          <Icon name="list" align="left" />
          <Button {...this.BProps} disabled={this.state.user_factor.length == 0} text="چاپ" iconCls="x-fa fa-print" ui="alt round" shadow margin="5"
           align="right" handler={()=>this.router("PrintFactors")} />
          
        </TitleBar>
      <Column text="فاکتور" dataIndex="id" renderer={this.facshowkey.bind(this)} />
      <Column text="نام" flex="1" dataIndex="title" align="center" />
      <Column text="تاریخ" flex="1" dataIndex="date"  formatter="date('h:i     Y/m/d')" align="center" />
      <Column text="جمع" flex="1" dataIndex="sum" align="center" />
      <Column text="پرداخت" width="180" dataIndex="id" renderer={this.facpaykey.bind(this)} />
    </Grid>
    <Container layout={"hbox"} docked="bottom">
    {sum>0 && (mywalet==0) &&
         <Button {...this.BProps} disabled={sum == 0} text={"پرداخت همه " + (sum) + "  تومان"} iconCls="x-fa fa-credit-card-alt" handler={() => pay(facs.join(), sum)}     ui={"action round"}/>
      } 
      {(mywalet<sum) && (mywalet>0) && (sum>0) &&
         <Button {...this.BProps} disabled={sum == 0} text={"پرداخت باقیمانده با کسر از موجودی " + (sum-mywalet) + "  تومان"} iconCls="x-fa fa-credit-card-alt" handler={() => pay(facs.join(), sum-mywalet)}    ui={"action round"}/>
      } 
      {(mywalet-sum>=0) && (sum>0) &&
         <Button {...this.BProps} disabled={sum == 0} text={"پرداخت همه از موجودی " + sum + "  تومان"} iconCls="x-fa fa-credit-card-alt" handler={() => wpay(facs.join(), sum)}     ui={"action round"}/>
      } 
      {(mywalet-sum>0) &&
      <Button {...this.BProps} disabled={sum == 0} text={"درخواست تسویه حساب" + (mywalet-sum) + "  تومان"} iconCls="x-fa fa-credit-card-alt" handler={() => unpay(facs.join(), mywalet-sum)}     ui={"action round"}/>
      }
      </Container>
    </Container>
   }
  }
  PrintFactors = () => {
    window.Header.setState({print:true})
    setTimeout(() =>{
      window.print()
      this.router("Factors")
      window.Header.setState({print:false})
    } ,300)
    return <Container {...this.MainProps2} layout="vbox" height="100%" width="700"   >
    <Grid width={"700"} height="95%" store={this.state.user_factorStore} shadow cls="x-round" plugins={{ gridpagingtoolbar: true }}>
        <TitleBar title="لیست فاکتور ها" docked="top" ui="titlebar-search" cls="x-round">
          <Icon name="list" align="left" />
        </TitleBar>
      <Column text="فاکتور" dataIndex="id" align="center" />
      <Column text="نام" flex="1" dataIndex="title" align="center" />
      <Column text="تاریخ" flex="1" dataIndex="date"  formatter="date('h:i     Y/m/d')" align="center" />
      <Column text="جمع" flex="1" dataIndex="sum" align="center" />
    </Grid>
    </Container>
  }

  pay(_user_factor,remind){
    window.socket.emit("pay",remind,window.location.href,_user_factor);
    window.socket.on("paylink",link=>{window.location.href = link});
  }
  facshowkey = (value) =>  <Button {...this.BProps2} text={value} iconCls="x-fa fa-list-alt"  handler={()=>this.pather("/Factor?id="+value)}/>
  facpaykey = (v,a) =>{
    let {_user_transaction,sum,id} = a.data;
    if(_user_transaction) return <Button {...this.BProps2} text="پرداخت شده" disabled={true}  iconCls="x-fa fa-credit-card"  ui={"confirm round"} handler={()=>this.pather("/Factor?id="+id)}/>
    else return <SegmentedButton cls="ltr">
      <Button  pressed  iconCls="x-fa fa-ban" ui={"action round"} />
      <Button cls="rtl" flex="5" text={sum?" پرداخت کنید":"استعلام نشده"} disabled={sum==0}   iconCls="x-fa fa-credit-card"  ui={"action round"} handler={()=>this.pay(id,sum)}/>
      
      </SegmentedButton>
  }
  DeviseList = () => {
    if(!this.state.user_devise) {Storer({ user_devise:{refresh:true,store:true}}, this); return null} else
    return <Container {...this.MainProps2} layout="fit">
    <Grid  layout="fit" store={this.state.user_deviseStore} plugins={{ gridpagingtoolbar: true }} shadow cls="x-round" >
    <TitleBar title="لیست ماشین ها" docked="top" ui="titlebar-search" cls="x-round">
          <Icon name="car" align="left" />
        </TitleBar>
    <RowNumberer text="ردیف" flex="1"/>
      <Column text="برند" flex="2" dataIndex="brand" align="center"/>
      <Column text="تیپ" flex="2" dataIndex="tip" align="center"/>
      <Column text="سال" flex="1" dataIndex="year" align="center"/>
      <Column text="حذف" flex="1" dataIndex="id" renderer={this.cardelkey.bind(this)} />
    </Grid>
    <Button  {...this.BProps} docked="bottom" text="ثبت دستگاه جدید" iconCls="x-fa fa-plus-circle" ui="action round" handler={() => this.router('Device')} />
  </Container>
  }
  cardelkey = (id,record) =>  <Button {...this.BProps2} iconCls="x-fa fa-trash"  handler={()=>{
    Storer("user_devise", this, { id }, "delete") ;
    record.store.remove(record)
  }}/>
  adddevice(continu){
   let year = this.refs.year.getValue();
   let _brand = this.refs._brand.getValue();
   let _tip = this.refs._tip.getValue();
   if(_brand && _brand){
   let  brand = this.refs._brand.getSelection().data.text;
   let  tip = this.refs._tip.getSelection().data.text;
   Storer("user_devise", this, { _tip }, "delete");
   Storer("user_devise", this, { _tip,tip,_brand,brand, year }, "insert");
    if(continu) {
      this.refs._aslee.setValue("");
      this.refs._faree.setValue("");
      this.refs.year.setValue("");
      this.refs._brand.setValue(  "");
      this.refs._tip.setValue("");
     } else window.socket.emit("refresh")
    }
  }

  Device = () => {
    if(!this.state.brands) {
      Storer({
        brands:{cols:"id as value,title as text"},
         aslee:{from:"tip_types",cols:"id as value,title as text",0:{pid:"0"}}
    }, this); return null} else{
    let brands = this.state.brands
   if(this.state.tip && this.refs._brand && this.refs._brand.getValue()==null) {
     let filter = ""
     for(let _tip of this.state.tip) filter +=_tip._brands
     brands=[];
     for(let _brand of this.state.brands) {
       if(filter.indexOf("("+_brand.value+")")>-1) brands.push(_brand)
     }
    this.brands = brands;
    }else if (this.state.tip && this.brands){
      brands = this.brands;
    }
    let deviceData = this.deviceData
    this.deviceData = {}
    return <Container {...this.MainProps} width={!Ext.platformTags.phone ? 640 : "auto"} >
    <Title icon='car' text="ثبت دستگاه" />
    <SelectField ref="_aslee" {...this.TProps} placeholder="انتخاب گروه اصلی" options={this.state.aslee} onChange={(f,nv)=> {
          this.refs._faree.setValue("");
          this.refs.year.setValue("");
          this.refs._brand.setValue("");
          this.refs._tip.setValue("");
          this.brands = ""
      Storer({faree:{from:"tip_types",cols:"id as value,title as text",0:{pid:nv}}}, this)}}/>
    <SelectField ref="_faree" {...this.TProps} placeholder="انتخاب گروه فرعی" options={this.state.faree||[]} onChange={(f,nv)=> {
            this.refs.year.setValue("");
            this.refs._brand.setValue("");
            this.refs._tip.setValue("");
            this.brands = ""
     Storer({tip:{cols:"id as value,title as text,_brands",0:{_tip_types:nv}}}, this)}}/>
    <SelectField ref="_brand" {...this.TProps} placeholder="انتخاب برند" options={brands||[]} onChange={(f,nv)=> {
    if(nv) Storer({tip:{cols:"id as value,title as text,_brands",0:{_tip_types:this.refs._faree.getValue(),_brands:"%("+nv+")%"}}}, this)}}/>
    <SelectField ref="_tip" {...this.TProps} placeholder="انتخاب مدل" options={this.state.tip||[]} />
    <TextField ref="year" {...this.TProps} placeholder="سال تولید" />
    <Container layout={Ext.platformTags.phone ? 'vbox' : 'hbox'}>
      <Button {...this.BProps} text="تایید و ثبت  جدید" iconCls="x-fa fa-plus-circle" handler={() => this.adddevice(true)} />
      <Button {...this.BProps} text="تایید و خاتمه" iconCls="x-fa fa-check-circle" handler={() => this.adddevice(false)} />
      <Button {...this.BProps} text="انصراف" iconCls="x-fa fa-ban" handler={() => window.socket.emit("refresh")} />
    </Container>
  </Container>
  
    }
  }

  render = () => {
    return this[this.state.route]();
  }
  MainProps = {
  //  cls: 'rtl',
    shadow: !Ext.platformTags.phone ,
    cls: Ext.platformTags.phone ? "rtl":'rtl x-round',
    //layout: { type: 'vbox', pack: 'center', align: 'strech' },
    //margin: '5',
    scrollable: true,
   // ref: 'mainPage',
    padding: Ext.platformTags.phone ? 0 : '5',

    style: {
      width:"100%",
      margin:"auto",
      maxWidth: "600px",
      minWidth: "300px"
    }
  };
  MainProps2 = {
    cls: 'rtl',
    cls: ' x-round',
    layout: "fit",
    margin: '5',
    scrollable: true,
   // ref: 'mainPage',

  };
  TProps = {
   // height: '70',
    labelAlign:"top",
    
    //shadow: true,
    cls: 'rtl ',
    margin: '5',
    textAlign: 'center',
    labelTextAlign: "right",
   //width:"100%"
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
