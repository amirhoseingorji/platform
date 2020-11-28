import React, { Component } from 'react';
import Table from '../../Componnet/Table';
export default class Comparison extends Component {
  componentWillMount() {
    console.log('loaded')
  }
  render = () => {
    this.config = {
      cols: {
        _comparison: { text: "شناسه" },
        name: { text: "نام", type: "text", flex: 1 },
        "comparison.id": { text: "شروع ارزیابی", dataIndex:"id", btn:"linkkey",exp:"key",options:{path:"/ComparisonProcess",col:"_comparison",icon:"x-far fa-play-circle large"},width:100},
       "comparison_user.status": { text: "وضعیت",btn:"selector",options:{0:"انجام نشده",2:"درحال انجام"},type:"select",dataIndex:"status"},
        start: { text: "تاریخ شروع", btn: "date" },
        end: { text: "مهلت ارزیابی", btn: "date" },
        
      },
      from: "comparison_user",
      join: "comparison",
      0: { status: "<>1" , done:1 },
      1: { start: "{<now()}", end: "{>now()}", status: 1 },
      title: "ارزیابی های فعال شما",
      icon: "chart-bar",
      filter: { hidden: true },
      print: { hidden: true },
      excel: { hidden: true },
      num: 1000,

      history: this.props.history
    }

    return <Table {...this.config} />
  }
}