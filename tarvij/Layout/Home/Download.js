import React, { Component } from 'react';
import { Container ,Button } from '@sencha/ext-modern';
import { Advertise,Title } from '../../Componnet/*';
import Procces from './Procces';
import PerfectScrollbar from 'perfect-scrollbar';
import Storer from "../../Store/Storer";
import FooterTab from './User/FooterTab';
export default class Download extends Component {
    // state = {faq:[]};
  componentWillMount(){
    Storer({
        filess : { from:"files" ,cols:"id,file,name,description,download,hart,status,size,0 as view,0 as ilike",0:{_user_type:"{in('*',"+window.userData._user_type+")}"}} ,
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
    <Container layout="fit" padding="15 15 15 25">
       
      <Container className="rtl">
      <Title margin={20} icon="download" text="دانلود های کاربردی" style={{fontSize:Ext.platformTags.phone?"14px":"18px"}} />
      <Container margin={20} style={{fontSize:Ext.platformTags.phone?"12px":"20px"}}> فایل های و نرم افزار های کاربردی جهت استفاده مربیان ، مروجین و عموم کاربران
      </Container>
        <Container cls="rtl" scrollable ref="mainPage">
        {this.state.filess && this.state.filess.map((e,i)=>    <Container key={"key"+i} style={{color:"#666666",backgroundColor:"#dddddd",borderRadius:"10px"}} layout="vbox" margin="10" padding="10 10" cls="rtl" >
        <Container layout={"hbox"}  >
          <Container   flex={1} padding="10" style={{fontSize:Ext.platformTags.phone?"12px":"20px",textAlign:"right"}}> 
           {e.name}
           </Container>
           <Button text={e.view?"بستن توضیحات":"نمایش لینک"} ui="action round" floating onTap={()=>{
               this.state.filess[i].view =(this.state.filess[i].view+1)%2;
               this.setState({files:this.state.filess})
               }}/>
</Container>
<Container layout={Ext.platformTags.phone?"vbox":"hbox"} style={{backgroundColor:"#efefef",borderRadius:"10px",fontSize:Ext.platformTags.phone?"12px":"18px",textAlign:"right"}} padding="10" margin="5" hidden={!e.view}>

<Container   padding="10" flex={1}>{e.description}</Container>
<Button text={"دانلود  (" + e.size +") مگابایت"}  iconCls="x-fa fa-download" ui="decline round" floating onTap={()=>window.open("https://ftf.sitenevis.com"+e.file,'_blank')}/>
 <Button text={ e.hart + "  پسند  "}  iconCls="x-fa fa-heart" ui={e.ilike?"action round":"confirm round"} floating onTap={()=>{
this.state.filess[i].ilike =(this.state.filess[i].ilike+1)%2;
this.state.filess[i].hart +=(this.state.filess[i].ilike * 2-1)
this.setState({files:this.state.filess})
Storer("files", this, { 0: { id: e.id}, hart: "`hart` + ("+(this.state.filess[i].ilike * 2-1)+")" }, "update");
 }}/>
</Container>
       </Container> )}


        </Container>
        </Container>
 
    </Container>
}
