import { Axis } from "../rotation/axis.js";
import { Rotation } from "../rotation/rotation.js";
import { Vector3 } from "../vector3d/vector3.js";
import { Matrix3 } from "./matrix3.js";

export class Matrix4 {
    public data: number[];

    constructor(source?: number[] | Matrix3 | Matrix4) {
        if (source instanceof Matrix3) {
            this.data = [
                source.data[0], source.data[1], source.data[2], 0,
                source.data[3], source.data[4], source.data[5], 0,
                source.data[6], source.data[7], source.data[8], 0,
                0, 0, 0, 1
            ];
        } else if (source instanceof Matrix4) {
            this.data = source.data.map(item => item);
        } else if (source) {
            this.data = source.map(item => item);
        } else {
            this.data = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];
        }
    }

    multiply(vector: Vector3): Vector3;
    multiply(matrix: Matrix4): ThisType<Matrix4>;
    multiply(value: Vector3 | Matrix4): Vector3 | ThisType<Matrix4> {
        if (value instanceof Vector3) {
            return Matrix4.multiplyVector(this, value);
        } else if (value instanceof Matrix4) {
            return Matrix4.multiply(this, value, this);
        } else {
            throw new Error("Invalid arguments");
        }
    }

    get translation(): Vector3 {
        return new Vector3(this.data[12], this.data[13], this.data[14]);
    }

    set translation(value: Vector3) {
        this.data[12] = value.x;
        this.data[13] = value.y;
        this.data[14] = value.z;
    }

    static multiply(matrix1: Matrix4, matrix2: Matrix4, target: Matrix4 = new Matrix4()) {
        const a = matrix1.data;
        const b = matrix2.data;
        const c = target.data;

        const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
        const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
        const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

        const b00 = b[0], b01 = b[1], b02 = b[2], b03 = b[3];
        const b10 = b[4], b11 = b[5], b12 = b[6], b13 = b[7];
        const b20 = b[8], b21 = b[9], b22 = b[10], b23 = b[11];
        const b30 = b[12], b31 = b[13], b32 = b[14], b33 = b[15];

        c[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
        c[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
        c[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
        c[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
        c[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
        c[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
        c[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
        c[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
        c[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
        c[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
        c[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
        c[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
        c[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
        c[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
        c[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
        c[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

        return target;
    }

    static multiplyVector(matrix: Matrix4, vector: Vector3, target: Vector3 = new Vector3()) {
        const a = matrix.data;
        const b = vector;
        const c = target;

        const x = b.x, y = b.y, z = b.z;

        c.x = a[0] * x + a[4] * y + a[8] * z + a[12];
        c.y = a[1] * x + a[5] * y + a[9] * z + a[13];
        c.z = a[2] * x + a[6] * y + a[10] * z + a[14];

        return target;
    }

    static inverse(matrix: Matrix4, target: Matrix4 = new Matrix4()) {
        const a = matrix.data;
        const b = target.data;

        const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
        const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
        const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;

        const det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

        if (!det) return null;

        const invDet = 1 / det;

        b[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
        b[1] = (a02 * b10 - a01 * b11 - a03 * b09) * invDet;
        b[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
        b[3] = (a22 * b04 - a21 * b05 - a23 * b03) * invDet;
        b[4] = (a12 * b08 - a10 * b11 - a13 * b07) * invDet;
        b[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
        b[6] = (a32 * b02 - a30 * b05 - a33 * b01) * invDet;
        b[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
        b[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
        b[9] = (a01 * b08 - a00 * b10 - a03 * b06) * invDet;
        b[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
        b[11] = (a21 * b02 - a20 * b04 - a23 * b00) * invDet;
        b[12] = (a11 * b07 - a10 * b09 - a12 * b06) * invDet;
        b[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
        b[14] = (a31 * b01 - a30 * b03 - a32 * b00) * invDet;
        b[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;

        return target;
    }

    static createTranslation(vector: Vector3, target: Matrix4 = new Matrix4()) {
        target.data[0] = 1;
        target.data[1] = 0;
        target.data[2] = 0;
        target.data[3] = 0;

        target.data[4] = 0;
        target.data[5] = 1;
        target.data[6] = 0;
        target.data[7] = 0;

        target.data[8] = 0;
        target.data[9] = 0;
        target.data[10] = 1;
        target.data[11] = 0;

        target.data[12] = vector.x;
        target.data[13] = vector.y;
        target.data[14] = vector.z;
        target.data[15] = 1;

        return target;
    }

    static createScale(vector: Vector3, target: Matrix4 = new Matrix4()) {
        target.data[0] = vector.x;
        target.data[1] = 0;
        target.data[2] = 0;
        target.data[3] = 0;

        target.data[4] = 0;
        target.data[5] = vector.y;
        target.data[6] = 0;
        target.data[7] = 0;

        target.data[8] = 0;
        target.data[9] = 0;
        target.data[10] = vector.z;
        target.data[11] = 0;

        target.data[12] = 0;
        target.data[13] = 0;
        target.data[14] = 0;
        target.data[15] = 1;

        return target;
    }

    static createRotation(rotation: Rotation, target: Matrix4 = new Matrix4()) {
        let matrix = target || new Matrix4();

        matrix.multiply(Matrix4.createWorldAxisRotation(Axis.Y, rotation.yaw));
        matrix.multiply(Matrix4.createWorldAxisRotation(Axis.X, rotation.pitch));
        matrix.multiply(Matrix4.createWorldAxisRotation(Axis.Z, rotation.roll));

        return matrix;
    }

    static createWorldAxisRotation(axis: Axis, angle: number): Matrix4 {
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);

        if (axis == Axis.X) {
            return new Matrix4([
                1, 0, 0, 0,
                0, cos, sin, 0,
                0, -sin, cos, 0,
                0, 0, 0, 1
            ]);
        } else if (axis == Axis.Y) {
            return new Matrix4([
                cos, 0, -sin, 0,
                0, 1, 0, 0,
                sin, 0, cos, 0,
                0, 0, 0, 1
            ]);
        } else if (axis == Axis.Z) {
            return new Matrix4([
                cos, sin, 0, 0,
                -sin, cos, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);
        }

        return new Matrix4();
    }

    static createPerspective(fov: number, aspect: number, near: number, far: number, target: Matrix4 = new Matrix4()) {
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
        const rangeInv = 1 / (near - far);

        target.data[0] = f / aspect;
        target.data[1] = 0;
        target.data[2] = 0;
        target.data[3] = 0;

        target.data[4] = 0;
        target.data[5] = f;
        target.data[6] = 0;
        target.data[7] = 0;

        target.data[8] = 0;
        target.data[9] = 0;
        target.data[10] = far * rangeInv;
        target.data[11] = -1;

        target.data[12] = 0;
        target.data[13] = 0;
        target.data[14] = near * far * rangeInv;
        target.data[15] = 0;

        return target;
    }

    static identity(target?: Matrix4): Matrix4 {
        if (!target) return new Matrix4();

        target.data[0] = 1;
        target.data[1] = 0;
        target.data[2] = 0;
        target.data[3] = 0;

        target.data[4] = 0;
        target.data[5] = 1;
        target.data[6] = 0;
        target.data[7] = 0;

        target.data[8] = 0;
        target.data[9] = 0;
        target.data[10] = 1;
        target.data[11] = 0;

        target.data[12] = 0;
        target.data[13] = 0;
        target.data[14] = 0;
        target.data[15] = 1;

        return target;
    }
}