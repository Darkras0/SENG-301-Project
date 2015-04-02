//call this function with: var a = userResults(username)
//input argument is a string containing a user's MAL username
//the value returned will be a multidimensional array
//each entry in the results will be an array pertaining to one anime found in the user's list
//for each element n in the array:
//results[n][0] will be the animeID corresponding to the anime
//results[n][1] will be the anime's title
//results[n][2] will be the score that the user gave the anime
//the array will be sorted by scores, from highest (10) to lowest (0)
//anything with a score of 0 means the user did not give it a score - these entries will not be in the returned array 

// make sure you have <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js" ></script> in the html file
	// replace this with the url needed
	var your_url = 'http://myanimelist.net/malappinfo.php?u=itachi0970&status=all&type=anime';
	
function removeBrackets(input) {
	return input
		.replace(/<.*?>/g, "");
}

function userResults(username, callback) {
	
	var results;
	
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
		url: 'http://myanimelist.net/malappinfo.php?u=' + username + '&status=all&type=anime',
		type: 'GET',
		dataType: 'xml',
		success: function(res) {
			var text = res.responseText;
			//document.write(text);
			// then you can manipulate your text as you wish
			results = [];
			var numAnime = [];
			var n1 = text.indexOf("<user_watching>");
			var n2 = text.indexOf("</user_watching>");
			n1 += 15;
			var s1 = text.substring(n1, n2);
			numAnime[0] = s1;
			n1 = text.indexOf("<user_completed>");
			n2 = text.indexOf("</user_completed>");
			n1 += 16;
			s1 = text.substring(n1, n2);
			numAnime[1] = s1;
			n1 = text.indexOf("<user_onhold>");
			n2 = text.indexOf("</user_onhold>");
			n1 += 13;
			s1 = text.substring(n1, n2);
			numAnime[2] = s1;
			n1 = text.indexOf("<user_dropped>");
			n2 = text.indexOf("</user_dropped>");
			n1 += 14;
			s1 = text.substring(n1, n2);
			numAnime[3] = s1;
			n1 = text.indexOf("<user_plantowatch>");
			n2 = text.indexOf("</user_plantowatch>");
			n1 += 18;
			s1 = text.substring(n1, n2);
			numAnime[4] = s1;
			var finalNum = 0;
			for (var i = 0; i < numAnime.length; i++) {
				numAnime[i] = parseInt(numAnime[i]);
				finalNum += numAnime[i];
			}
			var counter = 0;
			for (var i = 0; i < finalNum; i++) {
				results[i] = [];
				var id1 = text.indexOf("<series_animedb_id>", counter);
				var id2 = text.indexOf("</series_animedb_id>", counter);
				id1 += 19;
				var id3 = text.substring(id1, id2);
				results[i][0] = id3;
				var title1 = text.indexOf("<series_title>", counter);
				var title2 = text.indexOf("</series_title>", counter);
				title1 += 14;
				var title3 = text.substring(title1, title2);
				results[i][1] = title3;
				var score1 = text.indexOf("<my_score>", counter);
				var score2 = text.indexOf("</my_score>", counter);
				score1 += 10;
				var score3 = text.substring(score1, score2);
				results[i][2] = score3;
				counter = score2+1;
			}
			for (var i = results.length - 1; i >= 0; i--) {
				if (parseInt(results[i][2]) == 0) {
					//document.write(results[i][2]);
					results.splice(i,1);
				}
			}
			//alert(results);
			results = results.sort(function(a,b) {
				return parseInt(a[2]) < parseInt(b[2]);
			});
			
			results.splice(0,1);
			results.splice(results.length-2,2);
			
			//alert(results);
			//return results;
			callback(results);
			
			// results now contains an array of the anime that matched the search results, sorted by user score in descending order.
			// it is a multidimensional array:
			// each element is an array of 3 elements: 0 is the anime id, 1 is the anime title, and 2 is the user's score
		}
	});
	
	//return results;
	//callback(results);
}