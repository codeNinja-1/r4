import { EventClock } from "../../../game/event-clock.js";
import { Matrix4 } from "../../../utils/matrix/matrix4.js";
import { Rotation } from "../../../utils/rotation/rotation.js";
import { ImmutableVector2D } from "../../../utils/vector2d/immutable-vector2d.js";
import { Vector2D } from "../../../utils/vector2d/vector2d.js";
import { Vector3 } from "../../../utils/vector3d/vector3.js";
import { ChunkDataReferencer } from "../../../world/chunk-data/chunk-data-referencer.js";
import { Entity } from "../../../world/entity/entity.js";
import { Perspective } from "./perspective.js";

export class OrbitPerspective implements Perspective {
    private matrix: Matrix4;
    private location: Vector3;
    private rotation: Rotation;
    private chunkLocation: Vector2D;
    private mousePosition: Vector2D;
    private distance: number = 64;

    constructor(private entity: Entity, private clock: EventClock) {
        document.addEventListener('mousemove', event => {
            if (event.shiftKey) {
                this.distance = this.distance + event.movementY / 2;
            } else {
                this.mousePosition = new ImmutableVector2D(event.clientX, event.clientY);
            }
        });

        this.mousePosition = new ImmutableVector2D();
    }

    private computeLocation(mousePosition: Vector2D) {
        let location = this.entity.getPosition().clone();

        let angleX = -(mousePosition.x - window.innerWidth / 2) / window.innerWidth * 2 * Math.PI;
        let angleY = -(mousePosition.y - window.innerHeight / 2) / window.innerHeight * Math.PI;

        let offsetX = Math.sin(angleX) * this.distance;
        let offsetY = Math.sin(angleY + Math.PI) * this.distance;
        let offsetZ = Math.cos(angleX) * this.distance;

        location.x += offsetX;
        location.y += offsetY;
        location.z += offsetZ;

        this.location = location;
    }

    private computeRotation(mousePosition: Vector2D) {
        let rotation = this.entity.getRotation().clone();

        let angleX = -(mousePosition.x - window.innerWidth) / window.innerWidth * 2 * Math.PI;
        let angleY = -(mousePosition.y - window.innerHeight / 2) / window.innerHeight * Math.PI;

        rotation.yaw = (angleX + Math.PI) % (Math.PI * 2);
        rotation.pitch = angleY;

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
        this.computeLocation(this.mousePosition);
        this.computeRotation(this.mousePosition);
        this.computeChunkLocation();
        this.computeTransformationMatrix();
    }
}