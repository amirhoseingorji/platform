import React, { Component } from 'react';
import { Container ,Button,Image } from '@sencha/ext-modern';
import { Advertise,ImageMap } from '../../Componnet/*';
import Procces from './Procces';
import PerfectScrollbar from 'perfect-scrollbar';
import Storer from "../../Store/Storer";
import FooterTab from './User/FooterTab';
import  {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
export default class User extends Component {

  componentWillMount(){
    Storer({
      carousel:{0:{pid:1}},
      dashboard : { from: "menu", cols: "$id as id,title as text,iconCls,text as perm", 0: { $pid: "{is null}",menu:1,$id:"{!='/'}"} ,order:"ord" ,asc:true} ,
    //  advertise:{},
    },this);
}

  componentDidMount() {
    // if(!window._user){
    // new PerfectScrollbar(this.refs.mainPage.el.dom.firstChild);
    // new PerfectScrollbar(this.refs.advertise.refs.Advertise.el.dom);
    // }
  }
  render = () =>
    <Container layout="vbox" scrollable>
      
      {window.userData._user?
      <Container className="rtl" >
         <br/>
      <Image src='https://tinroid.ir/images/icons/180_telegram_icon.webp' mode='img' width="130" style={{margin:"auto"}} />
    <center > سامانه مدیریت ربات خرید گروهی  
    <br/>
    <div style={{padding:"0", maxWidth:"500px",direction:"ltr"}}  > <br/>
        <Carousel ref="Carousel" infiniteLoop arrows cls="ltr " margin={0} height={Ext.platformTags.phone?'180px':'300px'}  padding="0" activeItem={this.state.carousel.length-1}  showThumbs={false} showStatus={false}>
         {this.state.carousel.map((e, i) =>    <img  src={e.src} {...this.props}  key={i} id={e.href} style={{ height:Ext.platformTags.phone?'180px':'300px'}} />    )} 
      </Carousel> 
      </div>
    {/* {Ext.platformTags.phone?<br/>:} */}
    </center>
  
        <Container cls="rtl"  style={{textAlign:"center"}}> 
        {this.state.dashboard.map((e, i) => <Button badgeText ={e.perm*1<window.userData.mode ?"✓":""} disabled={e.perm.indexOf(window.userData.mode)<0} key={i} cls={"dashboard"+(e.perm.indexOf(window.userData.mode)<0?" disableddisabled":"")} iconAlign="top" iconCls={e.iconCls+" dashboardIcon"+(e.perm.indexOf(window.userData.mode)<0?" disableddashboardIcon":"")} text={e.text} ui="action" margin={Ext.platformTags.phone?5:7} width={Ext.platformTags.phone?120:140} height={Ext.platformTags.phone?120:140} handler={() => {
          if (e.id.slice(0,4)=='http') window.location.href=e.id;else     this.props.history.push(e.id);
          }}/>)}
       
        </Container></Container>
        :
        <Container cls="rtl" layout={{ type: "vbox", align: Ext.platformTags.phone ? "strech" : "center", pack: "start" }}  layout="center" margin="5" scrollable ref="mainPage"  >
         
          
        <Procces parent={this} route={"Login"} />
      </Container>}
      {/* <Advertise ref={"advertise"} /> */}
    </Container>
}
