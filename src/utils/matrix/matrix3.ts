import { Rotation } from "../rotation/rotation.js";
import { Vector3 } from "../vector3d/vector3.js";

export class Matrix3 {
    constructor(public data: number[] = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]) {
    }

    multiply(vector: Vector3): Vector3;
    multiply(matrix: Matrix3): ThisType<Matrix3>;
    multiply(value: Vector3 | Matrix3): Vector3 | ThisType<Matrix3> {
        if (value instanceof Vector3) {
            return Matrix3.multiplyVector(this, value);
        } else if (value instanceof Matrix3) {
            return Matrix3.multiply(this, value, this);
        } else {
            throw new Error("Invalid arguments");
        }
    }

    static multiply(matrix1: Matrix3, matrix2: Matrix3, target: Matrix3 = new Matrix3()) {
        const a = matrix1.data;
        const b = matrix2.data;
        const c = target.data;

        const a00 = a[0], a01 = a[1], a02 = a[2];
        const a10 = a[3], a11 = a[4], a12 = a[5];
        const a20 = a[6], a21 = a[7], a22 = a[8];
        const b00 = b[0], b01 = b[1], b02 = b[2];
        const b10 = b[3], b11 = b[4], b12 = b[5];
        const b20 = b[6], b21 = b[7], b22 = b[8];
    
        c[0] = b00 * a00 + b01 * a10 + b02 * a20;
        c[1] = b00 * a01 + b01 * a11 + b02 * a21;
        c[2] = b00 * a02 + b01 * a12 + b02 * a22;
        c[3] = b10 * a00 + b11 * a10 + b12 * a20;
        c[4] = b10 * a01 + b11 * a11 + b12 * a21;
        c[5] = b10 * a02 + b11 * a12 + b12 * a22;
        c[6] = b20 * a00 + b21 * a10 + b22 * a20;
        c[7] = b20 * a01 + b21 * a11 + b22 * a21;
        c[8] = b20 * a02 + b21 * a12 + b22 * a22;


        return target;
    }

    static multiplyVector(matrix: Matrix3, vector: Vector3, target: Vector3 = new Vector3()) {
        const a = matrix.data;
        const b = vector;
        const c = target;

        const x = b.x, y = b.y, z = b.z;

        c.x = a[0] * x + a[3] * y + a[6] * z;
        c.y = a[1] * x + a[4] * y + a[7] * z;
        c.z = a[2] * x + a[5] * y + a[8] * z;

        return target;
    }

    static createRotation(rotation: Rotation, target: Matrix3 = new Matrix3()) {
        let matrix = target || new Matrix3();

        matrix.multiply(Matrix3.createRotationY(rotation.yaw));
        matrix.multiply(Matrix3.createRotationX(rotation.pitch));
        matrix.multiply(Matrix3.createRotationZ(rotation.roll));

        return matrix;
    }

    static createRotationX(angle: number, target: Matrix3 = new Matrix3()) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        target.data[0] = 1;
        target.data[1] = 0;
        target.data[2] = 0;

        target.data[4] = 0;
        target.data[5] = cos;
        target.data[6] = sin;

        target.data[8] = 0;
        target.data[9] = -sin;
        target.data[10] = cos;

        return target;
    }

    static createRotationY(angle: number, target: Matrix3 = new Matrix3()) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        target.data[0] = cos;
        target.data[1] = 0;
        target.data[2] = -sin;

        target.data[4] = 0;
        target.data[5] = 1;
        target.data[6] = 0;

        target.data[8] = sin;
        target.data[9] = 0;
        target.data[10] = cos;

        return target;
    }

    static createRotationZ(angle: number, target: Matrix3 = new Matrix3()) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        target.data[0] = cos;
        target.data[1] = sin;
        target.data[2] = 0;

        target.data[4] = -sin;
        target.data[5] = cos;
        target.data[6] = 0;

        target.data[8] = 0;
        target.data[9] = 0;
        target.data[10] = 1;

        return target;
    }
}