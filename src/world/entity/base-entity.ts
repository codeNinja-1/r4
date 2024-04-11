import { PhysicalEntityProperties } from "../../physics/entity/physical-entity-properties.js";
import { PhysicalEntityState } from "../../physics/entity/physical-entity-state.js";
import { Rotation } from "../../utils/rotation/rotation.js";
import { HandleableVector3D } from "../../utils/vector3d/handleable-vector3d.js";
import { Vector3D } from "../../utils/vector3d/vector3d.js";
import { ChunkDataReferencer } from "../chunk-data/chunk-data-referencer.js";
import { ChunkInterface } from "../chunk-interface.js";
import { EntityPrototype } from "../prototype/entity-prototype.js";
import { World } from "../world.js";
import { Entity } from "./entity.js";

export abstract class BaseEntity implements Entity {
    private id: string;
    
    private chunk: ChunkInterface | null;
    private world: World | null;

    private position: HandleableVector3D = new HandleableVector3D();
    private rotation: Rotation = new Rotation();

    constructor() {
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
                    this.setParentChunk(chunk);
                }
            }
        });

        this.id = BaseEntity.generateUniqueId();
    }

    setWorld(world: World): void {
        if (world == null) {
            this.world = null;
            this.chunk = null;

            return;
        }

        // Set the entity's properties to be in the world.
        this.world = world;
        this.chunk = null;

        // Compute the location of the chunk the entity should be placed in.
        const targetChunkX = Math.floor(this.position.x / ChunkDataReferencer.dimensions.x);
        const targetChunkZ = Math.floor(this.position.z / ChunkDataReferencer.dimensions.z);

        // Get the chunk object that the entity should be placed in.
        let targetChunk = this.world.getChunk(targetChunkX, targetChunkZ);

        // If the chunk object doesn't exist and the entity can load new chunks, load the chunk.
        if (!targetChunk && this.canLoadChunks()) {
            this.world.loadChunk(targetChunkX, targetChunkZ);
            
            targetChunk = this.world.getChunk(targetChunkX, targetChunkZ);
        }

        // Update the chunk the entity is in.
        this.setParentChunk(targetChunk);
    }

    getWorld(): World | null {
        return this.world;
    }

    setParentChunk(chunk: ChunkInterface | null): void {
        if (this.chunk && !this.chunk.isPlaceholder()) this.chunk.getChunkData().removeEntity(this);
        this.chunk = chunk;
        if (this.chunk && !this.chunk.isPlaceholder()) this.chunk.getChunkData().addEntity(this);
    }

    getParentChunk(): ChunkInterface | null {
        return this.chunk;
    }

    async tickEntity(delta: number): Promise<void> {
    }

    getPosition(): HandleableVector3D {
        return this.position;
    }

    setPosition(x: number, y: number, z: number): void;
    setPosition(position: Vector3D): void;
    setPosition(x: Vector3D | number, y?: number, z?: number): void {
        if (x instanceof Vector3D) {
            this.position.set(x.x, x.y, x.z);
        } else if (typeof y == 'number' && typeof z == 'number') {
            this.position.set(x, y, z);
        } else {
            throw new Error("Invalid arguments to BaseEntity.setPosition()");
        }
    }

    getRotation(): Rotation {
        return this.rotation;
    }

    setRotation(rotation: Rotation): void {
        this.rotation = rotation;
    }

    getUniqueId(): string {
        return this.id;
    }

    abstract getPrototype(): EntityPrototype<BaseEntity>;
    abstract canLoadChunks(): boolean;

    getEntityModel() {
        return null;
    }

    getPhysicalEntity() {
        return null;
    }

    whenJoinWorld() {
    }

    getPhysicalState(): PhysicalEntityState | null {
        return null;
    }

    getPhysicalProperties(): PhysicalEntityProperties | null {
        return null;
    }

    static generateUniqueId(): string {
        return crypto.randomUUID();
    }
}