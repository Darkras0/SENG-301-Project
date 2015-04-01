//call this function with: var a = searchResults(title, genres)
//to call this function requires two input arguments: title and genres
//if you don't want to use a title, make the first argument ''
//the title can be any string
//if you don't want to use genres, make the second argument ''
//the genres must be in the form of a single string: &genre[]=n&genre[]=m&genre[]=p etc., where n/m/p are the numbers corresponding to each genre
//e.g. &genre[]=1 is action, &genre[]=2 is adventure
//the value returned will be an array of strings containing the first 5 anime titles that appear after searching
//each string will be in the form: /anime/n/m	found at the end of the url on a specific anime's page
//if there are less than 5 results, the results will start repeating in the array

// make sure you have <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js" ></script> in the html file
	
function removeBrackets(input) {
	return input
		.replace(/<.*?>/g, "");
}

function searchResults(title, genres, callback) {
	
	var results = [];
	
	// jquery.xdomainajax.js  ------ from padolsey

	jQuery.ajax = (function(_ajax){

		var protocol = location.protocol,
			hostname = location.hostname,
			exRegex = RegExp(protocol + '//' + hostname),
			YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
			query = 'select * from html where url="{URL}" and xpath="*"';

		function isExternal(url) {
			return !exRegex.test(url) && /:\/\//.test(url);
		}

		return function(o) {

			var url = o.url;

			if ( /get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url) ) {

				// Manipulate options so that JSONP-x request is made to YQL

				o.url = YQL;
				o.dataType = 'json';

				o.data = {
					q: query.replace(
						'{URL}',
						url + (o.data ?
							(/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
						: '')
					),
					format: 'xml'
				};

				// Since it's a JSONP request
				// complete === success
				if (!o.success && o.complete) {
					o.success = o.complete;
					delete o.complete;
				}

				o.success = (function(_success){
					return function(data) {

						if (_success) {
							// Fake XHR callback.
							_success.call(this, {
								responseText: data.results[0]
									// YQL screws with <script>s
									// Get rid of them
									.replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
							}, 'success');
						}

					};
				})(o.success);

			}

			return _ajax.apply(this, arguments);

		};

	})(jQuery.ajax);



	$.ajax({
		url: 'http://myanimelist.net/anime.php?q=' + title + '&type=0&score=0&status=0&tag=&p=0&r=0&sm=0&sd=0&sy=0&em=0&ed=0&ey=0&c[]=a&c[]=b&c[]=c&gx=0' + genres + "&o=3&w=1",
		type: 'GET',
		success: function(res) {
			var text = res.responseText;
			// then you can manipulate your text as you wish
			var n3 = 0;
			// edit this line to change how many anime titles are returned.
			for (var i = 0; i < 5; i++){
				var n1 = text.indexOf("picSurround", n3);
				var n2 = text.indexOf("/anime/", n1+1);
				n3 = text.indexOf("\"", n2+1);
				var s1 = text.substring(n2, n3);
				results.push(s1);
			}			
			//document.write(results);
			callback(results);
			//return results;
			// results now contains an array of the anime that matched the search results.
		}
	});
	
	//return results;
	//callback(results);
}