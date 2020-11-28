import React, { Component } from 'react';
import { Container,Button,Image} from '@sencha/ext-modern';
import  {Carousel} from 'react-responsive-carousel';
import { Items,Title } from '../../Componnet/*';
import PerfectScrollbar from 'perfect-scrollbar';
import Storer from "../../Store/Storer";
// import Arman from '../../Statics/Images/Arman.png';
export default class News extends Component {
  query(url) {
    let query = {};
    let searchVal =url ? "?"+url.split("?")[1]:  decodeURIComponent(this.props.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); query[e[0]] = e[1]; });
    return query;
}
    componentWillMount() {
      let { _user  } = window.userData;
        let movieorder = this.query().order||"all";
        if(movieorder=="all") movieorder="id";
        if(movieorder=="like") movieorder="`like`-dislike";
        if(movieorder=="last") movieorder="date";
        if(movieorder=="pay") movieorder="download";
        this.movieorder = movieorder;
        //let cols = "id,title,text,src,price,ago,`like`,dislike,download,view,date,director,producer,year,type";
    //    / let cols=`id,title , text,${Ext.platformTags.phone?"phlogo":"pclogo"} as src, if((select id from user_movies where movies.id = user_movies._movies and _user>0 and _user=${_user}) ,0,price) as price,ago,${"`like`"},dislike,director,producer,year,type`;
        let cols="id,title,text,photo src,0 price,0 ago,`like`,dislike";
        Storer({
         //   about: { from: "user_info", cols: "text,tel,fax" },
       //     aboutadress: { from: "user_addres", cols: "text,position" },
            carousel:{0:{pid:1}},
          //  carousel_area: [{ pid: "1" }],
           // lastmovies:{from:"movies",cols,num:100,order:"ord",asc:true,0:{type:1}},
           lastmovies:{from: "contents",cols,store:true,num:10,order:"date",0:{_contents_type:"1",pid:0}},
          //  lastmovies: { from: "movies",store:true,refresh:true, cols, num: movieorder ? 10: 100, order: movieorder,order:"ord",asc:true , 0: { type: 1,status:1 ,global:0} },
        }, this);     
    }
    componentDidUpdate() {
   //   if(!Ext.platformTags.phone)     //new PerfectScrollbar(this.refs.homePage.el.dom.firstChild);
        // //new PerfectScrollbar(this.refs.homePage.el.dom.firstChild.lastChild);
    }
    onTabChange(a,b){
      //let cols = "id,title,text,src,price,ago,`like`,dislike,download,view,date,director,producer,year,type";
      let cols="id,title,text,photo src,0 price,0 ago,`like`,dislike";
      Storer({
        lastmovies:{from: "contents",store:true,cols,num:10,order:"date",0:{_contents_type:"1",pid:0}},
          //lastmovies: { from: "movies",store:true,refresh:true, cols, num: b._itemId=="id"?100:10, order: b._itemId, 0: { type: 1,status:1,global:0 } },
      }, this); 
      let order = ""
      if(b._itemId=="`like`-dislike") order="like";
      if(b._itemId=="date") order="last";
      if(b._itemId=="download") order="pay";
      let path= window.location.pathname
      this.navigate(order? path+"?order="+order:path);
    }
    navigate(path) {
        this.props.history.push(path);
      }
    render (){
        let {carousel} = this.state
      //  let { about, aboutadress } = this.state
      //  about = about[0] || {}
       // aboutadress = aboutadress[0] || {position:"35.75475,51.300"}
        return <Container layout={{ type: 'vbox' }} padding="0px 0px" scrollable ref='homePage'  >
              <Title margin={20} icon="newspaper-o" text="اخبار" style={{fontSize:Ext.platformTags.phone?"14px":"18px"}} />
        {/* <ReactTooltip /> */}
        <Container layout="center" >
      <Container  padding={Ext.platformTags.phone?"5px":"10px"} style={{maxWidth:"960px"}}  >
      {/* <Title icon="globe" text="بلاگ" style={{fontSize:"15px"}} /> */}
      <Carousel showThumbs={false} emulateTouch showArrows infiniteLoop autoPlay showStatus={false}  >
      {carousel.map((e, i) =>  <div style={{height:"360px",maxWidth:"960px"}} key={i}>
          <img src={e.src} style={{height:"360px",maxWidth:"960px"}}/>
          <Container cls="rtl legend" width="40%" padding="10" >
           <Button  ui="action " text={e.title}   height={45} padding="10" margin="10"  />
              <div style={{padding:"15px",fontSize:"15px"}}>{e.text}</div>
            <Button cls="rtl" iconCls="x-fa fa-file" ui="confirm " text="توضیحات بیشتر"   width="150" height={35} docked="bottom" margin="20 10" style={{border:"1px solid #999999"}}/>
          </Container>
      
      </div>)}
      </Carousel>
      </Container></Container>


        
      {/* <TabBar width="100%" shadow onActiveTabChange={this.onTabChange.bind(this)} activeTab={ this.movieorder} cls="rtl">
                    <Tab itemId="id" title="همه فیلم ها" iconCls="x-fa fa-list" iconAlign="left" />
                    <Tab itemId="date" title="جدید ترین ها" iconCls="x-fa fa-star" iconAlign="left"/>
                    <Tab itemId="`like`-dislike" title="محبوب ترین ها" iconCls="x-fa fa-heart"  iconAlign="left" />
                    <Tab itemId="download" title="پرفروش ترین ها" iconCls="x-fa fa-shopping-cart" iconAlign="left" />
        </TabBar> */}
       { /*searchkey*/}
        <Items ref={"lastmovies"} parent={this} pagenum={15} continue="Contents" />
     
        </Container>
    }
};
