import { GraphicsDevice } from "../graphics-device.js";
import { BindGroupEntry } from "./bind-group-entry.js";

export class TextureSampler implements BindGroupEntry {
    private sampler: GPUSampler;
    private binding: number;

    getLayoutEntry(): GPUBindGroupLayoutEntry {
        return {
            binding: this.binding,
            visibility: GPUShaderStage.FRAGMENT,
            sampler: {}
        };
    }

    getBindGroupEntry(): GPUBindGroupEntry {
        return {
            binding: this.binding,
            resource: this.sampler
        };
    }

    setBinding(index: number): void {
        this.binding = index;
    }

    async setup(device: GraphicsDevice): Promise<void> {
        this.sampler = device.getDevice().createSampler({
            magFilter: 'nearest',
            minFilter: 'nearest',
            mipmapFilter: 'nearest',
            lodMinClamp: 0,
            lodMaxClamp: 0
        });
    }
}