import { Game } from "../../game/game.js";
import { Registries } from "../../game/registries.js";
import { BlockPosition } from "./block-position.js";
import { BlockPrototype } from "./block-prototype.js";

export class BaseBlockPrototype extends BlockPrototype {
    private blockId: number;
    private blockName: string;

    bindBlockReferences(blockId: number, blockName: string): void {
        this.blockId = blockId;
        this.blockName = blockName;
    }

    getBlockId(): number {
        return this.blockId;
    }

    getBlockName(): string {
        return this.blockName;
    }

    instantiate(position: BlockPosition): void {
        position.getChunkData().getField('blockId').set(position, this.blockId);
    }

    whenDestroyed(position: BlockPosition): void {
        const empty = Registries.blocks.get('empty');

        if (!empty) {
            throw new Error("Empty block not found in registry");
        }

        position.getChunkData().setBlock(position, empty);
    }

    whenUsed(position: BlockPosition): void {}
    whenPlaced(position: BlockPosition): void {}
    whenTicked(position: BlockPosition): void {}

    isRendered() {
        return true;
    }
}