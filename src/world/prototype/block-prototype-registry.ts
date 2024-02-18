import { Registry } from "../../game/registry.js";
import { BlockPrototype } from "./block-prototype.js";

export class BlockPrototypeRegistry extends Registry<BlockPrototype> {
    private idsToPrototypes: Map<number, BlockPrototype>;

    get(id: string | number) {
        if (typeof id == 'string') return super.get(id);

        return this.idsToPrototypes.get(id);
    }

    async allocateBlockIds() {
        this.idsToPrototypes = new Map();

        let id = 0;

        for (const [ name, block ] of this.entries()) {
            block.bindBlockReferences(id, name);
            this.idsToPrototypes.set(id, block);

            id++;
        }
    }
}