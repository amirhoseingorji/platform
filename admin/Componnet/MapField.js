import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
 import LocateControl from './LocateControl'
//  import Locate from "leaflet.locatecontrol";
export default class MapField extends Component {
  state = { ...this.props,lat: 35.700900, lng: 51.4001515, zoom: 14 }
  getValue(){
    if(!this.refs.mark0) return null;
   let {lat,lng} = this.refs.mark0.leafletElement._latlng
    return ([Math.round(lat*10000)/10000,Math.round(lng*10000)/10000]).join();
  }
  render() {
    let { lat, lng, zoom } = this.state
    if(this.state.markers && this.state.markers.length == 1){
      lat=this.state.markers[0][0]*1
      lng= this.state.markers[0][1]*1
    }
    return <div style ={{width: "100%",height: "100%"} } className="map"><Map center={[lat, lng]} zoom={zoom}  style ={{width: "100%",height: "100%"} }>
      <TileLayer attribution="&amp;<a href=&quot;http://SiteNevis.com/&quot;>SiteNevis</a>" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocateControl ref='lc' options={this.locateOptions}  />
    
  {this.state.markers && this.state.markers.map((e, i) => <Marker ref={"mark"+i} position={[e[0]*1,e[1]*1]} draggable key={i}>{e[2] && <Popup><div>{e[2]}</div></Popup>}</Marker>)}
      
    </Map></div>
  }
  locateOptions = {
    position: 'topleft',
    strings: {
      title: 'موقعیت شما',
      popup: "محل شما"
    },
    keepCurrentZoomLevel: true,
    flyTo: true,
    drawMarker: true,
    drawCircle:true,
    done:(latlng)=>{
      let markers = this.state.markers
      markers[0] = [latlng.lat,latlng.lng];
      this.setState({markers})
    }
  }


}
