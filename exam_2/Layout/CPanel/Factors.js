import React, { Component } from 'react';
import { Container } from '@sencha/ext-modern';
import PerfectScrollbar from 'perfect-scrollbar';
import Procces from './Procces';
//import FooterTab from "./User/FooterTab"
export default class Factors extends Component {
  componentDidMount() {
    new PerfectScrollbar(this.refs.mainPage.el.dom.firstChild)
  }
  render = () => <Container layout="fit">
    <Container cls="rtl" layout={{ type: "vbox", align: Ext.platformTags.phone ? "strech" : "center", pack: "start" }} layout="fit" margin="5" scrollable ref="mainPage"  >
      <Procces route={"Factors"} parent={this} />
    </Container>
    {/* <FooterTab {...this.props} /> */}
  </Container>
}
