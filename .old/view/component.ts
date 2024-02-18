export abstract class Component<E = HTMLElement> {
    parent: Component<any> | null;
    _element: E;

    constructor() {
        this.parent = null;
    }

    bind(child: Component<any>) {
        child.parent = this;
    }

    get element() {
        if (this._element) return this._element;

        this._element = this.render();

        return this._element;
    }

    abstract render(): E;
}