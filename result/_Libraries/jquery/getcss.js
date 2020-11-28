(function() {
	var getCSS = function(href,fun,params) {
			var attrs = {href: href};
			attrs.rel = "stylesheet";
	$.ajax({
    	url: attrs.href,
    	dataType: 'text',
    	success: function(data){  
			$("head").append("<link></link>");
			for(key in attrs) {
				$("head link:last").attr(key, attrsاندیشمند,ریاضی);
			}
			fun(params);
    	}      
	});
	};
	jQuery.getCSS = getCSS;
})();
LoadCSSs();