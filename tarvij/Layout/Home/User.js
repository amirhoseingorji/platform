import React, { Component } from 'react';
import { Container ,Button ,Image} from '@sencha/ext-modern';
import { Advertise } from '../../Componnet/*';
import Procces from './Procces';
import PerfectScrollbar from 'perfect-scrollbar';
import Storer from "../../Store/Storer";
import FooterTab from './User/FooterTab';
import aye from '../../Statics/Images/aye.png';
export default class User extends Component {
  componentWillMount(){
    Storer({
      dashboard : { from: "menu", cols: "$id as id,title as text,iconCls", 0: { $pid: "{is null}",menu:1,$id:"{!='/'}",_user_type:"{in('*',"+window.userData._user_type+")}"} ,order:"ord" ,asc:true} ,
    //  advertise:{},
    },this);
}

  componentDidMount() {
    // if(!window._user){
    // ////new PerfectScrollbar(this.refs.mainPage.el.dom.firstChild);
    // //new PerfectScrollbar(this.refs.advertise.refs.Advertise.el.dom);
    // }
  }
  render = () =>
    <Container layout="fit">
      {window._user?
      <Container className="rtl">
      {/* <Container margin={20} style={{fontSize:"20px"}}>به سامانه یک فیلم خوش آمدید</Container> */}
      
      <Image src={aye} {...this.logoProps} margin={Ext.platformTags.phone?0:"10"} mode="img" width={Ext.platformTags.phone?"330":"380"}   /> 

     

        <Container cls="rtl" scrollable>
        {this.state.dashboard.map((e, i) => <Button key={i} cls="dashboard" iconAlign="top" iconCls={e.iconCls+" dashboardIcon"} text={e.text} ui="action" margin={Ext.platformTags.phone?5:30} width={Ext.platformTags.phone?120:180} height={Ext.platformTags.phone?120:180} handler={() => this.props.history.push(e.id)}/>)}
        
        </Container></Container>
        :<Container cls="rtl" layout={{ type: "vbox", align: Ext.platformTags.phone ? "strech" : "center", pack: "start" }}  layout="center" margin="5" scrollable ref="mainPage"  >
        <Procces parent={this} route={"Login"} />
      </Container>}
      {/* <Advertise ref={"advertise"} /> */}
    </Container>
}
