import React,{Component} from 'react';
export default class Icon extends Component {
    render=()=><span className={"x-fa fa-"+this.props.name} style={{margin: '3px',fontSize:(this.props.size||16)+"px",color:this.props.color ,margin:"0 10px"}} />
}