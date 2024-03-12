import { Entity } from "../../world/entity/entity.js";

export namespace EntityPhysics {
    function applyGravity(entity: Entity, delta: number) {
        const state = entity.getPhysicalState()!;
        const properties = entity.getPhysicalProperties()!;

        state.velocity.y -= properties.gravity * delta;
    }
    
    function isOnGround(entity: Entity) {
        return false;
    }

    function applyFriction(entity: Entity, delta: number) {
        const state = entity.getPhysicalState()!;
        const properties = entity.getPhysicalProperties()!;

        if (isOnGround(entity)) {
            state.velocity.x *= properties.friction.ground;
            state.velocity.z *= properties.friction.ground;
        } else {
            state.velocity.x *= properties.friction.air;
            state.velocity.y *= properties.friction.air;
            state.velocity.z *= properties.friction.air;
        }
    }

    function applyVelocity(entity: Entity, delta: number) {
        const state = entity.getPhysicalState()!;

        const position = entity.getPosition();
        const velocity = state.velocity;

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