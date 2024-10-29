import { Feature } from "../content/worldgen/feature.js";
import { Vector2D } from "../utils/vector2d/vector2d.js";
import { ChunkData } from "./chunk-data/chunk-data.js";
import { ChunkLoadState } from "./world-generation/chunk-load-state.js";
import { World } from "./world.js";

export abstract class ChunkInterface {
    abstract getPosition(): Vector2D;

    abstract isPlaceholder(): boolean;

    abstract getWorld(): World | null;
    abstract bindWorld(world: World, position: Vector2D): void;
    
    abstract getChunkData(): ChunkData;

    unloadChunk() {}
    setupChunk() {}
    async tickChunk() {}

    abstract get loadState(): ChunkLoadState;
}

export namespace ChunkInterface {
    export abstract class NonPlaceholder extends ChunkInterface {
        abstract getPosition(): Vector2D;
        abstract getWorld(): World | null;
        abstract bindWorld(world: World, position: Vector2D): void;
        abstract getChunkData(): ChunkData;
        isPlaceholder(): false { return false; }
    }

    export abstract class Placeholder extends ChunkInterface {
        abstract getPosition(): Vector2D;
        abstract getWorld(): World | null;
        abstract bindWorld(world: World, position: Vector2D): void;
        isPlaceholder(): true { return true; }
    }
}