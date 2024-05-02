import { GraphicsDevice } from "./graphics-device.js";

export class MultisampleTexture {
    private texture: GPUTexture;
    private device: GraphicsDevice;
    private width: number;
    private height: number;
    private view: GPUTextureView;

    async resize(width: number, height: number) {
        if (!MultisampleTexture.ENABLED) return;
        if (this.width === width && this.height === height) return;

        this.width = width;
        this.height = height;

        let newTexture = this.texture;

        newTexture = this.device.getDevice().createTexture({
            label: "Multisample Texture",
            format: 'bgra8unorm',
            size: [ this.width, this.height],
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
            sampleCount: 4
        });

        let oldTexture = this.texture;

        this.view = newTexture.createView({ label: "Multisample Texture [View]" });
        this.texture = newTexture;

        if (oldTexture) {
            oldTexture.destroy();
        }
    }

    async setup(device: GraphicsDevice) {
        this.device = device;
    }

    addToAttachment(source: Partial<GPURenderPassColorAttachment> = {}): Partial<GPURenderPassColorAttachment> {
        const canvasTextureView = this.device.getContext().getCurrentTexture().createView({ label: "Canvas Texture [View]" });

        return Object.assign(source, MultisampleTexture.ENABLED ? {
            view: this.view,
            resolveTarget: canvasTextureView
        } : {
            view: canvasTextureView
        });
    }
    
    getSampleCount() {
        return MultisampleTexture.ENABLED ? 4 : 1;
    }

    public static ENABLED: boolean = false;
}