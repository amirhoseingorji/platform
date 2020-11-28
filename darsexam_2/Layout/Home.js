import React, { Component } from 'react';
import { Container,TitleBar ,Image} from '@sencha/ext-modern';
// import { Transition } from '@sencha/ext-react-transition';
import { Switch, Route, withRouter } from 'react-router-dom';
import * as Targets from './Home';
// import loginback from '../Statics/Images/loginback.png'
Ext.require('Ext.MessageBox');

import Storer from "../Store/Storer"
class Home extends Component {
  state ={}
  componentWillMount() {
    window.userData = this.props.parent.state.userData;
    window.toast = Ext.toast
    if(this.props.history.location.pathname=="/Signout") this.props.history.push("/") 
   if(window.userData._user && !this.props.parent.state.userData._province) this.props.history.push("/UserInfo")
    Storer({
       target: {from:"menu",  cols: "$id as id,target"},
    }, this);  
  }
  render = () => {
     let { target } = this.state
    return <Container fullscreen layout="fit"   style={{margin:"auto"}} >
      {target && target.length > 0 &&
            <Switch>           
             {target.map((e, i) => <Route path={e.id} component={Targets[e.target]} exact key={i} />)}             
            </Switch>
      }
    </Container>
  }
}
export default withRouter(Home);
