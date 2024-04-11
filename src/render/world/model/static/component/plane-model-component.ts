import { Orientation } from "../../../../../utils/rotation/orientation.js";
import { ImmutableVector2D } from "../../../../../utils/vector2d/immutable-vector2d.js";
import { Vector2D } from "../../../../../utils/vector2d/vector2d.js";
import { ImmutableVector3D } from "../../../../../utils/vector3d/immutable-vector3d.js";
import { Vector3D } from "../../../../../utils/vector3d/vector3d.js";
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
        return PlaneModelComponent.makePlaneVertices(this.orientation, this.width, this.height, this.getPosition());
    }

    getTextureMappings(): Float32Array {
        const data = new Float32Array(PlaneModelComponent.baseTextureMapping.length);
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

    private static orientPlaneVertex(orientation: Orientation, x: number, y: number): Vector3D {
        if (orientation == Orientation.Up || orientation == Orientation.Down) {
            return new ImmutableVector3D(x, 0, y);
        } else if (orientation == Orientation.North || orientation == Orientation.South) {
            return new ImmutableVector3D(x, y, 0);
        } else if (orientation == Orientation.East || orientation == Orientation.West) {
            return new ImmutableVector3D(0, x, y);
        } else {
            throw new Error("Invalid orientation");
        }
    }

    private static makePlaneVertices(orientation: Orientation, width: number, height: number, position: Vector3D) {
        const source = PlaneModelComponent.baseGeometry.map(x => x);
        const vertices = new Float32Array(source.length / 2 * 3);

        for (let i = 0; i < source.length / 2; i++) {
            const vertex = PlaneModelComponent.orientPlaneVertex(
                orientation,
                source[i * 2] * width,
                source[i * 2 + 1] * height
            );

            vertices[i * 3] = vertex.x + position.x;
            vertices[i * 3 + 1] = vertex.y + position.y;
            vertices[i * 3 + 2] = vertex.z + position.z;
        }

        return vertices;
    }

    private static baseTextureMapping = new Uint8Array([
        1, 1,
        1, 0,
        0, 0,
        1, 1,
        0, 0,
        0, 1
    ]);

    private static baseGeometry: Float32Array = PlaneModelComponent.getBasePlaneGeometry();

    private static getBasePlaneGeometry() {
        const data = new Float32Array(PlaneModelComponent.baseTextureMapping.length);

        for (let i = 0; i < PlaneModelComponent.baseTextureMapping.length / 2; i++) {
            data[i * 2] = PlaneModelComponent.baseTextureMapping[i * 2] - 0.5;
            data[i * 2 + 1] = PlaneModelComponent.baseTextureMapping[i * 2 + 1] - 0.5;
        }

        return data;
    }
}