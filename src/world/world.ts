import { ImmutableVector2D } from "../utils/vector2d/immutable-vector2d.js";
import { Vector2D } from "../utils/vector2d/vector2d.js";
import { ChunkDataReferencer } from "./chunk-data/chunk-data-referencer.js";
import { ChunkInterface } from "./chunk-interface.js";
import { Chunk } from "./chunk.js";
import { Entity } from "./entity.js";
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
        this.entityIdMapping.set(entity.id, entity);

        const chunk = this.getChunk(
            Math.floor(entity.position.x / ChunkDataReferencer.dimensions.x),
            Math.floor(entity.position.z / ChunkDataReferencer.dimensions.z)
        );

        if (!chunk) {
            throw new Error("Cannot add entity to world: Chunk does not exist");
        }

        entity._joinWorld(this);

        if (!chunk.isPlaceholder()) {
            chunk.getChunkData().addEntity(entity);
            entity._updateCurrentChunk(null);
        } else {
            entity._updateCurrentChunk(chunk as ChunkInterface.NonPlaceholder);
        }

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
            chunk.tickChunk();
        }

        this._validateDisconnectedEntities();
    }

    loadChunk(x: number, z: number): ChunkInterface.Placeholder;
    loadChunk(position: Vector2D): ChunkInterface.Placeholder;
    loadChunk(x: Vector2D | number, z?: number): ChunkInterface.Placeholder {
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

        if (this.getChunk(position)) {
            throw new Error("Cannot load chunk where another chunk already exists");
        }

        if (!this.loader) {
            throw new Error("Cannot load chunk: World has no loader");
        }

        const placeholder = new PlaceholderChunk();

        this.chunks.set(position.x + '.' + position.y, placeholder);

        this.loader.loadChunk(position).then(chunkData => {
            const chunk = new Chunk();

            chunk.bindWorld(this, position);
            chunk.setChunkData(chunkData);

            this.chunks.set(position.x + '.' + position.y, chunk);

            for (const entity of this.entityIdMapping.values()) {
                if (!entity.chunk) continue;

                if (entity.chunk.getPosition().equals(position)) {
                    entity._updateCurrentChunk(chunk);
                }
            }
        });

        return new PlaceholderChunk();
    }
}