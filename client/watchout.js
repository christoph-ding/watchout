// start slingin' some d3 here.
var asteroids = [];
var numberOfAsteroids = 20;
var boardHeight = 800;
var boardWidth = 800;
var player = {
  x: boardWidth / 2,
  y: boardHeight / 2,
  r: 35
};
var playerHit = false;

for(var i = 0; i < numberOfAsteroids; i++) {
  var currentAsteroid = {
    x: Math.random() * boardWidth,
    y: Math.random() * boardHeight,
    oldX: Math.random() * boardWidth,
    oldY: Math.random() * boardHeight,
    r: Math.random() * 50,
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
  .attr("r", function(d) {return d.r;})
  // .transition().duration(function(d) {return d.speed;})
  .attr("cx", function(d) {return Math.random() * boardWidth;})
  .attr("cy", function(d) {return Math.random() * boardHeight;})
  .attr("fill", "#A9F5D0");

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
  .attr("r", player.r)
  .call(drag)
  // .transition().duration(3000)
  .attr("fill", "blue")

var newCoordinates = function() {
  for(var i = 0; i < asteroids.length; i++) {
    asteroids[i]['oldX'] = asteroids[i]['x'];
    asteroids[i]['oldY'] = asteroids[i]['y'];
    asteroids[i]['x'] = Math.random() * boardWidth;
    asteroids[i]['y'] = Math.random() * boardHeight;
    asteroids[i]['speed'] = asteroids[i]['speed'] * (0.5 + Math.random() )
  }
};

var updateElements = function() {
  d3.select(".board").select("svg").selectAll("circle")
    .data(asteroids)
    .transition().duration(function(d) {return d.speed;})
    .tween('attr', tweenFunc)
    .attr("cx", function(d) {return d.x;})
    .attr("cy", function(d) {return d.y;});
};

var tweenFunc = function(d) {
  var xInterpolator = d3.interpolateNumber(d.oldX, d.x);
  var yInterpolator = d3.interpolateNumber(d.oldY, d.y);
  debugger;
  return function(t) {
    d.cx = xInterpolator(t);
    d.cy = yInterpolator(t);
  };
}

var collisionDetector = function(asteroid) {
  var asteroidX = asteroid['x'];
  var asteroidY = asteroid['y'];
  var asteroidR = asteroid['r']; 
  var playerX = player['x'];
  var playerY = player['y'];
  var playerR = player['r'];

  var distance = Math.sqrt( (asteroidX - playerX) * (asteroidX - playerX) + (asteroidY - playerY) * (asteroidY - playerY))
  if((distance < (playerR + asteroidR))) console.log("hittt");
  if ((distance < (playerR + asteroidR)) && playerHit === false) {
    playerHit = true;
    console.log('hit');
  }
}

setInterval(function() {
  newCoordinates();
  updateElements();
}, 4000);

d3.timer(collisionDetector);

