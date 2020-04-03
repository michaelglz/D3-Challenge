var svgWidth = 959;
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

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "lightblue")
    .attr("opacity", ".5")
    .text('In Poverty (%)');

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    // chartGroup.append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 0 - margin.left + 40)
    //   .attr("x", 0 - (height / 2))
    //   .attr("dy", "1em")
    //   .attr("class", "aText")
      // .text("Number of Billboard 100 Hits");

    // chartGroup.append("text")
      // .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      // .attr("class", "aText")
      // .text("Hair Metal Band Hair Length (inches)");
  // }).catch(function(error) {
    // console.log(error);
  });


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
    .attr('data-name', 'poverty')
    .attr('data-axis', 'x')
    .attr('class', 'aText active x');
  xText
  //   .append('text')
  //   .text('Age (Median)')
  //   .attr('y',0)
  //   .attr('data-name', 'age')
  //   .attr('data-axis', 'x')
  //   .attr('class', 'aText inactive x');
  // xText
  //   .append('text')
  //   .text('Household Income (Median)')
  //   .attr('y',26)
  //   .attr('data-name', 'income')
  //   .attr('data-axis', 'x')
  //   .attr('class', 'aText inactive x');