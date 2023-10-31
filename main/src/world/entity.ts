import { Rotation } from "../utils/rotation.js";
import { Vector3D } from "../utils/vector3d/vector3d.js";
import { Chunk } from "./chunk.js";
import { World } from "./world.js";

export class Entity {
    id: string;
    position: Vector3D;
    chunk: Chunk;
    world: World;
    velocity: Vector3D;
    rotation: Rotation;

    _joinWorld(world: World) {
        this.world = world;
    }

    _updateCurrentChunk(chunk: Chunk) {
        this.chunk = chunk;
    }

    _leaveWorld() {
        this.world = null;
        this.chunk = null;
    }
}