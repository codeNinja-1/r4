import { Registries } from "../../game/registry/registries.js";
import { BlockPosition } from "./block-position.js";
import { BlockPrototype } from "./block-prototype.js";

export abstract class BaseBlockPrototype extends BlockPrototype {
    instantiate(position: BlockPosition): void {
        position.getChunkData().getField('blockId').set(position, this.getRegisteredId());
    }

    whenDestroyed(position: BlockPosition): void {
        const empty = Registries.blocks.get('empty');

        if (!empty) {
            throw new Error("Empty block not found in registry");
        }

        position.getChunkData().setBlock(position, empty);
    }

    whenUsed(position: BlockPosition): void {
    }

    whenPlaced(position: BlockPosition): void {
    }

    whenTicked(position: BlockPosition): void {
    }

    isRendered() {
        return true;
    }

    async setup(): Promise<void> {
    }
}