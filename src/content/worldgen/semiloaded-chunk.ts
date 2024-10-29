import { ChunkData } from "../../world/chunk-data/chunk-data.js";
import { PlaceholderChunk } from "../../world/placeholder-chunk.js";
import { Feature } from "./feature.js";
import { FeaturedChunk } from "./featured-chunk.js";

export class SemiloadedChunk extends PlaceholderChunk implements FeaturedChunk {
    static State = Symbol("semiloaded");

    private features: Set<Feature> = new Set();
    
    constructor(private data: ChunkData) {
        super();
    }

    getChunkData(): ChunkData {
        return this.data;
    }

    *getFeatures(): IterableIterator<Feature> {
        yield* this.features;
    }

    storeFeatures(features: Iterable<Feature>) {
        this.features.clear();

        for (const feature of features) {
            this.features.add(feature);
        }
    }

    loadState = { current: 1, target: 0 };
}