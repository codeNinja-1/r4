import { Matrix4 } from "../../../utils/matrix/matrix4.js";
import { Vector2D } from "../../../utils/vector2d/vector2d.js";
import { Entity } from "../../../world/entity/entity.js";
import { Perspective } from "./perspective.js";

export class EntityPerspective implements Perspective {
    private matrix: Matrix4;

    constructor(private entity: Entity) {
    }

    getChunkLocation(): Vector2D {
        if (!this.entity.getParentChunk()) {
            throw new Error("Cannot get chunk location of unbound entity");
        }

        return this.entity.getParentChunk()!.getPosition();
    }

    getTransformationMatrix(): Matrix4 {
        return this.matrix;
    }

    getRenderDistance(): number {
        return 10;
    }

    updatePerspective() {
        this.matrix = this.computeTransformationMatrix();
    }

    computeTransformationMatrix(): Matrix4 {
        let matrix = new Matrix4();

        matrix.multiply(Matrix4.createTranslation(this.entity.getPosition()));
        matrix.multiply(Matrix4.createRotation(this.entity.getRotation()));

        return matrix;
    }
}