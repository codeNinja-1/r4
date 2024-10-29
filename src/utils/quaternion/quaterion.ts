import { Rotation } from "../rotation/rotation.js";
import { Vector3 } from "../vector3d/vector3.js";

export class Quaternion {
    constructor(private x: number = 0, private y: number = 0, private z: number = 0, private w: number = 0) {
    }

    multiply(quaternion: Quaternion): this {
        const x = this.w * quaternion.x + this.x * quaternion.w + this.y * quaternion.z - this.z * quaternion.y;
        const y = this.w * quaternion.y + this.y * quaternion.w + this.z * quaternion.x - this.x * quaternion.z;
        const z = this.w * quaternion.z + this.z * quaternion.w + this.x * quaternion.y - this.y * quaternion.x;
        const w = this.w * quaternion.w - this.x * quaternion.x - this.y * quaternion.y - this.z * quaternion.z;

        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
    }

    times(quaternion: Quaternion): Quaternion {
        return this.clone().multiply(quaternion);
    }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    inverse(): Quaternion {
        let magnitude = this.magnitude();
        let x = -this.x / magnitude;
        let y = -this.y / magnitude;
        let z = -this.z / magnitude;
        let w = this.w / magnitude;

        return new Quaternion(x, y, z, w);
    }

    rotate(vector: Vector3): Vector3 {
        let quaternion = new Quaternion(vector.x, vector.y, vector.z, 0);
        let inverse = this.clone().inverse();
        let result = this.times(quaternion).multiply(inverse);

        return new Vector3(result.x, result.y, result.z);
    }

    inverseRotate(vector: Vector3): Vector3 {
        let quaternion = new Quaternion(vector.x, vector.y, vector.z, 0);
        let inverse = this.clone().inverse();
        let result = inverse.multiply(quaternion).multiply(this);

        return new Vector3(result.x, result.y, result.z);
    }

    clone(): Quaternion {
        return new Quaternion(this.x, this.y, this.z, this.w);
    }

    toString(): string {
        return `Quaternion { ${this.x}, ${this.y}, ${this.z}, ${this.w} }`;
    }

    equals(other: Quaternion): boolean {
        return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
    }

    static fromAxisAngle(axis: Vector3, angle: number): Quaternion {
        let cos = Math.cos(angle / 2);
        let sin = Math.sin(angle / 2);

        return new Quaternion(axis.x * sin, axis.y * sin, axis.z * sin, cos);
    }

    static fromRotation(rotation: Rotation): Quaternion {
        let quaternion: Quaternion | null = null;

        for (const [ axis, angle ] of rotation.toAxisRotations()) {
            let part = Quaternion.fromAxisAngle(axis, angle);

            if (quaternion) quaternion.multiply(part);
            else quaternion = part;
        }

        if (!quaternion) throw new Error('Failed to create quaternion from rotation');

        return quaternion;
    }
}