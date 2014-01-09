from socketio.namespace import BaseNamespace
from socketio import socketio_manage

from flask import request, Response

from backend import app

class PictNamespace(BaseNamespace):
    def initialize(self):
        self.log("Socketio session commence")

    def log(self, message):
        self.logger.info("[{0}] {1}".format(self.socket.sessid, message))

    def on_test_hook(self, posted):
        self.log('Got some data, now what?');

@app.route('/socket.io/<path:remaining>')
def route(remaining):
    socketio_manage(request.environ, {'/game': GameNamespace}, request)
    return Response()
