import React, { Component } from 'react';
import { Container  } from '@sencha/ext-modern';
import { Switch, Route, withRouter } from 'react-router-dom';
import * as Targets from './Home';
import loginback from '../Statics/Images/loginback.png'
Ext.require('Ext.MessageBox');
class Home extends Component {
  state = {}
  componentWillMount() {
    if (this.props.history.location.pathname == "/Signout") this.props.history.push("/")
    if (this.props.parent.state.userData._user && (this.props.parent.state.userData.name == null || this.props.parent.state.userData.name == "")) this.props.history.push("/UserInfo")
    window.userData = this.props.parent.state.userData;
  }
  render = () => {

    let target = [{ "id": "/", "target": "User" }, { "id": "/UserInfo", "target": "UserInfo" }, { "id": "/NewExam", "target": "MyResult" }, { "id": "/Transactions", "target": "Transactions" }, { "id": "/Signout", "target": "Signout" }, { "id": "/Signout", "target": "Signout" }, { "id": "/", "target": "Dashboard" }, { "id": "/Exams", "target": "Exams" }, { "id": "/Matches", "target": "Matches" }, { "id": "/Users", "target": "Users" }, { "id": "/OffCodes", "target": "OffCodes" }, { "id": "/Transactions", "target": "Transactions" }, { "id": "/Factors", "target": "Factors" }, { "id": "/MyExams", "target": "MyExams" }, { "id": "/Exam", "target": "Exam" }, { "id": "/Prepayuser", "target": "Prepayuser" }, { "id": "/Questions", "target": "Questions" }, { "id": "/Matchuser", "target": "Matchuser" }, { "id": "/Notifs", "target": "Notifs" }]
    
    return <Container fullscreen layout="fit" style={{ margin: "auto" }} >
        <Switch>
          {target.map((e, i) => <Route path={e.id} component={Targets[e.target]} exact key={i} />)}
        </Switch>
    </Container>
  }
}
export default withRouter(Home);
