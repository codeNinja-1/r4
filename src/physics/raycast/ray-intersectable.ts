import { RayWalker } from "./ray-walker.js";

export interface RayIntersectable {
    getIntersection(rayWalker: RayWalker): number | null;
}