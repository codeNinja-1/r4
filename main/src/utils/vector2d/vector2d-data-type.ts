import { DecodedData } from "../../data/decoded-data.js";
import { DataType } from "../../data/types/data-type.js";
import { MatchResult } from "../../data/types/match-result.js";
import { NumberDataType } from "../../data/types/number-data-type.js";
import { ObjectDataType } from "../../data/types/object-data-type.js";
import { Vector2D } from "./vector2d.js";

export class Vector2DDataType implements DataType<Vector2D> {
    frame: ObjectDataType<{ x: number, y: number }>;

    constructor(public numberType: string, public vectorType: new (x?: number, y?: number) => Vector2D) {
        this.frame = new ObjectDataType({
            x: new NumberDataType(numberType),
            y: new NumberDataType(numberType)
        });
    }

    *encode(data: Vector2D) {
        yield* this.frame.encode(data);
    }

    decode(view: DataView, index: number) {
        const { data, length } = this.frame.decode(view, index);

        return new DecodedData<Vector2D>(new (this.vectorType)(data.x, data.y), length);
    }

    *matches(value: any) {
        yield value instanceof Vector2D ? MatchResult.Pass : MatchResult.Fail;
    }
}