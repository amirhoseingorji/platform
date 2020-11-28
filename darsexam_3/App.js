Ext.require('Ext.Responsive');
Ext.require('Ext.grid.Grid');
Ext.require('Ext.data.TreeStore');
Ext.require('Ext.data.TreeModel');
Ext.require('Ext.MessageBox');

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'
//import {Home } from './Layout/*';
import { Home } from './Layout/*';

// Enable responsiveConfig app-wide. You can remove this if you don't plan to build a responsive UI.

/**
 * The main application view
 */
export default class App extends Component {
  componentWillMount(){

    window.socket.on("connection",data=>{ this.setState({userData:data})});
    window.socket.on("refresh",data=>{this.setState({userData:data})})
    window.socket.on("reload",function(){
      
      window.location.reload();
    })
 }
  state = { userData: this.props.userData };
  render() {
    const {  userData } = this.state;
    window.userData = userData
    if (userData.access>0) window.location.href = "http://admin.azmoon.tarvijequran.ir/"
    return (
      <Router>
        <Switch>
            <Route component={props => (<Home {...props} parent={this} userData={userData} />)} />
          </Switch>
      </Router>
  )
}
}

