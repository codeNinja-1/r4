import { ImmutableVector2D } from "../utils/vector2d/immutable-vector2d.js";
import { Vector2D } from "../utils/vector2d/vector2d.js";
import { ChunkDataAllocator } from "./chunk-data/chunk-data-allocator.js";
import { ChunkDataOptions } from "./chunk-data/chunk-data-options.js";
import { ChunkDataReferencer } from "./chunk-data/chunk-data-referencer.js";
import { Chunk } from "./chunk.js";
import { Entity } from "./entity.js";

export class World {
    chunkSize = { chunkWidth: 16, chunkHeight: 64, chunkDepth: 16 };
    _entityIdMapping: Map<string, Entity>;
    _chunks: Map<string, Chunk>;
    _chunkDataOptions: ChunkDataOptions;

    constructor() {
        this._entityIdMapping = new Map();
        this._chunks = new Map();
    }

    createAllocator() {
        const referencer = new ChunkDataReferencer(this.chunkSize);
        const allocator = new ChunkDataAllocator({ referencer });

        return allocator;
    }

    useAllocation(allocator: ChunkDataAllocator) {
        this._chunkDataOptions = allocator.generateOptions();
    }

    createChunk(x: number | Vector2D, z?: number) {
        if (x instanceof Vector2D) {
            z = x.y;
            x = x.x;
        }

        const chunk = new Chunk();

        chunk.world = this;
        chunk.position = new ImmutableVector2D(x, z);

        chunk._setup();

        return chunk;
    }

    getChunk(x: number | Vector2D, z?: number) {
        if (x instanceof Vector2D) {
            z = x.y;
            x = x.x;
        }
        
        return this._chunks.get(x + '.' + z) || null;
    }

    addEntity(entity: Entity) {
        this._entityIdMapping.set(entity.id, entity);

        const chunk = this.getChunk(
            Math.floor(entity.position.x / this.chunkSize.chunkWidth),
            Math.floor(entity.position.z / this.chunkSize.chunkDepth)
        );

        if (!chunk) {
            throw new Error("Cannot add entity to world: Chunk does not exist");
        }

        chunk._entities.add(entity);

        entity._joinWorld(this);
        entity._updateCurrentChunk(chunk);

        return entity;
    }

    removeEntity(entity: Entity) {
        entity._leaveWorld();

        this._entityIdMapping.delete(entity.id);
    }
}