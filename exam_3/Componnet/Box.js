import React,{Component} from 'react';
import { Container ,Button,Image ,ToolTip,Dialog} from '@sencha/ext-modern';
import moment from 'moment-jalaali'
moment.loadPersian({usePersianDigits: false})
export default class Box extends Component {
    componentWillMount (){
        this.setState({...this.props,helpdialog:false})
    }
    render(){
        let btntxt = [
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
            "تا زمان شروع بازه برگزاری آزمون باید صبر کنید",
            " اکنون می توانید شروع کنید. توجه! ضرورتی به شروع آزمون در زمان های ابتدایی نیست و تا انتهای مدت آزمون قادر به شروع هستید",
            "شما آزمون را قبلا شروع کرده اید اگر گزینه ای ثبت کردید ذخیره شده و می توانید تا انتهای زمان پاسخگویی ادامه دهید",
            "اطلاعات شما ثبت شده واکنون قادر به دریافت نتایج موقت خود هستید - کارنامه نهایی دو ساعت پس از برگزاری آزمون قابل دریافت است",
            "کارنامه نهایی شما خود را می توانید دریافت کنید"
        ]
        let {title,status,pay,description,duration,neg_mod,start_time,end_time,boodje,questions,price} = this.state;
        return <Container  style={{...this.props.style,background:"linear-gradient(-90deg, "+bars[status]+" 12px, #FFFFFF 0%)"}} cls={this.props.cls} className="rtl Box" shadow    >
                     <h3 style={{margin:"0"}} className="darkblue" >{title}</h3>
                     <div className="darkblue boxguide">{guides[status]}</div>
                     <Container layout={Ext.platformTags.phone?"vbox":"hbox"} width="100%">
                        <Container width="300" style={{fontSize:"12px",padding:"5px 0",padding:"5px 0"}}>
                            <Container className="greenblue boxitems" > 
                               
                                <div> <i class="fal fa-calendar-day"></i>تاریخ  {moment(start_time).format("jYYYY/jM/jD")}</div> 
                            </Container>
                            <Container className="purpule boxitems" >
                           
                            <div> <i class="fal fa-hourglass-end"></i>زمان پاسخگویی {duration}</div> 
                            </Container>
                            <Container className="blue2 boxitems" >
                                
                                <div><i class="fal fa-clock"></i>شروع از {moment(start_time).format("HH:mm")} تا {moment(end_time).format("HH:mm")}</div> 
                            </Container>
                            
                            <Container className="green2 boxitems" >
                           
                            <div> <i class="fal fa-file-minus"></i>نمره منفی : {neg_mod?"دارد":"ندارد"}</div> 
                            </Container>
                        </Container>
                        <Container flex={1} style={{fontSize:"12px",padding:Ext.platformTags.phone?"0":"5px 0"}} layout={Ext.platformTags.phone?"hbox":"vbox"}>
                            <Container docked="left" cls='verticalgray' width="3" height="100%" style={{backgroundColor:"#cccccc"}} hidden={Ext.platformTags.phone}></Container>
                            <Button cls={"green3 boxitems " +(Ext.platformTags.phone?"borderbox":"")} text="بودجه بندی درس ها"  textAlign={Ext.platformTags.phone?"center":"right"} width={Ext.platformTags.phone?"":'120'} flex="1" margin="0 10" ui="round"/> 
                            <Button cls={"purpule2 boxitems " +(Ext.platformTags.phone?"borderbox":"")} text="راهنمای آزمون"  textAlign={Ext.platformTags.phone?"center":"right"}  width={Ext.platformTags.phone?"":'120'} flex="1" margin="0 10" ui="round" handler={()=>this.setState({helpdialog:true})}/>  
                        </Container>
                        <Container layout={Ext.platformTags.phone?"hbox":"vbox"} width={Ext.platformTags.phone?"":"120"} margin={Ext.platformTags.phone?"10 0":""}>
                            <Button text={btntxt[status]} ui="round" handler={()=>{}} cls="statusbtn" style={{background:"linear-gradient(90deg, "+btnc1[status]+" 0%, "+btnc2[status]+" 100%)"}} docked={Ext.platformTags.phone?"right":""}/>
                            <Container docked={Ext.platformTags.phone?"left":""}>
                             <ul className="payinfo">
                                <li>هزینه: {price}تومان</li>
                                <li> {pay?<span className="green">پرداخت شده</span>:<span className="red">پرداخت نشده</span>}</li>
                            </ul>
                            </Container>

                        </Container>
                      
                     </Container><Dialog title="راهنمای آزمون" style={{margin:"auto",left:"15px"}} closable displayed={this.state.helpdialog} modal bodyPadding="5"  width="100%" maxWidth="800px" height="100%" maxHeight="500px" closeAction="hide" onHide={() => this.setState({ helpdialog: false })}>
                   {description}
                </Dialog>
               </Container>
        
    }
}