import { Chunk } from "../chunk.js";
import { ChunkDataField } from "./chunk-data-field.js";
import { ChunkDataReferencer } from "./chunk-data-referencer.js";

export class ChunkData {
    referencer: ChunkDataReferencer;
    chunk: Chunk | null = null;
    fields: Map<string, ChunkDataField<any>>;

    constructor(referencer: ChunkDataReferencer, fields: Map<string, ChunkDataField<any>>) {
        this.referencer = referencer;
        this.fields = fields;

        for (const [ id, field ] of this.fields) {
            field.chunkData = this;
        }
    }

    field(id: string): ChunkDataField<any> {
        if (!this.fields.has(id)) {
            throw new Error(`Field id '${id}' is not allocated`);
        }

        return this.fields.get(id) as ChunkDataField<any>;
    }
}