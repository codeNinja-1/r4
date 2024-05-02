import { Orientation } from "../../../../../utils/rotation/orientation.js";
import { Vector2D } from "../../../../../utils/vector2d/vector2d.js";
import { ImmutableVector3D } from "../../../../../utils/vector3d/immutable-vector3d.js";
import { Vector3D } from "../../../../../utils/vector3d/vector3d.js";
import { Texture } from "../../../../utils/texture.js";
import { ModelComponent } from "../model-component.js";

export class PlaneModelComponent implements ModelComponent {
    private width: number;
    private height: number;
    private texture: Texture;

    constructor(texture: Texture, size: Vector2D) {
        this.width = size.x;
        this.height = size.y;
        this.texture = texture;
    }

    getVertexPositions(): Float32Array {
        return PlaneModelComponent.scaleGeometry(PlaneModelComponent.basePlaneGeometry, this.width, this.height);
    }

    getTextureMappings(): Float32Array {
        return PlaneModelComponent.scaleMapping(PlaneModelComponent.baseTextureMapping, this.width, this.height);
    }
    
    getTextureIds(): Uint32Array {
        const textureId = this.texture.getRegisteredId();

        return new Uint32Array([
            textureId,
            textureId
        ]);
    }


    private static scaleGeometry(geometry: Float32Array, width: number, height: number): Float32Array {
        const data = new Float32Array(geometry.length);

        for (let i = 0; i < data.length / 3; i++) {
            data[i * 3] = geometry[i * 3] * width;
            data[i * 3 + 1] = geometry[i * 3 + 1] * height;
            data[i * 3 + 2] = geometry[i * 3 + 2];
        }

        return data;
    }

    private static scaleMapping(mapping: Float32Array, width: number, height: number): Float32Array {
        const data = new Float32Array(mapping.length);

        for (let i = 0; i < data.length / 2; i++) {
            data[i * 2] = mapping[i * 2] * width;
            data[i * 2 + 1] = mapping[i * 2 + 1] * height;
        }

        return data;
    }

    private static basePlaneGeometry = new Float32Array([
        1, 1, 0,
        1, 0, 0,
        0, 0, 0,
        1, 1, 0,
        0, 0, 0,
        0, 1, 0
    ]);

    private static baseTextureMapping = new Float32Array([
        1, 1,
        1, 0,
        0, 0,
        1, 1,
        0, 0,
        0, 1
    ]);
}