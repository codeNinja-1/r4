import { Vector2D } from "../../utils/vector2d/vector2d.js";
import { RenderChunkMirror } from "../common/render-chunk-mirror.js";
import { WebGPURenderer } from "./webgpu-renderer.js";

export class WebGPUChunkMirror implements RenderChunkMirror {
    constructor(private position: Vector2D, private worldRenderer: WebGPURenderer) {
    }

    renderChunk(): void {
        // Not implemented
    }

    getPosition(): Vector2D {
        return this.position;
    }
}