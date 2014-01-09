var can = document.getElementById('picture');
var ctx = can.getContext("2d");

can.addEventListener('mousedown', startDraw, false);
can.addEventListener('mouseup', endDraw, false);
can.addEventListener('mousemove', draw, false);

var tray = document.getElementById('debug');

var colour = "black";
var width = 2;

var drawing = false;

ctx.strokeStyle = colour;
ctx.lineWidth = width;

var prevX;
var prevY;

function startDraw (event) {
    var x = event.clientX - can.offsetLeft;
    var y = event.clientY - can.offsetTop;

    tray.innerHTML = "x:" + x + " y:" + y;

    prevX = x;
    prevY = y;
    ctx.moveTo(x,y);

    drawing = true;
}

function draw (event) {
    if (drawing) {
        var x = event.clientX - can.offsetLeft;
        var y = event.clientY - can.offsetTop;

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x,y);
        ctx.stroke();
        ctx.closePath();

        prevX = x;
        prevY = y;
    }
}

function endDraw (event) {
    drawing = false;
}

