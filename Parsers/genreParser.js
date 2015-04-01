// call this function with: var a = genreResults(titleURL)
// input argument must be in the form of a string: /anime/n/m	found at the end of the url on a specific anime's page
// the value returned will be an array of strings, where each string is one of the genres for that anime

// make sure you have <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js" ></script> in the html file
	
function removeBrackets(input) {
	return input
		.replace(/<.*?>/g, "");
}

function genreResults(urlTitle) {
	
	var result;

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
		url: 'http://myanimelist.net' + urlTitle,
		type: 'GET',
		success: function(res) {
			var text = res.responseText;
			// then you can manipulate your text as you wish
			var n = text.search("Genres:");
			// if n = -1, the page does not have the word "Genres:" on it.
			var m = text.search("Duration:");
			var gen = text.substring(n, m);
			gen = removeBrackets(gen);
			var gen2 = gen.split(":");
			var gen3 = gen2[1];
			result = gen3.split(",");
			// result now contains an array of all the genres for the anime.
		}
	});
	
	return result;
}