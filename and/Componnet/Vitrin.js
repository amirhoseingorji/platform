import React, { PureComponent } from 'react';
import Slider from "react-slick";
import {  Carousel,Dialog, Container, Button, Image, SegmentedButton } from '@sencha/ext-modern';
import {  Icon ,Title } from './*';
import Storer from "../Store/Storer";
export default class Vitrin extends PureComponent {
    state = {showDialog:false}
    addCart(id,title,price){
        if(window.userData._user) {
            let exist = false;
            for(let _cart of window._cart) if(_cart._movies==id) exist=true;
            Ext.Msg.confirm("تایید", exist ? ("فیلم "+title+" در سبد خرید شما موجود است می خواهید نفرات را افزاش دهید؟"): ("آیا فیلم "+title+" به سبد خرید شما اضافه شود?"),(st)=>this.onConfirmResult(st=="yes"?id:0,title,price));
            }else Ext.toast(`برای اضافه کردن کالا به سبد خرید ابتدا باید وارد سیستم شوید.`);
    }
    onConfirmResult(_movies,title,price){
        if(!_movies) return null;
        Ext.toast(`فیلم ${title} به سبد خرید شما اضافه شد`);
        let {_user_factor} = window.userData
        let exist = false;
        for(let _cart of window._cart) if(_cart._movies==_movies) exist=true;
        if(exist) Storer("_user_factor_cart", this, {from:"user_factor_cart",0:{_user_factor,_movies},count:"{`count`+1}"}, "update");
        else Storer("_user_factor_cart", this, {from:"user_factor_cart",_user_factor,_movies ,target:title,count:1,price}, "insert");
        Storer({ user_factor_cart: {0:{_user_factor}} }, Ext.platformTags.phone?window.Header:window.MainMenu)
        
        // console.log(window.Header.refactor)
        // setTimeout( window.Header.refactor,300);
    }
    continue(pageLink) {
        //console.log(pageLink)
          if((pageLink+"").slice(0,4)=="http") window.location.href = pageLink; else if (this.props.continue == "dialog")  this.gallery(pageLink);      else this.props.history.push(pageLink)
    }
    gallery(id) {
        this.refs.Dialog.setHidden(false) 
        console.log(id)
        this.refs.Carousel.setActiveItem(id)
    }
    shoping(money,id){
        window.socket.emit("pay",money,window.location.hostname,id);
        window.socket.on("paylink",link=>{window.location.href = link});
    }
    Tpl = (e, i) => {
       
                if(typeof e == "object") e.text = e.text || e.title || e.name;
        if (e.src) {
           if(e.ago && e.price){
               e.price = "<div class='del'>"+e.ago+"</div><span>"+ e.price +"</span>"
           }
            return <div shadow key={e.id || i} cls="x-round"><div  key={e.id || i} {...this.tplProps} style={{color:"#ff0000",backgroundColor:"#000000",padding:"0px"}} padding={0}> 
            <img padding={0} src={e.src} {...this.imgProps} {...this.props.imgProps} onClick={() => { this.continue(e.link||e.target || (this.props.continue=="dialog"?i: this.props.continue + "?"+this.props.itemName+"=" + e.id)) }} height={this.props.height} style={{maxHeight:(this.props.height)+"px"}} />
           

        </div>
        <div margin={3} cls="rtl">
        {e.text && <center><div style={{ fontSize: "14px" ,padding:"0 20"}}>{e.text || ""}</div></center>}
        </div>
        {/* {e.price ? <Container cls="del" style={{color:"#000000"}}> {(e.ago ? +e.ago + " تومان" : "")} </Container>:null} */}
          
         </div>}
        else if (e.text) {
            return <div key={e.id || i} {...this.tplProps}  onClick={() => { this.continue(e.target || this.props.continue + "?"+this.props.itemName+"=" + e.id) }} >{e.text}</div>
        } else return <div key={e.id || i} {...this.tplProps}>{e}</div>
    }
    render() {
        if (this.props.children) this.defProps.data = (!this.props.children.length) ? [this.props.children] : [...this.props.children]
        
     //  console.log(e)
     
        var settings = Object.assign({ itemTpl: this.Tpl,gallerytpl: this.gallerytpl }, this.defProps, this.props,this.state);
        if (settings.minWidth) {
            let intres = 1360
            settings.slidesToShow = Math.floor(intres / settings.minWidth);

            settings.responsive = []
            for (let i = settings.slidesToShow - 1; i > 1; i--) {
                settings.responsive.push({
                    breakpoint: settings.minWidth * i,
                    settings: {
                        slidesToShow: i,
                        slidesToScroll :i,
                        initialSlide: settings.rtl ? (settings.data ? settings.data.length - settings.slidesToShow:1) : 1
                    }
                }
                )
            }
        }
        settings.slidesToScroll = settings.slidesToShow;
        if (settings.shadow) this.tplProps.shadow = true
        if (settings.round) this.tplProps.cls += " x-round x-zeropading";
        if (settings.round) this.tplProps.ui = "round";
        if (settings.itemCls) this.tplProps.cls += " " + settings.itemCls;
        if (settings.rtl) {
            this.tplProps.cls += " rtl"
            if(settings.data){
            settings.data.reverse()
            settings.initialSlide = settings.data.length - settings.slidesToShow
            }
        }
        settings.className = ""
        if (settings.dots) settings.className += " slick-slide-withdot"
        if (settings.arrows) settings.className += " slick-slide-witharrow"
        console.log(settings.data)
        return (
            <Container cls={settings.rtl == true ? "noselect rtl" : "noselect"} >
 <Dialog ref= "Dialog"
                    hidden 
                    centered
                    closable
                    
                    closeAction="hide"
                    maskTapHandler={() => this.setState({ showDialog: false })}
                    bodyPadding="10"
                    cls="x-round"
                     shadow
                    width = "calc(100% - 20px)"
                    height = "calc(100% - 20px)"
                    top="0"
                    left="0"
                    margin="10"
                    defaultFocus="#ok"
                    onHide={() => this.setState({ showDialog: false })}
                >
                                {settings.data &&
                <Carousel ref="Carousel" padding={0} layout="fit" height="100%" >
                    {settings.data.map((e,i)=> <Image key={i} padding={0} src={e.src} layout="fit"   mode="img" margin="5"  />)}
                </Carousel> }
                </Dialog>
                {settings.title && <Container layout={{ type: "hbox", align: "stretch" ,pack:"center" }} cls="x-vitrin-title" userCls="behindline" width="100%" margin="5 0 15 0">
                   <Container style={{margin:"0 20px",minWidth:"160px"}}><Title text={settings.title} icon={settings.icon} H="h4" /></Container> 
                    {settings.all && <Button margin="0 30" iconCls="x-fa fa-ellipsis-h more" cls="x-vitrin-all"  handler={() => { if(settings.continue) this.continue(settings.showAll||settings.continue) }} text={settings.all} />}
                </Container>}
                {settings.data && <div style={{padding:"0 15px"}} ><Slider {...settings} rtl={false} >
                    {settings.data.map(settings.itemTpl)}
                </Slider></div>
                 }
               
            </Container>
        );
    }
    imgProps = {
        style:{
            //maxHeight :"100px",
        
        },
        mode:"img",
        cls: "x-vitrin-img",
        width: "100%"

    };
    tplProps = {
        cls: 'noselect',
        layout: { type: "vbox", align: "center" }
    }
    defProps = {
        infinite: false,
        minWidth: 200,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows:false,
        rtl: true,
        all: "",
    }
}
