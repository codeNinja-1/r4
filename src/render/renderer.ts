import { World } from "../world/world.js";
import { WebGPURenderer } from "./world/implementation/webgpu/webgpu-renderer.js";
import { WorldRenderer } from "./world/world-renderer.js";

export class Renderer {
    private worldRenderer: WorldRenderer | null;

    constructor(private world: World) {
    }

    getWorldRenderer(): WorldRenderer {
        if (!this.worldRenderer) throw new Error('No world renderer set');

        return this.worldRenderer;
    }

    getElement(): HTMLElement {
        if (!this.worldRenderer) throw new Error('No world renderer set');

        return this.worldRenderer.getCanvas();
    }

    getWorld(): World {
        return this.world;
    }

    async setupRenderer() {
        if (await WebGPURenderer.isSupported()) {
            this.worldRenderer = new WebGPURenderer(this);
        } else {
            throw new Error("No supported world renderer found");
        }

        this.worldRenderer.setWorld(this.world);
        await this.worldRenderer.setupWorldRenderer();
    }

    async render(): Promise<void> {
        if (!this.worldRenderer) throw new Error('No world renderer set');

        await this.worldRenderer.render();
    }
}