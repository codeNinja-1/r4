import { Texture } from "../../../render/utils/texture.js";
import { BlockModel } from "../../../render/world/model/static/block-model.js";
import { CubeModelComponent } from "../../../render/world/model/static/component/cube-model-component.js";
import { ImmutableVector3D } from "../../../utils/vector3d/immutable-vector3d.js";
import { BaseBlockPrototype } from "../../../world/prototype/base-block-prototype.js";
import { BlockPosition } from "../../../world/prototype/block-position.js";

export class StonePrototype extends BaseBlockPrototype {
    whenPlaced(position: BlockPosition): void {
        console.log("Stone placed at " + position.toString());
    }

    getBlockModel(position: BlockPosition): BlockModel | null {
        return this.model;
    }

    private model: BlockModel;
    private texture: Texture;

    async setup() {
        this.texture = await Texture.load("blocks.stone");

        this.model = new BlockModel();

        const box = new CubeModelComponent(
            new ImmutableVector3D(1, 1, 1),
            new Array(6).fill(this.texture)
        );

        this.model.add(box);
    }
}