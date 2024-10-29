import { EntityPhysics } from "../physics/entity/entity-physics.js";
import { ImmutableVector2D } from "../utils/vector2d/immutable-vector2d.js";
import { Vector3 } from "../utils/vector3d/vector3.js";
import { Entity } from "../world/entity/entity.js";

export class EntityFlyControls {
    constructor(private entity: Entity) {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));

        document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));

        document.addEventListener('click', () => {
            if (!this.pointerLocked) {
                document.body.requestPointerLock();
            }
        });
    }

    private keys: Set<string> = new Set();
    private pointerLocked: boolean = false;
    private speed = 2;

    private lastPressedForwardKey: "KeyW" | "KeyS" | null = null;
    private lastPressedSideKey: "KeyA" | "KeyD" | null = null;
    private lastPressedUpKey: "Space" | "ShiftLeft" | null = null;

    private onKeyDown(event: KeyboardEvent) {
        this.keys.add(event.code);

        if (event.code === 'KeyW' || event.code === 'KeyS') {
            this.lastPressedForwardKey = event.code as "KeyW" | "KeyS";
        }

        if (event.code === 'KeyA' || event.code === 'KeyD') {
            this.lastPressedSideKey = event.code as "KeyA" | "KeyD";
        }

        if (event.code === 'Space' || event.code === 'ShiftLeft') {
            this.lastPressedUpKey = event.code as "Space" | "ShiftLeft";
        }
    }

    private onKeyUp(event: KeyboardEvent) {
        this.keys.delete(event.code);

        if (event.code === this.lastPressedForwardKey) {
            this.lastPressedForwardKey = null;
        }

        if (event.code === this.lastPressedSideKey) {
            this.lastPressedSideKey = null;
        }

        if (event.code === this.lastPressedUpKey) {
            this.lastPressedUpKey = null;
        }
    }

    private onPointerLockChange() {
        this.pointerLocked = document.pointerLockElement === document.body;
    }

    private onMouseMove(event: MouseEvent) {
        if (this.pointerLocked) {
            const rotation = this.entity.getRotation();

            rotation.yaw += -event.movementX * 0.01;
            rotation.pitch += -event.movementY * 0.01;
        }
    }

    move(direction: ImmutableVector2D) {
        const physicalState = this.entity.getPhysicalState();

        if (!physicalState) return;
        
        const rotation = this.entity.getRotation();

        const forward = new ImmutableVector2D(-Math.sin(rotation.yaw), -Math.cos(rotation.yaw));
        const right = new ImmutableVector2D(-forward.y, forward.x);

        forward.scalarMultiply(5);
        right.scalarMultiply(3);

        physicalState.applyForce(new Vector3(
            forward.x * direction.y + right.x * direction.x,
            0,
            forward.y * direction.y + right.y * direction.x
        ).times(this.speed));
    }

    fly(direction: number) {
        const physicalState = this.entity.getPhysicalState();

        if (!physicalState) return;

        physicalState.applyForce(new Vector3(0, direction * this.speed, 0));
    }

    update() {
        if (this.lastPressedForwardKey == 'KeyW' || (!this.lastPressedForwardKey && this.keys.has('KeyW'))) {
            this.move(new ImmutableVector2D(0, 1));
        }

        if (this.lastPressedForwardKey == 'KeyS' || (!this.lastPressedForwardKey && this.keys.has('KeyS'))) {
            this.move(new ImmutableVector2D(0, -1));
        }

        if (this.lastPressedSideKey == 'KeyA' || (!this.lastPressedSideKey && this.keys.has('KeyA'))) {
            this.move(new ImmutableVector2D(-1, 0));
        }

        if (this.lastPressedSideKey == 'KeyD' || (!this.lastPressedSideKey && this.keys.has('KeyD'))) {
            this.move(new ImmutableVector2D(1, 0));
        }

        if (this.lastPressedUpKey == 'Space' || (!this.lastPressedUpKey && this.keys.has('Space'))) {
            this.fly(1);
        }

        if (this.lastPressedUpKey == 'ShiftLeft' || (!this.lastPressedUpKey && this.keys.has('ShiftLeft'))) {
            this.fly(-1);
        }
    }
}