import { DecodedData } from "../decoded-data.js";
import { NumberTypeUtils } from "../number-type-utils.js";
import { DataType } from "./data-type.js";

export class NumberDataType implements DataType<number> {
    constructor(public type: string) {
    }

    get byteLength() {
        return NumberTypeUtils.getSize(this.type);
    }

    *encode(value: number) {
        const buffer = new ArrayBuffer(NumberTypeUtils.getSize(this.type));
        const view = new DataView(buffer);

        if (this.type == 'i8') view.setInt8(0, value);
        else if (this.type == 'i16') view.setInt16(0, value);
        else if (this.type == 'i32') view.setInt32(0, value);
        else if (this.type == 'i64') view.setBigInt64(0, BigInt(value));
        else if (this.type == 'u8') view.setUint8(0, value);
        else if (this.type == 'u16') view.setUint16(0, value);
        else if (this.type == 'u32') view.setUint32(0, value);
        else if (this.type == 'u64') view.setBigUint64(0, BigInt(value));
        else if (this.type == 'f32') view.setFloat32(0, value);
        else if (this.type == 'f64') view.setFloat64(0, value);
        else throw new Error(`Unknown number type: ${this.type}`);

        yield buffer;
    }

    decode(view: DataView, index: number) {
        let value: number;

        if (this.type == 'i8') value = view.getInt8(index);
        else if (this.type == 'i16') value = view.getInt16(index);
        else if (this.type == 'i32') value = view.getInt32(index);
        else if (this.type == 'i64') value = Number(view.getBigInt64(index));
        else if (this.type == 'u8') value = view.getUint8(index);
        else if (this.type == 'u16') value = view.getUint16(index);
        else if (this.type == 'u32') value = view.getUint32(index);
        else if (this.type == 'u64') value = Number(view.getBigUint64(index));
        else if (this.type == 'f32') value = view.getFloat32(index);
        else if (this.type == 'f64') value = view.getFloat64(index);
        else throw new Error(`Unknown number type: ${this.type}`);

        return new DecodedData(value, NumberTypeUtils.getSize(this.type));
    }
}