import React, { Component } from 'react';
import { TitleBar, Button, Image, Container, TextField, SearchField, PasswordField, TabBar, Tab } from '@sencha/ext-modern';
import Logo from '../Statics/Images/logo.png';
import Storer from "../Store/Storer";
export default class Header extends Component {
  state = {...this.props,print:false,hidbar:false}

  secondTabChange =(th, newTab) =>  this.navigate(newTab._itemId);
  componentWillMount() {
    window.Header = this
    let {_user_factor} = window.userData
    Storer({user_factor_cart: {0:{_user_factor}}, footer: { from: "menu", cols: "$id as id,title as text,iconCls", 0: {  $pid: "{is null}",menu:2 },order:"ord",asc:false } }, this);
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
   // console.log(window.location.pathname)
   let {hidbar} = this.state
   //for(let e of this.state.footer) if(window.location.pathname==e.id) hidbar *=0
    return (
      <Container layout="vbox" docked="bottom" >
      {/* {Ext.platformTags.phone && false &&
            
            <TitleBar padding= "0 10" title={strTitle} cls="rtl" height={ 60 }>
              
            <Button align="left" iconCls="x-fa fa-bars" handler={()=>{this.props.parent.refs.MainMenu.toggleAppMenu()}} />
            <Image src={Logo} {...this.ImageProps} height={50} align="left" />
            
        </TitleBar>
      } */}
        { _user > 0 ?
        // onActiveTabChange={this.secondTabChange.bind(this)}
          <TabBar padding="0"  hidden={hidbar} height="40"   >
           {this.state.footer.map((e, i) => <Tab key={i} itemId={e.id} cls="x-second-tab"  iconAlign="top" iconCls={e.iconCls} text={e.text}   active={(window.location.pathname==e.id)}  
           onTap={()=>{         this.navigate(e.id)         }}
           />)}
          </TabBar>:null}
      </Container>

    );
  }
  ImageProps = {
    mode: 'img',
    height: '60',
    margin: '10',
  };
}
