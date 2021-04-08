

var mrg = { top: 20, right: 20, bottom: 30, left: 40},
svgWidth = 960 - mrg.left - mrg.right, 
    svgHeight = 500 - mrg.top - mrg.bottom;

var flour = d3.select("body")
    .append("div")
    .attr("id", "flour");


var svg = d3.select("#chart")
.append("svg")
.attr("width", svgWidth + mrg.left + mrg.right)
.attr("height", svgHeight + mrg.top + mrg.bottom);
var chart = svg.append('g')
.attr('transform', `translate(${mrg.left}, ${mrg.top})`);

// var y = d3.scaleLinear()
//       .range([height, 0]);

var yScale = d3.scaleLinear()
.range([svgHeight, 0]);
//domain inside function
// ;
//adding to axis

var xScale = d3.scaleBand()
.range([0, svgWidth]).padding([0.1]);

d3.csv('https://gist.githubusercontent.com/akhmad98/52cc680868e6859e50a12bb7ee8942fb/raw/005b11f85bef534ea4cabbc01a06d1cad0c3fd49/data.csv')
.then(function(data) { 
// var len=data.map(function(d) {return d.letter});

//console.log();
xScale.domain(data.map(function(d) {return d.letter;}))
//xScale.domain(len);
yScale.domain([0, d3.max(data, function(d) {return d.frequency;})]);
var x_axis = d3.axisBottom(xScale); 
// var x_axis = d3.axisBottom(xScale).tickFormat((i) => data[i].letter); 
var y_axis = d3.axisLeft().scale(yScale);

chart.append("g")
      .attr("transform", `translate (0, ${svgHeight})`)
      .call(d3.axisBottom(xScale));

chart.append("g")
      .attr("class", "y axis")
      .call(y_axis);

    chart.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", "steelblue")
        .attr("x", function (d) { return xScale(d.letter); })
        .attr("y", function (d) { return yScale(d.frequency); })
        .attr("height", function (d) { return svgHeight - yScale(d.frequency); })
        .attr("width", xScale.bandwidth())
        .on("mouseover", function (a, b) {
            flour.style("left", e.path[0].getBoundingClientRect().x - flour.node().clientWidth / 2 +
                e.path[0].getBoundingClientRect().width / 2 + "px")
                .style("top", e.path[0].getBoundingClientRect().y - 60 + "px")
                .style("visiblity", "visible")
                .html('<span class="tool-tip-title">Frequency:</span><span class="tool-tip-value">'.concat(
                    ("" + d[1]).replace("0.", "."),
                    "</span>"
                )
                );
        })
        .on("mouseout", function (d) {
            flour.style("visibility", "hidden");
        });
    


chart.append("text")
.attr("x", (svgWidth / 2))
.attr("y", 0 + (mrg.top / 2))
.attr("text-anchor", "middle")
.text("Relative Frequency of Letters in the English Alphabet");
})
