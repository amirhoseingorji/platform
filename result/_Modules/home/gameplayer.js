class _{
   constructor() {
	   var _=this._ = this.constructor;var _op = Object.getPrototypeOf;
	   	if(_op(_).name && !_.defined){
			delete _op(this).constructor;eval("new "+_op(_).name+"()");
	   } 
	   _.defined = true
	   console.log(_._clname,_.name)
	  if(_._clname!= _.name){
		 
		  _.clname = _.name
	  } else{
		  console.log("eq _")
	  }
	   console.log(this._clname,this.name)
	   	  if(this._clname!= _.name){
		  
		  this.clname = _.name
	  } else{
		  console.log("eq this",_.name)
	  }

	   
		
		this._public= "r";
/*	   var _$=($,$$)=>{$.fn = $$;$.fn();delete $.fn}  
	   if (_._st) _._st.forEach((e)=>{_[e]=undefined;});_._st=[];
	   if (this._public )  {this._public()};;
	   if (this._private) {this._private();delete _op(this)._private;};
	   if (this._protect) {_$(_,this._protect);_$(_op(_),this._protect);};
	   if (this._static )  {
		   var _v = Object.keys(_);_$(_,this._static);delete _op(this)._static;
		   _._st =  Object.keys(_).filter((i)=>{return _v.indexOf(i)<0;})
	   };*/
	   
	   
	   //new _op(_)
	 //  delete _op(this).constructor;new _(class extends_{});
   }
	//this is set _public & _private & _protect & _static data sets for vars and funcs
}



class a extends _{
	// this is way for set public vars an methods that is available in all of instances and extended classes
	//_public method is same is defined vars in constructor and methods thats create in root of class
	 _public(){
		this.publicVar = "a public var";
		this.publicFunc =  function(){
			return "a public method";
		};
	 }
	//this is another method to set vars and methods that be available in all instances but it is not available in extended classs for example class b or its exetends!
	_private(){
		this.privateVar = "a private var";
		this.privateFunc =  function(){
			return "a private method";
		};
	 }
	//_protect method is set its vars and methods to class object that is not available in instances but all extended classes can acces this vars and methods by their clasess objects and its parent class same as php protect methods.
	// methods that is called in this way is same as static methods in root of class
	_protect(){
		this.protectVar = "a protect var";
		this.protectFunc =  function(){
			return "a protect method";
		};
	 }
	//_static is same as _protect by diffrence that its vars and methods not available in extended  classes and instatnses
	_static(){
		this.staticVar = "a static var";
		this.staticFunc = function(){
			return "a static method";
		};
	}
	//examples of access of this vars and methods in class or constructor:
	metod(){ //or constructor
		console.log("***:logs from method inside class:",this._.name)
		console.log("publicVar:",this.publicVar);
		console.log("publicFunc:",this.publicFunc);
		console.log("privateVar:",this.privateVar);
		console.log("privateFunc:",this.privateFunc);
		//this._ is equal to this.constructor or className object :
		console.log("protectVar:",this._.protectVar);
		console.log("protectFunc:",this._.protectFunc);
		console.log("staticVar:",this._.staticVar);
		console.log("staticFunc:",this._.staticFunc);
	}
}


/*a_instance.metod();
// exmple of access of methods and vars for class object ond instanses
console.log("ext-------------------")
console.log("a_instance publicVar:",a_instance.publicVar);
console.log("a_instance publicFunc:",a_instance.publicFunc);
console.log("a_instance privateVar:",a_instance.privateVar);
console.log("a_instance privateVar:",a_instance.privateFunc);
//instance object cant access protects and statics
console.log("class a protectVar:",a.protectVar);
console.log("class a protectFunc:",a.protectFunc);
console.log("class a staticVar:",a.staticVar);
console.log("class a staticFunc:",a.staticFunc);*/

// class b extended from a
//console.log("********************same log for b extended from a, b_instans and b class");
cc =console.log
cc("_:")
var _instance = new _();
console.log(_instance._public)
var a_instance = new a();
cc("a:")
console.log(a_instance._public)
class b extends a{}
var b_instance = new b();
cc("b:")
console.log(b_instance._public)
class c extends a{}
var c_instance = new c();
cc("c:")
console.log(c_instance._public)
class d extends c{}
var d_instance = new d();
cc("d:")
console.log(d_instance._public)
/*b_instance.metod();
console.log("ext-------------------")
// exmple of access of methods and vars for class object ond instanses
console.log("b_instance publicVar:",b_instance.publicVar);
console.log("b_instance publicFunc:",b_instance.publicFunc);
console.log("b_instance privateVar:",b_instance.privateVar);//undefined
console.log("b_instance privateVar:",b_instance.privateFunc);//undefined
//instance object cant access protects and statics
console.log("class b protectVar:",b.protectVar);
console.log("class b protectFunc:",b.protectFunc);
console.log("class b staticVar:",b.staticVar);
console.log("class b staticFunc:",b.staticFunc);//cant access*/

