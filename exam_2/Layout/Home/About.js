import React, { Component } from 'react';
import { Container, Image,SegmentedButton,Button } from '@sencha/ext-modern';
import { MapField, Advertise, Title, CommentsForm } from '../../Componnet/*';
import Storer from "../../Store/Storer"
//statics
import logo from '../../Statics/Images/abouus2.png';
export default class About extends Component {
  donate = 1;
    upcount(n) {
        this.donate = Math.max(1, this.donate + n);
        this.refs.donatbtn.setText("حمایت مالی " + this.donate * 50000 + " تومان")
        this.refs.donatbtn.setPressed(true);
    }
    donation(money, id) {
        window.socket.emit("pay", money, window.location.hostname, id);
        window.socket.on("paylink", link => { window.location.href = link });
    }
  componentWillMount() {
    Storer({
     // advertise: {},
       about: { from: "pages", cols: "text,title,icon,src" ,0:{name:"about"}},

    }, this);
  }
  
  render() {
    let { about, aboutadress } = this.state
    about = about[0] || {}
  
    
    return <Container padding="10" cls="ltr" scrollable >
      <Container cls="rtl" margin={30}>
        <Title text="مدارس اندیشمند" style={{fontSize:"20px"}} />
        <br/>
        <Container layout="hbox" >
        <Container flex={2} ><div style={{fontSize:"18px",    "textAlign": "justify",lineHeight:"32px",color:"#555555"}} dangerouslySetInnerHTML={{ __html: about.text }} /></Container>
        {/* <Image src={logo}  flex={1}  mod='img'  /> */}

        </Container>


      </Container>
    </Container>
  }
}
