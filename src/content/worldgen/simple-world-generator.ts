import * as murmur from "murmurhash-js";
import { NoiseFunction2D, NoiseFunction3D, createNoise3D } from "simplex-noise";
import { Registries } from "../../game/registry/registries.js";
import { MathUtils } from "../../utils/math-utils.js";
import { ImmutableVector2D } from "../../utils/vector2d/immutable-vector2d.js";
import { Vector2D } from "../../utils/vector2d/vector2d.js";
import { Vector3 } from "../../utils/vector3d/vector3.js";
import { ChunkDataField } from "../../world/chunk-data/chunk-data-field.js";
import { ChunkDataNumberAllocation } from "../../world/chunk-data/chunk-data-number-allocation.js";
import { ChunkDataReferencer } from "../../world/chunk-data/chunk-data-referencer.js";
import { ChunkData } from "../../world/chunk-data/chunk-data.js";
import { ChunkInterface } from "../../world/chunk-interface.js";
import { ChunkLoadQueue } from "../../world/world-generation/chunk-load-queue.js";
import { NoiseUtils } from "../../world/world-generation/noise-utils.js";
import { WorldGenerator } from "../../world/world-generation/world-generator.js";
import { World } from "../../world/world.js";
import { Feature } from "./feature.js";
import { SemiloadedChunk } from "./semiloaded-chunk.js";
import { TreeFeature } from "./tree-feature.js";
import { LoadedChunk } from "./loaded-chunk.js";
import { RockFeature } from "./rock-feature.js";

export class SimpleWorldGenerator implements WorldGenerator {
    private surface2DNoise: NoiseFunction2D;
    private surface3DNoise: NoiseFunction3D;
    private world: World;

    private caveNoises: NoiseFunction3D[];

    bindWorld(world: World): void {
        this.world = world;

        this.surface2DNoise = NoiseUtils.scaledNoise2D(NoiseUtils.octavedNoise2D(4), 64);
        this.surface3DNoise = NoiseUtils.scaledNoise3D(createNoise3D(), 32);

        this.caveNoises = [ createNoise3D(), createNoise3D(), createNoise3D() ];
    }

    private phase: number = 0;
    private phases: number = 2;

    async generateChunks(maxSteps: number = 1): Promise<void> {
        if (maxSteps == 0) return;

        const loadQueue = this.world.getChunkLoadQueue();

        let chunks = [ ...loadQueue.entries() ];

        let steps = 0;
        let failed = 0;

        while (steps < maxSteps) {
            const queue = chunks[this.phase];

            if (!queue || queue.length == 0) {
                if (failed >= maxSteps) break;

                failed++;
            } else {
                if (this.phase == 0) {
                    await this.generateInitialChunk(queue[0], loadQueue);

                    steps++;
                    failed = 0;
                } else if (this.phase == 1) {
                    if (await this.tryGenerateSemiloaded(queue, loadQueue)) {
                        steps++;
                        failed = 0;
                    } else {
                        failed++;
                    }
                }
            }

            this.phase = (this.phase + 1) % this.phases;
        }
    }

    private async generateInitialChunk(chunk: ChunkInterface, queue: ChunkLoadQueue): Promise<void> {
        queue.remove(chunk);

        const newChunk = await this.generateTerrain(chunk.getPosition());;

        newChunk.loadState.target = chunk.loadState.target;

        this.world.setChunk(chunk.getPosition(), newChunk);
        queue.add(newChunk);
    }

    private static NEIGHBORS = [
        new ImmutableVector2D(-1, -1),
        new ImmutableVector2D(0, -1),
        new ImmutableVector2D(1, -1),
        new ImmutableVector2D(-1, 0),
        new ImmutableVector2D(1, 0),
        new ImmutableVector2D(-1, 1),
        new ImmutableVector2D(0, 1),
        new ImmutableVector2D(1, 1)
    ];

    private async tryGenerateSemiloaded(entries: ChunkInterface[], queue: ChunkLoadQueue): Promise<boolean> {
        let chunk = entries.find(chunk => chunk.loadState.current != chunk.loadState.target);

        if (!chunk) return false;

        queue.remove(chunk);

        let features: Feature[] = [];
        let thisPosition = chunk.getPosition();

        for (let neighbor of SimpleWorldGenerator.NEIGHBORS) {
            let neighborPosition = thisPosition.clone().add(neighbor);
            let neighborChunk = this.world.getChunk(neighborPosition);

            if (neighborChunk && (neighborChunk instanceof SemiloadedChunk || neighborChunk instanceof LoadedChunk)) {
                features.push(...neighborChunk.getFeatures());
            } else {
                chunk.getWorld()?.loadChunk(neighborPosition, 1);

                queue.add(chunk);

                return false;
            }
        }

        if (!(chunk instanceof SemiloadedChunk)) {
            throw new Error("Chunk is not semiloaded when it should be");
        }

        const newChunk = new LoadedChunk(chunk.getChunkData());

        newChunk.storeFeatures(Feature.resolveCollisions(chunk.getFeatures(), features));

        newChunk.loadState.target = chunk.loadState.target;

        this.world.setChunk(chunk.getPosition(), newChunk);
        queue.add(newChunk);

        newChunk.placeFeatures(Feature.resolveCollisions(features, features));

        return true;
    }

    private async generateTerrain(location: Vector2D): Promise<ChunkInterface> {
        const semiloaded = new SemiloadedChunk(await this.generateChunk(location));

        await this.addFeatures(location, semiloaded);

        return semiloaded;
    }

    private async addFeatures(location: Vector2D, chunk: SemiloadedChunk) {
        let features: Feature[] = [];

        for (let i = 0; i < murmur.murmur3(location.x + '.' + location.y + ':treeCount') % 5 + 5; i++) {
            let x = murmur.murmur3(location.x + '.' + location.y + '.' + i + ':treeX') % ChunkDataReferencer.dimensions.x;

            let z = murmur.murmur3(location.x + '.' + location.y + '.' + i + ':treeZ') % ChunkDataReferencer.dimensions.z;

            for (let y = ChunkDataReferencer.dimensions.y - 1; y >= 0; y--) {
                if (chunk.getChunkData().getBlock(x, y, z) != Registries.blocks.get('air')) {
                    features.push(new TreeFeature(new Vector3(x, y + 1, z), location, 0));

                    break;
                }
            }
        }

        for (let i = 0; i < murmur.murmur3(location.x + '.' + location.y + ':rockCount') % 4; i++) {
            let x = murmur.murmur3(location.x + '.' + location.y + '.' + i + ':rockX') % ChunkDataReferencer.dimensions.x;

            let z = murmur.murmur3(location.x + '.' + location.y + '.' + i + ':rockZ') % ChunkDataReferencer.dimensions.z;

            for (let y = ChunkDataReferencer.dimensions.y - 1; y >= 0; y--) {
                if (chunk.getChunkData().getBlock(x, y, z) != Registries.blocks.get('air')) {
                    features.push(new RockFeature(new Vector3(x, y + 1, z), location, 0));

                    break;
                }
            }
        }

        chunk.storeFeatures(features);
    }

    private async createDensities(location: Vector2D, data: ChunkData) {
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

    private async calculateDepth(data: ChunkData) {
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

    private async generateChunk(location: Vector2D): Promise<ChunkData> {
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
            throw new Error("Blocks to not exist for simple world generator");
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