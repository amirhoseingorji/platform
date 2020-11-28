import React, { Component } from 'react';
import { Container ,Button,Image ,ToolTip,Video,Dialog} from '@sencha/ext-modern';
import Box from "../../Componnet/Box";
import Procces from './Procces';
import Storer from "../../Store/Storer";
import videoplay from '../../Statics/Images/videoplay.jpg';
import andishmand from '../../Statics/Images/andishmand.png';
import student from '../../Statics/Images/student.jpg';
import exiticon from '../../Statics/Images/exiticon.png';
import resulticon from '../../Statics/Images/resulticon.png';
import myexamicon from '../../Statics/Images/myexamicon.png';
import newsicon from '../../Statics/Images/newsicon.png';
import colorfooter from  '../../Statics/Images/colorfooter.jpg';
import Title from '../../Componnet/Title';
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
    reged:[],helpdialog:false
  }
  navigate = path => this.props.history.push (path);
  componentWillMount(){
    Storer({
     // carousel:{0:{pid:1}},
       reged : {from:"exam_user",cols: 'exam_item.id , exam_item.name,start_time ,if(start_time>now(),true,false) as disabled,count,duration,neg_mod',join:"exam_item",0:{pid: 0,status:"<2",begin_time:"> now() - 60000*exam_item.duration"},1:{end_time: '> now()'},order:"start_time",asc:true},
       newexam :{cols:"exam.id,exam_item.id _exam_item",from : "exam",join : "exam.item",0:{pid:window.userData._exampid||0},1 : {end_time: '> now()', pid: 0}},
       dashboard : { from: "menu", cols: "$id as id,title as text,iconCls,text as perm,target,cls", 0: { $pid: "{is null}",menu:1,$id:"{!='/'}"} ,order:"ord" ,asc:true} ,
    //  advertise:{},
    },this);
}

  componentDidMount() {
    // if(!window._user){
    // new PerfectScrollbar(this.refs.mainPage.el.dom.firstChild);
    // new PerfectScrollbar(this.refs.advertise.refs.Advertise.el.dom);
    // }
  }
  render = () =>{
    var {reged} = this.state
    let {status} = this.query()
    let payes = [
      { text: 'پیش دبستان', value: 0 },
      { text: 'اول', value: 1 },
      { text: 'دوم', value: 2 },
      { text: 'سوم', value: 3 },
      { text: 'چهارم', value: 4 },
      { text: 'پنجم', value: 5 },
      { text: 'ششم', value: 6 },
      { text: 'هفتم', value: 7 },
      { text: 'هشتم', value: 8 },
      { text: 'نهم', value: 9 }]
    console.log(status)
       return     <Container layout="fit" cls='homeback' >
   
      {window.userData._user?
      <Container   style={{margin:"auto"}}  cls={Ext.platformTags.phone?"rtl":"rtl"}  centered  scrollable height={Ext.platformTags.phone?"100%":""} width="100%">
        <Container docked="top" hidden={!Ext.platformTags.phone} cls=" backphone2 ltr" height="60" >
        <Button  text="راهنما"   handler={()=>this.setState({helpdialog:true})}  textAlign="center" width="70px" style={{top:"20px" ,left:"20px"}} />
          <Container style={{borderRadius:"10px" ,top:"30px",height:"20px", width:"100%", backgroundColor:"#ffffff"}} ></Container>
        </Container>

          <Container layout="vbox" margin={5} >
                   <Container style={{ minHeight:Ext.platformTags.phone?"240px": "300px" }} margin="0 5" padding="5 0 0 0">
                     
                     <Box title="آزمون آنلاین درس فلسفه و اخلاق" status={0} pay={0} description='در این قسمت توضیحات مختری در رابطه با آزمون نوشته خواهد شد '  duration="30" neg_mod={false} start_time={new Date()} end_time={new Date() } boodje={andishmand} questions={null} price={20000} />
                     <Box title="آزمون آنلاین درس فلسفه و اخلاق " status={2} pay={1} description='در این قسمت توضیحات مختری در رابطه با آزمون نوشته خواهد شد '  duration="30" neg_mod={false} start_time={new Date()} end_time={new Date() } boodje={andishmand} questions={null} price={20000} />
                     {/* <div>  در حال حاضر آزمون فعالی برای شما تعریف نشده است به اطلاعیه ها مراجعه فرمایید</div> */}
                   </Container>
        
          
        </Container>
        <Image width="100%" src={colorfooter} hidden={!Ext.platformTags.phone}  height="10px" docked="bottom"/>
        <Dialog title="راهنما" centered closable displayed={this.state.helpdialog} modal bodyPadding="5"  width="100%" maxWidth="800px" height="100%" maxHeight="500px" closeAction="hide" onHide={() => this.setState({ helpdialog: false })}>
                    <Video  url={["https://examples.sencha.com/ExtReact/6.5.3/kitchensink/resources/video/BigBuck.m4v"]} flex={1}              posterUrl={videoplay} />
                </Dialog>
        </Container>
        :
        <Container   layout='fit' margin="0" scrollable ref="mainPage" cls='rtl' >
        <Procces parent={this} route={"Login"} />
        <Image width="100%" src={colorfooter} hidden={!Ext.platformTags.phone}  height="10px" docked="bottom"/>
      </Container>}
      {/* <Advertise ref={"advertise"} /> */}
    </Container>
}
}
