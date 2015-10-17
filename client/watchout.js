// start slingin' some d3 here.
var asteroids = [];
var numberOfAsteroids = 10;
var boardHeight = 600;
var boardWidth = 800;
var player = {
  x: boardWidth / 2,
  y: boardHeight / 2,
  r: 35
};
var playerHit = false;
var score = 0;
var highScore = 0;
var asteroidColorPalette = ['#bbbdf6', '#9893da', '#797a9e', '#72727e', '#625f63'];

for(var i = 0; i < numberOfAsteroids; i++) {
  var currentAsteroid = {
    x: Math.random() * boardWidth,
    y: Math.random() * boardHeight,
    r: 5 + Math.random() * 45,
    speed: 1000 + Math.random() * 3000,
    color: asteroidColorPalette[Math.floor(Math.random() * asteroidColorPalette.length)]
  }
  asteroids.push(currentAsteroid);
}

var svgContainer = d3.select(".board").append("svg")
  .transition(2000)
  .attr("height", boardHeight)
  .attr("width", boardWidth)
  .attr("fill", "red");

var asteroidMaker = d3.select(".board").select("svg").selectAll("circle")
  .data(asteroids)
  .enter()
  .append("circle")
  .attr("fill", function(d) {return d.color})
  .attr("cx", function(d) {return d.x;})
  .attr("cy", function(d) {return d.y;})
  .attr("r", function(d) {return d.r;})

var drag = d3.behavior.drag()
  .on("drag", function(d) {
    var newX = Math.min(Math.max(player.r, d3.event.x), boardWidth - player.r);
    var newY = Math.min(Math.max(player.r, d3.event.y), boardHeight - player.r);
    d3.select(this)
      .attr("cx", newX)
      .attr("cy", newY);
    player.x = newX;
    player.y = newY;
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
  .transition().duration(3000)
  .attr("fill", "blue")

var newCoordinates = function() {
  for(var i = 0; i < asteroids.length; i++) {
    asteroids[i]['x'] = Math.random() * boardWidth;
    asteroids[i]['y'] = Math.random() * boardHeight;
    asteroids[i]['r'] = 5 + Math.random() * 45;
    asteroids[i]['speed'] = 1000 + Math.random() * 3000;
    asteroids[i]['color'] = asteroidColorPalette[Math.floor(Math.random() * asteroidColorPalette.length)];
  }
};

var updateElements = function() {
  d3.select(".board").select("svg").selectAll("circle")
    .data(asteroids)
    .transition().duration(function(d) {return d.speed;})
    .attr("cx", function(d) {return d.x;})
    .attr("cy", function(d) {return d.y;})
    .attr("r", function(d) {return d.r;})
    .attr("fill", function(d) {return d.color});
};

var collisionDetector = function() {
  d3.select(".board").select("svg").selectAll("circle")
  .data(asteroids)
  .each(function() {
    var asteroidX = Number(this.attributes.cx.value);
    var asteroidY = Number(this.attributes.cy.value);
    var asteroidR = Number(this.attributes.r.value);
    var distance = Math.sqrt( (asteroidX - player.x) * (asteroidX - player.x) + (asteroidY - player.y) * (asteroidY - player.y))
    if (distance < (player.r + asteroidR)) {
      score = 0;
    }
  });
};

setInterval(function() {
  newCoordinates();
  updateElements();
}, 4000);

setInterval(function() {
  d3.select(".scoreboard").selectAll(".current")
    .text("Current score: " + score);
  score++;
  highScore = Math.max(highScore, score);
  d3.select(".scoreboard").selectAll(".highscore")
    .text("High score: " + highScore);
}, 100)

d3.timer(collisionDetector);

