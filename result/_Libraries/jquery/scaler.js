var hlms = [960,720,480],left,lmas=150,lmsi=0,right=0,left=0,scale=1,scalers=[];
function scaler(selector){
	var h = window.innerHeight,w = window.innerWidth,p='',or="margin-left";
	if(h>w){ww = w;w=h;h=ww;p=" rotate(90deg)"}
	lmsi = 0;//Math.min(2,Math.max(0,4-Math.round(4*h/hlms[0])))
	scale = h/hlms[lmsi]
	$(selector).height(hlms[lmsi])
	$(selector).width(hlms[lmsi]*16/9)
	if(p){p+=" translateY(-"+hlms[lmsi]+"px)",or="margin-top"}
	left = hlms[lmsi]*(16/9)*scale<w ? w/2-(hlms[lmsi]*8/9)*scale : -1*lmas*hlms[lmsi]/hlms[0]*(hlms[lmsi]*16/9*scale-w)/(hlms[lmsi]*4/9) 
	right = left>0?0:(hlms[lmsi]*16/9-w/scale)
	$(selector).css({transform:"scale("+scale+")"+p});
	$(selector).css({"transform-origin":"0 0"});
	$(selector).css({"-moz-transform-origin":"0 0"});
	$(selector).css({"-moz-transform":"scale("+scale+")"+p});
	$(selector).css({"margin-left":"0px","margin-top":"0px"});
	$(selector).css(or,left+"px")
	for(i in scalers){scalers[i]()}
}
scaler(".scaler");
//scaler(".pace");
$(window).resize(function(){scaler(".scaler")})
