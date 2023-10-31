import { ChunkDataReferencer } from "./chunk-data-referencer.js"

export interface ChunkDataOptions {
    bits: {
        count: number,
        referencer: ChunkDataReferencer
    },
    map: {
        referencer: ChunkDataReferencer
    },
    buffers: {
        type: string,
        label: string,
        referencer: ChunkDataReferencer
    }[],
    fields: {
        type: string,
        index: number | string,
        label: string
    }[]
}