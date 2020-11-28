import React, { PureComponent } from 'react';
import Title from "./Title";
import { Container, Button } from '@sencha/ext-modern';
export default class Comments extends PureComponent {
  state = {...this.props}
  render = () => <div>
    {this.state.data && this.state.data.map((data, i) => <Container key={i} shadow margin="5" cls="rtl x-round">
        <Container layout="hbox" cls="rtl" margin="15" style={{ position: "absolute", left: 0 }}>
          <span className="x-fa fa-calendar" style={{ margin: "5px" }} />
          {data.date}
        </Container>
        <Title icon="user" text={data.name} sub={data.text} />
        <Container cls="ltr" layout="hbox">
          <Button iconCls="x-fa fa-thumbs-up" text={data.like} />
          <Button iconCls="x-fa fa-thumbs-down" text={data.dislike} />
        </Container>
      </Container>
    )}
  </div>
}