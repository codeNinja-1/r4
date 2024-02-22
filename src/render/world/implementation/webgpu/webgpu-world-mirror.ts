import { Registries } from "../../../../game/registry/registries.js";
import { Vector2D } from "../../../../utils/vector2d/vector2d.js";
import { World } from "../../../../world/world.js";
import { RenderWorldMirror } from "../../mirror/render-world-mirror.js";
import { Perspective } from "../../pespective/perspective.js";
import { AssembledMesh } from "../../terrain/assembled-mesh.js";
import { MeshAssembler } from "../../terrain/mesh-assembler.js";
import { WebGPUChunkMirror } from "./webgpu-chunk-mirror.js";
import { WebGPURenderer } from "./webgpu-renderer.js";
import { WebGPUTexture } from "./webgpu-texture.js";

export class WebGPUWorldMirror extends RenderWorldMirror<WebGPUChunkMirror> {
    private terrainMesh: AssembledMesh;
    private terrainTexture: WebGPUTexture;

    constructor(private renderer: WebGPURenderer) {
        super();
    }

    setup() {
        const meshAssembler = new MeshAssembler(Registries.blockModels.values());
        this.terrainMesh = meshAssembler.assembleMeshes();

        this.terrainTexture = new WebGPUTexture(this.terrainMesh.getTexture());
        this.terrainTexture.bindRenderer(this.renderer);
        this.terrainTexture.setup();
    }

    getWorld(): World {
        return this.renderer.getWorld();
    }

    getPerspective(): Perspective {
        throw this.renderer.getPerspective();
    }

    protected createRenderChunkMirror(position: Vector2D): WebGPUChunkMirror {
        throw new WebGPUChunkMirror(position, this);
    }

    getTerrainMesh(): AssembledMesh {
        return this.terrainMesh;
    }
    
    renderWorld(renderPassEncoder: GPURenderPassEncoder): void {
        for (const chunk of this.getChunks()) {
            chunk.renderChunk(renderPassEncoder);
        }
    }

    getWorldRenderer(): WebGPURenderer {
        return this.renderer;
    }
}