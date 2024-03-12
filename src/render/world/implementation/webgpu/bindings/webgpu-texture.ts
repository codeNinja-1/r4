import { Texture } from "../../../../utils/texture.js";
import { BindGroupEntry } from "./bind-group-entry.js";
import { GraphicsDevice } from "../graphics-device.js";

export class WebGPUTexture implements BindGroupEntry {
    private texture: GPUTexture | null;
    private device: GraphicsDevice;
    private binding: number;

    constructor(private source: Texture) {
    }

    setBinding(index: number): void {
        this.binding = index;
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
            resource: this.texture.createView()
        };
    }

    getTexture(): GPUTexture {
        if (!this.texture) {
            throw new Error('Texture not initialized');
        }

        return this.texture;
    }

    async setup(device: GraphicsDevice) {
        this.device = device;
        
        this.texture = device.getDevice().createTexture({
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