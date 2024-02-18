import { ImmutableVector2D } from "../../utils/vector2d/immutable-vector2d.js";
import { Vector2D } from "../../utils/vector2d/vector2d.js";
import { ImmutableVector3D } from "../../utils/vector3d/immutable-vector3d.js";
import { Vector3D } from "../../utils/vector3d/vector3d.js";
import { ChunkDataReferencer } from "../chunk-data/chunk-data-referencer.js";
import { ChunkData } from "../chunk-data/chunk-data.js";
import { ChunkInterface } from "../chunk-interface.js";
import { World } from "../world.js";

export class BlockPosition {
    private position: Vector3D;
    private reference: World | ChunkData;

    constructor(position: Vector3D, reference: World);
    constructor(position: Vector3D, reference: ChunkData);
    constructor(x: number, y: number, z: number, reference: World);
    constructor(x: number, y: number, z: number, reference: ChunkData);
    constructor(x: Vector3D | number, y: World | ChunkData | number, z?: number, reference?: World | ChunkData) {
        if (x instanceof Vector3D) {
            if (y instanceof World || y instanceof ChunkData) {
                this.position = x;
                this.reference = y;
            } else {
                throw new Error("Invalid arguments");
            }
        } else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number' && reference instanceof World) {
            this.position = new ImmutableVector3D(x, y, z);
            this.reference = reference;
        } else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number' && reference instanceof ChunkData) {
            this.position = new ImmutableVector3D(x, y, z);
            this.reference = reference;
        } else {
            throw new Error("Invalid arguments");
        }
    }

    getGlobalPosition(): Vector3D {
        if (this.reference instanceof World) {
            return this.position.clone();
        } else {
            const chunk = this.reference.getChunk();

            if (!chunk) {
                throw new Error("Cannot get global position of disconnected ChunkData");
            }

            const position = chunk.getPosition();

            return this.position.clone().add(ImmutableVector3D.from(position, "x0y"));
        }
    }

    getLocalPosition(): Vector3D {
        if (this.reference instanceof ChunkData) {
            return this.position.clone();
        } else {
            return this.position.clone().subtract(ImmutableVector3D.from(this.getChunkPosition(), 'x0y'));
        }
    }

    getChunkPosition(): Vector2D {
        if (this.reference instanceof ChunkData) {
            const chunk = this.reference.getChunk();

            if (!chunk) {
                throw new Error("Cannot get global position of disconnected ChunkData");
            }

            return chunk.getPosition();
        } else {
            const chunkX = Math.floor(this.position.x / ChunkDataReferencer.dimensions.x);
            const chunkZ = Math.floor(this.position.z / ChunkDataReferencer.dimensions.z);

            return new ImmutableVector2D(chunkX, chunkZ);
        }
    }

    getWorld(): World {
        if (this.reference instanceof World) {
            return this.reference;
        } else {
            const chunk = this.reference.getChunk();

            if (!chunk) {
                throw new Error("Cannot get world of disconnected ChunkData");
            }
            
            return chunk.getWorld();
        }
    }

    getChunkData(): ChunkData {
        if (this.reference instanceof ChunkData) {
            return this.reference;
        } else {
            const position = this.getChunkPosition();
            const chunk = this.getWorld().getChunk(position);

            if (!chunk) {
                throw new Error("Cannot get chunk data of disconnected world");
            }

            return chunk.getChunkData();
        }
    }

    getChunk(): ChunkInterface {
        if (this.reference instanceof ChunkData) {
            const chunk = this.reference.getChunk();

            if (!chunk) {
                throw new Error("Cannot get chunk of disconnected ChunkData");
            }

            return chunk;
        } else {
            const position = this.getChunkPosition();
            const chunk = this.getWorld().getChunk(position);

            if (!chunk) {
                throw new Error("Cannot get chunk not in world");
            }

            return chunk;
        }
    }
}