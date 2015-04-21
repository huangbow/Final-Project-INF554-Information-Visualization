	var revenue = {};
	revenue.draw = function(name) {
	var w = 400;
        var h = 300;
        var margin = { left: w/8, other:w/10 }
        var width = w/44;

        //Create SVG element
        var svg = d3.select("#charts")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

        var dataset = [];
        var average = [];
        var sign = 1;
        var name = "California";

        d3.json("expend.json", function(json) { 
            for (var i = 0; i < json.length; i++){
                if (json[i].country == name){
                    dataset.push(+json[i].YR2002);
                    dataset.push(+json[i].YR2003);
                    dataset.push(+json[i].YR2004);
                    dataset.push(+json[i].YR2005);
                    dataset.push(+json[i].YR2006);
                    dataset.push(+json[i].YR2007);
                    dataset.push(+json[i].YR2008);
                    dataset.push(+json[i].YR2009);
                    dataset.push(+json[i].YR2010);
                    dataset.push(+json[i].YR2011);
                    dataset.push(+json[i].YR2012);
                    }
                if (json[i].country == "Average"){
                    average.push(+json[i].YR2002);
                    average.push(+json[i].YR2003);
                    average.push(+json[i].YR2004);
                    average.push(+json[i].YR2005);
                    average.push(+json[i].YR2006);
                    average.push(+json[i].YR2007);
                    average.push(+json[i].YR2008);
                    average.push(+json[i].YR2009);
                    average.push(+json[i].YR2010);
                    average.push(+json[i].YR2011);
                    average.push(+json[i].YR2012);
                    }
            }
            console.log(dataset); //Log output to console
            console.log(average);

            min_data = d3.min(dataset, function(d) { return d; })
            max_data = d3.max(dataset, function(d) { return d; })
            min_avg = d3.min(average, function(d) { return d; })
            max_avg = d3.max(average, function(d) { return d; })
            Min = Math.min(min_data,min_avg)
            Max = Math.max(max_data,max_avg)

            var xScale = d3.scale.ordinal()
                    .domain([2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012])
                    .rangeBands([margin.left, w-margin.other]);

            var yScale = d3.scale.linear()
                    .domain([min_data*0.9, max_data*1.05])
                    .range([h - margin.other, margin.other]);

            //Define X axis
            var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .ticks(11);

            //Define Y axis
            var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(8);

            svg.selectAll("whatever")
                    .data(dataset)
                    .enter()
                    .append("rect")
                    .attr("x", function(d, i) {
                        return (xScale(2002+i) + xScale.rangeBand()/2 - width/2);
                    })
                    .attr("y", function(d) {
                        return yScale(d);
                    })
                    .attr("width", width)
                    .attr("height", function(d) {
                        return yScale(min_data*0.9)-yScale(d);
                    })
                    .attr("fill", function(d) {
                        return "rgb(62, 237, 231)";
                    });

            //Create X axis
            svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + (h - margin.other) + ")")
                    .call(xAxis);
            
            //Create Y axis
            svg.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(" + margin.left + ",0)")
                    .call(yAxis);

            d3.select("p").on("click", function() {
                if (sign == 1){
                    yScale.domain([Min*0.9, Max*1.05]);

                    svg.selectAll("rect")
                        .data(dataset)
                        .transition()
                        .duration(1000)
                        .attr("x", function(d, i) {
                            return (xScale(2002+i) + xScale.rangeBand()/2 - width*1.1);
                        })
                        .attr("y", function(d) {
                            return yScale(d);
                        })
                        .attr("height", function(d) {
                            return yScale(Min*0.9)-yScale(d);
                        });

                    svg.selectAll("whatever")
                        .data(average)
                        .enter()
                        .append("rect")
                        .attr("class","avg")
                        .attr("x", function(d, i) {
                            return (xScale(2002+i) + xScale.rangeBand()/2+width*0.1);
                        })
                        .attr("y", function(d) {
                            return yScale(d);
                        })
                        .attr("width", width)
                        .attr("height", function(d) {
                            return yScale(Min*0.9)-yScale(d);
                        })
                        .attr("fill", function(d) {
                            return "rgb(239, 122, 130)";
                        });
                    sign = 0;
                }
                else {
                    svg.selectAll(".avg").remove();

                    yScale.domain([min_data*0.9, max_data*1.05])
                    svg.selectAll("rect")
                        .data(dataset)
                        .transition()
                        .duration(1000)
                        .attr("x", function(d, i) {
                            return (xScale(2002+i) + xScale.rangeBand()/2 - width/2);
                        })
                        .attr("y", function(d) {
                            return yScale(d);
                        })
                        .attr("height", function(d) {
                            return yScale(min_data*0.9)-yScale(d);
                        });
                    sign = 1;
                }

                //Update X axis
                svg.select(".x.axis")
                    .transition()
                    .duration(1000)
                    .call(xAxis);

                //Update Y axis 
                svg.select(".y.axis")
                    .transition()
                    .duration(1000)
                    .call(yAxis);

            });
        });
		
}
	revenue.draw(); 