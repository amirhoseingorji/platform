import React,{Component} from 'react';
import { Container ,Button,Image ,ToolTip} from '@sencha/ext-modern';
import moment from 'moment-jalaali'
moment.loadPersian({usePersianDigits: false})
export default class Box extends Component {
    componentWillMount (){
        this.setState({...this.props,helpdialog:false})
        this.parent = this.props.parent
        this.chekpay.bind(this)
    }
    register(){
        let {_exam_item} = this.state;
        window.socket.emit("register", _exam_item)
        window.socket.on("register",v=>{
          window.socket.off("register");
            if(v) {
                this.parent.componentWillMount()    
            }else{
                 Ext.toast("روند ثبت نام شما با خطا مواجه شده است با پشتیبانی تماس بگیرید")
            }
      })
      }
    chekpay=()=>{ 
        let {price,_exam_item} = this.state;
        console.log(price)
        if(price>0)  {
          window.socket.emit("getprepay",_exam_item)
          window.socket.on("getprepay",ppst=>{
            if(ppst=="pay"){
              let price  = this.state.price>0 ? `با  پرداخت هزینه ` + this.state.price +" تومان" :""
              let msg = `آیا در این آزمون ${price} ثبت نام می کنید؟`
              Ext.Msg.confirm("توجه!",msg,(st)=>{if(st=="yes") {
                Ext.toast("درحال انتقال به درگاه بانکی لطفا صبر کنید ...",100000)
                window.socket.emit("paylink", this.state.price, window.location.hostname, window.userData._user+":"+this.state._exam_item);
              }})
            }else{
              let msg = `هزینه آزمون شما قبلا پرداخت شده و می توانید در آین آزمون به طور رایگان ثبت نام کنید`
              Ext.Msg.confirm("توجه!",msg,(st)=>{if(st=="yes") {
                this.register()
              }})
            }
          })
        }else{
          this.register()
        }
        }
    render(){
        let btntxts = [
            "ثبت نام"
            ,""
            ,"شروع آزمون"
            ,"ادامه آزمون"
            ,"کارنامه موقت"
            ,"کارنامه نهایی"
        ]
        let bars=["#84f40f","#55e4ee","#ff036e","#ff036e","#ffff00","#00aeef"]
        let btnc1 = ["#26c82d","#55e4ee","#e10019","#e10019","#ffde00","#0d47a1"]
        let btnc2 = ["#85f40f","#0084ff","#ff036e","#ff036e","#ffff00","#00ccff"]
        let guides=[
            "برای شرکت در این آزمون روی کلید ثبت نام کلیک کنید",
            "شما در این آزمون ثبت نام شده اید. تا زمان شروع بازه برگزاری آزمون باید صبر کنید",
            " اکنون می توانید شروع کنید. توجه! ضرورتی به شروع آزمون در زمان های ابتدایی نیست و تا انتهای مدت آزمون قادر به شروع هستید",
            "شما آزمون را قبلا شروع کرده اید اگر گزینه ای ثبت کردید ذخیره شده و می توانید تا انتهای زمان پاسخگویی ادامه دهید",
            "اطلاعات شما ثبت شده واکنون قادر به دریافت نتایج موقت خود هستید - کارنامه نهایی دو ساعت پس از برگزاری آزمون قابل دریافت است",
            "کارنامه نهایی شما خود را می توانید دریافت کنید"
        ]
        let {title,description,duration,neg_mod,start_time,end_time,price,program,fullanswer,status,pay,_exam_item} = this.state;
        let btntxt = btntxts[status]
        let btnicon = ""
        if(status==1) {
            if(moment(start_time)._d.toString().slice(0,15)==new Date().toString().slice(0,15)){
                btntxt = moment(start_time).format("HH:mm")
                btnicon = "x-fal fa-clock white";
            }else{
                btntxt = moment(start_time).format("jM/jD")
                btnicon = "x-fal fa-calendar-day white";
            }
        } 
        return <Container  style={{...this.props.style,background:"linear-gradient(-90deg, "+bars[status]+" 12px, #FFFFFF 0%)"}} cls={this.props.cls} hidden={this.props.hidden} className="rtl Box" shadow    >
                     <h3 style={{margin:"0"}} className="darkblue" >{title}</h3>
                     <div className="darkblue boxguide">{guides[status]}</div>
                     <Container layout={Ext.platformTags.phone?"vbox":"hbox"} width="100%">
                        <Container width="300" style={{fontSize:"12px",padding:"5px 0",padding:"5px 0"}}>
                            <Container className="greenblue boxitems" > 
                               
                                <div> <i className="fal fa-calendar-day"></i>تاریخ  {moment(start_time).format("jYY/jM/jD")}</div> 
                            </Container>
                            <Container className="purpule boxitems" >
                           
                            <div> <i className="fal fa-hourglass-end"></i>زمان پاسخگویی {duration}</div> 
                            </Container>
                            <Container className="blue2 boxitems" >
                                
                                <div><i className="fal fa-clock"></i>شروع از {moment(start_time).format("HH:mm")} تا {moment(end_time).format("HH:mm")}</div> 
                            </Container>
                            
                            <Container className="green2 boxitems" >
                           
                            <div> <i className="fal fa-file-minus"></i>نمره منفی : {neg_mod?"دارد":"ندارد"}</div> 
                            </Container>
                        </Container>
                        <Container flex={1} style={{fontSize:"12px",padding:Ext.platformTags.phone?"0":"5px 0"}} layout={Ext.platformTags.phone?"hbox":"vbox"}>
                            <Container docked="left" cls='verticalgray' width="3" height="100%" style={{backgroundColor:"#cccccc"}} hidden={Ext.platformTags.phone}></Container>
                            <Button cls={"green3 boxitems " +(Ext.platformTags.phone?"borderbox":"")} text={fullanswer && status==5 ?"پاسخنامه":"بودجه بندی درس ها"}  textAlign={Ext.platformTags.phone?"center":"right"} width={Ext.platformTags.phone?"":'120'} flex="1" margin="0 10" ui="round" handler={()=>this.parent.setState({helpdialog:true,content:(fullanswer && status==5 ? fullanswer : program) ,dtitle:(fullanswer && status==5 ? "پاسخنامه" : "بودجه بندی")})}/> 
                            <Button cls={"purpule2 boxitems " +(Ext.platformTags.phone?"borderbox":"")} text="راهنمای آزمون"  textAlign={Ext.platformTags.phone?"center":"right"}  width={Ext.platformTags.phone?"":'120'} flex="1" margin="0 10" ui="round" handler={()=>this.parent.setState({helpdialog:true,content:description.split("\n").join("<br/>"),dtitle:"راهنمای آزمون"})}/>  
                        </Container>
                        <Container layout={Ext.platformTags.phone?"hbox":"vbox"} width={Ext.platformTags.phone?"":"120"} margin={Ext.platformTags.phone?"10 0":""}>
                            <Button text={btntxt} ui="round" iconCls={btnicon} iconAlign="left" handler={()=>{
                                if(status==0) {
                                   this.chekpay()
                                }
                                if(status==1) {
                                    Ext.toast('لطفا تا شروع آزمون صبر کنید')
                                }
                                if(status==2) {
                                    this.parent.navigate("/Exam?id="+_exam_item)
                                }
                                if(status==3) {
                                    this.parent.navigate("/Exam?id="+_exam_item)
                                }
                                if(status>3){
                                    window.socket.emit("personal", _exam_item)
                                    window.socket.on("personal", (res) => {
                                    window.socket.off("personal")
                                    this.parent.setState({ helpdialog: true, content :res})
                                    })
                                }
                            }} cls="ltr statusbtn" style={{background:"linear-gradient(90deg, "+btnc1[status]+" 0%, "+btnc2[status]+" 100%)" ,color:status==4?"#000000":"#ffffff"}} docked={Ext.platformTags.phone?"right":""} />
                            <Container docked={Ext.platformTags.phone?"left":""}>
                             <ul className="payinfo">
                                <li>هزینه: {price ?
                                 price + " تومان" :
                                  "رایگان "}</li>
                                {price ? <li> {pay?<span className="green">
                                    {pay==2?"پیش ":""}
                                     پرداخت شده</span>:<span className="red">پرداخت نشده</span>}</li> : null}
                            </ul>
                            </Container>

                        </Container>
                      
                     </Container>
               </Container>
        
    }
}