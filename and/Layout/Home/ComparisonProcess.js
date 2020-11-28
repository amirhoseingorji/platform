import React, { Component } from 'react';
import { Container, Button, Video } from '@sencha/ext-modern';
import Procces from './Procces';
import PerfectScrollbar from 'perfect-scrollbar';
import Storer from "../../Store/Storer";
import { Vitrin } from '../../Componnet/*';
import Logo from '../../Statics/Images/logo.png';
import Logo3 from '../../Statics/Images/logo3.png';
export default class ComparisonProcess extends Component {
  componentWillMount() {
    let cols = "id,title as text,src,0 price,0 ago,`like`,dislike,link";
    Storer({
      contents: { cols, num: 10, order: "date", 0: { type: "1" } },
      pages: { 0: { status: "1", id: "<3" } },
      dashboard: { from: "menu", cols: "$id as id,title as text,iconCls", 0: { $pid: "{is null}", menu: 1, $id: "{!='/User'}" }, order: "ord", asc: true },
    }, this);
  }

  componentDidMount() {
   // if (window._user) new PerfectScrollbar(this.refs.mainpage.cmp.el.dom.firstChild);
  }
  render = () =>
    <Container layout="fit">
      {window._user ?
        <Container scrollable='vertical' ref="mainpage" cls="rtl" layout={{ type: "vbox", align: Ext.platformTags.phone ? "strech" : "center", pack: "start" }} layout="center" margin="5" scrollable ref="mainPage"  >
          <Procces parent={this} route={"ComparisonProcess"} />
        </Container>
       
        : <Container cls="rtl" layout={{ type: "vbox", align: Ext.platformTags.phone ? "strech" : "center", pack: "start" }} layout="center" margin="5" scrollable ref="mainPage"  >
          <Procces parent={this} route={"Login"} />
        </Container>}
    </Container>
  Bprops = {
    history: this.props.history
  }
}

