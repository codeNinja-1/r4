import { ChunkDataReferencer } from "../../../world/chunk-data/chunk-data-referencer.js";
import { ChunkData } from "../../../world/chunk-data/chunk-data.js";
import { BlockPosition } from "../../../world/prototype/block-position.js";
import { BlockModel } from "../model/static/block-model.js";
import { InstancedDataSegment } from "./instanced-data-segment.js";

export class InstancedData {
    protected segments: InstancedDataSegment[];

    constructor(protected chunkData: ChunkData) {
        this.update();
    }

    // Not very efficient right now
    update() {
        this.segments = [];

        let lastType: BlockModel | null = null;
        let lastSegment: InstancedDataSegment | null = null;

        for (let i = 0; i < ChunkDataReferencer.cells; i++) {
            const position = ChunkDataReferencer.position(i);

            const blockPrototype = this.chunkData.getBlock(position);
            const blockPosition = new BlockPosition(position, this.chunkData);
            const model = blockPrototype.getBlockModel(blockPosition);

            if (model != lastType) {
                lastSegment = new InstancedDataSegment(model, 0, i);

                this.segments.push(lastSegment);
                lastType = model;
            }

            const segment = lastSegment!;

            segment.setSize(segment.getSize() + 1);
        }
    }
}