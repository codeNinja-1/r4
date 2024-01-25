import { SocketInterface } from "./socket-interface.js";
import { SocketMessage } from "./socket-message.js";

export interface SocketMessageInterface {
    bindSocket(socket: SocketInterface): any;
    interfaceMessages(): Generator<SocketMessage>;
}