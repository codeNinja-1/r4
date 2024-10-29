import { WorldGenerator } from "../world/world-generation/world-generator.js";
import { WorldLoader } from "../world/world-loader.js";
import { World } from "../world/world.js";

export class SingleplayerWorldLoader implements WorldLoader {
    constructor(private worldGenerator: WorldGenerator) {
    }

    bindWorld(world: World): void {
        this.worldGenerator.bindWorld(world);
    }
}