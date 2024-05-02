import { NoiseFunction2D, NoiseFunction3D, createNoise3D } from "simplex-noise";
import { Registries } from "../game/registry/registries.js";
import { Vector2D } from "../utils/vector2d/vector2d.js";
import { ChunkDataField } from "../world/chunk-data/chunk-data-field.js";
import { ChunkDataNumberAllocation } from "../world/chunk-data/chunk-data-number-allocation.js";
import { ChunkDataReferencer } from "../world/chunk-data/chunk-data-referencer.js";
import { ChunkData } from "../world/chunk-data/chunk-data.js";
import { NoiseUtils } from "../world/world-generation/noise-utils.js";
import { WorldGenerator } from "../world/world-generation/world-generator.js";
import { MathUtils } from "../utils/math-utils.js";

export class SimpleWorldGenerator implements WorldGenerator {
    private surface2DNoise: NoiseFunction2D;
    private surface3DNoise: NoiseFunction3D;

    private caveNoises: NoiseFunction3D[];

    constructor() {
        this.surface2DNoise = NoiseUtils.scaledNoise2D(NoiseUtils.octavedNoise2D(4), 64);
        this.surface3DNoise = NoiseUtils.scaledNoise3D(createNoise3D(), 32);

        this.caveNoises = [ createNoise3D(), createNoise3D(), createNoise3D() ];
    }

    async createDensities(location: Vector2D, data: ChunkData) {
        for (let x = 0; x < ChunkDataReferencer.dimensions.x; x++) {
            for (let z = 0; z < ChunkDataReferencer.dimensions.z; z++) {
                // Direct sample (-1 to 1)
                let sample2d = this.surface2DNoise(x + location.x * ChunkDataReferencer.dimensions.x, z + location.y * ChunkDataReferencer.dimensions.z);
                // Surface height (1/4 to 3/4)
                let surface2d = MathUtils.map(sample2d, -1, 1, 0.25, 0.75);

                for (let y = 0; y < ChunkDataReferencer.dimensions.y; y++) {
                    // Fraction of the way through the chunk (0 to 1)
                    let yFraction = MathUtils.map(y, 0, ChunkDataReferencer.dimensions.y, 0, 1);

                    // Direct sample (-1 to 1)
                    let density3d = this.surface3DNoise(
                        x + location.x * ChunkDataReferencer.dimensions.x,
                        y,
                        z + location.y * ChunkDataReferencer.dimensions.z
                    );

                    // Mapped sample (-1/4 to 1/4)
                    let density3dScaled = density3d / 4;
                    // Surface offset (centered around 0)
                    let surfaceOffset = surface2d - yFraction;

                    let density = surfaceOffset + density3dScaled;

                    data.getField('density').set(x, y, z, density);

                    let cave = 0;

                    for (let noise of this.caveNoises) {
                        cave += Math.abs(noise(
                            (x + location.x * ChunkDataReferencer.dimensions.x) / 32,
                            y / 32,
                            (z + location.y * ChunkDataReferencer.dimensions.z) / 32
                        ));
                    }

                    // -1 to 1
                    cave /= this.caveNoises.length;
                    cave = cave ** 2 * Math.sign(cave);

                    data.getField('cave').set(x, y, z, cave);
                }
            }
        }
    }

    async calculateDepth(data: ChunkData) {
        for (let x = 0; x < ChunkDataReferencer.dimensions.x; x++) {
            for (let z = 0; z < ChunkDataReferencer.dimensions.z; z++) {
                let depth = 0;

                for (let y = ChunkDataReferencer.dimensions.y - 1; y >= 0; y--) {
                    let density = data.getField('density').get(x, y, z);

                    depth++;

                    if (density < 0) {
                        depth = 0;
                    }

                    data.getField('depth').set(x, y, z, depth);
                }
            }
        }
    }

    async generateChunk(location: Vector2D): Promise<ChunkData> {
        const data = new ChunkData();

        const fields = new ChunkData(new Map<string, ChunkDataField<any>>([
            [ 'density', new ChunkDataNumberAllocation('f32').instantiate() ],
            [ 'cave', new ChunkDataNumberAllocation('f32').instantiate() ],
            [ 'depth', new ChunkDataNumberAllocation('u8').instantiate() ]
        ]));

        const caveDensity = fields.getField('cave');
        const depthField = fields.getField('depth');

        await this.createDensities(location, fields);
        await this.calculateDepth(fields);

        const stone = Registries.blocks.get('stone');
        const air = Registries.blocks.get('air');
        const dirt = Registries.blocks.get('dirt');
        const grass = Registries.blocks.get('grass');

        if (!(stone && air && dirt && grass)) {
            throw new Error("Failed to blocks for simple world generator");
        }

        for (let x = 0; x < ChunkDataReferencer.dimensions.x; x++) {
            for (let z = 0; z < ChunkDataReferencer.dimensions.z; z++) {
                for (let y = 0; y < ChunkDataReferencer.dimensions.y; y++) {
                    const depth = depthField.get(x, y, z);
                    
                    if (depth == 0) {
                        data.setBlock(x, y, z, air);
                    } else if (depth == 1) {
                        data.setBlock(x, y, z, grass);
                    } else if (depth < 5) {
                        data.setBlock(x, y, z, dirt);
                    } else {
                        data.setBlock(x, y, z, stone);
                    }
                }
            }
        }

        return data;
    }
}