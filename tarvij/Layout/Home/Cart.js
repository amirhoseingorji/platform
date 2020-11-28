import React, {Component} from 'react';
import {  Container,  Image,  SegmentedButton,  Button,  TextField} from '@sencha/ext-modern';
import PerfectScrollbar from 'perfect-scrollbar';
import Procces from './Procces';
import FooterTab from './User/FooterTab';
import {Title,Icon} from '../../Componnet/*';
import Storer from '../../Store/Storer';
Ext.require('Ext.MessageBox');
export default class Cart extends Component {
  state = {
    sum: 0,
    confirm: false,
    postPrice: 0,
    offPrice: 0,
  };
  query(){
    let query={};
    let searchVal  = decodeURIComponent(this.props.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); query[e[0]] = e[1]; });
    return query;
  }
  pather = (path) => {
    this.props.history.push(path);
  }
  tonewFactor(){
    Ext.Msg.confirm("تایید", "بعد از صدور فاکتور امکان تغییر در سبد خرید موجود نیست. آیا سبد خرید شما فاکتور شود?",(st)=>this.newfac(st));
    
  }
  newfac(st){
    let {_user_factor} = window.userData; 
    if(st=="yes") {
      Storer("user_factor", this, {title:"سبد خرید"}, "insert");
      window.socket.emit("refresh")
    }
    this.pather("/Factor?id="+_user_factor)
  }
  pay(){
    let {_user_factor} = window.userData; 
    window.socket.emit("pay",this.remind,window.location.href,_user_factor);
    window.socket.on("paylink",link=>{window.location.href = link});
  }
  componentWillMount () {
    let {_user_factor} = window.userData; 
   // window.socket.emit("updateFactor",[_user_factor])
    Storer ({usercart: {from:"user_factor_cart",cols:"id,_movies,target,price,count",0:{_user_factor}}},this);
  }
  componentDidMount () {
    //new PerfectScrollbar (this.refs.mainPage.el.dom.firstChild);
  }
  upcount(id,i,diff,st=false){
    if(this.state.usercart[i].count + diff > 0) {
      this.state.usercart[i].count += diff;
      this.setState(this.state);
      Storer("user_factor_cart", this, { 0:{id},count: this.state.usercart[i].count }, "update");
    }else if(st==false){
      Ext.Msg.confirm("تایید", "آیا این فیلم از سبد خرید شما حذف شود?",(st)=>this.upcount(id,i,diff,st));
    }else if(st=="yes"){
      Storer("user_factor_cart", this, {id}, "delete");
      let {_user_factor} = window.userData
      Storer({ user_factor_cart: {0:{_user_factor}} },Ext.platformTags.phone?window.Header:window.MainMenu);
      (window._footer && !Ext.platformTags.phone) &&  Storer({ user_factor_cart: {0:{_user_factor}} },window._footer);
      this.state.usercart.splice(i,1);
      this.setState(this.state);
    }
  }
  cartItemTpl = (data,i) => {
    return (<Container layout={{ type: 'hbox', pack: 'end' }} shadow cls="x-round" width="100%" key={data.id}    >
      {/* <Image src={data.src} height="100" mode="img" /> */}
      
      <Container layout={{type:"hbox",align: 'left'}} margin="0 10" flex="1" docked={Ext.platformTags.phone?"top":"left"} > 
      <Icon name={data.count==1?"film":"tv"} size="28" />
        <Title  text={data.target} sub={data.count==1?"لینک شخصی":("اکران برای"+data.count+" نفر")}  />
      </Container>
      <Container layout="center" height="45" width="150" style={{fontSize:"large",fontWeight:"bold"}}>
          {(data.price||1000) + ' تومان'}
        </Container>
      
      <Container margin="10 0 0 0" >
        <SegmentedButton cls="ltr" height="45" >
          <Button text="-" ui="round action" handler={()=>this.upcount(data.id,i,-1)} />
          <Button cls="rtl" text={ data.count +" نفر"} ui="round action" disabled />
          <Button text="+" ui="round action" handler={()=>this.upcount(data.id,i,1)}/>
        </SegmentedButton>

      </Container>
    </Container>
  );
    }
  render = () => {
    let {usercart, sum, confirm, postPrice, offPrice,credit} = this.state;
    sum = postPrice+offPrice;
    credit = credit||0;
    let {_user_factor} = window.userData; 
    for (let row of usercart) sum =sum*1+ (row.price||1000) * (row.count*1);
    let remind = Math.max(0,sum-credit);
    this.remind = remind;
    let {status} = this.query()
    return (
      <Container scrollable>
        {!confirm
          ? <Container cls="rtl" layout={{type:"vbox" ,align:"center"}} margin="5" ref="mainPage">
              <Title text="سبد خرید " icon="shopping-cart" />
              <Container width="100%" cls="searchpage">
              {status=="error"?<Container style={{color:"red",backgroundColor:"#555555"}} cls="x-round"> <center><b>تراکنش شما با خطا مواجه شده است ، لطفا دوباره اقدام نمایید</b></center></Container>:null}
              {usercart.length?usercart.map ((e,i) => this.cartItemTpl (e,i)):
              
              <center><b>
                
                هیچ محصولی در سبد خرید شما موجود  نیست .</b></center>
              }
              </Container>
              <hr/>
              <Container style={{maxWidth:"800px"}}  >
              {/* <Container {...this.rowProps}>
                <b>آدرس دریافت محصول </b>
                <Button iconCls="x-fa fa-pin" text="ثبت آدرس" ui="round action" />
                <b>آدرس پیشفرض</b> 
                </Container> */}
              {/* <Container {...this.rowProps}>
                <b>شیوه دریافت محصول </b>
                <SegmentedButton cls="ltr" height="40" margin="0 20">
                  <Button text="پیک" ui="round action" pressed />
                  <Button text="پست" ui="round action" />
                  <Button text="باربری" ui="round action" />
                </SegmentedButton>
                <Container layout="center" height="45">
                 <b>{ (postPrice?postPrice + ' تومان':"هزینه حمل  در محل ")}</b> 
                </Container>
              </Container> */}

            <Container {...this.rowProps}>
              <b>مجموع سبد خرید شما </b>
              <b>{sum + ' تومان  '}</b> 
              </Container>
              <Container {...this.rowProps}>
              <b>ثبت کد تخفیف</b>
              <Container layout={{ type: 'hbox', pack: 'center', align: 'center' } } margin="0 20">
                <TextField ui="" width="100"  />
                <Button  ui="round action" iconCls="x-fa fa-check" />
              </Container>
              <Container layout="center" height="45">
                {offPrice + ' تومان'}
              </Container>
            </Container>
              <Container {...this.rowProps}>
              <b>اعتبار / موجودی شما </b>
                { credit+ ' تومان  '}
              </Container>
              <hr/>
              <Container {...this.rowProps}>
              <b>مبلغ قابل پرداخت </b>
              <b>{remind + ' تومان  '}</b> 
              </Container>
              </Container>
              <Container                layout={{type: 'vbox', pack: 'center', align: 'center'}}              >
              <Button disabled ={remind==0} {...this.Bprops} text=" پرداخت مستقیم " iconCls="x-fa fa-check-circle" handler={() => this.pay()} />
              <Button disabled ={usercart.length==0} {...this.Bprops} text="ثبت پیش فاکتور " iconCls="x-fa fa-file" handler={() => this.tonewFactor()} />
            </Container>
            </Container>
          : <Container cls="rtl" layout={{ type: 'vbox', align: Ext.platformTags.phone ? 'strech' : 'center', pack: 'start' }} margin="5" scrollable ref="mainPage" >
            <Procces route={'Login'} />
          </Container>}
        <FooterTab {...this.props} />
      </Container>
    );
  };
  rowProps = {
    layout: {type: 'hbox', pack: 'space-between', align: 'center'},
    cls: 'x-round',
    shadow: true,
    height: 50,
    style: {backgroundColor: '#ffb7a1'},
  };
  Bprops = {
    width:300,
    ui:"action round",
    shadow:true,
    margin:5
  }
}
