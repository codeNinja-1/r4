import { GraphicsDevice } from "../graphics-device.js";
import { BindGroupEntry } from "./bind-group-entry.js";

export class BufferBindGroupEntry implements BindGroupEntry {
    private binding: number;

    constructor(private buffer: GPUBuffer, private visibility: GPUShaderStageFlags, private type: "uniform" | "storage" | "read-only-storage") {
    }

    setBinding(index: number): void {
        this.binding = index;
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