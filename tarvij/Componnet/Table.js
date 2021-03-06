import React, { Component ,ReactRouter} from 'react';
import { Container, Grid, TitleBar, Column, NumberField,Button,SliderField,Image, FileField,Dialog,TextAreaField,DatePickerField,SelectField ,Video, SearchField,ActionSheet,Progress ,Rating } from '@sencha/ext-modern';
import { RendererCell } from '@sencha/ext-modern';
import { Tree, TreeColumn } from '@sencha/ext-modern-treegrid';
import Icon from "./Icon";
import moment from 'moment-jalaali'
moment.loadPersian({usePersianDigits: false})
import PerfectScrollbar from "perfect-scrollbar";
import Storer from "../Store/Storer"
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
        if(this.props.joinMode) data.joinMode=this.props.joinMode;
        if(this.props.refresh && typeof this.props.refresh == "function") this.props.refresh()
      // let tables = {data}
      // if(!this.state) for(let col in _cols) if(_cols[col].options && _cols[col].options.from && !this.state[tables[col]]) tables[col] = _cols[col].options;
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
        if(confirm==false) return Ext.Msg.confirm("تایید","آیا از حذف این مورد اطمینان دارید؟",(st)=>{if(st=="yes") this.delete(record,true,event); });
        else{
            let _me =record.store||record.getTreeStore()
            _me.remove(record);
            setTimeout(this._refresh,500)
            if(event) event(record)
        } 
    }
    _refresh = ()=>this.componentWillMount()
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
        this.filterVal = this.state.filtervaloption ?  this.refs._filterOptval.cmp.getValue() :this.refs._filterVal.cmp.getValue()
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
        this.setState({ showDialog: true,html,_record,_column,imgpath:"",filpath:"",mp4path:"",showrecord:false});
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
    column ='';
    console.log({value,record,column},button.up('gridcolumn'))
    return {value,record,column}
    }
    delbtn=(Options,event)=>{
        return {
        ...this.BProps,  
        iconCls:"x-fa fa-trash" ,
        margin:0,
        handler : (b)=>{let {value,record,column} = this.whandler(b);this.delete(record)}
    }}
  

    //toggle = (id,record,Column,Options,event)=>
    //    <Button {...this.BProps} margin={0} handler={(a,b)=>this.toggler(a,b,id,record,Column,Options,event)} iconCls={"x-fa fa-"+this.selector(id,record,Column,Options) }  />
    toggle=(Options,event)=>{
        return {
        ...this.BProps,  
        iconCls:"x-fas fa-sync" ,
        margin:0,
        _text:"",
        handler : (b)=>{let {value,record,Column} = this.whantogglerdler(b);this.toggler("a","b",value,record,Column,Options,event)}
    }}
    toggler(a,b,id,record,Column,Options,event){
        let arr = Object.keys(Options)
        for(var i=0;i<arr.length;i++ ){
            if(id==arr[i]) break;
        }
        record.set(Column,arr[(i+1)%arr.length]);
        if(event) event(record)
    }
    //imgbtn = (value,record,Column,Options)=><Button {...this.BProps} {...Options} iconCls={value.length>2?"x-fa fa-picture-o":""} margin={0} handler={()=>this.getImage(value,record,Column,Options)} />
    
    imgbtn=(Options,event)=>{
        return {
        ...this.BProps,
        ...Options,  
        iconCls:"x-fas fa-image" ,
        margin:0,
        
        handler : (b)=>{let {value,record,column} = this.whandler(b);this.getImage(value,record,Column,Options)}
    }}

    filebtn = (value,record,Column)=><Button {...this.BProps} iconCls={value.length>2?"x-fa fa-file":""} margin={0} handler={()=>this.getFile(value,record,Column)} />
    mp4btn = (value,record,Column)=><Button {...this.BProps} iconCls={value.length>2?"x-fa fa-video-camera":""} margin={0} handler={()=>this.getmp4(value,record,Column)} />
    exticons= {"mp4":"video-camera","mp3":"music","jpeg":"picture-o","jpg":"picture-o","png":"picture-o","bmp":"picture-o"}
    multitype = {"mp4":"video","mp3":"sound","jpeg":"img","jpg":"img","png":"img","bmp":"img"}
    // multy = (value,record,Column,Options)=><Button {...this.BProps} iconCls={"x-fa fa-"+(value.length<2?"upload":this.exticons[value.split(".").pop()])} margin={0} handler={()=>this.getmulty(value,record,Column,Options,this.multitype[value.split(".").pop()])} />
    multy=(Options,event)=>{
        return {
        ...this.BProps,
        ...Options,  
        iconCls:"x-fas fa-upload" ,
        margin:0,
        handler : (b)=>{let {value,record,column} = this.whandler(b);this.getmulty(value,record,Column,Options)}
    }}
    htmlbtn = (value,record,Column)=><Button {...this.BProps} iconCls={value.length>2?"x-fa fa-file-text":""} margin={0} handler={()=>this.gethtm(value,record,Column)} />
    //adrsbtn = (id,record)=><Button {...this.BProps} iconCls={id?"x-fa fa-map-marker":""} margin={0} handler={()=>this.showAddres(id)} />
    showbtn = (value,record,Column)=><Button {...this.BProps} iconCls={"x-fa fa-list"} margin={0} handler={()=>this.showall(value,record,Column)} />
   // ratebtn = (value,record,Column)=><Rating cls="ltr" value={value} scale="180%" disabled={true} trackOver={false}/>
    ratebtn=(Options,event)=>{
        return {
        cls:"rtl",
        scale:"180%",
        disabled :true,
        trackOver :false,
        margin:0,
        xtype: 'rating'
    }}
    date = v => v?moment(v).format("HH:mm     jM/jD"):v;
    link = (value, record, Column) => <a href={value.indexOf("http")>-1?value:"http://"+value} target="_blank">{value}</a>
    // linkbox = (value, record, Column) => <Button {...this.BProps} iconCls={value.length>2?"x-fa fa-link":""} margin={0} handler={()=>this.gethtm(value,record,Column)} />
    linkbox=(Options,event)=>{
        return {
        ...this.BProps,
        ...Options,  
        iconCls:"x-fas fa-link" ,
        margin:0,
        handler : (b)=>{let {value,record,Column} = this.whandler(b);this.gethtm(value,record,Column)}
    }}
    email = (value, record, Column) => <a href={"mailto:"+value} target="_blank">{value}</a>
    key = v=>v;
    dragbtn = (v,r,c,o)=>{
    //console.log("dragItem"+v)
    return <Button {...this.BProps} iconCls={"x-fa fa-list"} margin={0} key={"dragItem"+v} onTap={(t)=>{
        console.log(t)

    }} />
    }
    redatekey = (value,record,Column) => {
        let text = this.date(value)
        let check = false;
        if(record.data.expire) if((new Date()).getTime() - (new Date(value)).getTime()<record.data.expire*24*3600*1000) check=true;
        return <Button {...this.BProps} text={text} iconCls={check?"x-fa fa-check":"x-fas fa-sync-alt"} margin={0} handler={() => {
            setTimeout(this._refresh,1000);record.set(Column,"{CURRENT_TIMESTAMP}")}} width="100%" />
    }
    statebtn = (value,record,Column,o)=>{
        // console.log(o,o[value],value)
    return <Button {...this.BProps} iconCls={o[value].icon} margin={0} handler={o[value].handler} /> }
    // linkkey = (value,r,c,o) => {
    //     let id = o.dataIndex ? r.data[o.dataIndex] : value
    
    //     let val = o.value ? r.data[o.value] : id;
    //     return <Button {...this.BProps} text={val} iconCls={o&&o.icon?o.icon:"x-fa fa-link"} margin={0}  width="100%" handler={()=>this.navigate(o.path+"?"+o.col+"="+id+(o.group?"&group="+o.group:"")) }/>}
    linkkey=(o)=>{
            return {
            ...this.BProps,  
            iconCls:o&&o.icon?o.icon:"x-fas fa-link",
            margin:0,
            width:"100%",
            handler : (b)=>{let {value,record} = this.whandler(b);
            let id = o.dataIndex ? record.data[o.dataIndex] : value;
            this.navigate(o.path+"?"+o.col+"="+id+(o.group?"&group="+o.group:""))}
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
        handler : (b)=>{let {value,record} = this.whandler(b);window.socket.emit(o.path,o.dataIndex ? record.data[o.dataIndex] : value)}
    }}
   
    pidtow = (v, a) => { if (v) for (let idata of this.state.data) if (idata.id == v) return idata.title || idata.name; return "-"; }
    selector = (value, record, Column, options) => { 
        options = Object.entries(options).map(e=>{return {text:e[1],value:e[0]}; })
        for (let opt of options) if (opt.value == value) return opt.text;
    }
    draginit() {
        let rows = window.document.getElementsByClassName("x-gridrow");
 //       console.log(rows)
for(let row of rows) {
    this.source = new Ext.drag.Source({
            element: row,
            constrain: {
                vertical: true
            },
           activeOnLongPress:true,
           revert:true,
            listeners: {
                dragmove: this.onDragMove.bind(this),
                dragend: this.onDragEnd.bind(this)
            }
        });
       
}
        
    }
    // componentDidUpdate(){
    //     // console.log(this.props)
    //     // this.props.parent.refresh();
    // }
    componentDidMount(){
        this.grid.cmp.on('drop', function(node, data, overModel, dropPosition) {
            console.log({node, data, overModel, dropPosition})
       });
    }
    onDragMove(){

    }
    onDragEnd(){
        //this.source.destroy();
        this.setState({a:Math.random()});
       
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
        let MGrid = this.props.tree? Tree : Grid;
        let filteropt = [];
        let cols = this.props.cols
        this.state.filtervaloption = []
        
        for(let i in cols) {
            if(cols[i].text && (!cols[i].btn || cols[i].btn.indexOf("btn")==-1) ) {
                if((this.state.selectedFilter == cols[i].dataIndex || this.state.selectedFilter == i)  ){
                    if(cols[i].btn =="selector" ) {          
                        this.state.filtervaloption = Object.entries(cols[i].options).map(e=>({text:e[1],value:e[0]}))
                    } 
                }
                filteropt.push({text:cols[i].text,value:cols[i].dataIndex||i})
            }
        }
//gridexporter: true,
         let plugins = {  gridexporter: true,gridcellediting: true  ,gridrowdragdrop: true,}

        if(this.props.gridsummaryrow) plugins.gridsummaryrow = true
        if(this.props.tree) {
            plugins.treedragdrop = true
             plugins.gridrowdragdrop= false;
        }
        
        let title = this.props.title+"<span style='font-size:12px'>" + (this.count || 0) + "   مورد</span>"+(this.subtitle?"<br/><span style='font-size:12px'>"+this.subtitle+"</span>":"")+(this.props.moreinfo?"<br/>"+this.props.moreinfo:"") 
        this.title = this.props.title+(this.subtitle?" - "+this.subtitle:"")
        
        let filtervaloption = this.state.filtervaloption;
        return <Container layout="fit" hidden={this.props.hidden} width={this.props.width||"100%"} padding={0}>
            
            <Container cls="rtl" layout={{ type: "vbox", align: Ext.platformTags.phone ? "strech" : "center", pack: "start" }} layout="fit" margin={this.props.noshowddow?0:5} scrollable ref="mainPage" padding="0" >
            
                <Container  {...this.MainProps} ref="dragContainer" margin={0} cls={this.props.noshowddow?"":"x-round"}  >
                
                    <MGrid store={this.state.dataStore} shadow={this.props.noshowddow?false:true} cls={this.props.noshowddow?"":"x-round"} plugins={plugins} sortable={!this.props.tree && !this.props.unsortable}  onColumnSort={this.onsort.bind(this)} 
                    columnMenu ={null} 
                    onSelect={this.props.onSelect||(()=>{})}
                    ref={grid => this.grid = grid}>
                        <TitleBar title={title} docked="top" ui="titlebar-search" cls={this.props.noshowddow?"":"x-round"}  > 
                        
                            <Icon name={this.props.icon} align="left" />
                            {/* <Button {...this.BProps} hidden={true} {...this.props.btn1}  /> */}
                            <Button {...this.BProps} hidden={false} {...this.props.refresh} iconCls="x-fas fa-sync-alt" handler={this._refresh} ripple={false}/>

                            <Button  {...this.BProps} hidden={true} {...this.props.btn2}  ripple={false}/>
                            <Button {...this.BProps} hidden={true} {...this.props.btn3} ripple={false} />
                            <Button {...this.BProps} hidden={true} {...this.props.btn4}  ripple={false}/>
                            <Button {...this.BProps} hidden={true} {...this.props.btn5}  ripple={false}/>
                            <SelectField hidden={true} value={filteropt[0].value} ref="_filterKey" {...this.props.filter} options={filteropt} {...this.Iprops} onChange={(a,b)=>{this.setState({selectedFilter:b})}} ripple={false}/>
                            <SearchField  ref="_filterVal"  placeholder="فیلتر" hidden={filtervaloption.length==0?false:true} {...this.props.filter} {...this.Iprops} onAction={this.filterer.bind(this)}  ripple={false}/>
                            <SelectField  value={filteropt[0].value} ref="_filterOptval" {...this.props.filter} options={filtervaloption} {...this.Iprops}  hidden={filtervaloption.length>0?false:true} ripple={false}/>
                 
                            <Button {...this.BProps} hidden={true} {...this.props.filter} iconCls="x-fa fa-filter" handler={this.filterer.bind(this)} ripple={false}/>
                            <Button {...this.BProps} hidden={false} {...this.props.excel} iconCls="x-fa fa-table" handler={this.exportToXlsx} ripple={false}/>
                            <Button {...this.BProps} hidden={!this.props.new}   iconCls="x-fa fa-plus-square" handler={this.new} ripple={false}/>
                            <Button {...this.BProps} hidden={false} {...this.props.print} iconCls="x-fa fa-print" handler={this.print}  handler={this.exportToHtml} ripple={false}/>
                            <Button {...this.BProps} hidden={true} {...this.props.btn1}  ripple={false}/>
                            <Button {...this.BProps} hidden={false} {...this.props.back} iconCls="x-fa fa-arrow-left" handler={this.back} ripple={false}/>
                            
                        </TitleBar> 
                        
                        {Object.entries(cols).map((e, i) => {
                            if(e[1].btn) {
                                if(e[1].btn=="selector")
                                e[1].renderer = (value,record,Column)=>this[e[1].btn](value,record,Column,e[1].options,e[1].event);
                                else e[1].cell= {
                                xtype: 'widgetcell',
                                forceWidth: true,
                                widget: {xtype: 'button',...this[e[1].btn](e[1].options,e[1].event)}
                     
                             }
                                if(e[1].btn.indexOf("btn")>-1) {
                                    e[1].width= e[1].width||60;e[1].ignoreExport = true;
                                }
                            }
                            if(e[1].exp) {
                                e[1].ignoreExport = false;
                                e[1].exportRenderer = (value,record,Column)=>this[e[1].exp](value,record,Column,e[1].options);
                            }else e[1].exportRenderer = e[1].renderer;
                            if(this.props.gridsummaryrow) e[1].exportSummaryRenderer = e[1].summaryRenderer
                            e[1].exportStyle = this.Estyle;
                            let MColumn =e[0]==this.props.tree? TreeColumn : Column
                            return e[1].text  ? <MColumn key={i} dataIndex={e[0]} {...e[1]} align={e[0]==this.props.tree?"right":"center"}   >

                                {e[1].type == "number" ? <NumberField  validators={{ type: "number" }} /> : null}
                                {e[1].type == "date" ? <DatePickerField   /> : null}
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
                style={{backgroundColor:"#ffffff"}}
                    displayed={showDialog} title="اطلاعات" closable maximizable closeAction="hide" maskTapHandler={this.dilogonCancel} bodyPadding="10"  efaultFocus="#ok" onHide={this.dilogonCancel}
                >
                <Container >{this.info}</Container>
                <Container cls="printdialog rtl" style={{color:"#000000"}} layout="hbox" >
                    <Container hidden={!showrecord} ><div dangerouslySetInnerHTML={{__html:showrecord}} /></Container>
                   {imgpath && imgpath.length>1 && <Image src={imgpath} mode="img" height="500"  hidden={!imgpath || imgpath.length<2}/>}
                </Container>
                    <Video ref="_Video" height="400" width="100%"  url={[mp4path]} hidden={!mp4path || mp4path.length<2} />
                    <Button text="دانلود" ui="action round" handler={()=>window.open(filpath, '_blank')} hidden={!filpath || filpath.length<2} />
                    {/* <Container hidden={!html || html.length<2} ref="_counter" html={this.counter(html)}></Container>  */}
                    <TextAreaField ref="_html" cls="rtl" height="100%" value={html} onChange={this.htmlevent.bind(this)} hidden={!html || html.length<2} />
                    
                    <FileField placeholder="انتخاب فایل" hidden={html || showrecord } />
                    
                    
                    <Button text="انصراف" handler={this.dilogonCancel.bind(this)} />
                    <Button text="چاپ" hidden={!showrecord || true} handler={this.dialogPrinter.bind(this)} iconCls="x-fa fa-print" />
                    <Button text="حذف" hidden={showrecord|| true} handler={this.omiter.bind(this)} />
                    {html?<Button text="تایید" hidden={showrecord} handler={this.htmupdater.bind(this)} />:<Button hidden={showrecord } text="تایید" handler={this.uploader.bind(this)} />}
                </Dialog>
            </Container>
            <Progress value={progress/100.0} hidden={!showprogress} width={"100%"} docked="top" text={"درحال انجام ..."+ progress + "%"}/>
        </Container>
    }
    htmlevent(t,v){

        this.refs._counter.setHtml(this.counter(v))
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
    uploader(){
        var file    = window.document.querySelector('input[type=file]').files[0];
        
        var reader  = new FileReader();
         reader.addEventListener("load",  ()=>{
          socket.emit('upload', { 
              name: (this.state.Options.path||"") + file.name, 
              type: file.type, 
              size: file.size, 
              data: reader.result
          });
          //console.log(reader.result)
          //this.setState({imgpath:reader.result});
          window.socket.on("upload",(data,width,height)=>{
            window.socket.off("upload");
            this.state._record.set(this.state._column,data);
            
            if(width) {
                this.state._record.set("width",width);
                this.state._record.set("height",height);
                
            }
            this.state._record.set("status",1);
            if(this.props.onUpload ) this.props.onUpload(this.state._record)
            this.dilogonCancel();
          })
        }, false);
        if (file)  if(file.name.indexOf(".fbx")>-1) reader.readAsBinaryString(file);else reader.readAsDataURL(file);
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
            title: this.props.title + "   ( " + (this.count || 0) + "  مورد )",
            fileName: this.props.title + '.html',
        }
        if(this.props.gridsummaryrow) conf.includeSummary= true
        let html = this.grid.cmp.getDocumentData(conf)
        
        html = html.replace("<body>", "<body dir='rtl' style='font-family:BYekan'><table class='noborder' width=100%><tr ><td width='120px'><img  src='/img/Madgray.png' style='height: 80px;'></td><td flex=1><h2> </h2><h4> </h4></td><td align='center'><br/> نسخه چاپی اطلاعات<br/><br/>تاریخ :" + moment(new Date()).format("HH:mm     jM/jD") + "</td></tr></table>"+(this.props.printHeader?this.props.printHeader():"")).replace("<style>", "<style>\n@font-face {\nfont-family: 'BYekan';\nfont-weight: normal;\nfont-style: normal;\nsrc: url(\"/ext/resources/fonts/BYekan.ttf\") format('truetype');\n}\n"+(this.props.gridsummaryrow?"tr:last-child{\nfont-weight:bold;\nborder-top:2px solid #000 !important;\n}\n":"")+".noborder,.noborder tr,.noborder td{\nborder:none !important;\nfont-weight:bold;}\n").replace("</body>",(this.props.printFooter?this.props.printFooter():"")+"</body>");
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
            "</head><body dir='rtl' style='font-family:BYekan'><table class='noborder' width=100%><tr ><td width='120px'><img  src='/img/Madgray.png' style='height: 80px;'></td><td flex=1><h2> </h2><h4> </h4></td><td align='center'><br/> نسخه چاپی اطلاعات<br/><br/>تاریخ :" + moment(new Date()).format("HH:mm     jM/jD") + "</td></tr></table><h4>" + title + '</h4><hr/>' + document.querySelector(elem).innerHTML.replace("<img","<hr/><img") + '</body></html>';
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
        width:30,
        ui: "action round",
        shadow: true,
        margin: '5',
        align:"right"
      }
    Iprops={
        width:150,
        cls:"ltr x-round headerInput",
        align:"right",
        ui:"Alt Raised round",
        style:{backgroundColor:"#ec9e08b3",color:"white"},
        shadow:true,
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