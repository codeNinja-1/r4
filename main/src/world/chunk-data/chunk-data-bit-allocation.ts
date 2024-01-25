import { ChunkDataBitField } from "./chunk-data-bit-field.js";
import { ChunkDataFieldAllocation } from "./chunk-data-field-allocation.js";

/**
 * Represents an allocation of a field of the type `boolean`.
 */
export class ChunkDataBitAllocation implements ChunkDataFieldAllocation<boolean> {
    instantiate() {
        return new ChunkDataBitField();
    }
}