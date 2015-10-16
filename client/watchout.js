// start slingin' some d3 here.
var asteroids = [];
var numberOfAsteroids = 20;
var boardHeight = 800;
var boardWidth = 800;

for(var i = 0; i < numberOfAsteroids; i++) {
  var currentAsteroid = {
    x: Math.random() * boardWidth,
    y: Math.random() * boardHeight,
    speed: Math.random() * 5000
  }
  asteroids.push(currentAsteroid);
}

var svgContainer = d3.select(".board").append("svg")
  .attr("height", boardHeight)
  .attr("width", boardWidth);

var asteroidMaker = d3.select(".board").select("svg").selectAll("circle")
  .data(asteroids)
  .enter()
  .append("circle")
  .attr("fill", "green")
  .attr("cx", function(d) {return d.x;})
  .attr("cy", function(d) {return d.y;})
  .attr("r", function(d) {return Math.random() * 50;})
  .transition().duration(3000)
  .attr("fill", "red");
