import { DecodedData } from "../data/decoded-data.js";
import { DataType } from "../data/types/data-type.js";
import { MatchResult } from "../data/types/match-result.js";
import { NumberDataType } from "../data/types/number-data-type.js";
import { ObjectDataType } from "../data/types/object-data-type.js";
import { Rotation } from "./rotation.js";

export class RotationDataType implements DataType<Rotation> {
    frame: ObjectDataType<{ yaw: number, pitch: number, roll: number }>;

    constructor() {
        this.frame = new ObjectDataType({
            x: new NumberDataType('f64'),
            y: new NumberDataType('f64'),
            z: new NumberDataType('f64')
        });
    }

    *encode(data: Rotation) {
        yield* this.frame.encode(data);
    }

    decode(view: DataView, index: number) {
        const { data, length } = this.frame.decode(view, index);

        return new DecodedData<Rotation>(new Rotation(data.yaw, data.pitch, data.roll), length);
    }

    *matches(value: any) {
        yield value instanceof Rotation ? MatchResult.Pass : MatchResult.Fail;
    }
}