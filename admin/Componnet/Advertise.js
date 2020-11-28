import React, { Component } from 'react';
import { Container, Image } from '@sencha/ext-modern';
import { medium, large } from '../Config';
export default class Advertise extends Component {
  state = {...this.props,data:[]}
  render = () => <Container {...this.Cprops} scrollable style={{ overflow: "visible" }}>
        {this.state.data.map((e, i) => <a key={i} target="_blank" href={e.href}><Image mode='img' cls="x-ads-img" src={e.src} /></a>)}
      </Container>
  Cprops = {
    cls: 'x-advertisement',
    ref: 'Advertise',
    responsiveConfig: {
      [medium]: {
        docked: 'bottom',
        layout: 'hbox',
        width: '100%',
        height: '50',
      },
      [large]: {
        docked: 'left',
        layout: 'vbox',
        width: '140',
        height: '100%',
      },
    },
  };
}
