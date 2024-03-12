import { Registries } from "../../../game/registry/registries.js";
import { DataUtils } from "../../../utils/data-utils.js";
import { ImmutableVector2D } from "../../../utils/vector2d/immutable-vector2d.js";
import { Vector2D } from "../../../utils/vector2d/vector2d.js";
import { Texture } from "../../utils/texture.js";
import { AssembledMesh } from "./assembled-mesh.js";
import { StaticModel } from "../model/static/static-model.js";

export class MeshAssembler {
    private models: StaticModel[];
    private vertexPositions: Float32Array;
    private textureMappings: Uint32Array;
    private texture: Texture;
    private startIndex: Map<StaticModel, number>;
    private endIndex: Map<StaticModel, number>;

    constructor(models: Iterable<StaticModel>) {
        this.models = Array.from(models);
    }

    assembleMeshes(): AssembledMesh {
        if (this.texture) {
            return this.createAssembledMesh();
        }

        this.startIndex = new Map();
        this.endIndex = new Map();

        const modelVertexPositions: Float32Array[] = [];
        const modelTextureMappings: Uint32Array[] = [];
        const modelTextureIds: Uint32Array[] = [];

        let modelIndex = 0;
        let vertexIndex = 0;

        for (const model of this.models) {
            const vertexPositions = model.getVertexPositions();
            const textureMappings = model.getTextureMappings();
            const textureIds = model.getTextureIds();

            this.startIndex.set(model, vertexIndex);

            modelVertexPositions.push(vertexPositions);
            modelTextureMappings.push(textureMappings);
            modelTextureIds.push(textureIds);

            vertexIndex += vertexPositions.length / 3;

            this.endIndex.set(model, vertexIndex);

            modelIndex++;
        }

        this.vertexPositions = new Float32Array(DataUtils.concat(modelVertexPositions));
        
        const textureArray = this.getTextureArrayFromModelTextureIds(modelTextureIds);
        const combinedSize = this.getCombinedTextureSize(textureArray);

        const { texturePositions, texture } = this.renderCombinedTextures(combinedSize, textureArray);
        this.texture = texture;

        this.textureMappings = new Uint32Array(vertexIndex * 2);

        for (let modelIndex = 0; modelIndex < modelTextureIds.length; modelIndex++) {
            const textureIds = modelTextureIds[modelIndex];
            const textureMappings = modelTextureMappings[modelIndex];
            const vertexStart = this.startIndex[modelIndex];
            
            for (let triangleIndex = 0; triangleIndex < textureIds.length; triangleIndex++) {
                const textureId = textureIds[triangleIndex];
                const textureIndex = textureArray.indexOf(Registries.textures.get(textureId)!);
                const texturePosition = texturePositions[textureIndex];

                for (let vertexIndex = 0; vertexIndex < 3; vertexIndex++) {
                    const vertexPosition = vertexStart + triangleIndex * 3 + vertexIndex;

                    this.textureMappings[vertexPosition * 2] = textureMappings[triangleIndex * 2] + texturePosition;
                    this.textureMappings[vertexPosition * 2 + 1] = textureMappings[triangleIndex * 2 + 1];
                }
            }
        }

        return this.createAssembledMesh();
    }

    private createAssembledMesh(): AssembledMesh {
        return new AssembledMesh(this.vertexPositions, this.textureMappings, this.texture, this.startIndex, this.endIndex);
    }

    private getTextureArrayFromModelTextureIds(modelTextureIds: Uint32Array[]): Texture[] {
        let textures: Set<Texture> = new Set();

        for (const ids of modelTextureIds) {
            for (const id of ids) {
                const texture = Registries.textures.get(id);

                if (!texture) throw new Error(`Texture with id ${id} not found in registry`);

                textures.add(texture);
            }
        }

        return Array.from(textures);
    }

    private getCombinedTextureSize(textures: Iterable<Texture>): Vector2D {
        let combinedWidth = 0;
        let combinedHeight = 0;

        for (const texture of textures) {
            combinedWidth += texture.getTextureWidth();
            combinedHeight = Math.max(combinedHeight, texture.getTextureHeight());
        }

        return new ImmutableVector2D(combinedWidth, combinedHeight);
    }

    private renderCombinedTextures(size: Vector2D, textures: Texture[]): { texturePositions: Uint32Array, texture: Texture } {
        if (textures.length == 0) {
            return {
                texturePositions: new Uint32Array(0),
                texture: Texture.fromDataArray(new Uint8ClampedArray(0), 0, 0)
            };
        }

        const canvas = new OffscreenCanvas(size.x, size.y);
        const context = canvas.getContext('2d')!;

        const texturePositions = new Uint32Array(textures.length);
        let xOffset = 0;

        let textureIndex = 0;

        for (const texture of textures) {
            context.putImageData(texture.toImageData(), xOffset, 0);

            texturePositions[textureIndex] = xOffset;

            xOffset += texture.getTextureWidth();
            textureIndex++;
        }

        canvas.convertToBlob().then(blob => {
            const url = URL.createObjectURL(blob);

            const img = new Image();
            img.onload = () => {
                URL.revokeObjectURL(url);
            };

            img.src = url;
            document.body.appendChild(img);
        });

        const texture = Texture.fromImageData(context.getImageData(0, 0, size.x, size.y));

        return { texturePositions, texture };
    }
}