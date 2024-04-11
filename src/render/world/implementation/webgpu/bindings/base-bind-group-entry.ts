import { GraphicsDevice } from "../graphics-device.js";
import { BindGroupEntry } from "./bind-group-entry.js";

export abstract class BaseBindGroupEntry implements BindGroupEntry {
    protected binding: number;
    protected label: string = "";

    setLabel(label: string): void {
        this.label = label;
    }

    getLabel(defaultValue?: string): string {
        return this.label + (defaultValue ? " - " + defaultValue : "") + ` (Index ${this.binding})`;
    }

    getBinding(): number {
        return this.binding;
    }

    setBinding(index: number): void {
        this.binding = index;
    }

    abstract setup(device: GraphicsDevice): Promise<void>;
    abstract getLayoutEntry(): GPUBindGroupLayoutEntry;
    abstract getBindGroupEntry(): GPUBindGroupEntry;
}