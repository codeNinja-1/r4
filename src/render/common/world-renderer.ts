import { Vector2D } from "../../utils/vector2d/vector2d.js";
import { World } from "../../world/world.js";
import { Perspective } from "../perspective.js";
import { Renderer } from "../renderer.js";
import { RenderChunkMirror } from "./render-chunk-mirror.js";

export abstract class WorldRenderer {
    abstract getRenderer(): Renderer;
    abstract getCanvas(): HTMLCanvasElement;
    abstract setWorld(world: World): void;
    abstract setupWorldRenderer(): Promise<void>;
    abstract getPerspective(): Perspective;
    abstract setPerspective(perspective: Perspective): void;
    abstract getWorld(): World;
    abstract createRenderChunkMirror(position: Vector2D): RenderChunkMirror;
    abstract render(): void;
}