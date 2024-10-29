import { World } from "../world.js";

export interface WorldGenerator {
    bindWorld(world: World): void;
}