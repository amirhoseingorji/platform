function def(vars,defvars){"use strict";return (vars!==undefined) && !isNaN(vars)?vars:defvars;}
SVG.extend(SVG.Polyline, SVG.Polygon, SVG.FX, {
  star: function (settings) {"use strict";
    var box = (this.target ? this.target() : this).bbox();
	def(settings.x,box.x);def(settings.y,box.y);
    return this.plot(SVG.shapes.star(settings));
  },
  ngon: function(settings) {"use strict";
    var box = (this.target ? this.target() : this).bbox();
	def(settings.x,box.x);def(settings.y,box.y);
    return this.plot(SVG.shapes.ngon(settings));
  },
  rhomboid: function(settings) {"use strict";
    var box = (this.target ? this.target() : this).bbox();
	def(settings.x,box.x);def(settings.y,box.y);
    return this.plot(SVG.shapes.rhomboid(settings));
  },
  parallelogram: function(settings) {"use strict";
    var box = (this.target ? this.target() : this).bbox();
	def(settings.x,box.x);def(settings.y,box.y);
    return this.plot(SVG.shapes.parallelogram(settings));
  },
  trapezoid: function(settings) {"use strict";
    var box = (this.target ? this.target() : this).bbox();
	def(settings.x,box.x);def(settings.y,box.y);
    return this.plot(SVG.shapes.trapezoid(settings));
  },
  rect: function(settings) {"use strict";
    var box = (this.target ? this.target() : this).bbox();
	def(settings.x,box.x);def(settings.y,box.y);
    return this.plot(SVG.shapes.rect(settings));
  },
  square: function(settings) {"use strict";
    var box = (this.target ? this.target() : this).bbox();
	def(settings.x,box.x);def(settings.y,box.y);
    return this.plot(SVG.shapes.square(settings));
  }
});


SVG.shapes = {
  star: function(settings) {"use strict";
    settings = settings || {};
	var defaults = {
		n: 5,
  		r2:  50,
  		r1:  100
	},i, a, x, y,
      points  = [],
      n  = def(settings.n,defaults.n),
      r2 = def(settings.r2,defaults.r2),
      r1 = def(settings.r1,defaults.r1),
	  X  = def(settings.x,0),
	  Y  = def(settings.y,0),
      degrees = 360 / n;
    for (i = 0; i < n; i++) {
      a = i * degrees + 90;
      x = X+r1 + r2 * Math.cos(a * Math.PI / 180);
      y = Y+r1 + r2 * Math.sin(a * Math.PI / 180);
      points.push([x, y]);
      a += degrees / 2;
      x = X+r1*(1+Math.cos(a * Math.PI / 180));
      y = Y+r1*(1+Math.sin(a * Math.PI / 180));
      points.push([x, y]);
    }
    return new SVG.PointArray(points);
  },
 ngon: function(settings) {	"use strict";
   	settings = settings || {};
	var defaults= {
	n:  7,
  	r: 100
  	},i, a, x, y,
      points  = [],
      n = def(settings.n,defaults.n),
      r = def(settings.r,defaults.r),
	  X = def(settings.x,0),
	  Y = def(settings.y,0),
      degrees = 360 / n;
    for (i = 0; i < n; i++) {
      a = i * degrees - 90;
      x = X+r *(1+Math.cos(a * Math.PI / 180));
      y = Y+r *(1+Math.sin(a * Math.PI / 180));
      points.push([x, y]);
    }
    return new SVG.PointArray(points);
  },
  rect: function(settings) {"use strict";
   	settings = settings || {};
	var defaults= {
	width : 50,
  	height: 25,
  	},
      points  = [],
      w = def(settings.width,defaults.width),
      h = def(settings.height,defaults.height),
	  X = def(settings.x,0),
	  Y = def(settings.y,0);
    points.push([X, Y],[X+w, Y],[X+w, Y+h],[X, Y+h]);
    return new SVG.PointArray(points);
  },
  square: function(settings) {"use strict";
   	settings = settings || {};
	var defaults= {
	width : 50,
  	},
      points  = [],
      w = def(settings.width,defaults.width),
	  X = def(settings.x,0),
	  Y = def(settings.y,0);
    points.push([X, Y],[X+w, Y],[X+w, Y+w],[X, Y+w]);
    return new SVG.PointArray(points);
  },
  rhomboid: function(settings) {"use strict";
   	settings = settings || {};
	var defaults= {
	width : 50,
  	height: 25,
  	},
      points  = [],
      w = def(settings.width,defaults.width),
      h = def(settings.height,defaults.height),
	  X = def(settings.x,0),
	  Y = def(settings.y,0);
    points.push([X+w/2, Y],[X+w, Y+h/2],[X+w/2, Y+h],[X, Y+h/2]);
    return new SVG.PointArray(points);
  },
  parallelogram: function(settings) {"use strict";
   	settings = settings || {};
	var defaults= {
	width : 50,
  	height: 25,
	degree : 45,
  	},
      points  = [],
      w = def(settings.width,defaults.width),
      h = def(settings.height,defaults.height),
	  deg = def(settings.degree,defaults.degree),
	  X = def(settings.x,0),
	  Y = def(settings.y,0),
	  wp = h*Math.cos(deg * Math.PI / 180);
    points.push([X,Y],[X+w-wp, Y],[X+w, Y+h],[X+wp, Y+h]);
    return new SVG.PointArray(points);
  },
  trapezoid: function(settings) {"use strict";
   	settings = settings || {};
	var defaults= {
	width : 50,
  	height: 25,
	degree1 : 45,
	degree2 : 45
  	},
      points  = [],
      h = def(settings.height,defaults.height),
	  deg1 = def(settings.degree1,defaults.degree1),
	  deg2 = def(settings.degree1,defaults.degree1),
	  X = def(settings.x,0),
	  Y = def(settings.y,0),
	  w = def(settings.width,defaults.width),
	  sgn = Math.sign(w),
	  wp1 = Math.abs(h)*Math.cos(deg1 * Math.PI / 180),
	  wp2 = Math.abs(h)*Math.cos(deg2 * Math.PI / 180);
	  w = Math.max(wp1+10,wp2+10,w,-w,-10-wp1,-10-wp2)*sgn;
    points.push([X,Y],[X+w-wp2, Y],[X+w, Y+h],[X-wp1, Y+h]);
    return new SVG.PointArray(points);
  }
};
