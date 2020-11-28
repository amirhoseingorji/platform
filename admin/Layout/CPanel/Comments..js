import React, { Component } from 'react';
import Table from '../../Componnet/Table';
export default class Comments extends Component {
  render = () => {
    this.config = {
      cols: {
        id: { text: "شناسه", width: 50 },
        origin: { text: "منشا", btn: "selector", options: {
           2: "ربات" ,
           3: "ایمیل" ,
           4: "پیامک" ,
          } },
        _user: { text: "کاربر" },
        name: { text: "نام", flex: 1 },
        title: { text: "عنوان", flex: 1 },
        comment: { text: "متن" , flex: 4},
        add_time: { text: "تاریخ", btn: "date" },
       // _user_comment_mod: { text: "نوع", btn: "selector", options: { 0: "حالت" }, type: "select" },
        // plus: { text: "+", width: 70 },
        // minus: { text: "−", width: 70 },
        // _user_file: { text: "ضمیمه", btn: 'multy' },
        // _user_products_colony: { text: "کولونی", btn: "linkkey", exp: "key", options: { path: "/User_products_colony", col: "id", icon: "x-fa fa-users-class" }, width: 70 },
        "`id`": { text: "حذف", dataIndex: "id", btn: "delbtn", width: 50 },
      },
      // tree: "title",
      from: "user_comment",
      title: " نظرات",
      icon: "comments",
      filter: { hidden: false },
      num: 1000,
      history: this.props.history
    }
    return <Table {...this.config} />
  }
}