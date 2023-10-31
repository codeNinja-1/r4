export class GPUContext {
    constructor(public canvas: HTMLCanvasElement) {
    }

    async setup() {
        if (!navigator.gpu) {
            throw new Error('WebGPU is not supported');
        }

        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
            throw new Error('No useable adapter found');
        }

        const device = await adapter.requestDevice();
        
        const context = this.canvas.getContext('webgpu');
        const format = navigator.gpu.getPreferredCanvasFormat();

        context.configure({
            device: device,
            format: format
        });
    }
}