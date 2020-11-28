import React,{Component} from 'react';
import Icon from "./Icon";
export default class Title extends Component {
    render(){
        let {icon,text,sub,size,H ,flex} = this.props;
        if( H=="h4") return <div className="rtl" style={this.props.style} ><h4 style={{margin:"0"}}>{icon && <Icon name={icon} size={size}/>}{text}</h4>{sub && <div style={{opacity:"0.5",lineHeight: "25px"}}>{sub}</div>}</div>
        else return <div className="rtl" style={this.props.style}  ><h2 style={{margin:"0"}}>{icon && <Icon name={icon} size={size}/>}{text}</h2>{sub && <div style={{opacity:"0.5",lineHeight: "25px"}}>{sub}</div>}</div>
    }
}