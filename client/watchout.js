// start slingin' some d3 here.
var asteroids = [];
var numberOfAsteroids = 20;
var boardHeight = 800;
var boardWidth = 800;
var player = {
  x: boardWidth / 2,
  y: boardHeight / 2
};

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
  .transition().duration(function(d) {return d.speed;})
  .attr("cx", function(d) {return Math.random() * boardWidth;})
  .attr("cy", function(d) {return Math.random() * boardHeight;})
  .attr("fill", "red");

var drag = d3.behavior.drag()
  .on("drag", function(d) {
    d3.select(this)
    .attr("cx", d3.event.x)
    .attr("cy", d3.event.y);
  });

var playerMaker = d3.select(".board").select("svg").selectAll("player")
  .data([player])
  .enter()
  .append("circle")
  .attr("fill", "green")
  .attr("cx", player.x)
  .attr("cy", player.y)
  .attr("r", 35)
  .call(drag)
  .transition().duration(3000)
  .attr("fill", "blue")

var newCoordinates = function() {
  for(var i = 0; i < asteroids.length; i++) {
    asteroids[i]['x'] = Math.random() * boardWidth;
    asteroids[i]['y'] = Math.random() * boardHeight;
    asteroids[i]['speed'] = asteroids[i]['speed'] * (0.5 + Math.random() )
  }
};

var updateElements = function() {
  d3.select(".board").select("svg").selectAll("circle")
    .data(asteroids)
    .transition().duration(function(d) {return d.speed;})
    .attr("cx", function(d) {return d.x;})
    .attr("cy", function(d) {return d.y;});
};

setInterval(function() {
  newCoordinates();
  updateElements();
}, 5000);
