import React, { Component } from 'react';
import { Transition, Container,TitleBar ,Button,Image} from '@sencha/ext-modern';
import { Switch, Route, withRouter } from 'react-router-dom';
import * as Targets from './Home';
import { Header, MainMenu } from '../Componnet/*';

//Store

import Storer from "../Store/Storer"
class Home extends Component {
  state ={}
  componentWillMount() {
    if(this.props.history.location.pathname=="/Signout") this.props.history.push("/") 
   if(this.props.parent.state.userData._user && (this.props.parent.state.userData.name==null || this.props.parent.state.userData.name=="")) this.props.history.push("/UserInfo")
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
    return <Container fullscreen layout="fit" maxWidth="1000"  style={{margin:"auto"}} cls='forback'>
    
       {false && window.userData._user>0 ? <TitleBar padding= "0 10" title={'آزمون آنلاین اندیشمند'} cls="rtl" height={ 50 } docked="top">
              
              {/* <Button align="left" iconCls="x-fa fa-bars" handler={()=>{this.props.parent.refs.MainMenu.toggleAppMenu()}} /> */}
              <Image src={'https://andishmand.ir/wp-content/uploads/2019/07/logo.png'}  height={50} width={50} align="left" mode='img' />
              
          </TitleBar> : null}
      {/* <MainMenu {...this.props} ref="MainMenu" parent={this} store={menuStore} /> */}
      {target && target.length > 0 &&
          <Switch>
            {target.map((e, i) => <Route path={e.id} component={Targets[e.target]} exact key={i} />)}
          </Switch>
      }
       <Header {...this.props} ref="Header" parent={this}  parent={this} /> 
{/* <FooterTab {...this.props} /> */}
    </Container>
  }
}
export default withRouter(Home);
