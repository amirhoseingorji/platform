import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Image ,Button} from '@sencha/ext-modern';
export default class Courses extends Component {
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });  
    return query;
  }
  qimage = (v,a) =>{
    return <Image src={v}  height="120"  />
    }
  

  render = () =>{
    this.config = {
      cols: {
        id:{text:"شناسه"},
        name:{text:"نام" ,flex:1},
        program:{text:"برنامه" ,flex:1},
        description:{text:"توضیحات" ,flex:1},
        status:{text:"وضعیت",btn:"selector",options:{0:"غیرفعال",1:"فعال"}},
        "`id`": { text: "ثبت نام" ,renderer:()=><Button text="ثبت نام" ui="action round"/>,dataIndex:"id" },
      },

      from : "course",
      title: "دوره ها",
      where : {_course_type:2},
      icon: "graduation-cap",
      filter:{hidden:true},
      num:1000,
      
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}