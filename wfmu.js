

//Width and height of the canvas
var w = 1000;
var h = 500;

//Create SVG element
var svg = d3.select("body")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

//Get recent tracks added to the FMA archive
function requestRecentTracks() {
  d3.jsonp("http://freemusicarchive.org/recent.jsonp?callback=foo");
}

function foo(data){
	
	svg.selectAll("text")
		.data(data.aTracks)
		.enter()
		.append("text")
		.text(function(d){
			return d.track_title + " - " + d.track_file_url;
		})
		.attr("y",function(d,i){
			return i*20;
		})
	
	
}

requestRecentTracks();
