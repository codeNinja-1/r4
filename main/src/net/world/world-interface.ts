import { Vector2D } from "../../utils/vector2d/vector2d.js";
import { Chunk } from "../../world/chunk.js";

export interface WorldInterface {
    setupStorage(): Promise<void>;
    loadChunk(position: Vector2D): Promise<Chunk>;
    unloadChunk(position: Vector2D): Promise<void>;

    on(type: string, callback: (event: WorldEvent) => void): void;
    trigger(event: WorldEvent): void;
}