Ext.require('Ext.Responsive');
Ext.require('Ext.grid.Grid');
Ext.require('Ext.data.TreeStore');
Ext.require('Ext.data.TreeModel');
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import CPanel from './Layout/CPanel';

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
    let Main = CPanel;// userData._user==1? CPanel : Home
    window._user = userData._user;
    if(!_user || !userData.access) window.location.href="https://azmoon.tarvijequran.ir/"
  return (
      <Router>
        <Switch>
            <Route component={props => (<Main {...props} parent={this} userData={userData} />)} />
          </Switch>
      </Router>
  )
}
}

