import { GraphicsDevice } from "../graphics-device.js";
import { BindGroup } from "./bind-group.js";

export class BindGroupManager {
    private bindGroups: Set<BindGroup> = new Set();

    async setup(device: GraphicsDevice) {
        for (const bindGroup of this.bindGroups) {
            await bindGroup.setup(device);
        }

        console.log("BindGroupManager setup");
        console.log(this.bindGroups);
    }

    addBindGroup(bindGroup: BindGroup) {
        this.bindGroups.add(bindGroup);
    }
}