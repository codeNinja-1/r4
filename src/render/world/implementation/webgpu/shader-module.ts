import { GraphicsDevice } from "./graphics-device.js";

export class ShaderModule {
    private shaderModule: GPUShaderModule;

    constructor(private label: string, private code: string) {
    }

    setup(graphicsDevice: GraphicsDevice): void {
        this.shaderModule = graphicsDevice.getDevice().createShaderModule({
            label: this.label,
            code: this.code
        });
    }

    getShaderModule(): GPUShaderModule {
        return this.shaderModule;
    }

    static async import(path: string, label: string = path): Promise<ShaderModule> {
        const response = await fetch(path);
        const code = await response.text();

        return new ShaderModule(label, code);
    }
}