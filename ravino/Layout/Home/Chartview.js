import React,{ Component } from 'react';

    // Add mouse and touch events for rotation
 
    
    
        
    
export default class Data extends Component {
    query(){
        let query={};
        let searchVal  = decodeURIComponent(window.location.search)
        searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
        
        return query;
      }
  componentDidMount = () =>{
    
  }
    render = () =>{

    return   <div id="container">1234</div>


  }
}