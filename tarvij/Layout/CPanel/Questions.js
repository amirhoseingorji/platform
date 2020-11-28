import React, { Component } from 'react';
import {  Container } from '@sencha/ext-modern';
import {  Title } from '../../Componnet/*';
import PerfectScrollbar from "perfect-scrollbar";
import Storer from "../../Store/Storer"
import Procces from './Procces';
export default class Questions extends Component {
  componentWillMount(){
    // let cols="id,ImageSrc as src,title as text,price,ago";
    // Storer({
    //   spears:{from:"product",cols,0:{type:"spears"},num:10},
    // },this);
  }
  componentDidMount() {
    ////new PerfectScrollbar(this.refs.homePage.el.dom.firstChild.firstChild.firstChild);
  }
  render=()=> {
   // let {tags,brands,spears,general,support,edu,news} = this.state
    return <Container layout="fit">
    <Container cls="rtl" layout={{ type: "vbox", align: Ext.platformTags.phone ? "strech" : "center", pack: "start" }}  layout="fit" margin="5" scrollable ref="mainPage"  >
        <Procces parent={this} route={"AdminQuestions"} />
      </Container>
    </Container>
  }
  Vprops = {shadow:true,round:true,...this.props}
}