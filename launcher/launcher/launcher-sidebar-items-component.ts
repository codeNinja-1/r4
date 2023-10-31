import { Component } from "../component.js";
import { DOM } from "../dom.js";
import { LauncherComponent } from "./launcher-component.js";
import { LauncherSidebarItemComponent } from "./launcher-sidebar-item-component.js";

export class LauncherSidebarItemsComponent extends Component {
    _element: HTMLDivElement;
    core: LauncherSidebarItemComponent;

    constructor(public launcher: LauncherComponent) {
        super();

        this.core = new LauncherSidebarItemComponent(this.launcher, "Cubecraft (Engine)", "1.6.1", [ "1.0.0", "1.1.0", "1.2.0", "1.2.1", "1.3.0", "1.4.0", "1.5.1", "1.5.2", "1.6.0", "1.6.1" ]);
    }

    render() {
        const sidebarItems = DOM.element("div", "cubecraft-launcher-sidebar-items");

        const itemsLoading = DOM.element("div", "cubecraft-launcher-sidebar-items-loading");

        const loader = DOM.element("div", "cubecraft-launcher-loader", "cubecraft-centered");
        itemsLoading.appendChild(loader);

        sidebarItems.appendChild(itemsLoading);

        sidebarItems.appendChild(this.core.element);
        
        return sidebarItems;
    }
}