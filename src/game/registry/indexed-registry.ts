import { IndexedRegistryItem } from "./indexed-registry-item.js";
import { Registry } from "./registry.js";

export class IndexedRegistry<T extends IndexedRegistryItem> extends Registry<T> {
    private idsToItems: Map<number, T> = new Map();

    get(id: string | number) {
        if (typeof id == 'string') return super.get(id);

        return this.idsToItems.get(id);
    }

    async setup() {
        this.idsToItems = new Map();

        let id = 0;

        for (const [ name, item ] of this.entries()) {
            item.bindRegistryKeys(id, name);
            this.idsToItems.set(id, item);

            id++;
        }
    }
}