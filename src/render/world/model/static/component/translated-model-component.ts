import { Vector3 } from "../../../../../utils/vector3d/vector3.js";
import { ModelComponent } from "../model-component.js";
import { EmptyModelComponent } from "./empty-model-component.js";

export class TranslatedModelComponent implements ModelComponent {
    constructor(private position: Vector3 = new Vector3(), private child: ModelComponent = new EmptyModelComponent()) {
    }

    add(child: ModelComponent): void {
        this.child = child;
    }

    getVertexPositions(): Float32Array {
        const childPosition = this.child.getVertexPositions();

        for (let i = 0; i < childPosition.length / 3; i++) {
            childPosition[i * 3] += this.position.x;
            childPosition[i * 3 + 1] += this.position.y;
            childPosition[i * 3 + 2] += this.position.z;
        }

        return childPosition;
    }

    getTextureMappings(): Float32Array {
        return this.child.getTextureMappings();
    }

    getTextureIds(): Uint32Array {
        return this.child.getTextureIds();
    }
}