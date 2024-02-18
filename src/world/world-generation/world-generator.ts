import { Vector2D } from "../../utils/vector2d/vector2d.js";
import { ChunkData } from "../chunk-data/chunk-data.js";

export interface WorldGenerator {
    generateChunk(location: Vector2D): Promise<ChunkData>;
}