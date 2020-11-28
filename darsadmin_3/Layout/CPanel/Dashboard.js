import React, { Component } from 'react';
import {  Container ,Button,Image} from '@sencha/ext-modern';

import { Title } from '../../Componnet/*';
import PerfectScrollbar from "perfect-scrollbar";
import Storer from "../../Store/Storer"

import result_art from '../../Statics/Images/result_art.png';
export default class HomePage extends Component {
  componentWillMount(){
    Storer({
      dashboard : { from: "menu",ignore:true, cols: "$id as id,title as text,iconCls,target", 0: { menu:1,$id:"!='/'",_user:1,access:window.userData.access} ,order:"ord" ,asc:true} ,
    //  advertise:{},
    },this);
  }
  componentDidMount() {
    //new PerfectScrollbar(this.refs.homePage.el.dom.firstChild.firstChild.firstChild);
  }
  render=()=> {
   // let {tags,brands,spears,general,support,edu,news} = this.state
    return <Container layout="fit" padding="0px 10px" scrollable ref='homePage'>
      {window._user?
      <Container className="rtl">
      <Container cls="rtl" scrollable style={{margin:"auto"}} layout="hbox" docked="bottom" width="100%">
        {this.state.dashboard.map((e, i) => <Button key={i} flex={1} iconAlign="top"  text={e.text} cls="greenback white" margin={Ext.platformTags.phone?5:10} width={Ext.platformTags.phone?140:150} height={Ext.platformTags.phone?140:50} handler={() => this.props.history.push(e.id)}/>)}
        
        </Container>
        <Image src={result_art} centered mode='img' height="250" />
      
        {/* <Title text="اطلاعات" icon="info" />
      <ul>
        <li>تعداد بازدید : </li>
        <li>کاربران : </li>
        <li>حساب : </li>
      </ul> */}

      
      {/* <Container margin={20} style={{fontSize:"20px"}}>به سامانه یک فیلم خوش آمدید</Container> */}
      {/* <Title text="دسترسی سریع" icon="list" /> */}
        </Container>
        :null}
      {/* <Advertise ref={"advertise"} /> */}
    </Container>
      
  }
  Vprops = {shadow:true,round:true,...this.props}
}