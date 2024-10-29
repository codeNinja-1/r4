import { Registries } from "../../../game/registry/registries.js";
import { Texture } from "../../../render/utils/texture.js";
import { BlockModel } from "../../../render/world/model/static/block-model.js";
import { BoxModelComponent } from "../../../render/world/model/static/component/box-model-component.js";
import { Vector3 } from "../../../utils/vector3d/vector3.js";
import { BaseBlockPrototype } from "../../../world/prototype/base-block-prototype.js";
import { BlockPosition } from "../../../world/prototype/block-position.js";

export class CobblestonePrototype extends BaseBlockPrototype {
    getBlockModel(position: BlockPosition): BlockModel | null {
        return CobblestonePrototype.model;
    }

    private static model: BlockModel;
    private static texture: Texture;

    static async setup() {
        this.texture = await Texture.load("blocks.cobblestone");

        this.model = new BlockModel({ transparent: true });

        const box = new BoxModelComponent(
            new Vector3(1, 1, 1),
            new Array(6).fill(this.texture)
        );

        this.model.add(box);

        Registries.blocks.register('cobblestone', new CobblestonePrototype());
        Registries.blockModels.register('cobblestone', CobblestonePrototype.model);
    }
}