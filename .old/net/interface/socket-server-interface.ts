import ws from 'ws';
import http from 'http';
import https from 'https';
import { SocketInterface } from './socket-interface.js';
import { SocketMessage } from './socket-message.js';

export class ServerInterface {
    private server: ws.WebSocketServer;
    sockets: Set<SocketInterface>;
    _connectListeners: Set<(socket: SocketInterface) => void>;

    constructor(server: http.Server | https.Server, messages: Set<SocketMessage>) {
        if (!ws.WebSocketServer) {
            throw new Error("Cannot create ServerInterface: WebSocketServer is not available");
        }

        this.server = new ws.WebSocketServer({ server });
        this.sockets = new Set();
        this._connectListeners = new Set();

        this.server.on('connection', webSocket => {
            webSocket.on('error', error => {
                error.message = `WebSocket error: ${error.message}`;

                console.warn(error.stack);
            });

            const socket = new SocketInterface(webSocket, messages);

            this.sockets.add(socket);

            for (const listener of this._connectListeners) {
                listener(socket);
            }

            socket.on('disconnect', () => {
                this.sockets.delete(socket);
            });
        });
    }

    on(type: string, listener: (socket: SocketInterface) => void) {
        if (type == 'connection') {
            this._connectListeners.add(listener);
        }
    }
}