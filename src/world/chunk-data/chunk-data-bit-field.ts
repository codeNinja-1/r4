import { ChunkDataField } from "./chunk-data-field.js";
import { ChunkDataReferencer } from "./chunk-data-referencer.js";

/**
 * Represents a field of the type `boolean`.
 */
export class ChunkDataBitField extends ChunkDataField<boolean> {
    array: Uint8Array;

    constructor() {
        super();

        this.array = new Uint8Array(ChunkDataReferencer.cells / 8);
    }

    _get(index: number) {
        const item = this.array[Math.floor(index / 8)];

        return !!(item & (1 << (index % 8)));
    }

    _set(index: number, value: boolean) {
        const item = this.array[Math.floor(index / 8)];

        if (value) {
            this.array[Math.floor(index / 8)] = item | (1 << (index % 8));
        } else {
            this.array[Math.floor(index / 8)] = item & ~(1 << (index % 8));
        }
    }
}