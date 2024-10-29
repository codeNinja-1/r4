import { PlayerEntity } from "../content/entity/player/player-entity.js";
import { SimpleWorldGenerator } from "../content/worldgen/simple-world-generator.js";
import { EventClockViewer } from "../game/event-clock-viewer.js";
import { GameRuntimeType } from "../game/game-runtime-type.js";
import { Game } from "../game/game.js";
import { Registries } from "../game/registry/registries.js";
import { Renderer } from "../render/renderer.js";
import { EntityPerspective } from "../render/world/pespective/entity-perspective.js";
import { ChunkDataReferencer } from "../world/chunk-data/chunk-data-referencer.js";
import { EntityPrototype } from "../world/prototype/entity-prototype.js";
import { WorldLoader } from "../world/world-loader.js";
import { EntityFlyControls } from "./entity-fly-controls.js";
import { SingleplayerWorldLoader } from "./singleplayer-world-loader.js";

export class Client extends Game {
    private renderer: Renderer;
    private worldGenerator: SimpleWorldGenerator;
    private worldLoader: WorldLoader;
    private clockViewer: EventClockViewer;

    constructor() {
        super();

        this.worldGenerator = new SimpleWorldGenerator();
        this.worldLoader = new SingleplayerWorldLoader(this.worldGenerator);
        this.getWorld().setWorldLoader(this.worldLoader);

        this.clockViewer = new EventClockViewer(this.getClock());

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

        const world = this.getWorld();

        const playerPrototype = Registries.entities.get('player') as EntityPrototype<PlayerEntity>;
        const playerEntity = playerPrototype.createEntity();

        world.addEntity(playerEntity);

        playerEntity.getPosition().set(8, ChunkDataReferencer.dimensions.y, 8);

        const playerPerspective = new EntityPerspective(playerEntity);

        this.getRenderer().getWorldRenderer().setPerspective(playerPerspective);

        const controls = new EntityFlyControls(playerEntity);

        this.getClock().schedule("controls", () => controls.update());

        for (let x = -4; x <= 4; x++) {
            for (let z = -4; z <= 4; z++) {
                world.loadChunk(x, z);
            }
        }

        const clock = this.getClock();
        clock.schedule("tickWorld", async () => await this.getWorld().tick(clock.getDelta()));
        clock.schedule("render", async () => await this.renderer.render());
        clock.schedule("displayClockInfo", () => this.clockViewer.update());
        clock.schedule("generateChunks", async () => await this.worldGenerator.generateChunks(1));
        clock.start();
    }
}