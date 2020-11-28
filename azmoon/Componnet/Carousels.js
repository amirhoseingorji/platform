import React,{Component} from 'react';
import { Carousel} from '@sencha/ext-modern';
import { ImageMap } from './*';
export default class Carousels extends Component {
    state = {data:[],area:[],activeItem:0,...this.props} 
    componentDidUpdate(){
        let {data,activeItem,activeValue} = this.state
        if(activeValue) for(let i in data) if(data[i].value==activeValue) activeItem=i*1
        this.refs.main.setActiveItem(activeItem)
    }
    render(){
        let {data,area,activeItem,activeValue} = this.state
        data = data||[];
        return <Carousel {...this.props} activeItem={activeItem||data.length} ref="main" margin={30}>
        {data.map((e, i) => { 
          let _area = [];
          for(let a of area) if(a._carousel==e.id) _area.push(a);
          return <ImageMap src={e.src} {...this.props} area={_area} key={i} id={e.id} /> })}
      </Carousel>
    }
}