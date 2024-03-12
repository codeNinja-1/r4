import { RayIntersectable } from "../raycast/ray-intersectable.js";
import { RayWalker } from "../raycast/ray-walker.js";
import { PhysicalComponentContainer } from "./component/physical-component-container.js";
import { PhysicalComponent } from "./component/physical-component.js";
import { PhysicalHitbox } from "./physical-hitbox.js";

export class PhysicalModel implements PhysicalComponentContainer, RayIntersectable {
    component: PhysicalComponent;

    constructor(component: PhysicalComponent) {
        this.component = component;
    }

    updateHitboxes(): void {
    }

    getHitboxes(): Iterable<PhysicalHitbox> {
        return this.component.getHitboxes();
    }

    getIntersection(rayWalker: RayWalker): number | null {
        let distance = Infinity;

        for (let hitbox of this.getHitboxes()) {
            let intersection = hitbox.getIntersection(rayWalker);

            if (intersection !== null) {
                distance = Math.min(distance, intersection);
            }
        }

        return isFinite(distance) ? distance : null;
    }
}