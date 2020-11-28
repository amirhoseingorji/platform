import React, { Component } from 'react';
import { Container, Image,SegmentedButton,Button } from '@sencha/ext-modern';
import { MapField, Advertise, Title, CommentsForm } from '../../Componnet/*';
import Storer from "../../Store/Storer"
//statics
import logo from '../../Statics/Images/abouus2.png';
import moment from 'moment-jalaali'

moment.loadPersian({usePersianDigits: false})
export default class Print extends Component {
    dstyle= {
        padding :"0 10px",
        backgroundColor:"#FAFAFA",
        border :"1px solid",
        borderRadius :"3px"
    }
  donate = 1;
  navigate = (path) => {
    this.
    props.history.push(path);
}
query(){
  let query={};
  let searchVal  = decodeURIComponent(window.location.search)
  searchVal.slice(1).split('&').map(e => { e = e.split('='); query[e[0]] = e[1]; });
  return query;
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
          user_info:{0:{_user:this.query().id}},
          user_pay:{0:{_user:this.query().id}}
        }, this);
      }
  render() {
    let { about,user_info,user_pay } = this.state
    about = about[0]|| {}
    user_pay = user_pay[0] ||{}
    user_info =  user_info[0]  || {}
   user_info.birthdate = moment(user_info.birthdate||new Date()).format("jYYY/jM/jD")
   let typeoptions=[
    { text: 'دولتی', value: 0 },
    { text: 'غیر دولتی', value: 1 },
    { text: 'شاهد', value: 2 },
    { text: 'هیات امنایی', value: 3 }
  ]
  let degoptions=[
    { text: 'زیردیپلم', value: 0 },
    { text: 'دیپلم', value: 1 },
    { text: 'فوق دیپلم', value: 2 },
    { text: 'کارشناسی', value: 3 },
    { text: 'ارشد', value: 4 },
    { text: 'دکتری', value: 5 }
  ]
  let hopt = [
    { text: 'زندگی با والدین', value: 1 },
    { text: ' زندگی با پدر', value: 2 },
    { text: 'زندگی با مادر', value: 3 },
    { text: 'سایر', value: 4 },
  ]
  let itype = typeoptions[user_info.preType||0].text
  let fdeg = degoptions[user_info.father_degree||0].text
  let mdeg = degoptions[user_info.mother_degree||0].text
  let htype = hopt[user_info.family_type||0].text
    return <Container padding="10" cls="ltr"  scrollable ref={el => (this.componentRef = el)}>
      <Container cls="rtl" margin={10}>
      <Image src='https://andishmand.ir/wp-content/uploads/2019/07/logo.png' mode='img' height="140" style={{margin:"auto"}} />
    <center > سامانه ثبت نام مدارس موسسه علمی اندیشمند  </center><br/>
        <Title text="فرم اولیه   ثبت نام قطعی   مدارس اندیشمند
سال تحصیلی  1400-1399" style={{fontSize:"16px"}} parent={this} />
        <br/>

        <Container layout="vbox" >
            <div style={this.dstyle}>
                <b> <p>مشخصات	دانش آموز</p></b>

                <p>نام : {user_info.first_name} &nbsp;
                 نام خانوادگی : {user_info.last_name} &nbsp;
                {/*تاریخ	تولد:{user_info.birthdate}*/}
                    شماره ملی : {user_info.nationalid} &nbsp;
                </p> 
                 <p>{user_info.mode == 0 && user_info.preSchool ?
                    <sapn>نام مهد کودک : {user_info.preSchool}&nbsp;</sapn> : <sapn>نام مدرسه سال تحصیلی قبل: {user_info.preSchool}&nbsp;</sapn>} 
                
                    منطقه : {user_info.preRegion} &nbsp; شهرستان: {user_info.preCity} &nbsp;
            نوع	مدرسه سال قبل: {itype}
                </p>
            </div>
            <hr/>
<div style={this.dstyle}><b><p>	مشخصات	پدر</p></b>

<p>
	نام: {user_info.father_name} &nbsp;
     نام	خانوادگی:{user_info.father_last_name} &nbsp;
	 میزان	تحصیلات: {fdeg} &nbsp;
	شغل : {user_info.father_job} &nbsp;
       </p>
	<p>
	تلفن همراه: {user_info.father_mobile}&nbsp;
    تلفن محل کار :{user_info.father_tel}&nbsp;
	</p>

</div>


	
<hr/>
<div style={this.dstyle}>
<b><p>مشخصات مادر</p></b>
<p>
	نام: {user_info.mother_name} &nbsp;
     نام	خانوادگی:{user_info.mother_last_name} &nbsp;
	 میزان	تحصیلات: {mdeg} &nbsp;
	شغل : {user_info.mother_job} &nbsp;
       </p>
	<p>
	تلفن همراه: {user_info.mother_mobile}&nbsp;
    تلفن محل کار :{user_info.mother_tel}&nbsp;
	</p>

</div>
<hr/>
<div style={this.dstyle}>
<b><p>آدرس و تلفن منزل</p></b>
<p>
		وضعیت خانواده:{htype}&nbsp;
		 تعداد	اعضای خانواده:{user_info.family_num}&nbsp;
		</p>
		<p>
		آدرس دقیق منزل:{user_info.home_address}&nbsp;
		</p>
		<p>
		تلفن منزل:{user_info.home_tel}&nbsp;	
        تلفن رابط:{user_info.rabet_tel}&nbsp;
        </p>
	
</div>

<hr/>
<div style={this.dstyle}>
<b>
{user_info.service && <p>	متقاضی	سرویس هستید</p>}
{user_info.afterschool && <p>	متقاضی	AFTER	SCHOOL  هستید</p>}
{user_info.boofeh && <p>	متقاضی	نهار بوفه دبستان هستید</p>}
</b>

</div>



        <Container flex={2} ><div style={{fontSize:"14px",    "textAlign": "justify",lineHeight:"20px",color:"#555555"}} dangerouslySetInnerHTML={{ __html: about.text }} />
        
        </Container>
        <Container style={{fontSize:"14px", textAlign: "center",lineHeight:"20px" , backgroundColor:"#90CAF9" ,borderRadius:"5px"}} padding="5px">
  {user_pay.amount>10000 ? <div>
      <br/>
مبلغ 
&nbsp;
<b>
 {user_pay.amount} ریال
 </b>
 &nbsp;
  طی تراکنش موفق  {user_pay.transactionId} بانکی در  {moment(user_pay.date).format("hh:mm jYY/jM/jD")} دریافت و ثبت نام اولیه شما قطعی شد
<br/>
<br/>
</div>: <div>تراکنش بانکی شما ثبت نشده است  </div>}

</Container>

<br/>

<div>

<p>
اینجانب و فرزندم تمام موارد فوق را مطالع نموده ام
و ضمن تایید صحت پاسخ گویی به سوالات 
بدینوسیله رعایت تمامی موارد آن را تایید
می نمایم.</p>
<p style={{float:"left"}}> نام و نام خانوادگی</p>
<br/>
<br/>
<br/>
<p style={{float:"left"}}>امضا</p>

</div>
         
<Container style={{fontSize:"14px", textAlign: "center",lineHeight:"20px" , backgroundColor:"#90CAF9" ,borderRadius:"5px"}} padding="5px">
<Container>لطفا هنگام مراجعه حضوری عکس دانش آموز و اصل و کپی مدارک به همراه این برگه را همراه داشته باشید</Container>
<br/>
<Button text="چاپ"  ui="action round" cls="greenback" height="35" handler={()=>{
    var content = this.componentRef.cmp.el.dom
    console.log(content.innerHTML)
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + window.document.title  + '</title>');
    mywindow.document.write("<link href='https://sabtenam.andishmand.ir/ext/ext.css' rel='stylesheet'><style>@font-face {font-family: 'Yekan';src:  url('https://platform.ravinoserver.ir/fonts/IRANSansWeb.woff?s') format('woff') } body{font-family: 'Yekan'}</style></head>");
    mywindow.document.write('</head><body dir="rtl" >');
    mywindow.document.write(content.innerHTML.slice(0,-1450));
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
setTimeout(()=>{
    mywindow.print();
    mywindow.close();

},1000)

}} />
</Container>

        </Container>
    
                                


      </Container>
      {/* <Advertise ref={"advertise"} /> */}
    </Container>
  }
}
