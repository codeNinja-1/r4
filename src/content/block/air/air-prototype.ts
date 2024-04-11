import { Texture } from "../../../render/utils/texture.js";
import { BlockModel } from "../../../render/world/model/static/block-model.js";
import { BoxModelComponent } from "../../../render/world/model/static/component/box-model-component.js";
import { ImmutableVector3D } from "../../../utils/vector3d/immutable-vector3d.js";
import { BaseBlockPrototype } from "../../../world/prototype/base-block-prototype.js";
import { BlockPosition } from "../../../world/prototype/block-position.js";

export class AirPrototype extends BaseBlockPrototype {
    whenPlaced(position: BlockPosition): void {
        console.log("Air placed at " + position.toString());
    }

    getBlockModel(position: BlockPosition): BlockModel | null {
        return null;
    }
}