import { PhysicalModel } from "../model/physical-model.js";

export interface PhysicalEntityProperties {
    friction: {
        ground: number,
        air: number
    },
    model: PhysicalModel;
    gravity: number;
}