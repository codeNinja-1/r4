import { MutableVector3D } from "../../../../../utils/vector3d/mutable-vector3d.js";
import { Vector3D } from "../../../../../utils/vector3d/vector3d.js";
import { ModelComponent } from "../model-component.js";
import { EmptyModelComponent } from "./empty-model-component.js";

export class TranslatedModelComponent implements ModelComponent {
    constructor(private position: Vector3D = new MutableVector3D(), private child: ModelComponent = new EmptyModelComponent()) {
    }

    getPosition(): Vector3D {
        return this.position.clone();
    }

    setPosition(position: Vector3D): void {
        this.position.set(position);
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