import { Texture } from "../../../render/utils/texture.js";
import { BlockModel } from "../../../render/world/model/static/block-model.js";
import { BoxModelComponent } from "../../../render/world/model/static/component/box-model-component.js";
import { RotatedModelComponent } from "../../../render/world/model/static/component/rotated-model-component.js";
import { Rotation } from "../../../utils/rotation/rotation.js";
import { Vector3 } from "../../../utils/vector3d/vector3.js";
import { BaseBlockPrototype } from "../../../world/prototype/base-block-prototype.js";
import { BlockPosition } from "../../../world/prototype/block-position.js";

export class GrassPrototype extends BaseBlockPrototype {
    whenPlaced(position: BlockPosition): void {
        console.log("Grass placed at " + position.toString());
    }

    getBlockModel(position: BlockPosition): BlockModel | null {
        return GrassPrototype.model;
    }

    private static model: BlockModel;
    private static top: Texture;
    private static side: Texture;
    private static bottom: Texture;

    static async setup() {
        this.top = await Texture.load("blocks.grass.top");
        this.side = await Texture.load("blocks.grass.side");
        this.bottom = await Texture.load("blocks.dirt");

        this.model = new BlockModel();

        const box = new BoxModelComponent(
            new Vector3(1, 1, 1),
            [ this.side, this.side, this.side, this.side, this.top, this.bottom ]
        );

        this.model.add(box);
    }

    static getBlockModel() {
        return GrassPrototype.model;
    }
}