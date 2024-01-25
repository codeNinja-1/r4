export class Registry<T> {
    static Factory = Symbol("Factory");

    _data: Map<string, new () => T>;

    constructor() {
        this._data = new Map();
    }

    entries() {
        return this._data.entries();
    }

    get(identifier: string) {
        return this._data.get(identifier);
    }

    register(identifier: string, object: new () => T) {
        this._data.set(identifier, object);
    }
}