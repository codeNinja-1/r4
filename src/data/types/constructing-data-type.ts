import { DecodedData } from "../decoded-data.js";
import { DataType } from "./data-type.js";

export class ConstructingDataType<T, I> implements DataType<T> {
    constructor(private type: DataType<I>, private _encode: (data: T) => I, private _decode: (data: I) => T) {
    }

    *encode(data: T) {
        yield* this.type.encode(this._encode(data));
    }

    decode(view: DataView, index: number): DecodedData<T> {
        const { data, length } = this.type.decode(view, index);

        return new DecodedData(this._decode(data), length);
    }
}