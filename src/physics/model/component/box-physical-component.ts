import { PhysicalHitbox } from "../physical-hitbox.js";
import { PhysicalComponent } from "./physical-component.js";

export class BoxPhysicalComponent extends PhysicalComponent {
    constructor(private hitbox: PhysicalHitbox) {
        super();
    }

    updateHitboxes(): void {
    }

    *getHitboxes(): Iterable<PhysicalHitbox> {
        yield this.hitbox;
    }
}