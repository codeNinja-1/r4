import { MutableVector3D } from "../../utils/vector3d/mutable-vector3d.js";
import { Vector3D } from "../../utils/vector3d/vector3d.js";
import { RayIntersectable } from "../raycast/ray-intersectable.js";
import { RayWalker } from "../raycast/ray-walker.js";

export class PhysicalHitbox implements RayIntersectable {
    private position: Vector3D;
    private size: Vector3D;

    constructor(position: Vector3D, size: Vector3D) {
        this.position = new MutableVector3D(position);
        this.size = new MutableVector3D(size);
    }

    getPosition(): Vector3D {
        return this.position.clone();
    }

    setPosition(position: Vector3D): void {
        this.position = position;
    }

    getSize(): Vector3D {
        return this.size.clone();
    }

    setSize(size: Vector3D): void {
        this.size = size;
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