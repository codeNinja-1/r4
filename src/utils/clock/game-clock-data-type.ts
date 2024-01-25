import { NumberDataType } from "../../data/types/number-data-type.js";
import { ObjectDataType } from "../../data/types/object-data-type.js";
import { GameClockData } from "./game-clock-data.js";

export class GameClockDataType extends ObjectDataType<GameClockData> {
    constructor() {
        super({
            timeDate: new NumberDataType('u64'),
            timeTicks: new NumberDataType('u64')
        });
    }
}