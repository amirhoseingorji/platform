import React, { Component } from 'react';
import {  Container ,Button} from '@sencha/ext-modern';
import Procces from './Procces';
import { Title } from '../../Componnet/*';
import PerfectScrollbar from "perfect-scrollbar";
import Storer from "../../Store/Storer"
export default class HomePage extends Component {
  componentWillMount(){
    Storer({
      dashboard : { from: "menu", cols: "$id as id,title as text,iconCls,target", 0: { menu:1,$id:"!='/'",pid:"{is NULL}",_user} ,order:"ord" ,asc:true} ,
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
      <Container cls="rtl">
      {/* <Title text="اطلاعات" icon="info" />
      <ul>
        <li>تعداد بازدید : </li>
        <li>کاربران : </li>
        <li>حساب : </li>
      </ul>

      <hr/> */}
      {/* <Container margin={20} style={{fontSize:"20px"}}>به سامانه یک فیلم خوش آمدید</Container> */}
      <Title text="دسترسی سریع" icon="list" />
        <Container cls="rtl" scrollable style={{textAlign:"center"}}>
        {this.state.dashboard.map((e, i) => <Button key={i} hidden={e.id=="/Signout"}  cls="dashboard" iconAlign="top" iconCls={e.iconCls+" dashboardIcon"} text={e.text} ui="action" margin={Ext.platformTags.phone?5:30} width={Ext.platformTags.phone?140:150} height={Ext.platformTags.phone?140:150} handler={() => this.props.history.push(e.id)}/>)}
        
        </Container></Container>
        :<Container cls="rtl" layout={{ type: "vbox", align: Ext.platformTags.phone ? "strech" : "center", pack: "start" }}  layout="center" margin="5" scrollable ref="mainPage"  >
        <Procces parent={this} route={"Login"} />
      </Container>}
      {/* <Advertise ref={"advertise"} /> */}
    </Container>
      
  }
  Vprops = {shadow:true,round:true,...this.props}
}