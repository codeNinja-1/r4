import { DataType } from "../data/types/data-type.js";

export class SocketMessage {
    constructor(public id: string, public type: DataType<any>) {
    }
}