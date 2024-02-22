import { ChunkData } from "../../../../world/chunk-data/chunk-data.js";
import { InstancedData } from "../../instancing/instanced-data.js";
import { AssembledMesh } from "../../terrain/assembled-mesh.js";

export class WebGPUInstancedData extends InstancedData {
    protected indirectCalls: ArrayBuffer;
    
    constructor(protected assembledMesh: AssembledMesh, chunkData: ChunkData) {
        super(chunkData);
    }

    update() {
        super.update();

        this.indirectCalls = new ArrayBuffer(this.segments.length * 16);
        const indirectCalls = new Uint32Array(this.indirectCalls);

        for (let i = 0; i < this.segments.length; i++) {
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