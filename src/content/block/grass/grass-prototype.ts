import { Texture } from "../../../render/utils/texture.js";
import { BlockModel } from "../../../render/world/model/static/block-model.js";
import { BoxModelComponent } from "../../../render/world/model/static/component/box-model-component.js";
import { RotatedModelComponent } from "../../../render/world/model/static/component/rotated-model-component.js";
import { Rotation } from "../../../utils/rotation/rotation.js";
import { Vector2D } from "../../../utils/vector2d/vector2d.js";
import { ImmutableVector3D } from "../../../utils/vector3d/immutable-vector3d.js";
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
            new ImmutableVector3D(1, 1, 1),
            [ this.side, this.side, this.side, this.side, this.top, this.bottom ]
        );

        const rotated = new RotatedModelComponent(new Rotation(0, 0, 0), new ImmutableVector3D(0, 0, 0), box);

        this.model.add(rotated);
    }

    static getBlockModel() {
        return GrassPrototype.model;
    }
}