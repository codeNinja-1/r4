import { ImmutableVector2D } from "../utils/vector2d/immutable-vector2d.js";
import { Vector2D } from "../utils/vector2d/vector2d.js";
import { ChunkDataReferencer } from "./chunk-data/chunk-data-referencer.js";
import { ChunkInterface } from "./chunk-interface.js";
import { BaseChunk } from "./base-chunk.js";
import { Entity } from "./entity/entity.js";
import { PlaceholderChunk } from "./placeholder-chunk.js";
import { ChunkLoadQueue } from "./world-generation/chunk-load-queue.js";
import { ChunkLoadState } from "./world-generation/chunk-load-state.js";
import { WorldLoader } from "./world-loader.js";

export class World {
    entityIdMapping: Map<string, Entity>;
    private chunks: Map<string, ChunkInterface>;
    private loader: WorldLoader;
    private queue: ChunkLoadQueue;

    constructor() {
        this.entityIdMapping = new Map();
        this.chunks = new Map();
        this.queue = new ChunkLoadQueue(this);

        // TODO: Only for development
        ((window as any).__dev__ ??= {}).world = this;
    }

    getWorldLoader() {
        return this.loader;
    }

    setWorldLoader(loader: WorldLoader) {
        this.loader = loader;
        loader.bindWorld(this);
    }

    getChunkLoadQueue() {
        return this.queue;
    }

    createChunk(position: Vector2D): BaseChunk;
    createChunk(x: number, z: number): BaseChunk;
    createChunk(x: number | Vector2D, z?: number) {
        if (x instanceof Vector2D) {
            z = x.y;
            x = x.x;
        }

        const chunk = new BaseChunk();

        chunk.bindWorld(this, new ImmutableVector2D(x, z));
        chunk.setupChunk();

        return chunk;
    }

    getChunk(x: Vector2D): ChunkInterface;
    getChunk(x: number, z: number): ChunkInterface;
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

    setChunk(x: number, z: number, chunk: ChunkInterface): void;
    setChunk(position: Vector2D, chunk: ChunkInterface): void;
    setChunk(x: Vector2D | number, z: number | ChunkInterface, chunk?: ChunkInterface) {
        if (x instanceof Vector2D) {
            chunk = z as ChunkInterface;
            z = x.y;
            x = x.x;
        } else if (typeof z !== 'number') {
            throw new Error("Invalid arguments");
        }

        if (chunk === undefined) {
            throw new Error("Invalid arguments");
        }

        const old = this.getChunk(x, z);

        if (old) {
            old.unloadChunk();
        }

        this.chunks.set(x + '.' + z, chunk);
        chunk.bindWorld(this, new ImmutableVector2D(x, z));
    }

    loadChunk(x: number, z: number, target?: number): ChunkInterface;
    loadChunk(position: Vector2D, target?: number): ChunkInterface;
    loadChunk(x: Vector2D | number, z?: number, target?: number): ChunkInterface {
        if (x instanceof Vector2D) {
            target = z;
            z = x.y;
            x = x.x;
        } else if (typeof z !== 'number') {
            throw new Error("Invalid arguments");
        }

        const chunk = this.getChunk(x, z);
        if (chunk) { return chunk; }

        if (!this.loader) {
            throw new Error("Cannot load chunk: World has no loader");
        }

        const placeholder = new PlaceholderChunk();

        this.setChunk(new ImmutableVector2D(x, z), placeholder);
        placeholder.loadState.target = target ?? Infinity;

        this.queue.add(placeholder);

        return placeholder;
    }
}