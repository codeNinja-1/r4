import { Registries } from "../game/registry/registries.js";
import { AirPrototype } from "./block/air/air-prototype.js";
import { DirtPrototype } from "./block/dirt/dirt-prototype.js";
import { GrassPrototype } from "./block/grass/grass-prototype.js";
import { StonePrototype } from "./block/stone/stone-prototype.js";
import { PlayerPrototype } from "./entity/player/player-prototype.js";

export async function loadGameContent(): Promise<void> {
    Registries.entities.register('player', new PlayerPrototype());

    await StonePrototype.setup();
    Registries.blocks.register('stone', new StonePrototype());
    Registries.blockModels.register('stone', StonePrototype.getBlockModel());

    await DirtPrototype.setup();
    Registries.blocks.register('dirt', new DirtPrototype());
    Registries.blockModels.register('dirt', DirtPrototype.getBlockModel());

    await GrassPrototype.setup();
    Registries.blocks.register('grass', new GrassPrototype());
    Registries.blockModels.register('grass', GrassPrototype.getBlockModel());

    Registries.blocks.register('air', new AirPrototype());
}