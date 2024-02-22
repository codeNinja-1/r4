import { Vector2D } from "../utils/vector2d/vector2d.js";
import { ChunkData } from "./chunk-data/chunk-data.js";
import { ChunkInterface } from "./chunk-interface.js";
import { World } from "./world.js";

export class PlaceholderChunk extends ChunkInterface.Placeholder {
    private position: Vector2D;
    private world: World | null = null;

    constructor() {
        super();
    }

    getPosition(): Vector2D {
        return this.position;
    }

    getWorld(): World {
        if (!this.world) throw new Error("Cannot get world of unbound chunk");

        return this.world;
    }

    getChunkData(): ChunkData {
        throw new Error("Chunk data does not exist on placeholder");
    }

    bindWorld(world: World, position: Vector2D): void {
        this.world = world;
        this.position = position;
    }

    unloadChunk(): void {}
    setupChunk(): void {}
    tickChunk(): void {}
}