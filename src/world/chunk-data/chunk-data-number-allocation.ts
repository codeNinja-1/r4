import { ChunkDataFieldAllocation } from "./chunk-data-field-allocation.js";
import { ChunkDataNumberField } from "./chunk-data-number-field.js";
import { ChunkDataNumberType } from "./chunk-data-number-type.js";

/**
 * Represents an allocation of a field for any size of `number`.
 */
export class ChunkDataNumberAllocation implements ChunkDataFieldAllocation<number> {
    /**
     * Constructs a new `ChunkDataNumberAllocation`
     * object with a given number type, represented
     * as a `ChunkDataNumberType`.
     */
    constructor(public type: ChunkDataNumberType) {
    }

    instantiate() {
        return new ChunkDataNumberField(this.type);
    }
}