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
    protected depthTest: boolean = false;

    setBindGroupManager(bindGroupManager: BindGroupManager) {
        this.bindGroupManager = new PipelineBindGroupManager(bindGroupManager);
    }

    async setup(device: GraphicsDevice) {
        const gpuDevice = device.getDevice();

        this.descriptor.multisample = {
            count: device.getRenderer().getMultisampleTexture().getSampleCount()
        };

        const layoutDescriptor: Partial<GPUPipelineLayoutDescriptor> = {};

        this.bindGroupManager.addBindGroupsToPipelineLayout(layoutDescriptor);

        this.pipelineLayout = gpuDevice.createPipelineLayout(layoutDescriptor as GPUPipelineLayoutDescriptor);

        this.descriptor.layout = this.pipelineLayout;

        if (this.depthTest) {
            device.getRenderer().getDepthTexture().addToPipelineDescriptor(this.descriptor);
        }

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

    protected createCommandEncoder(passLabel: string): GPUCommandEncoder {
        return this.device.getDevice().createCommandEncoder({
            label: `${passLabel} / Command Encoder`
        });
    }

    protected createRenderPass(commandEncoder: GPUCommandEncoder): GPURenderPassEncoder {
        const renderPassDescriptor: Partial<GPURenderPassDescriptor> = {
            colorAttachments: [
                this.device.getRenderer().getMultisampleTexture().addToAttachment({
                    loadOp: "load",
                    storeOp: "store"
                }) as GPURenderPassColorAttachment
            ]
        };

        if (this.depthTest) {
            this.device.getRenderer().getDepthTexture().addToRenderPassDescriptor(renderPassDescriptor);
        }

        const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor as GPURenderPassDescriptor);

        this.bindGroupManager.setBindGroupsOnRenderPassEncoder(renderPass);
        renderPass.setPipeline(this.pipeline);

        return renderPass;
    }

    abstract render(): Promise<void>;

    protected getGraphicsDevice(): GraphicsDevice {
        return this.device;
    }
}