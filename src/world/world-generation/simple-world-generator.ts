import { Registries } from "../../game/registries.js";
import { Vector2D } from "../../utils/vector2d/vector2d.js";
import { ChunkDataReferencer } from "../chunk-data/chunk-data-referencer.js";
import { ChunkData } from "../chunk-data/chunk-data.js";
import { WorldGenerator } from "./world-generator.js";

export class SimpleWorldGenerator implements WorldGenerator {
    async generateChunk(location: Vector2D): Promise<ChunkData> {
        const data = new ChunkData();

        const stone = Registries.blocks.get('stone');

        if (!stone) {
            throw new Error('Stone block prototype not found');
        }

        for (let x = 0; x < ChunkDataReferencer.dimensions.x; x++) {
            for (let z = 0; z < ChunkDataReferencer.dimensions.z; z++) {
                data.setBlock(x, 0, z, stone);
            }
        }

        return data;
    }
}