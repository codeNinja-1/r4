import { InstanceReferencer } from "../../render/model/instance-referencer.js";
import { Chunk } from "../chunk.js";
import { ChunkDataAllocator } from "../chunk-data/chunk-data-allocator.js";

export class ChunkInstanceReferencer implements InstanceReferencer<number> {
    static instanceAddressField = 'instance_address';
    instanceItemSize: number = 3;

    constructor(public chunk: Chunk) {
    }

    getChunkSize(): number {
        return this.chunk.world.referencer.cells;
    }

    getData(id: number): ArrayBuffer {
        if (!this.chunk.world) throw new Error("Rendered chunks should be in a world");

        const array = new Uint8Array(3);

        array[0] = this.chunk.world.referencer.x(id);
        array[1] = this.chunk.world.referencer.y(id);
        array[2] = this.chunk.world.referencer.z(id);

        return array.buffer;
    }

    getAddress(id: number): number {
        if (!this.chunk.world) throw new Error("Rendered chunks should be in a world");

        const field = this.chunk.field(ChunkInstanceReferencer.instanceAddressField);

        if (!field) {
            throw new Error("Instance address field not found.");
        }

        return field.get(
                this.chunk.world.referencer.x(id),
                this.chunk.world.referencer.y(id),
                this.chunk.world.referencer.z(id)
            );
    }

    setAddress(id: number, address: number): void {
        const field = this.chunk.field(ChunkInstanceReferencer.instanceAddressField);

        if (!field) {
            throw new Error("Instance address field not found.");
        }

        field.set(
            this.chunk.world.referencer.xOfIndex(id),
            this.chunk.world.referencer.yOfIndex(id),
            this.chunk.world.referencer.zOfIndex(id),
            address
        );
    }

    static allocate(allocator: ChunkDataAllocator) {
        return allocator.allocate('u16', ChunkInstanceReferencer.instanceAddressField);
    }
}