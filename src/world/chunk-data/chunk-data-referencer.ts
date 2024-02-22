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
export namespace ChunkDataReferencer {
    /**
     * The dimensions of the chunk as a 3D vector.
     */
    export const dimensions: Vector3D = new ImmutableVector3D(16, 32, 16);
    
    const shiftY: number = 8;
    const shiftZ: number = 4;
    const xBlock: number = 0b1111;
    const zBlock: number = 0b1111;

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
    export function index(x: Vector3D): number;
    export function index(x: number | Vector3D, y?: number, z?: number): number {
        if (x instanceof Vector3D) {
            y = x.y;
            z = x.z;
            x = x.x;
        } else {
            if (y === undefined || z === undefined) throw new Error(`Invalid arguments`);
        }

        if (x < 0 || x >= this.dimensions.x || y < 0 || y >= this.dimensions.y || z < 0 || z >= this.dimensions.z) throw new Error(`Coordinates are out of bounds`);

        return x + (z << this.shiftZ) + (y << this.shiftY);
    }

    /**
     * Computes the x position of a specified chunk
     * data index. This can be used with the `y()` and
     * `z()` methods to get the complete position
     * without creating a vector.
     */
    export function x(index: number): number {
        return index & xBlock;
    }

    /**
     * Computes the y position of a specified chunk
     * data index. This can be used with the `x()`
     * and `z()` methods to get the complete position
     * without creating a vector.
     */
    export function y(index: number): number {
        return index >> shiftY;
    }

    /**
     * Computes the z position of a specified chunk
     * data index. This can be used with the `x()` and
     * `y()` methods to get the complete position
     * without creating a vector.
     */
    export function z(index: number): number {
        return index >> shiftZ & zBlock;
    }

    /**
     * Computes the position of a specified chunk data
     * index. Equivalent to calling `x()`, `y()`, and
     * `z()`, then assembling a `Vector3D` from the
     * components.
     * 
     * The method is the opposite of `index()`.
     */
    export function position(index: number): Vector3D {
        return new MutableVector3D(this.x(index), this.y(index), this.z(index));
    }
}

window['cdr'] = ChunkDataReferencer;