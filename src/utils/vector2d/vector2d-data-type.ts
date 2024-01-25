import { ConstructingDataType } from "../../data/types/constructing-data-type.js";
import { NumberDataType } from "../../data/types/number-data-type.js";
import { ObjectDataType } from "../../data/types/object-data-type.js";
import { Vector2DData } from "./vector2d-data.js";
import { Vector2D } from "./vector2d.js";

export class Vector2DDataType extends ConstructingDataType<Vector2D, Vector2DData> {
    constructor(numberType: string, vectorClass: new (x: number, y: number) => Vector2D) {
        super(
            new ObjectDataType({
                x: new NumberDataType(numberType),
                y: new NumberDataType(numberType)
            }),
            data => data,
            data => new vectorClass(data.x, data.y)
        );
    }
}