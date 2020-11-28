import React, { Component } from 'react';
import { Container, Image,SegmentedButton,Button } from '@sencha/ext-modern';
import { MapField, Advertise, Title, CommentsForm } from '../../Componnet/*';
import Storer from "../../Store/Storer"
//statics
import logo from '../../Statics/Images/abouus2.png';
export default class About extends Component {
  donate = 1;
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
     // advertise: {},
      about: { from: "user_info", cols: "text,mobile,email" },
      aboutadress: { from: "user_addres", cols: "text,position" },
    }, this);
  }
  
  render() {
    let { about, aboutadress } = this.state
    about = about[0] || {}
    aboutadress = aboutadress[0] || {position:"35.7009,51.4001515"}
    
    return <Container padding="10" cls="ltr" scrollable >
      <Container cls="rtl" margin={30}>
        <Title icon="info" text="درباره راوینو" style={{fontSize:"25px"}} />
        <br/>
        <Container layout="hbox" >
        <Container flex={2} ><div style={{fontSize:"18px",    "textAlign": "justify",lineHeight:"32px",color:"#555555"}} dangerouslySetInnerHTML={{ __html: about.text }} /></Container>
        <Image src={logo}  flex={1}  mod='img'  />

        </Container>
      <br/><br/><br/>
    
   
        <SegmentedButton cls="ltr" width="300" >
                                    <Button text="-" ui="round action" handler={() => this.upcount(-1)} />
                                    <Button ref="donatbtn" cls="rtl" text={"حمایت مالی " + this.donate * 50000 + " تومان"} ui="round action" iconCls="x-fa fa-heart" pressed handler={() => this.donation(this.donate * 1000,0)} />
                                    <Button text="+" ui="round action" handler={() => this.upcount(1)} />
                                </SegmentedButton>
                                <br/>
                                <br/>
                                
        <h2>بیشتر ...</h2>
<div  style={{fontSize:"17px", "textAlign": "justify",padding:"18px",lineHeight:"32px",color:"#555555"}} >تکنولوژی های ارتباطاتی به سرعت رشد می کنن و دنیای اطراف ما رو تغییر می دن. دنیایی که هر روز کلی تغییر جدید و اتفاق نو داره. تو این تغییر البته نگاه ما هم به دنیا داره عوض می شه. مثل اینکه واقعیت جدیدی داره ساخته می شه. واقعیتی که برای دیدنش باید عینکمون رو عوض کنیم!
مرکز تخصصی راوینو با رویکرد ارائه خدمات محتوایی و تولیدی در حوزه واقعیت مجازی در سال 97 آغاز به کار کرد. حوزه بزرگ واقعیت مجازی حالا علاوه بر تکنولوژی VR شامل تکنولوژی های دیگری نظیر AR ( واقعیت افزوده) ، MR (واقعیت ترکیبی) و فناوری 360 درجه هم می شود. با این حوزه خدمات، ما با انگیزه و تخصص کافی پا به میدان گذاشتیم تا مجموعه ای مورد اطمینان و توانمند برای انجام پروژه های شما در این حوزه باشیم.
تشکیل تیم متخصص و با تجربه در این حوزه که البته به خاطر نوظهور بودن این عرصه کار سختی است از اولین دستاوردهای ما و البته از ارزشمندترین آنهاست. در حال حاضر راوینو با بهره گیری از نیروهای جوان، پر انرژی و با دانش به خوبی فرایند های طراحی محتوا، طراحی و انتخاب قالب مناسب، طراحی هنری و مدل سازی و برنامه نویسی و تولید نرم افزار را شکل داده. ما حصل این فرایند ها تولید محصولات با کیفیت و جذاب در حوزه واقعیت مجازی است.
مرکز تخصصی راوینو با این ظرفیت خوب، آماده ارائه خدمات مشاوره، طراحی و تولید نرم افزارهای مبتی بر واقعیت مجازی برای سازمان ها، نهاد ها و افراد است. تماس تلاش ما در این مجموعه ارائه بهترین خدمات با بهترین کیفیت برای ساخت تجربه ای عالی از همکاری با ماست.</div>
<br/><br/>
                                <hr/>
        <Container layout={Ext.platformTags.phone ? "vbox" : "hbox"} cls="ltr">
          <Container layout="vbox" cls="rtl" flex="1">
          
            <Container layout="hbox">
              <Container flex="1">
                <Title icon="map-marker" text="آدرس" />
                {aboutadress.text}
              </Container>
              <Container flex="1" >
              <Title icon="phone fa-flip-horizontal" text="تماس‌" />
                {about.mobile ? ("تلفن :" + about.mobile||"") :""}
                {about.email ? ("ایمیل :" + about.email||"") :""}
              </Container>
            </Container>
            <Container layout="fit" height="250" shadow cls="x-round">
            {/* <MapField  markers={[aboutadress.position.split(",")]} /> */}
            </Container>
          </Container>
          <Container flex="1" cls="rtl">
            <Title icon="comments" text=" تماس با ما" />
            <CommentsForm />
          </Container>
        </Container>
      </Container>
      {/* <Advertise ref={"advertise"} /> */}
    </Container>
  }
}
