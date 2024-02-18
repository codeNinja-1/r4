import { Vector2D } from "../../utils/vector2d/vector2d.js";

export interface RenderChunkMirror {
    renderChunk(): void;
    getPosition(): Vector2D;
}