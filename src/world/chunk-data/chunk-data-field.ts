import { Vector3D } from "../../utils/vector3d/vector3d.js";
import { BlockPosition } from "../prototype/block-position.js";
import { ChunkDataReferencer } from "./chunk-data-referencer.js";
import { ChunkData } from "./chunk-data.js";

/**
 * A ChunkDataField is an object where data for each
 * block in a chunk can be contained.
 */
export abstract class ChunkDataField<RepresentedType> {
    /**
     * Gets the value of the field at a given position.
     */
    get(position: BlockPosition): RepresentedType;
    get(position: Vector3D): RepresentedType;
    get(index: number): RepresentedType;
    get(x: number, y: number, z: number): RepresentedType;
    get(x: number | Vector3D | BlockPosition, y?: number, z?: number): RepresentedType {
        if (typeof x == 'number' && typeof y == 'undefined') {
            return this._get(x);
        } else if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
            return this._get(ChunkDataReferencer.index(x, y, z));
        } else if (x instanceof Vector3D) {
            return this._get(ChunkDataReferencer.index(x));
        } else if (x instanceof BlockPosition) {
            return this.get(x.getLocalPosition());
        } else {
            throw new Error("Invalid arguments");
        }
    }

    /**
     * Sets the value of the field at a given position.
     */
    set(position: BlockPosition, value: RepresentedType): void;
    set(position: Vector3D, value: RepresentedType): void;
    set(index: number, value: RepresentedType): void;
    set(x: number, y: number, z: number, value: RepresentedType): void;
    set(x: Vector3D | BlockPosition | number, y: RepresentedType | number, z?: number, value?: RepresentedType): void {
        if (typeof x == 'number' && typeof y != 'number') {
            return this._set(x, y);
        } else if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number' && typeof value != 'undefined') {
            return this._set(ChunkDataReferencer.index(x, y, z), value);
        } else if (x instanceof Vector3D && typeof y != 'number') {
            return this._set(ChunkDataReferencer.index(x), y);
        } else if (x instanceof BlockPosition && typeof y != 'number') {
            return this._set(ChunkDataReferencer.index(x.getLocalPosition()), y);
        } else {
            throw new Error("Invalid arguments");
        }
    }

    abstract _get(index: number): RepresentedType;
    abstract _set(index: number, value: RepresentedType): void;
}