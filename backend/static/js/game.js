var player = {
    name: "anonymous",
    id: 0
};

var formm = document.getElementById("nf");
var chatf = document.getElementById("chatform");

function join_game () {
    var nf = document.getElementById("nameform");
    var ns = nf.value;
    if (ns) {
        player.name = ns;
    } else {
        player.name = "anon" + Math.floor((Math.random()*100)+1);
    }

    send_name(player.name);

    var block = document.getElementById("join");
    block.style.display="none";

    canvas.canvas.style.display="inline";

    return false;
}

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

function post_chat () {
    var guess = chatf.value;
    send_chat(guess);
}
