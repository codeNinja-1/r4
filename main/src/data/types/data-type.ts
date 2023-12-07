import { DecodedData } from "../decoded-data.js";

export interface DataType<T> {
    encode(data: T): Generator<ArrayBuffer>;
    decode(view: DataView, index: number): DecodedData<T>;
}