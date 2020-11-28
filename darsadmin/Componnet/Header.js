import React, { Component } from 'react';
import { TitleBar, Button, Image, Container, TextField, SearchField, PasswordField, TabBar, Tab } from '@sencha/ext-modern';
import Logo from '../Statics/Images/logo.png';
import Storer from "../Store/Storer";
export default class Header extends Component {
  state = {...this.props,print:false}

  secondTabChange =(th, newTab) =>  this.navigate(newTab._itemId);
  componentWillMount(){
    let {_user_factor} = window.userData
   // Storer({ user_factor_cart: {0:{_user_factor}} }, this);
  }
  navigate = path => this.props.history.push (path);
  login(){
      let username = this.refs.username.getValue()
      let password = this.refs.password.getValue()
      this.navigate("/User");
      window.socket.emit("fastlogin",username,password)
  }
  search(){
    let search = this.refs.search.getValue()
    if(search){
    this.refs.search.setValue("")
    this.navigate("/Search?search="+search)
    }
  }
  render () {
    let {_user,name} = this.props.parent.props.parent.state.userData
    var strTitle = '<h2 style="margin:0">مدرسه</h2>';
    strTitle+= Ext.platformTags.phone? "": 'سامانه مدیریت پرتال';
    let {print} = this.state
    if(print){
      window.MainMenu.setHidden(true);
      window.footer.setHidden(true);
    }else if(window.MainMenu && window.footer ){
//      window.MainMenu.setHidden(false);
//      window.footer.setHidden(false);
    }
    window._cart = this.state.user_factor_cart
    return (
      <Container layout="vbox" docked="top" shadow>
      {Ext.platformTags.phone &&
            
            <TitleBar padding= "0 10" title={strTitle} cls="rtl" height={ 60 }>
              
            <Button align="left" iconCls="x-fa fa-bars" handler={()=>{this.props.parent.refs.MainMenu.toggleAppMenu()}} />
            <Image src={Logo} {...this.ImageProps} height={50} align="left" />
            
        </TitleBar>
      }
        {Ext.platformTags.phone &&
        
          <TabBar padding="0" height="40" onActiveTabChange={this.secondTabChange.bind(this)} activeTab={window.location.pathname}>
           {_user ? <Tab itemId="/Cart" iconCls="x-fa fa-shopping-cart" cls="x-second-tab" badgeText={this.state.user_factor_cart?this.state.user_factor_cart.length:0} />:null}
            <Tab itemId="/User" iconCls="x-fa fa-user" cls="x-second-tab" />
            <Tab itemId="/Search" iconCls="x-fa fa-search" cls="x-second-tab" />
            <Tab itemId="/Products" iconCls="x-fa fa-shopping-bag" cls="x-second-tab" />
            <Tab itemId="/Contents" iconCls="x-fa fa-newspaper-o" cls="x-second-tab" />
            <Tab itemId="/Matches" iconCls="x-fa fa-flag-checkered" cls="x-second-tab" />
            <Tab itemId="/Exams" iconCls="x-fa fa-check-square-o" cls="x-second-tab" />
            <Tab itemId="/Games" iconCls="x-fa fa-gamepad" cls="x-second-tab" />
            <Tab itemId="/" iconCls="x-fa fa-home" cls="x-second-tab" />
          </TabBar>}
      </Container>
    );
  }
  ImageProps = {
    mode: 'img',
    height: '60',
    margin: '10',
  };
}
