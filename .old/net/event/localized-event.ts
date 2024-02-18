import { Vector3D } from "../../utils/vector3d/vector3d.js";
import { WorldEvent } from "./world-event.js";

export class LocalizedEvent extends WorldEvent {
    location: Vector3D;

    constructor(location?: Vector3D) {
        super();
        
        if (location) {
            this.location = location;
        }
    }
}