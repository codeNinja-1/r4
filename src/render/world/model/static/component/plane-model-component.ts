import { Orientation } from "../../../../../utils/rotation/orientation.js";
import { Vector2D } from "../../../../../utils/vector2d/vector2d.js";
import { ImmutableVector3D } from "../../../../../utils/vector3d/immutable-vector3d.js";
import { Texture } from "../../../../utils/texture.js";
import { PositionedModelComponent } from "./positioned-model-component.js";

export class PlaneModelComponent extends PositionedModelComponent {
    private width: number;
    private height: number;
    private orientation: Orientation = Orientation.North;
    private texture: Texture;

    constructor(texture: Texture, size: Vector2D, orientation: Orientation) {
        super();
        
        this.width = size.x;
        this.height = size.y;
        this.texture = texture;
        this.orientation = orientation;
    }

    getVertexPositions(): Float32Array {
        return PlaneModelComponent.makePlaneVertices(this.orientation, this.width, this.height);
    }

    getTextureMappings(): Uint32Array {
        const data = new Uint32Array(PlaneModelComponent.baseTextureMapping.length);
        const width = this.texture.getTextureWidth();
        const height = this.texture.getTextureHeight();

        for (let i = 0; i < data.length / 2; i++) {
            data[i * 2] = PlaneModelComponent.baseTextureMapping[i * 2] * width;
            data[i * 2 + 1] = PlaneModelComponent.baseTextureMapping[i * 2 + 1] * height;
        }

        return data;
    }
    
    getTextureIds(): Uint32Array {
        const textureId = this.texture.getRegisteredId();

        return new Uint32Array([
            textureId,
            textureId
        ]);
    }

    private static makePlaneVertices(orientation: Orientation, width: number, height: number) {
        const vertices = PlaneModelComponent.baseGeometry.map(x => x);

        for (let i = 0; i < vertices.length / 3; i++) {
            const vector = new ImmutableVector3D(
                vertices[i * 3] * width,
                vertices[i * 3 + 1] * height,
                vertices[i * 3 + 2]
            );

            const matrix = Orientation.getMatrix(orientation);

            const result = matrix.multiply(vector);

            vertices[i * 3] = result.x;
            vertices[i * 3 + 1] = result.y;
            vertices[i * 3 + 2] = result.z;
        }

        return vertices;
    }

    private static baseTextureMapping = new Uint8Array([
        0, 0,
        1, 0,
        1, 1,
        1, 0,
        0, 1,
        0, 0
    ]);

    private static baseGeometry: Float32Array = PlaneModelComponent.getBaseGeometry();

    private static getBaseGeometry() {
        const data = new Float32Array(PlaneModelComponent.baseTextureMapping.length);

        for (let i = 0; i < PlaneModelComponent.baseTextureMapping.length / 2; i++) {
            data[i] = PlaneModelComponent.baseTextureMapping[i * 2] - 0.5;
            data[i + 1] = PlaneModelComponent.baseTextureMapping[i * 2 + 1] - 0.5;
        }

        return data;
    }
}