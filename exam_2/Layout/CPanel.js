import React, { Component } from 'react';
import { Transition, Container } from '@sencha/ext-modern';
import { Switch, Route, withRouter } from 'react-router-dom';
import * as Targets from './CPanel';
import { Header, MainMenu } from '../Componnet/*';
//Store
import Storer from "../Store/Storer"

class Home extends Component {
  state ={Targets}
  componentWillMount() {
    let path = this.props.history.location.pathname
    if(path=="/Signout" || path=="/User")   this.props.history.push("/") 
  // window.userData = this.props.parent.state.userData;
    Storer({
       menu: { refresh:true,store: "tree", cols: "$id as id,$pid as pid,title as text,iconCls",order:"ord" ,asc:true,0:{view:1,_user_access:"1,"+window.userData._user_access}},
       target: {from:"menu",  cols: "$id as id,target",0:{target:"{is not null}",$id:"{is not null}",_user_access:"1,"+window.userData._user_access}},
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
       {/* <Header {...this.props} ref="Header" parent={this}  parent={this} />  */}
    
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
