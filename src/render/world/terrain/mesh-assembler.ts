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
    private textureMappings: Float32Array;
    private texture: Texture;
    private modelIndexes: Map<StaticModel, [ number, number ]>;

    constructor(models: Iterable<StaticModel>) {
        this.models = Array.from(models);
    }

    private setupModelsAndIndexes() {
        if (MeshAssembler.PRINT_OUTPUT) {
            console.groupCollapsed("Models");
        }

        this.modelIndexes = new Map();

        const modelVertexPositions: Float32Array[] = [];
        const modelTextureMappings: Float32Array[] = [];
        const modelTextureIds: Uint32Array[] = [];

        let modelIndex = 0;
        let vertexIndex = 0;

        for (const model of this.models) {
            const vertexPositions = model.getVertexPositions();
            const textureMappings = model.getTextureMappings();
            const textureIds = model.getTextureIds();

            const startIndex = vertexIndex;

            modelVertexPositions.push(vertexPositions);
            modelTextureMappings.push(textureMappings);
            modelTextureIds.push(textureIds);

            if (MeshAssembler.PRINT_OUTPUT) {
                console.groupCollapsed(`Model ${modelIndex}: ${model.getRegisteredName()}`);

                console.groupCollapsed("Vertex positions");
                console.log(vertexPositions);
                console.groupEnd();

                console.groupCollapsed("Texture mappings");
                console.log(textureMappings);
                console.groupEnd();

                console.groupCollapsed("Texture ids");
                console.log(textureIds);
                console.groupEnd();

                console.groupEnd();
            }

            vertexIndex += vertexPositions.length / 3;

            const endIndex = vertexIndex;

            this.modelIndexes.set(model, [ startIndex, endIndex ]);

            modelIndex++;
        }

        if (MeshAssembler.PRINT_OUTPUT) {
            console.groupEnd();
        }

        return {
            modelGeometries: modelVertexPositions,
            modelTextureMappings: modelTextureMappings,
            modelTextureIds: modelTextureIds,
            totalVertexCount: vertexIndex
        }
    }

    assembleMeshes(): AssembledMesh {
        if (this.texture) {
            return this.createAssembledMesh();
        }

        if (MeshAssembler.PRINT_OUTPUT) {
            console.groupCollapsed("Assembled mesh");
        }

        const {
            modelGeometries,
            modelTextureMappings,
            modelTextureIds,
            totalVertexCount
        } = this.setupModelsAndIndexes();

        this.vertexPositions = new Float32Array(DataUtils.concat(modelGeometries));
        
        const textureArray = this.getTextureArrayFromModelTextureIds(modelTextureIds);
        const combinedSize = this.getCombinedTextureSize(textureArray);

        const { texturePositions, texture } = this.renderCombinedTextures(combinedSize, textureArray);
        this.texture = texture;

        this.textureMappings = new Float32Array(totalVertexCount * 2);

        for (let modelIndex = 0; modelIndex < modelTextureIds.length; modelIndex++) {
            const modelIndexes = this.modelIndexes.get(this.models[modelIndex]);

            if (!modelIndexes) throw new Error(`Geometry indexing error with model ${modelIndex}`);

            const textureIds = modelTextureIds[modelIndex];
            const textureMappings = modelTextureMappings[modelIndex];
            
            for (let triangleIndex = 0; triangleIndex < textureIds.length; triangleIndex++) {
                const textureId = textureIds[triangleIndex];
                const textureIndex = textureArray.indexOf(Registries.textures.get(textureId)!);
                const texturePosition = texturePositions[textureIndex];

                for (let vertexIndex = 0; vertexIndex < 3; vertexIndex++) {
                    const modelOffset = modelIndexes[0];
                    const offset = (triangleIndex * 3 + vertexIndex) * 2;

                    this.textureMappings[modelOffset * 2 + offset] = (textureMappings[offset] + texturePosition) / combinedSize.x;
                    this.textureMappings[modelOffset * 2 + offset + 1] = (textureMappings[offset + 1]) / combinedSize.y;
                }
            }
        }

        if (MeshAssembler.PRINT_OUTPUT) {
            console.groupCollapsed("Vertex positions");
            console.log(this.vertexPositions);
            console.groupEnd();
            console.groupCollapsed("Texture mappings")
            console.log(this.textureMappings);
            console.groupEnd();
            console.log("%cTexture has been added to the bottom of the document", "font-style: italic;");
            console.groupEnd();
        }

        return this.createAssembledMesh();
    }

    private createAssembledMesh(): AssembledMesh {
        return new AssembledMesh(this.vertexPositions, this.textureMappings, this.texture, this.modelIndexes);
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

        if (MeshAssembler.PRINT_OUTPUT) {
            canvas.convertToBlob().then(blob => {
                const url = URL.createObjectURL(blob);
    
                const img = new Image();
                img.onload = () => {
                    URL.revokeObjectURL(url);
                };
    
                img.src = url;
            });
        }

        const texture = Texture.fromImageData(context.getImageData(0, 0, size.x, size.y));

        return { texturePositions, texture };
    }

    private static PRINT_OUTPUT = true;
}