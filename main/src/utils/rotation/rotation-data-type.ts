import { ConstructingDataType } from "../../data/types/constructing-data-type.js";
import { NumberDataType } from "../../data/types/number-data-type.js";
import { ObjectDataType } from "../../data/types/object-data-type.js";
import { RotationData } from "./rotation-data.js";
import { Rotation } from "./rotation.js";

export class RotationDataType extends ConstructingDataType<Rotation, RotationData> {
    constructor() {
        super(
            new ObjectDataType({
                yaw: new NumberDataType('f64'),
                pitch: new NumberDataType('f64'),
                roll: new NumberDataType('f64')
            }),
            data => data,
            data => new Rotation(data.yaw, data.pitch, data.roll)
        );
    }
}