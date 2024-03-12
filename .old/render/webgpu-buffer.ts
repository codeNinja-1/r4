export class WebGPUBuffer {
    constructor(private label: string, private usage: number, private size: number) {
    }

    setup(gpuDevice: GPUDevice) {
        return gpuDevice.createBuffer({
            label: this.label,
            usage: this.usage,
            size: this.size
        });
    }
}