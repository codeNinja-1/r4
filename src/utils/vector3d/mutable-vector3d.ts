import { Vector2D } from "../vector2d/vector2d.js";
import { Vector3D } from "./vector3d.js";

export class MutableVector3D extends Vector3D {
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(x, y, z);
    }

    _set(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    static from(vector: Vector2D, format: string) {
        return new MutableVector3D(...Vector3D._from(vector, format));
    }
}