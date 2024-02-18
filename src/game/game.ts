import { EventClock } from "./event-clock.js";
import { InitDispatcher } from "./init-dispatcher.js";
import { World } from "../world/world.js";
import { GameRuntimeType } from "./game-runtime-type.js";
import { Registry } from "./registry.js";
import { ChunkInstanceReferencer } from "../world/block-fields/chunk-instance-referencer.js";
import { Registries } from "./registries.js";

export abstract class Game {
    static init = new InitDispatcher();
    private static instance: Game;

    private _world: World;
    private _clock: EventClock = new EventClock();

    constructor() {
        this._world = new World();
    }

    async start() {
        await Game.init.run();

        Registries.blocks.allocateBlockIds();
        ChunkInstanceReferencer.setup();
    }
    
    abstract initGame(): void;
    abstract getRuntimeType(): GameRuntimeType;

    isGameClient(): boolean {
        return this.getRuntimeType() === GameRuntimeType.Singleplayer || this.getRuntimeType() === GameRuntimeType.MultiplayerClient;
    }

    isGameServer(): boolean {
        return this.getRuntimeType() === GameRuntimeType.Singleplayer || this.getRuntimeType() === GameRuntimeType.MultiplayerServer;
    }

    isSingleplayer(): boolean {
        return this.getRuntimeType() === GameRuntimeType.Singleplayer;
    }

    isMultiplayer(): boolean {
        return this.getRuntimeType() === GameRuntimeType.MultiplayerClient || this.getRuntimeType() === GameRuntimeType.MultiplayerServer;
    }

    isMultiplayerServer(): boolean {
        return this.getRuntimeType() === GameRuntimeType.MultiplayerServer;
    }

    getWorld(): World {
        return this._world;
    }

    getClock(): EventClock {
        return this._clock;
    }

    static _setMainInstance(instance: Game) {
        Game.instance = instance;
    }

    static getInstance() {
        return Game.instance;
    }
}