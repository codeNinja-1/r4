import { Vector3 } from "../../utils/vector3d/vector3.js";
import { RayIntersectable } from "../raycast/ray-intersectable.js";
import { RayWalker } from "../raycast/ray-walker.js";

export class PhysicalHitbox implements RayIntersectable {
    private position: Vector3;
    private size: Vector3;

    constructor(position: Vector3, size: Vector3) {
        this.position = Vector3.immutable(position.clone());
        this.size = Vector3.immutable(size.clone());
    }

    getPosition(): Vector3 {
        return this.position;
    }

    getSize(): Vector3 {
        return this.size;
    }

    getIntersection(rayWalker: RayWalker): number | null {
        let position = rayWalker.getPosition();
        let direction = rayWalker.getRay().getDirection();

        let xDistance = this.getDistanceToEdge(position.x, direction.x, this.position.x, this.size.x);
        let yDistance = this.getDistanceToEdge(position.y, direction.y, this.position.y, this.size.y);
        let zDistance = this.getDistanceToEdge(position.z, direction.z, this.position.z, this.size.z);

        let distance = Math.min(xDistance, yDistance, zDistance);

        return isFinite(distance) ? distance : null;
    }

    private getDistanceToEdge(position: number, direction: number, thisPosition: number, thisSize: number): number {
        if (direction === 0) {
            return Infinity;
        } else if (direction > 0) {
            return (thisPosition - position) / direction;
        } else {
            return (thisPosition + thisSize - position) / -direction;
        }
    }
}