import { DecodedData } from "../decoded-data.js";
import { DataType } from "./data-type.js";

export class BufferDataType implements DataType<ArrayBuffer> {
    constructor(public byteLength: number) {
    }

    *encode(data: ArrayBuffer): Generator<ArrayBuffer> {
        yield data;
    }

    decode(view: DataView, index: number) {
        return new DecodedData(view.buffer.slice(index, index + this.byteLength), this.byteLength);
    }
}