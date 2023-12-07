import { ListDataType } from "../../data/types/list-data-type.js";
import { ObjectDataType } from "../../data/types/object-data-type.js";
import { ChunkDataOptions } from "./chunk-data-options.js";
import { ChunkDataReferencer } from "./chunk-data-referencer.js";

export class ChunkDataAllocator {
    _referencer: ChunkDataReferencer;
    _bitCount: number;
    _attributeCount: number;
    _buffers: { type: string, label: string }[];
    _fields: { type: string, index: number | string, label: string }[];
    _generatedOptions: ChunkDataOptions | null;

    constructor({ referencer }: { referencer: ChunkDataReferencer }) {
        this._referencer = referencer;
        this._bitCount = 0;
        this._attributeCount = 0;
        this._buffers = [];
        this._fields = [];
        this._generatedOptions = null;
    }

    allocate(type, label = '') {
        if (type == 'b') {
            let index = this._bitCount++;

            this._fields.push({ type: 'b', index, label });

            return index;
        } else if (type == 'a') {
            let index = this._attributeCount++;

            this._fields.push({ type: 'a', index: label || index, label: label || index.toString() });

            return label || index;
        } else {
            const index = this._buffers.length;

            this._buffers.push({ type, label });
            this._fields.push({ type, index, label });

            return index;
        }
    }

    generateOptions() {
        if (this._generatedOptions) return this._generatedOptions;

        this._generatedOptions = {
            bits: null,
            map: null,
            buffers: [],
            fields: this._fields
        };

        if (this._bitCount > 0) {
            this._generatedOptions.bits = {
                count: this._bitCount,
                referencer: this._referencer
            };
        }

        if (this._attributeCount > 0) {
            this._generatedOptions.map = {
                referencer: this._referencer
            };
        }

        for (const buffer of this._buffers) {
            this._generatedOptions.buffers.push({
                type: buffer.type,
                label: buffer.label,
                referencer: this._referencer
            });
        }

        return this._generatedOptions;
    }
}