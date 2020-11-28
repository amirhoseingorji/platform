import React, { Component } from 'react';
import Table from '../../Componnet/Table';
export default class Comments extends Component {
  render = () => {
    this.config = {
      cols: {
        
        //"`id`": { text: "شناسه", dataIndex: "id", width: 50 },
        name: { text: "نام", renderer: v => v ? v : "بدون نام" },
        text: { text: "متن", dataIndex: "text", flex: 3 },
        email: { text: "ایمیل", btn: "email", flex: 1 },
        date: { text: "تاریخ ارسال", btn: "date", dataIndex: "date" },
        id: { text: "حذف", btn: "delbtn", dataIndex: "id" },
      },
      from: "comments",
      title: "تماس با ما",
      icon: "comments",
      filter: { hidden: true },
      num: 1000,
      history: this.props.history
    }
    return <Table {...this.config} />
  }
}