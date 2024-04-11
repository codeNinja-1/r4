import { GraphicsDevice } from "../graphics-device.js";

export interface RenderPass {
    setup(device: GraphicsDevice): Promise<void>;
    render(): Promise<void>;
    setupBindings(device: GraphicsDevice): Promise<void>;
}