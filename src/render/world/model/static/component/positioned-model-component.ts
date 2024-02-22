import { MutableVector3D } from "../../../../../utils/vector3d/mutable-vector3d.js";
import { Vector3D } from "../../../../../utils/vector3d/vector3d.js";
import { ModelComponent } from "../model-component.js";

export abstract class PositionedModelComponent implements ModelComponent {
    private position: Vector3D = new MutableVector3D();

    getPosition(): Vector3D {
        return this.position.clone();
    }

    setPosition(position: Vector3D): void {
        this.position.set(position);
    }

    abstract getVertexPositions(parentPosition: Vector3D): Float32Array;
    abstract getTextureMappings(): Uint32Array;
    abstract getTextureIds(): Uint32Array;
}