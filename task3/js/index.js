// function x_gride(xScale){
//     return d3.axisBottom(xScale).ticks(5);
// }
// function y_gride(yScale){
//     return d3.axisLeft(yScale).ticks(5);
// }
var mrg = { top: 20, right: 20, bottom: 30, left: 40},
svgWidth = 960 - mrg.left - mrg.right, 
    svgHeight = 500 - mrg.top - mrg.bottom;




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
var y_axis = d3.axisLeft(yScale).tickFormat( function (d) {
    return "".concat((d * 100).toFixed(0), "%");
});

chart.append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate (0, ${svgHeight})`)
      .call(d3.axisBottom(xScale));
      chart.append("g")
      .attr("class", "yAxis")
      .call(y_axis)
 

      chart.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#387B21")
      .attr("stroke-width", 2)
      .attr("d", d3.line()
        .x(function(d) { return xScale(d.letter) })
        .y(function(d) { return yScale(d.frequency) })
        .curve(d3.curveMonotoneX)
        )
    chart
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.letter)})
        .attr("cy", function (d) { return yScale(d.frequency)})
        .attr("r", 5)
        .style("fill", "#387B21")
        .style("fcursor", "pointer")
        on("mouseover", function (b, e) {

tooltip.style("visibility", "visible")
    // .style("left", "")//e.path.getBoundingClientRect().x - tooltip.node().clientWidth / 2 + b.path[0].getBoundingClientRect().width / 2 + "px")
    // .style("top", "100px")//d.path[0].getBoundingClientRect().y - 60 + "px")
    .html('<span class="tool-tip-title">Frequnecy: </span><span class="tool-tip-value">'.concat(b.frequency, "</span>"));  
    })
    .on("mousemove", function () {
    return tooltip.style("top", (d3.event.pageY -30) + "px").style("left", (d3.event.pageX + 10) + "px");
    })
    .on("mouseout", function (d) {
    return tooltip.style("visibility", "hidden");
    });
});
