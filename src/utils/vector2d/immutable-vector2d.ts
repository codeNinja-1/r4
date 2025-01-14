import { Vector2D } from "./vector2d.js";

export class ImmutableVector2D extends Vector2D {
    constructor(x: number = 0, y: number = 0) {
        super(x, y);
    }

    _set(x: number, y: number): ImmutableVector2D {
        return new ImmutableVector2D(x, y);
    }

    private set(x: number | Vector2D, y?: number) {
        throw new Error("Cannot set immutable vector");
    }
}