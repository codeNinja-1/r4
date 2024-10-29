import { Vector3 } from "../../utils/vector3d/vector3.js";
import { Entity } from "../../world/entity/entity.js";

export namespace EntityPhysics {
    function applyGravity(entity: Entity, delta: number) {
        const state = entity.getPhysicalState()!;
        const properties = entity.getPhysicalProperties()!;

        state.applyForce(new Vector3(0, properties.gravity * delta, 0));
    }
    
    export function isOnGround(entity: Entity) {
        return false;
    }

    function applyFriction(entity: Entity, delta: number) {
        const state = entity.getPhysicalState()!;
        const properties = entity.getPhysicalProperties()!;

        if (isOnGround(entity)) {
            state.applyFriction(new Vector3(
                properties.friction.ground,
                0,
                properties.friction.ground
            ));
        } else {
            state.applyFriction(new Vector3(
                properties.friction.air,
                properties.friction.air,
                properties.friction.air
            ));
        }
    }

    function applyVelocity(entity: Entity, delta: number) {
        const state = entity.getPhysicalState()!;

        entity.getPosition()
            .add(state.getVelocity().times(delta));
    }

    export function simulateEntity(entity: Entity, delta: number) {
        if (!entity.getPhysicalState() || !entity.getPhysicalProperties()) {
            return;
        }

        //applyGravity(entity, delta);
        applyFriction(entity, delta);
        applyVelocity(entity, delta);
    }
}