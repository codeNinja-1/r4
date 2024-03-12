import { PhysicalHitbox } from "../physical-hitbox.js";
import { PhysicalComponent } from "./physical-component.js";

export class GroupPhysicalComponent extends PhysicalComponent {
    private components: Set<PhysicalComponent> = new Set();
    private hitboxes: Set<PhysicalHitbox> = new Set();

    constructor() {
        super();
    }

    updateHitboxes(): void {
        this.hitboxes.clear();

        for (const component of this.components) {
            for (const hitbox of component.getHitboxes()) {
                this.hitboxes.add(hitbox);
            }
        }

        this.getParent()?.updateHitboxes();
    }

    getHitboxes(): Iterable<PhysicalHitbox> {
        return this.hitboxes;
    }

    add(component: PhysicalComponent): void {
        this.components.add(component);

        component.setParent(this);
    }

    remove(component: PhysicalComponent): void {
        this.components.delete(component);

        component.setParent(null);
    }
}