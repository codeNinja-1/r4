import { ChunkLoadState } from "./chunk-load-state.js";

export interface UnloadedChunk {
    getState(): ChunkLoadState;
}