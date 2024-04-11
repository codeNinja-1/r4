import { EntityPhysics } from "../physics/entity/entity-physics.js";
import { Rotation } from "../utils/rotation/rotation.js";
import { ImmutableVector2D } from "../utils/vector2d/immutable-vector2d.js";
import { MutableVector2D } from "../utils/vector2d/mutable-vector2d.js";
import { Vector2D } from "../utils/vector2d/vector2d.js";
import { ImmutableVector3D } from "../utils/vector3d/immutable-vector3d.js";
import { Entity } from "../world/entity/entity.js";

export class EntityControls {
    constructor(private entity: Entity) {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));

        document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    private keys: Set<string> = new Set();
    private pointerLocked: boolean = false;

    private onKeyDown(event: KeyboardEvent) {
        this.keys.add(event.key);

        if (event.key === ' ' && !this.pointerLocked) {
            document.body.requestPointerLock();
        }
    }

    private onKeyUp(event: KeyboardEvent) {
        this.keys.delete(event.key);
    }

    private onPointerLockChange() {
        this.pointerLocked = document.pointerLockElement === document.body;
    }

    private onMouseMove(event: MouseEvent) {
        if (this.pointerLocked) {
            const rotation = this.entity.getRotation();

            rotation.yaw += event.movementX;
            rotation.pitch += event.movementY;

            this.entity.setRotation(rotation);
        }
    }

    move(direction: ImmutableVector2D) {
        const physicalState = this.entity.getPhysicalState();

        if (!physicalState) return;
        
        const rotation = this.entity.getRotation();

        const forward = new ImmutableVector2D(Math.cos(rotation.yaw), Math.sin(rotation.yaw));
        const right = new ImmutableVector2D(-forward.y, forward.x);

        physicalState.applyForce(new ImmutableVector3D(
            forward.x * direction.y + right.x * direction.x,
            0,
            forward.y * direction.y + right.y * direction.x
        ));
    }

    jump() {
        const physicalState = this.entity.getPhysicalState();

        if (!physicalState) return;

        if (EntityPhysics.isOnGround(this.entity)) {
            const velocity = physicalState.getVelocity();

            physicalState.setVelocity(new ImmutableVector3D(velocity.x, 5, velocity.z));
        }
    }

    update() {
        if (this.keys.has('w')) {
            this.move(new ImmutableVector2D(0, 1));
        }

        if (this.keys.has('s')) {
            this.move(new ImmutableVector2D(0, -1));
        }

        if (this.keys.has('a')) {
            this.move(new ImmutableVector2D(-1, 0));
        }

        if (this.keys.has('d')) {
            this.move(new ImmutableVector2D(1, 0));
        }

        if (this.keys.has(' ')) {
            this.jump();
        }
    }
}