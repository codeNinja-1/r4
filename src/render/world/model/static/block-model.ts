import { IndexedRegistryItem } from "../../../../game/registry/indexed-registry-item.js";
import { DataUtils } from "../../../../utils/data-utils.js";
import { ModelComponent } from "./model-component.js";
import { StaticModel } from "./static-model.js";

export class BlockModel extends IndexedRegistryItem implements StaticModel {
    private components: Set<ModelComponent> = new Set();
    private transparent: boolean = false;

    constructor(options?: { transparent?: boolean }) {
        super();

        this.transparent = options?.transparent ?? false;
    }

    isTransparent(): boolean {
        return this.transparent;
    }

    getVertexPositions(): Float32Array {
        const components = Array.from(this.components);
        const positions = components.map(component => component.getVertexPositions());
        const buffer = DataUtils.concat(positions);

        return new Float32Array(buffer);
    }

    getTextureMappings(): Float32Array {
        const components = Array.from(this.components);
        const textureMappings = components.map(component => component.getTextureMappings());
        const buffer = DataUtils.concat(textureMappings);

        return new Float32Array(buffer);
    }

    getTextureIds(): Uint32Array {
        const components = Array.from(this.components);
        const textureIds = components.map(component => component.getTextureIds());
        const buffer = DataUtils.concat(textureIds);

        return new Uint32Array(buffer);
    }

    add(...components: ModelComponent[]): void {
        for (const component of components) {
            this.components.add(component);
        }
    }

    remove(...components: ModelComponent[]): void {
        for (const component of components) {
            this.components.delete(component);
        }
    }
}