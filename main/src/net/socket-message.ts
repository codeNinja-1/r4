import { DataType } from "../data/types/data-type.js";
import { Identifier } from "../platform/identifier.js";

export class SocketMessage {
    constructor(public id: Identifier, public type: DataType<any>) {
    }
}