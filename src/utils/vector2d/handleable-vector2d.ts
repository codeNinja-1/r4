import { MutableVector2D } from "./mutable-vector2d.js";
import { Vector2D } from "./vector2d.js";

export class HandleableVector2D extends MutableVector2D {
    _listeners: Set<() => unknown>;

    constructor(x: number = 0, y: number = 0) {
        super(x, y);

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

    _set(x: number, y: number): this {
        this.cause('change');

        return super._set(x, y);
    }

    clone(): this {
        throw new Error("Cannot clone handleable vector. Instead use immutable() or mutable() to output a non-handlable vector.");
    }
}