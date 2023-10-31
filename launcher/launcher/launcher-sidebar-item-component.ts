import { ImmutableVector2D } from "../../utils/vector2d/immutable-vector2d.js";
import { Vector2D } from "../../utils/vector2d/vector2d.js";
import { Component } from "../component.js";
import { DOM } from "../dom.js";
import { LauncherComponent } from "./launcher-component.js";
import { VersionMenuComponent } from "./version-menu-component.js";

export class LauncherSidebarItemComponent extends Component {
    _element: HTMLDivElement;
    _versionElement: HTMLDivElement;
    _version: string;

    constructor(public launcher: LauncherComponent, public name: string, version: string, public versions: string[]) {
        super();

        this._version = version;
    }

    render() {
        const title = DOM.element("div", "cubecraft-launcher-sidebar-item");

        const text = DOM.element("div", "cubecraft-launcher-sidebar-item-text");
        text.textContent = this.name;
        title.appendChild(text);

        const dropdown = DOM.element("div", "cubecraft-launcher-sidebar-item-dropdown", "cubecraft-dropdown-thick");
        dropdown.textContent = this.version;
        title.appendChild(dropdown);

        dropdown.addEventListener("click", event => {
            const boundingRect = dropdown.getBoundingClientRect();
            const menu = new VersionMenuComponent(this, new ImmutableVector2D(boundingRect.left, boundingRect.bottom), boundingRect.width);

            this.launcher.openMenu(menu);

            event.stopPropagation();
        });

        this._versionElement = dropdown as HTMLDivElement;

        return title;
    }

    set version(value: string) {
        this._version = value;

        this._versionElement.textContent = value;
    }

    get version(): string {
        return this._version;
    }
}