var player = {
    name: "player",
    id: 0
};

var counter = 0;
var ctr = document.getElementById("countdown");

function counter_tick(seconds) {
    counter = seconds;
    ctr.innerHTML = counter;
    var iv = window.setInterval(function () {
            counter -= 1;
                ctr.innerHTML = counter;
            if (counter <= 0) {
                clearInterval(iv);
            }
    }, 1000);
}
