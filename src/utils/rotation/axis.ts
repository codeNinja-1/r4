import { Orientation } from "./orientation.js";

export enum Axis { X, Y, Z };

export namespace Axis {
    export function orientation(axis: Axis): Orientation {
        return axis == Axis.X ? Orientation.East : axis == Axis.Y ? Orientation.Up : Orientation.North;
    }

    export function name(axis: Axis): string {
        return axis == Axis.X ? "x" : axis == Axis.Y ? "y" : "z";
    }
}