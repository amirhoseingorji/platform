import React, { Component } from 'react';
import Table from '../../Componnet/Table';
import Storer from "../../Store/Storer";
export default class Requests extends Component {
  state={tip:[],service_type:[],city:[],province:[],user_info:[]}
  componentWillMount() {

    Storer({
      user_info:{cols: "_user as id,concat(first_name,' ',last_name) as text"},
      
    //  tip: {cols: "id,title as text"},
      city:{cols: "id,name as text"},
      province:{cols: "id,name as text"},
      
    },this);
  }
  toArray(data){
    let arr=[];
    data.map(e=>arr[e.id]=e.text)
    arr[0]="";
    return arr;
  }

  render = () =>{
    if(  this.state.city.length==0,this.state.province.length==0) return null
    this.service =this.toArray(this.state.service_type)
    this.tip = this.toArray(this.state.tip);
    this.city = this.toArray(this.state.city);
    this.province = this.toArray(this.state.province);
    this.user_info = this.toArray(this.state.user_info);
    this.user_info[0] = "مهمان"
    this.config = {
      cols: {
        // id: { text: "خذف" ,btn:"delbtn" },
        "comments.id": { text: "شناسه", dataIndex: "id" ,width:60 ,btn:"showbtn",exp:"key"},
        status: { text: "وضعیت", btn: "selector", options: { 2: "پاسخ داده شده", 0: "انتظار" ,1:"دیده شده"}, type: "select", width:100},
        "movies.title": { text: "مرجع", width:100 , dataIndex: "title"},
        "comments._user": { text: " کاربر", dataIndex: "_user",renderer:v=>this.user_info[v],width:60},
        name: { text: "نام",renderer:v=>v?v:"بدون نام"},
   
       "comments.text": { text: "متن", dataIndex:"text",flex:2 },
       
       // _tip: { text: "تیپ",renderer:v=>this.tip[v] ,type:"number",width:150},
        //_service_type: { text: "نوع سرویس",renderer:v=>this.service[v] ,type:"number" ,width:150},
        attach: { text: "ضمیمه", btn: "imgbtn" },
        email:{text:"ایمیل",btn:"email"},
        "comments.date": { text: "تاریخ ارسال", btn: "date", dataIndex:"date" },
        // "user_addres._province": { text: "",dataIndex:"_province" },
        // "user_addres._city": { text: "",dataIndex:"_city" },
        // "user_addres.text as address": { text: "آدرس" ,width:150,dataIndex:"address" ,renderer:(v,r)=>[this.province[r.data._province],this.city[r.data._city],v].join("-")},

      },
      from: "comments",
      join :"movies",
     // joinMode :"left",
      title: "نظرات",
      icon: "comments",
      filter:{hidden:false},
      num:1000,
      history : this.props.history
    }
    return <Table {...this.config} />
  }
}