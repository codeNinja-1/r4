import * as murmur from "murmurhash-js";
import { Vector2D } from "../../utils/vector2d/vector2d.js";
import { Vector3 } from "../../utils/vector3d/vector3.js";
import { ChunkData } from "../../world/chunk-data/chunk-data.js";
import { Feature } from "./feature.js";
import { Registries } from "../../game/registry/registries.js";
import { ChunkInterface } from "../../world/chunk-interface.js";
import { ChunkDataReferencer } from "../../world/chunk-data/chunk-data-referencer.js";

export class TreeFeature implements Feature {
    private absolute: Vector3;
    private height: number;

    constructor(private position: Vector3, private chunkPosition: Vector2D, private seed: number) {
        const x = this.position.x + this.chunkPosition.x * ChunkDataReferencer.dimensions.x;
        const y = this.position.y;
        const z = this.position.z + this.chunkPosition.y * ChunkDataReferencer.dimensions.z;

        this.absolute = new Vector3(x, y, z);

        const root = x + '.' + y + '.' + z;

        this.height = murmur.murmur3(root + ':treeHeight', this.seed) % 5 + 7;
    }

    getBoundingBox(): [ Vector3, Vector3 ] {
        return [ this.absolute.plus(-1, 0, -1), this.absolute.plus(1, this.height, 1) ];
    }

    placeFeature(chunk: ChunkInterface): void {
        const log = Registries.blocks.get('log.along_y');

        if (!log) throw new Error("Log block not found");

        const leaves = Registries.blocks.get('leaves');

        if (!leaves) throw new Error("Leaves block not found");

        const chunkData = chunk.getChunkData();
        const chunkPosition = chunk.getPosition();
        const localPosition = this.absolute.minus(chunkPosition.x * ChunkDataReferencer.dimensions.x, 0, chunkPosition.y * ChunkDataReferencer.dimensions.z);

        for (let i = 0; i < this.height; i++) {
            const logPosition = localPosition.plus(0, i, 0);

            if (!ChunkDataReferencer.isOutOfBounds(logPosition)) {
                chunkData.setBlock(logPosition, log);
            }

            if (i == 0) continue;

            const position = localPosition.plus(0, i, 0);

            let radius = (this.height - i) / 2 / 2 + 1;

            if (i % 2 == 0 && i < this.height - 1) {
                radius = (radius + 0.5) / 2;
            }

            const radiusSquared = radius * radius;

            for (let x = -Math.floor(radius); x <= Math.ceil(radius); x++) {
                for (let z = -Math.floor(radius); z <= Math.ceil(radius); z++) {
                    if (x * x + z * z > radiusSquared) continue;
                    if (ChunkDataReferencer.isOutOfBounds(position.plus(x, 0, z))) continue;

                    const current = chunkData.getBlock(position.x + x, position.y, position.z + z);

                    if (current && current.getRegisteredName() != 'air') continue;

                    chunkData.setBlock(
                        position.x + x,
                        position.y,
                        position.z + z,
                        leaves
                    );
                }
            }
        }

        const topPosition = localPosition.plus(0, this.height, 0);

        if (!ChunkDataReferencer.isOutOfBounds(topPosition)) {
            const current = chunkData.getBlock(topPosition);

            if (!current || current.getRegisteredName() == 'air') {
                chunkData.setBlock(topPosition, leaves);
            }
        }
    }

    getFeatureHash(): number {
        return murmur.murmur3(this.absolute.x + '.' + this.absolute.y + '.' + this.absolute.z + ':treeHash', this.seed);
    }

    doesReplace(feature: Feature): boolean {
        return false;
    }
}