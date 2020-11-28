import React, { Component } from 'react';
import { Container,Button } from '@sencha/ext-modern';
import PerfectScrollbar from 'perfect-scrollbar';
import Procces from './Procces';
import FooterTab from "./User/FooterTab"
export default class Transactions extends Component {
  componentDidMount() {
   // new PerfectScrollbar(this.refs.mainPage.el.dom.firstChild);
  }
  navigate = (path) => {
    this.props.history.push(path);
}
  render = () => <Container layout="fit">
    <Container cls="rtl" layout={{ type: "vbox", align: Ext.platformTags.phone ? "strech" : "center", pack: "start" }} layout="fit" margin="5" scrollable ref="mainPage"  >
      <Procces route={"Transactions"} parent={this} />
      {/* <Button
      docked="bottom"
        width={590}
        ui="confirm"
           text="مشخصات شما"
            handler={()=>this.navigate("/UserInfo")}
            iconCls="x-fa fa-info"
            iconAlign="right"
            style={{margin:"10px auto"}}
          /> */}
    </Container>
    {/* <FooterTab {...this.props} /> */}
  </Container>
}
