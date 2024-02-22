import { World } from "../world/world.js";
import { WorldRenderer } from "./world/world-renderer.js";
import { WebGPURenderer } from "./world/implementation/webgpu/webgpu-renderer.js";

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

        this.worldRenderer.setupWorldRenderer();
        this.worldRenderer.setWorld(this.world);
    }

    render(): void {
        if (!this.worldRenderer) throw new Error('No world renderer set');

        this.worldRenderer.render();
    }
}