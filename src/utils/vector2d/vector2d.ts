export abstract class Vector2D {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        if (typeof x !== 'number') throw new TypeError('x must be a number');
        if (typeof y !== 'number') throw new TypeError('y must be a number');
        if (isNaN(x)) throw new TypeError('x must not be NaN');
        if (isNaN(y)) throw new TypeError('y must not be NaN');

        this.x = x;
        this.y = y;
    }

    abstract _set(x: number, y: number): Vector2D;

    add(x: number | Vector2D, y?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x + x, this.y + y);
            } else {
                return this._set(this.x + x, this.y + x);
            }
        } else {
            return this._set(this.x + x.x, this.y + x.y);
        }
    }

    subtract(x: number | Vector2D, y?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x - x, this.y - y);
            } else {
                return this._set(this.x - x, this.y - x);
            }
        } else {
            return this._set(this.x - x.x, this.y - x.y);
        }
    }

    reverseSubtract(x: number | Vector2D, y?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(x - this.x, y - this.y);
            } else {
                return this._set(x - this.x, x - this.y);
            }
        } else {
            return this._set(x.x - this.x, x.y - this.y);
        }
    }

    complexMultiply(x: number | Vector2D, y?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x * x - this.y * y, this.x * y + this.y * x);
            } else {
                return this._set(this.x * x, this.y * x);
            }
        } else {
            return this._set(this.x * x.x - this.y * x.y, this.x * x.y + this.y * x.x);
        }
    }

    scalarMultiply(x: number | Vector2D, y?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x * x, this.y * y);
            } else {
                return this._set(this.x * x, this.y * x);
            }
        } else {
            return this._set(this.x * x.x, this.y * x.y);
        }
    }

    scalarDivide(x: number | Vector2D, y?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x / x, this.y / y);
            } else {
                return this._set(this.x / x, this.y / x);
            }
        } else {
            return this._set(this.x / x.x, this.y / x.y);
        }
    }

    reverseScalarDivide(x: number | Vector2D, y?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(x / this.x, y / this.y);
            } else {
                return this._set(x / this.x, x / this.y);
            }
        } else {
            return this._set(x.x / this.x, x.y / this.y);
        }
    }

    dot(x: number | Vector2D, y?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this.x * x + this.y * y;
            } else {
                return this.x * x + this.y * x;
            }
        } else {
            return this.x * x.x + this.y * x.y;
        }
    }

    length() {
        return Math.sqrt(this.lengthSquared());
    }

    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }

    distanceTo(x: number | Vector2D, y?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return Math.sqrt(this.distanceSquaredTo(x, y));
            } else {
                return Math.sqrt(this.distanceSquaredTo(x, x));
            }
        } else {
            return Math.sqrt(this.distanceSquaredTo(x.x, x.y));
        }
    }

    distanceSquaredTo(x: number | Vector2D, y?: number) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y);
            } else {
                return (this.x - x) * (this.x - x) + (this.y - x) * (this.y - x);
            }
        } else {
            return (this.x - x.x) * (this.x - x.x) + (this.y - x.y) * (this.y - x.y);
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

    clone() {
        return new (this.constructor as (new (x: number, y: number) => typeof this))(this.x, this.y);
    }

    equals(other: Vector2D) {
        return this.x === other.x && this.y === other.y;
    }
}