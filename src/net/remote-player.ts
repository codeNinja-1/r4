import { Entity } from "../world/entity.js";
import { SocketInterface } from "./socket-interface.js";

export class RemotePlayer {
    name: string;
    entity: Entity;
    socket: SocketInterface;
}