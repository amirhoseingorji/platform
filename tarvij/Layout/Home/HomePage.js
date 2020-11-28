import React, { Component } from 'react';
import { Container,Button,Image,Video,TextField,PasswordField,TabBar,Tab,TabPanel} from '@sencha/ext-modern';
import  {Carousel} from 'react-responsive-carousel';
import { Vitrin, MapField,Title,ImageMap, Advertise } from '../../Componnet/*';
// import ReactTooltip from 'react-tooltip';
import PerfectScrollbar from "perfect-scrollbar";
import Storer from "../../Store/Storer"
import Logo from "../../Statics/Images/logo.png"
//import logo from '../Statics/Images/logo.png';
import Madgray from '../../Statics/Images/Madgray.png';
import back from '../../Statics/Images/back.png';
import top from '../../Statics/Images/top.png';
import aye from '../../Statics/Images/aye.png';
import {User,Download,FAQ,About} from "./*"
import moment from 'moment-jalaali'
moment.loadPersian({usePersianDigits: false})
export default class HomePage extends Component {
  componentWillMount(){
    let cols="id,title as text,photo src,0 price,0 ago,`like`,dislike";
    Storer({
      
      about: { from: "user_info", cols: "mobile,email" },
      aboutadress: { from: "user_addres", cols: "text,position" },
      carousel:{0:{pid:1}},
      // games:{from:"product",cols,num:10,order:"date",0:{type:"game"}},
      // exams:{from:"product",cols,num:10,order:"date",0:{type:"exam",pid:0}},
      // matches:{from:"product",cols,num:10,order:"date",0:{type:"match",pid:0}},
      contents:{cols,num:10,order:"date",0:{_contents_type:"1",pid:0}},
    },this);
  }
  componentDidMount() {
    ////new PerfectScrollbar(this.refs.homePage.el.dom.firstChild);
   this.int= setInterval(()=>{
 //  if(this.refs.Carousel.getActiveIndex() == this.state.carousel.length-1) this.refs.Carousel.setActiveItem(0); else       this.refs.Carousel.next() ;
  },5000)
  }
  componentWillUnmount(){
    //clearInterval(this.int)
  }
  login(){
    let username = this.refs.username.cmp.getValue()
    let password = this.refs.password.cmp.getValue()
    this.navigate("/");
    window.socket.emit("fastlogin",username,password)
}
secondTabChange =(th, newTab) =>  {
 // this.navigate(newTab._itemId);
}
search(){
  let search = this.refs.search.getValue()
  if(search){
  this.refs.search.setValue("")
  this.navigate("/Movies?search="+search)
  }
}
navigate(path) {
  if(path.slice(0,4)=="http"){
    window.location.href = path
  }else{
        this.setState({ showAppMenu: false });
  this.props.history.push(path);
  }
}
  render=()=> {
    let {carousel} = this.state
    //console.log({carousel})
    let { about, aboutadress } = this.state
    about = about[0] || {}
    aboutadress = aboutadress[0] || {position:"35.7009,51.4001515"}
    return <Container layout={{ type: 'vbox' }} padding="0px" scrollable ref='homePage'  >
      <Container layout="hbox" cls="rtl">
        <Container  flex={1} >
        <Image src={Logo} {...this.ImageProps} height="120" margin="200 0 0 0"/>
      <Container {...this.MainProps} margin="30 30 10 30">
    

    {/* <TextField {...this.TProps} placeholder="نام کاربری" ref="phone"  value={this.phoneNumber||""}/> */}
    <TextField ref="username" name="username" {...this.TProps} placeholder="نام کاربر" cls="rtl x-round " shadow  onAction={() => { this.login() }} />

    {/* <TextField {...this.TProps} placeholder="رمز عبور" ref="phone"  value={this.phoneNumber||""}/> */}
    <PasswordField ref="password" name="password" {...this.TProps}  placeholder="رمز عبور" cls="rtl x-round " shadow  onAction={() => { this.login() }} />

    <Button {...this.BProps2} text="ورود/عضویت" iconCls="x-fa fa-lock" margin={"5 10 15 0"}  handler={() => { this.login() }}  />
    <Container margin="0 10" layout={{type:"hbox",align:"center"}}>
      <div>
      رمز عبور خود را فراموش کرده اید؟ 
      </div>
     
      <Button  text="کلیک کنید" />
    </Container>
     
    {/* <Button {...this.BProps} text="انصراف " iconCls="x-fa fa-ban" /> */}
  </Container>
  <Container layout={{type:"vbox",align:"center"}} style={{color:"#77be22"}}>
    <h3>
            
       {moment(new Date()).format("امروز  dddd jD jMMMM jYYYY")}
    </h3>
   
  </Container>
  </Container>
      <Container flex="3">
              <Container style={{color:"#bbb"}} layout="vbox" margin="0" padding="50 50 0" cls="rtl" >
          
          <Container   flex={1} padding="10" layout={{align:"center",type:"vbox"}} style={{fontSize:Ext.platformTags.phone?"13px":"20px"}}> 
          <div>
          <div style={{color:"#ff6021",height:"30px"}}>
          وَمَنْ أَحْسَنُ قَوْلًا مِمَّنْ دَعَا إِلَى اللَّهِ وَعَمِلَ صَالِحًا وَقَالَ إِنَّنِي مِنَ الْمُسْلِمِينَ
          </div>

          <div style={{color:"#ffffff",background:"#ff8002",fontSize:"8pt",borderRadius:"5px",padding:"1px",textAlign:"center"}}>
          و كيست خوشگفتارتر از آن كس كه به سوى خدا دعوت نمايد و كار نيك كند و گويد: «من [در برابر خدا] از تسليم‌شدگانم»؟
          </div>
          <div style={{color:"#ff6021",fontSize:"10pt",textAlign:"left",width:"100%"}}>
            فصلت 33
          </div></div>
          {/* <Image src={aye} {...this.logoProps} margin={Ext.platformTags.phone?0:"10"} mode="img" width={Ext.platformTags.phone?"330":"70%"}   /> 
           */}
          <Image src={top} {...this.logoProps} margin={Ext.platformTags.phone?0:"10"} mode="img" width={Ext.platformTags.phone?"330":"100%"}   shadow/> 



          </Container>
          <TabPanel padding="0"  onActiveItemChange={this.secondTabChange.bind(this)} activeTab={window.location.pathname}>
           {/* {_user ? <Tab itemId="/Cart" iconCls="x-fa fa-shopping-cart" cls="x-second-tab" badgeText={this.state.user_factor_cart?this.state.user_factor_cart.length:0} />:null} */}
           <Container itemId="/" iconAlign="left" iconCls="x-fa fa-home" cls="x-second-tab"  title="صفحه نخست">
           <Vitrin ref="contents" itemName="Content" showAll="Contents" {...this.Bprops} title="آخرین اخبار" icon="newspaper-o" continue="contents" minWidth="200"  height="150" />

           </Container>

           <Container itemId="/Download" iconAlign="left" iconCls="x-fa fa-cloud-download" cls="x-second-tab" title="دریافت فایل" >
           <Download/>

           </Container>
           <Container itemId="/FAQ" iconAlign="left" iconCls="x-fa fa-question-circle-o" cls="x-second-tab" title="سوالات متداول" >
           <FAQ/>

           </Container>
           <Container itemId="/User" iconAlign="left" iconCls="x-fa fa-link" cls="x-second-tab"  title="لینک های کاربردی" padding="50">
             <User/>
           </Container>
           <Container itemId="/About" iconAlign="left" iconCls="x-fa fa-info" cls="x-second-tab"  title="درباره ما">
<About/>
             
           </Container>
            {/* <Tab itemId="/News" iconCls="x-fa fa-newspaper-o" cls="x-second-tab" /> */}
          </TabPanel>



          
      </Container> 
{/* <Container style={{color:"#666666",backgroundColor:"#eeeeee",borderRadius:"10px"}} layout={Ext.platformTags.phone?"vbox":"hbox"} margin="10 50" padding="10 30" cls="rtl" docked="bottom">
          
          <Container   flex={1} padding="10" style={{fontSize:Ext.platformTags.phone?"16px":"20px",textAlign:"right"}} > 
         برای کسب اطلاعات بیشتر با ما تماس بگیرید
         </Container>
         <Button text="باما در ارتباط باشید" ui="action round" floating onTap={()=>{this.props.history.push("/About")}}/>
     </Container>  */}

     
    </Container>
</Container>

<Image src={back}  height='0px'/>

<Container style={{color:"#aaaaaa",backgroundColor:"#333333"}} layout="hbox" margin="0" padding="30 30 10 30" cls="rtl" layout="hbox" width="100%" docked="bottom" hidden>
      <Container layout={{type:"vbox",align:"left"}} width="100%" cls="rtl">
      

      <Container layout={Ext.platformTags.phone?"vbox":"vbox"} width="100%" margin="10 0 0 0">
    
              <Container >
                <Title icon="map-marker" text="آدرس" />
                {aboutadress.text ? ("آدرس :" + aboutadress.text||"") :""}
              </Container>
              <br/>
             <Container  >
                <Title icon="phone fa-flip-horizontal" text="تماس‌" />
                {about.mobile ? ("تلفن :" + about.mobile||"") :""}
                {about.email ? ("ایمیل :" + about.email||"") :""}
              </Container>
            </Container>
            <br/>

            <Container docked="bottom">

<center><h4 className="rtl" style={{margin:0}}> کلیه ی حقوق این پرتال متعلق به موسسه ترویج فرهنگ قرآنی می باشد  .    </h4></center>

</Container>
{!Ext.platformTags.phone &&<Image src={Madgray} mode="img" height={Ext.platformTags.phone?80:130} docked={Ext.platformTags.phone?"top":"right"} margin="30"/>}
      </Container> 
      {!Ext.platformTags.phone && <Container layout="fit" height="260" width="300" docked="right" >
         <MapField  markers={[aboutadress.position.split(",")]} />
      </Container>}
      </Container>
    </Container>
  }
  bxprops = {flex:1,margin:8,padding:12,ripple:true,style:{
    borderRadius : "5px",
    backgroundColor :"#ffffff"
  }}
  Vprops = {shadow:false,round:false,...this.props}
  Bprops = {...this.Vprops,style:{color:"#000000"}}
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
      backgroundColor :"#f3f3f3",
      maxWidth: "800px",
      minWidth: "320px"
    }
  };
  TProps = {
    height: '40',
    shadow: false,
    cls: 'rtl x-round searchpage x-round',
    margin: '5',
    textAlign: 'center',
    labelTextAlign: "center",
    width:"100%",
    style: {
      backgroundColor :"#e5e5e5"
    }
  };
  BProps2 = {
    flex: 1,
    ui: "action round",
    shadow: true,
    margin: '5'
  }
}
