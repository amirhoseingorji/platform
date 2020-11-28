import React, { Component } from 'react';
import { Container, Image, Video, Button, Carousel, Audio} from '@sencha/ext-modern';
import download from 'downloadjs';
export default class Content extends Component {
    downloader=()=>download (this.props.FileSrc);
    componentDidMount () {
        clearInterval(window.playing);
        if (this.refs.album) window.playing = setInterval(() => {
          if (this.refs.album.getActiveIndex() == this.props.ImageSrc.length - 1)
            this.refs.album.setActiveItem(0); else this.refs.album.next();
        }, 5000);
    }
    componentWillUnmount(){
        clearInterval(window.playing);  
    }
    render() {
        let {  ImageSrc, MovieSrc, AudioSrc, html, FileSrc } = this.props;
        return <Container  width="100%" {...this.props} html="">
            {MovieSrc && <Video height="300" width="100%" loop url={[MovieSrc]} posterUrl={ImageSrc} />}
            {ImageSrc && (typeof ImageSrc != 'string'
                ? <Carousel height="300" width="100%" shadow ref="album">
                    {ImageSrc.map ((e, i) => (
                    <Image height="300" src={e} mode="img" key={i} />
                    ))}
                </Carousel>
            : <Image height="300" src={ImageSrc} mode="img" shadow />)}
            {AudioSrc && <Container margin="10 0 0 0" layout="fit">
                <Audio ref="audio" loop url={AudioSrc} enableControls />
            </Container>}
            {html && <Container>{html}</Container>}
            {FileSrc && <Container layout="center" padding={3}>
                <Button shadow width="200" text="دانلود" conCls="x-fa a-download" cls="rtl" ui="action round" handler={this.downloader.bind(this)} />
            </Container>}
        </Container>
    }
}