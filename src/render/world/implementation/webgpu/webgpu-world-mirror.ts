import { Registries } from "../../../../game/registry/registries.js";
import { Vector2D } from "../../../../utils/vector2d/vector2d.js";
import { World } from "../../../../world/world.js";
import { RenderWorldMirror } from "../../mirror/render-world-mirror.js";
import { Perspective } from "../../pespective/perspective.js";
import { AssembledMesh } from "../../terrain/assembled-mesh.js";
import { MeshAssembler } from "../../terrain/mesh-assembler.js";
import { WebGPUTexture } from "./bindings/webgpu-texture.js";
import { GraphicsDevice } from "./graphics-device.js";
import { WebGPUChunkMirror } from "./webgpu-chunk-mirror.js";
import { WebGPURenderer } from "./webgpu-renderer.js";

export class WebGPUWorldMirror extends RenderWorldMirror<WebGPUChunkMirror> {
    private terrainMesh: AssembledMesh;
    private terrainTexture: WebGPUTexture;

    constructor(private renderer: WebGPURenderer) {
        super();
    }

    async setup(device: GraphicsDevice): Promise<void> {
        const meshAssembler = new MeshAssembler(Registries.blockModels.values());
        this.terrainMesh = meshAssembler.assembleMeshes();

        this.terrainTexture = new WebGPUTexture(this.terrainMesh.getTexture());
        await this.terrainTexture.setup(device);
    }

    getWorld(): World {
        return this.renderer.getWorld();
    }

    getPerspective(): Perspective {
        return this.renderer.getPerspective();
    }

    protected createRenderChunkMirror(position: Vector2D): WebGPUChunkMirror {
        return new WebGPUChunkMirror(position, this);
    }

    updateRenderedWorld(): void {
        super.updateRenderedWorld();

        for (const chunk of this.getChunks()) {
            chunk.update();
        }
    }

    getTerrainMesh(): AssembledMesh {
        return this.terrainMesh;
    }

    getWorldRenderer(): WebGPURenderer {
        return this.renderer;
    }

    getVisibleChunks(): Iterable<WebGPUChunkMirror> {
        return this.getChunks();
    }
}