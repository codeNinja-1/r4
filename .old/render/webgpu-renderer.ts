import { World } from "../../src/world/world.js";
import { Renderer } from "../../src/render/renderer.js";
import { Perspective } from "../../src/render/world/pespective/perspective.js";
import { Projector } from "../../src/render/world/pespective/projector.js";
import { WorldRenderer } from "../../src/render/world/world-renderer.js";
import { BaseRenderPass } from "../../src/render/world/implementation/webgpu/pass/base-render-pass.js";
import { WebGPUWorldMirror } from "../../src/render/world/implementation/webgpu/webgpu-world-mirror.js";

export class WebGPURenderer implements WorldRenderer {
    private canvas: HTMLCanvasElement;
    private context: GPUCanvasContext;
    private device: GPUDevice;
    private world: World;
    private renderedWorld: WebGPUWorldMirror;
    private pipeline: GPURenderPipeline;
    private passes: BaseRenderPass[] = [];

    private perspective: Perspective;
    private projector: Projector = new Projector(75, 1, 0.1, 1000);

    constructor(private renderer: Renderer) {
        this.canvas = document.createElement('canvas');
        this.renderedWorld = new WebGPUWorldMirror(this);
    }

    private addRenderPass() {
        
    }

    getGPUDevice(): GPUDevice {
        return this.device;
    }

    getGPUContext(): GPUCanvasContext {
        return this.context;
    }

    getGPURenderPipeline(): GPURenderPipeline {
        return this.pipeline;
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
        console.log("Initializing WebGPU");

        if (!navigator.gpu) {
            throw new Error('WebGPU is not supported');
        }

        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
            throw new Error('No useable adapter found');
        }

        this.device = await adapter.requestDevice();

        this.canvas = document.createElement('canvas');
        
        this.context = this.canvas.getContext('webgpu') as GPUCanvasContext;

        const format = navigator.gpu.getPreferredCanvasFormat();

        this.context.configure({
            device: this.device,
            format: format
        });

        console.log("Building pipeline");

        const vertexBuffers: GPUVertexBufferLayout[] = [
            {
                attributes: [
                    {
                        shaderLocation: 0,
                        offset: 0,
                        format: "float32"
                    },
                    {
                        shaderLocation: 1,
                        offset: 0,
                        format: "uint32"
                    }
                ],
                arrayStride: 4,
                stepMode: "vertex",
            },
        ];

        let shaderModule;

        const pipelineDescriptor = {
            vertex: {
                module: shaderModule,
                entryPoint: "vertex_main",
                buffers: vertexBuffers
            },
            fragment: {
                module: shaderModule,
                entryPoint: "fragment_main",
                targets: [ { format } ]
            },
            primitive: {
                topology: "triangle-list"
            },
            layout: "auto"
        };

        this.renderedWorld.setup();

        for (const pass of this.passes) {
            pass.setup(this);
        }
    }

    render(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.projector.setAspectRatio(this.canvas.width / this.canvas.height);

        this.perspective.updatePerspective();
        this.renderedWorld.updateRenderedWorld();

        const commandEncoder = this.createCommandEncoder();
        
        for (const renderPass of this.passes) {
            renderPass.prerender();
            renderPass.render(commandEncoder);
        }

        this.device.queue.submit([ commandEncoder.finish() ]);
    }

    private createCommandEncoder(): GPUCommandEncoder {
        return this.device.createCommandEncoder();
    }

    private createRenderPassEncoder(commandEncoder: GPUCommandEncoder): GPURenderPassEncoder {
        const renderPassDescriptor: GPURenderPassDescriptor = {
            colorAttachments: [
                {
                    clearValue: { r: 0.0, g: 0.5, b: 1.0, a: 1.0 },
                    loadOp: "clear",
                    storeOp: "store",
                    view: this.context.getCurrentTexture().createView()
                }
            ]
        };

        return commandEncoder.beginRenderPass(renderPassDescriptor);
    }

    getPerspective(): Perspective {
        return this.perspective;
    }

    setPerspective(perspective: Perspective): void {
        this.perspective = perspective;
    }

    getProjector(): Projector {
        return this.projector;
    }

    setProjector(projector: Projector): void {
        this.projector = projector;
    }

    static async isSupported() {
        if (!navigator.gpu) return false;

        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) return false;

        return true;
    }
}