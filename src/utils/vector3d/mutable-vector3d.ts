import { Vector2D } from "../vector2d/vector2d.js";
import { Vector3D } from "./vector3d.js";

export class MutableVector3D extends Vector3D {
    constructor(vector: Vector3D);
    constructor(x: number, y: number, z: number);
    constructor();
    constructor(x?: number | Vector3D, y?: number, z?: number) {
        if (x instanceof Vector3D) super(x.x, x.y, x.z);
        else if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') super(x, y, z);
        else super(0, 0, 0);
    }

    _set(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    static from(vector: Vector2D, format: string) {
        const values = [...Vector3D._from(vector, format)];

        return new MutableVector3D(values[0], values[1], values[2]);
    }
}