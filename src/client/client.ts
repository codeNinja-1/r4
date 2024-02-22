import { PlayerEntity } from "../content/entity/player/player-entity.js";
import { GameRuntimeType } from "../game/game-runtime-type.js";
import { Game } from "../game/game.js";
import { Registries } from "../game/registry/registries.js";
import { EntityPerspective } from "../render/world/pespective/entity-perspective.js";
import { Projector } from "../render/world/pespective/projector.js";
import { Renderer } from "../render/renderer.js";
import { EntityPrototype } from "../world/prototype/entity-prototype.js";
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

    async start() {
        await super.start();
        await this.renderer.setupRenderer();

        const playerPrototype = Registries.entities.get('player') as EntityPrototype<PlayerEntity>;
        const playerEntity = playerPrototype.instantiate();

        this.getWorld().addEntity(playerEntity);

        const playerPerspective = new EntityPerspective(playerEntity);

        this.getRenderer().getWorldRenderer().setPerspective(playerPerspective);

        const clock = this.getClock();
        clock.schedule(() => this.renderer.render());
        clock.start();
    }
}