import { Vector2D } from "../../utils/vector2d/vector2d.js";
import { DOM } from "../dom.js";
import { LauncherSidebarItemComponent } from "./launcher-sidebar-item-component.js";
import { MenuComponent } from "./menu-component.js";

export class VersionMenuComponent extends MenuComponent {
    constructor(public item: LauncherSidebarItemComponent, position: Vector2D, public minWidth: number) {
        super(position);
    }

    render() {
        const element = super.render();
        
        element.style.minWidth = `${this.minWidth}px`;

        for (const version of this.item.versions) {
            const menuItem = DOM.element("div", 'cubecraft-menu-item');

            menuItem.textContent = version;

            menuItem.addEventListener("click", () => {
                this.item.version = version;

                this.item.launcher.closeMenu();
            });

            if (version == this.item.version) {
                menuItem.classList.add("cubecraft-menu-item-selected");
            }

            element.appendChild(menuItem);
        }

        return element;
    }

    onOpen() {
    }

    onClose() {
    }
}