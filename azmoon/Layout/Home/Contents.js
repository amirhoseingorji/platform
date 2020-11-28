import React, { Component } from 'react';
import {  Container } from '@sencha/ext-modern';
import {  Title,Content } from '../../Componnet/*';
import PerfectScrollbar from "perfect-scrollbar";
import Storer from "../../Store/Storer"
export default class Contents extends Component {
  state={contents:[{title:""}]}
  componentWillMount(){
     let cols="id,src as ImageSrc,text as html,title";
    Storer({
      contents:{cols,num:10,order:"date",0:{type:"1",id:this.query().id}},
    },this);
  }
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
    
    return query;
  }
  componentDidMount() {
    //new PerfectScrollbar(this.refs.homePage.el.dom.firstChild.firstChild.firstChild);
  }
  render=()=> {
    let {tags,brands,spears,general,support,edu,news} = this.state
    return <Container layout={{ type: 'vbox' }} padding="10px 10px" scrollable ref='homePage'  >
      <Title text={this.state.contents[0] && this.state.contents[0].title} icon="book" />
      <Content {...this.state.contents[0]} padding="20" cls="rtl" style={{fontSize:"17px"}}/>
      </Container>
  }
  Vprops = {shadow:true,round:true,...this.props}
}