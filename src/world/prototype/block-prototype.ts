import { IndexedRegistryItem } from "../../game/registry/indexed-registry-item.js";
import { BlockModel } from "../../render/world/model/static/block-model.js";
import { BlockPosition } from "./block-position.js";

export abstract class BlockPrototype extends IndexedRegistryItem {
    abstract instantiate(position: BlockPosition): void;

    abstract whenDestroyed(position: BlockPosition): void;
    abstract whenUsed(position: BlockPosition): void;
    abstract whenPlaced(position: BlockPosition): void;
    abstract whenTicked(position: BlockPosition): void;

    abstract getBlockModel(position: BlockPosition): BlockModel | null;

    abstract setup(): Promise<void>;
}