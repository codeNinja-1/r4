import { Vector3D } from "../../utils/vector3d/vector3d.js";
import { Chunk } from "../chunk.js";

export class ChunkDataField {
    index: number;
    chunk: Chunk;
    type: string;
    label: string;

    constructor(index, label, type, chunk) {
        this.index = index;
        this.label = label;
        this.type = type;
        this.chunk = chunk;
    }

    get(x: number | Vector3D, y?: number, z?: number) {
        if (x instanceof Vector3D) {
            let vector = x;

            x = vector.x;
            y = vector.y;
            z = vector.z;
        }

        if (this.type == 'b') {
            return this.chunk._bits.get(this.index, x, y, z);
        } else if (this.type == 'a') {
            return this.chunk._map.get(this.index, x, y, z);
        } else {
            return this.chunk._buffers[this.index].get(x, y, z);
        }
    }

    set(x: number | Vector3D, y: number | any, z?: number, value?: any) {
        if (x instanceof Vector3D) {
            let vector = x;

            x = vector.x;
            y = vector.y;
            z = vector.z;
            value = y;
        }

        if (this.type == 'b') {
            return this.chunk._bits.set(this.index, x, y, z, value);
        } else if (this.type == 'a') {
            return this.chunk._map.set(this.index, x, y, z, value);
        } else {
            return this.chunk._buffers[this.index].set(x, y, z, value);
        }
    }
}