import React, { Component } from 'react';
import { Container } from '@sencha/ext-modern';
import Procces from './Procces';
export default class Transactions extends Component {
  navigate = (path) => {
    this.props.history.push(path);
}
  render = () => <Container layout="fit">
    <Container cls="rtl" layout={{ type: "vbox", align: Ext.platformTags.phone ? "strech" : "center", pack: "start" }} layout="fit" margin="5" scrollable ref="mainPage"  >
      <Procces route={"Transactions"} parent={this} />
    </Container>
  </Container>
}
