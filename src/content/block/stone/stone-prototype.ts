import { Texture } from "../../../render/utils/texture.js";
import { BlockModel } from "../../../render/world/model/static/block-model.js";
import { BoxModelComponent } from "../../../render/world/model/static/component/box-model-component.js";
import { Vector3 } from "../../../utils/vector3d/vector3.js";
import { BaseBlockPrototype } from "../../../world/prototype/base-block-prototype.js";
import { BlockPosition } from "../../../world/prototype/block-position.js";

export class StonePrototype extends BaseBlockPrototype {
    whenPlaced(position: BlockPosition): void {
        console.log("Stone placed at " + position.toString());
    }

    getBlockModel(position: BlockPosition): BlockModel | null {
        return StonePrototype.model;
    }

    private static model: BlockModel;
    private static texture: Texture;

    static async setup() {
        this.texture = await Texture.load("blocks.stone");

        this.model = new BlockModel();

        const box = new BoxModelComponent(
            new Vector3(1, 1, 1),
            new Array(6).fill(this.texture)
        );

        this.model.add(box);
    }

    static getBlockModel() {
        return StonePrototype.model;
    }
}