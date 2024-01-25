import { GameClock } from "../utils/clock/game-clock.js";
import { World } from "../world/world.js";
import { GameType } from "./game-type.js";

export abstract class Game {
    private _world: World;
    private _clock: GameClock;

    public get world(): World {
        return this._world;
    }

    public get clock(): GameClock {
        return this._clock;
    }

    constructor() {
        this._world = new World();
        this._clock = new GameClock();
    }
    
    abstract getGameType(): GameType;
}