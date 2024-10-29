import { Registries } from "../../../game/registry/registries.js";
import { Texture } from "../../../render/utils/texture.js";
import { BlockModel } from "../../../render/world/model/static/block-model.js";
import { BoxModelComponent } from "../../../render/world/model/static/component/box-model-component.js";
import { RotatedModelComponent } from "../../../render/world/model/static/component/rotated-model-component.js";
import { Axis } from "../../../utils/rotation/axis.js";
import { Orientation } from "../../../utils/rotation/orientation.js";
import { Rotation } from "../../../utils/rotation/rotation.js";
import { Vector3 } from "../../../utils/vector3d/vector3.js";
import { BaseBlockPrototype } from "../../../world/prototype/base-block-prototype.js";
import { BlockPosition } from "../../../world/prototype/block-position.js";

export class LogPrototype extends BaseBlockPrototype {
    constructor(private model: BlockModel) {
        super();
    }

    whenPlaced(position: BlockPosition): void {
        console.log("Grass placed at " + position.toString());
    }

    getBlockModel(position: BlockPosition): BlockModel | null {
        return this.model;
    }

    static async setup() {
        const end = await Texture.load("blocks.log.end");
        const side = await Texture.load("blocks.log.side");

        for (let a = 0; a < 3; a++) {
            const axis = a as Axis;

            const model = new BlockModel();

            const box = new BoxModelComponent(
                new Vector3(1, 1, 1),
                [ side, side, side, side, end, end ]
            );

            const rotated = new RotatedModelComponent(Orientation.getRotation(Axis.orientation(axis)), new Vector3(0.5, 0.5, 0.5), box);

            model.add(rotated);

            Registries.blockModels.register('log.along_' + Axis.name(axis), model);
            Registries.blocks.register('log.along_' + Axis.name(axis), new LogPrototype(model));
        }
    }
}