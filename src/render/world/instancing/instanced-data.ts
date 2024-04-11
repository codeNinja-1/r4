import { ImmutableVector2D } from "../../../utils/vector2d/immutable-vector2d.js";
import { ImmutableVector3D } from "../../../utils/vector3d/immutable-vector3d.js";
import { Vector3D } from "../../../utils/vector3d/vector3d.js";
import { ChunkDataReferencer } from "../../../world/chunk-data/chunk-data-referencer.js";
import { ChunkData } from "../../../world/chunk-data/chunk-data.js";
import { BlockPosition } from "../../../world/prototype/block-position.js";
import { BlockModel } from "../model/static/block-model.js";
import { InstancedDataSegment } from "./instanced-data-segment.js";

export abstract class InstancedData {
    protected segments: InstancedDataSegment[];
    private UPDATES: number = 0;

    constructor(protected chunkData: ChunkData) {
    }

    private static readonly cullDirections = [
        new ImmutableVector3D(-1, 0, 0),
        new ImmutableVector3D(1, 0, 0),
        new ImmutableVector3D(0, -1, 0),
        new ImmutableVector3D(0, 1, 0),
        new ImmutableVector3D(0, 0, -1),
        new ImmutableVector3D(0, 0, 1)
    ];

    private canCull(position: Vector3D): boolean {
        for (const direction of InstancedData.cullDirections) {
            const neighbor = position.clone().add(direction);

            if (ChunkDataReferencer.isOutOfBounds(neighbor)) {
                return false;
            }

            const block = this.chunkData.getBlock(new BlockPosition(neighbor, this.chunkData));
            const model = block.getBlockModel(new BlockPosition(neighbor, this.chunkData));

            if (model == null || model.isTransparent()) {
                return false;
            }
        }

        return true;
    }

    private initial() {
        this.segments = [];

        let lastType: BlockModel | null = null;
        let lastSegment: InstancedDataSegment | null = null;

        for (let i = 0; i < ChunkDataReferencer.cells; i++) {
            const position = ChunkDataReferencer.position(i);

            const blockPrototype = this.chunkData.getBlock(position);
            const blockPosition = new BlockPosition(position, this.chunkData);
            const model = blockPrototype.getBlockModel(blockPosition);

            if (model == null || this.canCull(position)) {
                lastSegment = null;
                lastType = null;

                continue;
            }

            if (model != lastType) {
                lastSegment = new InstancedDataSegment(model, 1, i);

                this.segments.push(lastSegment);
                lastType = model;
            } else if (lastSegment && model == lastType) {
                lastSegment.setSize(lastSegment.getSize() + 1);
            }
        }
    }

    // Not very efficient right now
    update() {
        if (!this.segments) this.initial();

        this.UPDATES++;
        if (this.UPDATES > 1) return;

        let culls = 0;
        let rendered = 0;
        let empty = 0;

        this.segments = [];

        let lastType: BlockModel | null = null;
        let lastSegment: InstancedDataSegment | null = null;

        for (let i = 0; i < ChunkDataReferencer.cells; i++) {
            const position = ChunkDataReferencer.position(i);

            const blockPrototype = this.chunkData.getBlock(position);
            const blockPosition = new BlockPosition(position, this.chunkData);
            const model = blockPrototype.getBlockModel(blockPosition);

            if (model == null || this.canCull(position)) {
                lastSegment = null;
                lastType = null;

                if (model) culls++;
                else empty++;

                continue;
            }

            if (model != lastType) {
                lastSegment = new InstancedDataSegment(model, 1, i);

                this.segments.push(lastSegment);
                lastType = model;
            } else if (lastSegment && model == lastType) {
                lastSegment.setSize(lastSegment.getSize() + 1);
            }

            rendered++;
        }

        if (InstancedData.VERIFY_CALLS) {
            this.verifyCalls();
        }

        if (InstancedData.LOG_CULLING) {
            console.log(`Culled ${culls} blocks\nRendered ${rendered} blocks\n${empty} blocks without models\nof ${culls + rendered + empty}/${ChunkDataReferencer.cells} total blocks`);
        }
    }

    verifyCalls() {
        for (let i = 0; i < this.segments.length; i++) {
            const segment = this.segments[i];

            if (segment.getModel() == null) {
                console.log(this.segments);
                throw new Error(`Segment ${i} has a null model`);
            }

            if (segment.getSize() == 0) {
                throw new Error(`Segment ${i} has a size of 0`);
            }

            if (segment.getStartIndex() + segment.getSize() > ChunkDataReferencer.cells) {
                console.group("Instanced data verification");
                console.error(`Segment ${i} goes out of bounds`);
                console.log(`Start index: ${segment.getStartIndex()}`);
                console.log(`Size: ${segment.getSize()}`);
                console.log(`End index: ${segment.getStartIndex() + segment.getSize()}`);
                console.log(`Chunk size: ${ChunkDataReferencer.cells}`);
                console.groupEnd();
            }

            let blockPosition = new BlockPosition(ChunkDataReferencer.position(segment.getStartIndex()), this.chunkData);
            let actualModel = this.chunkData.getBlock(blockPosition).getBlockModel(blockPosition);

            if (actualModel != segment.getModel()) {
                console.group("Instanced data verification");
                console.error(`Segment ${i} has a different model than the actual block`);
                console.groupEnd();

                continue;
            }

            for (let j = 1; j < segment.getSize(); j++) {
                blockPosition = new BlockPosition(ChunkDataReferencer.position(segment.getStartIndex() + j), this.chunkData);
                actualModel = this.chunkData.getBlock(blockPosition).getBlockModel(blockPosition);

                if (actualModel != segment.getModel()) {
                    console.group("Instanced data verification");
                    console.error(`Segment ${i} has a different model than the actual block`);
                    console.log(`Block at ${blockPosition.getLocalPosition()} has model ${actualModel?.getRegisteredName()}`);
                    console.log(`Segment model is ${segment.getModel()?.getRegisteredName()}`);
                    console.groupEnd();

                    break;
                }
            }
        }
    }

    private static VERIFY_CALLS = true;
    private static LOG_CULLING = true;
}