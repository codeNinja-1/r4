import { BaseEntityPrototype } from "../../../world/prototype/base-entity-prototype.js";
import { PlayerEntity } from "./player-entity.js";

export class PlayerPrototype extends BaseEntityPrototype<PlayerEntity> {
    createEntity(): PlayerEntity {
        return new PlayerEntity();
    }
}