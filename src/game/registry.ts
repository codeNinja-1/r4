import { ChunkDataFieldAllocation } from "../world/chunk-data/chunk-data-field-allocation.js";
import { BlockPrototypeRegistry } from "../world/prototype/block-prototype-registry.js";
import { EntityPrototype } from "../world/prototype/entity-prototype.js";

export class Registry<T> {
    private data: Map<string, T>;

    constructor() {
        this.data = new Map();
    }

    entries() {
        return this.data.entries();
    }

    get(identifier: string) {
        return this.data.get(identifier);
    }

    register(identifier: string, object: T) {
        this.data.set(identifier, object);
    }
}