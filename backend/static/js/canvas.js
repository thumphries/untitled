var canvas, ctx, isDrawing = false;
var prevX, preyY, currX, currY;
prevX = prevY = currX = currY = 0;
var dot_flag = false;
var colour = "black";
var strokeWidth = 2;

function Point(prevX, prevY, currX, currY) {
  this.prevX = prevX;
  this.prevY = prevY;
  this.currX = currX;
  this.currY = currY;
}

function Drawing() {
  this.points = [];
}

Drawing.prototype.addPoint = function(point) {
  this.points.push(point);
}

var drawings = [];
var currentDrawing;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  w = canvas.width;
  h = canvas.height;

  canvas.addEventListener("mousemove", function(e) {
    findxy("move", e);
  }, false);
  canvas.addEventListener("mousedown", function(e) {
    findxy("down", e);
  }, false);
  canvas.addEventListener("mouseup", function(e) {
    findxy("up", e);
  }, false);
  canvas.addEventListener("mouseout", function(e) {
    findxy("out", e);
  }, false);
}

function draw() {
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.strokeStyle = colour;
  ctx.lineWidth = strokeWidth;
  ctx.stroke();
  ctx.closePath();
}

function findxy(res, e) {
  var div = document.getElementById("pos")
  console.log(res);
  if (res == "down") {
    // new drawing object
    currentDrawing = new Drawing();
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;

    isDrawing = true;
    dot_flag = true;
    if (dot_flag) {
      ctx.beginPath();
      ctx.fillStyle = colour;
      ctx.fillRect(currX, currY, 2, 2); 
      ctx.closePath();
      dot_flag = false;
    }
  }
  if (res == "up" || res == "out") {
    isDrawing = false;
    drawings.push(currentDrawing);
    console.log("added drawing " + JSON.stringify(currentDrawing));
    // finalise drawing object
  }
  if (res == "move") {
    if (isDrawing) {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.offsetLeft;
      currY = e.clientY - canvas.offsetTop;
      p = new Point(prevX, prevY, currX, currY);
      console.log("added point " + JSON.stringify(p));
      currentDrawing.addPoint(p);     
      draw();
    }
  }
  pos.innerHTML = "prevX: " + prevX + "<br/>prevY: " + prevY + "<br/>currX: " + currX + "<br/>currY: " + currY
}

function replay_draw() {

}

function replay(drawing) {
  
}
