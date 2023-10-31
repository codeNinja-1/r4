import ws from 'ws';
import { Registry } from '../platform/registry.js';
import { DataType } from '../data/types/data-type.js';
import { SocketMessage } from './socket-message.js';
import { Identifier } from '../platform/identifier.js';

export class SocketInterface {
    socket: ws.WebSocket;
    _nameToId: Map<string, number>;
    _messagesById: Map<number, any>;
    _messages: Set<SocketMessage>;
    _messageListeners: Set<(data: any) => void>[];
    _disconnectListeners: Set<() => void>;

    constructor(urlOrWebsocket: string | ws.WebSocket, messages: Set<SocketMessage>) {
        this.socket = urlOrWebsocket instanceof ws.WebSocket ? urlOrWebsocket : new ws.WebSocket(urlOrWebsocket);
        this.socket.binaryType = "arraybuffer";

        this._nameToId = new Map();
        this._messagesById = new Map();
        this._messages = messages;
        this._messageListeners = [];
        this._disconnectListeners = new Set();

        this.socket.addEventListener('message', event => {
            const view = new DataView(event.data as ArrayBuffer);
            const id = view.getUint16(0);
            const transcoder = this._messagesById.get(id);

            if (!transcoder) {
                console.warn(new Error(`Unknown message id ${id}`).stack);

                return;
            }

            let data;

            try {
                data = transcoder.decodeFrom(view, 2);
            } catch (error) {
                error.message = `Failed to decode message '${name}': ${error.message}`;

                console.warn(error.stack);
            }

            const listeners = this._messageListeners[id];

            for (const listener of listeners) {
                listener(data);
            }
        });

        this.socket.addEventListener('close', () => {
            for (const listener of this._disconnectListeners) {
                listener();
            }
        });
    }

    setup() {
        [ ...this._messages ].sort()
            .forEach(({ id, type }, index) => {
                this._nameToId.set(id.toString(), index);
                this._messageListeners[index] = new Set();
                this._messagesById.set(index, type);
            });
    }

    emit(name: string, data: any) {
        const id = this._nameToId.get(name);
        const transcoder = this._messagesById.get(id);

        const buffer = new ArrayBuffer(2 + transcoder.lengthOf(data));
        const view = new DataView(buffer);
        view.setUint16(0, id);
        
        try {
            transcoder.encodeTo(data, view, 2);
        } catch (error) {
            error.message = `Failed to encode message '${name}': ${error.message}`;

            throw error;
        }

        this.socket.send(buffer);
    }

    on(name: 'disconnect', callback: () => unknown): void;
    on(name: string | Identifier, callback: (data: any) => unknown): void;
    on(name: string | Identifier, callback: ((data: any) => unknown) | (() => unknown)): void {
        if (name == 'disconnect') {
            this._disconnectListeners.add(callback as () => unknown);
        } else {
            const id = this._nameToId.get(name.toString());

            if (!this._messageListeners[id]) {
                throw new Error(`Unknown message name '${name.toString()}'`);
            }

            this._messageListeners[id].add(callback);
        }
    }

    disconnect() {
        this.socket.close();
    }
}