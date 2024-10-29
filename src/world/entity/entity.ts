import { PhysicalEntityProperties } from "../../physics/entity/physical-entity-properties.js";
import { PhysicalEntityState } from "../../physics/entity/physical-entity-state.js";
import { DynamicModel } from "../../render/world/model/dynamic/dynamic-model.js";
import { Rotation } from "../../utils/rotation/rotation.js";
import { Vector3 } from "../../utils/vector3d/vector3.js";
import { ChunkInterface } from "../chunk-interface.js";
import { EntityPrototype } from "../prototype/entity-prototype.js";
import { World } from "../world.js";

export interface Entity {
    setWorld(world: World | null): void;
    getWorld(): World | null;
    
    setParentChunk(chunk: ChunkInterface | null): void;
    getParentChunk(): ChunkInterface | null;

    tickEntity(delta: number): Promise<void>;

    canLoadChunks(): boolean;

    getPosition(): Vector3;

    getRotation(): Rotation;

    getPrototype(): EntityPrototype<Entity>;

    getUniqueId(): string;

    getEntityModel(): DynamicModel | null;
    getPhysicalState(): PhysicalEntityState | null;
    getPhysicalProperties(): PhysicalEntityProperties | null;

    whenJoinWorld(): void;
}