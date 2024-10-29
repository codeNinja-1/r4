import { Vector2D } from "../../utils/vector2d/vector2d.js";
import { Vector3 } from "../../utils/vector3d/vector3.js";
import { ChunkData } from "../../world/chunk-data/chunk-data.js";
import { ChunkInterface } from "../../world/chunk-interface.js";

export interface Feature {
    getBoundingBox(): [ Vector3, Vector3 ];
    placeFeature(chunk: ChunkInterface): void;
    getFeatureHash(): number;
    doesReplace(feature: Feature): boolean;
}

export namespace Feature {
    export function *resolveCollisions(checkedFeatures: Iterable<Feature>, otherFeatures: Iterable<Feature>): IterableIterator<Feature> {
        checkedFeatures = [ ...checkedFeatures ];
        otherFeatures = [ ...otherFeatures ];

        const allFeatures = [ ...otherFeatures, ...checkedFeatures ];

        for (const feature of checkedFeatures) {
            let destroy = false;

            for (const other of allFeatures) {
                if (feature === other) {
                    continue;
                }

                if (feature.getBoundingBox()[0].x <= other.getBoundingBox()[1].x &&
                    feature.getBoundingBox()[1].x >= other.getBoundingBox()[0].x &&
                    feature.getBoundingBox()[0].y <= other.getBoundingBox()[1].y &&
                    feature.getBoundingBox()[1].y >= other.getBoundingBox()[0].y &&
                    feature.getBoundingBox()[0].z <= other.getBoundingBox()[1].z &&
                    feature.getBoundingBox()[1].z >= other.getBoundingBox()[0].z) {
                    if (feature.doesReplace(other)) continue;

                    if (other.doesReplace(feature)) {
                        destroy = true;
                    } else {
                        let hash = feature.getFeatureHash();
                        let otherHash = other.getFeatureHash();
                        
                        if (otherHash < hash) {
                            destroy = true;
                        } else if (otherHash == hash) {
                            destroy = true;
                        }
                    }
                }
            }

            if (!destroy) {
                yield feature;
            }
        }
    }
}