import { Rotation } from "@cubecraft/utils/rotation/rotation.js"
import { Vector3D } from "@cubecraft/utils/vector3d/vector3d.js"

export type PlayerMoveEvent = {
    location: Vector3D,
    rotation: Rotation
};