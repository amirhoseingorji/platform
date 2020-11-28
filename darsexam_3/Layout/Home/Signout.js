import React, { Component } from 'react';
import Storer from "../../Store/Storer"
export default class Signout extends Component {
  componentWillMount(){
    Ext.Msg.confirm("اخطار","آیا مایل به خروج از حساب کاربری هستید؟",(st)=>{if(st=="yes") {
      Storer("sessions",this,{_user:0},"update");
      window.socket.emit("refresh");
    }else{
      this.props.history.goBack();
    }})
  }
  render=()=> null
}