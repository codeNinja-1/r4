import { BaseChunk } from "../../world/base-chunk.js";
import { ChunkData } from "../../world/chunk-data/chunk-data.js";
import { Feature } from "./feature.js";
import { FeaturedChunk } from "./featured-chunk.js";

export class LoadedChunk extends BaseChunk implements FeaturedChunk {
    private features: Set<Feature> = new Set();

    constructor(data: ChunkData) {
        super();

        this.chunkData = data;
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

    placeFeatures(neighboringFeatures: Iterable<Feature>) {
        for (const feature of this.features) {
            feature.placeFeature(this);
        }

        for (const feature of neighboringFeatures) {
            feature.placeFeature(this);
        }
    }
}