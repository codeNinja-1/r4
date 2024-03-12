import { Texture } from "../../src/render/utils/texture.js";
import { WebGPURenderer } from "./webgpu-renderer.js";

export class WebGPUTexture {
    private texture: GPUTexture | null;
    private bindGroup: GPUBindGroup | null;
    private renderer: WebGPURenderer;

    constructor(private source: Texture) {
    }

    getTexture() {
        return this.source;
    }

    bindRenderer(renderer: WebGPURenderer) {
        this.renderer = renderer;
    }

    setup() {
        const device = this.renderer.getGPUDevice();
        const pipeline = this.renderer.getGPURenderPipeline();

        this.texture = device.createTexture({
            size: [
                this.source.getTextureWidth(),
                this.source.getTextureHeight()
            ],
            format: 'rgba8unorm',
            usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.TEXTURE_BINDING
        });
        
        device.queue.writeTexture(
            { texture: this.texture },
            this.source.toDataArray(),
            { bytesPerRow: this.source.getTextureWidth() * 4 },
            [ this.source.getTextureWidth(), this.source.getTextureHeight() ]
        );
        
        const sampler = device.createSampler();

        this.bindGroup = device.createBindGroup({
            layout: pipeline.getBindGroupLayout(2),
            entries: [
              { binding: 0, resource: sampler },
              { binding: 1, resource: this.texture.createView() },
            ],
        });
    }

    addToRenderPass(renderPassEncoder: GPURenderPassEncoder) {
        if (!this.bindGroup) throw new Error('Texture not instantiated');

        renderPassEncoder.setBindGroup(2, this.bindGroup);
    }
}