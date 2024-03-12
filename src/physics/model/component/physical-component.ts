import { PhysicalComponentContainer } from "./physical-component-container.js";
import { PhysicalHitbox } from "../physical-hitbox.js";
import { RayIntersectable } from "../../raycast/ray-intersectable.js";
import { RayWalker } from "../../raycast/ray-walker.js";

export abstract class PhysicalComponent implements PhysicalComponentContainer, RayIntersectable {
    private parent: PhysicalComponentContainer | null = null;

    protected getParent(): PhysicalComponentContainer | null {
        return this.parent;
    }

    setParent(parent: PhysicalComponentContainer | null): void {
        this.parent = parent;

        this.parent?.updateHitboxes();
    }

    abstract updateHitboxes(): void;
    abstract getHitboxes(): Iterable<PhysicalHitbox>;
    
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