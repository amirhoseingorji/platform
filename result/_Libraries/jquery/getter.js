if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
(function() {
		$.ajaxPrefilter(function( options, original_Options, jqXHR ) {
    options.async = true;
});
	$.ajaxSetup({cache: true,async: true});
	var getter = function(d,href,fun,params) {	
			if(href){
			if(href.slice(-3).toLowerCase() =="css"){  
			var scr = d.createElement('link');
			$("head",d).append(scr);
			scr.rel="stylesheet";
			scr.onload = typeof fun=="function" ? fun : function(){};
    		scr.href = href //+"?rnd="+Math.random();
			}else{
    		var scr = d.createElement('script');
			$("head",d).append(scr);
			scr.onload = typeof fun=="function" ? fun : function(){};
			scr.src = href  //+"?rnd="+Math.random();
			}	}
	};
	jQuery.getter = getter;
	function multiGetter(ar,d,f){
	d = d?d:document;
	f = f ? 1:0;
	if(d!=document && !f){
		for(i in CSSs) ar.push(CSSs[i])
	}
    for(var i in ar){
        if(!Array.isArray(ar[i])){
            $.getter(d,ar[i])
        }else if (typeof ar[i][1] == "function"){
			$.getter(d,ar[i][0],ar[i][1],ar[i][2])
		}else{
            $.getter(d,ar[i][0]+"#id="+i,function(e){
				ad = (e.target.src) ? e.target.src: e.target.href
                multiGetter([ar[1*(ad.split("id=")[1])][1]],d,true)
        	})
        }
    }
	}
	jQuery.multiGetter = multiGetter;
})();
