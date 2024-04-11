import { NoiseFunction2D, NoiseFunction3D, NoiseFunction4D, createNoise2D, createNoise3D, createNoise4D } from "simplex-noise";

export namespace NoiseUtils {
    export function square(value: number, exponent: number) {
        return Math.sign(value) * (1 - (1 - Math.abs(value)) ** exponent)
    }

    export function scaledNoise2D(noise: NoiseFunction2D, scale: number): NoiseFunction2D {
        return (x: number, y: number) => noise(x / scale, y / scale);
    }

    export function scaledNoise3D(noise: NoiseFunction3D, scale: number): NoiseFunction3D {
        return (x: number, y: number, z: number) => noise(x / scale, y / scale, z / scale);
    }

    export function octavedNoise2D(count: number): NoiseFunction2D {
        let noises: NoiseFunction2D[] = [];

        for (let i = 0; i < count; i++) {
            noises.push(createNoise2D());
        }

        return (x: number, y: number): number => {
            let value = 0;
            let denomenator = 0;

            for (let i = 0; i < count; i++) {
                value += noises[i](x * i, y * i) / (i + 1);
                denomenator += 1 / (i + 1);
            }

            return value / denomenator;
        }
    }

    export function octavedNoise3D(count: number): NoiseFunction3D {
        let noises: NoiseFunction3D[] = [];

        for (let i = 0; i < count; i++) {
            noises.push(createNoise3D());
        }

        return (x: number, y: number, z: number): number => {
            let value = 0;
            let denomenator = 0;

            for (let i = 0; i < count; i++) {
                value += noises[i](x * i, y * i, z * i) / (i + 1);
                denomenator += 1 / (i + 1);
            }

            return value / denomenator;
        }
    }
}