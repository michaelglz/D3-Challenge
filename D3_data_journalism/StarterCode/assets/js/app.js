var svgWidth = 960;
var svgHeight = 500;
var labelArea = 110;
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(stateData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    stateData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });
    

    // Step 2: Create scale functions
    // ==============================
    
    var xLinearScale = d3.scaleLinear()
      .domain([8, 24])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([4, 27])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

      svg
    .append('g')
    .attr('class','xText')

  var xText = d3.select('.xText')
  function xTextRefresh() {
    xText.attr(
      'transform',
      `translate(${((width - labelArea) / 2 + labelArea)}, ${(height - margin.top - margin.right)})`
    );
  };
  xTextRefresh();

  xText
    .append('text')
    .text('In Poverty (%)')
    .attr('y', 125)
    .attr("x", 53.345)
    .attr('data-name', 'poverty')
    .attr('data-axis', 'x')
    .attr('class', 'aText active x');

  svg
    .append('g')
    .attr('class','yText')

  var yText = d3.select('.yText')
  function yTextRefresh() {
    yText.attr(
      'transform',
      `translate(${((width - labelArea) / 2 + labelArea)}, ${(height - margin.top - margin.right)})`
    );
  };
  yTextRefresh();

  yText
    .append('text')
    .attr("transform", "rotate(-90)")
    .text('Lacks Healthcare (%)')
    .attr('y', -420)
    .attr("x", svgHeight / 2 - labelArea)
    .attr('data-name', 'poverty')
    .attr('data-axis', 'x')
    .attr('class', 'aText active x');

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
      .data(stateData)
      .enter()
      .append("g")

      circlesGroup
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        .attr("class", "stateCircle");      
    
      circlesGroup
        .append('text')
        .attr('dx', d => xLinearScale(d.poverty))
        .attr('dy', d => yLinearScale(d.healthcare) + 5)
        .text(d => d.abbr)
        .attr("class", "stateText");

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([47, -70])
      .html(function(d) {
        return (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
  });