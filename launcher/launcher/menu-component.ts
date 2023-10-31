import { Vector2D } from "../../utils/vector2d/vector2d.js";
import { Component } from "../component.js";
import { DOM } from "../dom.js";

export abstract class MenuComponent extends Component {
    _element: HTMLDivElement;

    constructor(public position: Vector2D) {
        super();
    }

    render() {
        const element = DOM.element('div', 'cubecraft-menu');

        element.style.top = `${this.position.y}px`;
        element.style.left = `${this.position.x}px`;

        return element;
    }

    onOpen() {
    }

    onClose() {
    }
}