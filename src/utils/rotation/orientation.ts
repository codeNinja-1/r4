import { Matrix3 } from "../matrix/matrix3.js";
import { Rotation } from "./rotation.js";

export enum Orientation { North = 0, East = 1, South = 2, West = 3, Up = 4, Down = 5 }

export namespace Orientation {
    const rotations: Map<Orientation, Rotation> = new Map();

    export function getRotation(orientation: Orientation): Rotation {
        if (!rotations.has(orientation)) {
            rotations.set(orientation, calculateRotation(orientation));
        }

        return rotations.get(orientation)!;
    }

    export function toId(orientation: Orientation): string {
        switch (orientation) {
            case Orientation.North: return 'north';
            case Orientation.East: return 'east';
            case Orientation.South: return 'south';
            case Orientation.West: return 'west';
            case Orientation.Up: return 'up';
            case Orientation.Down: return 'down';
        }
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