import { DecodedData } from "../../data/decoded-data.js";
import { DataType } from "../../data/types/data-type.js";
import { MatchResult } from "../../data/types/match-result.js";
import { NumberDataType } from "../../data/types/number-data-type.js";
import { ObjectDataType } from "../../data/types/object-data-type.js";
import { Vector3D } from "./vector3d.js";

export class Vector3DDataType implements DataType<Vector3D> {
    frame: ObjectDataType<{ x: number, y: number, z: number }>;

    constructor(public numberType: string, public vectorType: new (x?: number, y?: number, z?: number) => Vector3D) {
        this.frame = new ObjectDataType({
            x: new NumberDataType(numberType),
            y: new NumberDataType(numberType),
            z: new NumberDataType(numberType)
        });
    }

    *encode(data: Vector3D) {
        yield* this.frame.encode(data);
    }

    decode(view: DataView, index: number) {
        const { data, length } = this.frame.decode(view, index);

        return new DecodedData<Vector3D>(new (this.vectorType)(data.x, data.y, data.z), length);
    }

    *matches(value: any) {
        yield value instanceof Vector3D ? MatchResult.Pass : MatchResult.Fail;
    }
}