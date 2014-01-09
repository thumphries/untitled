var canvas;

var drawthis = JSON.parse('[{"points":[{"x":468,"y":1740},{"x":468,"y":1732},{"x":476,"y":1692},{"x":520,"y":1600},{"x":600,"y":1492},{"x":704,"y":1344},{"x":788,"y":1248},{"x":900,"y":1124},{"x":1060,"y":944},{"x":1132,"y":864},{"x":1232,"y":744},{"x":1324,"y":616},{"x":1420,"y":492},{"x":1504,"y":392},{"x":1576,"y":308},{"x":1620,"y":260},{"x":1652,"y":212},{"x":1668,"y":192},{"x":1680,"y":176},{"x":1684,"y":172},{"x":1680,"y":172},{"x":1676,"y":176},{"x":1672,"y":180}],"colour":"purple","strokeWidth":50},{"points":[{"x":1412,"y":1500},{"x":1412,"y":1492},{"x":1348,"y":1392},{"x":1264,"y":1268},{"x":1080,"y":984},{"x":888,"y":684},{"x":700,"y":440},{"x":580,"y":308},{"x":448,"y":168},{"x":368,"y":92},{"x":312,"y":44},{"x":280,"y":20},{"x":252,"y":4}],"colour":"purple","strokeWidth":50}]');

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
  drawDrawing(drawthis, canvas);
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
    console.log(JSON.stringify(obj.drawings));
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
