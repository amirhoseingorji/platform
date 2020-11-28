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
import Logo3 from '../../Statics/Images/logo3.png';
export default class HomePage extends Component {
  componentWillMount(){
    let cols="id,title as text,src,0 price,0 ago,`like`,dislike,link";
    Storer({
      // about: { from: "user_info", cols: "mobile,email" },
      // aboutadress: { from: "user_addres", cols: "text,position" },
      // carousel:{0:{pid:1}},
      pages:{0:{status:"1",id:"<4"}},
      contents:{cols,num:10,order:"date",0:{type:"1"}},
    },this);
  }
  componentDidMount() {
    new PerfectScrollbar(this.refs.homePage.cmp.el.dom.firstChild);
  //  this.int= setInterval(()=>{
  //  //if(this.refs.Carousel.getActiveIndex() == this.state.carousel.length-1) this.refs.Carousel.setActiveItem(0); else       this.refs.Carousel.next() ;
  // },5000)
  }
  componentWillUnmount(){
    //clearInterval(this.int)
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
    return <Container layout={{ type: 'vbox' }} padding="0px" scrollable ref='homePage'  >
              <Container style={{color:"#bbb",  backgroundImage:"url("+top+")",backgroundSize:"cover",backgroundRepeat:"no-repeat"}} layout="hbox" margin="0" padding="10 30" cls="rtl" >
          
          <Container   flex={1} padding="10" style={{fontSize:"20px"}}> 
        <Container {...this.searchProps} style={{color:"#fff",fontSize:"17px"}} padding="20 auto" layout="center">
        <Image src={Logo3}  mode="img" height="100"  onTap={()=>this.navigate("/About")} />
        <h3 style={{textAlign:"center"}}>اندیشکده شفافیت برای ایران
</h3>

<div style={{textAlign:"justify" , lineHeight:"40px"}}>
  {this.state.pages && this.state.pages[0] ?this.state.pages[0].text : null}
  </div>
  {this.state.pages && this.state.pages[0] && this.state.pages[0].src ? <img src={this.state.pages[0].src}  height="100px" width="100%" style={{objectFit: "contain"}} />: null}

<Container layout="hbox">
  <Button text="ورود به سامانه" ui="action round" floating border padding="10" margin='10' handler={()=>this.navigate("/User")}/><Button hidden margin="10" style={{border:"solid 1px #fff"} }text="تماس باما" ui="confirm round" floating border handler={()=>this.navigate("/About")}/>
</Container>


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

      

      <Vitrin ref="contents" itemName="id" showAll="Contents" {...this.Bprops} title="اخبار و  پیام ها" icon="rss" continue="Contents" minWidth="200"  height="150" />
      {/* <br/>
      <Container style={{color:"#ffffff",backgroundColor:"#0099cc",backgroundImage:"url("+blueback+")",backgroundSize:"contain",backgroundRepeat:"no-repeat"}} layout="hbox" margin="0" padding="10 30" cls="rtl" width="100%" >
          
          {!Ext.platformTags.phone && <Container   padding="30" style={{fontSize:"20px",textAlign:"left"}}> 
          با راوینو دنیایی نو را روایت می کنیم .... :)
          </Container>}
      </Container>  */}
       <Vitrin ref="matches" itemName="Match" showAll="Matches" {...this.Vprops} title="راهنمای تصویری" icon="flag-checkered"  continue="Match"  minWidth="260"  height="160" round arrows/> 
      <Container layout={Ext.platformTags.phone?"vbox":"hbox"} margin={20} cls="rtl" > 
      {this.state.pages && this.state.pages[1] ? <Video width="540" height="304"  loop url={[this.state.pages[1].file]} posterUrl={this.state.pages[1].src}  />
      : null} 
<Container flex={1} style={{fontSize:"17px",textAlign:"justify",color:"#546E7A"}} padding='10'>
<div style={{textAlign:"justify" , lineHeight:"30px"}}>
{this.state.pages && this.state.pages[1] ?this.state.pages[1].text : null}
</div>
</Container>
       

        </Container>
        {!Ext.platformTags.phone &&<Container style={{color:"#666666",backgroundColor:"#eeeeee",borderRadius:"10px"}} layout="hbox" margin="10" padding="10 30" cls="rtl" >
          
           <Container   flex={1} padding="10" style={{fontSize:"20px",textAlign:"right"}}> 
         شنوای انتقادات و پیشنهادات شما  هستیم
          </Container>
          <Button text="باما در ارتباط باشید" ui="action round" floating handler={()=>this.navigate("/About")}/>
      </Container> }


      {/* <Vitrin ref="contents" itemName="Content" showAll="Contents" {...this.Bprops} title="محتوا های آموزشی" icon="newspaper-o" continue="contents" minWidth="200"  height="150" /> */}
      {/* <Vitrin ref="others" itemName="Product" showAll="Products"  {...this.Vprops} title="سایر محصولات" icon={"shopping-bag"} minWidth="260"  height="180" continue="Product"  round arrows/> */}
      <Container style={{color:"#ECEFF1",backgroundColor:"#37474F"}}  margin="0" padding="4 2" cls="rtl" layout="center" width="100%">
        <div style={{padding:"20px",maxWidth:"960px"}}>
        <img src={Logo3}  mode="img" height="90" width="90" onClick={()=>this.navigate("/About")} style={{padding:"10px",float:"right"}}/>
        <div style={{padding:"20px"}}>
        {this.state.pages && this.state.pages[2] ?this.state.pages[2].text : null}
        </div>
        {this.state.pages && this.state.pages[2] && this.state.pages[2].src ? <img src={this.state.pages[2].src}  height="100px" width="100%" style={{objectFit: "contain"}}/>: null}
        </div>
     
      </Container>
      <a style={{textDecoration:"none",color:"#37474F" ,fontSize:"12px",width:"100%",textAlign:"center", margin:"5px auto"}} href="https://sitenevis.com">قدرت یافته از سایت نویس</a> 
    </Container>
  }
  bxprops = {flex:1,margin:8,padding:12,ripple:true,style:{
    borderRadius : "5px",
    backgroundColor :"#ffffff"
  }}
  Vprops = {shadow:false,round:false,...this.props}
  Bprops = {...this.Vprops,style:{color:"#000000"}}
}