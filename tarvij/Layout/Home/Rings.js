import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Image } from '@sencha/ext-modern';
export default class Rings extends Component {
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
        name:{text:"نام" ,editable:true,flex:1},
        program:{text:"برنامه" ,editable:true,flex:1},
        description:{text:"توضیحات" ,editable:true,flex:1},
        status:{text:"وضعیت",btn:"selector",options:{0:"غیرفعال",1:"فعال"},type:"select"},
        "`id`": { text: "حذف" ,btn:"delbtn",dataIndex:"id" },
      },

      from : "course",
      title: "حلقه ها",
      where : {_course_type:1},
      icon: "dot-circle-o",
      filter:{hidden:true},
      num:1000,
      new:{hidden:false,_project:this.query()._project||0,name:"new_target"},
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}