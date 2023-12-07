import { InstanceReferencer } from "../../render/model/instance-referencer.js";
import { Chunk } from "../chunk.js";
import { ChunkDataAllocator } from "../chunk-data/chunk-data-allocator.js";
import { ChunkDataReferencer } from "../chunk-data/chunk-data-referencer.js";

export class ChunkInstanceReferencer implements InstanceReferencer<number> {
    static instanceAddressField = 'instance_address';
    instanceItemSize: number = 3;

    constructor(public chunk: Chunk) {
    }

    getData(id: number): ArrayBuffer {
        const buffer = new ArrayBuffer(3);
        const array = new Uint8Array(buffer);

        array[0] = this.chunk.world.referencer.xOfIndex(id);
        array[1] = this.chunk.world.referencer.yOfIndex(id);
        array[2] = this.chunk.world.referencer.zOfIndex(id);

        return buffer;
    }

    getAddress(id: number): number {
        const field = this.chunk.field(ChunkInstanceReferencer.instanceAddressField);

        if (!field) {
            throw new Error("Instance address field not found.");
        }

        return field.get(
                this.chunk.world.referencer.xOfIndex(id),
                this.chunk.world.referencer.yOfIndex(id),
                this.chunk.world.referencer.zOfIndex(id)
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