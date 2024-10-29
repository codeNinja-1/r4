import { ChunkInterface } from "../../world/chunk-interface.js";
import { Feature } from "./feature.js";

export interface FeaturedChunk extends ChunkInterface {
    getFeatures(): IterableIterator<Feature>;
    storeFeatures(features: Iterable<Feature>): void;
}