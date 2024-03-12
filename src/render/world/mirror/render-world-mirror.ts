import { ImmutableVector2D } from "../../../utils/vector2d/immutable-vector2d.js";
import { Vector2D } from "../../../utils/vector2d/vector2d.js";
import { World } from "../../../world/world.js";
import { Perspective } from "../pespective/perspective.js";
import { RenderChunkMirror } from "./render-chunk-mirror.js";

export abstract class RenderWorldMirror<M extends RenderChunkMirror> {
    private chunks: Map<string, M> = new Map();

    protected getChunks(): Iterable<M> {
        return this.chunks.values();
    }

    updateRenderedWorld() {
        const perspective = this.getPerspective();

        if (!perspective) {
            throw new Error("Cannot update rendered world without perspective");
        }

        const world = this.getWorld();
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
                    this.chunks.set(key, this.createRenderChunkMirror(position));
                }
            }
        }
    }

    protected abstract createRenderChunkMirror(position: Vector2D): M;
    
    abstract getWorld(): World;
    abstract getPerspective(): Perspective;
    abstract getVisibleChunks(): Iterable<M>;
}