import React, { Component } from 'react';
import { Container,TitleBar ,Image} from '@sencha/ext-modern';
import { Transition } from '@sencha/ext-react-transition';
import { Switch, Route, withRouter } from 'react-router-dom';
import * as Targets from './Home';
import loginback from '../Statics/Images/loginback.png'
Ext.require('Ext.MessageBox');

import Storer from "../Store/Storer"
class Home extends Component {
  state ={}
  componentWillMount() {
    if(this.props.history.location.pathname=="/Signout") this.props.history.push("/") 
   if(this.props.parent.state.userData._user && (this.props.parent.state.userData.name==null || this.props.parent.state.userData.name=="")) this.props.history.push("/UserInfo")
   window.userData = this.props.parent.state.userData;
    Storer({
       target: {from:"menu",  cols: "$id as id,target"},
    }, this);  
  }

  render = () => {
     let { target } = this.state
    return <Container fullscreen layout="fit"   style={{margin:"auto"}} >
       {false && window.userData._user>0 ? <TitleBar padding= "0 10" title={'آزمون آنلاین اندیشمند'} cls="rtl" height={ 50 } docked="top">
           <Image src={'https://andishmand.ir/wp-content/uploads/2019/07/logo.png'}  height={50} width={50} align="left" mode='img' />          
          </TitleBar> : null}
      {target && target.length > 0 &&

                        <Switch>
                      
              {target.map((e, i) => <Route path={e.id} component={Targets[e.target]} exact key={i} />)}
             
            </Switch>

   
          
      }
    </Container>
  }
}
export default withRouter(Home);
