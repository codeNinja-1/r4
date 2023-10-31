import { ChunkDataReferencer } from "./chunk-data-referencer.js";

export class ChunkDataBits {
    _count: number;
    _referencer: ChunkDataReferencer;
    _label: string;
    _arrays: Uint8Array[];

    constructor({ label = '', count, referencer, _arrays = null }: { label?: string, count: number, referencer: any, _arrays?: any }) {
        this._count = count;
        this._referencer = referencer;
        this._label = label;
        this._arrays = _arrays;

        if (!this._arrays) this._makeArrays();
    }

    _makeArrays() {
        this._arrays = [];

        for (let i = 0; i < this._count / 8; i++) {
            this._arrays.push(new Uint8Array(this._referencer.cellsInChunk));
        }
    }

    _labelString() {
        if (this._label) {
            return `'${this._label}'`;
        } else {
            return '[ChunkDataBits]';
        }
    }

    _array(index: number) {
        return this._arrays[Math.floor(index / 8)];
    }

    get(bitIndex: number, x: number, y: number, z: number) {
        if (typeof y == 'undefined') {
            if (x < 0 || x >= this._referencer._chunkWidth) throw new Error(`Index in ${this._labelString()} is out of bounds: ${x}`);

            return this._array(bitIndex)[x] & (1 << (bitIndex % 8));
        } else {
            return this._array(bitIndex)[this._referencer.indexOfPosition(x, y, z)] & (1 << (bitIndex % 8));
        }
    }

    set(bitIndex: number, x: number, y: number, z: number, value: boolean) {
        if (typeof y == 'undefined') {
            if (x < 0 || x >= this._referencer._chunkWidth) throw new Error(`Index in ${this._labelString()} is out of bounds: ${x}`);

            if (value) {
                this._array(bitIndex)[x] |= (1 << bitIndex);
            } else {
                this._array(bitIndex)[x] &= ~(1 << bitIndex);
            }
        } else {
            if (value) {
                this._array(bitIndex)[this._referencer.indexOfPosition(x, y, z)] |= (1 << (bitIndex % 8));
            } else {
                this._array(bitIndex)[this._referencer.indexOfPosition(x, y, z)] &= ~(1 << (bitIndex % 8));
            }
        }
    }
}