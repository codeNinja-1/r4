import { Package } from "./package.js";

export class Container {
    package: Package;
    dependencies: Set<string>;
    loaded: boolean = false;

    constructor(pkg: Package) {
        this.package = pkg;
    }

    get id() {
        return this.package.id;
    }
}