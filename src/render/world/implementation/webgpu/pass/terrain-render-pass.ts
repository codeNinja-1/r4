import { ChunkDataReferencer } from "../../../../../world/chunk-data/chunk-data-referencer.js";
import { Bindings } from "../bindings.js";
import { BindGroup } from "../bindings/bind-group.js";
import { BufferBindGroupEntry } from "../bindings/buffer-bind-group-entry.js";
import { TextureSampler } from "../bindings/texture-sampler.js";
import { WebGPUTexture } from "../bindings/webgpu-texture.js";
import { GraphicsDevice } from "../graphics-device.js";
import { ShaderModule } from "../shader-module.js";
import { WebGPUWorldMirror } from "../webgpu-world-mirror.js";
import { BaseRenderPass } from "./base-render-pass.js";

export class TerrainRenderPass extends BaseRenderPass {
    private indirectDrawBuffer: GPUBuffer;
    
    constructor(private worldMirror: WebGPUWorldMirror) {
        super();
    }

    async setupBindings(device: GraphicsDevice) {
        const gpuDevice = device.getDevice();

        this.indirectDrawBuffer = gpuDevice.createBuffer({
            label: "Terrain Indirect Draw Buffer",
            usage: GPUBufferUsage.INDIRECT | GPUBufferUsage.STORAGE,
            size: ChunkDataReferencer.cells * 16
        });

        const shader = await ShaderModule.import("/assets/shaders/terrain.wgsl", "Terrain Shader");

        shader.setup(device);

        this.addPrimitiveTopology("triangle-list", "back");
        this.addLabel("Terrain Render Pass");
        this.addVertexStage(shader, "vertex_main");
        this.addFragmentStage(shader, "fragment_main");

        this.getBindGroupManager().useBindGroup(device.getRenderer().getCamera().getCameraBindGroup());

        await this.setupBlockModelBindings(device);
    }

    private async setupBlockModelBindings(device: GraphicsDevice) {
        const blockModelBindGroup = new BindGroup(Bindings.BlockModelBindGroup);

        await this.setupGeometryBindings(blockModelBindGroup, device);
        await this.setupTextureMappingBindings(blockModelBindGroup, device);
        await this.setupTextureBindings(blockModelBindGroup, device);
        await this.setupTextureSamplerBindings(blockModelBindGroup, device);

        this.getBindGroupManager().useBindGroup(blockModelBindGroup);
    }

    private async setupGeometryBindings(bindGroup: BindGroup, device: GraphicsDevice) {
        const gpuDevice = device.getDevice();

        const geometryData = this.worldMirror.getTerrainMesh().getVertexPositions();
        const geometryBuffer = gpuDevice.createBuffer({
            label: "Terrain Geometry Buffer",
            size: geometryData.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
        });

        gpuDevice.queue.writeBuffer(geometryBuffer, 0, geometryData);

        const geometryBindGroupEntry = new BufferBindGroupEntry(geometryBuffer, GPUShaderStage.VERTEX, "read-only-storage");

        bindGroup.addEntry(Bindings.BlockModelGeometryBinding, geometryBindGroupEntry);
    }

    private async setupTextureMappingBindings(bindGroup: BindGroup, device: GraphicsDevice) {
        const gpuDevice = device.getDevice();

        const textureMappingData = this.worldMirror.getTerrainMesh().getTextureMappings();
        const textureMappingBuffer = gpuDevice.createBuffer({
            label: "Terrain Texture Mapping Buffer",
            size: textureMappingData.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
        });

        gpuDevice.queue.writeBuffer(textureMappingBuffer, 0, textureMappingData);

        const textureMappingBindGroupEntry = new BufferBindGroupEntry(textureMappingBuffer, GPUShaderStage.VERTEX, "read-only-storage");

        bindGroup.addEntry(Bindings.BlockModelTextureMappingBinding, textureMappingBindGroupEntry);
    }

    private async setupTextureBindings(bindGroup: BindGroup, device: GraphicsDevice) {
        const texture = this.worldMirror.getTerrainMesh().getTexture();
        const gpuTexture = new WebGPUTexture(texture);

        bindGroup.addEntry(Bindings.BlockModelTextureBinding, gpuTexture);
    }

    private async setupTextureSamplerBindings(bindGroup: BindGroup, device: GraphicsDevice) {
        const textureSampler = new TextureSampler();

        bindGroup.addEntry(Bindings.BlockModelTextureSamplerBinding, textureSampler);
    }

    protected draw(renderPass: GPURenderPassEncoder, commandEncoder: GPUCommandEncoder): void {
        const gpuDevice = this.getGraphicsDevice().getDevice();

        for (const chunk of this.worldMirror.getVisibleChunks()) {
            gpuDevice.queue.writeBuffer(this.indirectDrawBuffer, 0, chunk.getIndirectDrawCalls());

            renderPass.drawIndirect(this.indirectDrawBuffer, 0);
        }
    }
}