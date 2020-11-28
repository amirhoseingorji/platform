import React, { Component } from 'react';
import Table from '../../Componnet/Table';
import Storer from "../../Store/Storer";
export default class UserProductsColony extends Component {
  componentWillMount(){
   // Storer({ products: {cols:"id,name"} }, this);
  }
  render = () => {
    console.log(1)
    this.config = {
      cols: {
        "products_colony_users.id": { text: "شناسه", width: 50,dataIndex:"id" },
        "products_colony_users._user": { text: "" ,dataIndex:"_user"},
        "products_colony_users._products_colony": { text: "",dataIndex:"_products_colony" },
        "products_colony.name": { text: "نام کولونی" ,dataIndex:"name"},
        // "products_colony._user_transaction": { text: "" ,dataIndex:"_user_transaction"},
     //   _user_factor: { text: "" },


        "products_colony_users.mobile": { text: "شماره همراه", editable: true, flex: 1,dataIndex:"mobile" },
        "products_colony_users.email": { text: "ایمیل", editable: true, flex: 1 ,dataIndex:"email"},
        "products_colony_users.username": { text: "نام کاربری", editable: true, flex: 1 ,dataIndex:"username"},
        "products_colony_users.password": { text: "رمز", editable: true, flex: 1 ,dataIndex:"password"},
        "products_colony_users.date": { text: "ثبت", btn: "date" ,dataIndex:"date"},

        "products_colony_users.regdate": { text: "شروع", btn: "date",dataIndex:"regdate" },
        "products_colony_users.expdate": { text: "انقضا", btn: "date" ,dataIndex:"expdate"},
        "products_colony_users.status": { text: "وضعیت", btn: "selector", options: { 0: "غیرفعال", 1: "فعال" }, type: "select",dataIndex:"status" },
        "products_colony_users.pay": { text: "واریزی",dataIndex:"id" },
     //   gift: { text: "مبلغ هدیه" },
        "products_colony_users.`id`": { text: "حذف", dataIndex: "id", btn: "delbtn", width: 50 ,dataIndex:"id"}
      },
      from: "products_colony_users",
      join: "products_colony",
      title: "لیست کاربران",
      icon: "users-class",
      filter: { hidden: false },
      num: 1000,
      history: this.props.history
    }
    return <Table {...this.config} />
  }
}