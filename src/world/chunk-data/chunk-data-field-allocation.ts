import { ChunkDataField } from "./chunk-data-field.js";

/**
 * A `ChunkDataFieldAllocation` describes a field that
 * will be created in each chunk loaded. When
 * initialized by a `ChunkDataAllocator`, the
 * `instantiate()` method will be called to create a
 * `ChunkDataField` object.
 */
export interface ChunkDataFieldAllocation<RepresentedType = any> {
    /**
     * Instantiates and returns a `ChunkDataField`
     * instance to be stored in a `ChunkData` object.
     */
    instantiate(): ChunkDataField<RepresentedType>;
}