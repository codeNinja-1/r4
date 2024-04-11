import { ImmutableVector3D } from "../../utils/vector3d/immutable-vector3d.js";
import { Entity } from "../../world/entity/entity.js";

export namespace EntityPhysics {
    function applyGravity(entity: Entity, delta: number) {
        const state = entity.getPhysicalState()!;
        const properties = entity.getPhysicalProperties()!;

        state.applyForce(new ImmutableVector3D(0, properties.gravity * delta, 0));
    }
    
    export function isOnGround(entity: Entity) {
        return false;
    }

    function applyFriction(entity: Entity, delta: number) {
        const state = entity.getPhysicalState()!;
        const properties = entity.getPhysicalProperties()!;

        if (isOnGround(entity)) {
            state.applyFriction(new ImmutableVector3D(
                properties.friction.ground,
                0,
                properties.friction.ground
            ));
        } else {
            state.applyFriction(new ImmutableVector3D(
                properties.friction.air,
                properties.friction.air,
                properties.friction.air
            ));
        }
    }

    function applyVelocity(entity: Entity, delta: number) {
        const state = entity.getPhysicalState()!;

        const position = entity.getPosition();
        const velocity = state.getVelocity();

        position.x += velocity.x * delta;
        position.y += velocity.y * delta;
        position.z += velocity.z * delta;

        entity.setPosition(position);
    }

    export function simulateEntity(entity: Entity, delta: number) {
        if (!entity.getPhysicalState() || !entity.getPhysicalProperties()) {
            return;
        }

        applyGravity(entity, delta);
        applyFriction(entity, delta);
        applyVelocity(entity, delta);
    }
}