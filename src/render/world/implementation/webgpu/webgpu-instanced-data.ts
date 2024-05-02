import { ChunkDataReferencer } from "../../../../world/chunk-data/chunk-data-referencer.js";
import { ChunkData } from "../../../../world/chunk-data/chunk-data.js";
import { InstancedData } from "../../instancing/instanced-data.js";
import { AssembledMesh } from "../../terrain/assembled-mesh.js";

export class WebGPUInstancedData extends InstancedData {
    private indirectCalls: Uint32Array;
    private callCount: number;
    
    constructor(private assembledMesh: AssembledMesh, chunkData: ChunkData) {
        super(chunkData);

        this.indirectCalls = new Uint32Array(ChunkDataReferencer.cells * 4);
    }

    update() {
        super.update();

        this.callCount = this.segments.length;

        for (let i = 0; i < this.indirectCalls.length / 4; i++) {
            let startIndex = i * 4;

            if (i >= this.segments.length) {
                this.indirectCalls[startIndex + 0] = 0;
                this.indirectCalls[i * 4 + 1] = 0;
                this.indirectCalls[i * 4 + 2] = 0;
                this.indirectCalls[i * 4 + 3] = 0;

                continue;
            }

            const segment = this.segments[i];
            const model = segment.getModel();

            if (!model) continue;
            
            const vertexStartIndex = this.assembledMesh.getModelStartIndex(model);
            const vertexEndIndex = this.assembledMesh.getModelEndIndex(model);
            const vertexCount = vertexEndIndex - vertexStartIndex;
            const instanceStartIndex = segment.getStartIndex();
            const instanceCount = segment.getSize();

            this.indirectCalls[startIndex] = vertexCount;
            this.indirectCalls[startIndex + 1] = instanceCount;
            this.indirectCalls[startIndex + 2] = vertexStartIndex;
            this.indirectCalls[startIndex + 3] = instanceStartIndex;
        }
    }

    getIndirectCalls(): Uint32Array {
        return this.indirectCalls;
    }

    getCallCount(): number {
        return this.callCount;
    }
}