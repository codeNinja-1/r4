import { Matrix4 } from "../../../utils/matrix/matrix4.js";

export class Projector {
    private projectionMatrix: Matrix4 | null = null;

    constructor(private fieldOfView = 45, private aspect = 1, private near = 0.1, private far = 1000) {
    }

    getFieldOfView(): number {
        return this.fieldOfView;
    }

    setFieldOfView(fieldOfView: number): void {
        this.fieldOfView = fieldOfView;
        this.projectionMatrix = null;
    }

    getAspectRatio(): number {
        return this.aspect;
    }

    setAspectRatio(aspect: number): void {
        this.aspect = aspect;
        this.projectionMatrix = null;
    }

    getNear(): number {
        return this.near;
    }

    setNear(near: number): void {
        this.near = near;
        this.projectionMatrix = null;
    }

    getFar(): number {
        return this.far;
    }

    setFar(far: number): void {
        this.far = far;
        this.projectionMatrix = null;
    }

    getProjectionMatrix() {
        if (!this.projectionMatrix) {
            this.projectionMatrix = this.computeProjectionMatrix();
        }

        return this.projectionMatrix;
    }

    computeProjectionMatrix(): Matrix4 {
        return Matrix4.createPerspective(this.fieldOfView, this.aspect, this.near, this.far);
    }
}