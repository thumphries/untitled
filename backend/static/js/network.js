var socket = io.connect('/game');
var tray = document.getElementById('debug');
tray.innerHTML = "Connected.";
var chatbox = document.getElementById('chat-output');

/*
socket.emit('get_new_word', {});

socket.emit('request_control', {});
window.setInterval(function() {
    socket.emit('request_control', {});}, 10000);
*/


// Signals

socket.on('new_player', function (data) {
  console.log("New player: " + data);
  var nicks = document.getElementById('nicks');
  nicks.innerHTML += data + "<br/>";
});

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
    canvas.clear();
    counter_tick(data.rlen);
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

socket.on('chat_msg', function(data) {
    console.log("Received message: " + data);
    chatbox.innerHTML = chatbox.innerHTML + "<br/>[" + data.sender + "] " + data.msg;
    chatbox.scrollTop = chatbox.scrollHeight;
});

// Emissions

function send_name (name) {
    socket.emit('register_user', { username: name });
}

function send_chat (guess) {
    socket.emit('post_chat', { sender: player.id, msg: guess });
}
