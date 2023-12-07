import { ChunkDataReferencer } from "./chunk-data-referencer.js"

export interface ChunkDataOptions {
    bits: null | {
        count: number,
        referencer: ChunkDataReferencer
    },
    map: null | {
        referencer: ChunkDataReferencer
    },
    buffers: null | {
        type: string,
        label: string,
        referencer: ChunkDataReferencer
    }[],
    fields: null | {
        type: string,
        index: number | string,
        label: string
    }[]
}