import { Package } from "./package.js";

export class EnginePackage extends Package {
    async setup() {
        
    }

    get id() {
        return "_engine";
    }
}
