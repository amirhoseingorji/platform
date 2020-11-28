import React, { Component ,ReactRouter} from 'react';
import { Container, Grid, TitleBar, Column,TimeField, NumberField,Button,SliderField,Image, FileField,Dialog,TextAreaField,DatePickerField,SelectField ,Video, SearchField,ActionSheet,Progress ,Rating } from '@sencha/ext-modern';
import { RendererCell } from '@sencha/ext-react';
import M from '../Statics/Images/Madgray.png';
import { Tree, TreeColumn } from '@sencha/ext-modern-treegrid';
// import {
//     DatePicker,
//    // Calendar,
// //     // DateTimePicker,
// //     // DateRangePicker,
// //     // DateTimeRangePicker
//   } from "react-persian-datepicker";
import Icon from "./Icon";
import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2';
// import 'react-datepicker2/dist/react-datepicker2.min.css';
moment.loadPersian({usePersianDigits: false})
import PerfectScrollbar from "perfect-scrollbar";
import Storer from "../Store/Storer"
Ext.require('Ext.MessageBox');
Ext.require([
    'Ext.grid.plugin.*',
    'Ext.grid.filters.Plugin',
    'Ext.data.validator.Number',
    'Ext.data.validator.Date',
    'Ext.exporter.*',
    'Ext.grid.plugin.TreeDragDrop',
    'Ext.grid.plugin.RowDragDrop',
    //'Ext.drag.*',
    'Ext.tree.*'
]);

export default class Table extends Component {
    page = 1;
    pages = 1;
    num=this.props.tree?100000000:this.props.num||10;
    order=this.props.order||"id"
    asc=this.props.asc==undefined?true:this.props.asc
    state={mp4path :"",imgpath:"" ,filpath:"",html:"",showExportSheet:false,selectedFilter:0,Options:{} ,
    progress:0,showprogress:false}
    
    componentWillMount() {
        this.imagereader = 0
        this.reader = new FileReader();
        this.reader.removeEventListener('load',()=>{},true);
        this.reader.addEventListener("load", async () => {
            this.dilogonCancel();
            var formData = new FormData();
            formData.append('file', this.cufileupload);
            var xhr = new XMLHttpRequest();
            let name =  "id_" + this.state._recordid +"."+ (this.cufileupload.name.split(".").pop().toLowerCase())
            xhr.open('post', 'https://chamran.sitenevis.com/uploader.php?_user='+window.userData._user+"&name="+name+"&id="+this.state._recordid+"&filename="+this.cufileupload.name, true);
            var _this = this
            xhr.upload.onprogress = (e) =>{
                if (e.lengthComputable) {
                  var progress = Math.round((e.loaded / e.total) * 99);
                  _this.setState({progress,showprogress:true})
                }
              };
              xhr.onerror = function(e) {
                  Ext.toast('خطا در ارسال فایل مجدد تلاش کنید')
                _this.setState({progress:100,showprogress:true})
              };
              xhr.onload = function(e) {
                  //let {data,width,height,size}  = JSON.parse(e.target.response)
                    _this._refresh()
                    _this.setState({progress:100,showprogress:false})
                    _this.state._recordid = _this.state._record.id+1
                    if (_this.props.onUpload) _this.props.onUpload(_this.state._record)
                    _this.state._record = ""
                  Ext.toast("با موفقیت قرار گرفت")
              };
              xhr.send(formData);
        }, false);

        if(this.props.cols.expand) this.props.cols["expand expanded"] = {text:""}
        let _cols = this.props.cols
        let cols = Object.keys(_cols).join(",")
        let query = this.query();
        let special = {};
        for(let i in query) if(i.indexOf("$")>-1) {
            special[i] = query[i];
            delete  query[i];
        }
        if(query.group) {
          
            this.group = query.group
            delete query.group;
        }else if(this.props.group) this.group= this.props.group; 

        let _where = this.props.where ||"";
      //  let where = 
        let data= { cols, from: this.props.from, store: this.props.tree?"tree":true, refresh: true, num:this.num,page:this.page,total:true,order:this.order,asc:this.asc  }
        if(_where) data.where = _where;
        else  {
            for(let i in query) if(isNaN(query[i]*1)) query[i] = `%${query[i]}%`
            if(this.props[0]) data[0] = {...this.props[0],...query}; else if(Object.keys(query).length>0) data[0] = query;
            if(this.props[1]) data[1] = {...this.props[1]}
            let ititle =[]
            let iname = ""
            for (let i in data[0])
                for (let j in this.props.cols) 
                    if(j==i || this.props.cols[j].dataIndex == i) {
                         ititle.push(this.props.cols[j].text+" : "+(this.props.cols[j].btn == "selector"? this.props.cols[j].options[data[0][i]]:data[0][i])) ;
                          break ;
                        }
            this.subtitle = ititle.join(" ، ") 
            if(this.props.filter && this.filterVal) {
                if(!data[0]) data[0]={}
                data[0][this.filterkey]=this.filterVal
            }
        }
        
        data.group= this.group;
        if(this.props.join) data.join=this.props.join;
        if(this.props.ignore) data.ignore=this.props.ignore;
        if(this.props.joinMode) data.joinMode=this.props.joinMode;
        if(this.props.refresh && typeof this.props.refresh == "function") this.props.refresh()
      // let tables = {data}
      // if(!this.state) for(let col in _cols) if(_cols[col].options && _cols[col].options.from && !this.state[tables[col]]) tables[col] = _cols[col].options;
console.log({data})
      Storer({data}, this);

        window.socket.on("progress", (progress)=>{
            
            this.setState({progress,showprogress:progress==100?false:true});
        })
     //this.draginit()
    }
    navigate = (path) => {
            this.props.history.push(path);
    }
    query(){
        let query={};
        let searchVal  = decodeURIComponent(window.location.search)
        searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
        
        return query;
      }
    delete = (record,confirm=false,event)=>{
        //console.log(record)
        if (record.data.deny) {Ext.toast("امکان حذف وجود ندارد"); return;}
        if(confirm==false) return Ext.Msg.confirm("اخطار!","آیا از حذف این مورد اطمینان دارید؟",(st)=>{if(st=="yes") this.delete(record,true,event); });
        else{
            let _me =record.store||record.getTreeStore()
            _me.remove(record);
            this.updateOrd()
            setTimeout(this._refresh,500)
            if(event) event(record)
        } 
    }
    _refresh = ()=>{
        this.componentWillMount()
        //this.updateOrd()
    }
    onpage = (th, v) => {
        if (v != this.page) {
            this.page = this.pages + 1 - v;
            this._refresh()
        }
    }
    onsort(th,_col,dir){
        this.order = "`"+_col._dataIndex+"`";
        this.asc = dir=="ASC"
        this.page=1
        this._refresh()
    }
    print = ()=>{
       this.exportToHtml()
    }
    new =()=>{
        let {doafter} = this.props.new
        
        let data = {...this.props.new};
        if(this.props.tree && this.selected && this.props.cols.expand) this.selected.set("expand",1)
        if(this.props.tree && this.selected && !data.pid) data.pid = this.selected.data.id
        if(this.props.cols.ord) data.ord=this.state.dataStore.data.items.length+1
        delete data.hidden;delete data.doafter
        
        this.state.dataStore._insert(data);
        
        if(doafter) doafter();
        
       // if(!this.props.new.ord) this.page=this.pages;

        setTimeout(this._refresh,500)
    }
    back=()=> {
        setTimeout(this._refresh,2000);
        this.props.history.goBack();
        
    }
    filterer = (a) => {
        setTimeout(this._refresh,1000);
        let val = this.refs._filterVal.cmp.getValue()
        this.filterVal = this.state.filtervaloption.length ?  this.refs._filterOptval.cmp.getValue() : val //(isNaN(val*1) ? `%${val}%` : val)
        this.filterkey = this.refs._filterKey.cmp.getValue()
        //if(this.filterVal.indexOf(",")>0) this.filterVal = "{in ("+this.filterVal+")}"
        // let search = window.location.search + (window.location.search? "&" :"?")  + this.filterkey +"=" + this.filterVal
        // this.props.history.push(window.location.pathname + search);
        //this.filteroptval = this.refs._filterOptval.getValue()
        if (this.props.tree) {
            this.state.dataStore.filter(this.filterkey, this.filterVal);
        } else {
            //if (this.filterkey.slice(0, 1) == "_" || this.filterkey == "id" || this.filterkey == "`id`" || this.filterkey.indexOf(".id") > -1) a = 1; else this.filterVal = "%" + this.filterVal + "%";
            this.page = 1;
            let search = window.location.search + (window.location.search? "&" :"?")  + this.filterkey +"=" + this.filterVal
            this.props.history.push(window.location.pathname + search);
            this._refresh()
            
        }
        this.filterVal = "" 
        this.filterkey = ""
    }

    amar = ()=>{
        this.setState({ showDialog: true,imgpath:"",_record:"",_column:this.props.amar,filpath:"",mp4path:"",html:"",showrecord:false});
    }
    getImage = (imgpath,_record,_column,Options)=>{
        this.info
        this.info = "width:"+_record.data.width+"   height:"+_record.data.height  + " format : jpeg";
        this.setState({ showDialog: true,imgpath,_record,_column,filpath:"",mp4path:"",html:"",showrecord:false,Options});
    }
    getFile = (filpath,_record,_column)=>{
        this.info
        this.setState({ showDialog: true,filpath,_record,_column,imgpath:"",mp4path:"",html:"",showrecord:false});
    }
    getmp4 = (mp4path,_record,_column)=>{
        this.info
        this.refs._Video.el.dom.children[1].children[0].src = mp4path
        this.refs._Video.el.dom.children[1].src = mp4path
        this.refs._Video.el.dom.children[1].currentTime = 0 
        this.setState({ showDialog: true,mp4path,_record,_column,imgpath:"",filpath:"",html:"",showrecord:false});
    }
    getmulty = (path,_record,_column,Options,type)=>{
        
        if(type=="video"){
            this.info = "width:"+_record.data.width+"   height:"+_record.data.height  + " type : video";
            this.info += " extension : " + path.split(".").pop() 
            this.refs._Video.el.dom.children[1].children[0].src = path
            this.refs._Video.el.dom.children[1].src = path
            this.refs._Video.el.dom.children[1].currentTime = 0 
            this.setState({ showDialog: true,mp4path:path,_record,_column,imgpath:"",filpath:"",html:"",showrecord:false});
        }else if(type=="sound"){
            this.info = " type : Audio";
            this.info += " extension : " + path.split(".").pop() 
            this.refs._Video.el.dom.children[1].children[0].src = path
            this.refs._Video.el.dom.children[1].src = path
            this.refs._Video.el.dom.children[1].currentTime = 0 
            this.setState({ showDialog: true,mp4path:path,_record,_column,imgpath:"",filpath:"",html:"",showrecord:false});
        }else if(type=="img"){
            this.info = "width:"+_record.data.width+"   height:"+_record.data.height  + " type : picture"; 
            if(path.indexOf(".png")>0) this.info += " AlphaChannel"
            this.info += " extension : " + path.split(".").pop() 
            this.setState({ showDialog: true,imgpath:path,_record,_column,filpath:"",mp4path:"",html:"",showrecord:false,Options});
        }else{
            this.setState({ showDialog: true,filpath:path,_record,_column,imgpath:"",mp4path:"",html:"",showrecord:false});
        }

        
    }
    gethtm = (html,_record,_column)=>{
        this.info
        html = html||" متن "
        //console.log(html,_record,_column)
        this.setState({ showDialog: true,html,_record,_column,imgpath:"",filpath:"",mp4path:"",showrecord:false});
    }
    gethtmdate = (html,_record,_column)=>{
        this.info
        html = html||" متن "
        //console.log(html,_record,_column)
        this.setState({ showDialog: true,html,_record,_column,imgpath:"",filpath:"",mp4path:"",showrecord:false,date:true});
    }
    showall = (id,_record,_column)=>{
        console.log(_record)
        let imgpath = "";
        let showrecord = "<table dir='rtl' width='100%'>";
        for(let i in this.props.cols){
            let col=this.props.cols[i];
            let val = _record.data[col.dataIndex||i]
          let renderer = col.renderer ? col.renderer(val,_record,_column)||"" : val||""
          val = typeof renderer!="object" ? renderer: val;
          val = val==null|| val==undefined ? "":val;
          if(col.btn=="imgbtn" && val ) imgpath = val;
          else if(col.text && val) showrecord+=`<tr><td>${col.text}</td><td>${val}</td></tr>`
        }
        showrecord+="</table>"
        this.setState({ showDialog: true,_record,_column,imgpath,filpath:"",mp4path:"",html:"",showrecord});
    }
    showAddres(id){
        Storer({user_addres:{cols:"city.province as _province, city.name as _city, text",0:{id},join:"city"}}, this);
    }
    ///btns
    //favbtn = (id,record)=><Button {...this.BProps} iconCls={"x-fa "+} margin={0} handler={()=>this.delete(record)} />
   // delbtn = (id,record)=><Button {...this.BProps} iconCls="x-fa fa-trash" margin={0} handler={()=>this.delete(record)} />
   whandler=(button)=>{
       
    let gridrow = button.up('gridrow'),
    record = gridrow.getRecord(),
    value = button._text,
    column = button.column;
   
    return {value,record,column}
    }
    delbtn=(Options,event)=>{
        return {
        ...this.BProps,  
        iconCls:"x-fa fa-trash" ,
        margin:0,
        handler : (b)=>{let {record} = this.whandler(b);this.delete(record)}
    }}
  

    //toggle = (id,record,column,Options,event)=>
    //    <Button {...this.BProps} margin={0} handler={(a,b)=>this.toggler(a,b,id,record,column,Options,event)} iconCls={"x-fa fa-"+this.selector(id,record,column,Options) }  />
    toggle=(Options,event)=>{
        return {
        ...this.BProps,  
        //iconCls:"x-fas fa-sync" ,
        margin:0,
        _text:"",
        handler : (b)=>{let {value,record,column} = this.whandler(b);this.toggler("a","b",value,record,column,Options,event)}
    }}
    toggler(a,b,id,record,column,Options,event){
        let arr = Object.keys(Options)
        for(var i=0;i<arr.length;i++ ){
            if(id==arr[i]) break;
        }
        record.set(column,arr[(i+1)%arr.length]);
        if(event) event(record)
    }
    //imgbtn = (value,record,column,Options)=><Button {...this.BProps} {...Options} iconCls={value.length>2?"x-fa fa-picture-o":""} margin={0} handler={()=>this.getImage(value,record,column,Options)} />
    
    imgbtn=(Options,event)=>{
        return {
        ...this.BProps,
        ...Options,  
        iconCls:"x-fas fa-image" ,
        margin:0,
        
        handler : (b)=>{let {value,record,column} = this.whandler(b);this.getImage(value,record,column,Options)}
    }}

    filebtn = (value,record,column)=><Button {...this.BProps} iconCls={value.length>2?"x-fa fa-file":""} margin={0} handler={()=>this.getFile(value,record,column)} />
    mp4btn = (value,record,column)=><Button {...this.BProps} iconCls={value.length>2?"x-fa fa-video-camera":""} margin={0} handler={()=>this.getmp4(value,record,column)} />
    exticons= {"mp4":"video","mp3":"music","jpeg":"camera-retro","jpg":"camera-retro","png":"camera-retro","bmp":"camera-retro","fbx":"cube"}
    multitype = {"mp4":"video","mp3":"sound","jpeg":"img","jpg":"img","png":"img","bmp":"img"}
    multi_type = {"mp4":2,"mp3":3,"jpeg":1,"jpg":1,"png":1,"bmp":1,"fbx":4}    // multy = (value,record,column,Options)=><Button {...this.BProps} iconCls={"x-fa fa-"+(value.length<2?"upload":this.exticons[value.split(".").pop()])} margin={0} handler={()=>this.getmulty(value,record,column,Options,this.multitype[value.split(".").pop()])} />
    multy=(Options,event)=>{
        return {
        ...this.BProps,
        ui:"confirm",
        shadow:false,
        ...Options,  
        cls : "forcenotext",
        iconCls:"x-fas fa-cloud-upload-alt" ,
        margin:0,
        handler : (b)=>{let {value,record,column} = this.whandler(b);this.getmulty(value,record,column,Options)}
    }}
    htmlbtn = (value,record,column)=><Button {...this.BProps} iconCls={value.length>2?"x-fa fa-file-text":""} margin={0} handler={()=>this.gethtm(value,record,column)} />
    //adrsbtn = (id,record)=><Button {...this.BProps} iconCls={id?"x-fa fa-map-marker":""} margin={0} handler={()=>this.showAddres(id)} />
    showbtn = (value,record,column)=><Button {...this.BProps} iconCls={"x-fa fa-list"} margin={0} handler={()=>this.showall(value,record,column)} />
   // ratebtn = (value,record,column)=><Rating cls="ltr" value={value} scale="180%" disabled={true} trackOver={false}/>
    ratebtn=(Options,event)=>{
        return {
        cls:"rtl",
        scale:"180%",
        disabled :true,
        trackOver :false,
        margin:0,
        xtype: 'rating'
    }}
    date = v =>{
        v = v?moment(v).format("HH:mm jM/jD"):v;
        v = v == "Invalid date" ? "-" : v;
        return v
    } 
//     dateeditor = (value,record,Column) => <DatePicker  className='dateField' format="jYYYY/jM/jD"  defaultValue={moment(new Date())} onChange={(a)=>{
//      //   record.set(Column,a.format("YYYY-MM-DD HH:mm:ss"))
// }}/>
    link = (value, record, column) => <a href={value.indexOf("http")>-1?value:"http://"+value} target="_blank">{value}</a>
    linkbox = (value, record, column) => <span  className={value.length>2?"x-fa fa-link":""} margin={0} onClick={()=>this.gethtm(value,record,column)} />
    //linkbox=(Options,event)=>{
    //     return {
    //     ...this.BProps,
    //     ...Options,  
    //     iconCls:"x-fas fa-link" ,
    //     margin:0,
    //     handler : (b)=>{let {value,record,column} = this.whandler(b);this.gethtm(value,record,column)}
    // }}
    email = (value, record, column) => <a href={"mailto:"+value} target="_blank">{value}</a>
    key = v=>v;
    dragbtn = (v,r,c,o)=>{
    //console.log("dragItem"+v)
    return <Button {...this.BProps} iconCls={"x-fa fa-list"} margin={0} key={"dragItem"+v} onTap={(t)=>{
        console.log(t)

    }} />
    }
    redatekey = (value,record,column) => {
        let text = this.date(value)
        let check = false;
        if(record.data.expire) if((new Date()).getTime() - (new Date(value)).getTime()<record.data.expire*24*3600*1000) check=true;
        return <Button {...this.BProps} text={text} iconCls={check?"x-fa fa-check":"x-fas fa-sync-alt"} margin={0} handler={() => {
            setTimeout(this._refresh,1000);record.set(column,"{CURRENT_TIMESTAMP}")}} width="100%" />
    }
    statebtn = (value,record,column,o)=>{
        // console.log(o,o[value],value)
    return <Button {...this.BProps} iconCls={o[value].icon} margin={0} handler={o[value].handler} /> }
    // linkkey = (value,r,c,o) => {
    //     let id = o.dataIndex ? r.data[o.dataIndex] : value
    
    //     let val = o.value ? r.data[o.value] : id;
    //     return <Button {...this.BProps} text={val} iconCls={o&&o.icon?o.icon:"x-fa fa-link"} margin={0}  width="100%" handler={()=>this.navigate(o.path+"?"+o.col+"="+id+(o.group?"&group="+o.group:"")) }/>}
    linkkey=(o)=>{
    //    console.log(o) 
            return {
            ...this.BProps, 
         //   ui:"con",
           // badgeText:"1",
            iconCls:o&&o.icon?o.icon:"x-fas fa-link",
            margin:0,
            width:"100%",
            handler : (b)=>{let {value,record} = this.whandler(b);
            let id = o.dataIndex ? record.data[o.dataIndex] : value;
            this.navigate(o.path+(o.path.indexOf("?")>0?"&":"?")+o.col+"="+id+(o.group?"&group="+o.group:""))}
        }}
        statuskey=(o)=>{
            //    console.log(o) 
                    return {
                        xtype:"togglefield",
                    ...this.BProps3, 
                   // badgeText:"1",
                   // iconCls:o&&o.icon?o.icon:"x-fas fa-link",
                    margin:'0 10',
                    width:"100%",
                    listeners : {
                        change : (b,current,before)=>{
                            let {value,record,column} = this.whandler(b);
                            let  _pre = record.data[column];
                        }
                    }
                }}
    // socketkey = (value,r,c,o) => {
    //     let id = o.dataIndex ? r.data[o.dataIndex] : value
    
    //     let val = o.value ? r.data[o.value] : id;
       
    //     return <Button {...this.BProps} text={val} iconCls={o&&o.icon?o.icon:"x-fa fa-link"} margin={0}  width="100%" handler={()=>window.socket.emit(o.path,id) }/>}
    socketkey=(o)=>{
        return {
        ...this.BProps,  
        iconCls:o&&o.icon?o.icon:"x-fas fa-link",
        width:"100%",
        handler : (b)=>{let {value,record} = this.whandler(b);
        Ext.Msg.confirm("قرعه کشی",
      "قرعه کشی این منطقه انجام شود؟"
      ,(st)=>{if(st=="yes")
        window.socket.emit(o.path,o.dataIndex ? record.data[o.dataIndex] : value)})
    }
    }}
   
    pidtow = (v, a) => { if (v) for (let idata of this.state.data) if (idata.id == v) return idata.title || idata.name; return "-"; }
    selector = (value, record, column, options) => { 
        //options = Object.entries(options).map(e=>{return {text:e[1],value:e[0]}; })
        return options[value]
// for(let row of rows) {
//     this.source = new Ext.drag.Source({
//             element: row,
//             constrain: {{
//                 dragmove: this.onDragMove.bind(this),
//                 dragend: this.onDragEnd.bind(this)
//             }
//         });
       
// }
        
    }
    // componentDidUpdate(){
    //     // console.log(this.props)
    //     // this.props.parent.refresh();
    // }
    componentDidMount(){
       this.grid.cmp.on('drop', (argetNode, draggedData, targetRecord, position)=>{
           console.log(argetNode, draggedData, targetRecord, position)
           for(let rec of draggedData.records) {
            rec.parentNode.set("expand",1)
            rec.set("pid",rec.parentNode.id)
            }
        for(let i in this.grid.cmp.store.data.items) {
            let item =  this.grid.cmp.store.data.items[i]
            item.set("pid",item.parentNode.id=="root"?null:item.parentNode.id)
             this.grid.cmp.store.data.items[i].set("ord",i*1+1)
        }   
        this._refresh()
       });

    }
    onDragMove(){

    }
    updateOrd(node,data){
       // console.log(record)
    //   console.log(this.props.cols.ord)
        if(this.props.cols.ord) {
            for(let i in this.grid.cmp.store.data.items)     this.grid.cmp.store.data.items[i].set("ord",i*1+1)
            if(this.props.onOrder) this.props.onOrder(data.records[0]);
        }
    }
    getcount(){
        return this.count
    }
    render = () => {
       
        if(this.state.user_addres && this.state.user_addres.length>0){
            let {_province, _city, text} = this.state.user_addres[0];
            Ext.toast([_province, _city, text].join("-"), 5000);
           // Ext.Msg.alert('آدرس',[_province, _city, text].join("-") , Ext.emptyFn) ;
            this.state.user_addres= "";
        }
        
        if(this.page==1) this.count = this.state.data.count||0;
        this.pages =  Math.floor((this.count||0)/this.num)+1;
        let {showDialog,imgpath,mp4path,filpath,html,showrecord,progress,showprogress} = this.state
        if (filpath) {
            let ext = filpath.split(".").slice(-1)
            let type=this.multi_type[ext[0]]
            if(type==1){
                imgpath=filpath
                filpath=""
            }else if(type==2 || type==3){
                mp4path=filpath
                filpath=""
            }
            
        }
        let MGrid = this.props.tree? Tree : Grid;
        let filteropt = [];
        let cols = this.props.cols
        this.state.filtervaloption = []
        
        for(let i in cols) {
            if(cols[i].text && (!cols[i].btn || cols[i].btn.indexOf("btn")==-1)  && (!cols[i].btn || cols[i].btn.indexOf("date")==-1) && (!cols[i].btn || cols[i].btn.indexOf("link")==-1) ) {
                if((this.state.selectedFilter == cols[i].dataIndex || this.state.selectedFilter == i)  ){
                    if(cols[i].btn =="selector" ) {          
                        this.state.filtervaloption = Object.entries(cols[i].options).map(e=>({text:e[1],value:e[0]}))
                    } 
                }
                filteropt.push({text:cols[i].text,value:cols[i].dataIndex||i})
            }
        }
//gridexporter: true,
         let plugins = {  gridexporter: true,gridcellediting: true  ,gridrowdragdrop: {dragText:"تغییر ترتیب"},}

        if(this.props.gridsummaryrow) plugins.gridsummaryrow = true
        if(this.props.tree) {
            plugins.treedragdrop = true
             plugins.gridrowdragdrop= false;
        }

        let title = this.props.title+"<Br/><span style='font-size:12px'> تعداد موارد یافت شده :" + (this.count || 0) + "   </span>"//+(this.subtitle?"<br/><span style='font-size:12px'>"+this.subtitle+"</span>":"")+(this.props.moreinfo?"<br/>"+this.props.moreinfo:"") 
        this.title = this.props.title+(this.subtitle?" - "+this.subtitle:"")
        
        let filtervaloption = this.state.filtervaloption;
        return                   <Container layout="fit" hidden={this.props.hidden} width={this.props.width||"100%"} padding={0}>
             
            <Container cls="rtl" layout={{ type: "vbox", align: Ext.platformTags.phone ? "strech" : "center", pack: "start" }} layout="fit"  scrollable ref="mainPage" padding="0" >
            
                <Container  {...this.MainProps} ref="dragContainer" margin={0}   >
                
                    <MGrid  selectable={{mode:"single"}} store={this.state.dataStore}  plugins={plugins} sortable={!this.props.tree && !this.props.unsortable}  onColumnSort={this.onsort.bind(this)} 
                    columnMenu ={null} 
                    onNodeExpand={(row,record)=> {if(this.props.cols.expand)  record.set("expand",1)} }
                    onNodeCollapse={(row,record)=>{if(this.props.cols.expand)  record.set("expand",0)} }
                    onSelect={(a,record)=>{
                        this.selected = record
                        if(this.props.onSelect)  this.props.onSelect(a,record)
                    }}
                    onDeselect={(a,record)=>{
                        this.selected = {data:{id:"{null}"}}
                    }}
                    ref={grid => this.grid = grid}>
                        <TitleBar title={title} docked="bottom"    > 
                        
                           
                            {/* <Button {...this.BProps} hidden={true} {...this.props.btn1}  /> */}
                            
                            <Button {...this.BProps2} hidden={!this.props.new} align="left"  iconCls="x-fa fa-plus" handler={this.new} ripple={false}/>
                            <Button {...this.BProps2} hidden={false} align="left" {...this.props.refresh} iconCls="x-fas fa-sync-alt" handler={this._refresh} ripple={false}/>
                            
                            {/* <Icon hidden name={this.props.icon} align="left" color="#37474F" /> */}


                            <Container align="right" layout="hbox" hidden={!this.state.vsearch}>
                            <Container  padding="10 0" >جستجوی </Container>
                            <SearchField  ref="_filterVal"  placeholder="عبارت" hidden={filtervaloption.length==0?false:true} {...this.Iprops} onAction={this.filterer.bind(this)}  ripple={false}/>
                            <SelectField  value={filteropt[0].value} ref="_filterOptval"  options={filtervaloption} {...this.Iprops}  hidden={filtervaloption.length>0?false:true} ripple={false}/>
                            <Container align="right" padding="10 0" >در </Container>
                            <SelectField  value={filteropt[0].value} ref="_filterKey"  options={filteropt} {...this.Iprops} onChange={(a,b)=>{this.setState({selectedFilter:b})}} ripple={false}/>
                            <Button {...this.BProps2}   text="بگرد" handler={this.filterer.bind(this)} ripple={false} margin="0 5 0 100" width="80"/>
                            </Container>

                            <Button  {...this.BProps2} hidden={this.props.filter.hidden} iconCls="x-fa fa-search"  ripple={false} handler={()=>this.setState({vsearch:!this.state.vsearch})}/>
                            <Button  {...this.BProps2} hidden={true} {...this.props.btn2}  ripple={false}/>
                            <Button {...this.BProps2} hidden={true} {...this.props.btn3} ripple={false} />
                            <Button {...this.BProps2} hidden={true} {...this.props.btn4}  ripple={false}/>
                            <Button {...this.BProps2} hidden={true} {...this.props.btn5}  ripple={false}/>
                          
                 
                       
                            <Button {...this.BProps2} hidden={false} {...this.props.excel} iconCls="x-fa fa-table" handler={this.exportToXlsx} ripple={false}/>
                            <Button {...this.BProps2} hidden={false} {...this.props.print} iconCls="x-fa fa-print" handler={this.print}  handler={this.exportToHtml} ripple={false}/>
                            <Button {...this.BProps2} hidden={true} {...this.props.btn1}  ripple={false}/>
                            <Button hidden={false}  {...this.BProps2} {...this.props.back} iconCls="x-fa fa-arrow-left" handler={this.back} ripple={false}/>
                            
                        </TitleBar> 
                        
                        {Object.entries(cols).map((e, i) => {
                            if(e[1].btn) {
                                if(e[1].btn=="selector" || e[1].btn=="date")
                                e[1].renderer = (value,record,column)=>this[e[1].btn](value,record,column,e[1].options,e[1].event);
                                else if(e[1].btn=="linkbox") {
                                    e[1].renderer=(a)=>{
                                    return<span column={e[1].dataIndex||e[0]} className={"x-fa fa-link"+(a?" blue":" deactive")}  style={{cursor:"pointer",width:e[1].width+"px",color:"#555555"}} onClick={(a)=>{
                                        let record = this.state.dataStore.data.items[a.target.closest(".x-gridrow").getAttribute("data-recordindex")];
                                        let column = a.target.getAttribute("column");
                                        let value = record.data[column];
                                        this.gethtm(value,record,column)
                                    }} />
                                    }
                                }else if(e[1].btn=="dateeditor") {
                                    e[1].renderer=(a)=>{
                                        return<span column={e[1].dataIndex||e[0]} className={"x-fa fa-link"+(a?" blue":" deactive")}  style={{cursor:"pointer",width:e[1].width+"px",color:"#555555"}} onClick={(a)=>{
                                            let record = this.state.dataStore.data.items[a.target.closest(".x-gridrow").getAttribute("data-recordindex")];
                                            let column = a.target.getAttribute("column");
                                            let value = record.data[column];
                                            this.gethtmdate(value,record,column)
                                        }} />
                                        }
                                } else if(e[1].btn=="delbtn") {
                                    e[1].renderer=(a)=>{
                                    return<span column={e[1].dataIndex||e[0]} className={"x-fa fa-trash red"}  style={{cursor:"pointer",width:e[1].width+"px",color:"#555555"}} onClick={(a)=>{
                                        let record = this.state.dataStore.data.items[a.target.closest(".x-gridrow").getAttribute("data-recordindex")];
                                        let column = a.target.getAttribute("column");
                                        let value = record.data[column];
                                        this.delete(record)
                                    }} />
                                }
                                } else if(e[1].btn=="htmlbtn") {
                                    e[1].renderer=(a)=>{
                                        return<span column={e[1].dataIndex||e[0]} className={"x-fa fa-link"+(a?" blue":" deactive")}  style={{cursor:"pointer",width:e[1].width+"px",color:"#555555"}} onClick={(a)=>{
                                            let record = this.state.dataStore.data.items[a.target.closest(".x-gridrow").getAttribute("data-recordindex")];
                                            let column = a.target.getAttribute("column");
                                            let value = record.data[column];
                                            this.gethtm(value,record,column)
                                        }} />
                                        }
                                }else if(e[1].btn=="imgbtn") {
                                    e[1].renderer=(a)=>{
                                        if(a) return <img column={e[1].dataIndex||e[0]} src={a}  height="50" margin="" onClick={(a)=>{
                                        let record = this.state.dataStore.data.items[a.target.closest(".x-gridrow").getAttribute("data-recordindex")];
                                        let column = a.target.getAttribute("column");
                                        let value = record.data[column];
                                        
                                        this.getImage(value,record,column,e[1].options)
                                    }}/>;
                                    else return <span column={e[1].dataIndex||e[0]} className={"x-fas fa-camera-retro"+(a?" blue":" deactive")}  style={{cursor:"pointer",width:e[1].width+"px",color:"#555555", margin:"5px"}} onClick={(a)=>{
                                        let record = this.state.dataStore.data.items[a.target.closest(".x-gridrow").getAttribute("data-recordindex")];
                                        let column = a.target.getAttribute("column");
                                        let value = record.data[column];
                                        console.log(value,record,column)
                                        this.getImage(value,record,column,e[1].options)
                                    }} />
                                    }
                                }else if(e[1].btn=="linkkey") {
                                    e[1].renderer=(a)=>{
                                    let {icon,path,col,group,dataIndex} =  e[1].options

                                    return   <span column={e[1].dataIndex||e[0]} className={icon}  style={{cursor:a?"pointer":"",width:e[1].width+"px",color:a?"#555555":"#eeeeee"}} onClick={(a)=>{
                                        let record = this.state.dataStore.data.items[a.target.closest(".x-gridrow").getAttribute("data-recordindex")];
                                        if(!record) return false
                                        let column = a.target.getAttribute("column");
                                        let value = record.data[column];
                                        let id = dataIndex ? record.data[dataIndex] : value;
                                       if(id) this.navigate(path+(path.indexOf("?")>0?"&":"?")+col+"="+id+(group?"&group="+group:""))
                                      //  this.getmulty(value,record,column,e[1].options)
                                       // this.gethtm(value,record,column)
                                    }} />
                                    }
                                }else if(e[1].btn=="socketkey") {
                                    e[1].renderer=(a)=>{
                                    let {icon,path,col,group,dataIndex} =  e[1].options

                                    return <span column={e[1].dataIndex||e[0]} className={icon}  style={{cursor:"pointer",width:e[1].width+"px",color:"#555555"}} onClick={(a)=>{
                                        let record = this.state.dataStore.data.items[a.target.closest(".x-gridrow").getAttribute("data-recordindex")];
                                        let column = a.target.getAttribute("column");
                                        let value = record.data[column];
                                        Ext.Msg.confirm("قرعه کشی",
                                        "قرعه کشی این منطقه انجام شود؟"
                                        ,(st)=>{if(st=="yes")
                                          window.socket.emit(path,dataIndex ? record.data[dataIndex] : value)})
                                      //  this.getmulty(value,record,column,e[1].options)
                                       // this.gethtm(value,record,column)
                                    }} />
                                    }
                                }else if(e[1].btn=="multy") {
                                    e[1].renderer=(a)=>{
                                        let ext = a.split(".").pop()
                                        let ico = this.exticons[ext] || "file-alt"
                                    let icon = a.length<2?"cloud-upload-alt blue":ico+" blue"
                                    return <span column={e[1].dataIndex||e[0]} className={"x-fa fa-"+icon}  style={{cursor:"pointer",width:e[1].width+"px",color:"#555555"}} onClick={(a)=>{
                                        let record = this.state.dataStore.data.items[a.target.closest(".x-gridrow").getAttribute("data-recordindex")];
                                        let column = a.target.getAttribute("column");
                                        let value = record.data[column];
                                        this.getmulty(value,record,column,e[1].options)
                                       // this.gethtm(value,record,column)
                                    }} />
                                    }
                                }else if(e[1].btn=="html") {
                                    e[1].renderer=(a)=>{
                                    
                                    return <span  className={e[1].icon}  style={{cursor:"pointer",width:e[1].width+"px",color:"#555555"}} onClick={(a)=>{
                                        let record = this.state.dataStore.data.items[a.target.closest(".x-gridrow").getAttribute("data-recordindex")];
                                        //let column = a.target.getAttribute("column");

                                        let column=e[1].dataIndex||e[0]
                                        let value = record.data[column];
                                        console.log(value,record,column)
                                        this.gethtm(value,record,column)
                                    }} >{a}</span>
                                    }
                                }else if(e[1].btn=="edittime") {
                                    e[1].renderer=(a)=>{ 
                                    
                                    return <div >
                                    <DatePicker  inputJalaaliFormat="jYY/jM/jD" timePicker={true} isGregorian={false}  value={moment(a)} onChange={(a,b)=>{
                                        if(b && b.input) {
                                          
                                        b.record = b.input.closest(".x-gridrow").getAttribute("data-recordindex")
                                        
                                        let record = this.state.dataStore.data.items[b.record];
                                        let column=e[1].dataIndex||e[0]
                                        //let value = record.data[column];
                            
                                        record.set(column,moment(a).format('YYYY-M-D HH:mm:ss'))
                                        }
                                        
                 
                                    }} />
                                </div>
                                    }
                                }else if(e[1].btn=="editdate") {
                                    e[1].renderer=(a,r)=>{ 
                                    if (r.data.datedeny) return "";
                                    return <div >
                                    <DatePicker  inputJalaaliFormat="jYY/jM/jD" timePicker={false} isGregorian={false}  value={moment(a)} onChange={(a,b)=>{
                                        if(b && b.input) {
                                          
                                        b.record = b.input.closest(".x-gridrow").getAttribute("data-recordindex")
                                        
                                        let record = this.state.dataStore.data.items[b.record];
                                        let column=e[1].dataIndex||e[0]
                                        //let value = record.data[column];
                            
                                        record.set(column,moment(a).format('YYYY-M-D HH:mm:ss'))
                                        }
                                        
                 
                                    }} />
                                </div>
                                    }
                                }else if(e[1].btn=="toggle") {
                                   e[1].renderer=(a)=>{
                                    let icon =  e[1].options[a]
                                    return <span column={e[1].dataIndex||e[0]} className={'x-fas fa-'+icon} style={{cursor:"pointer",width:e[1].width+"px",color:"#555555"}} onClick={(a)=>{

                                        let record = this.state.dataStore.data.items[a.target.closest(".x-gridrow").getAttribute("data-recordindex")];
                                        let column = a.target.getAttribute("column");
                                        let val = record.data[column];
                                       let arr = Object.keys(e[1].options)
                                        for(var i=0;i<arr.length;i++ )  if(val==arr[i]) break;
                           
                                        record.set(column,arr[(i+1)%arr.length]);
                                        if(e[1].event) e[1].event(record)
    
                                    }}></span>
                                  }
                                }else {
                                    e[1].cell= {

                                xtype: 'widgetcell',
                                forceWidth: true,
                                
                                widget: {xtype: 'button',column:e[1].dataIndex||e[0],...this[e[1].btn](e[1].options,e[1].event)}
                     
                             }
                            }
                                if(e[1].btn.indexOf("btn")>-1) {
                                    e[1].width= e[1].width||60;e[1].ignoreExport = true;
                                }
                            }
                            if(e[1].exp) {
                                e[1].ignoreExport = false;
                                e[1].exportRenderer = (value,record,column)=>this[e[1].exp](value,record,column,e[1].options);
                               
                            }else e[1].exportRenderer = e[1].renderer;
                            if(this.props.gridsummaryrow)  e[1].exportSummaryRenderer = e[1].exp ? (value,record,column)=>this[e[1].exp](value,record,column,e[1].options):  e[1].summaryRenderer
                            e[1].exportStyle = this.Estyle;
                            let MColumn =e[0]==this.props.tree? TreeColumn : Column
                            return e[1].text  ? <MColumn key={i} dataIndex={e[0]} {...e[1]} align={e[0]==this.props.tree?"left":"center"}   >

                                {e[1].type == "number" ? <NumberField  validators={{ type: "number" }} /> : null}
                                {e[1].type == "time" ?  <TimeField /> : null}
                                {/* {e[1].type == "date" ? <DatePickerField editable  cls="ltr" /> : null} */}
                                {e[1].type == "text" ? <TextAreaField   /> : null}
                                {e[1].type == "select" ? <SelectField options={Object.entries(e[1].options).map(e=>{return {text:e[1],value:e[0]}; })}/>:null}
                            </MColumn> : null
                        })}


                    </MGrid>
                    <Container hidden={this.pages==1} layout="hbox" height={40} flex={1} margin="4 2" cls="rtl x-round pagescollerlable" shadow docked="bottom">
                    <Container width="120" layout="center">{" صفحه " + this.page}</Container>
                        <Button {...this.BProps} margin={0} iconCls="x-fa fa-arrow-right" handler={()=>this.refs._SliderField.cmp.setValue(this.pages +2-this.page)} />
                        <SliderField ref="_SliderField"
                           // label={"  صفحه  " + this.page}
                            labelAlign="left"
                            labelTextAlign="center"
                            labelCls="pagescollerlable"
                            labelWidth={120}
                            flex={5}
                            minValue={1}
                            cls="rtl"
                            height={35}
                            margin="0 5"
                            padding="0 0"
                            maxValue={this.pages}
                            value={this.pages + 1-this.page}
                            onChange={this.onpage.bind(this)}
                            disabled={this.pages == 1}
                        />
                        <Button {...this.BProps} margin={0} iconCls="x-fa fa-arrow-left" handler={()=>this.refs._SliderField.cmp.setValue(this.pages -this.page)} />
                        <Container width="80" layout="center">{this.pages}</Container>
                    </Container>
                </Container>
                {/* <Container 
                padding={5}
                shadow
                ref="dragContainer"
            >
                <div 
                    ref="dragItem"
                    style={{
                        width: '130px',
                        height: '130px',
                        padding: '5px',
                        textAlign: 'center',
                        color: '#fff',
                        backgroundColor: '#ff5722',
                        borderRadius: '5px',
                        userSelect: 'none',
                        cursor: 'move'
                    }}
                >
                    dragText
                </div>
            </Container> */}
            
                <Dialog
                layout="vbox"
                minHeight="350"
                minWidth="350"
                style={{backgroundColor:"#ffffff"}}
                    displayed={showDialog} title="ویرایش"   closeAction="hide"  bodyPadding="10"  efaultFocus="#ok" onHide={this.dilogonCancel}
                >
                        
                <Container >{this.info}</Container>
                <Container cls="printdialog rtl" style={{color:"#000000"}} layout="hbox" >
                {filpath &&  <div><a href={filpath}>{"فایل:"+filpath.split("/").slice(-1)[0]}</a></div>  }
                    <Container hidden={!showrecord} ><div dangerouslySetInnerHTML={{__html:showrecord}} /></Container>
                   {imgpath && imgpath.length>1 && <Image src={imgpath} mode="img" height="500"  hidden={!imgpath || imgpath.length<2}/>}
                </Container>
                    <Video ref="_Video" height="400" width="100%" minWidth="450" url={[mp4path]} hidden={!mp4path || mp4path.length<2} />
                   <Button text="حذف" ui="action round" handler={this.unuploader.bind(this)} hidden={!mp4path && !imgpath && !filpath} />

                    {/* <Button text="دانلود" ui="action round" handler={()=>window.open(filpath, '_blank')} hidden={!filpath || filpath.length<2} /> */}
                    {/* <Container hidden={!html || html.length<2} ref="_counter" html={this.counter(html)}></Container>  */}
                    <TextAreaField ref="_html" minWidth="350" cls="rtl" minHeight="350" value={html}  hidden={!html || html.length<2 || this.state.date} />
                
                    
                    {/* <DatePicker  className='dateField' format="jYYYY/jM/jD"  defaultValue={moment(new Date())} onChange={(a)=>{
             //  record.set(Column,a.format("YYYY-MM-DD HH:mm:ss"))
    }}/> */}
                    <FileField placeholder="انتخاب فایل" hidden={html || showrecord } />
                    
                    
                    <Button text="انصراف" handler={this.dilogonCancel.bind(this)} style={{color:"#000"}} />
                    <Button text="چاپ" hidden={!showrecord || true} handler={this.dialogPrinter.bind(this)} iconCls="x-fa fa-print" />
                    <Button text="حذف" hidden={showrecord|| true} handler={this.omiter.bind(this)} />
                    {html?<Button text="تایید" style={{color:"#000"}} hidden={showrecord} handler={this.htmupdater.bind(this)} />:<Button hidden={showrecord } text="تایید" handler={this.uploader.bind(this)} />}
                </Dialog>
            </Container>
            <Progress value={progress/100.0} hidden={!showprogress} width={"100%"} docked="top" text={"درحال انجام ..."+ progress + "%"}/>
        </Container>
    }
    htmlevent(t,v){

        //this.refs._counter.setHtml(this.counter(v))
    }
    counter = e=>{
        e = e.replace("link","linklin")
        var l = e.length-3
        return ((l-1)%67)+1 + "/67"  + "("+(1+ Math.floor((l-1)/67))+")"
      }
    dialogPrinter(){
        this.PrintElem("درخواست خدمات",".printdialog");
      //  this.dilogonCancel();
    }
    omiter(){
        this.state._record.set(this.state._column,"");
        this.dilogonCancel();
    }
    htmupdater(){
       let data =  this.refs._html.cmp.getValue();
       this.state._record.set(this.state._column,data);
       this.dilogonCancel();
    }
    files =""
    async unuploader(){
        this.state._record.set("file","")
        this.state._record.set("type",0)
        this.dilogonCancel()
      //  window.socket.emit("unuploader",this.state._record.id,this._refresh)
        
    }
    async uploader(){
        if(this.files==""){
            var inputs = window.document.querySelectorAll('input[type=file]')
            var input =  inputs[inputs.length-1]
            
            this.files = []
            for(file of input.files) this.files.push(file);
            this.firstrecord = true
        }

        if (this.files.length==0) {
            this.files=""
            return false;
        }
        if (this.firstrecord) {
            this.state._recordid= this.state._record.id
            this.firstrecord= false
        }else{
           // let records = this.grid.cmp.store.getData().getRange()
         //   this.state._record = records[records.length-1]
           
        }

        
        var file    = this.files.shift()
        this.cufileupload = file;
        if (file)  if(file.name.toLowerCase().indexOf(".fbx")>-1) this.reader.readAsBinaryString(file);
        else {  
              this.reader.readAsDataURL(file);
        }

    }
    dilogonCancel = () => this.setState({ showDialog: false })
    exportToXlsx = () => {
       let conf =  {
            type: 'excel',
            title: this.props.title,
            fileName: this.props.title+'.xlsx',
        }
        if(this.props.gridsummaryrow) conf.includeSummary= true
       
        this.grid.cmp.saveDocumentAs(conf);
    }
    exportToHtml = () => {
        let conf ={
            type: 'html',
            title: this.props.title + "        (تعداد موارد  : " + (this.count || 0) + "  )",
            fileName: this.props.title + '.html',
        }
        if(this.props.gridsummaryrow) conf.includeSummary= true
        let html = this.grid.cmp.getDocumentData(conf)
        
        html = html.replace("<body>", "<body dir='rtl' style='font-family:BYekan'><table class='noborder' width=100%><tr ><td width='120px'><img  src='/img/Madgray.png' style='height: 80px;'></td><td flex=1><h2> </h2><h4> </h4></td><td align='center'><br/><br/>تاریخ :" + moment(new Date()).format("HH:mm     jM/jD") + "</td></tr></table>"+(this.props.printHeader?this.props.printHeader():"")).replace("<style>", "<style>\n@font-face {\nfont-family: 'BYekan';\nfont-weight: normal;\nfont-style: normal;\nsrc: url(\"/ext/resources/fonts/BYekan.ttf\") format('truetype');\n}\n"+(this.props.gridsummaryrow?"tr:last-child{\nfont-weight:bold;\nborder-top:2px solid #000 !important;\n}\n":"")+".noborder,.noborder tr,.noborder td{\nborder:none !important;\nfont-weight:bold;}\n").replace("</body>",(this.props.printFooter?this.props.printFooter():"")+"</body>");
        var winPrint = window.open('', '', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
        winPrint.document.write(html);
        winPrint.document.close();
        winPrint.focus();
        setTimeout(()=>{ 
            winPrint.print();
            winPrint.close();
        },1500)

    }
    PrintElem(title, elem) {
        let html = '<html><head><title>' + title + '</title>' +"<style>\n@font-face {\nfont-family: 'BYekan';\nfont-weight: normal;\nfont-style: normal;\nsrc: url(\"/ext/resources/fonts/BYekan.ttf\") format('truetype');\n}\n</style>"+
            "</head><body dir='rtl' style='font-family:BYekan'><table class='noborder' width=100%><tr ><td width='120px'><img  src='/img/Madgray.png' style='height: 80px;'></td><td flex=1><h2> </h2><h4> </h4></td><td align='center'><br/><br/>تاریخ :" + moment(new Date()).format("HH:mm     jM/jD") + "</td></tr></table><h4>" + title + '</h4><hr/>' + document.querySelector(elem).innerHTML.replace("<img","<hr/><img") + '</body></html>';
        var winPrint = window.open('', '', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
        winPrint.document.write(html);
        winPrint.document.close();
        winPrint.focus();
        setTimeout(() => {
            winPrint.print();
            winPrint.close();
        },1500)
    }

    MainProps = {
        cls: 'rtl',
        cls: ' x-round',
        layout: "fit",
        margin: '2',
        scrollable: true,
        ref: 'mainPage',
    };
    BProps = {
       // flex: 1,
        height:30,
        width:20,
       // ui: "action round",
       style:{backgroundColor:"#37474F",color:"#ECEFF1"},
       // shadow: true,
        margin: '0 5px',
        align:"right"
      }
      BProps2 = {
        // flex: 1,
         height:35,
         width:35,
         //ui: "round",
         style:{backgroundColor:"#37474F",color:"#ECEFF1"},
         //shadow: true,
         margin: '3',
         align:"right"
       }
    Iprops={
        height:35,
        width:150,
        cls:"ltr  headerInput",
        align:"right",
        padding:"10",
        margin:"0 5",
       // ui:"Alt Raised round",
        style:{border:"1px solid #37474F"},
       // shadow:true,
    }
    Estyle = {
        alignment: {
            horizontal: 'Right'
        },
         borders: {
             position: "Bottom",
             weight: 1,
              lineStyle: "Continuous",
              color: "#cccccc",
          }
    }



}