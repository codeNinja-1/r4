import { WebGPUBindGroupEntry } from "./webgpu-bind-group-entry.js";

export class WebGPUBindGroup {
    private index: number;
    private entries: WebGPUBindGroupEntry[];
    private layout: GPUBindGroupLayout;
    private group: GPUBindGroup;

    constructor(index: number) {
        this.index = index;
    }

    setup(gpuDevice: GPUDevice) {
        if (this.layout || this.group) return;

        this.layout = gpuDevice.createBindGroupLayout({
            entries: this.entries.map(entry => entry.getLayoutEntry())
        });

        this.group = gpuDevice.createBindGroup({
            layout: this.layout,
            entries: this.entries.map(entry => entry.getBindGroupEntry())
        });
    }

    getLayout(): GPUBindGroupLayout {
        return this.layout;
    }

    getBindGroupIndex(): number {
        return this.index;
    }

    getBindGroup(): GPUBindGroup {
        return this.group;
    }
}