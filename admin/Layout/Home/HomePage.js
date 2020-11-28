import React, { Component } from 'react';
import { Container,Button,Image,Video} from '@sencha/ext-modern';
import  {Carousel} from 'react-responsive-carousel';
import { Vitrin, MapField,Title,ImageMap, Advertise } from '../../Componnet/*';
// import ReactTooltip from 'react-tooltip';
import PerfectScrollbar from "perfect-scrollbar";
import Storer from "../../Store/Storer"
import blueback from "../../Statics/Images/blueback.png"
import Madgray from '../../Statics/Images/Madgray.png';
import top from '../../Statics/Images/top.png';
import Logo from '../../Statics/Images/logo.png';
export default class HomePage extends Component {
  componentWillMount(){
    let cols="id,title as text,src,price,ago,`like`,dislike";
    Storer({
      about: { from: "user_info", cols: "mobile,email" },
      aboutadress: { from: "user_addres", cols: "text,position" },
      carousel:{0:{pid:1}},
      games:{from:"product",cols,num:10,order:"date",0:{type:"game"}},
      exams:{from:"product",cols,num:10,order:"date",0:{type:"exam",pid:0}},
      matches:{from:"product",cols,num:10,order:"date",0:{type:"match",pid:0}},
      contents:{from:"product",cols,num:10,order:"date",0:{type:"content",pid:0}},
    },this);
  }
  componentDidMount() {
    //new PerfectScrollbar(this.refs.homePage.el.dom.firstChild);
  //  this.int= setInterval(()=>{
  //  //if(this.refs.Carousel.getActiveIndex() == this.state.carousel.length-1) this.refs.Carousel.setActiveItem(0); else       this.refs.Carousel.next() ;
  // },5000)
  }
  componentWillUnmount(){
    //clearInterval(this.int)
  }

  render=()=> {
    let {carousel} = this.state
    let { about, aboutadress } = this.state
    about = about[0] || {}
    aboutadress = aboutadress[0] || {position:"35.7009,51.4001515"}
    console.log({ about, aboutadress })
    return <Container layout={{ type: 'vbox' }} padding="0px" scrollable ref='homePage'  >
              <Container style={{color:"#bbb",  backgroundImage:"url("+top+")",backgroundSize:"cover",backgroundRepeat:"no-repeat"}} layout="hbox" margin="0" padding="10 30" cls="rtl" >
          
          <Container   flex={1} padding="10" style={{fontSize:"20px"}}> 
        <Container {...this.searchProps} style={{color:"#fff",fontSize:"17px"}} padding="90 280" layout="center">
         
        <h1> راوینو ،        روایتگر دنیایی نو
</h1>
<br/> 
<div>
{"ما روایتگر دنیای جدیدی از واقعیت مجازی هستیم. تیمی متخصص که سعی دارد جهان شما را دگرگون کند؛ آنچه بدان می‌اندیشید، برای شما رخ خواهد داد..."}
  </div>
<br/> 
<Container layout="hbox">
  <Button text="بیشتر آشنا شوید" ui="action round" floating border margin="10"/><Button margin="10" style={{border:"solid 1px #fff"} }text="تماس باما" ui="confirm round" floating border/>
</Container>

<br/>

        </Container>
          </Container>
         
      </Container> 
      
      {/* <ReactTooltip /> */}
      {/* <Carousel ref="Carousel" arrows cls="ltr " margin={0} height='360' padding="0" activeItem={this.state.carousel.length-1} style={{padding:"0"}}  >
        {carousel.map((e, i) => {
          let _area = [];
          for (let a of carousel_area) if (a._carousel == e.id) _area.push(a);
          return <ImageMap  src={e.src} {...this.props} area={_area} key={i} id={e.href} continue="Movies" itemName="Movie"/>
        })}
      </Carousel> */}

      
      {/* <Vitrin ref="games" itemName="Game" showAll="Games" {...this.Vprops} title=" بازی های جدید" icon="gamepad" continue="Game"  minWidth="260"  height="160" round infinite arrows/> */}
      {/* <Vitrin ref="exams" itemName="Exam" showAll="Exams" {...this.Vprops} title=" آزمون ها" icon="check-square-o" continue="Exam"  minWidth="200"  height="150" round arrows /> */}
      <Container layout="hbox" margin={30} cls="rtl">
        <Container {...this.bxprops}  >
        <Title icon="globe" text="فناوری 360 درجه" style={{fontSize:"15px"}} sub="تولید ویدئو 360 درجه به همراه ارائه زیرساخت های فنی و تجهیزاتی مناسب جهت انتشار"/>
        </Container>
        <Container {...this.bxprops} >
        <Title icon="object-group" text="واقعیت ترکیبی" style={{fontSize:"15px"}} sub="طراحی و تولید محتوای عینک‌های هوشمند واقعیت ترکیبی نظیر هولولنز و مجیک لیپ"/>
        </Container>
        <Container {...this.bxprops}  >
        <Title icon="delicious x-fab" text="واقعیت مجازی" style={{fontSize:"15px"}} sub="طراحی و تولید نرم افزارهای واقعیت مجازی مبتنی بر عینک‌های اکولوس و سامسونگ و..."/>
        </Container>
        <Container {...this.bxprops} >
        <Title icon="plus-square" text="واقعیت افزوده" style={{fontSize:"15px"}} sub="طراحی و تولید نرم افزار‌های واقعیت افزوده با کارکردهای خدماتی، آموزشی و تبلیغاتی و ..."/>
          </Container>
      </Container>
      <br/>
      <Vitrin ref="contents" itemName="Content" showAll="Contents" {...this.Bprops} title="آخرین نمونه ها" icon="newspaper-o" continue="contents" minWidth="200"  height="150" />
      <br/>
      <Container style={{color:"#ffffff",backgroundColor:"#0099cc",backgroundImage:"url("+blueback+")",backgroundSize:"contain",backgroundRepeat:"no-repeat"}} layout="hbox" margin="0" padding="10 30" cls="rtl" width="100%" >
          
          {!Ext.platformTags.phone && <Container   padding="30" style={{fontSize:"20px",textAlign:"left"}}> 
          با راوینو دنیایی نو را روایت می کنیم .... :)
          </Container>}
      </Container> 
      {/* <Vitrin ref="matches" itemName="Match" showAll="Matches" {...this.Vprops} title="مسابقات" icon="flag-checkered"  continue="Match"  minWidth="260"  height="160" round arrows/> */}
      <Container layout="hbox" margin={20} cls="rtl">
           <Container flex={3} margin={40}>
        
        <h2>جور دیگر باید دید !</h2>
        <div style={{fontSize:"20px", textAlign: "justify"}}>
        تکنولوژی های ارتباطاتی به سرعت رشد می کنن و دنیای اطراف ما رو تغییر میدن. دنیایی که هر روز کلی تغییر جدید و اتفاق نو داره. تو این تغییر البته نگاه ما هم به دنیا داره عوض می شه. مثل اینکه واقعیت جدیدی داره ساخته می شه. واقعیتی که برای دیدنش باید عینکمون رو عوض کنیم!
        </div>
        </Container> 
        <Video width="540" height="304"  loop url={["https://ravino.ir/wp-content/uploads/2019/04/motionG.mp4"]} posterUrl={"https://ravino.ir/wp-content/uploads/2019/04/pngplay.png"}  />

        </Container>
        <Container style={{color:"#666666",backgroundColor:"#eeeeee",borderRadius:"10px"}} layout="hbox" margin="10" padding="10 30" cls="rtl" >
          
          {!Ext.platformTags.phone && <Container   flex={1} padding="10" style={{fontSize:"20px",textAlign:"right"}}> 
          برای کسب و کارتان نیاز به مشاوره دارید؟
          </Container>}
          <Button text="باما در ارتباط باشید" ui="action round" floating/>
      </Container> 


      <br/>
      {/* <Vitrin ref="contents" itemName="Content" showAll="Contents" {...this.Bprops} title="محتوا های آموزشی" icon="newspaper-o" continue="contents" minWidth="200"  height="150" /> */}
      {/* <Vitrin ref="others" itemName="Product" showAll="Products"  {...this.Vprops} title="سایر محصولات" icon={"shopping-bag"} minWidth="260"  height="180" continue="Product"  round arrows/> */}
      <Container style={{color:"#959597",backgroundColor:"#572d81"}} layout="hbox" margin="0" padding="30" cls="rtl" layout="hbox" width="100%">
      <Container layout={{type:"vbox",align:"left"}} width="100%" cls="rtl">
      <Image src={Madgray} mode="img" height={60} />
      <Container layout={Ext.platformTags.phone?"vbox":"hbox"} width="100%">
              <Container flex="2">
                <Title icon="map-marker" text="آدرس" />
                <div >{aboutadress.text ? ("آدرس :" + aboutadress.text||"") :""}</div>
              </Container>
             <Container flex="2"  >
                <Title icon="phone fa-flip-horizontal" text="تماس‌" />
                 <div>{about.mobile ? ("تلفن :" + about.mobile||"") :""}</div>
                 <div>{about.email ? ("ایمیل :" + about.email||"")  :""}</div>
              </Container>
            </Container>
            <br/>
      <h3 className="rtl" style={{margin:0}}> کلیه ی حقوق این پرتال متعلق به مرکز راوینو می باشد  .    </h3>
      </Container> 
      {!Ext.platformTags.phone && <Container layout="fit" height="256" width="256" docked="right" >
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
}