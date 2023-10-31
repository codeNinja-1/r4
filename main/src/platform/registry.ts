import { Identifier } from "./identifier.js";

export class Registry<T> {
    static Factory = Symbol("Factory");

    _data: Map<string, new () => T>;

    constructor() {
        this._data = new Map();
    }

    entries() {
        return this._data.entries();
    }

    get(identifier: Identifier | string) {
        return this._data.get(identifier.toString());
    }

    register(identifier: Identifier | string, object: new () => T) {
        this._data.set(identifier.toString(), object);
    }
}