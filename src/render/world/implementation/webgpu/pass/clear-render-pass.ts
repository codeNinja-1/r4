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

    render(commandEncoder: GPUCommandEncoder): void {
        const renderPassDescriptor: GPURenderPassDescriptor = {
            colorAttachments: [
                {
                    clearValue: Color.toGPUColor(this.color),
                    loadOp: "clear",
                    storeOp: "store",
                    view: this.device.getContext().getCurrentTexture().createView()
                }
            ]
        };

        const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);

        renderPass.end();
    }
}