import React, { PureComponent } from 'react';
import { Container, Image, List,TextField, SegmentedButton, Button ,Rating,SliderField,SearchField} from '@sencha/ext-modern';
import { Title, Vitrin,ContentInfo } from "./*";
import Storer from "../Store/Storer";
Ext.require('Ext.MessageBox');
if (Ext.MessageBox) {
  var MB = Ext.MessageBox;
  Ext.apply(MB, {
    CANCEL: { text: "انصراف", itemId: "CANCEL" },
    OK: { text: "مرحله بعد", itemId: "OK" }
  });
//   Ext.apply(MB, {
//     OKCANCEL: [Ext.MessageBox.OK, Ext.MessageBox.CANCEL]
//   });
}
Ext.require('Ext.Toast');
import loading from "../Statics/Images/loading.gif";
export default class Items extends PureComponent {
    state = { Listmode: true ,...this.props,data:{count:0},page:1,loading:true}
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
    shoping(money,id){
        window.socket.emit("pay",money,window.location.hostname,id);
        window.socket.on("paylink",link=>{window.location.href = link});
    }
    onpage(f,v){
        this.isloadeing=true;
        this.render();
        if(v) this.setState({page:this.pages+1-v});
        this.props.parent.pager(this.pages+1-v)
    }
    ListTpl =  data =>{
        if(data.ago && data.price){
            data.price = "<div class='del'>"+data.ago+"</div><span>"+ data.price +"</span>"
        }
        return  <Container layout="hbox" shadow width="100%" padding="0" margin="2">
            <Image src={data.src} height="150" width="150" mode="img" />
            <Container layout="vbox" margin="0 5" flex="1">
                <Title text={data.title} sub={data.text} />

            </Container>
          <Container docked={Ext.platformTags.phone?"bottom":"right"} cls='rtl' padding="20 0 0 0" minWidth="250">
          <ul style={{ fontSize: "14px" ,paddingInlineStart:"10px"}} >
                    {data.director && <li > {"کارگردان : " + data.director}</li>}
                    {data.producer && <li > {"تهیه کننده : " + data.producer}</li>}
                    {data.year && <li > {"سال تولید : " + data.year}</li>}
                </ul>
          <SegmentedButton cls="ltr" width="100%"  docked="bottom">
          <Button cls="x-zeropading" iconCls="x-fa fa-comment" iconAlign="top" ui="confirm " text={data.comments||"0"} flex={1}  handler={()=>{}} padding="0"/>
                <Button cls="x-zeropading" iconCls="x-fa fa-heart x-zeropading" iconAlign="top" ui="decline " text={(data.like-data.dislike)||"0"} flex={1}  handler={()=>{}} padding="0"/>

                    <Button iconCls="x-fa fa-shopping-cart" ui="action " flex={1} pressed handler={()=>this.addCart(data.id,data.title,data.price)} />
                    <Button text={data.price + " تومان"} cls="rtl" ui="action " flex={3} handler={()=>this.shoping(data.price,data.id)}/>
                </SegmentedButton>
                
                </Container>
        </Container>
      }
      BoxTpl =  data =>{
        if(data.ago)  data._price = "<div class='del'>"+data.ago+"</div><span>"+ data.price +"</span>"
        
        return  <Container key={data.id} layout="vbox" shadow  width="240" style={{display:"inline-block",textAlign: "right"}} margin="4"          listeners ={ {
            element  : 'bodyElement',
            click    : ()=>this.props.parent.navigate("/"+(data.type==1?"Movie":"Collection")+"?Movie="+data.id)
        }}>
          <Image src={data.src} height="180" width="100%" mode="img" />
          <Title text={data.title} sub={""}/>
          <ul style={{ fontSize: "12px",paddingInlineStart: "20px" ,padding:"10px",margin:"0px"}}>
                    {data.director && <li > {"کارگردان : " + data.director}</li>}
                    {data.producer && <li > {"تهیه کننده : " + data.producer}</li>}
                    {data.year && <li > {"سال تولید : " + data.year}</li>}
                </ul>
          <Container docked={"bottom"} cls='ltr'>

          <SegmentedButton cls="ltr" width="100%" >
          <Button cls="x-zeropading" iconCls="x-fa fa-comment" iconAlign="top" ui="confirm " text={data.comments||"0"} flex={1}  handler={()=>{}} padding="0"/>
                <Button cls="x-zeropading" iconCls="x-fa fa-heart x-zeropading" iconAlign="top" ui="decline " text={(data.like-data.dislike)||"0"} flex={1}  handler={()=>{}} padding="0"/>

                    <Button iconCls="x-fa fa-shopping-cart" ui="action " flex={1} pressed />
                    <Button text={data._price||data.parice+ " تومان"} cls="rtl" ui="action " flex={3} />
                </SegmentedButton>
                
                </Container>
        </Container>
      }
      componentDidUpdate(){
      //  this.refs._SliderField.setValue(this.pages+1-this.state.page)
      }
    render = () => {
        if(this.state.page==1) this.count = this.state.data.count;
        this.pages =  Math.floor((this.count||0)/this.props.pagenum)+1;
       
        
    return <Container>

        <Container layout="hbox" cls="rtl" width="100%">
            {/* <SelectField {...this.TextFieldProps}  flex={1} label="ترتیب " value="0" options={[{ text: 'محبوب ترین', value: 0 }, { text: 'ارزان ترین', value: 1 }]} /> */}
            <SegmentedButton label="شیوه تمایش " cls="ltr" width={150} height="40" margin={4}>
                <Button iconCls="x-fa fa-list" ui="action " pressed={this.state.Listmode} handler={() => this.setState({ Listmode: true })} />
                <Button iconCls="x-fa fa-th" ui="action " pressed={!this.state.Listmode} handler={() => this.setState({ Listmode: false })} />
            </SegmentedButton>
            <Container layout="hbox" height={40} shadow flex={1} margin="4 2" cls="rtl pagescollerlable">
          {/* <Container margin="0 10" width="120"> {(this.count||0) + "  مورد "}</Container>   */}
          <SearchField  placeholder="" 
          flex={5}
          height={35}
                    margin="0 5"
                    padding = "0 0"
                    />
                {/* <SliderField ref="_SliderField"
                    label ={"  صفحه  " + this.state.page}
                    labelAlign="left"
                    labelTextAlign = "center"
                    labelCls = "pagescollerlable"
                    labelWidth={120}
                    flex={5}
                    minValue={1}
                    cls="rtl"
                    height={35}
                    margin="0 5"
                    padding = "0 0"
                    maxValue={this.pages}
                    value={this.pages}
                 //   onChange={this.onpage.bind(this)}
                    disabled = {this.pages==1}
                /> 
               <Container width="80" layout="center">{this.pages}</Container>*/} 
            </Container>
            {this.props.searchkey && <Button iconCls="x-fa fa-search" ui="action" text="جستجو" width='100' height='40' margin={4} handler = {()=>this.props.parent.navigate("/search")}/>}
        </Container>
        {this.state.loading? <Container cls="rtl" layout="center" > 
        <Title  text="درحال جستجوی اطلاعات" />
        <Image src={loading} mode="img" height={200}></Image>
         </Container>
        :this.state.data  && (this.state.Listmode ?
            <List itemTpl={this.ListTpl} store={this.state.store} width="100%" cls="rtl searchpage" 
            onItemTap={(a,b,c,r)=>{
                this.props.parent.navigate("/"+(r.data.type==1?"Movie":"Collection")+"?Movie="+r.data.id)}}/>
        :<Container cls="rtl" style={{textAlign: "center"}}>{this.state.data.map(e=>this.BoxTpl(e)) }</Container>)}
        {/* <Vitrin ref="itemVitrin" data={this.state.data} shadow round /> */}
    </Container>
    }
    TextFieldProps = {
        height: '40',
        shadow: true,
        cls: 'rtl x-round searchpage x-round',
        margin: '5',
        textAlign: 'center',
        labelAlign: "left",
        labelTextAlign: "center"
    };
}