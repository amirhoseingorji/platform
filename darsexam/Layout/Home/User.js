import React, { Component } from 'react';
import { Container ,Button,Image ,ToolTip,Video,Dialog} from '@sencha/ext-modern';
import Box from "../../Componnet/Box";
import Procces from './Procces';
import Storer from "../../Store/Storer";
import videoplay from '../../Statics/Images/videoplay.jpg';
import help from '../../Statics/Images/help.png';
import start from '../../Statics/Images/start.png';
import info from '../../Statics/Images/info.png';
import exit from '../../Statics/Images/exit.png';
import contact from '../../Statics/Images/contact.png';
import result from '../../Statics/Images/result.png';
import colorfooter from  '../../Statics/Images/colorfooter.jpg';
import footer_title from '../../Statics/Images/footer_title.png';
import Title from '../../Componnet/Title';
import moment from 'moment-jalaali'
moment.loadPersian({usePersianDigits: false})
// import moment from 'moment-jalaali'
// moment.loadPersian({usePersianDigits: false})
export default class User extends Component {

  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
    return query;
  }
  state={
    reged:[],helpdialog:false, content:"",
  //  dashboard : [{"id":"/Notifs","text":"بودجه بندی و اطلاعیه ها","iconCls":"newsicon","perm":"","target":"Notifs","cls":"greenblue"},{"id":"/MyExams","text":"آزمون&zwnj;های&zwnj;من","iconCls":"myexamicon","perm":"","target":"MyExams","cls":"darkblue"},{"id":"/NewExam","text":"کارنامه&zwnj;های&zwnj;من","iconCls":"resulticon","perm":"","target":"MyResult","cls":"greenblue"},{"id":"/Signout","text":"خــــروج","iconCls":"exiticon","perm":"","target":"Signout","cls":"red"}]
  }
  navigate = path => this.props.history.push (path);
  componentWillMount(){
    window.socket.on("paylink", link => { window.location.href = link });
    Storer({
  
       dashboard : { from: "menu", cols: "$id as id,title as text,iconCls,text as perm,target,cls", 0: { $pid: "{is null}",menu:1,$id:"{!='/'}"} ,order:"ord" ,asc:true} ,
 
    },this);
}

  render = () =>{

    var {content} = this.state

       return     <Container layout="fit" cls={window.userData._user?(Ext.platformTags.phone?"backphone":"backphone2"):""}  >
      {window.userData._user?

<Container centered layout="vbox" style={{margin:"auto",padding:5}}  padding={Ext.platformTags.phone?"":"0"} height={"100%"} maxHeight={Ext.platformTags.phone?"100%":"500px"}>
          <Container layout="vbox"  shadow={!Ext.platformTags.phone} style={{backgroundColor:Ext.platformTags.phone?"":"#ffffff",padding:"0",maxWidth:"800px",width:"100%"}} cls={Ext.platformTags.phone?"rtl":"x-round rtl"}  scrollable   flex={1}  >
          <Container margin="30 10" >

          <div style={{fontSize:"20px",color:"#418bdf",fontWeight:"bold"}}> <div style={{    padding: "5px",display: "inline-block", margin: "20px 10px 0px", backgroundColor: "rgb(0, 84, 166)"}}></div>{window.userData.name} خوش آمدید</div>
   <div style={{fontSize:"12px",color:"#418bdf",fontWeight:"100"}}> <div style={{    padding: "5px",display: "inline-block", margin: "5px 10px 0px", backgroundColor: "rgb(0, 84, 166)"}}></div> {moment(new Date()).format("امروز  dddd jD jMMMM jYYYY")}</div>
    

              
<Container style={{textAlign:"center"}}  margin={Ext.platformTags.phone?"30 5":"5 5 5 5"} flex={1}>
        {this.state.dashboard.map((e, i) => <Button  ripple   key={i}  iconAlign="top" iconCls={e.iconCls} cls={"dashboard "+e.cls} text={e.text} ui="action round" margin={4} width={Ext.platformTags.phone?"45%":160} height={Ext.platformTags.phone?100:110} handler={() => {
          if (e.id.slice(0,4)=='http') window.location.href=e.id;else     this.props.history.push(e.id);
          }}/>)}
        </Container>
        </Container>
        <Image width="100%" src={colorfooter} hidden={Ext.platformTags.phone}  height="8" docked="bottom" style={{top:"1px",backgroundSize:"cover"}} />
       
        </Container>
        <Container margin="0" width="100%" >
        <Image src={footer_title} mode='img' />
        <Image width="100%" src={colorfooter} hidden={!Ext.platformTags.phone}  height="8px" docked="bottom" style={{top:"1px",backgroundSize:"cover"}}/>
      </Container>
      </Container>
        :
        <Container   layout='fit' margin="0" scrollable ref="mainPage" cls='rtl' >
         
          
        <Procces parent={this} route={"Login"} />
        <Image width="100%" src={colorfooter} hidden={!Ext.platformTags.phone}  height="8px" docked="bottom"/>
      </Container>}
      {/* <Advertise ref={"advertise"} /> */}
      <Dialog title={this.state.dtitle ||"راهنما"} maximizable={!Ext.platformTags.phone} centered closable displayed={this.state.helpdialog} modal bodyPadding="5"  width="100%" maxWidth="800px" height="100%" maxHeight="500px" closeAction="hide" onHide={() => this.setState({ helpdialog: false ,dtitle:""})}>
       
        <Container hidden={content.length==0 && content.indexOf("http")==-1} flex={1} width="100%" height={(content.length==0 && content.indexOf("http")==-1)?"0":"100%"} > 
          <Container hidden={content.length==0 || content.indexOf("http")>-1} flex={1} margin = "10" width="100%" height="100%"><div dangerouslySetInnerHTML={{ __html: content }}></div></Container>
          <Container height="30" hidden={!Ext.platformTags.phone}>برای بزرگنمایی روی تصویر بزنید</Container>
          <Image src={content.indexOf("http")>-1? content:""} flex={1}  cls='dialogimg' width="100%" height="100%" onTap={()=>window.location.href=content}></Image>
        </Container>
     
        <Video hidden={content} url={["https://azmoon.andishmand.ir/help.mp4"]} flex={1}              posterUrl={videoplay} />
         </Dialog>
    </Container>
}
}
