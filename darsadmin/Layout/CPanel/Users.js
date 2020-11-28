import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Container,Button,Dialog,FileField ,TextField } from '@sencha/ext-modern';
import Title from "../../Componnet/Title"
import Storer from "../../Store/Storer";
export default class Users extends Component {
  //state={}
  state = {province_city:[],newdialog:false,data:[]}
  componentWillMount(){
      Storer({
        banks:{},
        province_city:{0:{_province:window.userData._province}} ,
        
    },this);
  }
  closedialog(){
    this.setState({newdialog:false})
}
componentDidMount(){
  window.socket.on("addgroup",(count)=>{
    Ext.toast(count+" مورد با موفقیت اضافه شد")
    this.closedialog()
    this.refs.Table._refresh()
})
  setTimeout(()=>{
    this.input = window.document.querySelector('.exacldialog input[type=file]')
    this.input.addEventListener('change', ()=> {
      readXlsxFile(this.input.files[0]).then((data)=>{
                  this.setState({data})
      }, function (error) {
        Ext.toast("فایل انتخابی فرمت صحیحی ندارد")
      })
    })
  },1000)

}
query(){
  let query={};
  let searchVal  = decodeURIComponent(window.location.search)
  searchVal.slice(1).split('&').map(e => { e = e.split('='); query[e[0]] = e[1]; });
  return query;
}
  render = () =>{
    if(!this.state.province_city.length || !this.state.banks.length) return null;
    let provinces = {}
    let banks = {}
    this.state.province_city.map(e=>provinces[e.id]=e.name)
    this.state.banks.map(e=>banks[e.id]=e.name)
    this.config = {
      cols: {
        id:{text:""},
        name:{text:"نام" ,editable:true,flex:3},
        user:{text:"تلفن همراه" , type:"number",flex:2},
        pass:{text:"رمز",type:"text" ,flex:2},
        nid:{text:"کدملی" , type:"number",flex:2},
        birthdate:{text:"سال تولد", type:"number",flex:1},
        father:{text:"نام پدر",type:"text",flex:2 },
        _province_city:{text:"منطقه",btn:"selector",options:provinces,type:"select",flex:2},
        school_name:{text:"مدرسه",type:"text",flex:2 },
        paye:{text:"پایه",type:"number",flex:1 },
        sex:{text:"جنسیت",btn:"selector",options:{1:"پسر",0:"دختر"},type:"select",flex:1},
        _bank:{text:"بانک",btn:"selector",options:banks,type:"select",flex:2},
        shaba:{text:"شماره شبا",type:"text",flex:3 },
        bank_name:{text:"حساب",type:"text",flex:2 },
        "`id`":{text:"حذف",dataIndex:"id",btn:"delbtn" ,width:50},
      },
      from : "user",
      title: "کاربران",
      icon: "user",
      ignore:true,
      filter:{hidden:false},
      0:{access:"0",_province:window.userData._province },
      num:1000,
      btn3:{hidden:false,iconCls:"x-fa fa-plus" ,text:"گروهی", width:"120px",handler:()=>{ this.setState({newdialog:true})}},

      new:{hidden:false,user:"09000000000",_province:window.userData._province },
      back:{hidden:true},
      history : this.props.history
    }
    return <Container layout='fit' ><Table ref="Table" {...this.config} /><Dialog cls="rtl" displayed={this.state.newdialog} centered modal minWidth="500px" >
    <Title text ="افزودن لیست" />
    <Container style={{direction:"rtl" ,margin:"10px"}} cls="exacldialog" >
    <div>جهت افزودن فایل گروهی باید فایل حاوی یک شیت و بدون هیچ ردیف تایتل و فقط شامل سه ستون باشد<br/>
    ۱- نام و نام خانوادگی<br/>
    ۲- نام پدر<br/>
    ۳- کد ملی یا شناسه مجازی اتباع شروع شده با ۹۹<br/>
    بعد از انتخاب فایل تعداد ردیف ها مشخص می گردد بعد از تایید تا بسته شدن این مستطیل صبر کنید
    </div>
            <FileField  ref='file'   cls="rtl"   accept=".xls,.xlsx,.csv,.txt"/>
    </Container>
    <Container hidden={this.state.data.length==0}><div>{this.state.data.length} ردیف شناسایی شد</div></Container> 
            <Container layout="hbox" docked="bottom" >
    
              </Container>
              <Button text='انصراف' style={{color:"#000"}} handler={() => {
                  this.closedialog()
              }} />
              <Button style={{color:"#000"}}  text='تایید' handler={() => {
                  let _province = window.userData._province
                  let data =  this.state.data.map(e=>{return {name:e[0],father:e[1],nid:e[2],_province}})
                 window.socket.emit("addgroup",data)
                 Ext.toast("لطفا صبر کنید ...",5000)
              }} />
          </Dialog></Container>
  }
}