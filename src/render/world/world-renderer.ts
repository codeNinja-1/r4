import { World } from "../../world/world.js";
import { Perspective } from "./pespective/perspective.js";
import { Projector } from "./pespective/projector.js";
import { Renderer } from "../renderer.js";

export interface WorldRenderer {
    getRenderer(): Renderer;
    getCanvas(): HTMLCanvasElement;

    getPerspective(): Perspective;
    setPerspective(perspective: Perspective): void;

    getProjector(): Projector;
    setProjector(projector: Projector): void;

    getWorld(): World;
    setWorld(world: World): void;

    setupWorldRenderer(): Promise<void>;

    render(): void;
}