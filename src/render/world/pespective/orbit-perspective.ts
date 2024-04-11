import { EventClock } from "../../../game/event-clock.js";
import { Matrix4 } from "../../../utils/matrix/matrix4.js";
import { Rotation } from "../../../utils/rotation/rotation.js";
import { ImmutableVector2D } from "../../../utils/vector2d/immutable-vector2d.js";
import { Vector2D } from "../../../utils/vector2d/vector2d.js";
import { Vector3D } from "../../../utils/vector3d/vector3d.js";
import { ChunkDataReferencer } from "../../../world/chunk-data/chunk-data-referencer.js";
import { Entity } from "../../../world/entity/entity.js";
import { Perspective } from "./perspective.js";

export class OrbitPerspective implements Perspective {
    private matrix: Matrix4;
    private location: Vector3D;
    private rotation: Rotation;
    private chunkLocation: Vector2D;

    constructor(private entity: Entity, private clock: EventClock) {
    }

    private computeLocation() {
        let location = this.entity.getPosition().mutable();
        let time = this.clock.getTime();

        let offsetX = Math.sin(time / 1000) * 16;
        let offsetY = Math.sin(time / 1000) * 8;
        let offsetZ = Math.cos(time / 1000) * 16;

        location.x += offsetX;
        location.y += offsetY;
        location.z += offsetZ;

        this.location = location;
    }

    private computeRotation() {
        let rotation = this.entity.getRotation().clone();

        rotation.yaw = this.clock.getTime() / 1000 % (Math.PI * 2);
        rotation.pitch = Math.PI * -0.25;

        this.rotation = rotation;
    }

    private computeTransformationMatrix() {
        let matrix = new Matrix4();

        matrix.multiply(Matrix4.createTranslation(this.location));
        matrix.multiply(Matrix4.createRotation(this.rotation));

        this.matrix = matrix;
    }

    private computeChunkLocation() {
        if (!this.entity.getParentChunk()) {
            throw new Error("Cannot get chunk location of unbound entity");
        }

        const chunkX = Math.floor(this.location.x / ChunkDataReferencer.dimensions.x);
        const chunkZ = Math.floor(this.location.z / ChunkDataReferencer.dimensions.z);

        this.chunkLocation = new ImmutableVector2D(chunkX, chunkZ);
    }

    getChunkLocation(): Vector2D {
        return this.chunkLocation;
    }

    getTransformationMatrix(): Matrix4 {
        return this.matrix;
    }

    getRenderDistance(): number {
        return 10;
    }

    updatePerspective() {
        this.computeLocation();
        this.computeRotation();
        this.computeChunkLocation();
        this.computeTransformationMatrix();
    }
}