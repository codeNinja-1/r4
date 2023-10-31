import { Component } from "../component.js";
import { DOM } from "../dom.js";
import { LauncherComponent } from "./launcher-component.js";
import { LauncherSidebarItemComponent } from "./launcher-sidebar-item-component.js";
import { LauncherSidebarItemsComponent } from "./launcher-sidebar-items-component.js";
import { LauncherSidebarTitleComponent } from "./launcher-sidebar-title-component.js";

export class LauncherSidebarComponent extends Component {
    _element: HTMLDivElement;
    _navigation: LauncherSidebarTitleComponent;
    _items: LauncherSidebarItemsComponent;

    constructor(public launcher: LauncherComponent) {
        super();

        this._navigation = new LauncherSidebarTitleComponent(this.launcher);
        this._items = new LauncherSidebarItemsComponent(this.launcher);
    }

    render() {
        const sidebar = DOM.element("div", "cubecraft-launcher-sidebar");

        sidebar.appendChild(this._navigation.element);
        sidebar.appendChild(this._items.element);

        return sidebar;
    }
}