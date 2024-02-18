import { GameRuntimeType } from "../game/game-runtime-type.js";
import { Game } from "../game/game.js";
import { Renderer } from "../render/renderer.js";
import { SimpleWorldGenerator } from "../world/world-generation/simple-world-generator.js";
import { WorldGenerator } from "../world/world-generation/world-generator.js";
import { WorldLoader } from "../world/world-loader.js";
import { SingleplayerWorldLoader } from "./singleplayer-world-loader.js";

export class Client extends Game {
    private renderer: Renderer;
    private worldGenerator: WorldGenerator;
    private worldLoader: WorldLoader;

    constructor() {
        super();

        this.worldGenerator = new SimpleWorldGenerator();
        this.worldLoader = new SingleplayerWorldLoader(this.worldGenerator);
        this.getWorld().bindWorldLoader(this.worldLoader);

        this.renderer = new Renderer(this.getWorld());
    }

    getRenderer() {
        return this.renderer;
    }

    getRuntimeType(): GameRuntimeType {
        return GameRuntimeType.Singleplayer;
    }

    initGame(): void {
        
    }

    async start() {
        await super.start();

        this.renderer.setupRenderer();
    }
}