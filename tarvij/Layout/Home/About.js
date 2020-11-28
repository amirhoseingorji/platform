import React, { Component } from 'react';
import { Container, Image,SegmentedButton,Button } from '@sencha/ext-modern';
import { MapField, Advertise, Title, CommentsForm } from '../../Componnet/*';
import Storer from "../../Store/Storer"
//statics
import logo from '../../Statics/Images/logo.png';
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
      about: { from: "user_info", cols: "description,mobile,email" },
      aboutadress: { from: "user_addres", cols: "text,position" },
    }, this);
  }
  
  render() {
    let { about, aboutadress } = this.state
    about = about[0] || {}
    aboutadress = aboutadress[0] || {position:"35.7023001,51.4022398"}
    
    return <Container padding="10" cls="ltr" scrollable >
      <Container cls="rtl" margin={Ext.platformTags.phone?10:30}>
        <Title icon="info" text="درباره پرتال چهره به چهره" style={{fontSize:"18px"}} />
        <br/>
        <Container layout="hbox" >
        {/* <Container flex={2} ><div style={{fontSize:"18px",    "textAlign": "justify",lineHeight:"32px",color:"#555555"}} dangerouslySetInnerHTML={{ __html: about.text }} /></Container> */}
        <Image src={logo}  flex={1}  mod='img' height="170"  />

        </Container>
  
    
        {/* <center>
        <SegmentedButton cls="ltr" width="300" >
                                    <Button text="-" ui="round action" handler={() => this.upcount(-1)} />
                                    <Button ref="donatbtn" cls="rtl" text={"حمایت مالی " + this.donate * 50000 + " تومان"} ui="round action" iconCls="x-fa fa-heart" pressed handler={() => this.donation(this.donate * 1000,0)} />
                                    <Button text="+" ui="round action" handler={() => this.upcount(1)} />
                                </SegmentedButton></center> */}
                                {/* <br/>
                                <br/> */}

<div  style={{fontSize:"17px", "textAlign": "justify",padding:"18px",lineHeight:"32px",color:"#555555"}} >
طرح تربیتی چهره‌به‌چهره که از سال 1380 با پیشنهاد حجت‌الاسلام والمسلمین قرائتی و تائید و رهنمود مقام معظم رهبری(مدظله‌العالی) از شهر تهران آغاز گردید.
   با تعامل صورت گرفته از سوی وزارت فرهنگ و ارشاد اسلامی با استاد قرائتی و حمایت مالی و اجرایی این وزارتخانه از اجرای طرح، در سال 1386 و در اولین اقدام طرح از استان تهران به 12 استان مرزی کشور گسترش پیدا کرد و پس از گذشت   17 سال هم اکنون در 30 استان و 2 منطقه در حال اجرا می‌باشد.
   شیوه اجرای کار در این طرح بدین‌شکل می‌باشد که پس از ارتباط‌گیری با کانون‌های فرهنگی مساجد استان، شهر، ائمه جمعه و جماعات، مراکز فرهنگی و حوزه‌های علمیه در هر استان نسبت به شناسایی جوانان فعال و علاقه‌مند جهت فعالیت در عرصه فرهنگی تحت عنوان مربی تربیتی اقدام می‌گردد.
    پس از توجیه و آموزش‌های اولیه مربیان این عزیزان اقدام به جذب نوجوانان، راه‌اندازی و تشکیل جلسات تربیتی با حضور متربیان خود از مقطع سنی 9 تا 18 سال و میانگین هر حلقه 15 نفر می‌نمایند که به طور متوسط هفته‌ای یک جلسه یک ساعته در طول سه سال بصورت مداوم با این متربیان ارتباط خواهند داشت.
   در این حلقه‌ها علاوه بر فضایی جذاب، شاداب، آزاد و متنوع، مربیان به پاسخ‌گویی به پرسش‌ها، شبهات و دغدغه‌های متداول متربیان پرداخته و در بخش دیگر آموزش‌های اولیه از قبیل قرآن- اصول اعتقادی- اخلاق- احکام- مسائل فرهنگی و اجتماعی را به مخاطبین خود ارائه می‌دهند. این آموزش‌ها کاملا در فضایی دو طرفه و به صورت مباحثه‌ای و مشارکتی می‌باشد.
   انجام فعالیت‌های گروهی ورزشی، هنری، قرآنی، اردو، سرگرمی و مسابقات نیز از مهم‌ترین عوامل محرک برای جذب و تثبیت متربیان می‌باشد.

   <br/><br/>
   <center>اقدامات انجام شده در یک نگاه</center>
   <center>
   <table className="aboutTable"  width="100%" cellPadding={0}  cellSpacing={0} style={{border:"2px solid #555",fontSize:"12px", "textAlign": "center",lineHeight:"8px",color:"#000000"}} >
<tbody>
<tr>
<td width="81">
<p><strong>سال</strong></p>
</td>
<td width="90">
<p><strong>تعداد استان</strong></p>
</td>
<td width="89">
<p><strong>تعداد منطقه</strong></p>
</td>
<td width="123">
<p><strong>تعداد حلقه تربیتی</strong></p>
</td>
<td width="82">
<p><strong>تعداد مربی</strong></p>
</td>
<td width="88">
<p><strong>تعداد متربی</strong></p>
</td>
<td width="80">
<p><strong>تعداد شهر</strong></p>
</td>
</tr>
<tr>
<td width="81">
<p><strong>1386</strong></p>
</td>
<td width="90">
<p>13</p>
</td>
<td width="89">
<p>---</p>
</td>
<td width="123">
<p>520</p>
</td>
<td width="82">
<p>400</p>
</td>
<td width="88">
<p>6200</p>
</td>
<td width="80">
<p>40</p>
</td>
</tr>
<tr>
<td width="81">
<p><strong>1387</strong></p>
</td>
<td width="90">
<p>17</p>
</td>
<td width="89">
<p>---</p>
</td>
<td width="123">
<p>680</p>
</td>
<td width="82">
<p>600</p>
</td>
<td width="88">
<p>8100</p>
</td>
<td width="80">
<p>70</p>
</td>
</tr>
<tr>
<td width="81">
<p><strong>1388</strong></p>
</td>
<td width="90">
<p>17</p>
</td>
<td width="89">
<p>---</p>
</td>
<td width="123">
<p>1000</p>
</td>
<td width="82">
<p>800</p>
</td>
<td width="88">
<p>12200</p>
</td>
<td width="80">
<p>70</p>
</td>
</tr>
<tr>
<td width="81">
<p><strong>1389</strong></p>
</td>
<td width="90">
<p>21</p>
</td>
<td width="89">
<p>23</p>
</td>
<td width="123">
<p>1380</p>
</td>
<td width="82">
<p>1100</p>
</td>
<td width="88">
<p>16500</p>
</td>
<td width="80">
<p>140</p>
</td>
</tr>
<tr>
<td width="81">
<p><strong>1390 </strong></p>
</td>
<td width="90">
<p>26</p>
</td>
<td width="89">
<p>29</p>
</td>
<td width="123">
<p>1740</p>
</td>
<td width="82">
<p>1500</p>
</td>
<td width="88">
<p>20800</p>
</td>
<td width="80">
<p>190</p>
</td>
</tr>
<tr>
<td width="81">
<p><strong>1391</strong></p>
</td>
<td width="90">
<p>26</p>
</td>
<td width="89">
<p>30</p>
</td>
<td width="123">
<p>1740</p>
</td>
<td width="82">
<p>1500</p>
</td>
<td width="88">
<p>20800</p>
</td>
<td width="80">
<p>190</p>
</td>
</tr>
<tr>
<td width="81">
<p><strong>1392</strong></p>
</td>
<td width="90">
<p>29</p>
</td>
<td width="89">
<p>33</p>
</td>
<td width="123">
<p>2160</p>
</td>
<td width="82">
<p>2050</p>
</td>
<td width="88">
<p>25900</p>
</td>
<td width="80">
<p>250</p>
</td>
</tr>
<tr>
<td width="81">
<p><strong>1393</strong></p>
</td>
<td width="90">
<p>30</p>
</td>
<td width="89">
<p>34</p>
</td>
<td width="123">
<p>2118</p>
</td>
<td width="82">
<p>2000</p>
</td>
<td width="88">
<p>25700</p>
</td>
<td width="80">
<p>260</p>
</td>
</tr>
<tr>
<td width="81">
<p><strong>1394</strong></p>
</td>
<td width="90">
<p>30</p>
</td>
<td width="89">
<p>34</p>
</td>
<td width="123">
<p>2032</p>
</td>
<td width="82">
<p>2000</p>
</td>
<td width="88">
<p>24000</p>
</td>
<td width="80">
<p>255</p>
</td>
</tr>
<tr>
<td width="81">
<p><strong>1395</strong></p>
</td>
<td width="90">
<p>30</p>
</td>
<td width="89">
<p>33</p>
</td>
<td width="123">
<p>2000</p>
</td>
<td width="82">
<p>1900</p>
</td>
<td width="88">
<p>23000</p>
</td>
<td width="80">
<p>245</p>
</td>
</tr>
<tr>
<td width="81">
<p><strong>1396</strong></p>
</td>
<td width="90">
<p>30</p>
</td>
<td width="89">
<p>33</p>
</td>
<td width="123">
<p>1250</p>
</td>
<td width="82">
<p>1200</p>
</td>
<td width="88">
<p>14375</p>
</td>
<td width="80">
<p>245</p>
</td>
</tr>
<tr>
<td width="81">
<p><strong>1397</strong></p>
</td>
<td width="90">
<p>30</p>
</td>
<td width="89">
<p>32</p>
</td>
<td width="123">
<p>1250</p>
</td>
<td width="82">
<p>1200</p>
</td>
<td width="88">
<p>14375</p>
</td>
<td width="80">
<p>245</p>
</td>
</tr>
<tr>
<td width="81">
<p><strong>1398</strong></p>
</td>
<td width="90">
<p>30</p>
</td>
<td width="89">
<p>32</p>
</td>
<td width="123">
<p>1250</p>
</td>
<td width="82">
<p>1200</p>
</td>
<td width="88">
<p>14375</p>
</td>
<td width="80">
<p>245</p>
</td>
</tr>
</tbody>
</table></center>
<br/>
<ul>
  <li>	ارائه آموزش‌های منظم ماهانه و فصلی در قالب آموزش‌های استانی، منطقه‌ای و کشوری برای مربیان طرح با عناوینی مهارت‌های چندگانه ارتباطی و سبک زندگی مهدویت- جنگ نرم فرصت‌ها و و تهدیدها- اصول اعتقادی روانشناسی تربیتی- فرق و ادیان- اخلاق اسلامی و احکام و ... .</li>
  <li> 	نظارت و بازدید مستمر از حلقه‌ها در طول سال توسط ناظرین استانی و کشوری. </li>
  <li>	تولید محتوای علمی، آموزشی و تبلیغی براساس اهداف، رویکردهای طرح و نیاز مربیان و متربیان با عناوین کتاب کار دعوت، مجله دعوت، راه‌اندازی سایت ، تولید نرم افزارهای آموزشی</li>
  <li>	برگزاری اردوهای یک روزه برای تمامی حلقه‌های تربیتی با برنامه های آموزشی- علمی و تفریحی.</li>
  <li> حمایت مالی مستقیم از مربیان برای تهیه جوائز و هزینه‌های پذیرایی  و اردویی در حلقه‌های تربیتی.</li>
</ul>

</div>

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
            <MapField  markers={[aboutadress.position.split(",")]} />
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
