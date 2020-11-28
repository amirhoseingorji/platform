import React, { Component } from 'react';
import { Container ,Button,Image ,ToolTip,Video,Dialog} from '@sencha/ext-modern';
import Textbox from "../../Componnet/Textbox";
import Procces from './Procces';
import Storer from "../../Store/Storer";
import videoplay from '../../Statics/Images/videoplay.jpg';
import colorfooter from  '../../Statics/Images/colorfooter.jpg';
import examlogo from  '../../Statics/Images/examlogo2.jpg';
import examback from  '../../Statics/Images/examback.png';
import Title from '../../Componnet/Title';
import footer_title from '../../Statics/Images/footer_title.png';
// import moment from 'moment-jalaali'
// moment.loadPersian({usePersianDigits: false})
export default class Help extends Component {
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
    return query;
  }
 
  state={
    reged:[],
    helpdialog:false,content:"",id:""
  }
  navigate = path => {
   
    this.props.history.push (path);
    this.setState({id:this.query().id}) 
  }
  componentWillMount(){
      //console.log(this.query())
   //   this.state.id = this.query().id
  // this.setState({id:this.query().id}) 
  //  Storer({
     // carousel:{0:{pid:1}},
     //  reged : {from:"exam_user",cols: 'exam_item.id , exam_item.name,start_time ,if(start_time>now(),true,false) as disabled,count,duration,neg_mod',join:"exam_item",0:{pid: 0,status:"<2",begin_time:"> now() - 60000*exam_item.duration"},1:{end_time: '> now()'},order:"start_time",asc:true},
       //newexam :{cols:"exam.id,exam_item.id _exam_item",from : "exam",join : "exam.item",0:{pid:window.userData._exampid||0},1 : {end_time: '> now()', pid: 0}},
      // dashboard : { from: "menu", cols: "$id as id,title as text,iconCls,text as perm,target,cls", 0: { $pid: "{is null}",menu:1,$id:"{!='/'}"} ,order:"ord" ,asc:true} ,
    //  advertise:{},
    //},this);
}

  componentDidMount() {
    // if(!window._user){
    // new PerfectScrollbar(this.refs.mainPage.el.dom.firstChild);
    // new PerfectScrollbar(this.refs.advertise.refs.Advertise.el.dom);
    // }
  }
  helplink(){
    window.open("http://azmoon.tarvijequran.ir/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7.pdf","_blank")
  }
  render = () =>{
    let id = this.query().id
    var {content} = this.state
       return     <Container layout="fit" cls={Ext.platformTags.phone?"backphone":'backphone2'}  >
   
      {window.userData._user?
      <Container   style={{margin:"auto"}} maxWidth="800px" maxHeight="100%" cls={Ext.platformTags.phone?"rtl":"rtl"}  centered  scrollable height={Ext.platformTags.phone?"100%":""} width="100%" minHeight="500px">
        {/* <Container docked="top" hidden={!Ext.platformTags.phone} cls=" backphone5 ltr" height="60" >
        <Button  text="راهنما"   handler={()=>this.helplink()}  textAlign="center" width="70px" style={{top:"20px" ,left:"20px"}} />
          <Container style={{borderRadius:"10px" ,top:"30px",height:"20px", width:"100%", backgroundColor:"#ffffff"}} ></Container>
        </Container> */}

          <Container layout="vbox" margin={"5 0"} >
          <Container margin={Ext.platformTags.phone?"0 auto 10 0":"25 15 15 15"} padding="0 0 10 0" shadow={!Ext.platformTags.phone}  cls=""  style={{color:"#0ec7c0",backgroundColor:Ext.platformTags.phone?"":"#ffffff",borderRadius:Ext.platformTags.phone?"":"10px"}} docked="top" >
          <Container  hidden={Ext.platformTags.phone} docked="left" width="30"  height="100%"></Container>
           <Container margin={Ext.platformTags.phone?"":"10 0 0"}><h2>{
        "راهنمای آزمون"}</h2></Container><Container hidden={Ext.platformTags.phone} style={{color:"#898989",fontSize:"10px"}} padding="0 10">
        {"در این صفحه می توانید از راهنمای آزمون ها و آخرین اخبار و اطلاعیه های سامانه آزمون مطلع شوید"}</Container> 
    

    <Container   docked="right" layout="vbox" >
    {/* <Image src={examlogo}   docked="right" width={"100px"}  height="80px"/> */}
       <Button  text="راهنما" cls="editinfobtn"   handler={()=>this.helplink()}   textAlign="center" width="70px" style={{left:"0px", margin:"15px 0 0 0"}}   />
          <Button  text="بازگشت" cls="resentbtn ltr" handler={()=>this.navigate(id ? '/Help':'/')} iconCls="x-fal fa-arrow-left" textAlign="left" width="90px" iconAlign="left"  />
    </Container>

    </Container>
    
 
                   
    <Container style={{ minHeight:Ext.platformTags.phone?"240px": "300px" }} margin="0 10" padding="5 0 0 0">
        {id ?<Textbox parent={this} id='1' title="راهنما آزمون استان تهران" status={0} 
                                   description='راهنمای آزمونها شامل اطلاعات مهمی است که در این متن برای شما قابل دسترس خواهد بود' date={new Date()} full={true}/>:
        <Container padding="5 0 0 0">

                                   <Textbox parent={this} id='1' title="راهنما آزمون استان تهران" status={0} 
                                   description='راهنمای آزمونها شامل اطلاعات مهمی است که در این متن برای شما قابل دسترس خواهد بود' date={new Date()} />
                                   <Textbox parent={this} id="2" title="زمان برگزاری آزمون" status={1}  description='در این قسمت توضیحات مختری در رابطه با آزمون نوشته خواهد شد '  date={new Date()} />
                                   <Textbox parent={this} id="2" title="انجام قرعه کشی" status={1}  description='در این قسمت توضیحات مختری در رابطه با آزمون نوشته خواهد شد '  date={new Date()} />
        </Container> }
        <Container docked="bottom" >
        <Image width="100%" src={colorfooter} hidden={Ext.platformTags.phone}  height="8"  style={{top:"1px",backgroundSize:"cover"}} /><Image src={footer_title} mode='img' /></Container>

                   </Container>
        
          
        </Container>
        <Image width="100%" src={colorfooter} hidden={!Ext.platformTags.phone}  height="8" docked="bottom" style={{top:"1px"}} />
        {/* <Dialog title="راهنما" centered closable displayed={this.state.helpdialog} modal bodyPadding="5"  width="100%" maxWidth="800px" height="100%" maxHeight="500px" closeAction="hide" onHide={() => this.setState({ helpdialog: false })}>
                    <Video  url={["https://azmoon.andishmand.ir/help.mp4"]} flex={1}              posterUrl={videoplay} />
                </Dialog> */}
        </Container>
        :
        <Container   layout='fit' margin="0" scrollable ref="mainPage" cls='rtl' >
        <Procces parent={this} route={"Login"} />
        <Image width="100%" src={colorfooter} hidden={!Ext.platformTags.phone}  height="10px" docked="bottom"/>
      </Container>}
      {/* <Advertise ref={"advertise"} /> */}
      <Dialog title="راهنما" maximizable={!Ext.platformTags.phone} centered closable displayed={this.state.helpdialog} modal bodyPadding="5"  width="100%" maxWidth="800px" height="100%" maxHeight="500px" closeAction="hide" onHide={() => this.setState({ helpdialog: false })}>
        
        {content ? (content.indexOf("http")>-1?<Container flex={1} width="100%" height="100%"><Container height="30" hidden={!Ext.platformTags.phone}>برای بزرگنمایی روی تصویر بزنید</Container><Image src={content} flex={1}  cls='dialogimg' width="100%" height="100%" onTap={()=>window.location.href=content}></Image></Container>:<Container flex={1} margin = "10">{content}</Container>) :
                    <Video  url={["https://azmoon.andishmand.ir/help.mp4"]} flex={1}              posterUrl={videoplay} />}
                </Dialog>
    </Container>
}
}
