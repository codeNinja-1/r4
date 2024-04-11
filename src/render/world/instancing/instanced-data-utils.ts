import { BlockModel } from "../model/static/block-model.js";
import { InstancedDataSegment } from "./instanced-data-segment.js";

export namespace InstancedDataUtils {
    /**
     * This method takes in a list of segments, which each have a start index and size, and a block model.
     * It also takes in the block index and segment index of the segment containing the block index. It makes
     * the segment containing the block index have the given block model without changing the models of other
     * blocks.
     * @param segments The segments list
     * @param segmentIndex The segment index containing the block index (for efficiency)
     * @param blockIndex The block index
     * @param blockModel The block model to set to
     * @returns void
     */
    export function setModel(segments: InstancedDataSegment[], segmentIndex: number, blockIndex: number, blockModel: BlockModel | null): void {
        const thisSegment = segments[segmentIndex];

        if (thisSegment.getModel() === blockModel) return;

        if (thisSegment.getSize() === 1) {
            const previousSegment = segments[segmentIndex - 1];
            const nextSegment = segments[segmentIndex + 1];

            const isNextToPreviousSegment = previousSegment && previousSegment.getModel() === blockModel && previousSegment.getStartIndex() + previousSegment.getSize() === blockIndex;
            const isNextToNextSegment = nextSegment && nextSegment.getModel() === blockModel && nextSegment.getStartIndex() === blockIndex + 1;

            if (isNextToPreviousSegment && isNextToNextSegment) {
                previousSegment.setSize(previousSegment.getSize() + 1 + nextSegment.getSize());
                segments.splice(segmentIndex, 2);

                return;
            } else if (isNextToPreviousSegment) {
                previousSegment.setSize(previousSegment.getSize() + 1);
                segments.splice(segmentIndex, 1);

                return;
            } else if (isNextToNextSegment) {
                nextSegment.setStartIndex(nextSegment.getStartIndex() - 1);
                nextSegment.setSize(nextSegment.getSize() + 1);
                segments.splice(segmentIndex, 1);

                return;
            } else {
                thisSegment.setModel(blockModel);

                return;
            }
        } else {
            if (thisSegment.getStartIndex() == blockIndex) {
                thisSegment.setStartIndex(thisSegment.getStartIndex() + 1);
                thisSegment.setSize(thisSegment.getSize() - 1);
                segments.splice(segmentIndex, 0, new InstancedDataSegment(blockModel, 1, blockIndex));

                return;
            } else if (thisSegment.getStartIndex() + thisSegment.getSize() == blockIndex) {
                thisSegment.setSize(thisSegment.getSize() - 1);
                segments.splice(segmentIndex + 1, 0, new InstancedDataSegment(blockModel, 1, blockIndex));

                return;
            } else {
                thisSegment.setSize(blockIndex - thisSegment.getStartIndex());
                segments.splice(
                    segmentIndex + 1, 0,
                    new InstancedDataSegment(blockModel, 1, blockIndex),
                    new InstancedDataSegment(thisSegment.getModel(), thisSegment.getSize() - thisSegment.getStartIndex() - blockIndex, blockIndex + 1)
                );

                return;
            }
        }
    }
}