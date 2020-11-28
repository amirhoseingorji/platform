import React, { Component } from 'react';
import { Container, Button, Video } from '@sencha/ext-modern';
import Procces from './Procces';
import PerfectScrollbar from 'perfect-scrollbar';
import Storer from "../../Store/Storer";
import { Vitrin } from '../../Componnet/*';
import Logo from '../../Statics/Images/logo.png';
import Logo3 from '../../Statics/Images/logo3.png';
export default class User extends Component {
  componentWillMount() {
    let cols = "id,title as text,src,0 price,0 ago,`like`,dislike,link";
    Storer({
      contents: { cols, num: 10, order: "date", 0: { type: "1" } },
      pages: { 0: { status: "1", id: "<3" } },
      dashboard: { from: "menu", cols: "$id as id,title as text,iconCls", 0: { $pid: "{is null}", menu: 1, $id: "{!='/User'}" }, order: "ord", asc: true },
    }, this);
  }

  componentDidMount() {
    if (window._user) new PerfectScrollbar(this.refs.mainpage.cmp.el.dom.firstChild);
  }
  render = () =>
    <Container layout="fit">
      {window._user ?
        <Container scrollable='vertical' ref="mainpage" >
          <Container cls="rtl" style={{ textAlign: "center" }}>
            {this.state.dashboard.map((e, i) => <Button key={i} cls="dashboard" iconAlign="top" iconCls={e.iconCls + " dashboardIcon"} text={e.text} ui="action" margin={Ext.platformTags.phone ? 5 : 30} width={Ext.platformTags.phone ? 140 : 200} height={Ext.platformTags.phone ? 140 : 200} handler={() => this.props.history.push(e.id)} />)}
          </Container>
          <Vitrin ref="contents" itemName="id" showAll="Contents" {...this.Bprops} title="اخبار و  پیام ها" icon="rss" continue="Contents" minWidth="200" height="150" />

          <Vitrin ref="matches" itemName="Match" showAll="Matches" title="راهنمای تصویری" icon="flag-checkered" continue="Match" minWidth="260" height="160" round arrows />
          <Container layout={Ext.platformTags.phone ? "vbox" : "hbox"} margin={"0 20"} cls="rtl" >
            {this.state.pages && this.state.pages[1] ? <Video width="540" height="304" loop url={[this.state.pages[1].file]} posterUrl={this.state.pages[1].src} /> : null}
            <Container flex={1} style={{ fontSize: "17px", textAlign: "justify", color: "#546E7A", lineHeight: "25px" }} padding='10'>
              <div style={{ textAlign: "justify", lineHeight: "30px" }}>
                {this.state.pages && this.state.pages[1] ? this.state.pages[1].text : null}
              </div>
            </Container>
          </Container>
          <br />
        </Container>
        : <Container cls="rtl" layout={{ type: "vbox", align: Ext.platformTags.phone ? "strech" : "center", pack: "start" }} layout="center" margin="5" scrollable ref="mainPage"  >
          <Procces parent={this} route={"Login"} />
        </Container>}
    </Container>
  Bprops = {
    history: this.props.history
  }
}

