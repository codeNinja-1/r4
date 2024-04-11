import { GraphicsDevice } from "../graphics-device.js";
import { BaseBindGroupEntry } from "./base-bind-group-entry.js";
import { BindGroupEntry } from "./bind-group-entry.js";

export class BufferBindGroupEntry extends BaseBindGroupEntry {
    constructor(private buffer: GPUBuffer, private visibility: GPUShaderStageFlags, private type: "uniform" | "storage" | "read-only-storage") {
        super();
    }

    getLabel(): string {
        return super.getLabel("Buffer");
    }

    async setup(device: GraphicsDevice): Promise<void> {
    }

    getLayoutEntry(): GPUBindGroupLayoutEntry {
        return {
            binding: this.binding,
            visibility: this.visibility,
            buffer: {
                type: this.type
            }
        };
    }

    getBindGroupEntry(): GPUBindGroupEntry {
        return {
            binding: this.binding,
            resource: {
                buffer: this.buffer
            }
        };
    }
}