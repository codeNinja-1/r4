import { Matrix4 } from "../../../../utils/matrix/matrix4.js";
import { ImmutableVector3D } from "../../../../utils/vector3d/immutable-vector3d.js";
import { Perspective } from "../../pespective/perspective.js";
import { Projector } from "../../pespective/projector.js";
import { Bindings } from "./bindings.js";
import { BindGroup } from "./bindings/bind-group.js";
import { BufferBindGroupEntry } from "./bindings/buffer-bind-group-entry.js";
import { GraphicsDevice } from "./graphics-device.js";

export class Camera {
    private bindGroup: BindGroup;
    private bindGroupEntry: BufferBindGroupEntry;
    private buffer: GPUBuffer;
    private perspective?: Perspective;
    private projector?: Projector;

    async setup(device: GraphicsDevice) {
        this.buffer = device.getDevice().createBuffer({
            size: 4 * 4 * 32 * 2,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        });

        this.bindGroup = new BindGroup(Bindings.CameraBindGroup);
        this.bindGroupEntry = new BufferBindGroupEntry(this.buffer, GPUShaderStage.VERTEX, "uniform");
        this.bindGroupEntry.setLabel("Camera");
        this.bindGroup.addEntry(Bindings.CameraDataBinding, this.bindGroupEntry);
    }

    setPerspective(perspective: Perspective) {
        this.perspective = perspective;
    }

    setProjector(projector: Projector) {
        this.projector = projector;
    }

    getCameraBindGroup(): BindGroup {
        return this.bindGroup;
    }

    update(device: GraphicsDevice) {
        if (!this.projector) throw new Error('Projector is not set before updating camera');

        const data = new Float32Array(4 * 4);
        
        const viewMatrix = Matrix4.inverse(this.perspective?.getTransformationMatrix() || Matrix4.identity());

        if (!viewMatrix) throw new Error('Translation matrix is not invertible');

        const cameraMatrix = Matrix4.multiply(
            this.projector.getProjectionMatrix(),
            viewMatrix
        );

        data.set(cameraMatrix.data, 0);

        if (Camera.TEST_PROJECTION) console.log(Matrix4.multiplyVector(cameraMatrix, new ImmutableVector3D(0, 0, 0)));
        if (Camera.TEST_VIEW) {
            console.log(
                Matrix4.multiplyVector(viewMatrix, new ImmutableVector3D(0, 0, 0)),
                Matrix4.multiplyVector(viewMatrix, new ImmutableVector3D(1, 0, 0)),
                Matrix4.multiplyVector(viewMatrix, new ImmutableVector3D(0, 0, 1))
            );
        }

        device.getDevice().queue.writeBuffer(this.buffer, 0, data);
    }

    getDataBuffer(): GPUBuffer {
        return this.buffer;
    }

    private static TEST_PROJECTION = false;
    private static TEST_VIEW = false;
}