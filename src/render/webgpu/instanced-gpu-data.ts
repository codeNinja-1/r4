import { ChunkInterface } from "../../world/chunk-interface.js";
import { InstanceReferencer } from "../common/instance-referencer.js";

export class InstanceGPUData {
    private length: number;
    private data: ArrayBuffer;
    private array: Uint8Array;

    constructor(private chunk: ChunkInterface.NonPlaceholder, private referencer: InstanceReferencer) {
        this.referencer = referencer;
        this.length = 0;
        this.data = new ArrayBuffer(referencer.getChunkSize() * referencer.getGPUDataSize());
        this.array = new Uint8Array(this.data);
    }

    updateInstance(index: number) {
        const address = this.referencer.getAddress(this.chunk, index);
        const dataSize = this.referencer.getGPUDataSize();
        const needed = this.referencer.needsInstance(this.chunk, index);

        if (!needed && address !== null) {
            const lastItem = this.length - 1;

            if (lastItem === index) {
                this.length--;
            } else {
                this.referencer.setAddress(this.chunk, index, null);
                this.referencer.setAddress(this.chunk, lastItem, address);

                this.array.set(
                    new Uint8Array(this.referencer.getGPUData(this.chunk, lastItem)),
                    address
                );
            }
        } else if (needed && address !== null) {
            this.array.set(
                new Uint8Array(this.referencer.getGPUData(this.chunk, index)),
                address
            );
        } else if (needed && address === null) {
            const newAddress = this.length * dataSize;

            this.referencer.setAddress(this.chunk, index, newAddress);

            this.array.set(
                new Uint8Array(this.referencer.getGPUData(this.chunk, index)),
                newAddress
            );

            this.length++;
        }
    }
}