var canvas;

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

//var drawings = [];
//var currentDrawing;

function init() {
  canvas = new Canvas();
}

function Canvas() {
  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.w = this.canvas.width;
  this.h = this.canvas.height;

  this.p = new Point(0, 0, 0, 0);

  this.isMouseDown = false;

  this.drawings = [];
  this.currentDrawing;

  this.canvas.addEventListener("mousedown", function(e) {
    setMouseDown(e, this);
  }, false);

  this.canvas.addEventListener("mousemove", function(e) {
    onMouseMove(e, this);
  }, false);

  this.canvas.addEventListener("mouseup", function(e) {
    setMouseUp(e, this);
  }, false);

  this.canvas.addEventListener("mouseout", function(e) {
    onMouseOutBounds(e, this);
  }, false);
}

Canvas.prototype.setPointFromPoints = function(prevX, prevY, currX, currY) {
  this.p = new Point(prevX, prevY, currX, currY);
}

Canvas.prototype.setPointFromPoint = function(p) {
  this.p = p;
}

function draw(p, obj) {
  var colour = "black";
  var strokeWidth = 2;
  obj.ctx.beginPath();
  obj.ctx.moveTo(p.prevX, p.prevY);
  obj.ctx.lineTo(p.currX, p.currY);
  obj.ctx.strokeStyle = colour;
  obj.ctx.lineWidth = strokeWidth;
  obj.ctx.stroke();
  obj.ctx.closePath();
}

function setMouseDown(event, obj) {
  obj.currentDrawing = new Drawing();
  console.log(JSON.stringify(obj));
  obj.setPointFromPoints(obj.p.currX, obj.p.currY, event.clientX - obj.canvas.offsetLeft, event.clientY - canvas.offsetTop);
  obj.isMouseDown = true; 
  obj.ctx.beginPath();
  obj.ctx.fillStyle = "black";
  obj.ctx.fillRect(obj.p.currX, obj.p.currY, 2, 2);
  obj.ctx.closePath();
}

function setMouseUp(event, obj) {
  if (obj.isMouseDown) {
    obj.isMouseDown = false;
    obj.drawings.push(obj.currentDrawing);
  }
}

function onMouseOutBounds(event, obj) {
  setMouseUp(event, obj);
}

function onMouseMove(event, obj) {
  if (obj.isMouseDown) {
    obj.setPointFromPoints(obj.currX, obj.currY, event.clientX - obj.canvas.offsetLeft, event.clientY - obj.canvas.offsetTop);
    obj.currentDrawing.addPoint(obj.p);
    draw(obj.p, obj);
  } 
}

/*Canvas.prototype.findxy = function(res, e) {
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
      draw(p);
    }
  }
  pos.innerHTML = "prevX: " + prevX + "<br/>prevY: " + prevY + "<br/>currX: " + currX + "<br/>currY: " + currY
}
*/
