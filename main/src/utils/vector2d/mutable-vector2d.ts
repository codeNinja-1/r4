import { Vector3D } from "../vector3d/vector3d.js";
import { Vector2D } from "./vector2d.js";

export class MutableVector2D extends Vector2D {
    constructor(x: number = 0, y: number = 0) {
        super(x, y);
    }

    _set(x: number, y: number) {
        this.x = x;
        this.y = y;

        return this;
    }

    set(x: number | Vector2D, y?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this.set(x, y);
            } else {
                return this.set(x, x);
            }
        } else {
            return this.set(x.x, x.y);
        }
    }

    static from(vector: Vector3D, format: string) {
        return new MutableVector2D(...Vector2D._from(vector, format));
    }
}