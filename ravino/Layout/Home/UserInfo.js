import React, { Component } from 'react';
import { Container } from '@sencha/ext-modern';
import PerfectScrollbar from 'perfect-scrollbar';
import Procces from './Procces';
import FooterTab from "./User/FooterTab"
import Storer from "../../Store/Storer"
export default class UserInfo extends Component {

  componentDidMount() {
  //  new PerfectScrollbar(this.refs.mainPage.el.dom.firstChild)
  }
  render = () =>
    <Container layout="fit">
      <Container cls="rtl" layout={{ type: "vbox", align: Ext.platformTags.phone ? "strech" : "center", pack: "start" }} layout="center" margin="5" scrollable ref="mainPage"  >
        <Procces parent={this} route={"Info"} />
      </Container>
      <FooterTab {...this.props} />
    </Container>
}
