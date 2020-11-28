Ext.require('Ext.Responsive');
Ext.require('Ext.grid.Grid');
Ext.require('Ext.data.TreeStore');
Ext.require('Ext.data.TreeModel');
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import {Public} from './Layout/*';

//import { Home ,CPanel} from './Layout/*';

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
    let Main = Public;// userData._user==1? CPanel : Home
    window._user = userData._user;
  return (
      <Router>
        {/* <Transition type="fade" duration={1000}>  */}
        <Switch>
            <Route component={props => (<Main {...props} parent={this} userData={userData} />)} />
          </Switch>
        {/* </Transition>  */}
      </Router>
  )
}
}

