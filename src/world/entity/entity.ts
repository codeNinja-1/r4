import { PhysicalEntityProperties } from "../../physics/entity/physical-entity-properties.js";
import { PhysicalEntityState } from "../../physics/entity/physical-entity-state.js";
import { DynamicModel } from "../../render/world/model/dynamic/dynamic-model.js";
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

    tickEntity(delta: number): void;

    canLoadChunks(): boolean;

    getPosition(): Vector3D;
    setPosition(x: number, y: number, z: number): void;
    setPosition(position: Vector3D): void;

    getRotation(): Rotation;
    setRotation(rotation: Rotation): void;

    getPrototype(): EntityPrototype<Entity>;

    getUniqueId(): string;

    getEntityModel(): DynamicModel | null;
    getPhysicalState(): PhysicalEntityState | null;
    getPhysicalProperties(): PhysicalEntityProperties | null;

    whenJoinWorld(): void;
}