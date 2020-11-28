import React, { Component } from 'react';
import Storer from "../../Store/Storer"
import Config from '../../Config';
import io from "socket.io-client";
export default class Signout extends Component {
  componentWillMount(){
    Storer("sessions",this,{_user:0,0:{_user:window.userData._user}},"update");
  }
  render=()=> {
    
    window.socket.emit("refresh");
    return null
  }
}