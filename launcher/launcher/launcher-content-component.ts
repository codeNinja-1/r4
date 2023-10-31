import { Component } from "../component.js";
import { DOM } from "../dom.js";
import { LauncherComponent } from "./launcher-component.js";

export class LauncherContentComponent extends Component {
    _element: HTMLDivElement;
    _title: HTMLDivElement;
    _page: HTMLDivElement;

    constructor(public launcher: LauncherComponent) {
        super();
    }

    render() {
        const content = DOM.element("div", "cubecraft-launcher-content");

        this._title = DOM.element("div", "cubecraft-launcher-content-title") as HTMLDivElement;
        this._title.textContent = "Cubecraft (Engine)";
        content.appendChild(this._title);

        this._page = DOM.element("div", "cubecraft-launcher-content-page") as HTMLDivElement;
        this._page.innerText = `Package ID: cubecraft\nThis is a core package, it is required for the game to run.`;
        content.appendChild(this._page);

        return content;
    }
}