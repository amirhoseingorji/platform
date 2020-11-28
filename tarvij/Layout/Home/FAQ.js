import React, { Component } from 'react';
import { Container ,Button } from '@sencha/ext-modern';
import { Advertise,Title } from '../../Componnet/*';
import Procces from './Procces';
import PerfectScrollbar from 'perfect-scrollbar';
import Storer from "../../Store/Storer";
import FooterTab from './User/FooterTab';
export default class FAQ extends Component {
    // state = {faq:[]};
  componentWillMount(){
    Storer({
      faq : { cols: "id,question,answer,0 as view", order:"ord" ,asc:true} ,
    //  advertise:{},
    },this);
}

  componentDidMount() {
    if(!window._user){
    ////new PerfectScrollbar(this.refs.mainPage.el.dom.firstChild);
   // //new PerfectScrollbar(this.refs.advertise.refs.Advertise.el.dom);
    }
  }
  render = () =>
    <Container layout="fit" padding="15" cls="rtl">
       
      <Container className="rtl">
      <Title margin={20} icon="question-circle-o" text="سوالات متداول" style={{fontSize:Ext.platformTags.phone?"14px":"18px"}} />
      <Container margin={20} style={{fontSize:Ext.platformTags.phone?"12px":"20px"}}>
       دراین بخش می توانید با بررسی سوالات متداول راهنمایی لازم را برای استفاده از این پرتال دریافت فرمایید
      </Container>
        <Container cls="rtl" scrollable ref="mainPage">
        {this.state.faq && this.state.faq.map((e,i)=>    <Container key={"key"+i} style={{color:"#666666",backgroundColor:"#dddddd",borderRadius:"10px"}} layout="vbox" margin="10" padding="10 30" cls="rtl" >
        <Container layout="hbox"  >
          <Container   flex={1} padding="10" style={{fontSize:Ext.platformTags.phone?"12px":"20px",textAlign:"right"}}> 
           {(i*1+1)+" - "+ e.question}
           </Container>
           <Button text={e.view?"بستن پاسخت":"نمایش پاسخ"} ui="action round" floating onTap={()=>{
               this.state.faq[i].view =(this.state.faq[i].view+1)%2;
               this.setState({faq:this.state.faq})
               }}/>
</Container>
<Container style={{backgroundColor:"#efefef",borderRadius:"10px",fontSize:Ext.platformTags.phone?"12px":"18px",textAlign:"right"}} padding="10" margin="5" hidden={!e.view}>
{e.answer}
</Container>
       </Container> )}


        </Container>
        </Container>
 
    </Container>
}
