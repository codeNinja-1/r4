import { Registries } from "../../../game/registry/registries.js";
import { BaseEntity } from "../../../world/entity/base-entity.js";
import { EntityPrototype } from "../../../world/prototype/entity-prototype.js";

export class PlayerEntity extends BaseEntity {
    getPrototype(): EntityPrototype<BaseEntity> {
        return Registries.entities.get('player')!;
    }

    canLoadChunks(): boolean {
        return true;
    }
}