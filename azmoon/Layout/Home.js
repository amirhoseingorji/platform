import React, { Component } from 'react';
import { Transition, Container } from '@sencha/ext-modern';
import { Switch, Route, withRouter } from 'react-router-dom';
import * as Targets from './Home';
import { Header, MainMenu } from '../Componnet/*';
//Store

import Storer from "../Store/Storer"
class Home extends Component {
  state ={}
  componentWillMount() {
    if(this.props.history.location.pathname=="/Signout") this.props.history.push("/") 
  // if(this.props.parent.state.userData._user && this.props.parent.state.userData.name==null) this.props.history.push("/UserInfo")
   window.userData = this.props.parent.state.userData;
    Storer({
       menu: { refresh:true,store: "tree", cols: "$id as id,$pid as pid,title as text,iconCls",order:"ord" ,asc:true, 0:{menu:1}},
       target: {from:"menu",  cols: "$id as id,target"},
      }, this);
    
  }
  componentDidMount(){
    window.Header = this.refs.Header;
    window.MainMenu = this.refs.MainMenu;

  }
  
  render = () => {
     let { target, menuStore } = this.state
     console.log(target)
    return <Container fullscreen layout="fit">
        <Header {...this.props} ref="Header" parent={this}  parent={this} /> 
    
      <MainMenu {...this.props} ref="MainMenu" parent={this} store={menuStore} />
      {target && target.length > 1 &&
        // <Transition >
          <Switch>
            {target.map((e, i) => <Route path={e.id} component={Targets[e.target]} exact key={i} />)}
          </Switch>
        // </Transition>
      }
    </Container>
  }
}
export default withRouter(Home);
