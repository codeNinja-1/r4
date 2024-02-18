import { ChunkInterface } from "../../world/chunk-interface.js";

export interface InstanceReferencer {
    getChunkSize(): number;

    getGPUDataSize(): number;
    getGPUData(chunk: ChunkInterface.NonPlaceholder, index: number): ArrayBuffer;

    getAddress(chunk: ChunkInterface.NonPlaceholder, index: number): number | null;
    setAddress(chunk: ChunkInterface.NonPlaceholder, index: number, address: number | null): void;

    needsInstance(chunk: ChunkInterface.NonPlaceholder, index: number): boolean;
}