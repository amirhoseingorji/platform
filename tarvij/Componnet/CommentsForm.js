import React, { Component } from 'react';
import { Container, Button, FormPanel, TextField, TextAreaField } from '@sencha/ext-modern';
export default class CommentsForm extends Component {
    ok = ()=>this.setState({ route: 'Device' });
    cancle = ()=> this.setState({ route: 'Device' });
    render = () => <FormPanel>
        <TextField {...this.Tprops} placeholder="نام" required />
        <TextField {...this.Tprops} placeholder="ایمیل" />
        <TextAreaField {...this.Tprops} placeholder="پیام شما" required height="150" />
        <Container layout={{type:"hbox",pack: 'center'}}>
            <Button text="انصراف" iconCls="x-fa fa-ban" {...this.Bprops} handler={this.cancle.bind(this)} />
            <Button text="تایید " iconCls="x-fa fa-check-circle" {...this.Bprops} handler={this.ok.bind(this)} />
        </Container>
    </FormPanel>
    Bprops = {
        ui: "action round",
        shadow: true,
        flex: "1",
        margin: "5"
    }
    Tprops = {
        height: '40',
        shadow: true,
        cls: 'rtl x-round searchpage x-round',
        margin: '5',
        textAlign: 'right',
    };
}