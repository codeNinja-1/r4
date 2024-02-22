import { DataUtils } from "../../../../../utils/data-utils.js";
import { Vector3D } from "../../../../../utils/vector3d/vector3d.js";
import { PositionedModelComponent } from "./positioned-model-component.js";

export class GroupModelComponent extends PositionedModelComponent {
    private components: Set<PositionedModelComponent> = new Set();

    getVertexPositions(parentPosition: Vector3D): Float32Array {
        const components = Array.from(this.components);
        const positions = components.map(component => component.getVertexPositions(parentPosition));
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

    add(...components: PositionedModelComponent[]): void {
        for (const component of components) {
            this.components.add(component);
        }
    }

    remove(...components: PositionedModelComponent[]): void {
        for (const component of components) {
            this.components.delete(component);
        }
    }
}