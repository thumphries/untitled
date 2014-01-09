var tray = document.getElementById('debug');

var socket = io.connect('/game');

tray.innerHTML = "Connected.";

socket.emit('get_new_word', {});

socket.emit('request_control', {});
window.setInterval(function() {
    socket.emit('request_control', {});}, 10000);

socket.on('disconnect', function () {
    console.log("Disconnected from server.");
    tray.innerHTML("Disconnected.");
});

socket.on('set_client_id', function(data) {
    player.id = data.client_id;
    console.log("Given ID " + player.id + " by the server.");
});

socket.on('initial_drawing', function(data) {
  console.log("Received full image data.");
  drawDrawing(JSON.parse(data), canvas);
});

socket.on('download_drawing', function(data) {
    console.log("Received drawing data.");
    drawFromPoints(data.drawing, canvas);
});

socket.on('new_word', function(data) {
    tray.innerHTML = "Received new word: " + data.word;
});

socket.on('grant_control', function(data) {
    canvas.clear()
    if (data.client_id == player.id) {
        tray.innerHTML = "You are broadcasting.";
    }
});

socket.on('revoke_control', function(data) {
    if (data.client_id == player.id) {
        tray.innerHTML = "You are NOT broadcasting.";
    }
});

socket.on('deny_control', function(data) {
    tray.innerHTML = "Control request denied.";
});
