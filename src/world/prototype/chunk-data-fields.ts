import { Registries } from "../../game/registry/registries.js";
import { Registry } from "../../game/registry/registry.js";
import { ChunkDataField } from "../chunk-data/chunk-data-field.js";

/**
 * The ChunkDataFields allows multiple fields to be allocated
 * before creating chunks.
 * 
 * * Fields may be allocated in the `Registry.Fields` map.
 * * A map of `ChunkDataField` objects can be instantiated
 * using the `initialize()` method.
 */
export namespace ChunkDataFields {
    export function initialize(): Map<string, ChunkDataField<any>> {
        const fields = new Map<string, ChunkDataField<any>>();

        for (const [ id, field ] of Registries.fields.entries()) {
            fields.set(id, field.instantiate());
        }

        return fields;
    }
}