export namespace MathUtils {
    export function map(value: number, min: number, max: number, newMin: number, newMax: number): number {
        return (value - min) * (newMax - newMin) / (max - min) + newMin;
    }
}