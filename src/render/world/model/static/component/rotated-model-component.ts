import { Quaternion } from "../../../../../utils/quaternion/quaterion.js";
import { Rotation } from "../../../../../utils/rotation/rotation.js";
import { ImmutableVector3D } from "../../../../../utils/vector3d/immutable-vector3d.js";
import { MutableVector3D } from "../../../../../utils/vector3d/mutable-vector3d.js";
import { Vector3D } from "../../../../../utils/vector3d/vector3d.js";
import { ModelComponent } from "../model-component.js";
import { EmptyModelComponent } from "./empty-model-component.js";

export class RotatedModelComponent implements ModelComponent {
    private quaternion: Quaternion;

    constructor(rotation: Rotation | Quaternion = new Rotation(), private origin: Vector3D = new ImmutableVector3D(0.5, 0.5, 0.5), private child: ModelComponent = new EmptyModelComponent()) {
        this.quaternion = rotation instanceof Rotation ? Quaternion.fromRotation(rotation) : rotation;
    }

    getQuaternion(): Quaternion {
        return this.quaternion.clone();
    }

    setQuaternion(quaternion: Quaternion): void {
        this.quaternion = quaternion;
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

            const position = this.quaternion.rotate(new MutableVector3D(x, y, z).subtract(this.origin)).add(this.origin);

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