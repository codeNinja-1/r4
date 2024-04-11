import { ImmutableVector2D } from "../utils/vector2d/immutable-vector2d.js";
import { Vector2D } from "../utils/vector2d/vector2d.js";
import { ChunkDataReferencer } from "./chunk-data/chunk-data-referencer.js";
import { ChunkInterface } from "./chunk-interface.js";
import { Chunk } from "./chunk.js";
import { Entity } from "./entity/entity.js";
import { PlaceholderChunk } from "./placeholder-chunk.js";
import { WorldLoader } from "./world-loader.js";

export class World {
    entityIdMapping: Map<string, Entity>;
    private chunks: Map<string, ChunkInterface>;
    private loader: WorldLoader;

    constructor() {
        this.entityIdMapping = new Map();
        this.chunks = new Map();
    }

    bindWorldLoader(loader: WorldLoader) {
        this.loader = loader;
    }

    createChunk(x: number | Vector2D, z?: number) {
        if (x instanceof Vector2D) {
            z = x.y;
            x = x.x;
        }

        const chunk = new Chunk();

        chunk.bindWorld(this, new ImmutableVector2D(x, z));
        chunk.setupChunk();

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
        this.entityIdMapping.set(entity.getUniqueId(), entity);

        const entityPosition = entity.getPosition();

        const chunkX = Math.floor(entityPosition.x / ChunkDataReferencer.dimensions.x);
        const chunkZ = Math.floor(entityPosition.z / ChunkDataReferencer.dimensions.z);

        const chunk = this.getChunk(chunkX, chunkZ) || this.loadChunk(chunkX, chunkZ);

        entity.setWorld(this);

        if (!chunk.isPlaceholder()) {
            chunk.getChunkData().addEntity(entity);
            entity.setParentChunk(null);
        } else {
            entity.setParentChunk(chunk as ChunkInterface.NonPlaceholder);
        }

        return entity;
    }

    removeEntity(entity: Entity) {
        entity.setWorld(null);

        this.entityIdMapping.delete(entity.getUniqueId());
    }

    _validateDisconnectedEntities() {
        for (const entity of this.entityIdMapping.values()) {
            if (!entity.getParentChunk()) {
                console.warn("Entity is not in a chunk\n", entity);
            }
        }
    }

    async tick(delta: number) {
        for (const entity of this.entityIdMapping.values()) {
            await entity.tickEntity(delta);
        }

        for (const [ _id, chunk ] of this.chunks) {
            await chunk.tickChunk();
        }

        this._validateDisconnectedEntities();
    }

    loadChunk(x: number, z: number): ChunkInterface;
    loadChunk(position: Vector2D): ChunkInterface;
    loadChunk(x: Vector2D | number, z?: number): ChunkInterface {
        let position: Vector2D;

        if (typeof x === 'number') {
            if (typeof z !== 'number') {
                throw new Error("Invalid arguments");
            } else {
                position = new ImmutableVector2D(x, z);
            }
        } else {
            position = new ImmutableVector2D(x.x, x.y);
        }

        let presentChunk = this.getChunk(position);
        if (presentChunk) { return presentChunk; }

        if (!this.loader) {
            throw new Error("Cannot load chunk: World has no loader");
        }

        const placeholder = new PlaceholderChunk();

        this.chunks.set(position.x + '.' + position.y, placeholder);

        placeholder.bindWorld(this, position);

        this.loader.loadChunk(position).then(chunkData => {
            const chunk = new Chunk();

            chunk.bindWorld(this, position);
            chunk.setChunkData(chunkData);

            this.chunks.set(position.x + '.' + position.y, chunk);

            for (const entity of this.entityIdMapping.values()) {
                const parentChunk = entity.getParentChunk();

                if (!parentChunk) continue;

                if (parentChunk.getPosition().equals(position)) {
                    entity.setParentChunk(chunk);
                    chunk.getChunkData().addEntity(entity);
                }
            }
        });

        return placeholder;
    }
}