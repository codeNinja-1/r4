import { PipelineBindGroupManager } from "../bindings/pipeline-bind-group-manager.js";
import { GraphicsDevice } from "../graphics-device.js";
import { RenderPass } from "./render-pass.js";
import { ShaderModule } from "../shader-module.js";
import { BindGroupManager } from "../bindings/bind-group-manager.js";

export abstract class BaseRenderPass implements RenderPass {
    private pipeline: GPURenderPipeline;
    private descriptor: Partial<GPURenderPipelineDescriptor> = {};
    private pipelineLayout: GPUPipelineLayout;
    private bindGroupManager: PipelineBindGroupManager;
    private device: GraphicsDevice;

    setBindGroupManager(bindGroupManager: BindGroupManager) {
        this.bindGroupManager = new PipelineBindGroupManager(bindGroupManager);
    }

    async setup(device: GraphicsDevice) {
        const gpuDevice = device.getDevice();

        const layoutDescriptor: Partial<GPUPipelineLayoutDescriptor> = {};
        this.bindGroupManager.addBindGroupsToPipelineLayout(layoutDescriptor);
        this.pipelineLayout = gpuDevice.createPipelineLayout(layoutDescriptor as GPUPipelineLayoutDescriptor);

        this.descriptor.layout = this.pipelineLayout;

        this.pipeline = gpuDevice.createRenderPipeline(this.descriptor as GPURenderPipelineDescriptor);

        this.device = device;
    }

    async setupBindings(device: GraphicsDevice) {
    }

    protected addLabel(label: string) {
        this.descriptor.label = label;
    }

    protected addVertexStage(module: ShaderModule, entryPoint: string) {
        this.descriptor.vertex = {
            module: module.getShaderModule(),
            entryPoint
        };
    }

    protected addFragmentStage(module: ShaderModule, entryPoint: string) {
        this.descriptor.fragment = {
            module: module.getShaderModule(),
            entryPoint,
            targets: [
                { format: navigator.gpu.getPreferredCanvasFormat() }
            ]   
        };
    }

    protected addPrimitiveTopology(topology: GPUPrimitiveTopology, cullMode: GPUCullMode = "none") {
        this.descriptor.primitive = {
            topology,
            cullMode
        };
    }

    protected getBindGroupManager(): PipelineBindGroupManager {
        return this.bindGroupManager;
    }

    protected getPipelineLayout(): GPUPipelineLayout {
        return this.pipelineLayout;
    }

    render(commandEncoder: GPUCommandEncoder): void {
        const renderPass = commandEncoder.beginRenderPass({
            colorAttachments: [
                {
                    view: this.device.getContext().getCurrentTexture().createView(),
                    loadOp: "load",
                    storeOp: "store"
                }
            ]
        });

        this.bindGroupManager.setBindGroupsOnRenderPassEncoder(renderPass);
        renderPass.setPipeline(this.pipeline);

        this.draw(renderPass, commandEncoder);

        renderPass.end();
    }

    protected getGraphicsDevice(): GraphicsDevice {
        return this.device;
    }

    protected abstract draw(renderPass: GPURenderPassEncoder, commandEncoder: GPUCommandEncoder): void;
}