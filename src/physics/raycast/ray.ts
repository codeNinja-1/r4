import { Vector3 } from "../../utils/vector3d/vector3.js";

export class Ray {
    private start: Vector3;
    private direction: Vector3;

    constructor(start: Vector3, direction: Vector3) {
        this.start = Vector3.immutable(start.clone());
        this.direction = Vector3.immutable(direction.clone());
    }

    getStart() {
        return this.start;
    }

    getDirection() {
        return this.direction;
    }
}