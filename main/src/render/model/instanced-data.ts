import { InstanceReferencer } from "./instance-referencer.js";

export class InstanceData<I> {
    referencer: InstanceReferencer<I>;
    chunks: ArrayBuffer[];
    length: number;

    constructor() {
        this.chunks = [];
        this.length = 0;
    }

    private updateLength() {

    }

    add(id: I) {
        const address = this.length++;

        this.updateLength();

        this.referencer.setAddress(id, address);

        const data = this.referencer.getData(id);

        const chunkLocation = Math.floor(address / this.referencer.instanceChunkSize);
        const chunkOffset = address % this.referencer.instanceChunkSize;

        this.referencer.getData(id)
    }
}