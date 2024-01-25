import { Vector3D } from "../../utils/vector3d/vector3d.js";
import { ChunkData } from "./chunk-data.js";

/**
 * A ChunkDataField is an object where data for each
 * block in a chunk can be contained.
 */
export abstract class ChunkDataField<RepresentedType> {
    /**
     * The `ChunkData` object that this field is contained in.
     */
    protected chunkData: ChunkData;

    /**
     * Gets the value of the field at a given position.
     */
    get(position: Vector3D): RepresentedType;
    get(index: number): RepresentedType;
    get(x: number, y: number, z: number): RepresentedType;
    get(x: number | Vector3D, y?: number, z?: number): RepresentedType {
        if (typeof x == 'number' && typeof y == 'undefined') {
            return this._get(x);
        } else if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
            return this._get(this.chunkData.referencer.index(x, y, z));
        } else if (x instanceof Vector3D) {
            return this._get(this.chunkData.referencer.index(x));
        } else {
            throw new Error("Invalid arguments");
        }
    }

    /**
     * Sets the value of the field at a given position.
     */
    set(position: Vector3D, value: RepresentedType): void;
    set(index: number, value: RepresentedType): void;
    set(x: number, y: number, z: number, value: RepresentedType): void;
    set(x: Vector3D | number, y: RepresentedType | number, z?: number, value?: RepresentedType): void {
        if (typeof x == 'number' && typeof y != 'number') {
            return this._set(x, y);
        } else if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number' && typeof value != 'undefined') {
            return this._set(this.chunkData.referencer.index(x, y, z), value);
        } else if (x instanceof Vector3D && typeof y != 'number') {
            return this._set(this.chunkData.referencer.index(x), y);
        } else {
            throw new Error("Invalid arguments");
        }
    }

    abstract _get(index: number): RepresentedType;
    abstract _set(index: number, value: RepresentedType): void;
}