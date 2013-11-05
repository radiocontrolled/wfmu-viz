
//width and height of the canvas
var w =  document.body.clientWidth;
var h =  w/2;
var r = 20;


/*
 * grab json file of recent tracks added to the FMA archive
 * see http://freemusicarchive.org/api/docs/ for more details
 */
function requestRecentTracks() {
  d3.jsonp("http://freemusicarchive.org/recent.jsonp?callback=foo");
}


function foo(data){
	
	//make an SVG element and append it to the article
	 var svg = d3.select("article")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	
	//add circles for every new track	
   	var nodes = svg.selectAll("circle")
		.data(data.aTracks)
		.enter()
		.append("circle").attr("r",r)
		.style("fill","#FF6600")
		

		
		        
	 //initialize a force layout
	 var force = d3.layout.force()
     	.nodes(data.aTracks)
     //	.links(link.edges)
     	.size([w, h])
        .linkDistance([500]) 
        .charge([-450])       
    	.start();
    	
    
    
    force.on("tick", function() {

	  	nodes.attr("cx", function(d) { return d.x; })
	      .attr("cy", function(d) { return d.y; })
	      .call(force.drag); //let the nodes be draggable.
		
		});
 
  		
}

requestRecentTracks();