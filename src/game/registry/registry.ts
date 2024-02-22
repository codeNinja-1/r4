export class Registry<T> {
    private data: Map<string, T>;

    constructor() {
        this.data = new Map();
    }

    entries() {
        return this.data.entries();
    }

    get(identifier: string) {
        return this.data.get(identifier);
    }

    register(identifier: string, object: T) {
        this.data.set(identifier, object);
    }

    keys() {
        return this.data.keys();
    }

    values() {
        return this.data.values();
    }
}