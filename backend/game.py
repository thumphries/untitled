import gevent
from socketio.namespace import BaseNamespace
from socketio.mixins import BroadcastMixin
from socketio import socketio_manage
from flask import request, Response

from backend import app

import random
import string
import time
import json
import bleach

roundlength = 10

# Load word file
# Not the best place to put this
WORDFILE = "./untitled/backend/resource/words"
words = []

num_clients = 0
artist = 0
drawings = []
players = {}

class PictNamespace(BaseNamespace, BroadcastMixin):
    last_ping = 0
    last_pong = 0


    def initialize(self):
        global num_clients
        global artist
        self.logger = app.logger
        self.log("Socketio session commence")
        num_clients += 1
        self.client_id = num_clients
        self.emit('set_client_id', {'client_id': self.client_id})
        self.emit('initial_drawing', json.dumps(drawings))
        self.log("Sent client id %d" % self.client_id)

    def log(self, message):
        self.logger.info("[{0}] {1}".format(self.socket.sessid, message))


    def on_request_control(self, posted):
        global artist
        global roundlength
        if artist == 0:
            artist = self.client_id
            self.broadcast_event('grant_control', {'client_id': self.client_id})
            gevent.spawn(self.revoke_control)
        else:
            self.emit('deny_control', {})

    def revoke_control(self):
        global artist
        global roundlength
        global drawings
        drawings = []
        self.log("Revoke control - sleeping...")
        gevent.sleep(roundlength)
        self.log("Control revoked.")
        artist = 0
        self.broadcast_event('revoke_control', {'client_id': self.client_id})


    def on_post_drawing(self, posted):
        global artist
        global drawings
        self.log(posted)
        self.log("Drawing posted by %d" % self.client_id)
        drawings.append(posted['drawing'])
        self.log(drawings)
        if self.client_id == artist:
            self.broadcast_event_not_me('download_drawing', posted)

    def on_get_new_word(self, posted):
        global artist
        if self.client_id == artist:
            new_word = choose_word()
            self.emit('new_word', {'word': new_word})

    def on_register_user(self, posted):
        global artist
        global players
        self.username = posted['username']
        players[self.client_id] = self.username
        self.log("registered username %s" % self.username)        

    def on_post_chat(self, posted):
        global players
        cleaned = bleach.clean(posted['msg'])
        self.log("message: %s" % posted)
        try:
            nick = players[posted['sender']]
            self.broadcast_event('chat_msg', {'sender': nick, 'msg': cleaned})
        except KeyError:
            self.broadcast_event('chat_msg', {'sender': posted['sender'], 'msg': cleaned})


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
