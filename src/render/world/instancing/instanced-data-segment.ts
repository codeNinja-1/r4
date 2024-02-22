import { BlockModel } from "../model/static/block-model.js";

export class InstancedDataSegment {
    constructor(
        private model: BlockModel | null,
        private size: number,
        private startIndex: number = 0
    ) {
    }

    getSize(): number {
        return this.size;
    }

    setSize(value: number): void {
        this.size = value;
    }

    getModel(): BlockModel | null {
        return this.model;
    }

    getStartIndex(): number {
        return this.startIndex;
    }

    setStartIndex(index: number) {
        this.startIndex = index;
    }
}