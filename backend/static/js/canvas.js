var canvas, ctx, flag = false;
var prevX, preyY, currX, currY;
prevX = prevY = currX = currY = 0;
var dot_flag = false;
var x = "black";
var y = 2;

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
  ctx.strokeStyle = x;
  ctx.lineWidth = y;
  ctx.stroke();
  ctx.closePath();
}

function findxy(res, e) {
  var div = document.getElementById("pos")
  console.log(res);
  if (res == "down") {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;

    flag = true;
    dot_flag = true;
    if (dot_flag) {
      ctx.beginPath();
      ctx.fillStyle = x;
      ctx.fillRect(currX, currY, 2, 2); 
      ctx.closePath();
      dot_flag = false;
    }
  }
  if (res == "up" || res == "out") {
    flag = false;
  }
  if (res == "move") {
    if (flag) {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.offsetLeft;
      currY = e.clientY - canvas.offsetTop;
      draw();
    }
  }
  pos.innerHTML = "prevX: " + prevX + "<br/>prevY: " + prevY + "<br/>currX: " + currX + "<br/>currY: " + currY
}
