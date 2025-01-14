import { Registries } from "../../../game/registry/registries.js";
import { EntityPhysics } from "../../../physics/entity/entity-physics.js";
import { PhysicalEntityProperties } from "../../../physics/entity/physical-entity-properties.js";
import { PhysicalEntityState } from "../../../physics/entity/physical-entity-state.js";
import { BoxPhysicalComponent } from "../../../physics/model/component/box-physical-component.js";
import { PhysicalHitbox } from "../../../physics/model/physical-hitbox.js";
import { PhysicalModel } from "../../../physics/model/physical-model.js";
import { Vector3 } from "../../../utils/vector3d/vector3.js";
import { BaseEntity } from "../../../world/entity/base-entity.js";
import { EntityPrototype } from "../../../world/prototype/entity-prototype.js";

export class PlayerEntity extends BaseEntity {
    private physicalState: PhysicalEntityState | null = new PhysicalEntityState();
    private physicalProperties: PhysicalEntityProperties | null = {
        gravity: -0.3,
        friction: {
            air: 0.9,
            ground: 0.8
        },
        model: new PhysicalModel(
            new BoxPhysicalComponent(
                new PhysicalHitbox(
                    new Vector3(0, 0, 0),
                    new Vector3(1, 1.8, 1)
                )
            )
        )
    };

    getPrototype(): EntityPrototype<BaseEntity> {
        return Registries.entities.get('player')!;
    }

    canLoadChunks(): boolean {
        return true;
    }

    async tickEntity(delta: number): Promise<void> {
        super.tickEntity(delta);

        EntityPhysics.simulateEntity(this, delta);
    }

    getPhysicalProperties(): PhysicalEntityProperties | null {
        return this.physicalProperties;
    }

    getPhysicalState(): PhysicalEntityState | null {
        return this.physicalState;
    }
}