
//width and height of the canvas
var w = 500;
var h = 500;

//make an SVG element and append it to the body
var svg = d3.select("body")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

/*
 * grab jsonp file of recent tracks added to the FMA archive
 * see http://freemusicarchive.org/api/docs/ for more details
 */

function requestRecentTracks() {
  d3.jsonp("http://freemusicarchive.org/recent.jsonp?callback=foo");
}

function foo(data){
	var result = {}; 
	for(var i = 0; i < data.aTracks.length; i++){
		
		/*
		 * count the # of times an artist appears
		 * store it in the result object
		 * because the value (result[key]) will be used as the radius of the circle
		 */
		if(!result[data.aTracks[i].artist_name])
	        result[data.aTracks[i].artist_name] = 0;
	    	++result[data.aTracks[i].artist_name];
	    
	}
	
	/*
	 * draw circle with radius proportional to 
	 * the number of tracks by the artist that have been recently added.
	 */
	for(key in result){
		svg.append("circle")
			//come up with a more sustainable styling option because this isn't going to work when there are tracks by many different artists.
			.attr({
				"r":result[key]*2.5,  
				"cy":result[key]*10,
				"cx":result[key]*i+10
			})
			.style({
				"stroke": function(d,i){return "rgb(221, 65," + (result[key] * 16) +" )";},
				"fill":"none",
				"stroke-width":2
			})
			.append("text")
			.text(key)
			.style({
					"fill": "black",
      				"font-family": "Helvetica",
      				"font-size": "12px"
			})
			

		console.log(key);
		console.log(result[key]);
	}
		
	
	
}

requestRecentTracks();
/* http://jsonviewer.stack.hu/#http://freemusicarchive.org/recent.jsonp

 */
