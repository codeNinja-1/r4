import { Matrix4 } from "../utils/matrix/matrix4.js";
import { Vector2D } from "../utils/vector2d/vector2d.js";

export interface Perspective {
    chunkLocation(): Vector2D;
    transformationMatrix(): Matrix4;
}