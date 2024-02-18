import { Game } from "../../game/game.js";
import { BlockPosition } from "./block-position.js";

export abstract class BlockPrototype {
    abstract getBlockId(): number;
    abstract getBlockName(): string;
    
    abstract bindBlockReferences(id: number, name: string): void;

    abstract instantiate(position: BlockPosition): void;

    abstract whenDestroyed(position: BlockPosition): void;
    abstract whenUsed(position: BlockPosition): void;
    abstract whenPlaced(position: BlockPosition): void;
    abstract whenTicked(position: BlockPosition): void;

    abstract isRendered(position: BlockPosition): boolean;
}