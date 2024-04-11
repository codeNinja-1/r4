import { NoiseFunction2D, NoiseFunction3D, createNoise3D } from "simplex-noise";
import { Registries } from "../game/registry/registries.js";
import { Vector2D } from "../utils/vector2d/vector2d.js";
import { ChunkDataField } from "../world/chunk-data/chunk-data-field.js";
import { ChunkDataNumberAllocation } from "../world/chunk-data/chunk-data-number-allocation.js";
import { ChunkDataReferencer } from "../world/chunk-data/chunk-data-referencer.js";
import { ChunkData } from "../world/chunk-data/chunk-data.js";
import { NoiseUtils } from "../world/world-generation/noise-utils.js";
import { WorldGenerator } from "../world/world-generation/world-generator.js";

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
                let surface2d = (this.surface2DNoise(x + location.x * ChunkDataReferencer.dimensions.x, z + location.y * ChunkDataReferencer.dimensions.z) / 2 + 0.5) / 2 + 0.5;

                for (let y = 0; y < ChunkDataReferencer.dimensions.y; y++) {
                    let yFraction = y / ChunkDataReferencer.dimensions.y;
                    let surface3d = this.surface3DNoise(
                        x + location.x * ChunkDataReferencer.dimensions.x,
                        y,
                        z + location.y * ChunkDataReferencer.dimensions.z
                    );
                    let surface = (surface2d - yFraction) + surface3d / 2;

                    data.getField('surface').set(x, y, z, surface);

                    let cave = 0;

                    for (let noise of this.caveNoises) {
                        cave += Math.abs(noise(
                            (x + location.x * ChunkDataReferencer.dimensions.x) / 32,
                            y / 32,
                            (z + location.y * ChunkDataReferencer.dimensions.z) / 32
                        ));
                    }

                    cave /= this.caveNoises.length;
                    cave = 2 * Math.pow((cave + 1) / 2, 2) - 1;

                    data.getField('cave').set(x, y, z, cave);
                }
            }
        }
    }

    async generateChunk(location: Vector2D): Promise<ChunkData> {
        const data = new ChunkData();

        const densities = new ChunkData(new Map<string, ChunkDataField<any>>([
            [ 'surface', new ChunkDataNumberAllocation('f32').instantiate() ],
            [ 'cave', new ChunkDataNumberAllocation('f32').instantiate() ]
        ]));

        const surfaceDensity = densities.getField('surface');
        const caveDensity = densities.getField('cave');

        await this.createDensities(location, densities);

        const stone = Registries.blocks.get('stone');
        const air = Registries.blocks.get('air');
        const dirt = Registries.blocks.get('dirt');

        if (!(stone && air && dirt)) {
            throw new Error("Failed to blocks for simple world generator");
        }

        for (let x = 0; x < ChunkDataReferencer.dimensions.x; x++) {
            for (let z = 0; z < ChunkDataReferencer.dimensions.z; z++) {
                for (let y = 0; y < ChunkDataReferencer.dimensions.y; y++) {
                    if (surfaceDensity.get(x, y, z) > 0) {
                        data.setBlock(x, y, z, stone);
                    } else {
                        data.setBlock(x, y, z, air);
                    }
                }
            }
        }

        return data;
    }
}