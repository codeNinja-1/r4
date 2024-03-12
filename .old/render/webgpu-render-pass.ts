import { WebGPUBindGroup } from "./bindings/webgpu-bind-group.js";
import { WebGPURenderer } from "../webgpu-renderer.js";

export abstract class WebGPURenderPass {
    private renderer: WebGPURenderer;
    private bindGroups: WebGPUBindGroup[] = [];

    addBindGroup(group: WebGPUBindGroup) {
        this.bindGroups.push(group);
    }

    bindWebGPURenderer(renderer: WebGPURenderer) {
        this.renderer = renderer;
    }

    setup() {
        for (const bindGroup of this.bindGroups) {
            bindGroup.setup(this.renderer.getGPUDevice());
        }
    }

    abstract prerender(): void;
    abstract draw(renderPassEncoder: GPURenderPassEncoder): void;

    render(commandEncoder: GPUCommandEncoder) {
        const renderPassEncoder = commandEncoder.beginRenderPass({
            colorAttachments: [
                {
                    clearValue: { r: 0.0, g: 0.5, b: 1.0, a: 1.0 },
                    loadOp: "clear",
                    storeOp: "store",
                    view: this.renderer.getGPUContext().getCurrentTexture().createView()
                }
            ]
        });

        for (const bindGroup of this.bindGroups) {
            renderPassEncoder.setBindGroup(bindGroup.getBindGroupIndex(), bindGroup.getBindGroup());
        }

        this.draw(renderPassEncoder);

        renderPassEncoder.end();
    }
}