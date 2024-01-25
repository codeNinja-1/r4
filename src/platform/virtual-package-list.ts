import { Container } from "./container.js";
import { Package } from "./package.js";
import { Platform } from "./platform.js";

export class VirtualPackageList {
    _platform: Platform;

    constructor(platform: Platform) {
        this._platform = platform;
    }

    *[Symbol.iterator]() {
        for (const container of this._platform._containers) {
            yield container.package;
        }
    }

    add(pkg: Package) {
        this._platform._containers.add(new Container(pkg));
    }
}