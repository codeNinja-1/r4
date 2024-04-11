import { IndexedRegistryItem } from "../../../../game/registry/indexed-registry-item.js";

export interface StaticModel extends IndexedRegistryItem {
    getVertexPositions(): Float32Array;
    getTextureMappings(): Float32Array;
    getTextureIds(): Uint32Array;
}