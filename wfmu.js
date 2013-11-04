
//width and height of the canvas
var w =  document.body.clientWidth;
var h =  w/2;
var cx = 20;
var r = 10;
var row = document.body.clientWidth / (r/2);


/* http://jsonviewer.stack.hu/#http://freemusicarchive.org/recent.jsonp? */

/*
 * grab json file of recent tracks added to the FMA archive
 * see http://freemusicarchive.org/api/docs/ for more details
 */
function requestRecentTracks() {
  d3.jsonp("http://freemusicarchive.org/recent.jsonp?callback=foo");
}


var link = {
			edges: [
					{source: 0, target: 20},
					{source: 1, target: 20},
					{source: 2, target: 20},
					{source: 3, target: 20},
					{source: 4, target: 20},
					{source: 5, target: 20},
					{source: 6, target: 20},
					{source: 7, target: 20},
					{source: 8, target: 20},
					{source: 9, target: 20},
					{source: 10, target: 20},
					{source: 11, target: 20},
					{source: 12, target: 20},
					{source: 13, target: 20},
					{source: 14, target: 20},
					{source: 15, target: 20},
					{source: 16, target: 20},
					{source: 17, target: 20},
					{source: 18, target: 20},
					{source: 19, target: 20}					
				]
			};

function foo(data){
	
	 var result = {};
        for(var i = 0; i < data.aTracks.length; i++){
         	if(i==19){
         		data.aTracks.push("Parent");
         	}
           
        }

	//make an SVG element and append it to the article
	 var svg = d3.select("article")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	//add circles for every new track	
   	 svg.selectAll("circle")
		.data(data.aTracks)
		.enter()
		.append("g")	
		.append("circle").attr("r",r)
		/*.attr({"r":r,
		       "cy":200,
		       "cx": function(d,i){
		       	return  (i % row) * (r*2);
		       }
		      })*/
		
		.style("fill","red");

     var force = d3.layout.force()
     	.nodes(data.aTracks)
		
}

requestRecentTracks();