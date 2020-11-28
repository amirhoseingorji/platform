import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { launch } from '@sencha/ext-react'
import App from './App'
import Config from './Config';
import io from "socket.io-client";
import './themer.js'
import '../.ext-reactrc'
import { ExtReact } from '@sencha/ext-react'

window.socket = io(Config._socketUrl,{
  
    // WARNING: in that case, there is no fallback to long-polling
    transports: [ 'websocket' ] // or [ 'websocket', 'polling' ], which is the same thing
  
});
let viewport;

Ext.require(['Ext.layout.*'])

const render = (Component, target,data) => {
  ReactDOM.render(
    <ExtReact>
      <AppContainer>
        <Component userData={data}/>
      </AppContainer>
    </ExtReact>,
    target
  )
}
window.socket.on("connection",data=>{
launch(target => render(App, viewport = target,data));
if (module.hot) {
  module.hot.accept('./App', () => render(App, viewport));
}
window.socket.off("connection")
})
//go({element:App, callback: render});
