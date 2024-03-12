import { Perspective } from "../../pespective/perspective.js";
import { Bindings } from "./bindings.js";
import { BindGroup } from "./bindings/bind-group.js";
import { BufferBindGroupEntry } from "./bindings/buffer-bind-group-entry.js";
import { GraphicsDevice } from "./graphics-device.js";

export class Camera {
    private bindGroup: BindGroup;
    private bindGroupEntry: BufferBindGroupEntry;
    private buffer: GPUBuffer;
    private perspective: Perspective;

    async setup(device: GraphicsDevice) {
        this.buffer = device.getDevice().createBuffer({
            size: 4 * 4 * 32 * 2,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        });

        this.bindGroup = new BindGroup(Bindings.CameraBindGroup);
        this.bindGroupEntry = new BufferBindGroupEntry(this.buffer, GPUShaderStage.VERTEX, "uniform");
        this.bindGroup.addEntry(Bindings.CameraDataBinding, this.bindGroupEntry);

        await this.bindGroup.setup(device);
    }

    setPerspective(perspective: Perspective) {
        this.perspective = perspective;
    }

    getCameraBindGroup(): BindGroup {
        return this.bindGroup;
    }
}