import { Registries } from "../../game/registries.js";
import { InstanceReferencer } from "../../render/common/instance-referencer.js";
import { ChunkDataBitAllocation } from "../chunk-data/chunk-data-bit-allocation.js";
import { ChunkDataNumberAllocation } from "../chunk-data/chunk-data-number-allocation.js";
import { ChunkDataReferencer } from "../chunk-data/chunk-data-referencer.js";
import { ChunkInterface } from "../chunk-interface.js";
import { BlockPosition } from "../prototype/block-position.js";

/**
 * A `ChunkInstanceReferencer` stores the address in GPU memory of each represented block in a chunk.
 * It also specifies the GPU data that should be sent to the GPU for each block (for now, just the position).
 */
export class ChunkInstanceReferencer implements InstanceReferencer {
    getChunkSize(): number {
        return ChunkDataReferencer.cells;
    }

    getGPUDataSize(): number {
        return 4;
    }

    *getUpdates(chunk: ChunkInterface.NonPlaceholder): Iterable<number> {
        yield* chunk.getChunkData().getBlockUpdates();
    }

    getGPUData(chunk: ChunkInterface.NonPlaceholder, index: number): ArrayBuffer {
        if (!chunk.getWorld()) throw new Error("Rendered chunks should be in a world");

        const chunkData = chunk.getChunkData();
        const field = chunkData.getField("blockId");
        const array = new Uint16Array([ index, field.get(index) ]);

        return array.buffer;
    }

    getAddress(chunk: ChunkInterface.NonPlaceholder, index: number): number | null {
        const hasField = chunk.getChunkData().getField('hasInstance');
        const addressField = chunk.getChunkData().getField('instanceAddress');

        if (!addressField || !hasField) {
            throw new Error("Instance field not found.");
        }

        const x = ChunkDataReferencer.x(index);
        const y = ChunkDataReferencer.y(index);
        const z = ChunkDataReferencer.z(index);

        if (!hasField.get(x, y, z)) return null;

        return addressField.get(x, y, z);
    }

    setAddress(chunk: ChunkInterface.NonPlaceholder, index: number, address: number | null): void {
        const hasField = chunk.getChunkData().getField('hasInstance');
        const addressField = chunk.getChunkData().getField('instanceAddress');

        if (!addressField || !hasField) {
            throw new Error("Instance field not found.");
        }

        const x = ChunkDataReferencer.x(index);
        const y = ChunkDataReferencer.y(index);
        const z = ChunkDataReferencer.z(index);

        hasField.set(x, y, z, address !== null);
        if (address !== null) addressField.set(x, y, z, address);
    }

    needsInstance(chunk: ChunkInterface.NonPlaceholder, index: number): boolean {
        const blockPrototype = chunk.getChunkData().getBlock(index);
        const blockPosition = new BlockPosition(
            ChunkDataReferencer.x(index),
            ChunkDataReferencer.y(index),
            ChunkDataReferencer.z(index),
            chunk.getChunkData()
        );

        return blockPrototype.isRendered(blockPosition);
    }

    static async setup() {
        Registries.fields.register('instanceAddress', new ChunkDataNumberAllocation('i16'));
        Registries.fields.register('hasInstance', new ChunkDataBitAllocation());
    }
}