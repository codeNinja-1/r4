import { ChunkDataReferencer } from "./chunk-data-referencer.js";

export class ChunkDataMap {
    _referencer: ChunkDataReferencer;
    _map: Map<string, any>;

    constructor({ referencer }: { referencer: ChunkDataReferencer }) {
        this._referencer = referencer;
        this._map = new Map();
    }

    get(attribute, x, y, z) {
        let index = typeof y == 'undefined' ? x : this._referencer.indexOfPosition(x, y, z);

        return this._map.get(attribute + '.' + index);
    }

    set(attribute, x, y, z, value) {
        let index = typeof y == 'undefined' ? x : this._referencer.indexOfPosition(x, y, z);

        this._map.set(attribute + '.' + index, value);
    }
}