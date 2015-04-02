var toSearch = "tengen toppa gurren lagann";
function recommendAnimeOnce(toSearch, callback) {
var complete = [];
var f = "";

	searchResults(toSearch, f, function(call1) {

		var a = call1;
		
		
		//this creates a deep copy
		var p = JSON.parse(JSON.stringify(a));
		
		/*for (var i = h.length - 1; i >= 0; i--) {
			var i2 = h[i].indexOf("/",7);
			h[i] = h[i].substring(7,i2);
			for (var j = 0; j < a.length; j++) {
				
				if (h[i] === a[j][0]) {
					p.splice(i,1);
				}
			}
		}*/
		
		//document.write(h);
		var d = "http://myanimelist.net" + a[0];
		var e;
		genreResults(d, function(call2) {
			e = call2;
			var m;
			for (var i = 0; i < e.length; i++) {
				genreURL(e[i], function(call3) {
					m = call3;
				});
				e[i] = m;
				
			}
			
			var f = "";
			for (var i = 0; i < e.length; i++) {
				f = f.concat(e[i]);
			}
			
			var g = "";
			var h;
			var p;
			searchResults(g, f, function(call4) {
				h = call4;
				//alert(h[1]);
				//alert(a[0]);
				var p = JSON.parse(JSON.stringify(h));;
				
				for (var i = h.length - 1; i >= 0; i--) {
					for (var j = 0; j < a.length; j++) {
						if (h[i] == a[j]) {
							//alert(h[0]);
							p.splice(i,1);
						}
					}
				}
				
				//alert(p);
				
				var k = [];
				for (var i = 0; i < p.length; i++) {
					var i2 = p[i].indexOf("/",8);
					k[i] = p[i].substring(i2+1,p[i].length);
					k[i] = k[i].replace(/_/g," ");
				}
				
				
				for (var i = 0; i < k.length; i++) {
					//alert(k[i]);
					complete.push(k[i]);
				}
			});
			
			$(window).bind("load", function() {
				for (var i = complete.length - 1; i >= 0; i--) {
					if (typeof complete[i] == "undefined") {
						complete.splice(i,1);
					}
				}
				callback(complete);
			});
		});
	});

}