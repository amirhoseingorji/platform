import React, { Component } from 'react';
import Table from '../../Componnet/Table';
export default class Transactions extends Component {
  render = () => {
    this.config = {
      cols: {
        id: { text: "شناسه", width: 50 },
        _user: { text: "کد کاربر" },
        name: { text: "نام", flex: 1 },
        
        mobile: { text: "تلفن" },
        chatid: { text: "کاربر" },
        tel_id: { text: "تلگرام" ,renderer :v=>"@"+v , flex: 1},
      //  _user_factor: { text: "" },

        cardNumber: { text: "شماره ارجاع", flex: 1 },
        amount: { text: "میزان" },
        products_colony: { text: "کولونی", flex: 1 },
        _products_colony: { text: "" },
        transactionId: { text: "شماره تراکنش" },
        date: { text: "تاریخ", btn: "date" },
        // "`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50},
      },
      from: "user_transaction",

      title: "تراکنش ها ",
      icon: "credit-card-front",
      filter: { hidden: false },
      num: 1000,
      history: this.props.history
    }
    return <Table {...this.config} />
  }
}