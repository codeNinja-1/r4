import { Rotation } from "../utils/rotation/rotation.js";
import { ImmutableVector2D } from "../utils/vector2d/immutable-vector2d.js";
import { HandleableVector3D } from "../utils/vector3d/handleable-vector3d.js";
import { MutableVector3D } from "../utils/vector3d/mutable-vector3d.js";
import { Vector3D } from "../utils/vector3d/vector3d.js";
import { ChunkDataReferencer } from "./chunk-data/chunk-data-referencer.js";
import { ChunkInterface } from "./chunk-interface.js";
import { World } from "./world.js";

export abstract class Entity {
    id: string;
    position: HandleableVector3D;
    chunk: ChunkInterface | null;
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
                const targetChunkX = Math.floor(this.position.x / ChunkDataReferencer.dimensions.x);
                const targetChunkZ = Math.floor(this.position.z / ChunkDataReferencer.dimensions.z);

                // Get the location of the chunk object that currently contains the entity.
                const currentChunkPosition = this.chunk.getPosition();
                const currentChunkX = currentChunkPosition.x;
                const currentChunkZ = currentChunkPosition.y;

                // Check if the entity should move to a different chunk.
                if (currentChunkX != targetChunkX || currentChunkZ != targetChunkZ) {
                    // Get the chunk that the entity should be in.
                    let chunk = this.world.getChunk(targetChunkX, targetChunkZ);

                    if (!chunk) {
                        chunk = this.world.loadChunk(targetChunkX, targetChunkZ);;
                    }

                    // Update the chunk the entity is in.
                    this._updateCurrentChunk(chunk);
                }
            }
        });
    }

    _joinWorld(world: World) {
        // Set the entity's properties to be in the world.
        this.world = world;
        this.chunk = null;

        // Compute the location of the chunk the entity should be placed in.
        const targetChunkX = Math.floor(this.position.x / ChunkDataReferencer.dimensions.x);
        const targetChunkZ = Math.floor(this.position.z / ChunkDataReferencer.dimensions.z);

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

    _updateCurrentChunk(chunk: ChunkInterface | null) {
        if (this.chunk && !this.chunk.isPlaceholder()) this.chunk.getChunkData().removeEntity(this);
        this.chunk = chunk;
        if (this.chunk && !this.chunk.isPlaceholder()) this.chunk.getChunkData().addEntity(this);
    }

    _leaveWorld() {
        this.world = null;
        this.chunk = null;
    }

    tick() {
    }

    abstract canLoadChunks: boolean;
}