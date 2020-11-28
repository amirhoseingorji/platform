import React, { Component } from 'react';
import {  Container } from '@sencha/ext-modern';
import {  Title } from '../../Componnet/*';
import PerfectScrollbar from "perfect-scrollbar";
import Storer from "../../Store/Storer"
export default class Contents extends Component {
  componentWillMount(){
    // let cols="id,ImageSrc as src,title as text,price,ago";
    // Storer({
    //   spears:{from:"product",cols,0:{type:"spears"},num:10},
    // },this);
  }
  componentDidMount() {
    //new PerfectScrollbar(this.refs.homePage.el.dom.firstChild.firstChild.firstChild);
  }
  render=()=> {
   // let {tags,brands,spears,general,support,edu,news} = this.state
    return <Container layout={{ type: 'vbox' }} padding="0px 10px" scrollable ref='homePage'  >
      <Title text="محتوا ها" icon="book" />
      </Container>
  }
  Vprops = {shadow:true,round:true,...this.props}
}