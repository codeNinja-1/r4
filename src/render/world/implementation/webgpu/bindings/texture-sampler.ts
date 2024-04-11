import { GraphicsDevice } from "../graphics-device.js";
import { BaseBindGroupEntry } from "./base-bind-group-entry.js";
import { BindGroupEntry } from "./bind-group-entry.js";

export class TextureSampler extends BaseBindGroupEntry {
    private sampler: GPUSampler;

    getLayoutEntry(): GPUBindGroupLayoutEntry {
        return {
            binding: this.binding,
            visibility: GPUShaderStage.FRAGMENT,
            sampler: {}
        };
    }

    getLabel(): string {
        return super.getLabel("Texture Sampler");
    }

    getBindGroupEntry(): GPUBindGroupEntry {
        return {
            binding: this.binding,
            resource: this.sampler
        };
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