import { World } from "../../../../world/world.js";
import { Renderer } from "../../../renderer.js";
import { Color } from "../../../utils/color.js";
import { Perspective } from "../../pespective/perspective.js";
import { Projector } from "../../pespective/projector.js";
import { WorldRenderer } from "../../world-renderer.js";
import { BindGroupManager } from "./bindings/bind-group-manager.js";
import { Camera } from "./camera.js";
import { DepthTexture } from "./depth-texture.js";
import { GraphicsDevice } from "./graphics-device.js";
import { ClearRenderPass } from "./pass/clear-render-pass.js";
import { RenderPass } from "./pass/render-pass.js";
import { TerrainRenderPass } from "./pass/terrain-render-pass.js";
import { WebGPUWorldMirror } from "./webgpu-world-mirror.js";

export class WebGPURenderer implements WorldRenderer {
    private device: GraphicsDevice;
    private world: World;
    private renderedWorld: WebGPUWorldMirror;
    private passes: RenderPass[];
    private bindGroupManager: BindGroupManager;

    private depthTexture: DepthTexture;

    private camera: Camera;
    private perspective: Perspective;
    private projector: Projector = new Projector(Math.PI / 180 * 75, 1, 0.1, 1000);

    constructor(private renderer: Renderer) {
        this.renderedWorld = new WebGPUWorldMirror(this);
        this.device = new GraphicsDevice(document.createElement('canvas'), this);
        this.bindGroupManager = new BindGroupManager();

        const terrainRenderPass = new TerrainRenderPass(this.renderedWorld);

        terrainRenderPass.setBindGroupManager(this.bindGroupManager);

        this.passes = [
            new ClearRenderPass(new Color(0, 0.1, 0.2, 1)),
            terrainRenderPass
        ];
    }

    getDepthTexture(): DepthTexture {
        return this.depthTexture;
    }

    getCanvas(): HTMLCanvasElement {
        return this.device.getCanvas();
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
        await this.device.setup();

        this.camera = new Camera();
        this.camera.setProjector(this.projector);
        await this.camera.setup(this.device);
        this.camera.update(this.device);
        this.bindGroupManager.addBindGroup(this.camera.getCameraBindGroup());

        this.depthTexture = new DepthTexture();
        await this.depthTexture.setup(this.device);

        await this.renderedWorld.setup(this.device);

        for (const pass of this.passes) {
            await pass.setupBindings(this.device);
        }

        await this.bindGroupManager.setup(this.device);

        for (const pass of this.passes) {
            await pass.setup(this.device);
        }
    }

    async render(): Promise<void> {
        const canvas = this.device.getCanvas();

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.projector.setAspectRatio(canvas.width / canvas.height);
        this.perspective.updatePerspective();
        this.camera.update(this.device);

        await this.depthTexture.resize(canvas.width, canvas.height);

        this.renderedWorld.updateRenderedWorld();

        for (const renderPass of this.passes) {
            await renderPass.render();
        }
    }

    getPerspective(): Perspective {
        return this.perspective;
    }

    setPerspective(perspective: Perspective): void {
        this.perspective = perspective;

        this.camera.setPerspective(perspective);
    }

    getProjector(): Projector {
        return this.projector;
    }

    setProjector(projector: Projector): void {
        this.projector = projector;

        this.camera.setProjector(projector);
    }

    getCamera(): Camera {
        return this.camera;
    }

    static async isSupported() {
        if (!navigator.gpu) return false;

        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) return false;

        return true;
    }
}