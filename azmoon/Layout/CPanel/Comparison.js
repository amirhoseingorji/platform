import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
export default class Comparison extends Component {
 
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
    
    return query;
  }


  render = () =>{
    this.config = {
      cols: {

        "comparison.`id`":{text:"شناسه",dataIndex:"id",width:60},
        name :{text:"عنوان",type:"text" },
        //"id as view":{text:"صدا ها",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Chartview",col:"_chart",icon:"x-fa fa-chart-scatter"},width:60},
        //"id as view":{text:"نمایش",dataIndex:"id",renderer:(v)=><a title={v} className="x-fa fa-chart-scatter green" onClick={this.getdata.bind(this)}/>,width:60},
         "comparison.date":{text:" تاریخ ثبت",btn:"date",dataIndex:"date"},
        
        
      "comparison.`id` user" :{text:"انتخاب",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/ComparisonUsers",col:"_Comparison",icon:"x-fa fa-users"},width:60},
      "sum(comparison_user.done) tusers" :{text:"اعضا",dataIndex:"tusers",width:60},
      "sum(if(comparison_user.status=1,1,0)) cusers" :{text:"تکمیل",dataIndex:"cusers",width:60},
      "comparison.id value" :{text:"سنجه ها",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/ComparisonValue",col:"_Comparison",icon:"x-fa fa-chart-bar"},width:60},
        
        
      //  "id as target":{text:"صدا ها",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Sound",col:"_chart",icon:"x-fa fa-waveform-path"},width:60},
      start:{text:"شروع",btn:"date",type:"date"},
      end:{text:"پایان",btn:"date",type:"date"},
      description:{text:"توضیحات",type:"text",flex:1 },
      "if(end<now(),2,comparison.status) status": {text:"وضعیت",btn:"selector",options:{0:"غیرفعال",1:"فعال",2:"اتمام ارزیابی"},type:"select",dataIndex:"status"},
      "comparison.id":{text:"حذف",btn:"delbtn" ,width:60,dataIndex:"id"},
"if(comparison.status=2,true,if(end<now(),true,false)) as deny" :{text:""}
      },
      from : "comparison",
      join : "comparison_user",
      group :"comparison.id",
 
      title: "ارزیابی ها",
      icon: "money-check-edit",
      filter:{hidden:true},

      num:1000,
      newtext:"افزودن ارزیابی",
      new:{hidden:false,name:"ارزیابی جدید",start:"{now()}",end:"{now()+ INTERVAL 1 DAY}",doafter:()=>{
     //   Storer("comparison_user", this, {_comparison: "{(select max(id) from comparison)}",  _user:"{(select id from user where id>1)}" }, "insert");
      //  Storer("comparison_value", this, {_comparison: "{(select max(id) from comparison)}",  _value:"{(select id from value)}" }, "insert");


      }},

   //   new:{hidden:false,name:"نمودار جدید"},
      history : this.props.history
    }
    
    return <Table {...this.config} />
  }
}