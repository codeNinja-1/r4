import { ChunkDataReferencer } from "./chunk-data-referencer.js";

export type TypedArrayConstructor = Uint8ArrayConstructor | Int8ArrayConstructor | Uint16ArrayConstructor | Int16ArrayConstructor | Uint32ArrayConstructor | Int32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;
export type TypedArray = Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array;

export class ChunkDataBuffer {
    _arrayType: TypedArrayConstructor;
    _referencer: ChunkDataReferencer;
    _label: string;
    _data: TypedArray;

    constructor({ label = '', type, referencer } : { label: string, type: string, referencer: ChunkDataReferencer }) {
        this._arrayType = ChunkDataBuffer._typeToTypedArrayConstructor(type);
        this._referencer = referencer;
        this._label = label;

        this._data = new (this._arrayType)(referencer.cellsInChunk);
    }

    _labelString() {
        if (this._label) {
            return `'${this._label}'`;
        } else {
            return `ChunkDataBuffer<${this._data.constructor.name}>`;
        }
    }

    get(index: number): number;
    get(x: number, y: number, z: number): number;
    get(x: number, y?: number, z?: number) {
        if (typeof y == 'undefined') {
            if (x < 0 || x >= this._referencer._chunkWidth) throw new Error(`Index in ${this._labelString()} is out of bounds: ${x}`);

            return this._data[x];
        } else {
            return this._data[this._referencer.indexOfPosition(x, y, z)];
        }
    }

    set(x: number, y: number, z?: number, value?: number) {
        if (typeof z === 'undefined') {
            if (x < 0 || x >= this._referencer._chunkWidth) throw new Error(`Index in ${this._labelString()} is out of bounds: ${x}`);

            this._data[x] = z;
        } else {
            this._data[this._referencer.indexOfPosition(x, y, z)] = value;
        }
    }

    static _typeToTypedArrayConstructor(type: string): TypedArrayConstructor {
        if (type == 'i8') return Int8Array;
        if (type == 'i16') return Int16Array;
        if (type == 'i32') return Int32Array;
        if (type == 'u8') return Uint8Array;
        if (type == 'u16') return Uint16Array;
        if (type == 'u32') return Uint32Array;
        if (type == 'f32') return Float32Array;
        if (type == 'f64') return Float64Array;

        throw new Error(`Unknown array type: ${type}`);
    }
}