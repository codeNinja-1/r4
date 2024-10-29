import { Quaternion } from "../../../../../utils/quaternion/quaterion.js";
import { Rotation } from "../../../../../utils/rotation/rotation.js";
import { Vector3 } from "../../../../../utils/vector3d/vector3.js";
import { ModelComponent } from "../model-component.js";
import { EmptyModelComponent } from "./empty-model-component.js";

export class RotatedModelComponent implements ModelComponent {
    private quaternion: Quaternion;

    constructor(rotation: Rotation | Quaternion = new Rotation(), private origin: Vector3 = new Vector3(0.5, 0.5, 0.5), private child: ModelComponent = new EmptyModelComponent()) {
        this.quaternion = rotation instanceof Rotation ? Quaternion.fromRotation(rotation) : rotation;
    }

    add(child: ModelComponent): void {
        this.child = child;
    }

    getVertexPositions(): Float32Array {
        const childVertices = this.child.getVertexPositions();

        for (let i = 0; i < childVertices.length / 3; i++) {
            const x = childVertices[i * 3];
            const y = childVertices[i * 3 + 1];
            const z = childVertices[i * 3 + 2];

            const position = this.quaternion.rotate(new Vector3(x, y, z).subtract(this.origin)).add(this.origin);

            childVertices[i * 3] = position.x;
            childVertices[i * 3 + 1] = position.y;
            childVertices[i * 3 + 2] = position.z;
        }

        return childVertices;
    }

    getTextureMappings(): Float32Array {
        return this.child.getTextureMappings();
    }

    getTextureIds(): Uint32Array {
        return this.child.getTextureIds();
    }
}