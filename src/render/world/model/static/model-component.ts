import { Vector3D } from "../../../../utils/vector3d/vector3d.js";

export interface ModelComponent {
    getVertexPositions(parentPosition: Vector3D): Float32Array;
    getTextureMappings(): Float32Array;
    getTextureIds(): Uint32Array;
}