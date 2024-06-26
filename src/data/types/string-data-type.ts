import { DecodedData } from "../decoded-data.js";
import { DataType } from "./data-type.js";
import { NumberDataType } from "./number-data-type.js";

export class StringDataType implements DataType<string> {
    constructor(public length: NumberDataType | number) {
    }

    *encode(data: string) {
        const array = new TextEncoder().encode(data);

        if (this.length instanceof NumberDataType) {
            yield* this.length.encode(array.byteLength);
        }

        yield array;
    }

    decode(view: DataView, index: number) {
        let length: number;

        if (this.length instanceof NumberDataType) {
            length = this.length.decode(view, index).data;
        } else {
            length = this.length;
        }

        const data = new TextDecoder().decode(view.buffer.slice(index, index + length));

        return new DecodedData(data, length);
    }
}