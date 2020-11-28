import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import Storer from "../../Store/Storer";
export default class Brands extends Component {
  state={tip_types:[]}
  componentWillMount() {
    Storer({
      tip_types: {cols: "id,title as text"},
    },this);
  }
  toArray(data){
    let arr=[];
    data.map(e=>arr[e.id]=e.text)
    arr[0]="";
    return arr;
  }

  render = () => {
    if( this.state.tip_types.length==0  ) return null;
    this.tip_types = this.toArray(this.state.tip_types)
    this.config = {
      cols: {
        id: { text: "حذف" ,btn:"delbtn" },
        "`id`":{text:"شناسه",dataIndex:"id"},
        ord: { text: 'ترتیب',type:"number" },
        title: { text: "نام", flex: 1 ,editable:true},
        farsi: { text: "فارسی", flex: 1 ,editable:true},
        src: { text: "تصویر",btn:"imgbtn" },
        _tip_types: { text: "دسته بندی",renderer:v=>v.split(",").map(e=>this.tip_types[e.slice(1,-1)]).join(),editable:true,flex:2 }
      },
      from: "brands",
      title: "برند ها",
      icon: "eercastcar",
      order:"ord",
      asc:true,
      new:{hidden:false,title:"برند جدید",ord:0},
      filter:{hidden:false},
      num:1000,
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}
