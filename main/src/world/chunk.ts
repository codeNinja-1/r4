import { ImmutableVector2D } from "../utils/vector2d/immutable-vector2d.js";
import { ChunkDataField } from "./chunk-data/chunk-data-field.js";
import { ChunkData } from "./chunk-data/chunk-data.js";
import { Entity } from "./entity.js";
import { World } from "./world.js";

export class Chunk {
    _world: World | null;
    position: ImmutableVector2D;
    _entities: Set<Entity>;
    chunkData: ChunkData;

    constructor() {
        this._world = null;
        this.position = new ImmutableVector2D();

        this._entities = new Set();
    }

    get world(): World {
        if (!this._world) throw new Error(`Chunk is not in a world`);

        return this._world;
    }

    set world(world: World) {
        this._world = world;
    }

    _unload() {
        for (const entity of this._entities) {
            this.world.entityIdMapping.delete(entity.id);
        }
    }

    _setup() {
        this.chunkData.fields ||= this.world.allocator.initialize();
    }

    tick() {
    }

    field(name: string): ChunkDataField<any> {
        return this.chunkData.field(name);
    }
}