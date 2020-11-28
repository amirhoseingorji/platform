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
