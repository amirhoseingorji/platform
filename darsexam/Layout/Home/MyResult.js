import React, { Component } from 'react';
import { Container, Image,SegmentedButton,Button ,RadioField, FormPanel,Dialog, Menu, MenuItem} from '@sencha/ext-modern';
import { MapField, Advertise, Title, CommentsForm } from '../../Componnet/*';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Storer from "../../Store/Storer"
import colorfooter from  '../../Statics/Images/colorfooter.jpg';
import map from  '../../Statics/Images/map.jpg';
import footer_title from '../../Statics/Images/footer_title.png';
import result_art from '../../Statics/Images/result_art.png';
//statics
import logo from '../../Statics/Images/abouus2.png';
export default class Exam extends Component {
state={

  result:"fffffffffffffff",

}
  navigate = (path) => {
    this.props.history.push(path);
}


componentWillMount(){
  window.socket.emit("personal",window.userData._user)
  window.socket.on("personal",(result)=>{
    window.socket.off("personal")
    this.setState({result})
  })
}
  render() {
  
console.log(this.state.result)
    return <Container padding="0" cls="rtl" layout='fit' cls={Ext.platformTags.phone?"backphone":'backphone2'}  >
      <Container    style={{padding:"0"}} centered style={{padding:"0px",width:"100%", height:Ext.platformTags.phone?"100%":""}} >
<Container scrollable shadow={!Ext.platformTags.phone}   style={{padding:"10px 0 0",fontSize:"18px",lineHeight:"38px",textAlign:"justify" , maxWidth:"800px",width:"100%", backgroundColor:Ext.platformTags.phone?"":"#ffffff"  ,borderRadius:"7px" ,margin:Ext.platformTags.phone?"0":"5px auto",height:Ext.platformTags.phone?"100%":"",minHeight:"450px"}}> 
<Container margin={Ext.platformTags.phone?"0 auto 10 0":"0 15 15 15"} padding="0 0 10 0"   cls="rtl"  style={{color:"#0ec7c0",backgroundColor:Ext.platformTags.phone?"":"#ffffff",borderRadius:Ext.platformTags.phone?"":"10px"}} docked="top"  >
        
           <Container margin={Ext.platformTags.phone?"0 10":"10 0 0"}><h2>نتایج آزمون</h2></Container>
    

    
    <Button  text="بازگشت" docked="right" cls="resentbtn ltr" handler={()=>this.navigate('/')} iconCls="x-fal fa-arrow-left" textAlign="left" width="90px" iconAlign="left" height="25" style={{margin:"auto"}} />    

    </Container>
    <Container  >
    <Image src={result_art} mode='img'  width="150" style={{margin:"auto"}}/>
    <div dangerouslySetInnerHTML={{ __html: this.state.result }} style={{textAlign:"center"}}></div>
    
    </Container>
        <Container layout={{type:"vbox"}} docked="bottom" width="100%"  >
              
<Image width="100%" src={colorfooter}   height="8"  style={{top:"1px",backgroundSize:"cover"}} hidden={Ext.platformTags.phone}/>
        </Container>


                   
        </Container>
        <Container docked="bottom" >
        <Image src={footer_title} mode='img' /><Image width="100%" src={colorfooter} hidden={!Ext.platformTags.phone}  height="8"  style={{top:"1px",backgroundSize:"cover"}} /></Container>

      </Container>
    </Container>
  }
}
//class="x-no-min-content  x-radiofield x-checkboxfield x-field x-component x-label-align-left x-label-align-horizontal x-body-align-end x-label-text-align-left x-no-label-wrap x-box-labeled x-error-target-qtip x-layout-box-item x-layout-hbox-item x-flexed"