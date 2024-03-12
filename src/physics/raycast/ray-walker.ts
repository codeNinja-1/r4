import { MutableVector3D } from "../../utils/vector3d/mutable-vector3d.js";
import { Vector3D } from "../../utils/vector3d/vector3d.js";
import { Ray } from "../raycast/ray.js";

export class RayWalker {
    private distance: number = 0;
    private position: Vector3D;

    constructor(private ray: Ray, position?: Vector3D) {
        this.position = new MutableVector3D(position ?? this.ray.getStart());
    }

    getDistance() {
        return this.distance;
    }

    getPosition() {
        return this.position;
    }

    getRay() {
        return this.ray;
    }

    walk(distance: number) {
        this.distance += distance;
        this.position.set(this.ray.getDirection());
        this.position.scalarMultiply(distance);
        this.position.add(this.ray.getStart());
    }

    clone() {
        return new RayWalker(this.ray, this.position.clone());
    }
}