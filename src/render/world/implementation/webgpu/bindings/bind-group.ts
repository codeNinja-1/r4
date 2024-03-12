import { GraphicsDevice } from "../graphics-device.js";
import { BindGroupEntry } from "./bind-group-entry.js";

export class BindGroup {
    private entries: Set<BindGroupEntry> = new Set();
    private layout: GPUBindGroupLayout;
    private group: GPUBindGroup;

    constructor(private index: number) {
    }

    async setup(device: GraphicsDevice) {
        for (const entry of this.entries) {
            await entry.setup(device);
        }

        const layoutEntries: GPUBindGroupLayoutEntry[] = [];

        for (const entry of this.entries) {
            layoutEntries.push(entry.getLayoutEntry());
        }

        this.layout = device.getDevice().createBindGroupLayout({
            entries: layoutEntries
        });

        const bindGroupEntries: GPUBindGroupEntry[] = [];

        for (const entry of this.entries) {
            console.log(entry.getBindGroupEntry());
            bindGroupEntries.push(entry.getBindGroupEntry());
        }

        this.group = device.getDevice().createBindGroup({
            label: `Bind Group ${this.index}`,
            layout: this.layout,
            entries: bindGroupEntries
        });
    }

    addEntry(binding: number, entry: BindGroupEntry) {
        this.entries.add(entry);
        entry.setBinding(binding);
    }

    getBindGroupLayout(): GPUBindGroupLayout {
        return this.layout;
    }

    getBindGroupIndex(): number {
        return this.index;
    }

    getBindGroup(): GPUBindGroup {
        return this.group;
    }
}