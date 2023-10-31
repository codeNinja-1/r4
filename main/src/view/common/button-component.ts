import { Component } from "../component.js";
import { ButtonStyle } from "./button-style.js";

export class ButtonComponent extends Component {
    listeners: Set<((event: unknown) => unknown) | (() => unknown)>;
    _element: HTMLButtonElement;

    constructor(public text: string, public style: ButtonStyle = ButtonStyle.Slab) {
        super();

        this.listeners = new Set();
    }

    onClick(listener: ((event: unknown) => unknown) | (() => unknown)) {
        if (this._element) {
            this._element.addEventListener("click", listener);
        }
    }

    render() {
        const element = document.createElement("button");

        element.classList.add("cubecraft-button-" + (this.style == ButtonStyle.Thick ? "thick" : "slab"));
        element.innerText = this.text;

        for (const listener of this.listeners) {
            element.addEventListener("click", listener);
        }

        return element;
    }
}