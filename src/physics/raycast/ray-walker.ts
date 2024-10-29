import { Vector3 } from "../../utils/vector3d/vector3.js";
import { Ray } from "../raycast/ray.js";

export class RayWalker {
    private distance: number = 0;
    private position: Vector3;

    constructor(private ray: Ray, position?: Vector3) {
        this.position = (position ?? this.ray.getStart()).clone();
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
        
        this.position
            .set(this.ray.getDirection())
            .multiply(distance)
            .add(this.ray.getStart());
    }

    clone() {
        return new RayWalker(this.ray, this.position.clone());
    }
}