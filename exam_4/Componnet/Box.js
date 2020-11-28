import React,{Component} from 'react';
import { Container ,Button,Image ,ToolTip} from '@sencha/ext-modern';
import moment from 'moment-jalaali'
moment.loadPersian({usePersianDigits: false})
export default class Box extends Component {
    componentWillMount (){
        this.setState({...this.props,helpdialog:false})
        this.parent = this.props.parent
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
        let {title,description,duration,neg_mod,start_time,end_time,price,program,fullanswer,status,pay,_exam_item} = this.state;
        return <Container  style={{...this.props.style,background:"linear-gradient(-90deg, "+bars[status]+" 12px, #FFFFFF 0%)"}} cls={this.props.cls} hidden={this.props.hidden} className="rtl Box" shadow    >
                     <h3 style={{margin:"0"}} className="darkblue" >{title}</h3>
                     <div className="darkblue boxguide">{guides[status]}</div>
                     <Container layout={Ext.platformTags.phone?"vbox":"hbox"} width="100%">
                        <Container width="300" style={{fontSize:"12px",padding:"5px 0",padding:"5px 0"}}>
                            <Container className="greenblue boxitems" > 
                               
                                <div> <i className="fal fa-calendar-day"></i>تاریخ  {moment(start_time).format("jYYYY/jM/jD")}</div> 
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
                            <Button cls={"green3 boxitems " +(Ext.platformTags.phone?"borderbox":"")} text={fullanswer && status==5 ?"پاسخ تشریحی":"بودجه بندی درس ها"}  textAlign={Ext.platformTags.phone?"center":"right"} width={Ext.platformTags.phone?"":'120'} flex="1" margin="0 10" ui="round" handler={()=>this.parent.setState({helpdialog:true,content:fullanswer && status==5 ? fullanswer : program })}/> 
                            <Button cls={"purpule2 boxitems " +(Ext.platformTags.phone?"borderbox":"")} text="راهنمای آزمون"  textAlign={Ext.platformTags.phone?"center":"right"}  width={Ext.platformTags.phone?"":'120'} flex="1" margin="0 10" ui="round" handler={()=>this.parent.setState({helpdialog:true,content:description})}/>  
                        </Container>
                        <Container layout={Ext.platformTags.phone?"hbox":"vbox"} width={Ext.platformTags.phone?"":"120"} margin={Ext.platformTags.phone?"10 0":""}>
                            <Button text={btntxt[status]} ui="round" handler={()=>{
                                if(status==0) {
                                    Ext.toast('ثبت نام')
                                }
                                if(status==1) {
                                    Ext.toast('لطفا تا شروع آزمون صبر کنید')
                                }
                                if(status==2) {
                                    Ext.toast('شروع آزمون')
                                }
                                if(status==3) {
                                    Ext.toast('ادامه آزمون')
                                }
                                if(status>3){
                                    window.socket.emit("personal", _exam_item)
                                    window.socket.on("personal", (res) => {
                                    window.socket.off("personal")
                                    this.parent.setState({ helpdialog: true, content :res})
                                    })
                                }
                            }} cls="statusbtn" style={{background:"linear-gradient(90deg, "+btnc1[status]+" 0%, "+btnc2[status]+" 100%)" ,color:status==4?"#000000":"#ffffff"}} docked={Ext.platformTags.phone?"right":""} />
                            <Container docked={Ext.platformTags.phone?"left":""}>
                             <ul className="payinfo">
                                <li>هزینه: {price ?
                                 price + " تومان" :
                                  "رایگان "}</li>
                                {price ? <li> {pay?<span className="green">پرداخت شده</span>:<span className="red">پرداخت نشده</span>}</li> : null}
                            </ul>
                            </Container>

                        </Container>
                      
                     </Container>
               </Container>
        
    }
}