import { Vector2D } from "../../../../utils/vector2d/vector2d.js";
import { ChunkInterface } from "../../../../world/chunk-interface.js";
import { RenderChunkMirror } from "../../mirror/render-chunk-mirror.js";
import { WebGPUInstancedData } from "./webgpu-instanced-data.js";
import { WebGPUUtils } from "./webgpu-utils.js";
import { WebGPUWorldMirror } from "./webgpu-world-mirror.js";

export class WebGPUChunkMirror implements RenderChunkMirror {
    private instancedData: WebGPUInstancedData;
    private chunk: ChunkInterface.NonPlaceholder;

    constructor(private position: Vector2D, private worldMirror: WebGPUWorldMirror) {
        this.chunk = this.worldMirror.getWorld().getChunk(this.position) as ChunkInterface.NonPlaceholder;
        this.instancedData = new WebGPUInstancedData(worldMirror.getTerrainMesh(), this.chunk.getChunkData());
    }

    renderChunk(renderPassEncoder: GPURenderPassEncoder): void {
        const instanceCalls = this.instancedData.getIndirectCalls();
        const callBuffer = WebGPUUtils.createIndirectCallBuffer(
            this.worldMirror.getWorldRenderer().getGPUDevice(),
            instanceCalls
        );

        renderPassEncoder.drawIndirect(callBuffer, 0);

        callBuffer.destroy();
    }

    getPosition(): Vector2D {
        return this.position;
    }
}