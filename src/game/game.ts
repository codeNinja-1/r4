import { loadGameContent } from "../content/content.js";
import { ChunkDataNumberAllocation } from "../world/chunk-data/chunk-data-number-allocation.js";
import { World } from "../world/world.js";
import { EventClock } from "./event-clock.js";
import { GameRuntimeType } from "./game-runtime-type.js";
import { InitDispatcher } from "./init-dispatcher.js";
import { Registries } from "./registry/registries.js";

export abstract class Game {
    static init = new InitDispatcher();

    private world: World;
    private clock: EventClock = new EventClock();

    constructor() {
        this.world = new World();
    }

    async start() {
        await Game.init.run();

        Registries.fields.register('blockId', new ChunkDataNumberAllocation('u16'));

        await loadGameContent();
        await Registries.blocks.setup();
        await Registries.textures.setup();
        await Registries.blockModels.setup();

        //await new Promise(resolve => setTimeout(resolve, 10000));
    }
    
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
        return this.world;
    }

    getClock(): EventClock {
        return this.clock;
    }
}