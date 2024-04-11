import { Texture } from "../../utils/texture.js";
import { StaticModel } from "../model/static/static-model.js";

export class AssembledMesh {
    constructor(
        private vertexPositions: Float32Array,
        private textureMappings: Float32Array,
        private texture: Texture,
        private indexes: Map<StaticModel, [ number, number ]>
    ) {
    }

    getVertexPositions(): Float32Array {
        return this.vertexPositions;
    }

    getTextureMappings(): Float32Array {
        return this.textureMappings;
    }

    getTexture(): Texture {
        return this.texture;
    }

    getModelStartIndex(model: StaticModel): number {
        if (!this.indexes.has(model)) throw new Error('Model not found in mesh assembler');

        return this.indexes.get(model)![0];
    }

    getModelEndIndex(model: StaticModel): number {
        if (!this.indexes.has(model)) throw new Error('Model not found in mesh assembler');

        return this.indexes.get(model)![1];
    }
}