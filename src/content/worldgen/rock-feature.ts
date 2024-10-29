import * as murmur from "murmurhash-js";
import { Vector2D } from "../../utils/vector2d/vector2d.js";
import { Vector3 } from "../../utils/vector3d/vector3.js";
import { ChunkData } from "../../world/chunk-data/chunk-data.js";
import { Feature } from "./feature.js";
import { Registries } from "../../game/registry/registries.js";
import { ChunkInterface } from "../../world/chunk-interface.js";
import { ChunkDataReferencer } from "../../world/chunk-data/chunk-data-referencer.js";
import { TreeFeature } from "./tree-feature.js";

export class RockFeature implements Feature {
    private absolute: Vector3;
    private size: Vector3;
    private box: [ Vector3, Vector3 ];

    constructor(private position: Vector3, private chunkPosition: Vector2D, private seed: number) {
        const x = this.position.x + this.chunkPosition.x * ChunkDataReferencer.dimensions.x;
        const y = this.position.y;
        const z = this.position.z + this.chunkPosition.y * ChunkDataReferencer.dimensions.z;

        this.absolute = new Vector3(x, y, z);

        const root = x + '.' + y + '.' + z;

        this.size = new Vector3(
            murmur.murmur3(root + ':rock.size.x', this.seed) % 1 + 5,
            murmur.murmur3(root + ':rock.size.y', this.seed) % 1 + 5,
            murmur.murmur3(root + ':rock.size.z', this.seed) % 1 + 5
        );

        this.box = [
            Vector3.floor(this.absolute.plus(-this.size.x / 2, 0, -this.size.z / 2)),
            Vector3.ceil(this.absolute.plus(this.size.x / 2, this.size.y, this.size.z / 2))
        ];
    }

    getBoundingBox(): [ Vector3, Vector3 ] {
        return this.box;
    }

    placeFeature(chunk: ChunkInterface): void {
        const cobblestone = Registries.blocks.get('cobblestone');

        if (!cobblestone) throw new Error("Cobblestone block not found");

        const chunkData = chunk.getChunkData();
        const chunkPosition = chunk.getPosition();
        const localPosition = this.absolute.minus(chunkPosition.x * ChunkDataReferencer.dimensions.x, 0, chunkPosition.y * ChunkDataReferencer.dimensions.z);

        for (let x = Math.floor(-this.size.x / 2 + localPosition.x); x < this.size.x / 2 + localPosition.x; x++) {
            for (let y = Math.floor(-this.size.y / 2 + localPosition.y); y < this.size.y / 2 + localPosition.y; y++) {
                for (let z = Math.floor(-this.size.z / 2 + localPosition.z); z < this.size.z / 2 + localPosition.z; z++) {
                    if (ChunkDataReferencer.isOutOfBounds(new Vector3(x, y, z))) continue;

                    const distance = (x - this.absolute.x) ** 2 / (this.size.x / 2) ** 2 + (y - this.absolute.y) ** 2 / (this.size.y / 2) ** 2 + (z - this.absolute.z) ** 2 / (this.size.z / 2) ** 2;

                    if (distance > 1) continue;

                    const current = chunkData.getBlock(x, y, z);

                    if (current && current.getRegisteredName() != "air") continue;

                    chunkData.setBlock(x, y, z, cobblestone);
                }
            }
        }
    }

    getFeatureHash(): number {
        return murmur.murmur3(this.absolute.x + '.' + this.absolute.y + '.' + this.absolute.z + ':rockHash', this.seed);
    }

    doesReplace(feature: Feature): boolean {
        return feature instanceof TreeFeature;
    }
}