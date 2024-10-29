import { Vector3 } from "../../utils/vector3d/vector3.js";
import { BlockPosition } from "../prototype/block-position.js";
import { ChunkDataReferencer } from "./chunk-data-referencer.js";

/**
 * A ChunkDataField is an object where data for each
 * block in a chunk can be contained.
 */
export abstract class ChunkDataField<RepresentedType> {
    /**
     * Gets the value of the field at a given position.
     */
    get(position: BlockPosition): RepresentedType;
    get(position: Vector3): RepresentedType;
    get(index: number): RepresentedType;
    get(x: number, y: number, z: number): RepresentedType;
    get(x: number | Vector3 | BlockPosition, y?: number, z?: number): RepresentedType {
        if (typeof x == 'number' && typeof y == 'undefined') {
            return this._get(x);
        } else if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
            return this._get(ChunkDataReferencer.index(x, y, z));
        } else if (x instanceof Vector3) {
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
    set(position: Vector3, value: RepresentedType): void;
    set(index: number, value: RepresentedType): void;
    set(x: number, y: number, z: number, value: RepresentedType): void;
    set(x: Vector3 | BlockPosition | number, y: RepresentedType | number, z?: number, value?: RepresentedType): void {
        if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number' && typeof value != 'undefined') {
            return this._set(ChunkDataReferencer.index(x, y, z), value);
        } else if (x instanceof Vector3) {
            return this._set(ChunkDataReferencer.index(x), y as RepresentedType);
        } else if (x instanceof BlockPosition) {
            return this._set(ChunkDataReferencer.index(x.getLocalPosition()), y as RepresentedType);
        } else if (typeof x == 'number') {
            return this._set(x, y as RepresentedType);
        } else {
            throw new Error("Invalid arguments");
        }
    }

    abstract _get(index: number): RepresentedType;
    abstract _set(index: number, value: RepresentedType): void;
}