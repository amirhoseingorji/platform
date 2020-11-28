import React, { Component } from 'react';
import { Container ,Image} from '@sencha/ext-modern';
import Procces from './Procces';
import colorfooter from  '../../Statics/Images/colorfooter.jpg';
export default class UserInfo extends Component {
  
  render = () =>
    <Container layout="fit" cls='backphone2' >
      <Container layout='fit' margin="0" scrollable ref="mainPage" cls='rtl' >
        <Procces parent={this} route={"Info"} flex={1}/>
        {/* <Image width="100%" src={colorfooter} hidden={!Ext.platformTags.phone}  height="10px" docked="bottom"/> */}
      </Container>
    </Container>
}
