export namespace WebGPUUtils {
    export function createIndirectCallBuffer(device: GPUDevice, calls: ArrayBuffer) {
        const buffer = device.createBuffer({
            size: calls.byteLength,
            usage: GPUBufferUsage.INDIRECT | GPUBufferUsage.STORAGE
        });

        device.queue.writeBuffer(buffer, 0, calls);

        return buffer;
    }
}