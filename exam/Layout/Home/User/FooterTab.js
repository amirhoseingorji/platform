import React, { Component } from 'react';
import { TabBar, Tab } from '@sencha/ext-modern';
import Storer from "../../../Store/Storer"
export default class FooterTab extends Component {
  componentWillMount() {
    let {_user_factor} = window.userData
    Storer({user_factor_cart: {0:{_user_factor}}, footer: { from: "menu", cols: "$id as id,title as text,iconCls", 0: { $id: "{!='/'}" , $pid: "{is null}",menu:1 },order:"ord",asc:true } }, this);
  }
  componentDidMount(){
    window.footer = this.refs.f
    window._footer = this
  }
  render = () => {
    let footer = this.state.footer||this.footer
    this.footer= footer
    return <TabBar ref="f" docked="bottom" height="40" padding="0" cls="rtl" onActiveTabChange={(th, newTab) => this.props.history.push(newTab._itemId)}
      activeTab={window.location.pathname}>
      {this.state.footer.map((e, i) => <Tab key={i} itemId={e.id} cls="x-second-tab" iconAlign="left" iconCls={e.iconCls} text={Ext.platformTags.phone?"":e.text} 
      badgeText={(!Ext.platformTags.phone && this.state.user_factor_cart && e.iconCls=="x-fa fa-shopping-cart") ?this.state.user_factor_cart.length:0}
      />)}
      {/* <Tab itemId="/" cls="x-second-tab" iconAlign="left" iconCls="x-fa fa-sign-out" text="خروج" /> */}
    </TabBar>
  }
}
