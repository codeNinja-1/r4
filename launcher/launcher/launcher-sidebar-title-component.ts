import { ButtonComponent } from "../common/button-component.js";
import { ButtonStyle } from "../common/button-style.js";
import { Component } from "../component.js";
import { DOM } from "../dom.js";
import { LauncherComponent } from "./launcher-component.js";

export class LauncherSidebarTitleComponent extends Component {
    _element: HTMLDivElement;

    constructor(public launcher: LauncherComponent) {
        super();
    }

    render() {
        const title = DOM.element("div", "cubecraft-launcher-sidebar-bar");

        const text = DOM.element("div", "cubecraft-launcher-sidebar-bar-text");
        text.textContent = "PACKAGES";
        title.appendChild(text);

        const button = DOM.element("div", "cubecraft-launcher-sidebar-bar-button", "cubecraft-button-thick");
        button.textContent = "INSTALL";
        title.appendChild(button);

        return title;
    }
}