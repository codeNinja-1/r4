import { Component } from "../component.js";

export class LayeredScreen extends Component<HTMLDivElement> {
    layers: Component[];

    constructor() {
        super();

        this.layers = [];
    }

    push(layer: Component) {
        this.layers.push(layer);
        layer.bind(this);
    }

    pop() {
        this.layers.pop();
    }

    render() {
        const element = document.createElement("div");

        for (const layer of this.layers) {
            element.appendChild(layer.element);
        }

        return element;
    }
}