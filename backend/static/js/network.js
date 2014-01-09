var tray = document.getElementById('debug');

var socket = io.connect('/game');

tray.innerHTML = "Connected.";

socket.on('disconnect', function () {
    console.log("Disconnected from server.");
    tray.innerHTML("Disconnected.");
});

socket.on('set_client_id', function(data) {
    player.id = data.client_id;
    console.log("Given ID " + player.id + " by the server.");
});

socket.on('download_drawing', function(data) {
    console.log("Received drawing data.");
    // andrew
});
