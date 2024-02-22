import { Rotation } from "../../utils/rotation/rotation.js";
import { Vector3D } from "../../utils/vector3d/vector3d.js";
import { ChunkInterface } from "../chunk-interface.js";
import { EntityPrototype } from "../prototype/entity-prototype.js";
import { World } from "../world.js";

export interface Entity {
    setWorld(world: World | null): void;
    getWorld(): World | null;
    
    setParentChunk(chunk: ChunkInterface | null): void;
    getParentChunk(): ChunkInterface | null;

    tickEntity(): void;

    canLoadChunks(): boolean;

    getPosition(): Vector3D;
    setPosition(position: Vector3D): void;

    getRotation(): Rotation;
    setRotation(rotation: Rotation): void;

    getPrototype(): EntityPrototype<Entity>;

    getUniqueId(): string;
}