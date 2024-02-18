import { ImmutableVector2D } from "../../utils/vector2d/immutable-vector2d.js";
import { Vector2D } from "../../utils/vector2d/vector2d.js";
import { ChunkInstanceReferencer } from "../../world/block-fields/chunk-instance-referencer.js";
import { WorldRenderer } from "./world-renderer.js";
import { InstanceReferencer } from "./instance-referencer.js";
import { RenderChunkMirror } from "./render-chunk-mirror.js";

export class RenderWorldMirror<M extends RenderChunkMirror> {
    private referencer: ChunkInstanceReferencer = new ChunkInstanceReferencer();
    private chunks: Map<string, RenderChunkMirror> = new Map();
    
    constructor(private worldRenderer: WorldRenderer) {
    }

    render() {
        for (const [ position, chunk ] of this.chunks) {
            chunk.renderChunk();
        }
    }

    getInstanceReferencer(): InstanceReferencer {
        return this.referencer;
    }

    updateRenderedWorld() {
        const world = this.worldRenderer.getWorld();
        const perspective = this.worldRenderer.getPerspective();
        const perspectiveLocation = perspective.getChunkLocation();
        const renderDistance = perspective.getRenderDistance();
        const renderDistanceSquared = renderDistance ** 2;

        for (const [ key, mirror ] of this.chunks) {
            const chunk = world.getChunk(mirror.getPosition());

            if (!chunk) continue;
            if (chunk.isPlaceholder()) continue;

            const chunkPosition = chunk.getPosition();

            if (chunkPosition.distanceSquaredTo(perspectiveLocation) > renderDistanceSquared) {
                this.chunks.delete(key);
            }
        }

        for (let x = perspectiveLocation.x - renderDistance; x <= perspectiveLocation.x + renderDistance; x++) {
            for (let z = perspectiveLocation.y - renderDistance; z <= perspectiveLocation.y + renderDistance; z++) {
                const chunk = world.getChunk(x, z);

                if (!chunk || chunk.isPlaceholder()) {
                    continue;
                }

                const key = x + '.' + z;
                const position = new ImmutableVector2D(x, z);

                if (!this.chunks.has(key)) {
                    this.chunks.set(key, this.worldRenderer.createRenderChunkMirror(position));
                }
            }
        }
    }
}