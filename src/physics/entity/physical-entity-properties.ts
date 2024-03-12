import { Vector3D } from "../../utils/vector3d/vector3d.js";
import { PhysicalModel } from "../model/physical-model.js";

export interface PhysicalEntityProperties {
    friction: {
        ground: number,
        air: number
    },
    model: PhysicalModel;
    gravity: number;
}