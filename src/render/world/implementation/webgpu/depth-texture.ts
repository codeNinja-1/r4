import { GraphicsDevice } from "./graphics-device.js";

export class DepthTexture {
    private texture: GPUTexture;
    private device: GraphicsDevice;
    private width: number;
    private height: number;
    private view: GPUTextureView;

    async resize(width: number, height: number) {
        if (this.width === width && this.height === height) return;

        this.width = width;
        this.height = height;

        if (this.texture) this.texture.destroy();

        this.texture = this.device.getDevice().createTexture({
            label: "Depth Texture",
            format: 'depth24plus',
            size: [ this.width, this.height],
            usage: GPUTextureUsage.RENDER_ATTACHMENT
        });

        this.view = this.texture.createView({ label: "Depth Texture [View]" });
    }

    async setup(device: GraphicsDevice) {
        this.device = device;
    }

    addToPipelineDescriptor(descriptor: Partial<GPURenderPipelineDescriptor>) {
        descriptor.depthStencil = {
            format: 'depth24plus',
            depthWriteEnabled: true,
            depthCompare: 'less'
        };
    }

    addToRenderPassDescriptor(descriptor: Partial<GPURenderPassDescriptor>) {
        descriptor.depthStencilAttachment = {
            view: this.view,
            depthLoadOp: 'load',
            depthStoreOp: 'store'
        };
    }

    createView(): GPUTextureView {
        return this.view;
    }
}