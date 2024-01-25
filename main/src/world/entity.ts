import { Rotation } from "../utils/rotation/rotation.js";
import { HandleableVector3D } from "../utils/vector3d/handleable-vector3d.js";
import { MutableVector3D } from "../utils/vector3d/mutable-vector3d.js";
import { Vector3D } from "../utils/vector3d/vector3d.js";
import { Chunk } from "./chunk.js";
import { World } from "./world.js";

export abstract class Entity {
    id: string;
    position: HandleableVector3D;
    chunk: Chunk | null;
    world: World | null;
    velocity: Vector3D;
    rotation: Rotation;

    constructor() {
        this.position = new HandleableVector3D();
        this.velocity = new MutableVector3D();

        this.position.on('change', () => {
            // If the entity is not in a world or chunk, it doesn't need to update it's chunk
            if (this.world && this.chunk) {
                // Compute the location of the chunk the entity should be moved to.
                const targetChunkX = Math.floor(this.position.x / this.world.chunkSize.chunkWidth);
                const targetChunkZ = Math.floor(this.position.z / this.world.chunkSize.chunkDepth);

                // Get the location of the chunk object that currently contains the entity.
                const currentChunkX = this.chunk.position.x;
                const currentChunkZ = this.chunk.position.y;

                // Check if the entity should move to a different chunk.
                if (currentChunkX != targetChunkX || currentChunkZ != targetChunkZ) {
                    // Update the chunk the entity is in.
                    this._updateCurrentChunk(this.world.getChunk(targetChunkX, targetChunkZ));
                }
            }
        });
    }

    _joinWorld(world: World) {
        // Set the entity's properties to be in the world.
        this.world = world;
        this.chunk = null;

        // Compute the location of the chunk the entity should be placed in.
        const targetChunkX = Math.floor(this.position.x / this.world.chunkSize.chunkWidth);
        const targetChunkZ = Math.floor(this.position.z / this.world.chunkSize.chunkDepth);

        // Get the chunk object that the entity should be placed in.
        let targetChunk = this.world.getChunk(targetChunkX, targetChunkZ);

        // If the chunk object doesn't exist and the entity can load new chunks, load the chunk.
        if (!targetChunk && this.canLoadChunks) {
            this.world.loadChunk(targetChunkX, targetChunkZ);
            
            targetChunk = this.world.getChunk(targetChunkX, targetChunkZ);
        }

        // Update the chunk the entity is in.
        this._updateCurrentChunk(targetChunk);
    }

    _updateCurrentChunk(chunk: Chunk | null) {
        if (this.chunk) this.chunk._entities.delete(this);
        this.chunk = chunk;
        if (this.chunk) this.chunk._entities.add(this);
    }

    _leaveWorld() {
        this.world = null;
        this.chunk = null;
    }

    tick() {
    }

    abstract canLoadChunks: boolean;
}