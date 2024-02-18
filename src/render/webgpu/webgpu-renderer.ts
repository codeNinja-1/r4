import { Vector2D } from "../../utils/vector2d/vector2d.js";
import { World } from "../../world/world.js";
import { RenderChunkMirror } from "../common/render-chunk-mirror.js";
import { RenderWorldMirror } from "../common/render-world-mirror.js";
import { WorldRenderer } from "../common/world-renderer.js";
import { Perspective } from "../perspective.js";
import { Renderer } from "../renderer.js";
import { WebGPUChunkMirror } from "./webgpu-chunk-mirror.js";

export class WebGPURenderer extends WorldRenderer {
    private canvas: HTMLCanvasElement;
    private context: GPUCanvasContext;
    private world: World;
    private renderedWorld: RenderWorldMirror<RenderChunkMirror>;
    private perspective: Perspective;

    constructor(private renderer: Renderer) {
        super();

        this.canvas = document.createElement('canvas');
        this.renderedWorld = new RenderWorldMirror(this);
    }

    getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    getRenderer(): Renderer {
        return this.renderer;
    }

    setWorld(world: any): void {
        if (this.world) throw new Error('Cannot set rendered world twice');

        this.world = world;
    }

    getWorld(): World {
        return this.world;
    }

    async setupWorldRenderer(): Promise<void> {
        if (!navigator.gpu) {
            throw new Error('WebGPU is not supported');
        }

        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
            throw new Error('No useable adapter found');
        }

        const device = await adapter.requestDevice();

        this.canvas = document.createElement('canvas');
        
        this.context = this.canvas.getContext('webgpu') as GPUCanvasContext;

        const format = navigator.gpu.getPreferredCanvasFormat();

        this.context.configure({
            device: device,
            format: format
        });
    }

    render(): void {
        this.renderedWorld.updateRenderedWorld();
        this.renderedWorld.render();
    }

    renderChunk(position: Vector2D) {
        // Not implemented
    }

    getPerspective(): Perspective {
        return this.perspective;
    }

    setPerspective(perspective: Perspective): void {
        this.perspective = perspective;
    }

    createRenderChunkMirror(position: Vector2D): RenderChunkMirror {
        return new WebGPUChunkMirror(position, this);
    }

    static async isSupported() {
        if (!navigator.gpu) return false;

        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) return false;

        return true;
    }
}