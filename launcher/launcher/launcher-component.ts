import { Component } from "../component.js";
import { DOM } from "../dom.js";
import { LauncherContentComponent } from "./launcher-content-component.js";
import { LauncherSidebarComponent } from "./launcher-sidebar-component.js";
import { MenuComponent } from "./menu-component.js";

export class LauncherComponent extends Component {
    sidebar: LauncherSidebarComponent = new LauncherSidebarComponent(this);
    content: LauncherContentComponent = new LauncherContentComponent(this);
    _element: HTMLDivElement;
    _currentMenu: MenuComponent = null;

    render() {
        const launcher = DOM.element("div", "cubecraft-launcher", "cubecraft-screen");
        
        launcher.appendChild(this.sidebar.element);
        launcher.appendChild(this.content.element);

        launcher.addEventListener('click', event => {
            if (this._currentMenu && !this._currentMenu._element.contains(event.target as Node)) {
                this.closeMenu();
            }
        });

        return launcher;
    }

    getOpenMenu() {
        return this._currentMenu;
    }

    openMenu(value: MenuComponent) {
        if (this._currentMenu) {
            this._currentMenu.onClose();

            if (this._element) this._element.removeChild(this._currentMenu.element);

            this._currentMenu = null;
        }

        this._currentMenu = value;

        if (this._currentMenu) {
            this._currentMenu.onOpen();

            if (this._element) this._element.appendChild(this._currentMenu.element);
        }
    }

    closeMenu() {
        this.openMenu(null);
    }
}