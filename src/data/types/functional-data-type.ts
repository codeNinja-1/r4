import { DecodedData } from "../decoded-data.js";
import { DataType } from "./data-type.js";

export class FunctionalDataType<T> implements DataType<T> {
    constructor(public encode: (data: T) => Generator<ArrayBuffer, any, unknown>, public decode: (view: DataView, index: number) => DecodedData<T>) {
    }
}