import { Texture } from "../../../render/utils/texture.js";
import { BlockModel } from "../../../render/world/model/static/block-model.js";
import { BoxModelComponent } from "../../../render/world/model/static/component/box-model-component.js";
import { ImmutableVector3D } from "../../../utils/vector3d/immutable-vector3d.js";
import { BaseBlockPrototype } from "../../../world/prototype/base-block-prototype.js";
import { BlockPosition } from "../../../world/prototype/block-position.js";

export class DirtPrototype extends BaseBlockPrototype {
    whenPlaced(position: BlockPosition): void {
        console.log("Dirt placed at " + position.toString());
    }

    getBlockModel(position: BlockPosition): BlockModel | null {
        return DirtPrototype.model;
    }

    private static model: BlockModel;
    private static texture: Texture;

    static async setup() {
        this.texture = await Texture.load("blocks.dirt");

        this.model = new BlockModel();

        const box = new BoxModelComponent(
            new ImmutableVector3D(1, 1, 1),
            new Array(6).fill(this.texture)
        );

        this.model.add(box);
    }

    static getBlockModel() {
        return DirtPrototype.model;
    }
}