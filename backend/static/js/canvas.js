var canvas;

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Drawing() {
  this.points = [];
}

Drawing.prototype.addPoint = function(point) {
  this.points.push(point);
}

Drawing.prototype.lastPoint = function(point) {
  return this.points[this.points.length - 1]
}

function init() {
  canvas = new Canvas();
  drawDrawing(drawthis, canvas);
}

function Canvas() {
  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.w = this.canvas.width;
  this.h = this.canvas.height;

  this.p = new Point(0, 0);

  this.isMouseDown = false;

  this.drawings = [];
  this.currentDrawing;

  var me = this;

  this.canvas.addEventListener("mousedown", function(e) {
    setMouseDown(e, me);
  }, false);

  this.canvas.addEventListener("mousemove", function(e) {
    onMouseMove(e, me);
  }, false);

  this.canvas.addEventListener("mouseup", function(e) {
    setMouseUp(e, me);
  }, false);

  this.canvas.addEventListener("mouseout", function(e) {
    onMouseOutBounds(e, me);
  }, false);
}

function draw(p, p0, obj) {
  var colour = "black";
  var strokeWidth = 2;
  obj.ctx.beginPath();
  obj.ctx.moveTo(p0.x, p0.y);
  obj.ctx.lineTo(p.x, p.y);
  obj.ctx.strokeStyle = colour;
  obj.ctx.lineWidth = strokeWidth;
  obj.ctx.stroke();
  obj.ctx.closePath();
}

function setMouseDown(event, obj) {
  obj.currentDrawing = new Drawing();
  obj.p = new Point(event.clientX - obj.canvas.offsetLeft, event.clientY - obj.canvas.offsetTop);
  obj.currentDrawing.addPoint(obj.p);
  
  obj.isMouseDown = true; 
  obj.ctx.beginPath();
  obj.ctx.fillStyle = "black";
  obj.ctx.fillRect(obj.p.x, obj.p.y, 2, 2);
  obj.ctx.closePath();
}

function setMouseUp(event, obj) {
  if (obj.isMouseDown) {
    obj.isMouseDown = false;
    obj.drawings.push(obj.currentDrawing);
    console.log(JSON.stringify(obj.drawings));
  }
}

function onMouseOutBounds(event, obj) {
  setMouseUp(event, obj);
}

function onMouseMove(event, obj) {
  if (obj.isMouseDown) {
    obj.p = new Point(event.clientX - obj.canvas.offsetLeft, event.clientY - obj.canvas.offsetTop);
    var prevPoint = obj.currentDrawing.lastPoint();
    obj.currentDrawing.addPoint(obj.p);
    draw(obj.p, prevPoint, obj);
  } 
}

function drawDrawing(drawings, obj) {
  for (i = 0; i < drawings.length - 1; i++) {
    drawFromPoints(drawings[i], obj);
  }
}

function drawFromPoints(drawing, obj) {
  for (var i = 0; i < drawing.points.length - 2; i++) {
    draw(drawing.points[i], drawing.points[i + 1], obj); 
  }
}
