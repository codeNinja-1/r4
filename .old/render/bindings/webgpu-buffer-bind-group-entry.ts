import { WebGPUBindGroupEntry } from "./webgpu-bind-group-entry.js";
import { WebGPUShaderVisibility } from "./webgpu-shader-visibility.js";

export class WebGPUBufferBindGroupEntry implements WebGPUBindGroupEntry {
    constructor(private index: number, private buffer: GPUBuffer, private type: WebGPUBufferBindGroupEntry.BufferUsage, private visibility: WebGPUShaderVisibility) {
    }

    getLayoutEntry(): GPUBindGroupLayoutEntry {
        return {
            binding: this.index,
            visibility: this.visibility.getBitwise(),
            buffer: {
                type: this.type
            }
        };
    }

    getBindGroupEntry(): GPUBindGroupEntry {
        return {
            binding: this.index,
            resource: {
                buffer: this.buffer
            }
        };
    }
}

export namespace WebGPUBufferBindGroupEntry {
    export enum BufferUsage {
        UNIFORM = "uniform",
        STORAGE = "storage",
        READ_ONLY_STORAGE = "read-only-storage",
    }
}