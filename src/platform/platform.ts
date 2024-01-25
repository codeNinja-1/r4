import { Container } from "./container.js";
import { EnginePackage } from "./engine-package.js";
import { VirtualPackageList } from "./virtual-package-list.js";

export class Platform {
    _containers: Set<Container>;
    packages: VirtualPackageList;

    constructor() {
        this._containers = new Set();
        this._containers.add(new Container(new EnginePackage()));
        this.packages = new VirtualPackageList(this);
    }

    async require(id: string) {
        for (const container of this._containers) {
            if (container.package.id == id) {
                if (!container.loaded) {
                    await container.package.setup(this);

                    container.loaded = true;
                }
            }
        }
    }

    async setup() {
        for (const container of this._containers) {
            container.package.setup(this);
            
            container.loaded = true;
        }
    }
}