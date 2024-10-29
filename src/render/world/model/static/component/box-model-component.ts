import { Vector3 } from "../../../../../utils/vector3d/vector3.js";
import { Texture } from "../../../../utils/texture.js";
import { ModelComponent } from "../model-component.js";

export class BoxModelComponent implements ModelComponent {
    constructor(private dimensions: Vector3, private textures: Texture[]) {
    }

    getVertexPositions(): Float32Array {
        const vertices = new Float32Array(BoxModelComponent.geometry.length);

        for (let i = 0; i < vertices.length / 3; i++) {
            const x = BoxModelComponent.geometry[i * 3];
            const y = BoxModelComponent.geometry[i * 3 + 1];
            const z = BoxModelComponent.geometry[i * 3 + 2];

            vertices[i * 3] = x * this.dimensions.x;
            vertices[i * 3 + 1] = y * this.dimensions.y;
            vertices[i * 3 + 2] = z * this.dimensions.z;
        }

        return vertices;
    }

    getTextureMappings(): Float32Array {
        const output = new Float32Array(12 * 6);

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                let texture = this.textures[i];
                let mappings = BoxModelComponent.textureMappings[i];

                if (!mappings || !texture) continue;

                output[i * 12 + j * 2] = mappings[j * 2] * texture.getTextureWidth();
                output[i * 12 + j * 2 + 1] = mappings[j * 2 + 1] * texture.getTextureHeight();
            }
        }

        return output;
    }

    getTextureIds(): Uint32Array {
        return new Uint32Array([
            this.textures[0].getRegisteredId(),
            this.textures[0].getRegisteredId(),
            this.textures[1].getRegisteredId(),
            this.textures[1].getRegisteredId(),
            this.textures[2].getRegisteredId(),
            this.textures[2].getRegisteredId(),
            this.textures[3].getRegisteredId(),
            this.textures[3].getRegisteredId(),
            this.textures[4].getRegisteredId(),
            this.textures[4].getRegisteredId(),
            this.textures[5].getRegisteredId(),
            this.textures[5].getRegisteredId()
        ]);
    }

    private static geometry = new Float32Array([
        // North face (-z)
        1, 1, 0,
        0, 1, 0,
        0, 0, 0,

        1, 1, 0,
        0, 0, 0,
        1, 0, 0,

        // South face (+z)
        0, 1, 1,
        1, 1, 1,
        1, 0, 1,

        0, 1, 1,
        1, 0, 1,
        0, 0, 1,

        // East face (+x)
        1, 1, 1,
        1, 1, 0,
        1, 0, 0,

        1, 1, 1,
        1, 0, 0,
        1, 0, 1,

        // West face (-x)
        0, 1, 0,
        0, 1, 1,
        0, 0, 1,

        0, 1, 0,
        0, 0, 1,
        0, 0, 0,

        // Up face (+y)
        0, 1, 1,
        0, 1, 0,
        1, 1, 0,

        1, 1, 1,
        0, 1, 1,
        1, 1, 0,

        // Down face (-y)
        1, 0, 1,
        1, 0, 0,
        0, 0, 0,

        0, 0, 1,
        1, 0, 1,
        0, 0, 0
    ]);

    private static textureNorth = new Float32Array([
        1, 0,
        0, 0,
        0, 1,

        1, 0,
        0, 1,
        1, 1
    ]);

    private static textureSouth = new Float32Array([
        0, 0,
        1, 0,
        1, 1,

        0, 0,
        1, 1,
        0, 1
    ]);

    private static textureEast = new Float32Array([
        1, 0,
        0, 0,
        0, 1,

        1, 0,
        0, 1,
        1, 1
    ]);

    private static textureWest = new Float32Array([
        0, 0,
        1, 0,
        1, 1,

        0, 0,
        1, 1,
        0, 1
    ]);

    private static textureTop = new Float32Array([
        1, 0,
        1, 1,
        0, 1,

        0, 0,
        1, 0,
        0, 1
    ]);

    private static textureBottom = new Float32Array([
        1, 1,
        1, 0,
        0, 0,

        0, 1,
        1, 1,
        0, 0
    ]);

    private static textureMappings = [ this.textureNorth, this.textureSouth, this.textureEast, this.textureWest, this.textureTop, this.textureBottom ];
}