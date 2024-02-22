import { Matrix4 } from "../../../utils/matrix/matrix4.js";
import { Vector2D } from "../../../utils/vector2d/vector2d.js";

export interface Perspective {
    getChunkLocation(): Vector2D;
    getTransformationMatrix(): Matrix4;
    getRenderDistance(): number;
    updatePerspective(): void;
}