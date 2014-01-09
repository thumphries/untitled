# This starts the web server for the application
# And is the main point of entry for the app
# python run.py
from socketio.server import SocketIOServer
from werkzeug.serving import run_with_reloader

from backend import app
from backend.views import *

PORT = 5000

@run_with_reloader
def run_server():
    app.debug = True
    print 'Listening on http://127.0.0.1:%s and on port 10843 (flash policy server)' % PORT
    SocketIOServer(('', PORT), app, resource='socket.io').serve_forever()

if __name__ == '__main__':
    run_server()
