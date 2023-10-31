export class Identifier {
    namespace: string;
    id: string;

    constructor(namespace: string, id: string) {
        this.namespace = namespace;
        this.id = id;
    }

    is(identifier) {
        return this.namespace === identifier.namespace && this.id === identifier.id;
    }

    toString() {
        return `${this.namespace}:${this.id}`;
    }

    fromString(string) {
        const [ namespace, id ] = string.split(':');

        return new Identifier(namespace, id);
    }
}