import React, { Component } from 'react';
import Table from '../../Componnet/Table';

import * as THREE from 'three';
const OrbitControls = require('three-orbitcontrols')
var TransformControls = require('three-transform-controls')(THREE);
let FBXLoader = require('three-fbxloader-offical')
import { Container,Button,SegmentedButton ,ToggleField,NumberField} from '@sencha/ext-modern';
import Storer from "../../Store/Storer"
import pic from '../../Statics/Images/clipart1.jpg';
import audio from '../../Statics/Images/audio.jpg';
import videopic from '../../Statics/Images/video.jpg';

export default class Items extends Component {
    trap = 50
    zfac = 30
    TranslationSnap = 2;
    RotationSnap = 15/180*Math.PI;
    ScaleSnap = 0.25
  
    state = { orbit: false ,mode :"translate",snap:false,items:[],mainrget:[]}
    camera3dpos={x:-40,y:20,z:140}
    camera2dpos={x:0,y:0,z:140}
    selected = undefined
  
  
    constructor(props) {
      super(props);
      this.onkeyboarddown = this.onkeyboarddown.bind(this)
      this.onWindowResize = this.onWindowResize.bind(this)
      this.onmousedown = this.onmousedown.bind(this)
    }
    timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    query(){
        let query={};
        let searchVal  = decodeURIComponent(window.location.search)
        searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });  
        return query;
      }
 componentWillMount(){
    let cols="id,type,path";
    Storer({
      
      items:{from:"project_target_item",0:{_project_target:this.query()._project_target*1}},
      mainrget:{from:"project_target",0:{id:this.query()._project_target*1}},
    },this);
      }
      async onWindowResize() {
    
        var width = this.mount.clientWidth
        var height = this.mount.clientHeight;
        if(!width) await this.timeout(40)
        this.camera.aspect = width / height;
        this.renderer.setSize(width, height)
        //this.resetcamera()
        
        //var height = window.innerHeight;
    
      }
      onkeyboarddown() {
        // console.log(event.keyCode )
       event.preventDefault()
        switch ( event.keyCode ) {
          case 27:
        //    console.log(this.state.selected)
            if(!this.state.selected) this.resetcamera(); else {this.resetelement(this.state.selected)}
             break;
             case 9://20:
                this.setState({ orbit: !this.state.orbit })
                 break;
          case 87: // W
          this.setState({ mode: "translate" })   
        //    this.control.setMode( "translate"+(this.state.orbit?"":"2d"));
            break;
          case 69: // E
          this.setState({ mode: "rotate" })   
          //  this.control.setMode( "rotate"+(this.state.orbit?"":"2d") );
            break;
          case 82: // R
          this.setState({ mode: "scale" })   
           // this.control.setMode( "scale"+(this.state.orbit?"":"2d") );
            break;      
          case 187:
          case 107: // +, =, num+5
            this.control.setSize( this.control.size + 0.1 );5
            break;
          case 189:
          case 109: // -, _, num-
            this.control.setSitargete( Math.max( this.control.size - 0.1, 0.1 ) );
            break;
          case 32: // Spacebartarget
             this.control.enabled = !  this.control.enabled;
            break;
    
        }
    
      }
      resetelement(mesh){
        if(! mesh.defults) return;
        let {x,y,z,rx,ry,rz,scale} = mesh.defults
        console.log({x,y,z,rx,ry,rz,scale} )
       mesh.position.set(x, y, z);
        mesh.rotation.set(rx, ry, rz);
        mesh.scale.set(scale,scale,scale)
        this.control.attach(mesh)
        this.renderScene();
      }
      reset2d(mesh){
        mesh.position.z=0
        mesh.rotation.x=0
        mesh.rotation.y=0
        this.control.attach(mesh)
        this.renderScene();
      }
      resetcamera(){
        this.camera.position.set(0,0,140)
        this.camera.rotation.set(0,0,0)
        this.camera.scale.set(1,1,1)
        this.camera.updateProjectionMatrix();
        this.renderScene()
      }
      onmousedown( event ) {
        if(this.state.selected && this.state.selected.myonchange) delete this.state.selected.myonchange
        let selected = this.intersectObjects(event, this.objects)
        //selected.material.emissive.setHex( 0xff0000 );
        if(selected) selected.myonchange = this.changeinfo.bind(this)
        if(selected) this.control.attach(selected); else this.control.detach()
        this.setState({selected})
        //this.renderScene()
      }
      intersectObjects(pointer, objects) {
    
        var rect = this.renderer.domElement.getBoundingClientRect();
        var x = (pointer.clientX - rect.left) / rect.width;
        var y = (pointer.clientY - rect.top) / rect.height;
    
        this.mouse.set((x * 2) - 1, - (y * 2) + 1);
        this.ray.setFromCamera(this.mouse, this.camera);
    
        var intersections = this.ray.intersectObjects(objects, true);
        return intersections[0] ? intersections[0].object : false;
    
      }
      componentDidMount() {

        var width = window.innerWidth - 280; // canvas width
        var height = window.innerHeight; // canvas height
    
        //ADD SCENE
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
        let {x,y,z} = this.camera2dpos;
        this.camera.position.set(x,y,z)
    
    
        //ADD reycaster
        this.ray = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)
    
        let trap = this.trap
        window.bb = new THREE.Box3(
          new THREE.Vector3( -trap, -trap, -0.005 ),
          new THREE.Vector3( trap, trap, trap )
          
        );
    
        var grid = new THREE.GridHelper(trap*2, trap*.2, "#afafaf")
        grid.rotateX(THREE.Math.degToRad(90));
        this.scene.add(grid);
    
        var grid2 = new THREE.GridHelper(trap*2, trap*.2, "#afafaf")
        grid2.scale.z=0.5
        grid2.position.y = trap
        grid2.position.z = trap/2
        var grid3 = new THREE.GridHelper(trap*2, trap*.2, "#afafaf")
        grid3.scale.z=0.5
        grid3.position.y = -trap
        grid3.position.z = trap/2
        var grid4 = new THREE.GridHelper(trap*2, trap*.2, "#afafaf")
        grid4.scale.z=0.5
        grid4.rotateZ(THREE.Math.degToRad(90));
        grid4.position.x = trap
        grid4.position.z = trap/2
        var grid5 = new THREE.GridHelper(trap*2, trap*.2, "#afafaf")
        grid5.scale.z=0.5
        grid5.rotateZ(THREE.Math.degToRad(90));
        grid5.position.x = -trap
        grid5.position.z = trap/2
        this.grids = [grid2,grid3,grid5,grid4]
    
    
        //light
        var light = new THREE.DirectionalLight(0xffffff, 2);
        light.position.set(1, 1, 1);
        this.scene.add(light);
        //target and item 
        //todo load items and target from database
    
    
        this.objects=[]
        //var target = 
       // var mesh1 = this.pic({ url: pic, w: 1024 / 3, h: 720 / 3 ,x:20})
       // var mesh2 = this.pic({ url: pic, w: 1024 / 2, h: 720 / 2 })
       // this.objects=[mesh1,mesh2];
        //control
        this.control = new TransformControls(this.camera, this.renderer.domElement, "2d");
        this.control.setMode(this.state.mode+(this.state.orbit?"":"2d"));
        this.control.addEventListener('change', this.renderScene);
        this.scene.add(this.control);
    
       // this.control.attach(mesh2);
       
        window.addEventListener('resize', this.onWindowResize,false);
        window.addEventListener('keyup', this.onkeyboarddown,false);
        this.mount.addEventListener('mousedown',this.onmousedown,false);
        this.orbital()
        this.renderScene()
      }

      async pic(param) {
        let def = { url: pic, w: 1024, h: 720, x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, scale: 1,type:"item",lock:false }
        let { url, w, h, x, y, z, rx, ry, rz, scale,type,lock ,id,auto} = { ...def, ...param }
        let texture,video,mesh
        console.log({ url, w, h, x, y, z, rx, ry, rz, scale,type,lock ,id,auto})
        if(type == 4){
          console.log(url)
          let fbxmesh = new Promise((resolve, reject) => {
          var loader = new FBXLoader();
             loader.load(url, (object)=>resolve(object))
          })
          mesh = await fbxmesh;
        }else if(type == 2){
          //this.videoel.autoplay = auto
          //this.videoel.src = url;
          //this.videoel.poster = video
          //this.videoel.load();
          var loader = new THREE.TextureLoader();
          loader.crossOrigin = '';
          texture = loader.load(videopic,  this.renderScene);
        }else{
          var loader = new THREE.TextureLoader();
          loader.crossOrigin = '';
          texture = loader.load(type ==3 ? audio: url , this.renderScene);
        }
        
        texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        let geometry = new THREE.BoxBufferGeometry(w / this.zfac, h / this.zfac, 0.01);
        let material = new THREE.MeshLambertMaterial({ map: texture, transparent: false });
        mesh = mesh ? mesh : new THREE.Mesh(geometry, material);
        mesh.d=2//dimansion
        mesh.video = video
        mesh.defults = { ...def, ...param }
        mesh.position.set(x/this.zfac, y/this.zfac, z/this.zfac);
        mesh.rotation.set(rx/180*Math.PI, ry/180*Math.PI, rz/180*Math.PI);
        mesh.scale.set(scale,scale,scale)
        mesh.lock =  lock
        this.scene.add(mesh);
        if(type !="target") {
          mesh._id = id
          this.objects.push(mesh);
        }
        return mesh
      }
      orbital() {
        if (this.state.orbit) {
          for(let grid of this.grids) this.scene.add(grid);
          let {x,y,z}  = this.camera3dpos
    
          this.camera.position.set(x,y,z);  
         // this.camera.updateProjectionMatrix();
        //this.renderScene()
          if (this.orbit== undefined) {
          this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
          this.orbit.control = this.control
          }
           this.orbit.dampingFactor = 1; // friction
          this.orbit.rotateSpeed = 0.8; // mouse sensitivity
          this.orbit.enabled= true
          this.orbit.update();
          this.orbit.addEventListener('change', this.renderScene);
         // this.control.addEventListener('dragging-changed', event .bind(this)> { console.log(1);this.orbit.enabled = !event.value; });
          this.control.setMode(this.control.getMode().split("2d").join("")  )
        } else{
    
          for(let grid of this.grids) this.scene.remove(grid);
          if (this.orbit) {
    
            for(let mesh of this.objects) this.reset2d(mesh)
            this.orbit.removeEventListener('change', this.renderScene);
            this.orbit.enabled= false
            let {x,y,z}  = this.camera.position
           // console.log( {x,y,z})
            this.camera3dpos = {x,y,z}
            this.resetcamera()
            this.control.setMode(this.control.getMode().split("2d").join("")+"2d"  )
    
          }
        }
      }
      componentWillUnmount() {
        clearInterval(this.intvideo)
        if(this.mount && this.renderer.domElement) this.mount.removeChild(this.renderer.domElement)
        window.removeEventListener('resize', this.onWindowResize,false);
        window.removeEventListener('keyup', this.onkeyboarddown,false);
        this.mount.removeEventListener('mousedown',this.onmousedown,false);
        
    
    
      }
      renderScene = () => {
     //   this.renderer.render(this.scene, this.camera)
      }
      pos(param){
        window.document.activeElement.blur();
        let {x,y,z,rx,ry,rz,scale} = param
        
        this.state.selected.geometry.computeBoundingBox();
        this.state.selected.updateMatrixWorld();
        let boundry = this.state.selected.geometry.boundingBox.clone();
        boundry.applyMatrix4(this.state.selected.matrixWorld);
    
        let xmax = (window.bb.max.x-(boundry.max.x-boundry.min.x)/2);
        let ymax = (window.bb.max.y-(boundry.max.y-boundry.min.y)/2);
        let zmax = (window.bb.max.z-(boundry.max.z-boundry.min.z)/2);
    
        if(x!=undefined) this.state.selected.position.x=Math.min(xmax,Math.max(x/this.zfac,-xmax))
        if(y!=undefined) this.state.selected.position.y=Math.min(ymax,Math.max(y/this.zfac,-ymax))
        if(z!=undefined) this.state.selected.position.z=Math.min(zmax,Math.max(z/this.zfac,-zmax))
        
    
    
        if(rx!=undefined) this.state.selected.rotation.x=rx/180*Math.PI
        if(ry!=undefined) this.state.selected.rotation.y=ry/180*Math.PI
        if(rz!=undefined) this.state.selected.rotation.z=rz/180*Math.PI
    
       
    
        if(scale!=undefined) {
          scale  = Math.min(5,Math.max(0.2,scale))
          this.state.selected.scale.set(scale,scale,scale)
        }
        this.setState({selected:this.state.selected})
      }
      changeinfo(){
        let selected = this.state.selected  || {position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0},scale:{x:1,y:1,z:1}}
        let {x,y,z} = selected.position
        let rx = selected.rotation.x
        let ry = selected.rotation.y
        let rz = selected.rotation.z
        let scale = selected.scale.x
        this.refs.x.setValue(x*this.zfac)
        this.refs.y.setValue(y*this.zfac)
        this.refs.z.setValue(z*this.zfac)
        this.refs.rx.setValue(rx/Math.PI*180)
        this.refs.ry.setValue(ry/Math.PI*180)
        this.refs.rz.setValue(rz/Math.PI*180)
        this.refs.scale.setValue(scale)
      }
      back(){
        this.props.history.goBack();
      }
      save(){
        for(let obj of  this.objects){
          let {x,y,z} = obj.position
          x *= this.zfac;
          y *= this.zfac;
          z *= this.zfac;
          let rx = (obj.rotation.x/Math.PI*180)
          let ry = (obj.rotation.y/Math.PI*180)
          let rz = (obj.rotation.z/Math.PI*180)
          let scale = obj.scale.x
         //console.log(obj._id)
          Storer("project_target_item", this, { x,y,z,rx,ry,rz,scale,0:{id:obj._id} }, "update");
        }
      }
      config = {
        cols: {
           // "`id`": { text: "شناسه", dataIndex: "id" },
            //type: {  type: "select", btn: "selector", options: {0:"متن", 1: "تصویر", 2: "فیلم", 3: "صدا", 4: "مدل" } },
            //path: { text: "تصویر", btn: "imgbtn", width: 100, options: { text: "آپلود" } },
            path: { dataIndex: "path",text: "آپلود", btn: "multy", options: { text: "آپلود" },width:50 },
            //description: { text: "متن", btn: "htmlbtn" },
            //_layout :{text:"تم",type: "select", btn: "selector", options: {0:"پیشفرض" }},
            "if(type>1,auto,2) as auto": { dataIndex: "auto",text: "پخش", type: "select", btn: "toggle", options: { 1: "play-circle", 0: "pause-circle",2:""},width:55 },
            ability: { text: "اجازه", type: "select", btn: "toggle", options: { 1: "cloud-download", 0: "ban"} ,width:50},
            link: { text: "لینک", btn: "linkbox",width:50 },
            // x: { text: "x", editable: true,width:50 },
            // y: { text: "y", editable: true,width:50 },
            // z: { text: "z", editable: true ,width:50},
            // rx: { text: "rx", editable: true,width:50 },
            // ry: { text: "ry", editable: true,width:50 },
            // rz: { text: "rz", editable: true,width:50 },
            // scale: { text: "زوم", editable: true ,width:50},
            // height:{text:"طول",editable:true},
            // width:{text:"عرض",editable:true},
            status: { text: "فعال", type: "select", btn: "toggle", options: { 0: "eye-slash", 1: "eye" } ,width:50},
           // view: { text: "مشاهده",width:60 },
            id: { text: "حذف", btn: "delbtn", width: 50 }
        },
        from: "project_target_item",
        title: "افزودنی ها ",
        icon: "plus-square",
        filter: { hidden: true },
        print:{ hidden: true },
        excel:{ hidden: true },
        num: 100,
        new:{hidden:false,_project_target:this.query()._project_target||0,_project:this.query()._project||0},
        history: this.props.history
    }
    render = () => {
        if(this.state.mainrget.length ){
            let {photo,width,height} = this.state.mainrget[0]
          //  this.pic({type:"target", url: photo, w: width, h: height, z:-.05 })
            for(let item of this.state.items){
              let {path,type,id,x,y,z,rx,ry,rz,scale,width,height,link,auto} = item
            //  this.pic({ url: path, w: width , h: height ,x,y,z,rx,ry,rz,scale,type,id,auto})
            }
             this.state.mainrget = []
             this.state.items = []
          }
          let selected = this.state.selected  || {position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0},scale:{x:1,y:1,z:1},lock:false}
          let {x,y,z} = selected.position			
          let rx = selected.rotation.x
          let ry = selected.rotation.y
          let rz = selected.rotation.z
          let scale = selected.scale.x  
          let {mode,orbit} = this.state
          let lock = selected.lock 
          let paused = selected.paused 
          let type = selected._type 
        return <Container layout="fit" >
<Container docked="left" >
<Table {...this.config} width="300" noshowddow/>
    </Container>
      
      <Container    {...this.PanelProps}>
      <Button iconCls="x-fa fa-arrow-left" ui="action round" handler={this.back.bind(this)} />
      <Button iconCls="x-fa fa-floppy-o" ui="action round" margin="0 5 0 5" onTap={this.save.bind(this)} />
      <Button iconCls="x-fa fa-undo" ui="action round" margin="0 5 0 5"/>
      <Button iconCls="x-fa fa-info" ui="action round" margin="0 5 0 5"/>
      <ToggleField boxLabel="3D" ref="dimension" value={this.state.orbit} margin="0 5 0 5" onChange={(a,b)=>{
          this.setState({orbit:b})
          this.orbital();
       //  this.state.orbit=b;this.orbital();
        }}/>



        <Button iconCls={"x-fa fa-"+(paused?"play":"pause")} hidden={(type>1?"action":"")+" round"} margin="0 5 0 5" onTap={()=>{
          this.state.selected.lock  = !lock;
          this.setState({selected:selected});
          
        }}/>
        {/* <SegmentedButton width="80" margin="0 5 0 5" onChange={(a,b)=>{
          console.log("b")
          if(this.state.selected) this.state.selected.lock = b==1?true:false
        }}>
        
        <Button iconCls="x-fa fa-unlock" ui="action round"  pressed={()=>!lock} disabled={!this.state.selected}/>
        <Button iconCls="x-fa fa-lock" ui="action round"  pressed={lock==true} disabled={!this.state.selected}/>
        </SegmentedButton> */}

        
        <Container flex="1" layout={{ type: "hbox", pack: "center" }}  >
          <NumberField ref="x" label="x :" {...this.textprops} value={x*this.zfac} hidden = {mode!="translate" || !this.state.selected} onAction={a=>this.pos({x:a._value})}/>
          <NumberField ref="y" label="y :" {...this.textprops} value={y*this.zfac} hidden = {mode!="translate" || !this.state.selected} onAction={a=>this.pos({y:a._value})}/>
          <NumberField ref="z" label="z :" {...this.textprops} value={z*this.zfac} hidden = {mode!="translate" || !orbit || !this.state.selected} onAction={a=>this.pos({z:a._value})} />
          <NumberField ref="rx" label="rx :" {...this.textprops} value={rx/Math.PI*180} hidden = {mode!="rotate" || !orbit || !this.state.selected} onAction={a=>this.pos({rx:a._value})}/>
          <NumberField ref="ry" label="ry :" {...this.textprops} value={ry/Math.PI*180} hidden = {mode!="rotate" || !orbit || !this.state.selected} onAction={a=>this.pos({ry:a._value})}/>
          <NumberField ref="rz" label={orbit?"rz :":"rotate :"} {...this.textprops} value={rz/Math.PI*180} hidden = {mode!="rotate" || !this.state.selected} onAction={a=>this.pos({rz:a._value})} />
          <NumberField ref="scale" label="sacle :" {...this.textprops} value={scale} hidden = {mode!="scale" || !this.state.selected} onAction={a=>this.pos({scale:a._value})}/>
        </Container>

        <Button iconCls="x-fa fa-magnet" ui={(this.state.snap?"action":"")+" round"} margin="0 5 0 5" onTap={()=>{
          this.setState({snap:!this.state.snap})
        }}/>
                <Button iconCls={"x-fa fa-"+(lock?"lock":"unlock")} ui={(lock?"action":"")+" round"} margin="0 5 0 5" onTap={()=>{
          this.state.selected.lock  = !lock;
          this.setState({selected:selected});
          
        }}/>
                <SegmentedButton width="160" margin="0 5 0 5" onChange={(a,b)=>{
        this.setState({ mode: "translate,rotate,scale".split(",")[b] })  
        }}>
        <Button iconCls="x-fa fa-arrows" ui="action round" pressed={mode=="translate"} />
        <Button iconCls="x-fa fa-refresh" ui="action round" pressed={mode=="rotate"}/>
        <Button iconCls="x-fa fa-arrows-alt" ui="action round" pressed={mode=="scale"} />
        </SegmentedButton>
        
        
    </Container>
          <video src="" ref={(el) => { this.videoel = el }} width="200"  height="120" controls={true} crossOrigin  hidden loop poster={videopic}
          />
         <div style={{ width: "100%", height: '100%' }} ref={(mount) => { this.mount = mount }} />
        
       
  </Container>
    }
    componentDidUpdate() {
         this.orbital();
          this.control.setMode(this.state.mode+(this.state.orbit?"":"2d"));
          this.control.setTranslationSnap(this.state.snap?this.TranslationSnap:null)
          this.control.setRotationSnap(this.state.snap?this.RotationSnap:null)
          this.control.setScaleSnap(this.state.snap?this.ScaleSnap:null)
          this.control.check()
          this.renderScene()
        }
        textprops={
          labelCls:"positionlable",
          inputCls :"positioninput",
          cls:"noclearicon",
          textAlign:"center",
          labelAlign:"left",
          width:120,
          padding:3,
          margin:"0 5 0 5"
          
        }
        PanelProps = {
          layout :{type:"hbox",align:"left"},
        
          docked:"top",
          padding:5,
          ref: 'menu',
          scrollable: true,
          height: '42',
          style: { backgroundColor: '#FAF8FC' }
        };
}