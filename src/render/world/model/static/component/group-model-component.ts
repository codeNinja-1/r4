import { DataUtils } from "../../../../../utils/data-utils.js";
import { Vector3D } from "../../../../../utils/vector3d/vector3d.js";
import { ModelComponent } from "../model-component.js";

export class GroupModelComponent implements ModelComponent {
    private components: Set<ModelComponent> = new Set();

    getVertexPositions(): Float32Array {
        const components = Array.from(this.components);
        const positions = components.map(component => component.getVertexPositions());
        const buffer = DataUtils.concat(positions);
        const array = new Float32Array(buffer);

        return array;
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