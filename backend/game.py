from socketio.namespace import BaseNamespace
from socketio import socketio_manage

from flask import request, Response

from backend import app

clients = 0
artist = 1

class PictNamespace(BaseNamespace):
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

    def on_test_hook(self, posted):
        self.log('Got some data, now what?');

    def on_post_drawing(self, posted):
        global artist
        if self.client_id == artist:
            self.broadcast_event_not_me('download_drawing', posted)

@app.route('/socket.io/<path:remaining>')
def route(remaining):
    socketio_manage(request.environ, {'/game': PictNamespace}, request)
    return Response()
