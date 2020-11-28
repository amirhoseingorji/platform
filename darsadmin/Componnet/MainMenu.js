import React, { Component } from 'react';
import { TreeList, Container, Image, Panel, TitleBar, Sheet,Button,SearchField,TextField,SelectField } from '@sencha/ext-modern';
import { medium, large } from '../Config';
import PerfectScrollbar from 'perfect-scrollbar';
import Storer from "../Store/Storer"
//statics
import Logo from '../Statics/Images/logop1.png';
import miniLogo from '../Statics/Images/minilogo.png';
import Bar from '../Statics/Images/colorfooter.jpg';
import fav from '../Statics/Images/favicon.png';
import arcore from '../Statics/Images/arcore.png';
import arkit from '../Statics/Images/arkit.png';
// import enamd2 from '../Statics/Images/enamad2.png';
import Arman from '../Statics/Images/footer_title.png';
export default class NavMenu extends Component {
  parent = this.props.parent;
  state = { showAppMenu: false ,user_factor_cart:[],micro:false,
    user:[{text:window.userData.name,value:window.userData._user}],
    exam:[]
  };

  componentDidMount(){
   // new PerfectScrollbar(this.refs.menu.el.dom.firstChild.firstChild.firstChild);
    window.MainMenu= this.refs.menu;  
   // console.log(  window.MainMenu) 
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
    let useropt =  this.state.user;
    let exams = this.state.exam
    if(window.userData._user==1 || window.userData.co==1) useropt.unshift({text:"مدیریت آزمون",value:1})
    if(this.state.micro) this.searchProps.hidden = true;
    return (<Panel {...this.PanelProps} >
        <Image src={Logo}  margin="30 10 0" mode="img"  height={this.state.micro?30:70} onTap={()=>{this.props.history.push("/")}}  />

        
        <br></br>
        {!Ext.platformTags.phone &&
            <Container layout={{align: 'left', type: 'vbox'}} align="let" cls="rtl" width="100%">
           
               <Container {...this.searchProps} layout="vbox" padding="10">
                <Container margin={8} flex="1"  padding="2 20"  style={{color: "#263238" ,backgroundColor:"#CFD8DC" ,fontSize:"16px",width:"250px",borderRadius:"5px",padding:"5px"}} layout="hbox">  <div style={{textAlign:"center"}}>{ "کاربر : "}</div> 
                <SelectField textAlign="center" style={{fontSize:"large"}} value={window.userData._user} options={useropt} onChange={(a,b)=>{
                    window.socket.emit("chuser",b)
                }} ripple={false}/>

                </Container>
        {window.userData._user>1 ? <Container margin={8} flex="1"  padding="2 20"  style={{color: "#263238" ,backgroundColor:"#CFD8DC" ,fontSize:"16px",width:"250px",borderRadius:"5px",padding:"5px"}} layout="hbox">  <div style={{textAlign:"center"}}>{ "دوره : "}</div> 
                <SelectField textAlign="center" style={{fontSize:"large"}} value={window.userData.pid} options={exams} onChange={(a,b)=>{
                    window.socket.emit("chuserpid",b)
                }} ripple={false}/>

                </Container>:<div style={{height:"52px",width:"100%"}}></div>}
              </Container>

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
       hidden={this.state.micro}
       >
      <Image src={Arman}   {...this.ImageProps}  />
        <Image src={Bar} width="282" height="10"  docked="bottom" mode="img"/>

      </Container> 
    </Panel>
    );
  }
  render() {
    if (Ext.platformTags.phone)
      return <Sheet displayed={this.state.showAppMenu} side="right" onHide={() => this.setState({ showAppMenu: false })}>
        {this.panel()}
      </Sheet>
    else return this.panel();
  }

  componentWillMount() {
    let get = {} 
    if(window.userData._user==1 || window.userData.co==1) 
      get.user={cols:"user.id value,province.name text",ignore:true,join:"province",0:{access:">0"}} 
    if(window.userData._user>1) 
      get.exam={cols:"id value,name text",0:{pid:"0"}} 
    console.log({get})
    Storer(get,this); 

    if (!Ext.platformTags.phone) {
      this.PanelProps.docked = 'right';
      this.PanelProps.shadow = true;
      this.PanelProps.zIndex = 2;
    }
  }
  logoProps = {
    width:200
  }
  searchProps = {
   
  }
  PanelProps = {
    ref: 'menu',
    scrollable: true,
    height: '100%',
    cls: 'rtl mainmenu',
    style: { backgroundColor: '#0277BD' }
  };
  footerProps = {
    docked: 'bottom',
    layout: { type: 'hbox', pack: 'center' },
    cls: 'rtl',
    style: { backgroundColor: '#ECEFF1' }
  };
  ImageProps = {
    mode: 'img',
    height: '40',
    margin: '10',
  };
  TreeListProps = {
    ui: 'nav', 
    cls: 'rtl',
    expanderFirst: false,
    selection: window.location.pathname,
    width: '280',
    style: { color:"#263238",backgroundColor: '#5C6BC0' }
  };
}
