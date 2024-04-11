import { Texture } from "../../../../utils/texture.js";
import { BindGroupEntry } from "./bind-group-entry.js";
import { GraphicsDevice } from "../graphics-device.js";
import { BaseBindGroupEntry } from "./base-bind-group-entry.js";

export class WebGPUTexture extends BaseBindGroupEntry {
    private texture: GPUTexture | null = null;

    constructor(private source: Texture) {
        super();
    }

    getLabel(): string {
        return super.getLabel("Texture");
    }
    
    getLayoutEntry(): GPUBindGroupLayoutEntry {
        return {
            binding: this.binding,
            visibility: GPUShaderStage.FRAGMENT,
            texture: {
                sampleType: 'float',
                viewDimension: '2d'
            }
        };
    }

    getBindGroupEntry(): GPUBindGroupEntry {
        if (!this.texture) {
            throw new Error('Texture not initialized');
        }

        return {
            binding: this.binding,
            resource: this.texture.createView({ label: this.getLabel() + ' [View]'})
        };
    }

    getTexture(): GPUTexture {
        if (!this.texture) {
            throw new Error('Texture not initialized');
        }

        return this.texture;
    }

    getBinding(): number {
        return this.binding;
    }

    async setup(device: GraphicsDevice) {
        this.texture = device.getDevice().createTexture({
            label: this.label,
            size: [
                this.source.getTextureWidth(),
                this.source.getTextureHeight()
            ],
            format: 'rgba8unorm',
            usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.TEXTURE_BINDING
        });

        device.getDevice().queue.writeTexture(
            { texture: this.texture },
            this.source.toDataArray(),
            { bytesPerRow: this.source.getTextureWidth() * 4, rowsPerImage: this.source.getTextureHeight() },
            [ this.source.getTextureWidth(), this.source.getTextureHeight() ]
        );
    }
}