import React, { Component } from 'react';
import * as THREE from 'three';
const OrbitControls = require('three-orbitcontrols')
var TransformControls = require('three-transform-controls')(THREE);
let FBXLoader = require('three-fbxloader-offical')
import { Container,Button,SegmentedButton ,ToggleField,NumberField, Dialog,Audio,Video} from '@sencha/ext-modern';
import Storer from "../../Store/Storer"
import pic from '../../Statics/Images/clipart1.jpg';
import audio from '../../Statics/Images/audio.jpg';
import videopic from '../../Statics/Images/video.jpg';
import Table from "../../Componnet/Table";
// import { clearInterval } from 'timers';
export default class ThreeScene extends Component {
  trap = 50
  zfac = 30
  TranslationSnap = 2;
  RotationSnap = 15/180*Math.PI;
  ScaleSnap = 0.25
  state = { orbit: true ,mode :"translate",snap:false,items:[],mainrget:[],aligner:false}
  cameradef = {x:0,y:0,z:140}
  camera3dpos= this.cameradef
  camera2dpos={...this.cameradef,x:0,y:0}
  selected = undefined
  constructor(props) {
    super(props);
    this.locator = this.locator.bind(this)
    this.onkeyboarddown = this.onkeyboarddown.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
    this.onmousedown = this.onmousedown.bind(this)
    this.tgvisibility = this.tgvisibility.bind(this)
    this.tglock = this.tglock.bind(this)
    this.delete = this.delete.bind(this)
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
    window.MainMenu.setState({micro:true});
    let cols="id,type,path";
    Storer({
      
      items:{from:"project_target_item",0:{_project_target:this.query()._project_target*1}},
      mainrget:{from:"project_target",0:{id:this.query()._project_target*1}},
    },this);
  }
  refresh(){
   for(let mesh of this.objects) this.delete(mesh)
    Storer({
      
      items:{from:"project_target_item",0:{_project_target:this.query()._project_target*1}},
      mainrget:{from:"project_target",0:{id:this.query()._project_target*1}},
    },this);
    this.table._refresh()
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
     //console.log(event.keyCode )
   event.preventDefault()
    switch ( event.keyCode ) {
      case 46 :
          if(this.state.selected) this.table.delete(this.table.grid.cmp.getSelectable().getSelectedRecords()[0],false,this.delete);
        break;
      case 27:
    //    console.log(this.state.selected)
        if(!this.state.selected) this.resetcamera(); else {this.resetelement(this.state.selected)}
         break;
         case 120://20:
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
        this.control.setSize( Math.max( this.control.size - 0.1, 0.1 ) );
        break;
      case 32: // Spacebartarget
         this.control.enabled = !  this.control.enabled;
        break;

    }

  }
  resetelement(mesh){
    if(! mesh.defults) return;
    let {x,y,z,rx,ry,rz,scale} = mesh.defults
    //console.log({x,y,z,rx,ry,rz,scale} )
   mesh.position.set(x, y, z);
    mesh.rotation.set(rx, ry, rz);
    mesh.scale.set(scale,scale,scale)
    this.control.attach(mesh)
    this.renderScene();
  }
  reset2d(mesh){
    
    var ord = 0;
    for( let item of this.table.grid.cmp.store.data.items) 
      if(mesh._id == item.data.id ) 
        ord= item.data.ord;
    
    mesh.position.z= ord /30
    mesh.rotation.x=0
    mesh.rotation.y=0

    this.control.attach(mesh)
    this.renderScene();
  }
  resetcamera(_2d=false){
    let cameradef = this.cameradef 
    if(_2d) {
      this.camera.position.set(0,0,140)
      this.camera.rotation.set(0,0,0)
    }else{
      this.camera.position.set(cameradef.x,cameradef.y,cameradef.z)
      this.camera.rotation.set(cameradef.rx,cameradef.ry,cameradef.rz)
    }

    this.camera.scale.set(1,1,1)
    this.camera.updateProjectionMatrix();
    this.renderScene()
  }
  onmousedown( event ) {
  // this.table.grid.setSelected(this.table.grid.getSelected())
  // console.log(this.table.grid,this.table.grid.getSelected())
    if(this.state.selected && this.state.selected.myonchange) delete this.state.selected.myonchange
    let selected = this.intersectObjects(event, this.objects)
    var audiourl = "",videourl="";
//console.log(this.table)
if(this.state.selected && selected != this.state.selected && this.state.selected.itype==2) {
  this.state.selected.material.map = this.state.selected.defTexture;
  var video = window.document.getElementsByTagName( 'video' );
  video[0].removeAttribute("src");
}
    if (selected) {
      while ( selected.parent && selected.parent.type=="Group") selected = selected.parent;
      selected.myonchange = this.changeinfo.bind(this)
      this.control.attach(selected);
      for (let record of this.table.grid.cmp.store.data.items) if (selected._id == record.id) this.table.grid.cmp.getSelectable().selectRows(record)
      if (selected.itype==3 && selected.url) audiourl = selected.url; 
      if (selected.itype==2 && selected.url) videourl = selected.url; 

    } else  this.control.detach();
  
    // console.log(_record,_record2)
     
    // sel.items = _record;
    // this.table.grid.setSelected(_record)
   // console.log(sel.items, this.table.grid)
    this.setState({selected,audiourl,videourl})
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
    var width = window.innerWidth - (580-280+56); // canvas width
    var height = window.innerHeight; // canvas height

    //ADD SCENE
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color( 0xECEFF1 );
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    this.resetcamera()
    //ADD reycaster
    this.ray = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    this.renderer.setSize(width, height)
    this.mount = this.mount.cmp.el
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
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    this.scene.add(light);
    var light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(-1, -1, 1);
    this.scene.add(light2);
    var light3 = new THREE.DirectionalLight(0xffffff, 1);
    light3.position.set(0, 0, -1);
    this.scene.add(light3);
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
    setTimeout(()=>{
      
      window.document.getElementById(this.mount.cmp._itemId).addEventListener("mousedown", this.onmousedown,false);
    },1000)
   // this.mount.addEventListener('mousedown',this.onmousedown,false);
    this.orbital()
    this.renderScene()
  }
  meshreform(mesh){
    console.log(mesh)
    if(mesh.children) {
        for(let imesh of mesh.children) this.meshreform(imesh)
    }else {
     
        if(mesh.material.length) {
        for(let material of mesh.material){
          delete  material.alphaMap
            material.side = THREE.DoubleSide
        }       
      }else{
       // delete  mesh.material.alphaMap
           // mesh.material.side = THREE.DoubleSide
      }
    }
  }
  async pic(param) {
    let def = { url: pic, w: 1024, h: 720, x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, scale: 1,type:"item",lock:false,status:1 }
    let { url, w, h, x, y, z, rx, ry, rz, scale,type,lock ,id,auto,status} = { ...def, ...param }
    let texture,video,mesh
   // console.log(url, w, h, x, y, z, rx, ry, rz, scale,type,lock ,id,auto,status)
    if(type == 4){
      let fbxmesh = new Promise((resolve, reject) => {
      var loader = new FBXLoader();
         loader.load(url, (object)=>resolve(object))
      })

      mesh = await fbxmesh;
      this.meshreform(mesh);
      // console.log(mesh)
      // this.computerBoundingBox(mesh)
      // mesh.updateMatrixWorld();
      // let boundry = new THREE.Box3().setFromObject(mesh);
      // boundry.applyMatrix4(mesh.matrixWorld);
      // let cx = scale*this.zfac*(boundry.max.x+boundry.min.x)/2
      // let cy = scale*this.zfac*(boundry.max.y+boundry.min.y)/2
      // let cz = scale*this.zfac*(boundry.max.z+boundry.min.z)/2;
      // for(let imesh of mesh.children)
      //  {
      //   // imesh.position.x -=(cx/this.zfac)/scale
      //   // imesh.position.y -=(cy/this.zfac)/scale
      //   // imesh.position.z -=(cz/this.zfac)/scale
      //  if(imesh.material) {
      //    delete  imesh.material.alphaMap
      //   imesh.material.side = THREE.DoubleSide
      //  }
      // }
     mesh.d=3
    //  if(x==0 && y==0 && z==0){
    // x= x*1+cx
    //  y= y*1+cy
    //  z= z*1+cz
    //  }
 

  //  /  console.log(x,y,z)
     // console.log(mesh)
    }else   if(type == 2){
      // this.videoel.autoplay = auto
      // this.videoel.src = url;
      // this.videoel.poster = videopic
      // this.videoel.load();


      var loader = new THREE.TextureLoader();
      loader.crossOrigin = '';
      texture = loader.load(videopic,  this.renderScene);
      texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    }else{
      var loader = new THREE.TextureLoader();
      loader.crossOrigin = '';
      texture = loader.load(type ==3 ? audio: url , this.renderScene);
      texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    }
    
    
    let geometry = new THREE.BoxBufferGeometry(w / this.zfac, h / this.zfac, 0.01);
    let material = new THREE.MeshLambertMaterial({ map: texture,transparent: url.indexOf(".png")>1 });
   
     mesh = mesh?mesh: new THREE.Mesh(geometry, material);
     mesh.d=mesh.d || 2;
     if(type == 2) mesh.defTexture= texture ;
     mesh.itype = type
     mesh.url = url
    //dimansion
    mesh.video = video
    mesh.defults = { ...def, ...param }
 //   console.log(x,y,z)
    mesh.position.set(x/this.zfac, y/this.zfac, z/this.zfac);
    mesh.rotation.set(rx/180*Math.PI, ry/180*Math.PI, rz/180*Math.PI);
    mesh.scale.set(scale,scale,scale)
    mesh.lock =  lock
    mesh.visible = status
    if(!status) mesh.traverse( function ( object ) { object.visible = false; } );
    this.scene.add(mesh);
    this.renderScene();
    if(type !="target") {
      mesh._id = id
      this.objects.push(mesh);
    }
    return mesh
  }
  tgvisibility(mesh){
    for(let _mesh of this.objects) if(_mesh._id ==  mesh.id) mesh = _mesh;
    mesh.visible = (mesh.visible+1)%2
    
    if(mesh.visible) mesh.traverse( function ( object ) { object.visible = true; } ) 
      else {
        mesh.traverse( function ( object ) { object.visible = false; } );
        this.control.detach()
      }
    this.renderScene()
  }
  delete(mesh){
    for(let _mesh of this.objects) if(_mesh._id ==  mesh.id) mesh = _mesh;
    if(!mesh._id) return;
    this.scene.remove(mesh);
    if(mesh.geometry) mesh.geometry.dispose();
    if(mesh.material)  mesh.material.dispose();
    mesh = undefined;
    this.control.detach()
    this.renderScene()
  }
  tglock(mesh){
    for(let _mesh of this.objects) if(_mesh._id ==  mesh.id) mesh = _mesh;
    mesh.lock = (mesh.lock+1)%2
    
    this.setState({selected:mesh});
  } 
  orbital() {
    if (this.state.orbit) {
      for(let grid of this.grids) this.scene.add(grid);
      this.resetcamera()
      if (this.orbit== undefined) {
      this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
      this.orbit.control = this.control
      }else{
          for(let mesh of this.objects) 
            if(mesh.tdpos){
            mesh.position.z = mesh.tdpos.z
            mesh.rotation.x = mesh.tdpos.x
            mesh.rotation.y = mesh.tdpos.y
            }  
         
        
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

        for(let mesh of this.objects) {
          mesh.tdpos = {z: mesh.position.z,x:mesh.rotation.x,y:mesh.rotation.y} 
          this.reset2d(mesh)
        }
        this.orbit.removeEventListener('change', this.renderScene);
        this.orbit.enabled= false
        let rx  = this.camera.rotation.x
        let ry  = this.camera.rotation.y
        let rz  = this.camera.rotation.z
        let {x,y,z}  = this.camera.position
        this.cameradef = {...this.cameradef,x,y,z,rx,ry,rz}
        this.resetcamera(true)
        this.control.setMode(this.control.getMode().split("2d").join("")+"2d"  )

      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.intvideo)
    if(this.mount && this.renderer.domElement) this.mount.cmp.el.removeChild(this.renderer.domElement)
    window.removeEventListener('resize', this.onWindowResize,false);
    window.removeEventListener('keyup', this.onkeyboarddown,false);
    window.document.getElementById(this.mount.cmp._itemId).addEventListener("mousedown", this.onmousedown,false);

    //this.mount.cmp.el.removeEventListener('mousedown',this.onmousedown,false);
    


  }
  renderScene = () => {
    if(this.renderer) this.renderer.render(this.scene, this.camera)
  }
  computerBoundingBox(obj){
    if(obj.type=="Mesh") {
      obj.geometry.computeBoundingBox();
    }else if(obj.type="Group") for(let mesh of obj.children) this.computerBoundingBox(mesh)
  }
  pos(param){
    window.document.activeElement.blur();
    let {x,y,z,rx,ry,rz,scale} = param
    
    this.computerBoundingBox(this.state.selected)
    this.state.selected.updateMatrixWorld();
    let boundry = new THREE.Box3().setFromObject(this.state.selected);

    // this.state.selected.geometry.computeBoundingBox();
    // this.state.selected.updateMatrixWorld();
    // let boundry = this.state.selected.geometry.boundingBox.clone();
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
    
    this.refs.x.cmp.setValue(x*this.zfac)
    this.refs.y.cmp.setValue(y*this.zfac)
    this.refs.z.cmp.setValue(z*this.zfac)
    this.refs.rx.cmp.setValue(rx/Math.PI*180)
    this.refs.ry.cmp.setValue(ry/Math.PI*180)
    this.refs.rz.cmp.setValue(rz/Math.PI*180)
    this.refs.scale.cmp.setValue(scale)
  }
  back(){
    window.MainMenu.setState({micro:false});
    this.props.history.goBack();
  }
  saveCam(){
    let obj = this.camera
    let rx = (obj.rotation.x/Math.PI*180)
    let ry = (obj.rotation.y/Math.PI*180)
    let rz = (obj.rotation.z/Math.PI*180)
    let {x,y,z} = obj.position
    x *= this.zfac;
    y *= this.zfac;
    z *= this.zfac;
    let scale = obj.scale.x
    if(this.cameradef._id)   Storer("project_target_item", this, { x,y,z,rx,ry,rz,scale,0:{id:this.cameradef._id} }, "update");
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
      if(obj.itype==4){
        this.computerBoundingBox(obj)
        obj.updateMatrixWorld();
        let boundry = new THREE.Box3().setFromObject(obj);
        let width = Math.abs(boundry.max.x-boundry.min.x)*this.zfac;
        let height = Math.abs(boundry.max.y-boundry.min.y)*this.zfac;
        Storer("project_target_item", this, { x,y,z,rx,ry,rz,scale,width,height,0:{id:obj._id} }, "update");
      }else if(obj.itype==3){
        let width = 400 
        let height = 266
        Storer("project_target_item", this, { x,y,z,rx,ry,rz,scale,width,height,0:{id:obj._id} }, "update");
      }else{
        
        Storer("project_target_item", this, { x,y,z,rx,ry,rz,scale,0:{id:obj._id} }, "update");
      }

     //console.log(obj._id)
    }
  }
  render() {
    //console.log(this.state.items , this.state.mainrget)
    if(this.state.mainrget && this.state.mainrget.length ){
      let {photo,width,height} = this.state.mainrget[0]
      this.pic({type:"target", url: photo, w: width, h: height, z:-.05 })
      this.target = this.state.mainrget[0];
      for(let item of this.state.items){
        console.log(item)
        let {path,type,id,x,y,z,rx,ry,rz,scale,width,height,link,auto,lock,status} = item
        if(type>0) this.pic({ url: path, w: width , h: height ,x,y,z,rx,ry,rz,scale,type,id,auto,lock,status,link});
        else {
        
          this.cameradef = {_id:id,x:x/this.zfac,y:y/this.zfac,z:z/this.zfac,rx:rx/180*Math.PI,ry:ry/180*Math.PI,rz:rz/180*Math.PI}
          this.resetcamera()
        }
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
    this.config = {
    cols: { 
      
      
      status: { text: "<span class='x-fas fa-eye'></span>", btn: "toggle", options: { 0: "eye-slash deactive", 1: "eye blugray" } ,width:30,minWidth:30 ,event:this.tgvisibility},
      path: { text: "<span class='x-fas fa-cloud-upload-alt'></span>", btn: "multy", options: { text: "آپلود" },width:35 },

              title : {text:"<span class='x-fas fa-list'></span>",editable:true,flex:1,renderer:(val)=>val?val:<span style={{color:"#999999"}}>نام افزودنی</span>},


        "if(type>1,auto,2) as auto": { dataIndex: "auto",text: "<span class='x-fas fa-play'></span>", btn: "toggle", options: { 1: "play x-fas green", 0: "pause x-fas purpule",2:"ban x-fas deactive"},width:30,minWidth:30},
        ability: { text: "<span class='x-fas fa-download'></span>", btn: "toggle", options: { 1: "check x-fas yellow", 0: "ban x-fas deactive"} ,width:30,minWidth:30},
       
        link: { text: "<span class='x-fas fa-link'></span>", btn: "linkbox",width:30,minWidth:30 },
        "`lock`": { dataIndex: "lock",text: "<span class='x-fas fa-lock'></span>", btn: "toggle", options: { 0: "lock-open x-fas deactive", 1: "lock x-fas red" } ,width:30,minWidth:30,event:this.tglock},
        id: { text:"" },
        ord :{text:""},
        width : {},
        height : {},
    },
    onOrder : (record)=>{
      if(this.state.orbit==false) for(let mesh of this.objects) this.reset2d(mesh);
      this.config.onSelect(1,record)
    },
    onSelect : (a,record)=>{
      
      for(let mesh of this.objects) if ( mesh._id==record.data.id) {
        selected = mesh
        var audiourl="",videourl="";
        if (selected) selected.myonchange = this.changeinfo.bind(this)
        if (selected) this.control.attach(selected); else this.control.detach()
        if (selected && selected.itype==3 && selected.url) audiourl = selected.url; 
        if (selected && selected.itype==2 && selected.url) videourl = selected.url; 
        if  (this.state.selected && selected != this.state.selected && this.state.selected.itype==2) {
          var video = window.document.getElementsByTagName( 'video' );
          video[0].removeAttribute("src");
          this.state.selected.material.map = this.state.selected.defTexture;
        }
        this.setState({ selected ,audiourl,videourl})
      }

    },
    unsortable : true,
    order:"ord",
    0:{type:">0"},
    from: "project_target_item",
    title: "افزودنی ها ",
    icon: "plus-square",
    newText :"جدید",
    filter: { hidden: true },
    print:{ hidden: true },
    excel:{ hidden: true },
    refresh:{ hidden: true },
    btn1: { hidden: false, iconCls:"x-fa fa-trash", handler:()=>{
      this.table.delete(this.table.grid.cmp.getSelectable().getSelectedRecords()[0],false,this.delete) 
    }},
    back:{ hidden: true },
    num: 100,
    parent:this,
    new:{hidden:false,title:"",ord:2,_project_target:this.query()._project_target||0,_project:this.query()._project||0},
    history: this.props.history,
    onUpload :(record)=>{
      let {path,id,width,height,link,auto,lock,status} = record.data
      this.delete(record)
        this.pic({ url: path, w: width , h: height ,x:0,y:0,z:0,rx:0,ry:0,rz:0,scale:1,type:1,id,auto,lock,status,link})
        this.renderScene()
    }
}
    return <Container layout="fit" >
    <Container docked="right" layout="fit">
<Table {...this.config} width="350" noshowddow  ref={(table) => { this.table = table}}/>
<Container hidden = {!this.state.audiourl && !this.state.videourl } docked="bottom" >
<Audio hidden = {!this.state.audiourl}  ref="audio"   enableControls    url={this.state.audiourl}       />
<Video hidden = {!this.state.videourl}  ref="audio"   enableControls    url={this.state.videourl}  width="350" height="250" autoPlay  posterUrl={videopic}  onplay={()=>{
    var video = window.document.getElementsByTagName( 'video' );
  if(video[0].src == this.state.videourl) return;
  video[0].crossOrigin="anonymous"
  video[0].addEventListener('timeupdate',  ()=>{
    this.renderScene()
    for(var i=1;i<25;i++) setTimeout(this.renderScene,i*40);
});
  video[0].setAttribute('crossorigin', 'anonymous');
  video[0].src = this.state.videourl;
  video[0].load(); 
  video[0].play();
  var texture = new THREE.VideoTexture( video[0] );
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;
  this.state.selected.material.map = texture;
  }} onplaying={()=>this.renderScene()}/>
</Container>

</Container>
      
      <Container    {...this.PanelProps}>
      <Button iconCls="x-fas fa-arrow-left" ui="action round" handler={this.back.bind(this)} />
      <Button iconCls="x-fas fa-save" ui="action round" margin="0 5 0 5" onTap={this.save.bind(this)} />
      <Button iconCls="x-fas fa-sync" ui="action round" margin="0 5 0 5" onTap={this.refresh.bind(this)}/>
      <Button iconCls="x-fas fa-cctv" ui="action round" margin="0 5 0 5" onTap={this.saveCam.bind(this)}/>


      <ToggleField  ref="dimension" value={this.state.orbit} margin="0 5 0 5" onChange={(a,b)=>{
          this.setState({orbit:b})
          this.orbital();
        }} shadow={false} />
      <Button iconCls="x-fas fa-cubes white" ui="round" margin="0" ripple={false} onTap={()=>{
        this.refs.dimension.cmp.setValue(!this.refs.dimension.cmp.getValue())
      }}/> 


        <Button  iconCls={"x-fas white fa-"+(paused?"play":"pause")} hidden={(type>1?"action":"")+" round"} margin="0 5 0 5" onTap={()=>{
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
        <div style={{}}></div>
        <Button iconCls="x-fas fa-compress-arrows-alt white" ui="round" margin="0 2"   onTap={this.bestfit.bind(this)} disabled={!this.state.selected}/>  
        <Button iconCls="x-fas fa-bring-front white" ui={(this.state.aligner?"action":"")+" round"} margin="0 2"   onTap={()=>{
          this.setState({aligner:!this.state.aligner})
        }}/>  
        
        <Button iconCls="x-fas fa-magnet white" ui={(this.state.snap?"action":"")+" round"} margin="0 2" onTap={()=>{
          this.setState({snap:!this.state.snap})
        }}/>
                {/* <Button iconCls={"x-fa fa-"+(lock?"lock":"unlock")} ui={(lock?"action":"")+" round"} margin="0 5 0 5" onTap={()=>{
          this.state.selected.lock  = !lock;
          this.setState({selected:selected});
          
        }}/> */}
                <SegmentedButton width="160" margin="0 5 0 5" onChange={(a,b)=>{
        this.setState({ mode: "translate,rotate,scale".split(",")[b] })  
        }}>
        <Button iconCls="x-fas fa-arrows-alt" ui="action round" pressed={mode=="translate"} />
        <Button iconCls="x-fas fa-sync-alt" ui="action round" pressed={mode=="rotate"}/>
        <Button iconCls="x-fas fa-expand-arrows-alt" ui="action round" pressed={mode=="scale"} />
        </SegmentedButton>
        
        
    </Container>
    <Dialog 

                    displayed={this.state.aligner}
                    closable
                    closeAction="hide"
                    bodyPadding="0"
                    title = "تراز"
                    modal={false}
                    
                    onHide={() => this.setState({aligner: false })}
                    
                >
                  <Container layout="vbox" width={32*5} height={32*5} style={{background:"#ECEFF1"}} >

                    <Button ripple={false}  iconCls="x-fa fa-arrow-alt-from-bottom" handler={this.frombottom.bind(this)} disabled={!this.state.selected}/>
                    <Container layout="hbox"  >
                    <Button ripple={false} width={32} iconCls="x-fa fa-arrow-alt-from-left" handler={this.fromleft.bind(this)} disabled={!this.state.selected}/>
                        <Container  width={32*3}  layout="vbox" style={{background:"#CFD8DC"}}>
                             <Button ripple={false}  width={32*3}  iconCls="x-fa fa-arrow-alt-to-top" handler={this.totop.bind(this)} disabled={!this.state.selected}/>  
                              <Container  layout="hbox" width={32*3}>
                                   <Button ripple={false} width={32}  iconCls="x-fa fa-arrow-alt-to-right"handler={this.toright.bind(this)} disabled={!this.state.selected}/> 
                                   <Button ripple={false} width={32}  iconCls="x-fa fa-crosshairs" handler={this.tocenter.bind(this)} disabled={!this.state.selected}/>  
                                   <Button ripple={false} width={32}  iconCls="x-fa fa-arrow-alt-to-left" handler={this.toleft.bind(this)} disabled={!this.state.selected}/>  
                              </Container>
                              <Button ripple={false}  width={32*3}  iconCls="x-fa fa-arrow-alt-to-bottom" handler={this.tobottom.bind(this)} disabled={!this.state.selected}/>  
                        </Container>
                        <Button ripple={false}  width={32} iconCls="x-fa fa-arrow-alt-from-right" handler={this.fromright.bind(this)} disabled={!this.state.selected}/>
                    </Container>
                    <Button ripple={false} iconCls="x-fa fa-arrow-alt-from-top" handler={this.fromtop.bind(this)} disabled={!this.state.selected}/>
                  </Container>
                </Dialog>

          {/* <video src="" ref={(el) => { this.videoel = el }} width="200"  height="120" controls={true} crossOrigin  hidden loop poster={videopic}
          /> */}
         <div style={{ width: "100%", height: '100%',backgroundColor:"#999" }} ref={(mount) => {this.mount = mount }} />
        
       
  </Container>
  }
locator(params){
  
  let {x,y,z} = this.state.selected.position
  x = isNaN(params.x)  ? x*this.zfac  : params.x
  y = isNaN(params.y)  ? y*this.zfac  : params.y
  z =  z*this.zfac;
  this.state.selected.position.set(x/this.zfac, y/this.zfac, z/this.zfac);
  this.control.attach(this.state.selected);
  this.renderScene();
}
bestfit(){

  let scale = Math.min(this.target.width/this.state.selected.defults.w,this.target.height/this.state.selected.defults.h);
  if(this.state.selected.d==2) this.state.selected.scale.set(scale,scale,scale)
  this.tocenter();
}
tocenter(){
  this.locator({x:0.000001,y:0.000001});
}
toleft(){
  let x = - this.target.width/2 + this.state.selected.defults.w/2*this.state.selected.scale.x 
  this.locator({x});
}
toright(){
   let x = this.target.width/2 - this.state.selected.defults.w/2*this.state.selected.scale.x 
  this.locator({x});
}
totop(){
  let y = this.target.height/2 - this.state.selected.defults.h/2 *this.state.selected.scale.x 
  this.locator({y});
}
tobottom(){ 
  let y = -this.target.height/2+ this.state.selected.defults.h/2 *this.state.selected.scale.x 
  
  this.locator({y});
}
fromleft(){
  let x = this.target.width/2 + this.state.selected.defults.w/2 *this.state.selected.scale.x 
  this.locator({x});
}
fromright(){
  let x = - this.target.width/2 - this.state.selected.defults.w/2 *this.state.selected.scale.x 
  this.locator({x});
}
fromtop(){
  let y = -this.target.height/2 - this.state.selected.defults.h/2 *this.state.selected.scale.x 
  this.locator({y});
}
frombottom(){
  let y = this.target.height/2 + this.state.selected.defults.h/2 *this.state.selected.scale.x 
  this.locator({y});
}

onCancel = () => {
    this.setState({ aligner: false });
}
  componentDidUpdate() {
  //  this.orbital();
    this.control.setMode(this.state.mode+(this.state.orbit?"":"2d"));
    this.control.setTranslationSnap(this.state.snap?this.TranslationSnap:null)
    this.control.setRotationSnap(this.state.snap?this.RotationSnap:null)
    this.control.setScaleSnap(this.state.snap?this.ScaleSnap:null)
    //this.control.check()
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
    margin:"0"
    
  }
  PanelProps = {
    layout :{type:"hbox",align:"left"},
  
    docked:"top",
    padding: "12 5",
    ref: 'menu',
    scrollable: true,
    height: '57',
    style: { backgroundColor: 'var(--base-color)' }
  };
}
