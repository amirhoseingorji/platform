import React, { Component } from 'react';
import { Container, Image,SegmentedButton,Button } from '@sencha/ext-modern';
import { MapField, Advertise, Title, CommentsForm } from '../../Componnet/*';
import Storer from "../../Store/Storer"
//statics
import logo from '../../Statics/Images/abouus2.png';
export default class Confirm extends Component {
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
      about: { from: "pages", cols: "text,title,icon,src" ,0:{name:"Rules"}},
      user_info:{}
    }, this);
  }
  
  render() {
    let { about,user_info } = this.state
    about = about[0] || {}
    user_info= user_info[0] || {}
    
    return <Container padding="10" cls="ltr" scrollable >
      <Container cls="rtl" margin={10}>
      <Image src='https://andishmand.ir/wp-content/uploads/2019/07/logo.png' mode='img' width="140" style={{margin:"auto"}} />
    <center > سامانه ثبت نام مدارس موسسه علمی اندیشمند  </center><br/>
        <Title text={about.title} style={{fontSize:"16px"}} parent={this} />
        <br/>
        <Container layout="vbox" >
       <Image src={about.src}  flex={1}  mod='img'  /> 
        <Container flex={2} ><div style={{fontSize:"14px",    "textAlign": "justify",lineHeight:"20px",color:"#555555"}} dangerouslySetInnerHTML={{ __html: about.text }} /></Container>
         
<Container style={{fontSize:"14px", textAlign: "center",lineHeight:"20px" , backgroundColor:"#90CAF9" ,borderRadius:"5px"}} padding="5px">
  <div>
این جانبان
<b>
{" "+user_info.father_name+" "+user_info.father_last_name +" و "+user_info.mother_name+" "+user_info.mother_last_name+" "}</b>
و فرزندمان
<b>{user_info.first_name + " "+ user_info.last_name+" "}</b>

تمام موارد فوق را مطالع نموده  و ضمن تایید صحت پاسخ گویی به سوالات  بدینوسیله رعایت تمامی موارد آن را تایید می نماییم.
<br/>
<br/>
</div>
<Container  hidden={window.userData.mode<=2} >
  <div style={{padding:"3px",color:"#ECEFF1" ,borderRadius:"3px",backgroundColor:"#689F38"}}>شما ضوابط را  پذیرفته اید</div> 
  <br/>
  <Button text="مرحله بعد" hidden={window.userData.mode!=3} ui="action round" height="35" handler={()=>{
this.navigate("/Pay")
}} />
<Button text="بازگشت" hidden={window.userData.mode!=4} ui="action round" height="35" handler={()=>{
this.navigate("/")
}} />
  </Container>
<Button text="تایید" hidden={window.userData.mode>2} ui="action round" height="35" handler={()=>{

  Ext.Msg.confirm("اخطار"," این تایید به منزله امضای فرم قرار داد می باشد\nآیا تایید می فرمایید ",(st)=>{if(st=="yes") {
    Storer("user", this, {mode:3,0:{mode:"2"}}, "update");
this.navigate("/Pay")
  }})
}} />
</Container>
        </Container>
    
                                


      </Container>
      {/* <Advertise ref={"advertise"} /> */}
    </Container>
  }
}
