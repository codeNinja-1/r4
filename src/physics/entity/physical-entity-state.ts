import { Vector3 } from "../../utils/vector3d/vector3.js";

export class PhysicalEntityState {
    private velocity: Vector3 = new Vector3();

    getVelocity(): Vector3 {
        return this.velocity.clone();
    }

    setVelocity(velocity: Vector3) {
        this.velocity.set(velocity);
    }

    applyForce(force: Vector3) {
        this.velocity.add(force);
    }

    applyFriction(friction: Vector3) {
        this.velocity.multiply(friction);
    }
}