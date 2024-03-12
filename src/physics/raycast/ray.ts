import { ImmutableVector3D } from "../../utils/vector3d/immutable-vector3d.js";
import { Vector3D } from "../../utils/vector3d/vector3d.js";

export class Ray {
    private start: Vector3D;
    private direction: Vector3D;

    constructor(start: Vector3D, direction: Vector3D) {
        this.start = new ImmutableVector3D(start);
        this.direction = new ImmutableVector3D(direction);
    }

    getStart() {
        return this.start;
    }

    getDirection() {
        return this.direction;
    }
}