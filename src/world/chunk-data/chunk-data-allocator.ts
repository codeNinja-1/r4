import { ChunkDataFieldAllocation } from "./chunk-data-field-allocation.js";
import { ChunkDataField } from "./chunk-data-field.js";

/**
 * The ChunkDataAllocator allows multiple fields to be
 * allocated before creating chunks.
 * 
 * * Fields may be allocated using the `allocate()`
 * method, passing in `ChunkDataFieldAllocation`
 * objects.
 * * A map of `ChunkDataField` objects can be instantiated
 * using the `initialize()` method.
 */
export class ChunkDataAllocator {
    fields: Map<string, ChunkDataFieldAllocation<any>> = new Map();

    constructor() {
    }

    allocate(id: string, field: ChunkDataFieldAllocation<any>) {
        if (this.fields.has(id)) {
            throw new Error(`Field id '${id}' is already used`);
        }

        this.fields.set(id, field);
    }

    initialize(): Map<string, ChunkDataField<any>> {
        const fields = new Map<string, ChunkDataField<any>>();

        for (const [ id, field ] of this.fields) {
            fields.set(id, field.instantiate());
        }

        return fields;
    }
}