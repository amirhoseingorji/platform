import React, { Component } from 'react';
import { Container, Image, SelectField, Button, TextField, PasswordField,Indicator,Toolbar} from '@sencha/ext-modern';
import { Title,Dnd} from '../../Componnet/*';
import Storer from "../../Store/Storer";

//statics
import logo from '../../Statics/Images/logo3.png';
import { json } from 'd3';
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

  phone(){
    if(this.state.sent)  Ext.toast('برای ارسال مجدد باید یک دقیقه صبر نمایید'); else{
    if( this.refs.phone ) {
      this.phoneNumber = this.refs.cmp.phone.getValue(); 
      this.password = this.refs.cmp.PasswordField.getValue(); 
    }
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
 rander(values){
   let rander = []
    for(let val in values) rander.push(val)
    for(let val in values) rander.push(val)
    for(let val in values) rander.push(val)
    this.randers = rander;
    return rander;
 }
  ComparisonProcess = () =>  {
    let {_comparison} = this.query();
    if(!this.state.comparison) {
      Storer({
        comparison_user_value: {cols:"_value,max,min,maxid,minid,bymin,bymax",0:{_comparison}},
        custep:{from:"comparison_user",cols:"id,step,phase",0:{_comparison}},
        value : {cols:"value.id,comparison_value.id as _comparison_value,name,description",join:"comparison_value",0:{status:"1"},1:{_comparison,done:1}},
        subvalue:{from:"value",cols:"id,pid,name",0:{pid:`{in (select _value from comparison_value where done=1 and _comparison = ${_comparison})}`}},
        
        comparison: {cols:"name,description",0:{id:_comparison}}
       
       }, this); 
      return null;
    } else if(!this.state.comparison[0]||!this.state.value[0]||!this.state.subvalue[0]||!this.state.custep[0]) { return null } else{
          let step = this.state.step==undefined ?  this.state.custep[0].step*1:this.state.step
          let phase = this.state.phase==undefined  ? this.state.custep[0].phase*1 : this.state.phase
          
          this.maxstep = this.state.value.length;
          let rander = this.randers || this.rander(this.state.value);
         let items =[];
         let user_values = {_value:-1,max:0,min:0,maxid:0,minid:0,bymin:"{}",bymax:"{}",_comparison_user:this.state.custep[0].id};
         let num =  rander[this.maxstep*phase+step]
         let desc=["ازمیان سنجه های زیر فقط بهترین و بدترین را روی نمودار مشخص نمایید",'با توجه به بهترین سنجه سایر سنجه ها را روی نمودار مشخص نمایید','با توجه به بدترین سنجه سایر سنجه ها را مشخص بفرمایید']
        if(step>=0) {
          for(let it of this.state.subvalue ) if(it.pid == this.state.value[num].id)  items.push(it);
         
          for(let user_value of this.state.comparison_user_value) if(user_value._value  == this.state.value[num].id) user_values = user_value;
          console.log(user_values)
         // for(let user_value of user_values) for(let it of items ) if(it.id==user_value._value) it = {...it,...user_value};
          if(phase==1) {
            for(let it of items) if(it.id == user_values.maxid) {
              var max= it
              it.disabled = true
            }
            for(let it of items) if(it.id == user_values.minid) it.disabled = true;
            var _bymax = (user_values.bymax==""?"{}":user_values.bymax).slice(1,-1).split(",");
            var bymax = [];
            for(let by of _bymax) {
              by  = by.split(":")
              bymax[by[0]]= by[1]
            }

            for(let it of items) it.val = bymax[it.id]||0
          } else if(phase==2) {
          
            for(let it of items) if(it.id == user_values.minid) {
              var min= it
              it.disabled = true
            }
            for(let it of items) if(it.id == user_values.maxid) it.disabled = true;


            var _bymin = (user_values.bymin==""?"{}":user_values.bymin).slice(1,-1).split(",");
            var bymin= [];
            for(let by of _bymin) {
              by  = by.split(":")
              bymin[by[0]]= by[1]
            }
            for(let it of items) it.val = bymin[it.id]||0
          } else{
            for(let it of items) {
              if(user_values.maxid == it.id) it.val = user_values.max
              if(user_values.minid == it.id) it.val = user_values.min
            }
          }
        }
          return <Container padding='5'><h2>{this.state.comparison[0].name}</h2><Container {...this.MainProps}  padding="5">

          <Title icon='money-check-edit' text= { step==-1?"توضیحات":((num*1+1) +this.state.value[num].name) } sub={step==-1?"":desc[phase]}  />
          {/* {this.state.comparison_user[0].id} */}
          <Container padding="5 5" flex={1} width="100%"  height="100%" minHeight={400} layout="vbox" >
            {step>-1 ? 
              <Dnd ref='dnd' num={num} parent={this}  phase ={phase} items={items} max={max} min={min} user_values={user_values} _comparison={_comparison} _value={this.state.value[num].id} _comparison_value = {this.state.value[num]._comparison_value}/> :
              <Container layout='center' height='400' maxWidth='450'>{this.state.comparison[0].description}</Container>
            }
          </Container>
              <Container docked="bottom" layout="hbox">
                <Button {...this.BProps} text="ثبت موقت و بازگشت" handler={this.reExamUser.bind(this)}  flex="1" />
                <Button {...this.BProps} text="ثبت و اتمام ارزیابی" handler={this.saveExamUser.bind(this)} disabled={phase!=2 || step != this.maxstep - 1} flex="1" />
              </Container>
            <Toolbar docked="bottom" layout={{ type: 'hbox', align: 'center', pack: 'space-between' }}>
              <Button
                hidden={step == -1}
                disabled={step == 0}
                text="قبلی"
                ui="round"
                handler={this.previous.bind(this)}
                iconCls="x-fa fa-chevron-right"
              />
              <Indicator
                hidden={Ext.platformTags.phone || step <0}
                count={Math.max(1, this.maxstep)}
                activeIndex={step}
                onNext={this.previous.bind(this)}
                onPrevious={this.next}
                tapMode={"direction"}
              />
              <Button
                disabled={phase==2 && step == this.maxstep - 1}
                text={step>=0 ? (step == this.maxstep - 1 ?(phase==2?"تمام":"فاز بعد"):"بعدی") : "شروع"}
                ui="round"
                handler={this.next.bind(this)}
                iconCls="x-fa fa-chevron-left"
                iconAlign="right"
              />
            </Toolbar>
        </Container></Container>
    }
  }
  previous = () => {
    if(! this.refs.dnd.isdisable) return Ext.toast('لطفا موارد خواسته شده را تکمیل بفرمایید');
    this.refs.dnd.savedestroyer()
    let step = this.state.step==undefined ?  this.state.custep[0].step*1:this.state.step
    let phase = this.state.phase==undefined  ? this.state.custep[0].phase*1 : this.state.phase
    var maxcounter,itemsc;
    do {
    itemsc = 0
    step = Math.max(0,step - 1)
    let rander = this.randers || this.rander(this.state.value);
    let num =  rander[this.maxstep*phase+step]
    for(let it of this.state.subvalue ) if(it.pid == this.state.value[num].id)  itemsc ++
     maxcounter = phase > 0 ? itemsc - 2 : 2
    }while(step>0 && (itemsc < 2 || maxcounter < 1 ))
    this.setState({ step  })
    this.refs.dnd.reset()

}

  next = () => {
    if(this.refs.dnd &&! this.refs.dnd.isdisable) return Ext.toast('لطفا موارد خواسته شده را تکمیل بفرمایید');
    if(this.refs.dnd) this.refs.dnd.savedestroyer()
    let {_comparison} = this.query();
    let step = this.state.step==undefined ?  this.state.custep[0].step*1:this.state.step
    let phase = this.state.phase==undefined  ? this.state.custep[0].phase*1 : this.state.phase
    var maxcounter,itemsc;
    do {
      itemsc = 0
      if (step == this.maxstep -1) phase++,step = -1;
      step = Math.min(step + 1, this.maxstep-1 )
      let rander = this.randers || this.rander(this.state.value);
      let num =  rander[this.maxstep*phase+step]
      for(let it of this.state.subvalue ) if(this.state.value[num] && it.pid == this.state.value[num].id)  itemsc ++
       maxcounter = phase > 0 ? itemsc - 2 : 2
    } while ((itemsc < 2 || maxcounter < 1) && step != this.maxstep -1)
    console.log({ phase, step  })
    if(phase==1 && step==0) {
      Storer({
      comparison_user_value: { cols: "_value,max,min,maxid,minid,bymin,bymax", 0: { _comparison } },
    }, this);
    setTimeout(this.refs.dnd.reset,2000)
    }
    this.setState({ phase, step  })  
    Storer("comparison_user", "", {step,phase,0:{_comparison}},"update");
    this.refs.dnd.reset()
    
    

  }
  saveExamUser(){
    let {_comparison} = this.query();
    Storer("comparison_user", "", {status:1,0:{_comparison}},"update");
    Storer("comparison_user_value", "", {status:1,0:{_comparison}},"update");
    if(this.refs.dnd) this.refs.dnd.savedestroyer()
    this.pather('/Comparison')
  }
  reExamUser(){
    let {_comparison} = this.query();
    Storer("comparison_user", "", {status:2,0:{_comparison}},"update");
   
    if(this.refs.dnd) this.refs.dnd.savedestroyer()
    this.pather('/Comparison')
  }


  Login = () =>  {
    return <Container {...this.MainProps} >
    <Title icon='sign-in' text="ورود " />
    <Container layout={{ type: 'hbox', pack: 'space-around' }}  padding="10">
      {/* <Image src={logo} mode="img" height="30" /> */}
      <Container layout="center" flex="1" padding="0 10">
        لطفا شماره تلفن همراه  و رمز خود را وارد نمایید
      </Container>
    </Container>
    <TextField {...this.TProps} placeholder="09123456789" ref="phone" onAction={this.phone.bind(this)} value={this.phoneNumber||""}/>
    <PasswordField {...this.TProps} placeholder="رمز عبور" ref="PasswordField" onAction={this.passcheck.bind(this)} />
    <Button {...this.BProps} text="ورود" iconCls="x-fa fa-lock" handler={this.passcheck.bind(this)} />
    {/* <Button {...this.BProps} text="انصراف " iconCls="x-fa fa-ban" handler={()=>this.pather("/")} /> */}
  </Container>
  }
  
  passcheck(){
    let password  = this.refs.PasswordField.cmp.getValue() || ""
    let username = this.refs.phone.cmp.getValue() || ""
    window.socket.emit("fastlogin",username,password)
    this.navigate("/");
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
    this.pather('/')
  }
  Info = () =>  {
    if(!this.state.user_info){ Storer({ user_info:{}}, this); return null} else{
    let user_info =  this.state.user_info[0]
    return <Container {...this.MainProps} >
    <Title icon='info-circle' text="تکمیل اطلاعات" />
    <Container layout={{ type: 'hbox', pack: 'space-around' }} width="100%">
      <Image src={logo} mode="img" height="30" />
      <Container layout="center" flex="1">
        لطفا اطلاعات خود را تکمیل بفرمایید
      </Container>
      
    </Container>
    {user_info && <div>
    <SelectField ref="mode" {...this.TProps}  value={user_info.mode||0} options={[{ text: 'کاربر حقیقی', value: 0 }, { text: 'کاربر حقوقی', value: 1 }]} /> 
    <TextField ref="name" {...this.TProps} placeholder="نام" value={user_info.name||""} required />
     <TextField  ref="tel" {...this.TProps}  placeholder="تلفن" value={user_info.tel||""}/>
     <TextField  ref="fax" {...this.TProps} hidden placeholder="فکس" value={user_info.fax||""} /> 
    <TextField ref="email" {...this.TProps} placeholder="ایمیل" value={user_info.email||""}/>
    <Button {...this.BProps} text="تایید  " iconCls="x-fa fa-check" handler={this.saveinfo.bind(this)} />
    </div>}
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
   // margin: 'auto 5',
    scrollable: true,
    ref: 'mainPage',
    padding: '10',
    style: {
      marginLeft:Ext.platformTags.phone?"5px":"auto",
      marginRight:Ext.platformTags.phone?"5px":"auto",
      maxWidth: "800px",
      minWidth: "280px"
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
