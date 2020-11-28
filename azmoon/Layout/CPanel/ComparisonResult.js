import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
import moment from 'moment-jalaali'
moment.loadPersian({usePersianDigits: false})
export default class ComparisonResult extends Component {
  state = {value:false,subs:false,comparison:false}
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
    
    return query;
  }
componentWillMount(){
  let _comparison_value = this.query()._comparison_value;
  Storer({
    comparison:{0:{id:"{in (select _comparison from comparison_value where id  = "+_comparison_value+")}"}},
    value:{0:{id:"{in (select _value from comparison_value where id  = "+_comparison_value+")}"}},
    subs:{from:"value",0:{pid:"{in (select _value from comparison_value where id  = "+_comparison_value+")}"},order:"ord"},
  },this);
}
  render = () =>{
    if(!this.state.subs || this.state.subs.length==0) return null;
    if(!this.state.value || this.state.value.length==0) return null;
    if(!this.state.comparison || this.state.value.comparison==0) return null;

    this.config = {
      cols: {

        "comparison_user_value.id":{text:"",dataIndex:"id",width:60},
         _user :{text:" کاربری",width:60},
         name :{text:"نام"},
         weight :{text:"ضریب کاربر"},
         "comparison_user_value.status" :{text:"وضعیت",btn:"selector",options:{0:"انجام نشده",1:"انجام شده"},dataIndex:"status"},
        
        max:{text:" بهترین",formatter:'number("0.00")'},
        min:{text:" بدترین",formatter:'number("0.00")'},
        maxid:{text:"بهترین نسبت به"},
        minid:{text:"نسبت به بد ترین"},
        bymin:{text:""},
        bymax:{text:""},

        //select concat("{",GROUP_CONCAT(concat(comparison_user_value_detail._value,':',comparison_user_value_detail.bymin),","),"}") bymin , concat("{",GROUP_CONCAT(concat(comparison_user_value_detail._value,':',comparison_user_value_detail.bymax),","),"}") bymax from comparison_user_value join comparison_user_value_detail on comparison_user_value.id = comparison_user_value_detail._comparison_user_value group by comparison_user_value_detail._comparison_user_value
        // _value :{text:"سنجه",width:60},
    
      },
      from : "comparison_user_value",
      join : "user",
      
 
      title: " نتایج سنجه " +this.state.value[0].name + "| " +this.state.comparison[0].name + "("+moment(this.state.comparison[0].start).format(" jD jMMMM ")+")  ",
      icon: "table",
      filter:{hidden:true},

      num:1000,
      history : this.props.history
    }
    for(let sub of this.state.subs) this.config.cols["concat('(',if(bymax<>'',bymax,'{}'),')[',"+sub.id+",']') maxsub"+sub.id] = {text:""}
    for(let sub of this.state.subs) this.config.cols["concat('(',if(bymin<>'',bymin,'{}'),')[',"+sub.id+",']') minsub"+sub.id] = {text:""}
    this.config.cols.maxid.columns = [];
    this.config.cols.minid.columns = [];
    for(let sub of this.state.subs) this.config.cols.maxid.columns.push({text:sub.name,dataIndex:"maxsub"+sub.id,cid:sub.id,align: 'center',xtype: 'numbercolumn',renderer:this.renderer1,exportRenderer:this.renderer1})
    for(let sub of this.state.subs) this.config.cols.minid.columns.push({text:sub.name,dataIndex:"minsub"+sub.id,cid:sub.id,align: 'center',xtype: 'numbercolumn',renderer:this.renderer2,exportRenderer:this.renderer2})

   // for(let sub of this.state.subs) this.config.cols["1 sub"+sub.id] = {text:"بهترین به"+sub.name,dataIndex:"sub"+sub.id}
   /// for(let sub of this.state.subs) this.config.cols["2 sub"+sub.id] = {text:"به بدترین"+sub.name,dataIndex:"sub"+sub.id}
    return <Table {...this.config} />
  }
  renderer1(a,r,col){
    //console.log(a,r,col)
    //return a;
    col=a.split("[")[1].slice(0,-1)*1 ;
    
    a = (col == r.data.maxid) ? 9 : (col==r.data.minid ? 0 :  eval(a))
    a = (Math.round(a * 100) / 100).toFixed(2);
    let b=0;
    return isNaN(a) ? b.toFixed(2) : a
  }
  renderer2(a,r,col){
    //console.log(a,r,col)
    //return a;
    col=a.split("[")[1].slice(0,-1)*1 ;
    a = col == r.data.maxid ? 0 : (col==r.data.minid ? 1 : eval(a))
    a= (Math.round(a * 100) / 100).toFixed(2);
    let b=0;
    return isNaN(a) ? b.toFixed(2) : a
  }
}