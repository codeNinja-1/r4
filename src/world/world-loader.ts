import { Vector2D } from "../utils/vector2d/vector2d.js";
import { ChunkData } from "./chunk-data/chunk-data.js";

export interface WorldLoader {
    loadChunk(location: Vector2D): Promise<ChunkData>;
    saveChunk(location: Vector2D, chunk: ChunkData): Promise<void>;
    shouldUnloadChunks(): boolean;
}