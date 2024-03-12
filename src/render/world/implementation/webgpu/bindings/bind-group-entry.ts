import { GraphicsDevice } from "../graphics-device.js";

export interface BindGroupEntry {
    getLayoutEntry(): GPUBindGroupLayoutEntry;
    getBindGroupEntry(): GPUBindGroupEntry;
    setBinding(index: number): void;
    setup(device: GraphicsDevice): Promise<void>;
}