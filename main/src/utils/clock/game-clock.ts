import { GameClockData } from "./game-clock-data.js";

export class GameClock {
    private timeDate: number;
    private timeTicks: number;
    private lastFrame: number;
    
    get time() {
        return (Date.now() - this.timeDate) + this.timeTicks;
    }

    get delta() {
        return Date.now() - this.lastFrame;
    }

    tick() {
        this.timeTicks++;
        this.lastFrame = Date.now();
    }

    toData(): GameClockData {
        return {
            timeDate: Date.now(),
            timeTicks: this.time
        };
    }

    fromData(data: GameClockData) {
        this.timeDate = data.timeDate;
        this.timeTicks = data.timeTicks;
        this.lastFrame = -1;
    }
}