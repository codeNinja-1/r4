import { ChunkDataFieldAllocation } from "../world/chunk-data/chunk-data-field-allocation.js";
import { BlockPrototypeRegistry } from "../world/prototype/block-prototype-registry.js";
import { EntityPrototype } from "../world/prototype/entity-prototype.js";
import { Registry } from "./registry.js";

export namespace Registries {
    export const blocks = new BlockPrototypeRegistry();
    export const entities = new Registry<EntityPrototype<any>>();
    export const fields = new Registry<ChunkDataFieldAllocation<any>>();

}