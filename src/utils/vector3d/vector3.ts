import { Vector2D } from "../vector2d/vector2d.js";

export class Vector3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    set(x: number | Vector3, y?: number, z?: number): this {
        if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
            this.x = x;
            this.y = y;
            this.z = z;
        } else if (x instanceof Vector3 && typeof y == 'undefined' && typeof z == 'undefined') {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        } else {
            throw new TypeError("Invalid arguments");
        }

        return this;
    }

    add(x: number | Vector3, y?: number, z?: number): this {
        if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
            this.x += x;
            this.y += y;
            this.z += z;
        } else if (x instanceof Vector3 && typeof y == 'undefined' && typeof z == 'undefined') {
            this.x += x.x;
            this.y += x.y;
            this.z += x.z;
        } else {
            throw new TypeError("Invalid arguments");
        }

        return this;
    }

    plus(x: number | Vector3, y?: number, z?: number): Vector3 {
        return this.clone().add(x, y, z);
    }

    subtract(x: number | Vector3, y?: number, z?: number): this {
        if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
            this.x -= x;
            this.y -= y;
            this.z -= z;
        } else if (x instanceof Vector3 && typeof y == 'undefined' && typeof z == 'undefined') {
            this.x -= x.x;
            this.y -= x.y;
            this.z -= x.z;
        } else {
            throw new TypeError("Invalid arguments");
        }

        return this;
    }

    minus(x: number | Vector3, y?: number, z?: number): Vector3 {
        return this.clone().subtract(x, y, z);
    }

    multiply(x: number | Vector3, y?: number | undefined, z?: number | undefined): this {
        if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
            this.x *= x;
            this.y *= y;
            this.z *= z;
        } else if (x instanceof Vector3 && typeof y == 'undefined' && typeof z == 'undefined') {
            this.x *= x.x;
            this.y *= x.y;
            this.z *= x.z;
        } else if (typeof x == "number" && typeof y == 'undefined' && typeof z == 'undefined') {
            this.x *= x;
            this.y *= x;
            this.z *= x;
        } else {
            throw new TypeError("Invalid arguments");
        }

        return this;
    }

    times(x: number | Vector3, y?: number | undefined, z?: number | undefined): Vector3 {
        return this.clone().multiply(x, y, z);
    }

    divide(x: number | Vector3, y?: number | undefined, z?: number | undefined): this {
        if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
            this.x /= x;
            this.y /= y;
            this.z /= z;
        } else if (x instanceof Vector3 && typeof y == 'undefined' && typeof z == 'undefined') {
            this.x /= x.x;
            this.y /= x.y;
            this.z /= x.z;
        } else if (typeof x == "number" && typeof y == 'undefined' && typeof z == 'undefined') {
            this.x /= x;
            this.y /= x;
            this.z /= x;
        } else {
            throw new TypeError("Invalid arguments");
        }

        return this;
    }

    over(x: number | Vector3, y?: number | undefined, z?: number | undefined): Vector3 {
        return this.clone().divide(x, y, z);
    }

    dot(vector: Vector3): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    length(): number {
        return Math.sqrt(this.lengthSquared());
    }

    lengthSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    normalize(): this {
        this.divide(this.length());

        return this;
    }

    unit(): Vector3 {
        return this.clone().normalize();
    }

    *[Symbol.iterator](): IterableIterator<number> {
        yield this.x;
        yield this.y;
        yield this.z;
    }

    clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    toString(): string {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }

    static from(vector2: Vector2D, format: string): Vector3 {
        return new Vector3(
            !isNaN(+format[0]) ? +format[0] : vector2[format[0]],
            !isNaN(+format[1]) ? +format[1] : vector2[format[1]],
            !isNaN(+format[2]) ? +format[2] : vector2[format[2]]
        );
    }

    equals(other: Vector3, epsilon?: number): boolean {
        if (typeof epsilon == 'number') return Math.abs(this.x - other.x) <= epsilon && Math.abs(this.y - other.y) <= epsilon && Math.abs(this.z - other.z) <= epsilon;
        else return this.x == other.x && this.y == other.y && this.z == other.z;
    }
}

export namespace Vector3 {
    export class Handled implements Vector3 {
        private listeners: ((original: Vector3, current: Vector3) => unknown)[];

        constructor(private vector: Vector3, ...listeners: ((original: Vector3, current: Vector3) => unknown)[]) {
            this.listeners = listeners;
        }

        private sendUpdate(original: Vector3) {
            for (const listener of this.listeners) {
                listener(original, this);
            }
        }

        on(event: "change", listener: (original: Vector3, current: Vector3) => unknown): this {
            this.listeners.push(listener);

            return this;
        }

        get x() {
            return this.vector.x;
        }

        get y() {
            return this.vector.y;
        }

        get z() {
            return this.vector.z;
        }

        set x(value: number) {
            this.vector.x = value;
        }

        set y(value: number) {
            this.vector.y = value;
        }

        set z(value: number) {
            this.vector.z = value;
        }

        set(x: number | Vector3, y?: number | undefined, z?: number | undefined): this {
            const original = this.vector.clone();

            this.vector.set(x, y, z);

            this.sendUpdate(original);

            return this;
        }

        add(x: number | Vector3, y?: number | undefined, z?: number | undefined): this {
            const original = this.vector.clone();

            this.vector.add(x, y, z);

            this.sendUpdate(original);

            return this;
        }

        plus(x: number | Vector3, y?: number | undefined, z?: number | undefined): Vector3 {
            return this.vector.plus(x, y, z);
        }

        subtract(x: number | Vector3, y?: number | undefined, z?: number | undefined): this {
            const original = this.vector.clone();

            this.vector.subtract(x, y, z);

            this.sendUpdate(original);

            return this;
        }

        minus(x: number | Vector3, y?: number | undefined, z?: number | undefined): Vector3 {
            return this.vector.minus(x, y, z);
        }

        multiply(x: number | Vector3, y?: number | undefined, z?: number | undefined): this {
            const original = this.vector.clone();

            this.vector.multiply(x, y, z);

            this.sendUpdate(original);

            return this;
        }

        times(x: number | Vector3, y?: number | undefined, z?: number | undefined): Vector3 {
            return this.vector.times(x, y, z);
        }

        divide(x: number | Vector3, y?: number | undefined, z?: number | undefined): this {
            const original = this.vector.clone();

            this.vector.divide(x, y, z);

            this.sendUpdate(original);

            return this;
        }

        over(x: number | Vector3, y?: number | undefined, z?: number | undefined): Vector3 {
            return this.vector.over(x, y, z);
        }

        dot(vector: Vector3): number {
            return this.vector.dot(vector);
        }

        length(): number {
            return this.vector.length();
        }

        lengthSquared(): number {
            return this.vector.lengthSquared();
        }

        normalize(): this {
            const original = this.vector.clone();

            this.vector.normalize();

            this.sendUpdate(original);

            return this;
        }

        unit(): Vector3 {
            return this.vector.unit();
        }

        *[Symbol.iterator](): IterableIterator<number> {
            yield this.vector.x;
            yield this.vector.y;
            yield this.vector.z;
        }

        clone(): Vector3 {
            return this.vector.clone();
        }

        toString(): string {
            return this.vector.toString();
        }

        equals(other: Vector3, epsilon?: number): boolean {
            return this.vector.equals(other, epsilon);
        }
    }

    export function handle(vector: Vector3): Vector3.Handled {
        return new Handled(vector);
    }

    export function immutable(vector: Vector3): Vector3 {
        return new Handled(vector, () => {
            throw new Error("Cannot modify immutable vector");
        });
    }

    export function validated(vector: Vector3): Vector3 {
        return new Handled(vector, (original, current) => {
            if (typeof current.x !== 'number' || isNaN(current.x) || typeof current.y !== 'number' || isNaN(current.y) || typeof current.z !== 'number' || isNaN(current.z)) {
                current.set(original);

                console.warn("Invalid vector components " + current + ", reverting to " + original);
            }
        });
    }

    export function floor(vector: Vector3): Vector3 {
        return new Vector3(Math.floor(vector.x), Math.floor(vector.y), Math.floor(vector.z));
    }

    export function ceil(vector: Vector3): Vector3 {
        return new Vector3(Math.ceil(vector.x), Math.ceil(vector.y), Math.ceil(vector.z));
    }

    export function round(vector: Vector3): Vector3 {
        return new Vector3(Math.round(vector.x), Math.round(vector.y), Math.round(vector.z));
    }
}