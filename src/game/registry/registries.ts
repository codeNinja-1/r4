import { Texture } from "../../render/utils/texture.js";
import { BlockModel } from "../../render/world/model/static/block-model.js";
import { ChunkDataFieldAllocation } from "../../world/chunk-data/chunk-data-field-allocation.js";
import { BlockPrototype } from "../../world/prototype/block-prototype.js";
import { EntityPrototype } from "../../world/prototype/entity-prototype.js";
import { IndexedRegistry } from "./indexed-registry.js";
import { Registry } from "./registry.js";

export namespace Registries {
    export const blocks = new IndexedRegistry<BlockPrototype>();
    export const entities = new Registry<EntityPrototype<any>>();
    export const fields = new Registry<ChunkDataFieldAllocation<any>>();
    export const textures = new IndexedRegistry<Texture>();
    export const blockModels = new IndexedRegistry<BlockModel>();
}