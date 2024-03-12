import { RayIntersectable } from "./ray-intersectable.js";
import { RayWalker } from "./ray-walker.js";

export class GridLattice implements RayIntersectable {
    getIntersection(rayWalker: RayWalker): number | null {
        let position = rayWalker.getPosition();
        let direction = rayWalker.getRay().getDirection();

        let distanceX = this.getDistanceToNextInteger(position.x, direction.x);
        let distanceY = this.getDistanceToNextInteger(position.y, direction.y);
        let distanceZ = this.getDistanceToNextInteger(position.z, direction.z);

        let distance = Math.min(distanceX, distanceY, distanceZ);

        return isFinite(distance) ? distance : null;
    }

    private getDistanceToNextInteger(value: number, direction: number) {
        if (direction === 0) {
            return Infinity;
        } else if (direction > 0) {
            return (Math.ceil(value) - value) / direction;
        } else {
            return (value - Math.floor(value)) / -direction;
        }
    }
}