import { Component } from "../component.js";
import { DOM } from "../dom.js";
import { ButtonStyle } from "./button-style.js";

export class ButtonComponent extends Component<HTMLButtonElement> {
    listeners: Set<((event: unknown) => unknown) | (() => unknown)>;

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
        const element = DOM.element("button");

        element.classList.add("cubecraft-button-" + (this.style == ButtonStyle.Thick ? "thick" : "slab"));
        element.innerText = this.text;

        for (const listener of this.listeners) {
            element.addEventListener("click", listener);
        }

        return element as HTMLButtonElement;
    }
}