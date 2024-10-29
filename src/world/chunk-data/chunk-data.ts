import { Registries } from "../../game/registry/registries.js";
import { Vector3 } from "../../utils/vector3d/vector3.js";
import { ChunkInterface } from "../chunk-interface.js";
import { Entity } from "../entity/entity.js";
import { BlockPosition } from "../prototype/block-position.js";
import { BlockPrototype } from "../prototype/block-prototype.js";
import { ChunkDataFields } from "../prototype/chunk-data-fields.js";
import { ChunkDataField } from "./chunk-data-field.js";
import { ChunkDataReferencer } from "./chunk-data-referencer.js";

export class ChunkData {
    private chunk: ChunkInterface.NonPlaceholder | null = null;
    private entities: Set<Entity> = new Set();
    private updates: Set<number> = new Set();

    constructor(private fields: Map<string, ChunkDataField<any>> = ChunkDataFields.initialize()) {
    }

    setParentChunk(chunk: ChunkInterface.NonPlaceholder): void {
        this.chunk = chunk;
    }

    getEntities(): Set<Entity> {
        return new Set(...this.entities.entries());
    }

    getChunk(): ChunkInterface.NonPlaceholder | null {
        return this.chunk;
    }

    addEntity(entity: Entity): void {
        this.entities.add(entity);
    }

    removeEntity(entity: Entity): void {
        this.entities.delete(entity);
    }

    getField(id: string): ChunkDataField<any> {
        if (!this.fields.has(id)) {
            throw new Error(`Field id '${id}' is not allocated`);
        }

        return this.fields.get(id) as ChunkDataField<any>;
    }

    getBlockId(position: BlockPosition): number;
    getBlockId(position: Vector3): number;
    getBlockId(x: number, y: number, z: number): number;
    getBlockId(index: number): number;
    getBlockId(x: BlockPosition | Vector3 | number, y?: number, z?: number): number {
        if (x instanceof BlockPosition) {
            return this.getField('blockId').get(x.getLocalPosition());
        } else if (x instanceof Vector3) {
            return this.getField('blockId').get(x);
        } else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
            return this.getField('blockId').get(x, y, z);
        } else if (typeof x === 'number') {
            return this.getField('blockId').get(x); 
        } else {
            throw new Error("Invalid arguments");
        }
    }

    getBlock(position: BlockPosition): BlockPrototype;
    getBlock(position: Vector3): BlockPrototype;
    getBlock(x: number, y: number, z: number): BlockPrototype;
    getBlock(index: number): BlockPrototype;
    getBlock(x: BlockPosition | Vector3 | number, y?: number, z?: number): BlockPrototype {
        if (x instanceof BlockPosition) {
            return Registries.blocks.get(this.getBlockId(x))!;
        } else if (x instanceof Vector3) {
            return Registries.blocks.get(this.getBlockId(x))!;
        } else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
            return Registries.blocks.get(this.getBlockId(x, y, z))!;
        } else if (typeof x === 'number') {
            return Registries.blocks.get(this.getBlockId(x))!; 
        } else {
            throw new Error("Invalid arguments");
        }
    }

    setBlockId(position: BlockPosition, blockId: number): void;
    setBlockId(position: Vector3, blockId: number): void;
    setBlockId(x: number, y: number, z: number, blockId: number): void;
    setBlockId(index: number, blockId: number): void;
    setBlockId(x: BlockPosition | Vector3 | number, y: number, z?: number, block?: number): void {
        if (x instanceof BlockPosition && typeof y == 'number') {
            const localPostion = x.getLocalPosition();

            this.setBlockId(localPostion, y);
        } else if (x instanceof Vector3 && typeof y === 'number') {
            this.getField('blockId').set(x, y);

            this.updates.add(ChunkDataReferencer.index(x));
        } else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number' && typeof block == 'number') {
            this.getField('blockId').set(x, y, z, block);

            this.updates.add(ChunkDataReferencer.index(x, y, z));
        } else if (typeof x == 'number' && typeof y == 'number') {
            this.getField('blockId').set(x, y);

            this.updates.add(x);
        } else {
            throw new Error("Invalid arguments");
        }
    }

    setBlock(position: BlockPosition, block: BlockPrototype): void;
    setBlock(position: Vector3, block: BlockPrototype): void;
    setBlock(x: number, y: number, z: number, block: BlockPrototype): void;
    setBlock(x: BlockPosition | Vector3 | number, y: BlockPrototype | number, z?: number, block?: BlockPrototype): void {
        if (x instanceof BlockPosition && y instanceof BlockPrototype) {
            this.setBlockId(x, y.getRegisteredId());
        } else if (x instanceof Vector3 && y instanceof BlockPrototype) {
            this.setBlockId(x, y.getRegisteredId());
        } else if (typeof x === 'number' && typeof y == 'number' && typeof z == 'number' && block instanceof BlockPrototype) {
            this.setBlockId(x, y, z, block.getRegisteredId());
        } else if (typeof x == 'number' && typeof y == 'number') {
            this.setBlockId(x, y);
        } else {
            throw new Error("Invalid arguments");
        }
    }

    getBlockUpdates(): Iterable<number> {
        return this.updates;
    }

    async tickChunkData(): Promise<void> {
        for (const update of this.updates) {
            const position = ChunkDataReferencer.position(update);
            const blockPrototype = this.getBlock(position);

            blockPrototype.whenTicked(new BlockPosition(position, this));
        }

        this.updates.clear();
    }
}