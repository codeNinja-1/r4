import { ChunkDataField } from "./chunk-data-field.js";
import { ChunkDataNumberType } from "./chunk-data-number-type.js";
import { ChunkDataReferencer } from "./chunk-data-referencer.js";
import { TypedArray } from "./typed-array.js";

/**
 * Represents a field for any size of `number`.
 */
export class ChunkDataNumberField extends ChunkDataField<number> {
    array: TypedArray;

    constructor(public type: ChunkDataNumberType) {
        super();

        this.array = ChunkDataNumberField.typedArray(type, ChunkDataReferencer.cells);
    }

    _get(index: number): number {
        if (this.type == "u4" || this.type == "i4") {
            const item = this.array[Math.floor(index / 2)] as number;

            if (index % 2 == 0) {
                return item & 0x0F;
            } else {
                return item >> 4;
            }
        } else if (this.type == "u64" || this.type == "i64") {
            return Number(this.array[index] as bigint);
        } else {
            return this.array[index] as number;
        }
    }

    _set(index: number, value: number) {
        if (this.type == "u4" || this.type == "i4") {
            const itemIndex = Math.floor(index / 2);
            const item = this.array[itemIndex] as number;

            if (index % 2 == 0) {
                this.array[itemIndex] = (item & 0xF0) | value;
            } else {
                this.array[itemIndex] = (item & 0x0F) | (value << 4);
            }
        } else if (this.type == "u64" || this.type == "i64") {
            this.array[index] = BigInt(value);
        
        } else {
            this.array[index] = value;
        }
    }

    /**
     * Create a typed array of a given `ChunkDataNumberType` and length.
     */
    static typedArray(type: ChunkDataNumberType, length: number): TypedArray {
        if (type == "u4") return new Uint8Array(length / 2);
        if (type == "u8") return new Uint8Array(length);
        if (type == "u16") return new Uint16Array(length);
        if (type == "u32") return new Uint32Array(length);
        if (type == "u64") return new BigUint64Array(length);
        if (type == "i8") return new Int8Array(length);
        if (type == "i16") return new Int16Array(length);
        if (type == "i32") return new Int32Array(length);
        if (type == "i64") return new BigInt64Array(length);
        if (type == "f32") return new Float32Array(length);
        if (type == "f64") return new Float64Array(length);

        throw new Error(`Unknown array type: ${type}`);
    }
}