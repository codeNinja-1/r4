import { Vector2D } from "../vector2d/vector2d.js";
import { ImmutableVector3D } from "./immutable-vector3d.js";
import { MutableVector3D } from "./mutable-vector3d.js";
import { Vector3D } from "./vector3d.js";

export class HandleableVector3D extends MutableVector3D {
    _listeners: Set<() => unknown>;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(x, y, z);

        this._listeners = new Set();
    }

    on(type: 'change', handler: () => unknown) {
        if (type == 'change') {
            this._listeners.add(handler);
        } else {
            throw new Error('Unknown event type');
        }
    }

    cause(type: 'change') {
        if (type == 'change') {
            for (const listener of this._listeners) {
                listener();
            }
        } else {
            throw new Error('Unknown event type');
        }
    }

    _set(x: number, y: number, z: number): this {
        this.cause('change');

        return super._set(x, y, z);
    }

    clone(): Vector3D {
        throw new Error("Cannot clone handleable vector. Instead use immutable() or mutable() to output a non-handlable vector.");
    }

    immutable(): ImmutableVector3D {
        return new ImmutableVector3D(this.x, this.y, this.z);
    }

    mutable(): MutableVector3D {
        return new MutableVector3D(this.x, this.y, this.z);
    }

    static from(vector: Vector2D, format: string) {
        const values = [...Vector3D._from(vector, format)];

        return new HandleableVector3D(values[0], values[1], values[2]);
    }
}