import React, { Component } from 'react';
import Table from '../../Componnet/Table';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
export default class ComparisonUsers extends Component {
  state = { statuscheck: false }
  query() {
    let query = {};
    let searchVal = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if (e[0] != "") query[e[0]] = e[1]; });

    return query;
  }
  componentWillMount() {

    Storer({
      statuscheck: { from: "comparison", cols: "if(end<now(),2,status) status", 0: { id: this.query()._Comparison } },
    }, this);

  }

  render = () => {
    if (!this.state.statuscheck || this.state.statuscheck.length == 0) return null;
    this.config = {
      cols: {
        "done": { text: " ", type: "check", dataIndex: "done", headerCheckbox: true, disabled: this.state.statuscheck[0].status > 1 },
        name: { text: "نام", type: "text", flex: 1 },
        "value.id id": { text: "" },
        "value.pid pid": { text: "" },
        "comparison_value.id _id":{text:""},
        "if(done,comparison_value.id,0) res": { text: this.state.statuscheck[0].status > 1 ? "نتایج" :"", dataIndex: "res" ,btn:"linkkey",exp:"key",options:{path:"/ComparisonResult",col:"_comparison_value",icon:"x-fa fa-table green"},width:60},

      },
      from: "comparison_value",
      tree: "name",
      idProperty: "_id",
      0:{id:">0"},
      1:{id:"{in (select pid from `value`)}"},
      order: "value.id",
      join: "value",
      title: "سنجه ارزیابی",
      icon: "chart-bar",
      filter: { hidden: true },
      num: 1000,

      history: this.props.history
    }

    return <Table {...this.config} />
  }
}