import { ImmutableVector2D } from "../utils/vector2d/immutable-vector2d.js";
import { Vector2D } from "../utils/vector2d/vector2d.js";
import { ChunkData } from "./chunk-data/chunk-data.js";
import { ChunkInterface } from "./chunk-interface.js";
import { ChunkLoadState } from "./world-generation/chunk-load-state.js";
import { World } from "./world.js";

export class BaseChunk extends ChunkInterface.NonPlaceholder {
    private position: ImmutableVector2D;
    private world: World | null = null;
    protected chunkData: ChunkData;

    constructor() {
        super();
    }

    getPosition(): Vector2D {
        return this.position;
    }

    getWorld(): World | null {
        return this.world ?? null;
    }

    getChunkData(): ChunkData {
        return this.chunkData;
    }

    bindWorld(world: World, position: Vector2D) {
        this.world = world;
        this.position = new ImmutableVector2D(position.x, position.y);
    }

    unloadChunk() {
        if (!this.world) throw new Error("Cannot unload unbound chunk");

        for (const entity of this.chunkData.getEntities()) {
            this.world.entityIdMapping.delete(entity.getUniqueId());
        }
    }

    setupChunk() {
        if (!this.world) throw new Error("Cannot setup unbound chunk");

        this.chunkData = new ChunkData();
    }

    async tickChunk() {
        await this.chunkData.tickChunkData();
    }

    loadState = {
        current: Infinity,
        target: Infinity
    };
}