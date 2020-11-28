Ext.require('Ext.Responsive');
Ext.require('Ext.grid.Grid');
Ext.require('Ext.data.TreeStore');
Ext.require('Ext.data.TreeModel');

import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'
//import {Home } from './Layout/*';
import { Home ,CPanel} from './Layout/*';

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
    console.log(userData._user_access)
    let Main =  userData._user_access > 0 ? CPanel : Home
    window.userData = userData
  return (
      <Router>
        <Switch>
            <Route component={props => (<Main {...props} parent={this} userData={userData} />)} />
          </Switch>
      </Router>
  )
}
}

