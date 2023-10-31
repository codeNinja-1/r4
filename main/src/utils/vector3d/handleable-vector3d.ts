import { Vector2D } from "../vector2d/vector2d.js";
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

    clone() {
        throw new Error("Cannot clone handleable vector. Instead use immutable() or mutable() to output a non-handlable vector.");
    }

    static from(vector: Vector2D, format: string) {
        return new HandleableVector3D(...Vector3D._from(vector, format));
    }
}