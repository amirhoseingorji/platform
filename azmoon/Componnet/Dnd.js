import React, { Component } from 'react';
import { Container } from '@sencha/ext-modern';
import Storer from "../Store/Storer"
Ext.require(['Ext.Toast', 'Ext.drag.*']);
export default class Dnd extends Component {

    state = { renew: 1, Ditems: [] }
    componentWillMount() {
        

        this.mainsources = []
        this.reset.bind(this)
        this.restore.bind(this)
        for (let it of this.props.items) if (it.val) this.state.Ditems.push(it)
        this.setState({ renew: Math.random() })
    }
    savedestroyer(){
        let {_comparison_value,num,parent} = this.props;
        if(this.data) {
            Storer("upcomparison_user_value", "", {from : "comparison_user_value", status:2,...this.data,0:{_comparison_value}},"update");
        }
        this.data={}
        for(let source of this.mainsources) {
            console.log(source)
            source.disable()
        }
     
    }
    reset() {
        
        this.mainsources = []
        this.state.Ditems = []
        for (let it of this.props.items) if (it.val) this.state.Ditems.push(it)
        this.setState({ renew: Math.random() })
    }
    restore(i) {
        for (let k in this.state.Ditems) {
            if (i == this.state.Ditems[k].id) {
                this.state.Ditems[k].val = 0
                this.state.Ditems.splice(k, 1)
                this.mainsources.splice(k, 1)
                for (let it of this.props.items) if (it.id == i) it.val = 0
            }
        }
        this.setState({ renew: Math.random() })
    }
    render() {
        this.state.Ditems = []
        for (let it of this.props.items) if (it.val) this.state.Ditems.push(it)
                let {_comparison_value,_value,_comparison} = this.props;
        if(this.props.user_values._value==-1) {
            console.log("insert  , ", this.props.user_values._value)
            this.props.user_values._value = _value
            Storer("incomparison_user_value", "", {from:"comparison_user_value",status:0,...this.data,_comparison_value,_value,_comparison},"insert");

        }
        this.maxcounter = this.props.phase>0 ? this.props.items.length-2 : 2
        if(this.props.items.length<2 || this.maxcounter==0) {
           Ext.toast("این بخش نیازی به پاسخ ندارد لطفا کلید بعدی را بزنید");
          //  setTimeout(this.props.parent.next,100)
           // return null
        }
        let max = this.props.max
        let min = this.props.min
        console.log(max,min)
        let isdisable = this.maxcounter -this.state.Ditems.length == 0 || this.props.items.length<2 ? true : false
        this.isdisable = isdisable;
        if (this.mainsource) if (isdisable ) this.mainsource.disable(); else this.mainsource.enable();
        if (!max & !min & this.state.Ditems.length==2) {
            let max = Math.max(this.state.Ditems[0].val||0,this.state.Ditems[1].val||0);
            let min = Math.min(this.state.Ditems[0].val||0,this.state.Ditems[1].val||0);
            var maxid, minid
            if(this.state.Ditems[0].val == max) {maxid=this.state.Ditems[0].id;minid=this.state.Ditems[1].id} else{maxid=this.state.Ditems[1].id;minid=this.state.Ditems[0].id}
            this.data= {max,min,maxid,minid}
            this.props.user_values.maxid = maxid;
            this.props.user_values.minid = minid;
            this.props.user_values.max = max;
            this.props.user_values.min = min;

        }else if(max){
            let bymax = []
            for(let dit of this.state.Ditems) bymax.push(dit.id+":"+dit.val)
            bymax = `{${bymax.join(",")}}`
            this.data = {bymax: `{'${bymax}'}` };
            this.props.user_values.bymax = bymax
        }else if(min){
            let bymin = []
            for(let dit of this.state.Ditems) bymin.push(dit.id+":"+dit.val)
            bymin = `{${bymin.join(",")}}`
            this.data = {bymin: `{'${bymin}'}` };
            this.props.user_values.bymin = bymin
        }
        console.log(this.state.Ditems)
        return <Container layout="hbox" height="100%" cls='ltr' ref='area' minWidth="600">
            <Container layout="hbox" height="100%" cls='ltr' flex="1" style={{   backgroundColor: "lightyellow",borderRadius:"5px",border:"solid 1px #999999"}}>
                <Container cls="gradiant" width="12" height="360" ></Container>
                <Container ref="dragCt" className="dand-constraints-dragCt" height="360" width="100%" minWidth="290" >

                    {max && <Container className={"best"}  > <div className="dand-constraints-text" title={max.name}>{max.name}</div></Container>}
                    {min && <Container className={"worse"} > <div className="dand-constraints-text" title={min.name}>{min.name}</div></Container>}
                    {this.state.Ditems.map((e, i) => <div id={'panje' + e.id} ref={'ditem' + i} key={i} className='dand-constraints-item' ><div className="dand-constraints-text" title={e.name} >{e.name}</div><span onClick={() => this.restore(e.id)} className="fas fa-backspace backitem" /></div>)}

                </Container>
            </Container>
            <Container ref="vertical3" cls={'viewoverflow rtl vertical3' + (isdisable ? " halfopac" : "")} flex="1" >
    {this.props.items.map((e, i) => {if(!e.disabled) return <div id={'sanje' + e.id} key={e.id} className={ e.val ? 'drghidden': 'dand-constraints-pretext'}>{e.name} </div>} )}
            </Container>
        </Container>
    }
    componentDidUpdate() {
        for (let k in this.state.Ditems) {
           // 
            let top = (9 - (Math.max(1,Math.min(this.state.Ditems[k].val,9)) || 0)) / 8 * 337 - k * 23 - (this.props.phase?1:0)*23
            console.log({top})
            this.refs["ditem" + k].cmp.el.dom.setAttribute("style", `top: ${top}px;`);
            if(this.mainsources[k]) continue;
            this.mainsources.push(
                new Ext.drag.Source({
                    element: this.refs["ditem" + k].cmp.el,
                    listeners: {
                        dragend:this.dragend.bind(this)
                    },
                    constrain: {
                        element: true,
                        vertical: true
                    }
                })
            )
        }

    }
    dragend(source, info){
        let top = info.eventTarget.parentElement.parentElement.style.top.slice(0, -2) * 1
        let id = info.eventTarget.parentElement.id.slice(5) * 1
        var kk = 0;
        for (let k in this.state.Ditems) if (id == this.state.Ditems[k].id) kk = k;
        for (let it of this.props.items) if (it.id == id)  {
            it.val = Math.floor(100 * (9 - (top + kk * 23+(this.props.phase?1:0)*23) / 337 * 8))*100
            this.state.Ditems[kk].val = it.val
        }
    }
    findPos(obj){
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        return undefined;
    }    
    componentDidMount() {
        this.componentDidUpdate();
        this.tsource = new Ext.drag.Target({
            element: this.refs.dragCt.cmp.el,
            listeners: {
                drop: (source, info) => {
                    if (info.eventTarget.className.indexOf("dand-constraints-pretext") == -1) return null;
                 //  console.log(this.findPos(this.refs.dragCt.cmp.el.dom))
                    var val = Math.floor(100*Math.max(1,Math.min(9,9 - (info.cursor.current.y-12-this.findPos(this.refs.dragCt.cmp.el.dom).y)/337*8)))/100
                    var id = info.eventTarget.id.slice(5) * 1
                    var name = info.eventTarget.innerHTML
                    for (let it of this.props.items) if (it.id == id) {
                        it.val = val
                    }
                    let Ditems = this.state.Ditems
                    Ditems.push({ name,id,cls:'drghidden',val : val})
                    this.setState({ Ditems })
                }
            }
        })
        this.mainsource = new Ext.drag.Source({
            element: this.refs.vertical3.cmp.el,
            handle: ".dand-constraints-pretext",
            constrain: {
                element: this.refs.area.cmp.el,
            },
            listeners: {
                dragstart: (source, info) => source.getProxy().setHtml(info.eventTarget.innerHTML),
            },
            proxy: {
                type: 'placeholder',
                cls: 'dand-constraints-pretext dtocenter'
            }
        })

    }

    componentWillUnmount() {
        Ext.destroy(this.tsource);
        Ext.destroy(this.mainsource);
        for (let source of this.mainsources) Ext.destroy(source);
    }
}