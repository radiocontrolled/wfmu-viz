
//width and height of the canvas
var w =  document.body.clientWidth;
var h =  w/2;
var cx = 20;
var r = 10;
var row = document.body.clientWidth / (r/2);


/*
 * grab json file of recent tracks added to the FMA archive
 * see http://freemusicarchive.org/api/docs/ for more details
 */
function requestRecentTracks() {
  d3.jsonp("http://freemusicarchive.org/recent.jsonp?callback=foo");
}



function foo(data){
	
	 var result = {};
        for(var i = 0; i < data.aTracks.length; i++){
         	if(i==19){
         		data.aTracks.push("Parent");
         	}
           
        }
        
     var link = {
			edges: [
					{source: 0, target: 19},
					{source: 1, target: 19},
					{source: 2, target: 19},
					{source: 3, target: 19},
					{source: 4, target: 19},
					{source: 5, target: 19},
					{source: 6, target: 19},
					{source: 7, target: 19},
					{source: 8, target: 19},
					{source: 9, target: 19},
					{source: 10, target: 19},
					{source: 11, target: 19},
					{source: 12, target: 19},
					{source: 13, target: 19},
					{source: 14, target: 19},
					{source: 15, target: 19},
					{source: 16, target: 19},
					{source: 17, target: 19},
					{source: 18, target: 19},
					{source: 19, target: 19}					
				]
			};


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
		.style("fill","red")
		
		
	
	
		
	// Create an SVG line for each edge
	var edges = svg.selectAll("line")
		 .data(link.edges)
		 .enter()
		 .append("line")
		 .style("stroke", "#ccc")
		 .style("stroke-width", 1);
		
		        
	 //initialize a force layout
	 var force = d3.layout.force()
     	.nodes(data.aTracks)
     	.links(link.edges)
     	.size([w, h])
        .linkDistance([200]) //distance between the nodes 
        .charge([-150])     // repelling between the nodes       
    	.start();
    	
    
    
    force.on("tick", function() {
    	
    	edges.attr("x1", function(d) { return d.source.x; })
	      .attr("y1", function(d) { return d.source.y; })
	      .attr("x2", function(d) { return d.target.x; })
	      .attr("y2", function(d) { return d.target.y; });

	  	nodes.attr("cx", function(d) { return d.x; })
	      .attr("cy", function(d) { return d.y; })
	      .call(force.drag); //let the nodes be draggable.
		
		});
 
  		
}

requestRecentTracks();