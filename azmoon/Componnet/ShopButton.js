import React, { Component } from 'react';
import { Container, SegmentedButton, Button} from '@sencha/ext-modern';
import Storer from "../Store/Storer";
export default class ShopButton extends Component {
    shoping(money,id){
        window.socket.emit("pay",money,window.location.hostname,id);
        window.socket.on("paylink",link=>{window.location.href = link});
    }
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
    visapay(){
        let { price, ago ,visalink ,before,$id,large} = this.props;
        window.location.href = visalink
    }
    render() {
        let { price,title, ago ,visalink ,before,$id,large} = this.props;
        before = before||""
        if (price) return <Container {...this.props}>
            {ago && <Container cls="del">
                {ago ? ago + ' تومان' : ''}
            </Container>}
            <SegmentedButton cls="ltr" width="100%" height="100%">
                <Button iconCls={"x-fa fa-shopping-cart"+(large?" x-large":"")} ui="action " flex={1}  handler={()=>this.addCart($id,title,price)}/>
                <Button ref="paybtn" text={before+" "+price + ' تومان'} cls="rtl" ui="action  " flex={3} pressed handler={()=>this.shoping(price,$id)}/>
                {visalink && 
                <Button iconCls={"x-fa fa-cc-visa"+(large?" x-large":"")} ui="action " flex={1} handler={this.visapay.bind(this)} />}
            </SegmentedButton>
    </Container>
        else return <Button text="رایگان" ui="action " flex={1} {...this.props}/>
    }
}