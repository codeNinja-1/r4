import { ImmutableVector2D } from "../utils/vector2d/immutable-vector2d.js";
import { ChunkDataBits } from "./chunk-data/chunk-data-bits.js";
import { ChunkDataBuffer } from "./chunk-data/chunk-data-buffer.js";
import { ChunkDataField } from "./chunk-data/chunk-data-field.js";
import { ChunkDataMap } from "./chunk-data/chunk-data-map.js";
import { Entity } from "./entity.js";
import { World } from "./world.js";

export class Chunk {
    world: World;
    position: ImmutableVector2D;
    _entities: Set<Entity>;
    _bits: ChunkDataBits;
    _buffers: ChunkDataBuffer[];
    _map: ChunkDataMap;
    _fields: Map<string, ChunkDataField>;

    constructor() {
        this.world = null;
        this.position = null;

        this._entities = new Set();

        this._bits = null;
        this._buffers = [];
        this._map = null;
        this._fields = new Map();
    }

    _unload() {
        for (const entity of this._entities) {
            this.world._entityIdMapping.delete(entity.id);
        }
    }

    _setup() {
        const { bits, buffers, map, fields } = this.world._chunkDataOptions;

        if (bits) {
            this._bits = new ChunkDataBits(bits);
        }

        if (map) {
            this._map = new ChunkDataMap(map);
        }

        for (const buffer of buffers) {
            this._buffers.push(new ChunkDataBuffer(buffer));
        }

        for (const field of fields) {
            this._fields.set(field.label, new ChunkDataField(field.index, field.label, field.type, this));
        }
    }

    field(name: string) {
        return this._fields.get(name);
    }
}