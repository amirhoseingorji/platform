import React, { Component } from 'react';
import { Container,Button } from '@sencha/ext-modern';
import PerfectScrollbar from 'perfect-scrollbar';
import Procces from './Procces';
import FooterTab from "./User/FooterTab"
import Storer from "../../Store/Storer"
import {Title} from '../../Componnet/*';
export default class UserInfo extends Component {

  componentDidMount() {
   // new PerfectScrollbar(this.refs.mainPage.cmp.el.dom.firstChild)
    //style={{margin:"auto"}}
  }
  componentWillMount(){
   
    // if(window.userData.mode!=0) {
    //   Ext.toast("اجازه ویرایش مشخصات برایش شما وجود ندارد",5000)
    //   this.navigate("/")
    // }
  }
  navigate = (path) => {
    this.props.history.push(path);
}
  render = () =>
    <Container layout="vbox" flex={1} >
      <Container cls="rtl" flex={1}  margin="5"  ref="mainPage" padding="0 0 0 0"  style={{textAlign:"center"}}>
      
      {/* <Title icon='info-circle' text=" اطلاعات ثبت نام" parent={this} />  */}

        <Procces parent={this} route={"Info"} flex={1}/>

      </Container>
      {/* <FooterTab {...this.props} /> */}
    </Container>
}
