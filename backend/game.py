from socketio.namespace import BaseNamespace
from socketio.mixins import BroadcastMixin
from socketio import socketio_manage
from flask import request, Response

from backend import app

import random
import string

# Load word file
# Not the best place to put this
WORDFILE = "./untitled/backend/resource/words"
words = []

clients = 0
artist = 1

class PictNamespace(BaseNamespace, BroadcastMixin):
    def initialize(self):
        global clients
        self.logger = app.logger
        self.log("Socketio session commence")
        clients += 1
        self.client_id = clients
        self.emit('set_client_id', {'client_id': self.client_id})
        self.log("Sent client id %d" % self.client_id)

    def log(self, message):
        self.logger.info("[{0}] {1}".format(self.socket.sessid, message))

    def on_post_drawing(self, posted):
        global artist
        self.log("Drawing posted by %d" % self.client_id)
        if self.client_id == artist:
            self.broadcast_event_not_me('download_drawing', posted)

    def on_get_new_word(self, posted):
        global artist
        if self.client_id == artist:
            new_word = choose_word()
            self.emit('new_word', {'word': new_word})

@app.route('/socket.io/<path:remaining>')
def route(remaining):
    socketio_manage(request.environ, {'/game': PictNamespace}, request)
    return Response()

def load_words():
    global words
    fh = open(WORDFILE, 'r')
    slurp = fh.read()
    words = string.split(slurp)

def choose_word():
    return random.choice(words)

load_words()
