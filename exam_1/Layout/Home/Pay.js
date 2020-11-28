import React, { Component } from 'react';
import { Container, Image,SegmentedButton,Button } from '@sencha/ext-modern';
import { MapField, Advertise, Title, CommentsForm } from '../../Componnet/*';
import Storer from "../../Store/Storer"
//statics
import logo from '../../Statics/Images/abouus2.png';
export default class Pay extends Component {
  donate = 1;
  navigate = (path) => {
    this.props.history.push(path);
}
    upcount(n) {
        this.donate = Math.max(1, this.donate + n);
        this.refs.donatbtn.setText("حمایت مالی " + this.donate * 50000 + " تومان")
        this.refs.donatbtn.setPressed(true);
    }
    donation(money, id) {
        window.socket.emit("pay", money, window.location.hostname, id);
        window.socket.on("paylink", link => { window.location.href = link });
    }
  componentWillMount() {
    Storer({
      //about: { from: "pages", cols: "text,title,icon,src" ,0:{name:"Rules"}},
      user_info:{},
     // user_pay:{}
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
  render() {
    let { user_info } = this.state
    //about = about[0] || {}
    let {status} = this.query();
    user_info= user_info[0] || {}
    
    return <Container padding="10" cls="ltr"  >
      <Container cls="rtl" margin={10}>
      <Image src='https://andishmand.ir/wp-content/uploads/2019/07/logo.png' mode='img' width="140" style={{margin:"auto"}} />
    <center > سامانه ثبت نام مدارس موسسه علمی اندیشمند  </center><br/>
        <Title text="پرداخت " style={{fontSize:"16px"}}  parent={this}/>
        <br/>
        <Container layout="vbox" >
{status=="error" && <Container style={{fontSize:"14px", textAlign: "center",lineHeight:"20px" , backgroundColor:"#F8BBD0" ,borderRadius:"5px"}} padding="5px">
  <div>
    خطا
    <br/>
    فرآیند پرداخت تکمیل نشده است 
    <br/>
     درصورت کسر موجودی طبق اعلام بانک تا ۷۲ ساعت مبلغ عودت داده خواهد شد
    </div></Container>}
         <br/>
<Container hidden={window.userData.mode==4} style={{fontSize:"14px", textAlign: "center",lineHeight:"20px" , backgroundColor:"#90CAF9" ,borderRadius:"5px"}} padding="5px">
  <div>
جهت  نهایی نمودن فرآیند ثبت نام و دریافت قرار داد می بایست مبلغ 
&nbsp;
<b>
 ۲۷٫۰۰۰٫۰۰۰ ریال معادل دو میلیون و هفتصد هزار تومان 
 </b>
 &nbsp;
  به عنوان بخش اول هزینه ثبت نام از طریق درگاه پرداخت الکترونیک واریز فرمایید 

در غیر اینصورت ثبت شما در این مرحله متوقف خواهد ماند
<br/>
<br/>
</div>
<div></div>
<Button text="پرداخت"  ui="action round" cls="greenback" height="35"  handler={()=>{
this.pay()
}} />
</Container>
<Container hidden={window.userData.mode!=4} style={{fontSize:"14px", textAlign: "center",lineHeight:"20px" , backgroundColor:"#AED581" ,borderRadius:"5px"}} padding="5px">
  <div>
مبلغ&nbsp;
<b>
 ۲۷٫۰۰۰٫۰۰۰ ریال معادل دو میلیون و هفتصد هزار تومان 
 </b>
 &nbsp;
 توسط شما پرداخت گردیده است
<br/>
<br/>
</div>
<div></div>
<Button text="بازگشت"  ui="action round" cls="greenback" height="35"  handler={()=>{
this.navigate("/")
}} />
</Container>
        </Container>
    
                                


      </Container>
      {/* <Advertise ref={"advertise"} /> */}
    </Container>
  }
}
