import { Orientation } from "../../../../../utils/rotation/orientation.js";
import { ImmutableVector2D } from "../../../../../utils/vector2d/immutable-vector2d.js";
import { ImmutableVector3D } from "../../../../../utils/vector3d/immutable-vector3d.js";
import { Vector3D } from "../../../../../utils/vector3d/vector3d.js";
import { Texture } from "../../../../utils/texture.js";
import { GroupModelComponent } from "./group-model-component.js";
import { PlaneModelComponent } from "./plane-model-component.js";

export class BoxModelComponent extends GroupModelComponent {
    constructor(dimensions: Vector3D, textures: Texture[]) {
        super();

        const north = new PlaneModelComponent(textures[0], new ImmutableVector2D(dimensions.x, dimensions.y), Orientation.North);
        north.setPosition(new ImmutableVector3D(0.5, 0.5, 0));

        const east = new PlaneModelComponent(textures[1], new ImmutableVector2D(dimensions.z, dimensions.y), Orientation.East);
        east.setPosition(new ImmutableVector3D(1, 0.5, 0.5));

        const south = new PlaneModelComponent(textures[2], new ImmutableVector2D(dimensions.x, dimensions.y), Orientation.South);
        south.setPosition(new ImmutableVector3D(0.5, 0.5, 1));

        const west = new PlaneModelComponent(textures[3], new ImmutableVector2D(dimensions.z, dimensions.y), Orientation.West);
        west.setPosition(new ImmutableVector3D(0, 0.5, 0.5));

        const up = new PlaneModelComponent(textures[4], new ImmutableVector2D(dimensions.x, dimensions.z), Orientation.Up);
        up.setPosition(new ImmutableVector3D(0.5, 1, 0.5));

        const down = new PlaneModelComponent(textures[5], new ImmutableVector2D(dimensions.x, dimensions.z), Orientation.Down);
        down.setPosition(new ImmutableVector3D(0.5, 0, 0.5));

        this.add(north, east, south, west, up, down);
    }
}