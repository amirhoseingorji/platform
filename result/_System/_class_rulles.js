var cc = console.log;
class _{
	constructor(arg){
		var _=this._ =this.constructor,_op = Object.getPrototypeOf,_on = Object.getOwnPropertyNames;this.name = _.name;
		var _$=($,$$)=>{$.fn = $$;$.fn();delete $.fn;};  	
		if (this._public ) {this._public();};
		if (this._static ) {_$(_,this._static);};
		_._protect=_._protect || {};if (this._protect){_$(_._protect,this._protect);}
		_._private={};if (_on(_op(this)).indexOf("_private")>-1 ){_$(_._private,this._private);};
		if (this._protect || _on(_op(this)).indexOf("_private")>-1 ){
		(_on(_op(this))).filter((i)=>{return ["constructor","_private","_public","_static","_protect"].indexOf(i)<0;}).forEach((e)=>{
			this["_"+e]= this[e];this[e] = function(){this._Private("get");var tmp = this["_"+e].apply(this, arguments);this._Private("set");return tmp;};
		});}
	}
	_Private(mod){
		var pri = this._._private||{};Object.keys(pri).forEach((e)=>{if(mod=="set") {this._._private[e] = this[e];};this[e] = mod=="get"||mod==true ? pri[e]:undefined;});
		var pro = this._._protect||{};Object.keys(pro).forEach((e)=>{if(mod=="set") {this._._protect[e] = this[e];};this[e] = mod=="get"||mod==true ? pro[e]:undefined;});
	}
}

///classses structure
class a extends _{
	
	show(a){
		var i = this;
		var tmp = [i.pub,i._.sta,i.pro,this.pri,i.prif];
		return tmp;
		
	}
	_public(){
		this.pub = "a";
	}
	_private(){
		this.pri = "a pri";
		this.prif = function(){
			//cc(this.prif)
		};
	}
	_static(){
		this.sta = "sta";
	}
	_protect(){
		this.pro = "a pro";
	}
}
class b extends a{
	_private(){
		this.pri = "b";
	}
	_static(){
		this.sta = "b sta"
	}
	_protect(){
	this.pro = "b pro";
	}
	show(a){
		var i = this;
		var tmp = [i.pub,i._.sta,i.pro,this.pri,i.prif];
		return tmp;
		
	}
};
class c extends a{
//	_private(){
//		this.pri = "c";
//	}
	_public(){
		this.pub= "c";
	}

	show(a){
		var i = this;
		var tmp = [i.pub,i._.sta,i.pro,this.pri,i.prif];
		return tmp;
	}
};
class d extends c{
		show(a){
		var i = this;
		var tmp = [i.pub,i._.sta,i.pro,this.pri,i.prif];
		return tmp;
	}
};
///classes ins model test

var testmod = document.location.search.slice(1)*1 || 1;
cc("testmod:",testmod);
cc("models:","public,static,protect,private".split(","));
function show(i,c){"use strict";
	cc("show for ins "+i.name+"i");
	cc("inside:",i.show(i.name));
	cc("outside:",[i.pub,c.sta,i.pro,i.pri,i.prif]);
}
switch(testmod){
	case 1:
		show(new a(),a);
	break;
	case 2:
		show(new a(),a);
		show(new b(),b);
	break;	
	case 3:
		show(new b(),b);
	break;	
	case 4:
		show(new a(),a);
		show(new b(),b);
		show(new c(),c);
	break;	
	case 5:
		show(new b(),b);
		show(new c(),c);
	break;
	case 6:
		show(new a(),a);
		show(new c(),c);
		show(new d(),d);
	break;	
}