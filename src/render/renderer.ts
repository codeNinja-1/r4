import { World } from "../world/world.js";
import { Perspective } from "./perspective.js";

export class Renderer {
    perspective: Perspective;

    constructor(public world: World, public canvas: HTMLCanvasElement) {
    }
}