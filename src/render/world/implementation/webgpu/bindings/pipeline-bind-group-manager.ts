import { GraphicsDevice } from "../graphics-device.js";
import { BindGroupManager } from "./bind-group-manager.js";
import { BindGroup } from "./bind-group.js";

export class PipelineBindGroupManager {
    private parent: BindGroupManager;
    private usedGroups: Set<BindGroup> = new Set();

    constructor(parent: BindGroupManager) {
        this.parent = parent;
    }

    useBindGroup(bindGroup: BindGroup): void {
        this.parent.addBindGroup(bindGroup);
        this.usedGroups.add(bindGroup);
    }

    addBindGroupsToPipelineLayout(pipelineLayout: Partial<GPUPipelineLayoutDescriptor>) {
        const bindGroupLayouts: GPUBindGroupLayout[] = [];

        for (const bindGroup of this.usedGroups) {
            bindGroupLayouts.push(bindGroup.getBindGroupLayout());
        }

        pipelineLayout.bindGroupLayouts = bindGroupLayouts;
    }

    setBindGroupsOnRenderPassEncoder(encoder: GPURenderPassEncoder) {
        for (const bindGroup of this.usedGroups) {
            encoder.setBindGroup(bindGroup.getBindGroupIndex(), bindGroup.getBindGroup());
        }
    }
}