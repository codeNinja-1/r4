import { IndexedRegistryItem } from "../../../../game/registry/indexed-registry-item.js";
import { DataUtils } from "../../../../utils/data-utils.js";
import { ImmutableVector3D } from "../../../../utils/vector3d/immutable-vector3d.js";
import { ModelComponent } from "./model-component.js";
import { StaticModel } from "./static-model.js";

export class BlockModel extends IndexedRegistryItem implements StaticModel {
    components: Set<ModelComponent>;

    getVertexPositions(): Float32Array {
        const components = Array.from(this.components);
        const positions = components.map(component => component.getVertexPositions(new ImmutableVector3D()));
        const buffer = DataUtils.concat(positions);

        return new Float32Array(buffer);
    }

    getTextureMappings(): Uint32Array {
        const components = Array.from(this.components);
        const textureMappings = components.map(component => component.getTextureMappings());
        const buffer = DataUtils.concat(textureMappings);

        return new Uint32Array(buffer);
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