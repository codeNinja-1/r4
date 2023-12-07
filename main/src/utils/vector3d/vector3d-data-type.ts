import { ConstructingDataType } from "../../data/types/constructing-data-type.js";
import { NumberDataType } from "../../data/types/number-data-type.js";
import { ObjectDataType } from "../../data/types/object-data-type.js";
import { Vector3DData } from "./vector3d-data.js";
import { Vector3D } from "./vector3d.js";

export class Vector3DDataType extends ConstructingDataType<Vector3D, Vector3DData> {
    constructor(numberType: string, vectorClass: new (x: number, y: number, z: number) => Vector3D) {
        super(
            new ObjectDataType({
                x: new NumberDataType(numberType),
                y: new NumberDataType(numberType),
                z: new NumberDataType(numberType)
            }),
            data => data,
            data => new vectorClass(data.x, data.y, data.z)
        );
    }
}