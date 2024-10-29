import { GraphicsDevice } from "../graphics-device.js";
import { BindGroupEntry } from "./bind-group-entry.js";

export class BindGroup {
    private entries: Set<BindGroupEntry> = new Set();
    private layout: GPUBindGroupLayout;
    private group: GPUBindGroup;
    private creationStack?: string;

    constructor(private index: number) {
        this.creationStack = BindGroup.LOGGING ? new Error().stack : undefined;
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
            label: `Bind Group Layout ${this.index}`,
            entries: layoutEntries
        });

        const bindGroupEntries: GPUBindGroupEntry[] = [];

        for (const entry of this.entries) {
            bindGroupEntries.push(entry.getBindGroupEntry());
        }

        this.group = device.getDevice().createBindGroup({
            label: `Bind Group ${this.index}`,
            layout: this.layout,
            entries: bindGroupEntries
        });

        if (BindGroup.LOGGING) {
            console.groupCollapsed("GPU Bind Group #" + this.index);

            console.log(this.group);
            console.log(this.layout);

            console.groupCollapsed("Entries");

            for (const entry of this.entries) {
                console.groupCollapsed(entry.getLabel());
                console.log(entry.getBindGroupEntry());
                console.log(entry.getLayoutEntry());
                console.log(entry);

                console.groupEnd();
            }

            console.groupEnd();

            console.groupCollapsed("Stack traces");

            if (this.creationStack) {
                console.log("%cnew BindGroup()%c\n" + this.creationStack.split("\n").slice(1).join("\n"), "text-decoration: underline;", "");
            }

            const stack = new Error().stack;
            if (stack) console.log("%cbindGroup.setup()%c\n" + stack.split("\n").slice(1).join("\n"), "text-decoration: underline;", "");

            console.groupEnd();

            console.groupEnd();
        }
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

    private static LOGGING = false;
}