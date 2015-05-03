(function() {
	stack_chart = function(filename,catagory,columns){
		d3.csv(filename,function(data){
  // var order = ["Federal","State","Local"]
  var d = [];
  d.push(data.map(function(d,i){return {x:+d.year,y:+d.a/1000000,z:0};}));
  d.push(data.map(function(d,i){return {x:+d.year,y:+d.b/1000000,z:1};}));
  d.push(data.map(function(d,i){return {x:+d.year,y:+d.c/1000000,z:2};}));
  console.log(d);

var n = 3, // number of layers
    m = [2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012], // number of samples per layer
    stack = d3.layout.stack(),

    layers = stack(d),
    yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
    yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });
    console.log(yGroupMax,yStackMax);


var margin = {top: 20, right: 250, bottom: 30, left: 100},
    // width = 1000 - margin.left - margin.right,
    // height = 500 - margin.top - margin.bottom;
    width = 960,
    height = 400;

var x = d3.scale.ordinal()
    .domain(m)
    .rangeRoundBands([margin.left, width-margin.right], .08);
    // console.log(x(2002));

var y = d3.scale.linear()
    .domain([0, yStackMax])
    .range([height-margin.bottom, margin.top]);

var color = d3.scale.ordinal().range(["#733700", "#f2963f", "#fcead8"]);


var xAxis = d3.svg.axis()
    .scale(x)
    .tickSize(0)
    .tickPadding(6)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("#stackchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var layer = svg.selectAll(".layer")
    .data(layers)
  .enter().append("g")
    .attr("class", "layer")
    .style("fill", function(d, i) { return color(i); });

var rect = layer.selectAll("rect")
    .data(function(d) { return d; })
  .enter().append("rect")
    .attr("x", function(d) { return x(d.x); })
    .attr("y", height-margin.bottom)
    .attr("width", x.rangeBand())
    .attr("height", 0)
    .on("mouseover", function(d,i) {

                            var mouse_coordinates = d3.mouse(this);
                            var xPosition = mouse_coordinates[0]+100;
                            var yPosition = mouse_coordinates[1]-20;

                            //Update the tooltip position and value
                            d3.select("#tooltip")
                                .style("left", xPosition+"px")
                                .style("top", yPosition+"px")                        
                                .select("#catagory")
                                .text(columns[+d.z]);

                            //Update the tooltip position and value
                            d3.select("#tooltip")                   
                                .select("#year")
                                .text("in "+ d.x);

                            //Update the tooltip position and value
                            d3.select("#tooltip")                   
                                .select("#value")
                                .text(d.y.toFixed(1) + " billions");

                            //Show the tooltip
                            d3.select("#tooltip").classed("hidden", false);
                    })
                    .on("mouseout", function(d,i) {
                            //Hide the tooltip
                            d3.select("#tooltip").classed("hidden", true);
                    });

rect.transition()
    .delay(function(d, i) { return i * 10; })
    .attr("y", function(d) { return y(d.y0 + d.y); })
    .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height-margin.bottom) + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(yAxis);

                    svg.append("rect")
                        .attr("x", 830)
                        .attr("y", 100)
                        .attr("width", 80)
                        .attr("height", 25)
                        .attr("fill", color(0));
                    svg.append("rect")
                        .attr("x", 830)
                        .attr("y", 150)
                        .attr("width", 80)
                        .attr("height", 25)
                        .attr("fill", color(1));
                    svg.append("rect")
                        .attr("x", 830)
                        .attr("y", 200)
                        .attr("width", 80)
                        .attr("height", 25)
                        .attr("fill", color(2));

                    svg.append("text")
                        .text("Billions of dollars")
                        .attr("x", 30)
                        .attr("y", 0);
                    svg.append("text")
                        .text("Year")
                        .attr("x", 400)
                        .attr("y", height);

                    svg.append("text")
                        .text(columns[0])
                        .attr("x", 930)
                        .attr("y", 115);
                    svg.append("text")
                        .text(columns[1])
                        .attr("x", 930)
                        .attr("y", 165);
                    svg.append("text")
                        .text(columns[2])
                        .attr("x", 930)
                        .attr("y", 215);

d3.selectAll("input").on("change", change);

var timeout = setTimeout(function() {
  d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
}, 2000);

function change() {
  clearTimeout(timeout);
  if (this.value === "grouped") transitionGrouped();
  else transitionStacked();
}

function transitionGrouped() {
  y.domain([0, yGroupMax]);

  rect.transition()
      .duration(500)
      .delay(function(d, i) { return i * 10; })
      .attr("x", function(d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
      .attr("width", x.rangeBand() / n)
    .transition()
      .attr("y", function(d) { return y(d.y); })
      .attr("height", function(d) { return height-margin.bottom - y(d.y); });
                  //Update Y axis 
  y.domain([0, yGroupMax]);
  svg.select(".y.axis")
                    .transition()
                    .duration(1000)
                    .call(yAxis);
}

function transitionStacked() {
  y.domain([0, yStackMax]);

  rect.transition()
      .duration(500)
      .delay(function(d, i) { return i * 10; })
      .attr("y", function(d) { return y(d.y0 + d.y); })
      .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
    .transition()
      .attr("x", function(d) { return x(d.x); })
      .attr("width", x.rangeBand());

  svg.select(".y.axis")
                    .transition()
                    .duration(1000)
                    .call(yAxis);
}
});
	}

})();       