import React, { Component } from 'react';
import { Container,FileField, Image, ToggleField,SelectField, Button, TextField, PasswordField, TextAreaField, Grid, Column,RowNumberer,DatePickerField , GridCell, TitleBar ,SegmentedButton,NumberField,ComboBoxField} from '@sencha/ext-modern';
import { MapField, Vitrin, Title,Icon,ShopButton} from '../../Componnet/*';
import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2';
import 'react-datepicker2/dist/react-datepicker2.min.css';
moment.loadPersian({usePersianDigits: false})
import Storer from "../../Store/Storer";
Ext.require([
  'Ext.Toast',
  'Ext.grid.plugin.PagingToolbar',
  'Ext.grid.plugin.SummaryRow',
  'Ext.data.summary.Average',
  'Ext.data.summary.Max',
  'Ext.data.summary.Sum',
]);
//statics
import logo from '../../Statics/Images/minilogo.png';
export default class Procces extends Component {
  
  state = {sent:false,print:false}
  componentWillMount() {
    window.socket.on("pass",(_user)=>{
      if(_user) {
        Ext.toast("ثبت نام شما با موفقیت انجام شد، لطفا اطلاعات خود را تکمیل فرمایید");
        this._user = _user;
        this.pather("UserInfo")
      }else {
        this.router("Login");
        Ext.toast("رمز عبور صحیح نمی باشد!");
      }
    })  
  }

  state = this.props;
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
    if( this.refs.phone ) this.phoneNumber = this.refs.phone.getValue(); 
    window.socket.emit("phone",this.phoneNumber,this.refs.phone?false:true)
    window.socket.on("phone",(sent)=>{
      window.socket.off("phone")
      this.setState({sent})
      if(this.refs.resentbtn) this.refs.resentbtn.setDisabled(true) 
      this.counter = 60//time to allow resend sms
      if(sent) {
        this.int = setInterval(()=>{
          this.refs.resentbtn.setText("ارسال مجدد/فراموشی رمز" +  "   (" + (this.counter--)+")");
        },1000)
        setTimeout(()=>{
          clearInterval(this.int)
        this.setState({sent:false})
        this.refs.resentbtn.setText("ارسال مجدد/فراموشی رمز");
        this.refs.resentbtn.setDisabled(false) ;
        }, this.counter*1000);
      }
      this.router('Pass')
    })
    }
  }
  Login = () =>  {
    return <Container {...this.MainProps} >
    <Title icon='sign-in' text="ورود / عضویت" />
    <Container layout={{ type: 'hbox', pack: 'space-around' }} width="100%" padding="20">
      <Image src={logo} mode="img" height="30" />
      <Container layout="center" flex="1" padding="0 10">
        لطفا شماره تلفن همراه خود را وارد نمایید
      </Container>
    </Container>
    <TextField {...this.TProps} placeholder="09123456789" ref="phone" onAction={this.phone.bind(this)} value={this.phoneNumber||""}/>
    
    <Button {...this.BProps} text="ورود/عضویت" iconCls="x-fa fa-lock" handler={this.phone.bind(this)} />
    <Button {...this.BProps} text="انصراف " iconCls="x-fa fa-ban" handler={()=>this.pather("/")} />
  </Container>
  }
  passcheck(){
    let pass  = this.refs.PasswordField.getValue() || ""
    if(pass) window.socket.emit("pass",pass)
  }
  Pass = () =>  {
   // if(!this.state.user_info) Storer({ user_info: { 0: { _user:1 } } }, this)
    return <Container {...this.MainProps}>
    <Title icon='key' text="رمز عبور" />
    <Container layout={{ type: 'hbox', pack: 'space-around' }} width="100%">
      <Image src={logo} mode="img" height="30" />
      <Container layout="center" flex="1" key={Math.random()*100}>
      {this.state.sent && <div> رمز برای شما ارسال شد ، جهت ورود مجدد آن را بیاد داشته باشید</div>}
        لطفا رمز عبور خود را وارد فرمایید
      </Container>
    </Container>
    <PasswordField {...this.TProps} placeholder="رمز عبور" ref="PasswordField" onAction={this.passcheck.bind(this)} />
    <Button {...this.BProps} text="تایید " iconCls="x-fa fa-check-circle" handler={this.passcheck.bind(this)} />
    <Button ref="resentbtn" {...this.BProps} disabled={this.state.sent} text="ارسال مجدد/فراموشی رمز" iconCls="x-fa fa-refresh" handler={this.phone.bind(this)}/>
    <Button {...this.BProps} text="انصراف " iconCls="x-fa fa-ban" handler={()=>this.pather("/")} />
  </Container>
  }
  saveinfo() {
    let mode = this.refs.mode.getValue(),
      name = this.refs.name.getValue(),
      mobile = this.refs.tel.getValue(),
   //   fax = this.refs.fax.getValue(),
      email = this.refs.email.getValue();
    Storer("user_info", this, { mode, name, mobile, email }, "update");
    this.pather('/User')
  }
  Info = () =>  {
    if(!this.state.user_info){ Storer({ user_info:{}}, this); return null} else{
    let user_info =  this.state.user_info[1]
    return <Container {...this.MainProps} >
    <Title icon='info-circle' text="تکمیل اطلاعات" />
    <Container layout={{ type: 'hbox', pack: 'space-around' }} width="100%">
      <Image src={logo} mode="img" height="30" />
      <Container layout="center" flex="1">
        لطفا اطلاعات خود را تکمیل بفرمایید
      </Container>
      
    </Container>
    {user_info && <div>
    <SelectField ref="mode" {...this.TProps} hidden value={user_info.mode||0} options={[{ text: 'کاربر حقیقی', value: 0 }, { text: 'کاربر حقوقی', value: 1 }]} /> 
    <TextField ref="name" {...this.TProps} placeholder="نام" value={user_info.name||""} required />
     <TextField  ref="tel" {...this.TProps} hidden placeholder="تلفن" value={user_info.tel||""}/>
     <TextField  ref="fax" {...this.TProps} hidden placeholder="فکس" value={user_info.fax||""} /> 
    <TextField ref="email" {...this.TProps} placeholder="ایمیل" value={user_info.email||""}/>
    <Button {...this.BProps} text="تایید  " iconCls="x-fa fa-check" handler={this.saveinfo.bind(this)} />
    </div>}
  </Container>
    }
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
    return <Container {...this.MainProps2}  >
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
  ////////////////
  newExam(){
    if (!this.state.exameditor || !this.state.spaye) {
      this.state.nv = 0
      if (Object.values(this.editing).length!=0) {
        Storer({
          spaye: { from: "exam", cols: "id as value,name as text", 0: { paye: "base" } },
          groups : { from: "exam", cols: "pid,id as value,name as text", 0: { paye: "!=\"base\"",leaf:0 } },
          exameditor : { from: "exam_item", cols: "exam.pid as igroup,paye,exam.name,start_time,end_time,price", 0: { id: this.editing.id } ,join:"exam" },
        }, this);
      } else {
        this.state.exameditor ={}
        Storer({
          spaye: { from: "exam", cols: "id as value,name as text", 0: { paye: "base" } },
          groups : { from: "exam", cols: "pid,id as value,name as text", 0: { paye: "!=\"base\"",leaf:0 } },
        }, this)
      }
   return null
  } else{
    let {igroup,paye,name,start_time,end_time,price} = this.state.exameditor[0]||{};
    if(!paye && this.grouping.id) paye= this.grouping.paye;
    if(!igroup && this.grouping.id) igroup= this.grouping.id;
    let st_value = moment(start_time);
    let en_value =moment(end_time)
    let gfilter = this.state.nv || paye 
    let _groups=this.state.groups//[];
   // for(let gr of this.state.groups) if(gr.pid == gfilter) _groups.push(gr);
      return <Container layout="center">
        <Container {...this.MainProps}  >
          <Title icon='check-square-o' text="ثبت " />
          <SegmentedButton ref="_paye" allowMultiple cls="ltr" >
            {this.state.spaye.map((e,i)=>
              <Button  key={i} ui=" action round" text={e.text} value={e.value}  disabled={this.grouping.id} pressed={(paye||"").indexOf(e.value)>-1} />
              )}
          </SegmentedButton>
          {/* <SelectField {...this.TProps} placeholder="انتخاب پایه" options={this.state.spaye} value={paye||""} onChange={(f,nv)=>this.setState({nv})}/> */}
          <SelectField ref="_group" {...this.TProps} placeholder="انتخاب دسته" options={_groups} value={igroup||""} disabled={this.grouping.id}/>
          <TextField ref="_name" {...this.TProps} placeholder="نام " value={name||""}/>
<Container {...this.TProps} layout="hbox" width="100%" >
<Container flex={1}><DatePicker ref="_start_time"  isGregorian={false}  value={st_value} width="100%" placeholder="تاریخ شروع"/></Container>
   <Icon name="calendar-check-o"  docked="left" color="#00000088"/>
</Container>
<Container {...this.TProps} layout="hbox"  width="100%" >
<Container flex={1}> <DatePicker ref="_end_time" format='jYYYY/jM/jD HH:mm:ss'  isGregorian={false}  value={en_value} width="100%" placeholder="تاریخ پایان"/></Container>
   <Icon name="calendar-check-o" color="#00000088"/>
</Container>
          <NumberField ref="_price" {...this.TProps} placeholder="هزینه" value={price||""}/>
          <Container layout={Ext.platformTags.phone ? 'vbox' : 'hbox'} width={!Ext.platformTags.phone ?420 :"100%"}>
            <Button {...this.BProps} text="تایید " iconCls="x-fa fa-check-circle" handler={() => this.addexam()} />
            {this.editing !={} && <Button {...this.BProps} text="حذف" iconCls="x-fa fa-trash"  handler={() => this.delexam()}  />}
            <Button {...this.BProps} text="انصراف" iconCls="x-fa fa-ban" handler={() => this.router('AdminExams')} />
          </Container>
        </Container>
      </Container> 
  
    }
  }
  //////////////////
  newExamGroup(){
    if (!this.state.exameditor || !this.state.spaye) {
      this.state.nv = 0
      if (Object.values(this.editing).length!=0) {
        Storer({
          spaye: { from: "exam", cols: "id as value,name as text", 0: { paye: "base"} },
          groups : { from: "exam", cols: "pid,id as value,name as text", 0: { paye: "!=\"base\"",leaf:0 } },
          exameditor : { from: "exam_item", cols: "exam.pid as igroup,paye,exam.name,start_time,end_time,price", 0: { id: [this.editing.id,"{is null}"] } ,1:{id:this.editing._exam},join:"exam",joinMode:"right" },
        }, this);
      } else {
        this.state.exameditor ={}
        Storer({
          spaye: { from: "exam", cols: "id as value,name as text", 0: { paye: "base" } },
          groups : { from: "exam", cols: "pid,id as value,name as text", 0: { paye: "!=\"base\"",leaf:0 } },
        }, this)
      }
   return null
  } else{
    let {igroup,paye,name,start_time,end_time,price} = this.state.exameditor[0]||{};
    let gfilter = this.state.nv || paye 
    let _groups=this.state.groups//[];
   // for(let gr of this.state.groups) if(gr.pid == gfilter) _groups.push(gr);
    let st_value = moment(start_time);
    let en_value =moment(end_time)
      return <Container layout="center">
        <Container {...this.MainProps}  >
          <Title icon='check-square-o' text="ثبت دسته بندی" />
          {/* <SelectField ref="_paye" {...this.TProps} placeholder="انتخاب پایه" options={this.state.spaye} value={paye||""} onChange={(f,nv)=>this.setState({nv})}/> */}
          <SegmentedButton ref="_paye" allowMultiple cls="ltr">
            {this.state.spaye.map((e,i)=>
              <Button  key={i} ui="action round" text={e.text} value={e.value}  pressed={(paye||"").indexOf(e.value)>-1} />
              )}
          </SegmentedButton>
          <SelectField hidden ref="_group" {...this.TProps} placeholder="انتخاب دسته" options={_groups} value={igroup||"0"}/>
          <TextField ref="_name" {...this.TProps} placeholder="نام " value={name||""}/>

          <Container hidden {...this.TProps} layout="hbox" width="100%" >
            <Container flex={1}><DatePicker ref="_start_time" isGregorian={false} value={st_value} width="100%" placeholder="تاریخ شروع" /></Container>
            <Icon name="calendar-check-o" docked="left" color="#00000088" />
          </Container>
          <Container hidden {...this.TProps} layout="hbox" width="100%" >
            <Container flex={1}> <DatePicker ref="_end_time" format='jYYYY/jM/jD HH:mm:ss' isGregorian={false} value={en_value} width="100%" placeholder="تاریخ پایان" /></Container>
            <Icon name="calendar-check-o" color="#00000088" />
          </Container>
          <NumberField hidden ref="_price" {...this.TProps} placeholder="هزینه" value={price||""}/>

          <Container layout={Ext.platformTags.phone ? 'vbox' : 'hbox'} width={!Ext.platformTags.phone ?420 :"100%"}>
            <Button {...this.BProps} text="تایید " iconCls="x-fa fa-check-circle" handler={() => this.addexam(0)} />
            {this.editing !={} && <Button {...this.BProps} text="حذف" iconCls="x-fa fa-trash"  handler={() => this.delexam()}  />}
            <Button {...this.BProps} text="انصراف" iconCls="x-fa fa-ban" handler={() => this.router('AdminExams')} />
          </Container>
        </Container>
      </Container> 
  
    }
  }
  delexam(confirmed=false){
    if(confirmed){
      let {id,_exam} = this.editing;
      Storer("exam", this, {id:_exam,or:{pid:_exam}}, "delete");
      Storer("exam_item", this, {_exam:"{not in (SELECT id as _exam from exam)}"}, "delete");
      delete this.state.adexams ;
      this.editing = {};
      this.router('AdminExams')
    }else{
      Ext.Msg.confirm("تایید","آیا از حذف این مورد اطمینان دارید؟",(st)=>{if(st=="yes") this.delexam(true); });
    }
  }
 
  addexam(leaf=1){
    let paye = this.refs._paye.getValue();
    let group = this.refs._group.getValue();
    let name = this.refs._name.getValue();
    let price = this.refs._price.getValue();
    let end_time = moment(this.refs._end_time.state.inputValue,this.refs._end_time.state.inputFormat).format('YYYY-M-D HH:mm:ss')
     let start_time = moment(this.refs._start_time.state.inputValue,this.refs._start_time.state.inputFormat).format('YYYY-M-D HH:mm:ss')
    if (!this.editing.id) {
      Storer("exam", this, { paye,name,price,pid:group,mode:this.matchstate?1:0,leaf}, "insert");
      if(leaf==1) Storer("exam_item", this, {_exam:'{(select max(id) as _exam from exam)}',name, end_time,start_time,pid:0}, "insert");
    }else{
      let {id,_exam} = this.editing;
      Storer("exam", this, { paye,name,price,pid:group,0:{id:_exam}}, "update");
      if(leaf==1) Storer("exam_item", this, { name, end_time,start_time,pid:0,0:{id}}, "update");
      else Storer("exam", this, { paye,0:{pid:_exam}}, "update");
    }
    delete this.state.adexams ;
    this.editing = {};
    this.router('AdminExams')
  }
  AdminMatches(){
    this.matchstate = true
    return this.AdminExams()
  }
  _AdminExams(){
    this.matchstate = false
    return this.AdminExams()
  }
  grouping={}
  AdminExams(){
    
    let cols = "exam_item.id as id,exam.name as name,paye,duration,start_time,end_time,price,users,usersdone,parts,if(`start_time`>now(),0,if(`end_time`>now(),1,2)) as state,_exam,T_balance,D_balance,leaf,exam.id as _exam"
    if(!this.state.adexams) {
      Storer({
        adexams:{from :"exam_item",cols,store:true,refresh:true,0:{pid:[0,"{is null}"]},1:{pid:this.grouping.id || "0",paye:"!='base'",mode:this.matchstate?1:0},join:"exam",joinMode:"right"},
      }, this); return null} else{
      this.editing = {};
    return <Container {...this.MainProps2} >
    <Grid  store={this.state.adexamsStore}  shadow cls="x-round" plugins={{ gridpagingtoolbar: true          }}>
    <TitleBar title={this.matchstate ? "مدیریت مسابقات":"مدیریت آزمون ها"} docked="top" ui="titlebar-search" cls="x-round">
          <Icon name={this.matchstate ? "fa-flag-checkered":"check-square-o"} align="left" />
          <Button hidden={this.grouping.id} {...this.BProps}  text={"گروه جدید"} iconCls="x-fa fa-calendar-plus-o" ui="alt round" shadow margin="5"
           align="right" handler={() => {this.editing={};this.state.exameditor ={};this.router('newExamGroup')}} width={150} flex="3"/>
          <Button {...this.BProps}  text={this.matchstate ?"مسابقه جدید":"آزمون جدید"} iconCls="x-fa fa-plus-square" ui="alt round" shadow margin="5"
           align="right" handler={() => {this.editing={};this.state.exameditor ={};this.router('newExam')}} width={150} flex="3"/>
          <Button {...this.BProps}  iconCls={this.grouping.id?"x-fa fa-arrow-left":"x-fa fa-refresh"} ui="alt round" shadow margin="5"
           align="right" handler={() => {delete this.state.adexams ;delete this.grouping.id;this.router('AdminExams')}} width={60} />
        </TitleBar>
      <Column text="وضعیت/ویرایش" dataIndex="id" width="120" renderer={this.MyExamskey.bind(this)} />
      <Column text="نام" flex="2" dataIndex="name" align="center" renderer={this.examnamekey.bind(this)} />
      <Column text="پایه" flex="1" dataIndex="paye" align="center" hidden={this.grouping.id}/>
      <Column text="درس ها" flex="1" dataIndex="parts" align="center" renderer={this.lessonskey.bind(this)} />
      <Column text="تاریخ شروع" flex="1" dataIndex="start_time"  renderer={(v,a)=>!a.data.leaf?"":moment(v).format("HH:mm     jM/jD")} align="center" />
      <Column text="تایخ پایان" flex="1" dataIndex="end_time"  align="center" renderer={(v,a)=>!a.data.leaf?"":moment(v).format("HH:mm     jM/jD")}/>
      <Column text= "مدت پاسخگویی" flex="1" dataIndex="duration" align="center" />
      <Column text="هزینه" flex="1" dataIndex="price" align="center" />
      <Column text="تعداد ثبت نامی" flex="1" dataIndex="users" align="center" renderer={this.examRegkey.bind(this)}/>
      <Column text="شرکت کنندگان" flex="1" dataIndex="usersdone" align="center" renderer={this.examResultkey.bind(this)}/>
      <Column text="نمره بالا" flex="1" dataIndex="T_balance" align="center"/>
      <Column text="نمره پایین" flex="1" dataIndex="D_balance" align="center"/>
    </Grid>
    </Container>
   }
  }
  examnamekey = (v,a) =>{
    let {id,name,leaf,_exam,paye} = a.data;
    if (leaf) return v;
    else  return <Button {...this.BProps2}  text={v}   ui={"action round"} handler={()=>{
     this.grouping ={id:_exam,paye:paye};
     this.state.adexams = false;
     this.router("AdminExams")}}/>
  }

  lessonskey = (v,a) =>{
    let {state,id,_exam,leaf} = a.data;
    if(!leaf) return "";
   return <Button {...this.BProps2}  text={v} iconCls="x-fa fa-plus-square"  ui={"action round"} handler={()=>{
     this.editing ={id,_exam,state};
     this.router("AdminExamParts")}}/>
  }

  MyExamskey = (v,a) =>{
    let {state,id,_exam,leaf} = a.data;
    //text={state==0?"ویرایش":(state==1?"اکنون":"اتمام")} 
   return <div>

        <Button {...this.BProps2}  disabled={leaf?state:false}  width="40%"
   iconCls={(!leaf || state==0)?"x-fa fa-pencil":(state==1?"x-fa fa-clock-o":"x-fa fa-check")}
   ui={"action round"} handler={()=>{this.editing ={id,_exam};delete this.state.exameditor; this.router(leaf?"newExam":"newExamGroup")}}/>
           <Button {...this.BProps2}  width="40%" 
   iconCls={(!leaf || state==0)?"x-fa fa-trash":(state==1?"x-fa fa-ban":"x-fa fa-trash")}
   ui={"action round"} handler={()=>{this.editing ={id,_exam}; this.delexam()}}/>
   </div>

  }
  examResultkey(v,a){
    let {state,id,_exam,usersdone,leaf} = a.data;
    if(!leaf) return "";
    return <Button {...this.BProps2}  disabled={usersdone==0}  
   iconCls={"x-fa fa-users"}
   text={v||"0"}
   ui={"action round"} handler={()=>{this.pather("/Matchuser?pid=0&_exam="+_exam)}}/>
  }
  examRegkey(v,a){
    let {state,id,_exam,usersdone,leaf} = a.data;
    if(!leaf) return "";
    return <Button {...this.BProps2}  disabled={usersdone==0}  
   iconCls={"x-fa fa-users"}
   text={v||"0"}
   ui={"action round"} handler={()=>{this.pather("/Matchuser?pid=0&_exam="+_exam)}}/>
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  newExamPart(){
    if (this.partediting.id && !this.state.examparteditor) {
      Storer({
        examparteditor: { from: "exam_item", cols: "name,ratio,neg_mod,duration,_content", 0: { id: this.partediting.id } },
        content:{cols:"content.id as value,name as text,count(*) as count",join:"content_item",group:"content.id"}
      }, this);
      return null
    }else if(!this.state.content){
      Storer({
        content:{cols:"content.id as value,name as text,count(*) as count",join:"content_item",group:"content.id"}
      }, this);
    } else {
    this.state.examparteditor =this.state.examparteditor||[];
    let {name,ratio,neg_mod,duration,_content} = this.state.examparteditor[0]||{};
    for(let row =0;row<this.state.content.length;row++) this.state.content[row].text += ` :  ${this.state.content[row].count} سوال`;
      return <Container layout="center">
        <Container {...this.MainProps}   >
          <Title icon='check-square-o' text="ثبت درس" />
          <TextField ref="_name" {...this.TProps} placeholder="نام درس" value={name||""}/>
          <SelectField ref="_content" {...this.TProps} placeholder="انتخاب محتوا" options={this.state.content} value={_content||""}/>
          <NumberField ref="_ratio" {...this.TProps} placeholder="ضریب" value={ratio||""}/>
          
          <Container hidden ={this.matchstate} {...this.TProps}><center><ToggleField ref="_neg_mod" boxLabel="نمره منفی" value={neg_mod*1==1?true:false}  centered/></center></Container>
          <NumberField {...this.TProps} ref="_duration2"  placeholder="مدت پاسخگویی" value={duration||""}/>
          <Container layout={Ext.platformTags.phone ? 'vbox' : 'hbox'} width={!Ext.platformTags.phone ?420 :"100%"}>
            <Button {...this.BProps} text="تایید " iconCls="x-fa fa-check-circle" handler={() => this.addexampart()} />
            {this.partediting.id && <Button {...this.BProps} text="حذف" iconCls="x-fa fa-trash"  handler={() => this.delexampart()}  />}
            <Button {...this.BProps} text="انصراف" iconCls="x-fa fa-ban" handler={() => this.router('AdminExamParts')} />
          </Container>
        </Container>
      </Container> 
  
    }
  }
  delexampart(){
    let pid = this.editing.id;
    let {id,count,duration} = this.partediting;
    Storer("exam_item", this, {id}, "delete");
    //update count and duration of parent and parts
    Storer("exam_item", this, {count:"{`count`- "+count+"}",duration:"{`duration`- "+duration+"}",parts:"{`parts`- 1}",0:{id:pid}}, "update");
    delete this.state.exparts ;
    this.partediting = {};
    this.router('AdminExamParts')
  }
  addexampart(){
    
    let ratio = this.refs._ratio.getValue();
    let name = this.refs._name.getValue();
    let neg_mod = this.refs._neg_mod.getValue()?1:0;
    let duration = this.refs._duration2.getValue();
    let _content = this.refs._content.getValue();
    let count =0;
    for(let row of this.state.content) if(_content==row.value) count=row.count;

    if (!this.partediting.id) {
      let {id,_exam} = this.editing;
      Storer("exam_item", this, {_exam,name, ratio,neg_mod,duration,pid:id,_content,count}, "insert");
      Storer("exam_item", this, {duration:"{`duration`+ "+duration+"}",parts:"{`parts`+ 1}",count:"{`count`+ "+count+"}",0:{id}}, "update");
    }else{
      let id = this.partediting.id;
      let pid = this.editing.id;
      Storer("exam_item", this, {name, ratio,neg_mod,duration,_content,count,0:{id}}, "update");
      Storer("exam_item", this, {
        duration:"{`duration`+ "+duration+" - "+ this.partediting.duration+ "}",
        count:"{`count`+ "+count+" - "+ this.partediting.count+ "}",
      0:{id:pid}}, "update");
    }
    delete this.state.exparts ;
    this.partediting = {};
    this.router('AdminExamParts')
  }
  AdminExamParts(){
    let cols = "exam_item.id,exam_item.name,exam_item.count,duration,content.name as content,neg_mod,ratio,T_percent,D_percent,A_percent,T_balance,D_balance,A_balance";
    let {id,_exam,state} = this.editing;
    if(!this.state.exparts) {Storer({exparts:{from :"exam_item",cols,store:true,refresh:true,join:"content",0:{pid:id}}}, this); return null} else{
      this.partediting = {};
    return <Container {...this.MainProps2} >
    <Grid  store={this.state.expartsStore}  shadow cls="x-round" plugins={{ gridpagingtoolbar: true          }}>
    <TitleBar title={"مدیریت درس ها"} docked="top" ui="titlebar-search" cls="x-round">
          <Icon name="check-square-o" align="left" />
          <Button {...this.BProps} disabled={state} text="درس جدید" iconCls="x-fa fa-plus-square" ui="alt round" shadow margin="5"
           align="right" handler={() => {this.partediting = {};delete this.state.examparteditor;this.router('newExamPart')}} width={150} flex="3"/>
          <Button {...this.BProps}  iconCls="x-fa fa-refresh" ui="alt round" shadow margin="5"
           align="right" handler={() => {delete this.state.adexams;delete this.state.exparts ;delete this.state.examparteditor; this.router('AdminExamParts')}} width={60} />
           <Button {...this.BProps}  iconCls="x-fa fa-arrow-left" ui="alt round" shadow margin="5"
           align="right" handler={() => {delete this.state.exparts ;;delete this.state.examparteditor;this.router('AdminExams')}} width={60} />
        </TitleBar>
      <Column text="ویرایش" dataIndex="id" width="120" renderer={this.MyExamspartkey.bind(this)} />
      <Column text="نام" flex="2" dataIndex="name" align="center" />
      <Column text="محتوای سوالات " flex="2" dataIndex="content" align="center" />
      <Column text="تعداد" flex="1" dataIndex="count" align="center"  />
      <Column text= "مدت پاسخگویی" flex="1" dataIndex="duration" align="center" />
      <Column text= "نمره منفی" flex="1" dataIndex="neg_mod" align="center" />
      <Column text= "ضریب" flex="1" dataIndex="ratio" align="center" />

      <Column text= "نمره بالا" flex="1" align="center" dataIndex="T_balance" />
      <Column text= "نمره متوسط" flex="1" align="center" dataIndex="A_balance" />
      <Column text= "نمره پایین" flex="1" align="center" dataIndex="D_balance" />
      
      <Column text= "درصد بالا" flex="1" align="center" dataIndex="T_percent" />
      <Column text= "درصد متوسط" flex="1" align="center" dataIndex="A_percent" />
      <Column text= "درصد پایین" flex="1" align="center" dataIndex="D_percent" />

    </Grid>
    </Container>
   }
  }
  exContentkey = (v,a) =>{
    let {state}  = this.editing;
    let {id,_exam} = a.data;
   return <Button {...this.BProps2}   text={v} iconCls="x-fa fa-plus-square"  ui={"action round"} handler={()=>{
     this.editing ={id,_exam};
     this.router("AdminExamParts")}}/>
  }
  MyExamspartkey = (v,a) =>{
    let {state}  = this.editing;
    let {id,duration,count} = a.data;
   return <Button {...this.BProps2}  disabled={state}  
   text={state==0?"ویرایش":(state==1?"اکنون":"اتمام")} 
   iconCls={state==0?"x-fa fa-pencil":(state==1?"x-fa fa-clock-o":"x-fa fa-check")}
   ui={"action round"} handler={()=>{this.partediting ={id,duration,count};delete this.state.exameditor;delete this.state.examparteditor; this.router("newExamPart")}}/>
  }



////////////////////////////////////////////////////
newConQues(){
  if (!this.state.contentditor && this.editing.id) {
      Storer({
        contentditor : { from: "content", cols: "name", 0: { id: this.editing.id } },
      }, this);
 return null
} else{
  let name =""
  if(this.editing.id) name = (this.state.contentditor||[{name:""}])[0].name;
    return <Container layout="center">
      <Container {...this.MainProps}  >
        <Title icon='question-circle' text="ثبت دسته" />
        <TextField ref="_name" {...this.TProps} placeholder="نام محتوا" value={name||""}/>
        {!this.editing.id && <FileField  accept=".pdf" {...this.TProps} placeholder="ادرس" value={name||""} onChange={( th, newValue )=>{this.pdfuploader(th.inputElement.dom)}} /> }
        {!this.editing.id && <TextField ref="_answers" {...this.TProps} placeholder="پاسخها :1-2-3" value={""}/>}
        {!this.editing.id && <TextField ref="_options" {...this.TProps} placeholder="تعداد گزینه ها:4-5-4" />}
        {!this.editing.id && <TextField ref="_ratios" {...this.TProps} placeholder="بارم ها:1-2-3" />}
        <Container layout={Ext.platformTags.phone ? 'vbox' : 'hbox'} width={!Ext.platformTags.phone ?420 :"100%"}>
          <Button {...this.BProps} text="تایید " iconCls="x-fa fa-check-circle" handler={() => this.addqcontent()} />
          {this.editing.id && <Button {...this.BProps} text="حذف" iconCls="x-fa fa-trash"  handler={() => this.dellqcontent()}  />}
          <Button {...this.BProps} text="انصراف" iconCls="x-fa fa-ban" handler={() => this.router('AdminQuestions')} />
        </Container>
      </Container>
    </Container> 
  }
}
pdfuploader(){
  var file    = window.document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();
   reader.addEventListener("load",  ()=> {
    socket.emit('pdfupload', { 
        name: file.name, 
        type: file.type, 
        size: file.size, 
        data: reader.result
    });
    //this.setState({uploadedImgs:reader.result});
    window.socket.on("pdfupload",(data)=>{
      this.setState({uploadedImgs:data});
      window.socket.off("pdfupload");
    })
  }, false);
  if (file) reader.readAsDataURL(file);
}
dellqcontent(){
  let {id} = this.editing;
  Storer("content", this, {id}, "delete");
  Storer("content_item", this, {_content:id}, "delete");
  delete this.state.adcontent ;
  this.editing = {};
  this.router('AdminQuestions')
}
addqcontent(){
  let name = this.refs._name.getValue();
  if (!this.editing.id) {
    let imgs = this.state.uploadedImgs||[];
    let answers = this.refs._answers.getValue().split("-");
    let options = (this.refs._options.getValue()||"4").split("-");
    let ratios = (this.refs._ratios.getValue()||"1").split("-");
    Storer("content", this, { name}, "insert");
    for(let i in imgs){
      Storer("user_file", this, { name:imgs[i],telFile:imgs[i],gapFile:imgs[i],_user_file_type:4}, "insert");
      Storer("content_item", this, {ord:i*1+1,ratio:1,answer:answers[i]||0,options:options[i]||options[0],ratio:ratios[i]||ratios[0],_content:'{(select max(id) as _content from content)}',_user_file:'{(select max(id) as _user_file from user_file)}'}, "insert");
    }
    
  }else{
    let {id} = this.editing;
    Storer("content", this, { name,0:{id}}, "update");
  }
  delete this.state.adcontent ;
  this.editing = {};
  this.router('AdminQuestions')
}
AdminQuestions(){
  let cols = "content.id as id,name,count(_content) as count"
  if(!this.state.adcontent) {
    Storer({adcontent:{from :"content",cols,store:true,refresh:true,join:"content_item",joinMode:"left",group:"_content"}}, this);
    return null
  } else{
    this.editing = {};
  return <Container {...this.MainProps2} >
  <Grid  store={this.state.adcontentStore}  shadow cls="x-round" plugins={{ gridpagingtoolbar: true          }}>
  <TitleBar title={"مدیریت دسته سوالات"} docked="top" ui="titlebar-search" cls="x-round">
        <Icon name="question-circle" align="left" />
        <Button {...this.BProps}  text="دسته جدید" iconCls="x-fa fa-plus-square" ui="alt round" shadow margin="5"
         align="right" handler={() => {this.editing={};this.state.exameditor ={};delete this.state.uploadedImgs;this.router('newConQues')}} width={150} flex="3"/>
        <Button {...this.BProps}  iconCls="x-fa fa-refresh" ui="alt round" shadow margin="5"
         align="right" handler={() => {delete this.state.adcontent ;this.router('AdminQuestions')}} width={60} />
      </TitleBar>
    <Column text="ویرایش" dataIndex="id" width="120" renderer={this.editqname.bind(this)} />
    <Column text="نام" flex="1" dataIndex="name" align="center" />
    <Column text="سوالات" flex="1" dataIndex="count" align="center" renderer={this.qitemkey.bind(this)}/>
  </Grid>
  </Container>
 }
}
qitemkey = (v,a) =>{
  let {id} = a.data;
 return <Button {...this.BProps2}  text={v||"0"} iconCls="x-fa fa-plus-square"  ui={"action round"} handler={()=>{
   this.editing ={id};
   delete this.state.exq;
   this.router("AdminExamQu")}}/>
}
editqname = (v,a) =>{
  let {id} = a.data;
 return <Button {...this.BProps2}   
 text={"ویرایش"} 
 iconCls={"x-fa fa-pencil"}
 ui={"action round"} handler={()=>{this.editing ={id};delete this.state.contentditor; delete this.state.uploadedImgs;this.router("newConQues")}}/>
}
///////////////////////////////////////////////////
newExQ(){
  if (this.Qediting.id && !this.state.exqeditor) {
    Storer({
      exqeditor: { from: "content_item", cols: "ord,ratio,answer,options,name",join:"user_file", 0: { id: this.Qediting.id } },
    }, this);
    return null
  } else {
    
  this.state.exqeditor =this.state.exqeditor||[];
  let {ord,ratio,answer,options,name} = this.state.exqeditor[0]||{};
    return <Container layout="center">
      <Container {...this.MainProps}   >
        <Title icon='question-circle' text="ثبت سوال" />

        <TextField ref="_ord" {...this.TProps} placeholder="ترتیب" value={ord||""}/>
        <NumberField ref="_ratio" {...this.TProps} placeholder="بارم" value={ratio||""}/>
        <NumberField ref="_answer" {...this.TProps} placeholder="پاسخ" value={answer||""}/>
        <NumberField ref="_options" {...this.TProps} placeholder="تعداد گزینه" value={options||"4"}/>
        <FileField  ref="_name" {...this.TProps} accept="image" placeholder="ادرس" value={name||""} onChange={( th, newValue )=>{this.uploader(th.inputElement.dom)}} /> 

        {(this.state.uploadedImg||name) && <center><Image src={this.state.uploadedImg||name} width={200} height="300" mode="img"/></center> }

        <Container layout={Ext.platformTags.phone ? 'vbox' : 'hbox'} width={!Ext.platformTags.phone ?420 :"100%"}>
          <Button {...this.BProps} text="تایید " iconCls="x-fa fa-check-circle" handler={() => this.addExQ()} />
          {this.Qediting.id && <Button {...this.BProps} text="حذف" iconCls="x-fa fa-trash"  handler={() => this.delExQ()}  />}
          <Button {...this.BProps} text="انصراف" iconCls="x-fa fa-ban" handler={() => this.router('AdminExamQu')} />
        </Container>
      </Container>
    </Container> 

  }
}
uploader(){
  var file    = window.document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();
   reader.addEventListener("load",  ()=> {
    socket.emit('upload', { 
        name: file.name, 
        type: file.type, 
        size: file.size, 
        data: reader.result
    });
    this.setState({uploadedImg:reader.result});
    window.socket.on("upload",(data)=>{
      this.setState({uploadedImg:data});
      window.socket.off("upload");
    })
  }, false);
  if (file) reader.readAsDataURL(file);
}

delExQ(){
  Storer("content_item", this, {id:this.Qediting.id}, "delete");
  delete this.state.exq ;
  this.Qediting = {};
  this.router('AdminExamQu')
}
addExQ(){
  let ratio = this.refs._ratio.getValue();
  let name = this.refs._name.getValue();
  let ord = this.refs._ord.getValue();
  let answer = this.refs._answer.getValue();
  let options = this.refs._options.getValue();

  if (!this.Qediting.id) {
    if(this.state.uploadedImg) name = this.state.uploadedImg;
    Storer("user_file", this, {name,telFile:name,gapFile:name,_user_file_type:4}, "insert");
    Storer("content_item", this, {ord,ratio,answer,options,_content:this.editing.id,_user_file:'{(select max(id) as _user_file from user_file)}'}, "insert");

  }else{
    let {id,_user_file} = this.Qediting;
    if(this.state.uploadedImg) Storer("user_file", this, {name:this.state.uploadedImg,telFile:name,gapFile:name,0:{id:_user_file}}, "update");
    Storer("content_item", this, {ord,ratio,answer,options,0:{id}}, "update");
  }
  delete this.state.exq ;
  this.Qediting = {};
  this.router('AdminExamQu')
}

AdminExamQu(){
  let cols = "content_item.id,ord,_user_file,user_file.name as path,answer,options,ratio,telFile,gapFile";
  let {id} = this.editing;
  if(!this.state.exq) {Storer({exq:{from :"content_item",cols,store:true,refresh:true,0:{_content:id},join:"user_file",joinMode:"left"}}, this); return null} else{
  this.Qediting = {};
  return <Container {...this.MainProps2} >
  <Grid  store={this.state.exqStore}  shadow cls="x-round" plugins={{ gridpagingtoolbar: true          }}>
  <TitleBar title={"مدیریت سوالات "} docked="top" ui="titlebar-search" cls="x-round">
        <Icon name="check-square-o" align="left" />
        <Button {...this.BProps}  text="سوال جدید" iconCls="x-fa fa-plus-square" ui="alt round" shadow margin="5"
         align="right" handler={() => {this.Qediting = {};delete this.state.exqeditor;delete this.state.uploadedImg ;this.router('newExQ')}} width={150} flex="3"/>
        <Button {...this.BProps}  iconCls="x-fa fa-refresh" ui="alt round" shadow margin="5"
         align="right" handler={() => {delete this.state.exq ; this.router('AdminExamQu')}} width={60} />
         <Button {...this.BProps}  iconCls="x-fa fa-arrow-left" ui="alt round" shadow margin="5"
         align="right" handler={() => {delete this.state.adcontent ;this.router('AdminQuestions')}} width={60} />
      </TitleBar>
    <Column text="ویرایش" dataIndex="id" width="120" renderer={this.MyExamsqueskey.bind(this)} />
    <Column text="ترتیب" flex="1" dataIndex="ord" align="center" />
    <Column text="سوال" flex="1" dataIndex="path" align="center" renderer={this.qimage.bind(this)} />
    <Column text="آدرس" flex="1" dataIndex="path" align="center" />
    {/* <Column text="تلگرام" flex="1" dataIndex="telegramFile" align="center" /> */}
    <Column text="پاسخ" flex="1" dataIndex="answer" align="center"  />
    <Column text= "گزینه ها" flex="1" dataIndex="options" align="center" />
    <Column text= "بارم" flex="1" dataIndex="ratio" align="center" />

  </Grid>
  </Container>
 }
}
qimage = (v,a) =>{
return <Image src={v} mode='img' height="160"  width="120"/>
}
MyExamsqueskey = (v,a) =>{
 // let {id}  = this.editing;
  let {id,_user_file} = a.data;
 return <Button {...this.BProps2} text="ویرایش" iconCls={"x-fa fa-pencil"} ui={"action round"} 
 handler={()=>{this.Qediting ={id,_user_file};delete this.state.exqeditor;delete this.state.uploadedImg ; this.router("newExQ")}}/>
}
////////////////////////////////////////////////////
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
    cls: 'rtl',
    shadow: true,
    cls: ' x-round',
    layout: { type: 'vbox', pack: 'center', align: 'strech' },
    //margin: '5',
    scrollable: true,
    ref: 'mainPage',
    padding: '20',
    style: {
      maxWidth: "800px",
      minWidth: "320px"
    }
  };
  MainProps2 = {
    cls: 'rtl',
    cls: ' x-round',
    layout: "fit",
    margin: '5',
    scrollable: true,
    ref: 'mainPage',

  };
  TProps = {
    height: '40',
    shadow: true,
    cls: 'rtl x-round searchpage x-round',
    margin: '5',
    textAlign: 'center',
    labelTextAlign: "center",
    width:"100%"
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
}
