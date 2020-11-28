import React, { Component } from 'react';
import { TreeList, Container, Image, Panel, TitleBar, Sheet,Button,SearchField,TextField,PasswordField } from '@sencha/ext-modern';
import { medium, large } from '../Config';
import PerfectScrollbar from 'perfect-scrollbar';
import Storer from "../Store/Storer"
//statics
import Logo from '../Statics/Images/logo.png';
import miniLogo from '../Statics/Images/minilogo.png';
import Bar from '../Statics/Images/bar.jpg';
import fav from '../Statics/Images/favicon.png';
import arcore from '../Statics/Images/arcore.png';
import arkit from '../Statics/Images/arkit.png';
// import enamd2 from '../Statics/Images/enamad2.png';
import Arman from '../Statics/Images/Arman.png';
export default class NavMenu extends Component {
  parent = this.props.parent;
  state = { showAppMenu: false ,user_factor_cart:[],micro:false};
  componentDidMount(){
   // new PerfectScrollbar(this.refs.menu.el.dom.firstChild.firstChild.firstChild);
    window.MainMenu= this.refs.menu;  
   // console.log(  window.MainMenu) 
  }
  componentWillMount(){

  }
  toggleAppMenu(){
    this.setState({ showAppMenu: this.state.showAppMenu?false:true });
  }
  refactor(){
  //  Storer({ user_factor_cart: {} }, this);
  }
  login(){

    console.log(this.refs.username)
      let username = this.refs.username.cmp.getValue()
      let password = this.refs.password.cmp.getValue()
      this.navigate("/");
      window.socket.emit("fastlogin",username,password)
  }
  search(){
    let search = this.refs.search.cmp.getValue()
    if(search){
    this.refs.search.setValue("")
    this.navigate("/Movies?search="+search)
    }
  }
  navigate(path) {
    if(path.slice(0,4)=="http"){
      window.location.href = path
    }else{
          this.setState({ showAppMenu: false });
    this.props.history.push(path);
    }
  }
  panel = () => {
    let {_user,name,user} = this.props.parent.props.parent.state.userData
   // var strTitle = '<h4 style="margin:0">سامانه ثبت نام مدارس اندیشمند</h42>';
    //strTitle+= Ext.platformTags.phone? "": 'روایتگر دنیایی نو';
    // if(this.props.store){
    //   console.log(this.props.store)
    // this.props.store.filter({ menu: 1 })
    // this.props.store.sort("ord", "ASC")
    // }
    let {print} = this.state
    let nameuser =  name||user;
    if(this.state.micro) this.searchProps.hidden = true;
    return (<Panel {...this.PanelProps} >
      {/* {Ext.platformTags.phone &&
        <TitleBar title={window.document.title} docked="top" cls="rtl" height="120">
          <Image src={Logo} {...this.ImageProps} height="120" />
        </TitleBar>} */}
        <Image src={"https://chamran.sitenevis.com/logo.png"} {...this.logoProps} margin="30 10 0" mode="img"  height={this.state.micro?30:70} onTap={()=>{this.props.history.push("/")}}  />
        <Container {...this.searchProps} style={{color:"#fff",fontSize:"18px"}} layout="center" padding="5">
         چمرانی ها
        </Container>
        
        <br></br>
        {!Ext.platformTags.phone &&
            <Container layout={{align: 'left', type: 'vbox'}} align="let" cls="rtl" width="100%">
            {print==true ? <div > {print ? "کاربر : "+(nameuser):""} </div> :
              (_user ? <Container {...this.searchProps} layout="vbox" padding="10">
              
              
              {/* <Button ui="Alt Raised round" hidden shadow iconCls="x-fa fa-shopping-cart titleIcon" ripple={false} badgeText={this.state.user_factor_cart?this.state.user_factor_cart.length:0} cls="shopingButton rtl" height='33' margin="3" style={{ color: "white", backgroundColor: "#7eafe1" }} handler={() => { this.navigate("/Cart") }} />
                <Button ui="Alt Raised round" hidden margin="3" shadow iconCls="x-fas fa-sign-out-alt titleIcon" ripple={false}  cls="shopingButton rtl" height='33' style={{ color: "white", backgroundColor: "#7eafe1" }} handler={() => { this.navigate("/Signout") }} /> */}
                <Container margin={8} flex="1"  padding="2 20" cls ="x-round" style={{color: "#283593" ,backgroundColor:"#BBDEFB" ,fontSize:"large",width:"250px"}}>  <div>{ "کاربر : "+nameuser}</div></Container>
              </Container>
              : <Container {...this.searchProps} layout="hbox" padding="3 3 0 3">     
                <TextField ref="username" name="username" height='30' margin="3" width="110" placeholder="نام کاربر" cls="rtl x-round headerInput" shadow style={{ color: "white", backgroundColor: "#7eafe1" }} onAction={() => { this.login() }} />
                <PasswordField ref="password" name="password" height='30' margin="3" width="110" placeholder="رمز عبور" cls="rtl x-round headerInput" shadow style={{ color: "white", backgroundColor: "#7eafe1" }} onAction={() => { this.login() }} />
                <Button ui="Alt Raised round" shadow iconCls="x-fa fa-key titleIcon" ripple={false} cls="shopingButton rtl" height='33' style={{ color: "white", backgroundColor: "#7eafe1" }} handler={() => { this.login() }} />
                {/* <Button ui="Alt Raised round" shadow iconCls="x-fa fa-shopping-cart titleIcon" ripple={false} badgeText={this.state.user_factor_cart.length} cls="shopingButton rtl" height='33' style={{ color: "white", backgroundColor: "#7eafe1" }} handler={() => { this.navigate("/Cart") }} /> */}
              </Container>)
              }
              {!print && <SearchField hidden {...this.searchProps} align="center" ref="search" width="93%" height="30"  placeholder="جستجو" cls="ltr x-round headerInput" style={{ backgroundColor: "#7eafe1"}} ui="Alt Raised round" shadow onAction={() => { this.search() }} onMouseDown={() => { this.search() }}/>}
              
              </Container>}
              <br/>
      <TreeList
        {...this.TreeListProps}
        micro = {this.state.micro}
        width = {this.state.micro?56 : 280}
        store={this.props.store}
        onItemClick={(t, item) => this.navigate(item.node.getId())}
      />

       <Container {...this.footerProps} 
       hidden={this.state.micro|| true}
       >
      <Image src={Arman}   {...this.ImageProps}  onTap={()=>this.navigate("/About")} />
        <Image src={arcore} {...this.ImageProps} />
        {/* <Image src={fav} {...this.ImageProps} /> */}
        <Image src={arkit} {...this.ImageProps} />
        {/* <img id = 'jxlzwlaoapfuwlaorgvjfukz' style = 'cursor:pointer,height: 60px;margin:10px' onclick = '' alt = 'logo-samandehi' src = 'https://logo.samandehi.ir/logo.aspx?id=145436&p=nbpdshwlujynshwlqftiwlbq' /> */}
         {/* <Image alt = 'logo-samandehi' src = 'https://logo.samandehi.ir/logo.aspx?id=145436&p=nbpdshwlujynshwlqftiwlbq' {...this.ImageProps} onTap={()=>{window.open("https://logo.samandehi.ir/Verify.aspx?id=145436&p=rfthaodsdshwaodsxlaogvka", "Popup","toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")}} />  */}
        <Image src={Bar} height="10"  docked="bottom"/>

      </Container> 
    </Panel>
    );
  }
  render() {
//console.log(this.state.user_factor_cart)

    if (Ext.platformTags.phone)
      return <Sheet displayed={this.state.showAppMenu} side="right" onHide={() => this.setState({ showAppMenu: false })}>
        {this.panel()}
      </Sheet>
    else return this.panel();
  }

  componentWillMount() {
    if (!Ext.platformTags.phone) {
      this.PanelProps.docked = 'right';
      this.PanelProps.shadow = true;
      this.PanelProps.zIndex = 2;
      // this.TreeListProps.responsiveConfig = { [medium]: { micro: true, width: 56 }, [large]: { micro: false, width: 280 } };
      // this.footerProps.responsiveConfig = { [medium]: { hidden: true }, [large]: { hidden: false } }
      // this.searchProps.responsiveConfig = { [medium]: { hidden: true }, [large]: { hidden: false } }
      // this.logoProps.responsiveConfig = { [medium]: { src: Logo,height:30 }, [large]: { src: Logo,height:70 } }
      let {_user_factor} = window.userData
     // Storer({ user_factor_cart: {0:{_user_factor}} }, this);
    }else{
        
    }

    
  }
  logoProps = {}
  searchProps = {
   
  }
  PanelProps = {
    ref: 'menu',
    scrollable: true,
    height: '100%',
    cls: 'rtl mainmenu',
    style: { backgroundColor: '#3949AB' }
  };
  footerProps = {
    docked: 'bottom',
    layout: { type: 'hbox', pack: 'center' },
    cls: 'rtl',
    style: { backgroundColor: '#283593' }
  };
  ImageProps = {
    mode: 'img',
    height: '60',
    margin: '10',
  };
  TreeListProps = {
    ui: 'nav', 
    cls: 'rtl',
    expanderFirst: false,
    selection: window.location.pathname,
    width: '280',
    style: { color:"#eeeeee",backgroundColor: '#283593' }
  };
}
