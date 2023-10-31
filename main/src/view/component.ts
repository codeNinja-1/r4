export abstract class Component {
    parent: Component;
    abstract _element: HTMLElement;

    constructor() {
        this.parent = null;
    }

    bind(child) {
        child.parent = this;
    }

    get element() {
        if (this._element) return this._element;

        this._element = this.render();

        return this._element;
    }

    abstract render(): HTMLElement;
}