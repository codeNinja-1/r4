import { MutableVector3D } from "../../utils/vector3d/mutable-vector3d.js";
import { Vector3D } from "../../utils/vector3d/vector3d.js";

export class PhysicalEntityState {
    private velocity: Vector3D = new MutableVector3D();

    getVelocity(): Vector3D {
        return this.velocity.clone();
    }

    setVelocity(velocity: Vector3D) {
        this.velocity.set(velocity);
    }

    applyForce(force: Vector3D) {
        this.velocity.add(force);
    }

    applyFriction(friction: Vector3D) {
        this.velocity.scalarMultiply(friction);
    }
}