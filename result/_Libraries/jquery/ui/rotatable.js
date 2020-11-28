(function(c){"function"===typeof define&&define.amd?define(["jquery"],c):c(jQuery)})(function(c){c.widget("ui.rotatable",c.ui.mouse,{widgetEventPrefix:"rotate",options:{angle:!1,degrees:!1,handle:!1,handleOffset:{top:0,left:0},radians:!1,rotate:null,rotationCenterOffset:{top:0,left:0},snap:!1,start:null,step:22.5,stop:null,transforms:null,wheelRotate:!0},angle:function(a){if(void 0===a)return this.options.angle;this.elementCurrentAngle=this.options.angle=a;this._performRotation(this.options.angle)},
getElementCenter:function(){null==this.elementCenter&&(this.elementCenter=this._calculateElementCenter());return this.elementCenter},handle:function(a){if(void 0===a)return this.options.handle;this.options.handle=a},plugins:{},rotationCenterOffset:function(a){if(void 0===a)return this.options.rotationCenterOffset;null!==a.top&&(this.options.rotationCenterOffset.top=a.top);null!==a.left&&(this.options.rotationCenterOffset.left=a.left)},rotateElement:function(a){if(!this.element||this.element.disabled||
this.options.disabled)return!1;if(!a.which)return this.stopRotate(a),!1;var b=this._calculateRotateAngle(a),c=this.elementCurrentAngle;this.elementCurrentAngle=b;this._propagate("rotate",a);if(!1===this._propagate("rotate",a))return this.elementCurrentAngle=c,!1;var d=this.ui();if(!1===this._trigger("rotate",a,d))return this.elementCurrentAngle=c,!1;d.angle.current!==b&&(this.elementCurrentAngle=b=d.angle.current);this._performRotation(b);c!==b&&(this.hasRotated=!0);return!1},startRotate:function(a){var b=
this.getElementCenter();this.mouseStartAngle=Math.atan2(a.pageY-b.y,a.pageX-b.x);this.elementStartAngle=this.elementCurrentAngle;this.hasRotated=!1;this._propagate("start",a);c(document).bind("mousemove",this.listeners.rotateElement);c(document).bind("mouseup",this.listeners.stopRotate);return!1},stopRotate:function(a){if(this.element&&!this.element.disabled)return c(document).unbind("mousemove",this.listeners.rotateElement),c(document).unbind("mouseup",this.listeners.stopRotate),this.elementStopAngle=
this.elementCurrentAngle,this._propagate("stop",a),setTimeout(function(){this.element=!1},10),!1},wheelRotate:function(a){var b=this._angleInRadians(Math.round(a.originalEvent.deltaY/10));if(this.options.snap||a.shiftKey)b=this._calculateSnap(b);b=this.elementCurrentAngle+b;this.angle(b);this._trigger("rotate",a,this.ui())},ui:function(){return{api:this,element:this.element,angle:{start:this.elementStartAngle,current:this.elementCurrentAngle,degrees:Math.abs(this._angleInDegrees(this.elementCurrentAngle)),
stop:this.elementStopAngle}}},_angleInRadians:function(a){return a*Math.PI/180},_angleInDegrees:function(a){return 180*a/Math.PI},_calculateElementCenter:function(){var a=this._getElementOffset();if(this._isRotationCenterSet())return{x:a.left+this.rotationCenterOffset().left,y:a.top+this.rotationCenterOffset().top};if(void 0!==this.element.css("transform-origin")){var b=this.element.css("transform-origin").match(/([\d.]+)px +([\d.]+)px/);if(null!=b)return{x:a.left+parseFloat(b[1]),y:a.top+parseFloat(b[2])}}return{x:a.left+
this.element.width()/2,y:a.top+this.element.height()/2}},_calculateSnap:function(a){a=this._angleInDegrees(a);a=Math.round(a/this.options.step)*this.options.step;return this._angleInRadians(a)},_calculateRotateAngle:function(a){var b=this.getElementCenter(),b=Math.atan2(a.pageY-b.y,a.pageX-b.x)-this.mouseStartAngle+this.elementStartAngle;if(this.options.snap||a.shiftKey)b=this._calculateSnap(b);return b},_create:function(){var a;if(this.options.handle)a=this.options.handle;else if(a=c(document.createElement("div")),
a.addClass("ui-rotatable-handle"),0!==this.options.handleOffset.top||0!==this.options.handleOffset.left)a.css("position","relative"),a.css("top",this.options.handleOffset.top+"px"),a.css("left",this.options.handleOffset.left+"px");this.listeners={rotateElement:c.proxy(this.rotateElement,this),startRotate:c.proxy(this.startRotate,this),stopRotate:c.proxy(this.stopRotate,this),wheelRotate:c.proxy(this.wheelRotate,this)};this.options.wheelRotate&&this.element.bind("wheel",this.listeners.wheelRotate);
a.draggable({helper:"clone",start:this._dragStart,handle:a});a.bind("mousedown",this.listeners.startRotate);a.closest(this.element).length||a.appendTo(this.element);this.rotationCenterOffset(this.options.rotationCenterOffset);this.options.degrees&&(this.elementCurrentAngle=this._angleInRadians(this.options.degrees));this.elementCurrentAngle=this.options.radians||this.options.angle||0;this._performRotation(this.elementCurrentAngle)},_destroy:function(){this.element.removeClass("ui-rotatable");this.element.find(".ui-rotatable-handle").remove();
this.options.wheelRotate&&this.element.unbind("wheel",this.listeners.wheelRotate)},_dragStart:function(a){if(this.element)return!1},_getElementOffset:function(){this._performRotation(0);var a=this.element.offset();this._performRotation(this.elementCurrentAngle);return a},_getTransforms:function(a){a="rotate("+a+"rad)";if(this.options.transforms){var b,c=this.options.transforms,d=[];for(b in c)c.hasOwnProperty(b)&&c[b]&&d.push(b+"("+c[b]+")");b=d.join(" ");a+=" "+b}return a},_isRotationCenterSet:function(){return 0!==
this.options.rotationCenterOffset.top||0!==this.options.rotationCenterOffset.left},_performRotation:function(a){this._isRotationCenterSet()&&(this.element.css("transform-origin",this.options.rotationCenterOffset.left+"px "+this.options.rotationCenterOffset.top+"px"),this.element.css("-ms-transform-origin",this.options.rotationCenterOffset.left+"px "+this.options.rotationCenterOffset.top+"px"),this.element.css("-webkit-transform-origin",this.options.rotationCenterOffset.left+"px "+this.options.rotationCenterOffset+
"px"));a=this._getTransforms(a);this.element.css("transform",a);this.element.css("-moz-transform",a);this.element.css("-webkit-transform",a);this.element.css("-o-transform",a)},_propagate:function(a,b){c.ui.plugin.call(this,a,[b,this.ui()]);"rotate"!==a&&this._trigger(a,b,this.ui())}});return c.ui.rotatable});