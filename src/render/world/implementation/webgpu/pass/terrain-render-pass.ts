import { ChunkDataReferencer } from "../../../../../world/chunk-data/chunk-data-referencer.js";
import { Bindings } from "../bindings.js";
import { BindGroup } from "../bindings/bind-group.js";
import { BufferBindGroupEntry } from "../bindings/buffer-bind-group-entry.js";
import { TextureSampler } from "../bindings/texture-sampler.js";
import { WebGPUTexture } from "../bindings/webgpu-texture.js";
import { BufferAlignment } from "../buffer-alignment.js";
import { GraphicsDevice } from "../graphics-device.js";
import { ShaderModule } from "../shader-module.js";
import { WebGPUWorldMirror } from "../webgpu-world-mirror.js";
import { BaseRenderPass } from "./base-render-pass.js";

export class TerrainRenderPass extends BaseRenderPass {
    private indirectDrawBuffer: GPUBuffer;
    private chunkPositionBuffer: GPUBuffer;
    protected depthTest = true;
    
    constructor(private worldMirror: WebGPUWorldMirror) {
        super();
    }

    async setupBindings(device: GraphicsDevice) {
        const gpuDevice = device.getDevice();

        this.indirectDrawBuffer = gpuDevice.createBuffer({
            label: "Terrain Indirect Draw Buffer",
            usage: GPUBufferUsage.INDIRECT | GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
            size: ChunkDataReferencer.cells * 4 * 4
        });

        const shader = await ShaderModule.import("/assets/shaders/terrain.wgsl", "Terrain Shader");

        shader.setup(device);

        this.addPrimitiveTopology("triangle-list");
        this.addLabel("Terrain Render Pass");
        this.addVertexStage(shader, "vertex_main");
        this.addFragmentStage(shader, "fragment_main");

        this.getBindGroupManager().useBindGroup(device.getRenderer().getCamera().getCameraBindGroup());

        await this.setupBlockModelBindings(device);
    }

    private async setupBlockModelBindings(device: GraphicsDevice) {
        const terrainBindGroup = new BindGroup(Bindings.TerrainBindGroup);

        await this.setupGeometryBindings(terrainBindGroup, device);
        await this.setupTextureMappingBindings(terrainBindGroup, device);
        await this.setupTextureBindings(terrainBindGroup, device);
        await this.setupTextureSamplerBindings(terrainBindGroup, device);
        await this.setupChunkPositionBindings(terrainBindGroup, device);

        this.getBindGroupManager().useBindGroup(terrainBindGroup);
    }

    private async setupGeometryBindings(bindGroup: BindGroup, device: GraphicsDevice) {
        const gpuDevice = device.getDevice();

        const geometryData = this.worldMirror.getTerrainMesh().getVertexPositions().buffer;
        const alignedData = BufferAlignment.alignItems(geometryData, 12, 16);
        const geometryBuffer = gpuDevice.createBuffer({
            label: "Block Geometry Buffer",
            size: alignedData.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
        });

        gpuDevice.queue.writeBuffer(geometryBuffer, 0, alignedData);

        const geometryBindGroupEntry = new BufferBindGroupEntry(geometryBuffer, GPUShaderStage.VERTEX, "read-only-storage");
        geometryBindGroupEntry.setLabel("Block Geometry");
        bindGroup.addEntry(Bindings.BlockModelGeometryBinding, geometryBindGroupEntry);
    }

    private async setupTextureMappingBindings(bindGroup: BindGroup, device: GraphicsDevice) {
        const gpuDevice = device.getDevice();

        const textureMappingData = this.worldMirror.getTerrainMesh().getTextureMappings();
        const textureMappingBuffer = gpuDevice.createBuffer({
            label: "Block Texture Mapping Buffer",
            size: textureMappingData.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
        });

        gpuDevice.queue.writeBuffer(textureMappingBuffer, 0, textureMappingData);

        const textureMappingBindGroupEntry = new BufferBindGroupEntry(textureMappingBuffer, GPUShaderStage.VERTEX, "read-only-storage");
        textureMappingBindGroupEntry.setLabel("Block Texture Mapping");
        bindGroup.addEntry(Bindings.BlockModelTextureMappingBinding, textureMappingBindGroupEntry);
    }

    private async setupTextureBindings(bindGroup: BindGroup, device: GraphicsDevice) {
        const texture = this.worldMirror.getTerrainMesh().getTexture();
        const gpuTexture = new WebGPUTexture(texture);
        gpuTexture.setLabel("Block Texture Atlas");
        bindGroup.addEntry(Bindings.BlockModelTextureBinding, gpuTexture);
    }

    private async setupTextureSamplerBindings(bindGroup: BindGroup, device: GraphicsDevice) {
        const textureSampler = new TextureSampler();
        textureSampler.setLabel("Block Texture Sampler");
        bindGroup.addEntry(Bindings.BlockModelTextureSamplerBinding, textureSampler);
    }

    private async setupChunkPositionBindings(bindGroup: BindGroup, device: GraphicsDevice) {
        const gpuDevice = device.getDevice();

        const buffer = gpuDevice.createBuffer({
            label: "Chunk Position",
            size: 8,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        });

        const entry = new BufferBindGroupEntry(buffer, GPUShaderStage.VERTEX, "uniform");
        entry.setLabel("Chunk Position");
        bindGroup.addEntry(Bindings.ChunkPositionBinding, entry);

        this.chunkPositionBuffer = buffer;
    }

    async render(): Promise<void> {
        const gpuDevice = this.getGraphicsDevice().getDevice();

        for (const chunk of this.worldMirror.getVisibleChunks()) {
            const commandEncoder = this.createCommandEncoder("Terrain Render Pass");
            const renderPass = this.createRenderPass(commandEncoder);

            gpuDevice.queue.writeBuffer(this.chunkPositionBuffer, 0, new Float32Array(chunk.getPosition()));

            this._draw(renderPass, gpuDevice, chunk.getIndirectDrawCalls(), chunk.getIndirectCallCount());

            renderPass.end();
            gpuDevice.queue.submit([ commandEncoder.finish() ]);
        }
    }

    private _draw(renderPass: GPURenderPassEncoder, gpuDevice: GPUDevice, buffer: ArrayBuffer, callsLength: number) {
        if (!TerrainRenderPass.DISABLE_INDIRECT_DRAWING_FOR_DEBUGGING) {
            let startIndex = buffer.byteLength - callsLength * 16;

            gpuDevice.queue.writeBuffer(this.indirectDrawBuffer, startIndex, buffer, 0, callsLength * 16);

            for (let i = 0; i < callsLength; i++) {
                renderPass.drawIndirect(this.indirectDrawBuffer, startIndex + i * 16);
            }
        } else {
            const drawCalls = new Uint32Array(buffer);

            for (let i = 0; i < drawCalls.length; i += 4) {
                const vertexCount = drawCalls[i + 0];
                const instanceCount = drawCalls[i + 1];
                const firstVertex = drawCalls[i + 2];
                const firstInstance = drawCalls[i + 3];

                if (vertexCount === 0 || instanceCount === 0) continue;

                renderPass.draw(vertexCount, instanceCount, firstVertex, firstInstance);
            }
        }
    }

    private static DISABLE_INDIRECT_DRAWING_FOR_DEBUGGING = true;
}