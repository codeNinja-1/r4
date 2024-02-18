import { Vector2D } from "../utils/vector2d/vector2d.js";
import { ChunkData } from "../world/chunk-data/chunk-data.js";
import { WorldGenerator } from "../world/world-generation/world-generator.js";
import { WorldLoader } from "../world/world-loader.js";

export class SingleplayerWorldLoader implements WorldLoader {
    constructor(private worldGenerator: WorldGenerator) {
    }
    
    loadChunk(location: Vector2D): Promise<ChunkData> {
        return this.worldGenerator.generateChunk(location);
    }

    saveChunk(location: Vector2D, chunk: ChunkData): Promise<void> {
        return Promise.resolve();
    }

    shouldUnloadChunks(): boolean {
        return false;
    }
}