import { World } from "./world.js";

export interface WorldLoader {
    bindWorld(world: World): void;
}