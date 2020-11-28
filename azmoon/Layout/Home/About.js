import React, { Component } from 'react';
import { Container, Image,SegmentedButton,Button } from '@sencha/ext-modern';
import { MapField, Advertise, Title, CommentsForm } from '../../Componnet/*';
import Storer from "../../Store/Storer"
//statics
import logo from '../../Statics/Images/abouus2.png';
export default class About extends Component {

  componentWillMount() {
    Storer({
     pages:{0:{status:"1",id:"4"}},
    }, this);
  }
  
  render() {

    return <Container padding="10" cls="ltr" scrollable >
      <Container cls="rtl" margin={10}>
        <Title icon="info" text="راهنمای سامانه" style={{fontSize:"25px"}} />
        <br/>
        <Container layout="hbox" >
        <Image src={logo}  flex={1}  mod='img'  />

        </Container>
      

        {this.state.pages && this.state.pages[0] && this.state.pages[0].src ? <img src={this.state.pages[0].src}  height="100px" width="100%" style={{objectFit: "contain"}} />: null}

<div  style={{fontSize:"17px", "textAlign": "justify",padding:"18px",lineHeight:"32px",color:"#555555"}} >

  {this.state.pages && this.state.pages[0] ?this.state.pages[0].text : null}
  

  
</div>
<br/><br/>
                                <hr/>
        <Container layout={Ext.platformTags.phone ? "vbox" : "hbox"} cls="ltr">

          <Container flex="1" cls="rtl" layout='center' >
            <Title icon="comments" text="ارسال نظرات" />
            <CommentsForm />
          </Container>
        </Container>
      </Container>
      {/* <Advertise ref={"advertise"} /> */}
    </Container>
  }
}
