import React, { Component } from 'react';
import { Container, Button } from '@sencha/ext-modern';
import download from 'downloadjs';
import Storer from "../Store/Storer";
export default class ContentInfo extends Component {
    state = { userlike: 0,userdislike:0 }
    componentWillMount() {
        if(this.props.disabled) return true;
        let {sid,_user} = window.userData;
        console.log(this.props.id,this.props.id)
        if(!_user) Storer({movies_likes: {0:{sid,_movies:this.props.id||this.props.$id}}}, this);
        else Storer({movies_likes: {0:{_movies:this.props.id||this.props.$id}}}, this);
      }
    like = () => {
        if(this.props.disabled) return true;
        let {sid,_user} = window.userData
        this.setState({
            userlike: !this.state.userlike,
            userdislike: false
        })
        Storer("movies", this, { 0: { id: this.props.id||this.props.$id }, dislike: this.props.dislike-this.defdislike + this.state.userdislike * 1,like: this.props.like - this.deflike+ this.state.userlike * 1 }, "update");
        if( this.state.movies_likes.length==0){
            this.state.movies_likes=[{userlike:!this.state.userlike}]
            let {sid,_user} = window.userData
            if(!_user) Storer("_movies_likes", this, { from:"movies_likes",sid,_movies:this.props.id||this.props.$id,userlike:this.state.userlike?1:0  }, "insert");
            else Storer("_movies_likes", this, { from:"movies_likes",_movies:this.props.id||this.props.$id,userlike:this.state.userlike?1:0   }, "insert");
        }else{
            if(!_user) Storer("_movies_likes", this, { from:"movies_likes", 0: {sid,_movies:this.props.id||this.props.$id},userlike:this.state.userlike?1:0  }, "update");
            else Storer("_movies_likes", this, { from:"movies_likes",0:{_movies:this.props.id||this.props.$id},userlike:this.state.userlike?1:0 }, "update");
        }
    }
    dislike = () => {
        if(this.props.disabled) return true;
        let {sid,_user} = window.userData
        this.setState({
            userlike: false,
            userdislike: !this.state.userdislike
        })
        Storer("movies", this, { 0: { id: this.props.id||this.props.$id }, dislike: this.props.dislike-this.defdislike + this.state.userdislike * 1,like: this.props.like - this.deflike + this.state.userlike * 1 }, "update");
        if( this.state.movies_likes.length==0){
            this.state.movies_likes=[{userlike:-1*(!this.state.userdislike)}]
            let {sid,_user} = window.userData
            if(!_user) Storer("_movies_likes", this, { from:"movies_likes",sid,_movies:this.props.id||this.props.$id,userlike:!this.state.userlike ,userlike:this.state.userdislike?-1:0 }, "insert");
            else Storer("_movies_likes", this, { from:"movies_likes",_movies:this.props.id||this.props.$id,userlike:!this.state.userlike,userlike:this.state.userdislike?-1:0  }, "insert");
        }else{
            if(!_user) Storer("_movies_likes", this, { from:"movies_likes", 0: {sid,_movies:this.props.id||this.props.$id},userlike:this.state.userdislike?-1:0 }, "update");
            else Storer("_movies_likes", this, { from:"movies_likes",0:{_movies:this.props.id||this.props.$id},userlike:this.state.userdislike?-1:0 }, "update");
        }
    }
    formatter(datatime){
        datatime = datatime ||"2010-06-09 13:12:01";
        let t = datatime.split(/[- :]/);
        let d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
        console.log(d)
        return datatime //d.toISOString().slice(0,10);
    }
    downloader = () => {
      //  download(this.props.FileSrc);
    }
    deflike = 0;
    defdislike=0;
    render = () => {
       // console.log(this.props)
        let {year,like,dislike,view,date,download,share} = this.props
        if(this.state.movies_likes && !this.state.movies_likes.loading)  if( this.state.movies_likes.length>0){
            this.state.movies_likes.loading = true
            let {userlike} = this.state.movies_likes[0]
            
            this.state.userlike = Math.max(0,userlike);
            this.state.userdislike = Math.max(0,userlike*-1);
            this.defdislike = this.state.userdislike;
            this.deflike =  this.state.userlike;
        }

    return <Container layout={{ type: 'hbox', pack: 'start' }} width="100%" cls="titleElements" margin="5 0" style={this.props.style} >
        {year && <Button iconCls="x-fa fa-calendar contentInfoicon" text={year+" "}  margin="0" padding="0" style={this.props.style}/>}
        <Button iconCls="x-fa fa-eye contentInfoicon" text={view||"0"}  margin="0" padding="0" style={this.props.style} />
        <Button iconCls={this.state.userlike ? 'x-fa fa-thumbs-up contentInfoicon' : 'x-fa fa-thumbs-o-up contentInfoicon '} text={(like-this.deflike+this.state.userlike)||"0"} handler={this.like.bind(this)}  margin="0" padding="0" style={this.props.style}/>
        <Button iconCls={this.state.userdislike ? 'x-fa fa-thumbs-down contentInfoicon' : 'x-fa fa-thumbs-o-down contentInfoicon'} text={(dislike-this.defdislike+this.state.userdislike)||"0"} handler={this.dislike.bind(this)}  margin="0" padding="0" style={this.props.style}/>
        <Button iconCls="x-fa fa-download contentInfoicon" text={download||"0"} handler={this.downloader.bind(this)}  margin="0" padding="0" style={this.props.style}/>
        {share && <Button iconCls="x-fa fa-share-alt contentInfoicon"  handler={this.downloader.bind(this)}  margin="0" padding="0" style={this.props.style}/>}
    </Container>
    }
}