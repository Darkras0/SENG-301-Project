//input a genre name, the output will be the corresponding URL part for that genre when searching
//if the genre does not exist, the output will be a blank string
function genreURL(genre, callback) {
	var result;
	
	switch (genre) {
		case "Action":
			result = "&genre[]=1";
			break;
		case "Adventure":
			result = "&genre[]=2";
			break;
		case "Cars":
			result = "&genre[]=3";
			break;
		case "Comedy":
			result = "&genre[]=4";
			break;
		case "Dementia":
			result = "&genre[]=5";
			break;
		case "Demons":
			result = "&genre[]=6";
			break;
		case "Drama":
			result = "&genre[]=8";
			break;
		case "Ecchi":
			result = "&genre[]=9";
			break;
		case "Fantasy":
			result = "&genre[]=10";
			break;
		case "Game":
			result = "&genre[]=11";
			break;
		case "Harem":
			result = "&genre[]=35";
			break;
		case "Hentai":
			result = "&genre[]=12";
			break;
		case "Historical":
			result = "&genre[]=13";
			break;
		case "Horror":
			result = "&genre[]=14";
			break;
		case "Josei":
			result = "&genre[]=43";
			break;
		case "Kids":
			result = "&genre[]=15";
			break;
		case "Magic":
			result = "&genre[]=16";
			break;
		case "Martial Arts":
			result = "&genre[]=17";
			break;
		case "Mecha":
			result = "&genre[]=18";
			break;
		case "Military":
			result = "&genre[]=38";
			break;
		case "Music":
			result = "&genre[]=19";
			break;
		case "Mystery":
			result = "&genre[]=7";
			break;
		case "Parody":
			result = "&genre[]=20";
			break;
		case "Police":
			result = "&genre[]=39";
			break;
		case "Psychological":
			result = "&genre[]=40";
			break;
		case "Romance":
			result = "&genre[]=22";
			break;
		case "Samurai":
			result = "&genre[]=21";
			break;
		case "School":
			result = "&genre[]=23";
			break;
		case "Sci-Fi":
			result = "&genre[]=24";
			break;
		case "Seinen":
			result = "&genre[]=42";
			break;
		case "Shoujo":
			result = "&genre[]=25";
			break;
		case "Shoujo Ai":
			result = "&genre[]=26";
			break;
		case "Shounen":
			result = "&genre[]=27";
			break;
		case "Shounen Ai":
			result = "&genre[]=28";
			break;
		case "Slice of Life":
			result = "&genre[]=36";
			break;
		case "Space":
			result = "&genre[]=29";
			break;
		case "Sports":
			result = "&genre[]=30";
			break;
		case "Super Power":
			result = "&genre[]=31";
			break;
		case "Supernatural":
			result = "&genre[]=37";
			break;
		case "Thriller":
			result = "&genre[]=41";
			break;
		case "Vampire":
			result = "&genre[]=32";
			break;
		case "Yaoi":
			result = "&genre[]=33";
			break;
		case "Yuri":
			result = "&genre[]=34";
			break;
		default:
			result = "";
	}
	//return result;
	//alert(result);
	callback(result);
}