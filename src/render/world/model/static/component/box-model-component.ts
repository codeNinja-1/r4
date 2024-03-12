import { Orientation } from "../../../../../utils/rotation/orientation.js";
import { ImmutableVector2D } from "../../../../../utils/vector2d/immutable-vector2d.js";
import { Vector3D } from "../../../../../utils/vector3d/vector3d.js";
import { Texture } from "../../../../utils/texture.js";
import { GroupModelComponent } from "./group-model-component.js";
import { PlaneModelComponent } from "./plane-model-component.js";

export class BoxModelComponent extends GroupModelComponent {
    constructor(dimensions: Vector3D, textures: Texture[]) {
        super();

        const north = new PlaneModelComponent(textures[0], new ImmutableVector2D(dimensions.x, dimensions.y), Orientation.North);
        const south = new PlaneModelComponent(textures[1], new ImmutableVector2D(dimensions.x, dimensions.y), Orientation.South);
        const east = new PlaneModelComponent(textures[2], new ImmutableVector2D(dimensions.z, dimensions.y), Orientation.East);
        const west = new PlaneModelComponent(textures[3], new ImmutableVector2D(dimensions.z, dimensions.y), Orientation.West);
        const up = new PlaneModelComponent(textures[4], new ImmutableVector2D(dimensions.x, dimensions.z), Orientation.Up);
        const down = new PlaneModelComponent(textures[5], new ImmutableVector2D(dimensions.x, dimensions.z), Orientation.Down);

        this.add(north, south, east, west, up, down);
    }
}