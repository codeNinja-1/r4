import { ImmutableVector3D } from "../../utils/vector3d/immutable-vector3d.js";
import { MutableVector3D } from "../../utils/vector3d/mutable-vector3d.js";
import { Vector3D } from "../../utils/vector3d/vector3d.js";

/**
 * A `ChunkDataReferencer` converts between indexes and
 * positions in chunk data for given chunk dimensions.
 * 
 * * The `index()` method converts a position to an
 * index in chunk data.
 * * The `position()` method converts an index in chunk
 * data to a position, based on the underlying `x()`,
 * `y()`, and `z()` methods.
 * * The `dimensions` property is a 3D vector containing
 * the dimensions of the chunk.
 * * The `cells` property is the total number of cells
 * in a chunk, equal to `dimensions.x * dimensions.y *
 * dimensions.z`.
 */
export abstract class ChunkDataReferencer {
    /**
     * The dimensions of the chunk as a 3D vector.
     */
    static dimensions: Vector3D = new ImmutableVector3D(8, 8, 32);

    /**
     * Returns the total number of cells in a chunk.
     */
    static get cells() {
        return this.dimensions.x * this.dimensions.y * this.dimensions.z;
    }

    /**
     * Computes the chunk data index for a given
     * position, where any block position will have a
     * different index from 0 to the total number of
     * cells in a chunk minus 1.
     * 
     * The method is the opposite of `position()`.
     */
    static index(x: number, y: number, z: number): number;
    static index(x: Vector3D): number;
    static index(x: number | Vector3D, y?: number, z?: number): number {
        if (x instanceof Vector3D) {
            y = x.y;
            z = x.z;
            x = x.x;
        } else {
            if (y === undefined || z === undefined) throw new Error(`Invalid arguments`);
        }

        if (x < 0 || x >= this.dimensions.x || y < 0 || y >= this.dimensions.y || z < 0 || z >= this.dimensions.z) throw new Error(`Coordinates are out of bounds`);

        return x + y * this.dimensions.x + z * this.dimensions.x * this.dimensions.y;
    }

    /**
     * Computes the x position of a specified chunk
     * data index. This can be used with the `y()` and
     * `z()` methods to get the complete position
     * without creating a vector.
     */
    static x(index: number): number {
        return index % this.dimensions.x;
    }

    /**
     * Computes the y position of a specified chunk
     * data index. This can be used with the `x()`
     * and `z()` methods to get the complete position
     * without creating a vector.
     */
    static y(index: number): number {
        return Math.floor(index / this.dimensions.x) % this.dimensions.y;
    }

    /**
     * Computes the z position of a specified chunk
     * data index. This can be used with the `x()` and
     * `y()` methods to get the complete position
     * without creating a vector.
     */
    static z(index: number): number {
        return Math.floor(index / (this.dimensions.x * this.dimensions.y));
    }

    /**
     * Computes the position of a specified chunk data
     * index. Equivalent to calling `x()`, `y()`, and
     * `z()`, then assembling a `Vector3D` from the
     * components.
     * 
     * The method is the opposite of `index()`.
     */
    static position(index: number): Vector3D {
        return new MutableVector3D(this.x(index), this.y(index), this.z(index));
    }
}