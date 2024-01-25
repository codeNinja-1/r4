import { ImmutableVector2D } from "../utils/vector2d/immutable-vector2d.js";
import { Vector2D } from "../utils/vector2d/vector2d.js";
import { ImmutableVector3D } from "../utils/vector3d/immutable-vector3d.js";
import { ChunkDataAllocator } from "./chunk-data/chunk-data-allocator.js";
import { ChunkDataReferencer } from "./chunk-data/chunk-data-referencer.js";
import { Chunk } from "./chunk.js";
import { Entity } from "./entity.js";

export class World {
    referencer: ChunkDataReferencer;
    entityIdMapping: Map<string, Entity>;
    chunks: Map<string, Chunk>;

    constructor(
        public allocator: ChunkDataAllocator = new ChunkDataAllocator(),
        public chunkSize: ImmutableVector3D = new ImmutableVector3D(16, 64, 16)
    ) {
        this.entityIdMapping = new Map();
        this.chunks = new Map();
        this.referencer = new ChunkDataReferencer(chunkSize);
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
        
        return this.chunks.get(x + '.' + z) || null;
    }

    addEntity(entity: Entity) {
        this.entityIdMapping.set(entity.id, entity);

        const chunk = this.getChunk(
            Math.floor(entity.position.x / this.chunkSize.x),
            Math.floor(entity.position.z / this.chunkSize.z)
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

        this.entityIdMapping.delete(entity.id);
    }

    _validateDisconnectedEntities() {
        for (const entity of this.entityIdMapping.values()) {
            if (!entity.chunk) {
                console.warn("Entity is not in a chunk\n", entity);
            }
        }
    }

    tick() {
        for (const entity of this.entityIdMapping.values()) {
            entity.tick();
        }

        for (const [ _id, chunk ] of this.chunks) {
            chunk.tick();
        }

        this._validateDisconnectedEntities();
    }
}