import { Color } from "../../../../utils/color.js";
import { GraphicsDevice } from "../graphics-device.js";
import { RenderPass } from "./render-pass.js";

export class ClearRenderPass implements RenderPass {
    private device: GraphicsDevice;

    constructor(private color: Color) {
    }

    async setup(device: GraphicsDevice): Promise<void> {
        this.device = device;
    }

    async setupBindings(device: GraphicsDevice): Promise<void> {
    }

    async render(): Promise<void> {
        const commandEncoder = this.device.getDevice().createCommandEncoder({
            label: "Clear Render Pass / Command Encoder"
        });

        const renderPassDescriptor: GPURenderPassDescriptor = {
            colorAttachments: [
                this.device.getRenderer().getMultisampleTexture().addToAttachment({
                    clearValue: Color.toGPUColor(this.color),
                    loadOp: "clear",
                    storeOp: "store"
                }) as GPURenderPassColorAttachment
            ],
            depthStencilAttachment: {
                view: this.device.getRenderer().getDepthTexture().createView(),
                depthClearValue: 1.0,
                depthLoadOp: 'clear',
                depthStoreOp: 'store'
            }
        };

        const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);

        renderPass.end();

        this.device.getDevice().queue.submit([ commandEncoder.finish() ]);
    }
}