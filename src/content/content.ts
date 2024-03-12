import { Registries } from "../game/registry/registries.js";
import { StonePrototype } from "./block/stone/stone-prototype.js";
import { PlayerPrototype } from "./entity/player/player-prototype.js";

export async function loadGameContent(): Promise<void> {
    Registries.entities.register('player', new PlayerPrototype());

    await StonePrototype.setup();
    Registries.blocks.register('stone', new StonePrototype());
    Registries.blockModels.register('stone', StonePrototype.getBlockModel());
}