import React,{Component} from 'react';
import { Container ,Button,Image ,ToolTip} from '@sencha/ext-modern';
import moment from 'moment-jalaali'
moment.loadPersian({usePersianDigits: false})
export default class Textbox extends Component {
    componentWillMount (){
        this.setState({...this.props,helpdialog:false})
        this.parent = this.props.parent
    }
    render(){
        let bars=["#39b54a","#f5f777"]
        let {title,status,date,description,full,id} = this.state;
        return <Container  style={{...this.props.style,background:"linear-gradient(-90deg, "+bars[status]+" 12px, #FFFFFF 0%)"}} cls={this.props.cls} className="rtl box Texbox" shadow    >
                                        <Container className="blue2 boxitems ltr" docked="top"  >
                                
                                <div>تاریخ انتشار {moment(date).format("jYYYY/jM/jD")} </div> 
                            </Container>
                     <h4 style={{margin:"0"}} className="darkblue" >{title}{status==0?<i className="fal fa-thumbtack"></i>:null}</h4>
                     <div className="blue2 boxguide" style={{minHeight:full?"300px":""}}>{description}</div>
                     <Button hidden={full} cls={"ltr orange  "} text="ادامه مطلب"  width="80" textAlign={"left"} style={{margin:"0 0 0 auto"}} ui="round" handler={()=>{this.parent.navigate('/Notifs?id='+id)}}  docked="bottom"/>  
               </Container>
        
    }
}