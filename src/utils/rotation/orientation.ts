import { Matrix3 } from "../matrix/matrix3.js";
import { Rotation } from "./rotation.js";

export enum Orientation { North, East, South, West, Up, Down }

export namespace Orientation {
    const rotations: Map<Orientation, Rotation> = new Map();

    export function getRotation(orientation: Orientation): Rotation {
        if (!rotations.has(orientation)) {
            rotations.set(orientation, calculateRotation(orientation));
        }

        return rotations.get(orientation)!;
    }

    function calculateRotation(orientation: Orientation): Rotation {
        switch (orientation) {
            case Orientation.North: return Rotation.fromDegrees(0, 0, 0);
            case Orientation.East: return Rotation.fromDegrees(0, 90, 0);
            case Orientation.South: return Rotation.fromDegrees(0, 180, 0);
            case Orientation.West: return Rotation.fromDegrees(0, 270, 0);
            case Orientation.Up: return Rotation.fromDegrees(-90, 0, 0);
            case Orientation.Down: return Rotation.fromDegrees(90, 0, 0);
        }
    }

    const matrices = new Map<Orientation, Matrix3>();

    export function getMatrix(orientation: Orientation): Matrix3 {
        if (!matrices.has(orientation)) {
            matrices.set(orientation, Matrix3.createRotation(getRotation(orientation)));
        }

        return matrices.get(orientation)!;
    }
}