import { GraphicsDevice } from "../graphics-device.js";

export interface BindGroupEntry {
    getLayoutEntry(): GPUBindGroupLayoutEntry;
    getBindGroupEntry(): GPUBindGroupEntry;
    setBinding(index: number): void;
    setLabel(label: string): void;
    getLabel(): string;
    setup(device: GraphicsDevice): Promise<void>;
    getBinding(): number;
}