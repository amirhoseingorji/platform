import React, { Component } from 'react';
import { Container, Image } from '@sencha/ext-modern';
//import ReactTooltip from 'react-tooltip';
export default class ImageMap extends Component {
  continue(pageLink) {
    if (pageLink) this.props.history.push(pageLink)
  }
  render = () => {
  if(this.props.area.length==0) this.clipartProps.onTap =() => (this.props.target || this.props.continue) && this.continue(this.props.target || this.props.continue + "?"+this.props.itemName+"=" + this.props.id);
  return   <Container layout={{ type: 'vbox', align: 'center' }} padding={0}>
  {/* <ReactTooltip val={this.props.area}/> */}
    <Image src={this.props.src} {...this.clipartProps}  usemap={'#ImageMap' + this.props.id} />
    <div>sdfsdfg</div>
   { this.props.area.length ? <map name={'ImageMap' + this.props.id }>
      {this.props.area.map((e, i) =>
        <area key={i} shape={e.shape} coords={e.coords} title={e.title}
          onMouseDown={() => {
            e.href && this.props.history.push(e.href);
            e.fn && e.fn();
          }} />
      )}
    </map>
    :null}
  </Container>
  }
  clipartProps = {
    margin:0,
    floating: true,
   // mode: 'img',
    style: {
      backgroundSize:"cover",
      height: '100%',
      width: '100%',
    }
  }
};