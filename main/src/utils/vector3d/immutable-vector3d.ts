import { Vector2D } from "../vector2d/vector2d.js";
import { Vector3D } from "./vector3d.js";

export class ImmutableVector3D extends Vector3D {
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(x, y, z);
    }

    _set(x: number, y: number, z: number): ImmutableVector3D {
        return new ImmutableVector3D(x, y, z);
    }

    private set(x: number | Vector3D, y?: number, z?: number) {
        throw new Error("Cannot set immutable vector");
    }

    static from(vector: Vector2D, format: string) {
        return new ImmutableVector3D(...Vector3D._from(vector, format));
    }
}