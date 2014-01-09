var canvas;

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Drawing() {
  this.points = [];
  this.colour;
  this.strokeWidth;
}

Drawing.prototype.addPoint = function(point) {
  this.points.push(point);
}

Drawing.prototype.lastPoint = function(point) {
  return this.points[this.points.length - 1]
}

function init() {
  canvas = new Canvas();
}

function Canvas() {
  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.w = this.canvas.width;
  this.h = this.canvas.height;

  this.p = new Point(0, 0);

  this.colour = "black";
  this.strokeWidth = 2;

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

Canvas.prototype.setColour = function(colour) {
  this.colour = colour;
}

Canvas.prototype.setStrokeWidth = function(strokeWidth) {
  this.strokeWidth = strokeWidth;
}

function draw(p, p0, obj) {
  obj.ctx.beginPath();
  obj.ctx.moveTo(p0.x, p0.y);
  obj.ctx.lineTo(p.x, p.y);
  obj.ctx.globalAlpha = 0.8;
  obj.ctx.strokeStyle = obj.colour;
  obj.ctx.lineWidth = obj.strokeWidth;
  obj.ctx.stroke();
  obj.ctx.closePath();
}

function setMouseDown(event, obj) {
  obj.currentDrawing = new Drawing();
  obj.currentDrawing.colour = obj.colour;
  obj.currentDrawing.strokeWidth = obj.strokeWidth;
  var x = event.clientX - obj.canvas.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft;
  var y = event.clientY - obj.canvas.offsetTop + document.body.scrollTop + document.documentElement.scrollTop;
  obj.p = new Point(x, y);
  obj.currentDrawing.addPoint(obj.p);
  
  obj.isMouseDown = true; 
  obj.ctx.beginPath();
  obj.ctx.globalAlpha = 0.8;
  obj.ctx.fillStyle = obj.colour;
  obj.ctx.fillRect(obj.p.x, obj.p.y, obj.strokeWidth, obj.strokeWidth);
  obj.ctx.closePath();
}

function setMouseUp(event, obj) {
  if (obj.isMouseDown) {
    obj.isMouseDown = false;
    obj.drawings.push(obj.currentDrawing);
    socket.emit('post_drawing', { drawing: obj.currentDrawing});
  }
}

function onMouseOutBounds(event, obj) {
  setMouseUp(event, obj);
}

function onMouseMove(event, obj) {
  if (obj.isMouseDown) {
    var x = event.clientX - obj.canvas.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft;
    var y = event.clientY - obj.canvas.offsetTop + document.body.scrollTop + document.documentElement.scrollTop;
    obj.p = new Point(x, y);
    var prevPoint = obj.currentDrawing.lastPoint();
    obj.currentDrawing.addPoint(obj.p);
    draw(obj.p, prevPoint, obj);
  } 
}

function drawDrawing(drawings, obj) {
  for (i = 0; i < drawings.length; i++) {
    drawFromPoints(drawings[i], obj);
  }
}

function drawFromPoints(drawing, obj) {
  for (var i = 0; i < drawing.points.length - 1; i++) {
    obj.colour = drawing.colour;
    obj.strokeWidth = drawing.strokeWidth;
    draw(drawing.points[i], drawing.points[i + 1], obj); 
  }
}
