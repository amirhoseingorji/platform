import React, { Component } from 'react';
import Table from '../../Componnet/Table';
export default class Logs extends Component {
  render = () => {
    this.config = {
      cols: {
        id: { text: "شناسه", width: 50 },
        chatid: { text: "شناسه گفتگو" },
        _user: { text: "کاربر" },
        date: { text: "تاریخ", btn: "date" },
        _process: { text: "پروسه" },
        command: { text: "عنوان" ,flex:1},
        text: { text: "متن" ,flex:1},
        
        
     //   _products_colony: { text: "کولونی", btn: "linkkey", exp: "key", options: { path: "/Colony", col: "id", icon: "x-fa fa-users-class" }, width: 70 },
      },
      from: "user_logs",
      title: "لیست کاربران",
      icon: "code",
      filter: { hidden: false },
      num: 1000,
      history: this.props.history
    }
    return <Table {...this.config} />
  }
}