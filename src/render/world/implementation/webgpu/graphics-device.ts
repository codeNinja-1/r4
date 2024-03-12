import { WebGPURenderer } from "./webgpu-renderer.js";

export class GraphicsDevice {
    private device: GPUDevice;
    private adapter: GPUAdapter;
    private context: GPUCanvasContext;

    constructor(private canvas: HTMLCanvasElement, private renderer: WebGPURenderer) {
    }

    async setup() {
        console.log("Initializing WebGPU");

        if (!navigator.gpu) {
            throw new Error('WebGPU is not supported');
        }

        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
            throw new Error('No useable adapter found');
        }

        this.adapter = adapter;

        this.device = await adapter.requestDevice();

        this.context = this.canvas.getContext('webgpu') as GPUCanvasContext;

        this.context.configure({
            device: this.device,
            format: navigator.gpu.getPreferredCanvasFormat()
        });
    }

    getDevice(): GPUDevice {
        return this.device;
    }

    getContext(): GPUCanvasContext {
        return this.context;
    }

    getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    getAdapter(): GPUAdapter {
        return this.adapter;
    }

    getRenderer(): WebGPURenderer {
        return this.renderer;
    }
}