import { Vector2D } from "../vector2d/vector2d.js";
import { HandleableVector3D } from "./handleable-vector3d.js";
import { ImmutableVector3D } from "./immutable-vector3d.js";
import { MutableVector3D } from "./mutable-vector3d.js";

export abstract class Vector3D {
    x: number;
    y: number;
    z: number;

    constructor(x = 0, y = 0, z = 0) {
        if (typeof x !== 'number') throw new TypeError('x must be a number');
        if (typeof y !== 'number') throw new TypeError('y must be a number');
        if (typeof z !== 'number') throw new TypeError('z must be a number');
        if (isNaN(x)) throw new TypeError('x must not be NaN');
        if (isNaN(y)) throw new TypeError('y must not be NaN');
        if (isNaN(z)) throw new TypeError('z must not be NaN');

        this.x = x;
        this.y = y;
        this.z = z;
    }

    abstract _set(x: number, y: number, z: number): Vector3D;

    add(x: number | Vector3D, y?: number, z?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x + x, this.y + y, this.z + z);
            } else {
                return this._set(this.x + x, this.y + x, this.z + x);
            }
        } else {
            return this._set(this.x + x.x, this.y + x.y, this.z + x.z);
        }
    }

    subtract(x: number | Vector3D, y?: number, z?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x - x, this.y - y, this.z - z);
            } else {
                return this._set(this.x - x, this.y - x, this.z - x);
            }
        } else {
            return this._set(this.x - x.x, this.y - x.y, this.z - x.z);
        }
    }

    reverseSubtract(x: number | Vector3D, y?: number, z?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(x - this.x, y - this.y, z - this.z);
            } else {
                return this._set(x - this.x, x - this.y, x - this.z);
            }
        } else {
            return this._set(x.x - this.x, x.y - this.y, x.z - this.z);
        }
    }

    complexMultiply(x: number | Vector3D, y?: number, z?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x * x - this.y * y, this.x * y + this.y * x, this.z * z);
            } else {
                return this._set(this.x * x, this.y * x, this.z * x);
            }
        } else {
            return this._set(this.x * x.x - this.y * x.y, this.x * x.y + this.y * x.x, this.z * x.z);
        }
    }

    scalarMultiply(x: number | Vector3D, y?: number, z?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x * x, this.y * y, this.z * z);
            } else {
                return this._set(this.x * x, this.y * x, this.z * x);
            }
        } else {
            return this._set(this.x * x.x, this.y * x.y, this.z * x.z);
        }
    }

    scalarDivide(x: number | Vector3D, y?: number, z?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x / x, this.y / y, this.z / z);
            } else {
                return this._set(this.x / x, this.y / x, this.z / x);
            }
        } else {
            return this._set(this.x / x.x, this.y / x.y, this.z / x.z);
        }
    }

    reverseScalarDivide(x: number | Vector3D, y?: number, z?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(x / this.x, y / this.y, this.z / z);
            } else {
                return this._set(x / this.x, x / this.y, this.z / z);
            }
        } else {
            return this._set(x.x / this.x, x.y / this.y, this.z / z);
        }
    }

    dot(x: number | Vector3D, y?: number, z?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this.x * x + this.y * y + this.z * z;
            } else {
                return this.x * x + this.y * x + this.z * x;
            }
        } else {
            return this.x * x.x + this.y * x.y + this.z * x.z;
        }
    }

    length() {
        return Math.sqrt(this.lengthSquared());
    }

    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }

    distanceTo(x: number | Vector3D, y?: number, z?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return Math.sqrt(this.distanceSquaredTo(x, y, z));
            } else {
                return Math.sqrt(this.distanceSquaredTo(x, x, x));
            }
        } else {
            return Math.sqrt(this.distanceSquaredTo(x.x, x.y, x.z));
        }
    }

    distanceSquaredTo(x: number | Vector3D, y?: number, z?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return (this.x - x) ** 2 + (this.y - y) ** 2 + (this.z - z) ** 2;
            } else {
                return (this.x - x) ** 2 + (this.y - x) ** 2 + (this.z - x) ** 2;
            }
        } else {
            return (this.x - x.x) ** 2 + (this.y - x.y) ** 2 + (this.z - x.z) ** 2;
        }
    }

    normalize() {
        return this.scalarDivide(this.length());
    }

    * [Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }

    toString() {
        return `${this.constructor.name} { ${this.x}, ${this.y} }`;
    }

    immutable() {
        return new ImmutableVector3D(this.x, this.y, this.z);
    }

    mutable() {
        return new MutableVector3D(this.x, this.y, this.z);
    }

    clone() {
        if (this instanceof MutableVector3D) return new MutableVector3D(this.x, this.y, this.z);
        if (this instanceof ImmutableVector3D) return new ImmutableVector3D(this.x, this.y, this.z);
        if (this instanceof HandleableVector3D) return new HandleableVector3D(this.x, this.y, this.z);
        throw new Error(`Unknown vector type: ${this.constructor.name}`);
    }

    handle() {
        return new HandleableVector3D(this.x, this.y, this.z);
    }

    static *_from(vector: Vector2D, format: string) {
        yield format[0] == 'x' ? vector.x : format[0] == 'y' ? vector.y : format[0] == '1' ? 1 : 0;
        yield format[1] == 'x' ? vector.x : format[1] == 'y' ? vector.y : format[1] == '1' ? 1 : 0;
        yield format[2] == 'x' ? vector.x : format[2] == 'y' ? vector.y : format[2] == '1' ? 1 : 0;
    }
}