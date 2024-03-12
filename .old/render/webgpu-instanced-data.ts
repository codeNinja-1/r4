import { ChunkDataReferencer } from "../../src/world/chunk-data/chunk-data-referencer.js";
import { ChunkData } from "../../src/world/chunk-data/chunk-data.js";
import { InstancedData } from "../../src/render/world/instancing/instanced-data.js";
import { AssembledMesh } from "../../src/render/world/terrain/assembled-mesh.js";

export class WebGPUInstancedData extends InstancedData {
    private indirectCalls: ArrayBuffer;
    
    constructor(private assembledMesh: AssembledMesh, chunkData: ChunkData) {
        super(chunkData);

        this.indirectCalls = new ArrayBuffer(ChunkDataReferencer.cells * 16);
    }

    update() {
        super.update();

        const indirectCalls = new Uint32Array(this.indirectCalls);

        for (let i = 0; i < this.indirectCalls.byteLength / 16; i++) {
            if (i >= this.segments.length) {
                indirectCalls[i * 4] = 0;
                indirectCalls[i * 4 + 1] = 0;
                indirectCalls[i * 4 + 2] = 0;
                indirectCalls[i * 4 + 3] = 0;

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

            indirectCalls[i * 4] = vertexCount;
            indirectCalls[i * 4 + 1] = instanceCount;
            indirectCalls[i * 4 + 2] = vertexStartIndex;
            indirectCalls[i * 4 + 3] = instanceStartIndex;
        }
    }

    getIndirectCalls(): ArrayBuffer {
        return this.indirectCalls;
    }
}