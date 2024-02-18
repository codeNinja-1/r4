import { Entity } from "../../world/entity.js";
import { NetworkConnection } from "./network-connection.js";

export class RemoteClient {
    private entity: Entity;

    constructor(connection: NetworkConnection) {
    }

    getEntity(): Entity {
        return this.entity;
    }
}