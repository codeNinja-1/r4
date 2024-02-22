import { Texture } from "../../utils/texture.js";
import { StaticModel } from "../model/static/static-model.js";

export class AssembledMesh {
    constructor(
        private vertexPositions: Float32Array,
        private textureMappings: Uint32Array,
        private texture: Texture,
        private startIndex: Map<StaticModel, number>,
        private endIndex: Map<StaticModel, number>
    ) {
    }

    getVertexPositions(): Float32Array {
        return this.vertexPositions;
    }

    getTextureMappings(): Uint32Array {
        return this.textureMappings;
    }

    getTexture(): Texture {
        return this.texture;
    }

    getModelStartIndex(model: StaticModel): number {
        if (!this.startIndex.has(model)) throw new Error('Model not found in mesh assembler');

        return this.startIndex.get(model)!;
    }

    getModelEndIndex(model: StaticModel): number {
        if (!this.endIndex.has(model)) throw new Error('Model not found in mesh assembler');

        return this.endIndex.get(model)!;
    }
}