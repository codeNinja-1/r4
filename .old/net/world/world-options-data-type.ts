import { NumberDataType } from "../../data/types/number-data-type.js";
import { ObjectDataType } from "../../data/types/object-data-type.js";
import { GameClockDataType } from "../../utils/clock/game-clock-data-type.js";
import { WorldOptionsData } from "./world-options-data.js";

export class WorldOptionsDataType extends ObjectDataType<WorldOptionsData> {
    constructor() {
        super({
            seed: new NumberDataType('i32'),
            clock: new GameClockDataType()
        });
    }
}