import { Vector3 } from "../../utils/vector3d/vector3.js";

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
export namespace ChunkDataReferencer {
    /**
     * The dimensions of the chunk as a 3D vector.
     */
    export const dimensions: Vector3 = Vector3.immutable(new Vector3(16, 64, 16));

    /**
     * Returns the total number of cells in a chunk.
     */
    export const cells = dimensions.x * dimensions.y * dimensions.z;

    /**
     * Computes the chunk data index for a given
     * position, where any block position will have a
     * different index from 0 to the total number of
     * cells in a chunk minus 1.
     * 
     * The method is the opposite of `position()`.
     */
    export function index(x: number, y: number, z: number): number;
    export function index(x: Vector3): number;
    export function index(x: number | Vector3, y?: number, z?: number): number {
        if (x instanceof Vector3) {
            y = x.y;
            z = x.z;
            x = x.x;
        } else {
            if (y === undefined || z === undefined) throw new Error(`Invalid arguments`);
        }

        if (x < 0 || x >= this.dimensions.x || y < 0 || y >= this.dimensions.y || z < 0 || z >= this.dimensions.z) throw new Error(`Coordinates are out of bounds`);

        return x + (z << 4) + (y << 8);
    }

    /**
     * Computes the x position of a specified chunk
     * data index. This can be used with the `y()` and
     * `z()` methods to get the complete position
     * without creating a vector.
     */
    export function x(index: number): number {
        return index & 0b1111;
    }

    /**
     * Computes the y position of a specified chunk
     * data index. This can be used with the `x()`
     * and `z()` methods to get the complete position
     * without creating a vector.
     */
    export function y(index: number): number {
        return index >> 8;
    }

    /**
     * Computes the z position of a specified chunk
     * data index. This can be used with the `x()` and
     * `y()` methods to get the complete position
     * without creating a vector.
     */
    export function z(index: number): number {
        return (index >> 4) & 0b1111;
    }

    /**
     * Computes the position of a specified chunk data
     * index. Equivalent to calling `x()`, `y()`, and
     * `z()`, then assembling a `Vector3D` from the
     * components.
     * 
     * The method is the opposite of `index()`.
     */
    export function position(index: number): Vector3 {
        return new Vector3(this.x(index), this.y(index), this.z(index));
    }

    export function isOutOfBounds(position: Vector3): boolean {
        return position.x < 0 || position.x >= this.dimensions.x || position.y < 0 || position.y >= this.dimensions.y || position.z < 0 || position.z >= this.dimensions.z;
    }
}

window['cdr'] = ChunkDataReferencer;